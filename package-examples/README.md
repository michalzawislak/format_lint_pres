# Przykładowe konfiguracje

Ten folder zawiera przykładowe konfiguracje dla różnych tier'ów rekomendacji z prezentacji.

## Struktura

- `tier1-separated.json` - Przykładowa konfiguracja package.json dla Tier 1 (Prettier + ESLint separated)
- `tier2-biome.json` - Przykładowa konfiguracja package.json dla Tier 2 (Biome + ESLint)

## Użycie

Skopiuj odpowiednią sekcję `scripts` i `lint-staged` do swojego `package.json`.

## Husky Setup

```bash
# Instalacja
npm install -D husky lint-staged

# Inicjalizacja
npx husky init

# Plik .husky/pre-commit zostanie utworzony automatycznie
# Edytuj go aby uruchamiał lint-staged:
echo "npx lint-staged" > .husky/pre-commit
```

## Tier 1: Minimum Setup

```bash
npm install -D prettier eslint eslint-config-prettier husky lint-staged
```

## Tier 2: Optimized Setup

```bash
npm install -D @biomejs/biome eslint husky lint-staged
npx @biomejs/biome init
```

## Tier 3: Cutting Edge

```bash
npm install -D @biomejs/biome eslint oxc husky lint-staged
```
