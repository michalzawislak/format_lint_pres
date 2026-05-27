# 🎯 Benchmarki - Szybki Start

## 3 sposoby uruchomienia benchmarków:

### 1️⃣ FULL DEMO (Zalecane dla prezentacji)
**Pełny, kolorowy output z wizualizacją**

```bash
./demo-benchmark.sh
```

### 2️⃣ QUICK (Najszybsze)
**Tylko czas, bez ozdobników**

```bash
./quick-benchmark.sh
```

### 3️⃣ MANUAL (Krok po kroku)
**Samodzielne uruchomienie każdego testu**

```bash
# Terminal 1 - Prettier
cd benchmark-angular
time npx prettier --write "src/**/*.{ts,html,scss}"

# Terminal 2 - Biome  
cd benchmark-angular
time npx @biomejs/biome format --write .
```

---

## 📋 Checklist przed prezentacją

- [ ] Uruchom test raz przed demo (cache warming)
- [ ] Zwiększ czcionkę w terminalu (min 16pt)
- [ ] Zamknij inne aplikacje (żeby nie spowalniać)
- [ ] Miej backup screenshot wyników
- [ ] Przećwicz przejście między slajdami a terminalem

---

## 🚀 Co pokazać?

1. **Start** - Pokazanie projektu (116 plików)
2. **Test 1** - Prettier (~700-900ms)
3. **Test 2** - Biome (~200-300ms)
4. **Podsumowanie** - "3x szybciej = lepsze dev experience!"

---

## 📁 Przydatne pliki

- `DEMO-INSTRUKCJA.md` - Szczegółowa instrukcja
- `BENCHMARK-QUICKSTART.md` - Oryginalny quick start
- `BENCHMARK-RESULTS.md` - Szczegółowe wyniki
- `benchmark-angular/` - Testowy projekt Angular

---

**Gotowe do użycia! 🎤**
