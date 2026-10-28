# Contributing to the ITSS Website

This is the official ITSS website repository. Contributions are welcome, but every PR must be clean, focused, and compliant with the rules below.

**Webmaster:** Jeric D. Septimo, ITSS President

## 1. Required Commit and PR Title Format

Every commit and every pull request title must use Conventional Commits:

```text
type(scope): short description
```

- `type` is required and must be one of the approved types below.
- `(scope)` is optional, but recommended when the change is limited to one area.
- `short description` must be lowercase, imperative, concise, and have no period.
- Keep the full title at 72 characters or fewer.

### Approved types

| Type | Use for |
| --- | --- |
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `refactor:` | Code restructuring without changing behavior |
| `docs:` | Documentation changes |
| `style:` | Formatting or styling changes with no logic change |
| `test:` | Adding or updating tests |
| `perf:` | Performance improvements |
| `build:` | Build system or dependency changes |
| `ci:` | CI/CD configuration changes |
| `chore:` | Maintenance tasks |
| `revert:` | Reverting a previous commit |

### Valid examples

```text
feat: add hover dropdown navigation
fix(header): close dropdown when pointer leaves
refactor(footer): simplify contact column markup
docs: add contribution guidelines
style(header): restore original nav typography
chore: update dependencies
```

### Invalid examples

```text
Update website
fixed bug
feat add dropdown
Feat: Add Dropdown
feat: Added a new dropdown to the header.
```

A PR containing invalid commit messages or an invalid PR title will be rejected.

## 2. Pull Request Requirements

PRs must be straightforward and reviewable.

- Use one PR for one feature, fix, or refactor.
- Keep the PR small and focused. Split large changes into separate PRs.
- Do not mix formatting-only changes with functional changes.
- Do not include unrelated files or unrelated code changes.
- Do not commit `node_modules/`, `dist/`, `.env` files, credentials, tokens, or secrets.
- Do not submit empty, duplicate, spam, or low-effort PRs.
- Sync with the latest `main` before opening the PR.
- All contributors must submit changes through a pull request. Direct pushes to `main` are reserved for the webmaster.

### Required PR description

Every PR must include:

```markdown
## Summary
What changed and why.

## Changes
- List the specific changes made.

## Testing
- State the commands run, such as `npm run build`.
- State what was checked manually.

## Screenshots
Include desktop and mobile screenshots for UI changes.
```

PRs without a meaningful description or required screenshots will be rejected.

### Branch names

Use a clear branch name in this format:

```text
type/short-description
```

Examples:

```text
feat/hover-navigation
fix/footer-white-gap
refactor/header-menu
docs/contributing-guide
```

## 3. Before Opening a PR

1. Install dependencies with `npm ci`.
2. Run `npm run lint` and confirm there are no errors.
3. Run `npm run build` and confirm it passes.
4. Run `npm run smoke` and confirm the built site passes the HTTP smoke test.
5. Test the affected pages and responsive layouts.
6. Confirm there are no console errors.
7. Check that no unrelated files, generated files, or secrets are included.
8. Write compliant commit messages and a compliant PR title.

You can run the required checks together with:

```bash
npm test
```

## 4. Review and Enforcement

- The `main` branch is protected. All changes must go through a pull request.
- The GitHub Actions CI check must pass before a PR can be merged.
- The webmaster or a designated maintainer reviews all PRs.
- Any PR that does not comply with this document is automatically rejected.
- PRs with the wrong title format, malformed commits, missing descriptions, unrelated changes, failing lint, failing builds, or failing smoke tests will be closed without review.
- Trash, spam, abusive, or intentionally low-effort PRs will be deleted immediately.
- Rejected PRs may be resubmitted only after the reported issues are fixed.
- The webmaster has the final decision on all contributions.

## 5. Security

Do not report security vulnerabilities through public issues, pull requests, or discussions. Follow the private reporting process in [SECURITY.md](SECURITY.md).

## 6. Questions

Contact the webmaster through the organization email:

**itss.cvsusc@gmail.com**
