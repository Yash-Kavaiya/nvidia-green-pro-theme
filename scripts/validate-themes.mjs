import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagePath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

assert(pkg.contributes?.themes?.length === 2, 'package.json must contribute exactly two themes.');

const hex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const colorKeysRequired = [
  'editor.background', 'editor.foreground', 'editorCursor.foreground',
  'activityBar.background', 'sideBar.background', 'statusBar.background',
  'terminal.background', 'terminal.ansiGreen', 'gitDecoration.addedResourceForeground',
  'diffEditor.insertedTextBackground', 'notebook.editorBackground'
];
const semanticRequired = ['class', 'function', 'method', 'parameter', 'variable', 'property', 'keyword', 'string', 'number', '*.deprecated'];

for (const themeContribution of pkg.contributes.themes) {
  const themePath = path.join(root, themeContribution.path);
  assert(fs.existsSync(themePath), `${themeContribution.label}: missing theme file ${themeContribution.path}`);
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
  assert(theme.$schema === 'vscode://schemas/color-theme', `${theme.name}: missing VS Code color-theme schema.`);
  assert(theme.semanticHighlighting === true, `${theme.name}: semanticHighlighting must be enabled.`);
  assert(theme.colors && typeof theme.colors === 'object', `${theme.name}: colors object missing.`);
  assert(Array.isArray(theme.tokenColors), `${theme.name}: tokenColors array missing.`);
  assert(theme.semanticTokenColors && typeof theme.semanticTokenColors === 'object', `${theme.name}: semanticTokenColors missing.`);
  assert(Object.keys(theme.colors).length >= 250, `${theme.name}: expected at least 250 workbench colors, found ${Object.keys(theme.colors).length}.`);
  assert(theme.tokenColors.length >= 45, `${theme.name}: expected at least 45 TextMate token rules, found ${theme.tokenColors.length}.`);
  assert(Object.keys(theme.semanticTokenColors).length >= 25, `${theme.name}: expected at least 25 semantic token rules, found ${Object.keys(theme.semanticTokenColors).length}.`);
  for (const key of colorKeysRequired) {
    assert(typeof theme.colors[key] === 'string', `${theme.name}: required color '${key}' is missing.`);
  }
  for (const key of semanticRequired) {
    assert(theme.semanticTokenColors[key] !== undefined, `${theme.name}: required semantic token '${key}' is missing.`);
  }
  for (const [key, value] of Object.entries(theme.colors)) {
    assert(typeof value === 'string' && hex.test(value), `${theme.name}: color '${key}' has invalid value '${value}'.`);
  }
  for (const rule of theme.tokenColors) {
    assert(rule.name && rule.scope && rule.settings, `${theme.name}: every token rule needs name, scope, and settings.`);
    if (rule.settings.foreground !== undefined) {
      assert(hex.test(rule.settings.foreground), `${theme.name}: token '${rule.name}' has invalid foreground '${rule.settings.foreground}'.`);
    }
  }
}

if (failures.length) {
  console.error('Theme validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('NVIDIA Green Pro Theme validation passed.');
for (const themeContribution of pkg.contributes.themes) {
  const theme = JSON.parse(fs.readFileSync(path.join(root, themeContribution.path), 'utf8'));
  console.log(`${theme.name}: ${Object.keys(theme.colors).length} workbench colors, ${theme.tokenColors.length} token rules, ${Object.keys(theme.semanticTokenColors).length} semantic token rules.`);
}
