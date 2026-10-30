import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const distIndex = path.join(rootDir, 'dist', 'index.html')
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')
const port = Number(process.env.SMOKE_PORT ?? 4180)
const origin = `http://127.0.0.1:${port}`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const expect = (condition, message) => {
  if (!condition) throw new Error(message)
}

const request = async (pathname) => {
  const response = await fetch(`${origin}${pathname}`)
  expect(response.ok, `Expected ${pathname} to return 2xx, received ${response.status}`)
  return response
}

const waitForServer = async (server, timeoutMs = 30000) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (server.exitCode !== null) {
      throw new Error(`Preview server exited before becoming ready (code ${server.exitCode})`)
    }

    try {
      return await request('/')
    } catch {
      await sleep(250)
    }
  }

  throw new Error(`Preview server did not start within ${timeoutMs}ms`)
}

const main = async () => {
  expect(
    existsSync(distIndex),
    'Build output is missing. Run "npm run build" before "npm run smoke".',
  )

  const server = spawn(
    process.execPath,
    [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
    {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    },
  )

  let serverOutput = ''
  server.stdout.on('data', (chunk) => {
    serverOutput += chunk.toString()
  })
  server.stderr.on('data', (chunk) => {
    serverOutput += chunk.toString()
  })

  try {
    const rootResponse = await waitForServer(server)
    const html = await rootResponse.text()

    expect(html.includes('id="root"'), 'The built page is missing the root mount element.')
    expect(html.includes('<title>ITSS'), 'The built page is missing the ITSS title.')
    expect(!html.includes('/src/main.tsx'), 'The built page still references source files.')
    expect(
      html.includes('https://itss.cvsusc.org/og/hero-lorum.jpg'),
      'The built page is missing the absolute OG image URL.',
    )
    expect(html.includes('rel="canonical"'), 'The built page is missing a canonical link.')

    for (const routePath of ['/about', '/mission', '/contact']) {
      const routeResponse = await request(routePath)
      const routeHtml = await routeResponse.text()
      expect(
        routeHtml.includes('id="root"'),
        `The ${routePath} deep link is not serving the app shell.`,
      )
    }

    const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(
      (match) => match[1],
    )

    expect(assetPaths.length > 0, 'The built page does not reference any compiled assets.')

    for (const assetPath of assetPaths) {
      await request(assetPath)
    }

    await request('/favicon.svg')
    await request('/fonts/roboto-400.woff2')
    await request('/robots.txt')
    await request('/sitemap.xml')
    await request('/og/hero-lorum.jpg')

    console.log(`Smoke test passed: ${assetPaths.length} compiled assets checked.`)
  } catch (error) {
    if (serverOutput.trim()) {
      console.error(serverOutput.trim())
    }
    throw error
  } finally {
    server.kill()
    await sleep(500)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
