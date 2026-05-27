# 🚀 Quick Start Guide

## Dla Prezentera

### 1. Uruchom prezentację

```bash
npm install
npm run dev
```

Otwórz http://localhost:3000 w przeglądarce.

### 2. Otwórz widok prezentera

Naciśnij **`S`** aby otworzyć widok prezentera w nowym oknie/tabie.

⚠️ **WAŻNE:** Widok prezentera zawiera wszystkie szczegółowe notatki, przykłady i statystyki!

### 3. Nawigacja

- **Strzałki ← →** lub **spacja** - następny/poprzedni slajd
- **ESC** - overview wszystkich slajdów
- **?** - pełna lista skrótów
- **F** - pełny ekran
- **B** lub **.** - blackout screen (pauza)

### 4. Live Demo (opcjonalne)

Jeśli chcesz pokazać live demo benchmarków:

```bash
# W nowym terminalu
cd /path/to/angular/project

# Zmierz obecny setup
time (prettier --write . && eslint --fix .)

# Zmierz z Biome
time biome format --write .
```

## Dla Uczestników

Prezentacja dostępna online: [URL after deploy]

### Materiały

- 📄 [Brief z notatkami](.ai/sos-presentation-breif.md)
- 📦 [Przykładowe konfiguracje](package-examples/)
- 🖥️ [VSCode settings](vscode-examples/)
- ✅ [Checklist implementacji](CHECKLIST.md)

### Po Prezentacji

1. Sprawdź **CHECKLIST.md** dla action items
2. Wybierz tier implementacji (1/2/3)
3. Zobacz przykłady w `package-examples/`
4. Setup VSCode według `vscode-examples/`

## Troubleshooting

### Prezentacja nie ładuje się

```bash
# Wyczyść cache i zainstaluj ponownie
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Widok prezentera nie otwiera się

- Upewnij się że pop-upy nie są zablokowane
- Spróbuj ręcznie: http://localhost:3000/?view=speaker

### Port 3000 zajęty

```bash
npm run dev -- --port 3001
```

## Tips

### Dla Prezentera

1. **Przećwicz z notatkami** - widok prezentera zawiera DUŻO informacji
2. **Przygotuj terminal** - duża czcionka dla live demo
3. **Backup plan** - screenshots benchmarków na wypadek problemów
4. **Time management** - slajdy 3-8 to core content (15 min)

### Dla Zespołu

1. **Zmierz obecny pain** - przed prezentacją sprawdź swój pre-commit time
2. **Przygotuj pytania** - szczególnie o Angular-specific concerns
3. **Bądź otwarty** - na eksperymenty, ale też realistyczny co do ryzyka

## Next Steps

Po prezentacji:

```bash
# 1. Wybierz tier i stwórz branch
git checkout -b setup-tooling-tier2

# 2. Skopiuj odpowiednią konfigurację
cp package-examples/tier2-biome.json package.json

# 3. Zainstaluj dependencies
npm install

# 4. Setup Husky
npx husky init

# 5. Test na małej części projektu
# 6. Review z zespołem
# 7. Merge
```

---

**Questions?** Otwórz issue lub ping na Slack #frontend-tooling
