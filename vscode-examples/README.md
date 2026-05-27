# VSCode Settings Examples

Przykładowe konfiguracje VSCode dla różnych tier'ów setupu.

## Jak użyć

1. Skopiuj zawartość odpowiedniego pliku
2. Otwórz VSCode Settings (JSON)
   - macOS: `Cmd+Shift+P` → "Preferences: Open User Settings (JSON)"
   - Windows/Linux: `Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"
3. Wklej lub połącz z istniejącymi ustawieniami

## Tier 1: Prettier + ESLint

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

**Wymagane rozszerzenia:**
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Tier 2: Biome + ESLint

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome"
}
```

**Wymagane rozszerzenia:**
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Tier 3: Advanced Setup

Dla zaawansowanego setupu z wieloma narzędziami, możesz użyć workspace-specific settings:

1. Utwórz folder `.vscode/` w głównym katalogu projektu
2. Utwórz plik `.vscode/settings.json`
3. Dodaj konfigurację specyficzną dla projektu

Workspace settings nadpisują user settings, co pozwala na różne setupy dla różnych projektów.

## Dodatkowe Ustawienia

### Format on Paste

```json
{
  "editor.formatOnPaste": true
}
```

### Format on Type

```json
{
  "editor.formatOnType": true
}
```

### Auto Save

```json
{
  "files.autoSave": "onFocusChange"
}
```

## Rekomendowane Rozszerzenia dla Angular

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - inline errors
