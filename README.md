# NVIDIA Green Pro Theme

A production-level NVIDIA-inspired Visual Studio Code theme pack with both dark and light modes.

GitHub: https://github.com/Yash-Kavaiya/nvidia-green-pro-theme

This extension is not affiliated with or endorsed by NVIDIA. It uses an NVIDIA-inspired green/black visual direction for developer ergonomics.

## Included themes

- **NVIDIA Green Pro Dark** — deep black/green UI with high-contrast readable syntax.
- **NVIDIA Green Pro Light** — clean white/soft-green UI tuned for daylight use.

## Feature coverage

- Dark and light color themes in one extension.
- Comprehensive workbench colors for editor, tabs, activity bar, side bar, panels, status bar, title bar, menus, quick input, notifications, terminal, notebooks, debug UI, testing UI, SCM, Git decorations, diff/merge views, peek views, minimap, scrollbars, settings, charts, and welcome page.
- Semantic highlighting enabled and styled for classes, functions, methods, parameters, variables, properties, namespaces, decorators, default libraries, async/static/deprecated/documentation modifiers, and more.
- TextMate token colors for common language families: JavaScript/TypeScript/React, Python, Shell, SQL, Dockerfile, GraphQL, LaTeX, JSON/YAML, CSS, HTML, Markdown, diffs, and Git.
- Integrated terminal ANSI palette tuned to the theme colors.
- Marketplace-ready package metadata, icon, changelog, license, and validation script.

## Install from the packaged VSIX

After packaging, install the generated `.vsix` file:

```bash
code --install-extension nvidia-green-pro-theme-1.0.0.vsix
```

Then select one of these themes:

1. Open Command Palette: `Ctrl+Shift+P`
2. Run `Preferences: Color Theme`
3. Choose `NVIDIA Green Pro Dark` or `NVIDIA Green Pro Light`

## Development

```bash
npm install
npm run validate
npm run package
```

## Publish to VS Code Marketplace

Marketplace publishing requires a VS Code Marketplace publisher ID and an Azure DevOps Personal Access Token with Marketplace publishing permissions. After setting `VSCE_PAT`, run:

```bash
npm run publish:marketplace:pat
```

See `docs/marketplace-publishing.md` for the exact checklist.

The validation script checks that both theme files parse correctly, include the expected production-level coverage, and use valid hex colors.

## Palette

Core accent: `#76B900` NVIDIA-inspired green.

Dark mode uses near-black surfaces with green accents and cyan/amber/violet secondary syntax colors for readability.
Light mode uses white/soft-green surfaces with darker green accents to maintain contrast.

## Files

- `themes/nvidia-green-pro-dark-color-theme.json`
- `themes/nvidia-green-pro-light-color-theme.json`
- `scripts/validate-themes.mjs`
- `assets/icon.png`
