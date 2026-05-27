# 🎤 Instrukcja Live Demo - Benchmarki

## Najprostsza metoda (ZALECANA)

### Przed prezentacją:

1. **Otwórz terminal w folderze projektu**
   ```bash
   cd /Users/michal/Projects/pres
   ```

2. **Test uruchomienia** (sprawdź że działa):
   ```bash
   ./demo-benchmark.sh
   ```

### Podczas prezentacji:

**Po prostu uruchom:**
```bash
./demo-benchmark.sh
```

To wszystko! Skrypt:
- ✅ Pokaże kolorowy output
- ✅ Zmierzy oba narzędzia
- ✅ Wyświetli porównanie wizualne
- ✅ Obliczy speedup automatycznie

---

## Co zobaczysz?

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║       🚀  LIVE BENCHMARK DEMO  🚀                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

📊 Testowany projekt:
   TypeScript: 46 plików
   HTML:       35 plików
   SCSS:       35 plików
   Razem:      116 plików

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️  TEST 1: Prettier (tradycyjne narzędzie)
   Uruchamiam...
   ✅ Gotowe!
   Czas: 854ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ TEST 2: Biome (nowoczesne narzędzie)
   Uruchamiam...
   ✅ Gotowe!
   Czas: 6ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 WYNIKI:

   Prettier:  ████████████████████████  854ms
   Biome:     █  6ms

   🚀 Biome jest 142x SZYBSZY!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ BENCHMARK ZAKOŃCZONY!

💡 Co to oznacza w praktyce?
   • Szybsze pre-commit hooks
   • Krótszy czas CI/CD
   • Lepsze developer experience
```

---

## Alternatywne metody (jeśli skrypt nie działa)

### Metoda manualna:

#### Terminal 1 - Info o projekcie:
```bash
cd benchmark-angular
echo "Plików TypeScript: $(find src -name '*.ts' | wc -l)"
echo "Plików HTML: $(find src -name '*.html' | wc -l)"
echo "Plików SCSS: $(find src -name '*.scss' | wc -l)"
```

#### Terminal 2 - Prettier:
```bash
cd benchmark-angular
echo "🕐 Test Prettier..."
time npx prettier --write "src/**/*.{ts,html,scss}"
```

#### Terminal 3 - Biome:
```bash
cd benchmark-angular
echo "⚡ Test Biome..."
time npx @biomejs/biome format --write .
```

---

## Troubleshooting

### "npx: command not found"
Zainstaluj Node.js: https://nodejs.org/

### "prettier: command not found"
```bash
cd benchmark-angular
npm install
```

### Skrypt nie ma uprawnień
```bash
chmod +x demo-benchmark.sh
```

### Chcę uruchomić tylko jeden test
**Tylko Prettier:**
```bash
cd benchmark-angular
time npx prettier --write "src/**/*.{ts,html,scss}"
```

**Tylko Biome:**
```bash
cd benchmark-angular
time npx @biomejs/biome format --write .
```

---

## Tips dla prezentacji

1. **Zwiększ czcionkę w terminalu** - minimum 16-18pt
2. **Uruchom raz przed demo** - cache warming
3. **Przygotuj backup screenshot** - na wypadek problemów z siecią/instalacją
4. **Podkreśl różnicę** - "ponad 100x szybciej!"
5. **Pokazuj na żywo** - lepiej niż prezentacja ze slajdami

---

## Czego unikać

❌ **Nie komplikuj** - jeden skrypt to wszystko co potrzebujesz
❌ **Nie instaluj w trakcie** - wszystko powinno być gotowe przed prezentacją  
❌ **Nie miej otwartych innych programów** - żeby nie spowalniać testów
❌ **Nie uruchamiaj kilku razy pod rząd** - cache może zmienić wyniki

---

**Gotowe! Powodzenia na prezentacji! 🚀**
