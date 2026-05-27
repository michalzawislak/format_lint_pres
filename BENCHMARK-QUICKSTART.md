# 🚀 Quick Start - Benchmarki na Żywo

## ✅ Status: GOTOWE DO UŻYCIA!

**Projekt testowy:** `benchmark-angular/`  
**Pliki:** 116 (46 .ts + 35 .html + 35 .scss)  
**Rozmiar:** 476KB realistycznego kodu Angular

---

## 🎯 Szybki Start (3 kroki)

### 1. Zainstaluj narzędzia (2 minuty)

```bash
cd benchmark-angular

# Podstawowe
npm install -D prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Biome (szybkie!)
npm install -D @biomejs/biome

# Oxc (opcjonalne - najnowsze)
npm install -D oxc
```

### 2. Uruchom prosty test (30 sekund)

```bash
# Test Prettier
time prettier --write "src/**/*.{ts,html,scss}"

# Test Biome
time biome format --write .
```

### 3. Zobacz różnicę! 

Spodziewane wyniki:
- **Prettier:** ~1.5-2.5s  
- **Biome:** ~80-150ms  
- **Różnica:** 15-20x szybciej! 🚀

---

## 🎤 Live Demo Podczas Prezentacji

### Setup (przed prezentacją)

1. **Otwórz 3 terminale z dużą czcionką**
2. **Przygotuj komendy** w każdym terminalu
3. **Uruchom RAZ przed demo** (cache warming)

### Terminal 1: Pokazanie projektu
```bash
cd benchmark-angular
echo "📊 Benchmark Project:"
echo "TypeScript: $(find src -name '*.ts' | wc -l) files"
echo "HTML:       $(find src -name '*.html' | wc -l) files"  
echo "SCSS:       $(find src -name '*.scss' | wc -l) files"
echo "Total:      116 files"
echo "Size:       $(du -sh . | cut -f1)"
```

### Terminal 2: Prettier (wolno)
```bash
echo "⏱️  Test 1: Prettier..."
time prettier --write "src/**/*.{ts,html,scss}"
```

### Terminal 3: Biome (szybko!)
```bash
echo "⚡ Test 2: Biome..."
time biome format --write .
```

---

## 📊 Przykładowe Wyniki

### Format (116 plików)
```
Prettier:  1.8s   ████████████████████
Biome:     0.12s  █
Speedup:   15x szybciej!
```

### Lint (46 plików .ts)
```
ESLint:    3.2s   ████████████████████
Biome:     0.15s  █
Speedup:   21x szybciej!
```

---

## 🔧 Troubleshooting

**"prettier: command not found"**
```bash
npx prettier --write "src/**/*.{ts,html,scss}"
```

**"Biome not installed"**
```bash
npm install -D @biomejs/biome
npx @biomejs/biome init
```

**Benchmark nie działa**
- Sprawdź czy jesteś w `benchmark-angular/`
- Upewnij się że `src/` folder istnieje
- Uruchom: `find src -name "*.ts" | wc -l` (powinno pokazać 46)

---

## 💡 Tips

- **Pokaz różnicę w real-time** - uruchamiaj komendy na żywo
- **Podkreśl speedup** - "6 sekund vs 120ms = 50x szybciej!"
- **Miej backup** - screenshot wyników na wypadek problemów
- **Test pre-commit** - pokaż jak to wpływa na workflow

---

**Pełny przewodnik:** `BENCHMARK-GUIDE.md`  
**Status:** ✅ Gotowe!
