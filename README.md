# magic-ui

A Claude Code skill for dashboards and slide decks in a quiet, dense, near-monochrome style. It holds copy rules, layouts, a fit-to-one-screen recipe, light and dark tokens with WCAG contrast checks, React + Tailwind v4 components, and a plain-CSS version for single-file pages.

The visual language comes from [kargulstudio/sales-crm](https://github.com/kargulstudio/sales-crm) (MIT). This project is not affiliated with Kargul Studio. See [NOTICE](NOTICE).

## Install

Personal (all projects):

```bash
git clone https://github.com/wyatthamilton20-hash/magic-ui ~/.claude/skills/magic-ui
```

One project only (commit it so your team gets it too):

```bash
git clone https://github.com/wyatthamilton20-hash/magic-ui .claude/skills/magic-ui
```

Or with the skills CLI:

```bash
npx skills add wyatthamilton20-hash/magic-ui
```

Restart Claude Code. The skill loads when you ask for a dashboard, console, admin UI or deck. You can also type `/magic-ui`.

## Update

```bash
git -C ~/.claude/skills/magic-ui pull
```

## Contents

- `SKILL.md`: entry point and routing
- `references/`: dashboards playbook, components, tokens, motion, slides, sources
- `assets/`: tokens CSS, plain CSS, deck CSS, React components, contrast checker, fit audit

## License

MIT. Third-party notices are in [NOTICE](NOTICE).
