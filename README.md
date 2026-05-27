# Prezentacja SoS - Formatowanie i Lintowanie w 2026

Prezentacja w formacie Reveal.js o nowoczesnym podejściu do formatowania i lintowania kodu w projektach Angular.

## 📋 Temat

Nowoczesne podejście do formatowania i lintowania kodu w kontekście:
- Ewolucji narzędzi (Prettier → Biome/Oxc)
- Separacji vs integracji formattera i lintera
- Automatyzacji przez Husky + lint-staged
- Wpływu AI-first development (Copilot) na wybór narzędzi

**Czas trwania:** 25 minut + 10 minut Q&A  
**Grupa docelowa:** Frontend Developers (Angular)

## 🚀 Quick Start

### Instalacja

```bash
npm install
```

### Uruchomienie

```bash
npm run dev
```

Prezentacja będzie dostępna pod adresem: **http://localhost:3000**

### Build produkcyjny

```bash
npm run build
```

Zbudowana prezentacja znajdzie się w folderze `dist/`.

## 📁 Struktura Projektu

```
pres/
├── index.html              # Główny plik prezentacji (11 slajdów)
├── main.js                 # Konfiguracja Reveal.js
├── style.css               # Niestandardowe style
├── .ai/
│   └── sos-presentation-breif.md  # Szczegółowy brief z notatkami
├── package-examples/       # Przykładowe konfiguracje dla różnych tier'ów
│   ├── tier1-separated.json
│   ├── tier2-biome.json
│   └── README.md
├── benchmark-format.sh     # Skrypt do benchmarku formatowania
├── benchmark-lint.sh       # Skrypt do benchmarku lintowania
├── .prettierrc             # Przykładowa konfiguracja Prettier
├── biome.json              # Przykładowa konfiguracja Biome
└── .husky-example/         # Przykładowa konfiguracja Husky
    └── pre-commit
```

## ⌨️ Nawigacja w Prezentacji

- **Strzałki ← →** - przełączanie slajdów
- **S** - widok prezentera z notatkami (WAŻNE!)
- **ESC** - przegląd wszystkich slajdów
- **F** - pełny ekran
- **?** - pomoc z wszystkimi skrótami

## 📝 Notatki dla Prezentera

Naciśnij **`S`** podczas prezentacji aby otworzyć widok prezentera ze szczegółowymi notatkami dla każdego slajdu. Notatki zawierają:
- Konkretne przykłady kodu
- Statystyki i benchmarki
- Sugerowane pytania do zespołu
- Odpowiedzi na typowe obawy

## 📊 Slajdy

1. **Title Slide** - Wprowadzenie
2. **Problem Statement** - Obecna sytuacja (eslint-plugin-prettier)
3. **Fundamentals** - Różnica między formatter a linter
4. **Landscape 2026** - Nowe narzędzia (Biome, Oxc)
5. **Pytanie 1** - Prettier czy Biome?
6. **Pytanie 2** - Osobno czy razem?
7. **Pytanie 3** - Husky jako automatyzacja
8. **Pytanie 4** - AI-first development
9. **Propozycja** - Live benchmark
10. **Rekomendacje** - 3 tier'y implementacji
11. **Q&A** - Pytania i dyskusja

## 🛠️ Przykładowe Konfiguracje

W folderze `package-examples/` znajdziesz przykładowe konfiguracje dla:
- **Tier 1**: Minimum (Prettier + ESLint separated)
- **Tier 2**: Optimized (Biome + ESLint)
- **Tier 3**: Cutting Edge (Oxc + Biome + ESLint)

## 📈 Benchmarki

Uruchom skrypty benchmarkowe aby przetestować wydajność na swoim projekcie:

```bash
# Benchmark formatowania
./benchmark-format.sh

# Benchmark lintowania
./benchmark-lint.sh
```

**Uwaga:** Zainstaluj odpowiednie narzędzia przed uruchomieniem benchmarków.

## 🎯 Key Takeaways

1. **Formatter ≠ Linter** - to dwa różne narzędzia z różnymi celami
2. **Rust tools są 25-50x szybsze** - ale ekosystem jest młodszy
3. **Separacja > Integracja** - lepsze error messages, zero konfliktów
4. **Husky + lint-staged** - must-have dla automatyzacji
5. **AI-first development** - zmienia priorytety (prędkość jest krytyczna)

## 📚 Dodatkowe Zasoby

- [Biome Documentation](https://biomejs.dev)
- [Oxc Project](https://oxc.rs)
- [Husky v9](https://typicode.github.io/husky)
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org)

## 🤝 Feedback

Po prezentacji, zbierz feedback:
- Czy obecny pre-commit hook frustruje zespół?
- Jak często używają Copilot?
- Który tier chcą zaimplementować?

## 📄 Licencja

Ten projekt jest dostępny jako przykład prezentacji dla zespołów frontend.
