import type { BookCfg } from './components/BooksShowcase'

const INK = '#20242e'
const SUB = '#3d4250'
const BG = '#edeff5'

function spaced(
  x: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  ls: number,
) {
  const prev = x.textAlign
  x.textAlign = 'left'
  const chars = [...text]
  let tot = 0
  const ws = chars.map((ch) => {
    const w = x.measureText(ch).width
    tot += w
    return w
  })
  tot += ls * (chars.length - 1)
  let px = cx - tot / 2
  chars.forEach((ch, i) => {
    x.fillText(ch, px, y)
    px += ws[i] + ls
  })
  x.textAlign = prev
}

function rrect(
  x: CanvasRenderingContext2D,
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
) {
  x.beginPath()
  x.moveTo(px + r, py)
  x.arcTo(px + w, py, px + w, py + h, r)
  x.arcTo(px + w, py + h, px, py + h, r)
  x.arcTo(px, py + h, px, py, r)
  x.arcTo(px, py, px + w, py, r)
  x.closePath()
}

function arrow(
  x: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = 'rgba(60,66,80,0.75)',
) {
  x.strokeStyle = color
  x.fillStyle = color
  x.lineWidth = 2
  x.beginPath()
  x.moveTo(x1, y1)
  x.lineTo(x2, y2)
  x.stroke()
  const ang = Math.atan2(y2 - y1, x2 - x1)
  x.beginPath()
  x.moveTo(x2, y2)
  x.lineTo(x2 - 9 * Math.cos(ang - 0.42), y2 - 9 * Math.sin(ang - 0.42))
  x.lineTo(x2 - 9 * Math.cos(ang + 0.42), y2 - 9 * Math.sin(ang + 0.42))
  x.closePath()
  x.fill()
}

function keywordsRow(x: CanvasRenderingContext2D, w: number, h: number, items: string[]) {
  const y = h - 112
  x.font = '600 26px Arial, Helvetica, sans-serif'
  const gap = 30
  const sepW = x.measureText('|').width
  const ws = items.map((t) => x.measureText(t).width)
  const total = ws.reduce((a, b) => a + b, 0) + sepW * (items.length - 1) + gap * 2 * (items.length - 1)
  let px = w / 2 - total / 2
  x.textAlign = 'left'
  items.forEach((t, i) => {
    x.fillStyle = SUB
    x.fillText(t, px, y)
    px += ws[i]
    if (i < items.length - 1) {
      x.fillStyle = 'rgba(60,66,80,0.35)'
      x.fillText('|', px + gap, y)
      px += sepW + gap * 2
    }
  })
}

function mixColor(a: [number, number, number], b: [number, number, number], t: number) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r},${g},${bl})`
}

function surfacePlot(x: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  const N = 20
  const R = 1.5
  const f = (u: number, v: number) =>
    0.85 * Math.sin(1.9 * u) * Math.cos(1.7 * v) +
    0.45 * Math.cos(2.7 * u) * Math.sin(1.3 * v) +
    0.18 * Math.sin(3.7 * v)
  const kx = 118 * s
  const ky = 40 * s
  const kz = 92 * s
  const P = (u: number, v: number) => {
    const z = f(u, v)
    return { x: cx + (u - v) * kx, y: cy + (u + v) * ky - z * kz, z }
  }
  x.lineWidth = 1.1
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j < N; j++) {
      const u = -R + (i / N) * 2 * R
      const a = P(u, -R + (j / N) * 2 * R)
      const b = P(u, -R + ((j + 1) / N) * 2 * R)
      x.strokeStyle = mixColor([96, 140, 205], [224, 112, 58], Math.min(1, Math.max(0, (a.z + b.z) / 2 + 0.55)))
      x.beginPath()
      x.moveTo(a.x, a.y)
      x.lineTo(b.x, b.y)
      x.stroke()
    }
  }
  for (let j = 0; j <= N; j++) {
    for (let i = 0; i < N; i++) {
      const v = -R + (j / N) * 2 * R
      const a = P(-R + (i / N) * 2 * R, v)
      const b = P(-R + ((i + 1) / N) * 2 * R, v)
      x.strokeStyle = mixColor([96, 140, 205], [224, 112, 58], Math.min(1, Math.max(0, (a.z + b.z) / 2 + 0.55)))
      x.beginPath()
      x.moveTo(a.x, a.y)
      x.lineTo(b.x, b.y)
      x.stroke()
    }
  }

  const path: Array<{ u: number; v: number }> = []
  for (let i = 0; i <= 24; i++) {
    const t = i / 24
    path.push({ u: -1.35 + t * 2.0, v: -1.15 + t * 1.1 + 0.25 * Math.sin(t * 5) })
  }
  x.strokeStyle = '#20242c'
  x.lineWidth = 2
  x.beginPath()
  path.forEach((p, i) => {
    const q = P(p.u, p.v)
    if (i === 0) x.moveTo(q.x, q.y)
    else x.lineTo(q.x, q.y)
  })
  x.stroke()
  path.forEach((p, i) => {
    if (i % 3 === 0) {
      const q = P(p.u, p.v)
      x.fillStyle = '#14161a'
      x.beginPath()
      x.arc(q.x, q.y, 4.2, 0, 6.2832)
      x.fill()
    }
  })

  x.strokeStyle = 'rgba(35,40,50,0.65)'
  x.lineWidth = 2
  const e1a = P(-R, R)
  const e1b = P(R, R)
  const e2a = P(R, -R)
  x.beginPath()
  x.moveTo(e1a.x, e1a.y)
  x.lineTo(e1b.x, e1b.y)
  x.lineTo(e2a.x, e2a.y)
  x.stroke()

  x.fillStyle = '#4a505e'
  x.font = '600 22px Arial, Helvetica, sans-serif'
  const m1 = P(0, R)
  x.textAlign = 'center'
  x.fillText('PARAMETER 1', m1.x + 6, m1.y + 48)
  const m2 = P(R, 0)
  x.fillText('PARAMETER 2', m2.x + 108, m2.y + 8)
  const loss = P(-R, 0)
  x.save()
  x.translate(loss.x - 56, loss.y + 40)
  x.rotate(-Math.PI / 2.6)
  x.fillText('LOSS', 0, 0)
  x.restore()
  x.textAlign = 'left'
}

function nnDiagram(x: CanvasRenderingContext2D, cy: number) {
  const xs = [300, 492, 684, 876]
  const counts = [4, 5, 5, 4]
  const gapY = 84
  const ys = counts.map((c) =>
    Array.from({ length: c }, (_, i) => cy - ((c - 1) / 2) * gapY + i * gapY),
  )

  x.strokeStyle = 'rgba(105,115,140,0.30)'
  x.lineWidth = 1.1
  for (let l = 0; l < 3; l++) {
    ys[l].forEach((y1) => {
      ys[l + 1].forEach((y2) => {
        x.beginPath()
        x.moveTo(xs[l], y1)
        x.lineTo(xs[l + 1], y2)
        x.stroke()
      })
    })
  }

  ys.forEach((col, l) => {
    col.forEach((y) => {
      x.beginPath()
      x.arc(xs[l], y, 11, 0, 6.2832)
      if (l === 0) {
        x.fillStyle = '#e0782f'
        x.fill()
      } else if (l === 3) {
        x.fillStyle = '#2065cf'
        x.fill()
      } else {
        x.fillStyle = '#f7f8fc'
        x.fill()
        x.strokeStyle = '#9aa4bd'
        x.lineWidth = 2
        x.stroke()
      }
    })
  })

  x.fillStyle = '#4a505e'
  x.font = '600 22px Arial, Helvetica, sans-serif'
  spaced(x, 'INPUT LAYER', xs[0], cy + 218, 3)
  spaced(x, 'HIDDEN LAYERS', (xs[1] + xs[2]) / 2, cy + 218, 3)
  spaced(x, 'OUTPUT LAYER', xs[3], cy + 218, 3)
}

function transformerDiagram(x: CanvasRenderingContext2D, cx: number, top: number) {
  const colL = cx - 138
  const colR = cx + 138
  const bw = 196

  const box = (
    bx: number,
    by: number,
    fill: string,
    l1: string,
    l2?: string,
    bh = 64,
  ) => {
    rrect(x, bx - bw / 2, by - bh / 2, bw, bh, 10)
    x.fillStyle = fill
    x.fill()
    x.strokeStyle = 'rgba(28,32,42,0.5)'
    x.lineWidth = 1.6
    x.stroke()
    x.fillStyle = '#232833'
    x.font = '600 21px Arial, Helvetica, sans-serif'
    x.textAlign = 'center'
    if (l2) {
      x.fillText(l1, bx, by - 8)
      x.fillText(l2, bx, by + 16)
    } else {
      x.fillText(l1, bx, by + 7)
    }
  }

  const outY = top + 34
  const r1aY = top + 142
  const r1bY = top + 248
  const r2aY = top + 354
  const r2bY = top + 460
  const embY = top + 564
  const inpY = top + 654

  box(cx, outY, '#e6934a', 'Output', undefined, 46)
  arrow(x, cx - 40, outY + 22, colL + 30, r1aY - 34)
  arrow(x, cx + 40, outY + 22, colR - 30, r1aY - 34)

  const skip = (colX: number, y1: number, y2: number, side: -1 | 1) => {
    const ox = colX + side * (bw / 2 + 26)
    x.strokeStyle = 'rgba(60,66,80,0.6)'
    x.lineWidth = 2
    x.beginPath()
    x.moveTo(colX + side * (bw / 2), y1)
    x.quadraticCurveTo(ox + side * 14, (y1 + y2) / 2, colX + side * (bw / 2), y2)
    x.stroke()
    const ang = Math.atan2(y2 - y1, (ox + side * 14) - (colX + side * (bw / 2)))
    x.fillStyle = 'rgba(60,66,80,0.7)'
    x.beginPath()
    x.moveTo(colX + side * (bw / 2), y2)
    x.lineTo(colX + side * (bw / 2) - 8 * Math.cos(ang - 0.5), y2 - 8 * Math.sin(ang - 0.5))
    x.lineTo(colX + side * (bw / 2) - 8 * Math.cos(ang + 0.5), y2 - 8 * Math.sin(ang + 0.5))
    x.closePath()
    x.fill()
    x.fillStyle = '#6a7180'
    x.font = '600 20px Arial, Helvetica, sans-serif'
    x.textAlign = 'center'
    x.fillText('No', ox + side * 12, (y1 + y2) / 2 + 7)
  }

  box(colL, r1aY, '#f3c65f', 'Multi-Head', 'Attention')
  box(colR, r1aY, '#f3c65f', 'Multi-Head', 'Attention')
  skip(colL, r1aY, r1bY, -1)
  skip(colR, r1aY, r1bY, 1)
  arrow(x, colL, r1aY + 34, colL, r1bY - 34)
  arrow(x, colR, r1aY + 34, colR, r1bY - 34)
  box(colL, r1bY, '#8fbf7f', 'Feed', 'Forward')
  box(colR, r1bY, '#8fbf7f', 'Feed', 'Forward')

  arrow(x, colL, r1bY + 34, colL, r2aY - 34)
  arrow(x, colR, r1bY + 34, colR, r2aY - 34)
  box(colL, r2aY, '#f3c65f', 'Multi-Head', 'Attention')
  box(colR, r2aY, '#f3c65f', 'Multi-Head', 'Attention')
  skip(colL, r2aY, r2bY, -1)
  skip(colR, r2aY, r2bY, 1)
  arrow(x, colL, r2aY + 34, colL, r2bY - 34)
  arrow(x, colR, r2aY + 34, colR, r2bY - 34)
  box(colL, r2bY, '#8fbf7f', 'Feed', 'Forward')
  box(colR, r2bY, '#8fbf7f', 'Feed', 'Forward')

  arrow(x, colL, inpY - 30, colL, embY + 28)
  arrow(x, colR, inpY - 30, colR, embY + 28)
  box(colL, embY, '#e6934a', 'Input Embedding', undefined, 52)
  box(colR, embY, '#e6934a', 'Positional', 'Encoding', 52)

  arrow(x, colL, embY - 30, colL, r2bY + 32)
  arrow(x, colR, embY - 30, colR, r2bY + 32)
  box(colL, inpY, '#7f97d8', 'Input Embedding', '(output shift)', 58)
  box(colR, inpY, '#7f97d8', 'Output', '(shifted right)', 58)
}

function inferenceDiagram(x: CanvasRenderingContext2D, cy: number) {
  x.fillStyle = '#3c4150'
  x.font = 'italic 600 27px Georgia, serif'
  x.textAlign = 'left'
  x.fillText('prompt', 120, cy + 8)

  const chipColors = ['#d96a6a', '#7cb56b', '#f2c14e', '#d96a6a', '#7cb56b', '#f2c14e']
  chipColors.forEach((c, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    const px = 268 + col * 58
    const py = cy - 44 + row * 46
    rrect(x, px, py, 46, 34, 7)
    x.fillStyle = c
    x.fill()
    x.strokeStyle = 'rgba(28,32,42,0.45)'
    x.lineWidth = 1.4
    x.stroke()
  })

  arrow(x, 452, cy, 520, cy)

  rrect(x, 524, cy - 62, 200, 124, 18)
  x.fillStyle = '#e6934a'
  x.fill()
  x.strokeStyle = 'rgba(28,32,42,0.5)'
  x.lineWidth = 1.8
  x.stroke()
  x.fillStyle = '#232833'
  x.font = '700 26px Arial, Helvetica, sans-serif'
  x.textAlign = 'center'
  x.fillText('KV Cache', 624, cy + 8)

  arrow(x, 728, cy, 790, cy)

  const outColors = ['#7f97d8', '#8fbf7f', '#f2c14e', '#d96a6a']
  outColors.forEach((c, i) => {
    const px = 796 + (i % 2) * 58
    const py = cy - 44 + Math.floor(i / 2) * 46
    rrect(x, px, py, 46, 34, 7)
    x.fillStyle = c
    x.fill()
    x.strokeStyle = 'rgba(28,32,42,0.45)'
    x.lineWidth = 1.4
    x.stroke()
  })

  x.fillStyle = '#3c4150'
  x.font = 'italic 600 27px Georgia, serif'
  x.textAlign = 'left'
  x.fillText('logits', 930, cy + 8)
}

function baseCover(x: CanvasRenderingContext2D, w: number, h: number) {
  x.fillStyle = BG
  x.fillRect(0, 0, w, h)
  x.fillStyle = 'rgba(20,24,34,0.03)'
  for (let i = 0; i < 60; i++) x.fillRect(Math.random() * w, Math.random() * h, 2, 2)
}

function mlCover(x: CanvasRenderingContext2D, w: number, h: number) {
  baseCover(x, w, h)
  x.fillStyle = INK
  x.font = '800 96px Arial, Helvetica, sans-serif'
  spaced(x, 'MACHINE', w / 2, 320, 6)
  spaced(x, 'LEARNING', w / 2, 428, 6)
  x.fillStyle = '#e05a3a'
  x.fillRect(w / 2 - 34, 468, 68, 6)
  x.fillStyle = SUB
  x.font = '600 25px Arial, Helvetica, sans-serif'
  spaced(x, 'A PRACTICAL GUIDE TO BUILDING', w / 2, 545, 5)
  spaced(x, 'INTELLIGENT SYSTEMS', w / 2, 585, 5)
  surfacePlot(x, w / 2, 1020, 1)
  keywordsRow(x, w, h, ['DATA', 'MODELS', 'INSIGHT', 'IMPACT'])
}

function nnCover(x: CanvasRenderingContext2D, w: number, h: number) {
  baseCover(x, w, h)
  x.fillStyle = '#1e63cf'
  x.font = '800 100px Arial, Helvetica, sans-serif'
  spaced(x, 'NEURAL', w / 2, 330, 4)
  spaced(x, 'NETWORKS', w / 2, 444, 4)
  x.fillStyle = SUB
  x.font = '600 26px Arial, Helvetica, sans-serif'
  spaced(x, 'LEARN. ADAPT. OPTIMIZE.', w / 2, 530, 6)
  nnDiagram(x, 950)
  keywordsRow(x, w, h, ['LEARN', 'REASON', 'EVOLVE', 'BUILD'])
}

function llmCover(x: CanvasRenderingContext2D, w: number, h: number) {
  baseCover(x, w, h)
  x.fillStyle = INK
  x.font = '800 88px Arial, Helvetica, sans-serif'
  spaced(x, 'LARGE LANGUAGE', w / 2, 315, 3)
  spaced(x, 'MODELS', w / 2, 415, 3)
  x.fillStyle = SUB
  x.font = '600 26px Arial, Helvetica, sans-serif'
  spaced(x, 'UNDERSTAND. GENERATE. REASON.', w / 2, 495, 5)
  transformerDiagram(x, w / 2, 560)
  keywordsRow(x, w, h, ['TOKENS', 'ATTENTION', 'TRANSFORM', 'GENERATE'])
}

function aiCover(x: CanvasRenderingContext2D, w: number, h: number) {
  baseCover(x, w, h)
  x.fillStyle = INK
  x.font = '800 88px Arial, Helvetica, sans-serif'
  spaced(x, 'AI INFERENCE', w / 2, 330, 3)
  spaced(x, 'ENGINEERING', w / 2, 428, 3)
  x.fillStyle = SUB
  x.font = '600 26px Arial, Helvetica, sans-serif'
  spaced(x, 'BUILD FAST. SERVE SMART.', w / 2, 505, 5)
  inferenceDiagram(x, 960)
  keywordsRow(x, w, h, ['OPTIMIZE', 'CACHE', 'SERVE', 'SCALE'])
}

export const learningBooks: BookCfg[] = [
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    author: 'ITSS',
    desc: 'A practical guide to building intelligent systems — from core ideas to working models.',
    spineBg: BG,
    spineInk: INK,
    spineFont: '700 38px Arial, Helvetica, sans-serif',
    backBg: BG,
    backInk: '32,36,46',
    front: mlCover,
    chapters: ['Foundations', 'Data & Features', 'Model Training', 'Evaluation', 'Deployment'],
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    author: 'ITSS',
    desc: 'Learn, adapt, optimize — how connected layers turn data into predictions.',
    spineBg: BG,
    spineInk: INK,
    spineFont: '700 38px Arial, Helvetica, sans-serif',
    backBg: BG,
    backInk: '32,36,46',
    front: nnCover,
    chapters: ['Neurons & Layers', 'Activation', 'Backpropagation', 'Training', 'Inference'],
  },
  {
    id: 'large-language-models',
    title: 'Large Language Models',
    author: 'ITSS',
    desc: 'Understand, generate, reason — inside the architecture of modern language models.',
    spineBg: BG,
    spineInk: INK,
    spineFont: '700 34px Arial, Helvetica, sans-serif',
    backBg: BG,
    backInk: '32,36,46',
    front: llmCover,
    chapters: ['Tokens', 'Attention', 'Transformers', 'Pretraining', 'Fine-tuning'],
  },
  {
    id: 'ai-inference-engineering',
    title: 'AI Inference Engineering',
    author: 'ITSS',
    desc: 'Build fast, serve smart — serving, caching and scaling models in production.',
    spineBg: BG,
    spineInk: INK,
    spineFont: '700 32px Arial, Helvetica, sans-serif',
    backBg: BG,
    backInk: '32,36,46',
    front: aiCover,
    chapters: ['Serving', 'Batching', 'KV Cache', 'Quantization', 'Scaling'],
  },
]
