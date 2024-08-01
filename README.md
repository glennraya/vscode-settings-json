# Instructions

1. Install "Custom CSS and JS Loader" VS Code Extension.
2. Copy the contents of settings.json to your VS Code's settings.json (warning: it will overwrite your settings).
3. Add `vscode_custom_css.imports` array to your settings.json file:
```
"vscode_custom_css.imports": [
    // Absolute file paths for your css/js files
    // For Mac or Linux
    // "file:///Users/your-user-name/custom-vscode.css"

    // For Windows
    // "C:/username/custom-vscode.css"
],
```
4. Enable "Custom CSS and JS Loader" from VS Code's command dialog.
5. Customize the css or js from this repo to make it look the way you want to, or even better, explore areas of VS Code that you want to customize.
6. After making some changes, reload the extension (Reload Custom CSS and JS) from VS Code's command dialog.
