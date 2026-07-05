# VS Code Marketplace Publishing Checklist

This project is ready to publish as a VS Code Marketplace color theme extension.

## Current package identity

- Extension name: `nvidia-green-pro-theme`
- Display name: `NVIDIA Green Pro Theme`
- Version: `1.0.0`
- GitHub repository: `https://github.com/Yash-Kavaiya/nvidia-green-pro-theme`
- Current package publisher field: `yash-kavaiya`

The `publisher` field in `package.json` now matches the VS Code Marketplace publisher ID: `yash-kavaiya`.

## Required Marketplace credential

Create or use an existing publisher at:

https://marketplace.visualstudio.com/manage

Then create an Azure DevOps Personal Access Token with Marketplace permissions:

https://dev.azure.com

Required permission:

- Marketplace: Manage

## Publish command

From this project root:

```bash
npm install
npm run validate
npm run package
export VSCE_PAT="<your-marketplace-pat>"
npm run publish:marketplace:pat
```

Alternative interactive login:

```bash
npx vsce login <publisher-id>
npm run publish:marketplace
```

## Important checks before publishing

1. Confirm `publisher` in `package.json` is your exact Marketplace publisher ID.
2. Confirm `version` is not already published.
3. Confirm README does not claim official NVIDIA affiliation.
4. Run `npm run validate`.
5. Run `npm run package` and inspect the generated `.vsix`.

## Post-publish verification

After publishing, verify the listing:

```bash
npx vsce show yash-kavaiya.nvidia-green-pro-theme
```

Then install directly from Marketplace in VS Code and confirm both themes appear:

- NVIDIA Green Pro Dark
- NVIDIA Green Pro Light
