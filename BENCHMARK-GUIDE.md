# 🎯 Benchmark - Instrukcja Użycia

## ✅ Co Jest Gotowe

### 1. Projekt Testowy
✅ **benchmark-angular/** - Pełny projekt z realistycznymi plikami:
- **46 plików TypeScript** (komponenty, serwisy, guardy)
- **35 plików HTML** (templates Angular)
- **35 plików SCSS** (style)
- **TOTAL: 116 plików** ✅ GOTOWE!
- **Rozmiar:** 476KB kodu

### 2. Struktura Projektu (Zweryfikowana ✅)
```
benchmark-angular/
├── package.json ✅
├── .prettierrc ✅
├── biome.json ✅
└── src/app/
    ├── core/
    │   ├── services/ ✅ (7 serwisów: 798 linii kodu każdy)
    │   └── guards/ ✅ (4 guardy: ~50 linii każdy)
    ├── features/
    │   ├── users/ ✅ (10 komponentów)
    │   ├── products/ ✅ (10 komponentów)
    │   └── orders/ ✅ (10 komponentów)
    └── shared/
        └── components/ ✅ (5 komponentów: button, card, modal, table, form-input)
```

### 3. Skrypty Benchmarkowe
- ✅ `benchmark-format.sh` - testuje Prettier, Biome, Oxc (formatowanie)
- ✅ `benchmark-lint.sh` - testuje ESLint, Biome, Oxc (lintowanie)
- ✅ `generate-benchmark-project.sh` - generator projektu (już wykonany)

## 🚀 Jak Uruchomić Benchmarki

### Krok 1: Zainstaluj narzędzia

```bash
cd benchmark-angular

# Podstawowe narzędzia
npm install -D prettier eslint typescript

# Biome
npm install -D @biomejs/biome

# Oxc (opcjonalne - najnowsze)
npm install -D oxc

# Angular dependencies (dla ESLint)
npm install -D @angular/core @angular/common rxjs
```

### Krok 2: Skonfiguruj narzędzia

#### Prettier (.prettierrc)
```bash
# Skopiuj config z głównego folderu
cp ../.prettierrc .
```

#### Biome (biome.json)
```bash
# Skopiuj config
cp ../biome.json .

# LUB inicjalizuj
npx @biomejs/biome init
```

#### ESLint (eslint.config.js)
```bash
cat > eslint.config.js << 'EOF'
export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
EOF
```

### Krok 3: Uruchom Benchmarki

#### A. Format Benchmark
```bash
cd benchmark-angular
../benchmark-format.sh
```

To zmierzy czas dla:
- Prettier (format all files)
- Biome (format all files)
- Oxc/oxfmt (format all files)

#### B. Lint Benchmark
```bash
../benchmark-lint.sh
```

To zmierzy czas dla:
- ESLint (lint all .ts files)
- Biome lint (lint all files)
- Oxlint (lint all files)

#### C. Live Demo podczas prezentacji

**Opcja 1: Pojedyncze testy**
```bash
cd benchmark-angular

# Test 1: Prettier
time prettier --write "src/**/*.{ts,html,scss}"

# Test 2: Biome
time biome format --write .

# Test 3: ESLint
time eslint "src/**/*.ts"
```

**Opcja 2: Z użyciem npm scripts**
```bash
npm run format:prettier  # Prettier
npm run format:biome     # Biome
npm run lint:eslint      # ESLint
npm run lint:biome       # Biome lint
```

## 📊 Przykładowe Wyniki (Spodziewane)

Na M3 MacBook Pro, 116 plików:

### Formatowanie
```
Prettier:    1.5 - 2.5s   ████████████████████
Biome:       80 - 150ms   █
Oxc:         60 - 120ms   █
```

### Lintowanie
```
ESLint:      2.5 - 4s     ████████████████████
Biome lint:  100 - 200ms  █
Oxlint:      80 - 150ms   █
```

## 🎤 Tips dla Prezentacji

### Przygotowanie przed prezentacją
1. **Uruchom każde narzędzie RAZ** przed prezentacją (cache warming)
2. **Sprawdź czy wszystkie narzędzia działają**
3. **Przygotuj terminal z dużą czcionką** (dla widoczności)
4. **Otwórz 2-3 terminale** z gotowymi komendami

### Podczas prezentacji
1. **Pokaż strukturę projektu** (`ls -la src/app/`)
2. **Policz pliki** (`find . -name "*.ts" | wc -l`)
3. **Uruchom benchmarki na żywo**
4. **Podkreśl różnicę w czasie** (6s vs 120ms = 50x!)

### Przykładowy flow live demo:
```bash
# Terminal 1: Struktura
cd benchmark-angular
echo "Pliki TypeScript: $(find src -name '*.ts' | wc -l)"
echo "Templates HTML:   $(find src -name '*.html' | wc -l)"
echo "Style SCSS:       $(find src -name '*.scss' | wc -l)"

# Terminal 2: Prettier
echo "Test 1: Prettier..."
time prettier --write "src/**/*.{ts,html,scss}"

# Terminal 3: Biome
echo "Test 2: Biome..."
time biome format --write .
```

## 🔧 Troubleshooting

### Narzędzie nie znalezione
```bash
# Sprawdź czy zainstalowane
which prettier
which biome
which oxfmt

# Zainstaluj jeśli brakuje
npm install -D <package>
```

### Błędy podczas benchmarku
```bash
# Sprawdź logi
npm run format:prettier 2>&1 | tee prettier.log
npm run format:biome 2>&1 | tee biome.log
```

### Cache issues
```bash
# Wyczyść cache ESLint
rm -rf .eslintcache

# Wyczyść cache Biome
rm -rf node_modules/.cache
```

## 📈 Rozszerzenie Benchmarków

### Dodaj więcej plików
```bash
# Wygeneruj ponownie z większą ilością
# Edytuj generate-benchmark-project.sh:
# for i in {1..20}; do  # było 1..10
```

### Testuj pre-commit hook
```bash
# Setup Husky w benchmark-angular/
npm install -D husky lint-staged
npx husky init

# Test pre-commit time
git init
git add .
time git commit -m "test"
```

### Testuj na różnych rozmiarach
```bash
# Mały projekt (116 plików) - gotowe ✅
# Średni projekt (250+ plików) - do wygenerowania
# Duży projekt (500+ plików) - do wygenerowania
```

## ✅ Checklist Przed Prezentacją

- [ ] Projekt benchmark-angular wygenerowany
- [ ] Wszystkie narzędzia zainstalowane
- [ ] Benchmarki przetestowane (dry run)
- [ ] Terminal z dużą czcionką przygotowany
- [ ] Backup screenshots wyników (jeśli live demo nie zadziała)
- [ ] Notowane czasy dla porównania
- [ ] Przygotowane komendy w oddzielnych terminalach

---

**Status:** ✅ Gotowe do użycia  
**Lokalizacja:** `/Users/michal/Projects/pres/benchmark-angular/`  
**Total plików:** 116 (46 .ts + 35 .html + 35 .scss)
