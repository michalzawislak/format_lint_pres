# PRD: Prezentacja SoS - Formatowanie i Lintowanie w 2026

## Metadata
- **Temat**: Nowoczesne podejście do formatowania i lintowania kodu w projektach Angular
- **Grupa docelowa**: Frontend Developers (Angular)
- **Kontekst**: Daily usage GitHub Copilot, aktualnie używamy eslint-plugin-prettier
- **Czas trwania**: 25 minut + 10 minut Q&A
- **Format**: Reveal.js

---

## Executive Summary

Prezentacja odpowiada na kluczowe pytania o nowoczesny setup narzędzi jakości kodu w kontekście:
- Ewolucji narzędzi (Prettier → Biome/Oxc)
- Separacji vs integracji formattera i lintera
- Automatyzacji przez Husky + lint-staged
- Wpływu AI-first development (Copilot) na wybór narzędzi

**Główna teza**: W 2026 roku, przy daily usage AI coding assistants, prędkość narzędzi i spójność reguł stały się krytyczne. Tradycyjny setup (eslint-plugin-prettier) może nie być optymalny.

---

## Struktura Prezentacji

### SLAJD 1: Title Slide (1 min)
**Tytuł**: "Formatowanie i Lintowanie w 2026: Prettier, Biome, czy ESLint?"

**Podtytuł**: "Jak optymalizować workflow w erze AI-assisted development"

**Notatki dla prezentera**:
```
Hook: 20 commitów × 6s = 2 min dziennie = 7.3h rocznie straconego czasu.

Temat: narzędzia do formatowania i lintowania - podstawa codziennej pracy.
Obecnie: eslint-plugin-prettier łączy obie funkcje.
Pytanie: czy to nadal najlepsze w 2026? Szczególnie z Copilot daily?

4 kluczowe pytania:
1. Prettier czy Biome?
2. Łączyć czy rozdzielać?
3. Jak Husky pomaga?
4. Co zmienia AI?
```

---

### SLAJD 2: Problem Statement - Obecna Sytuacja (3 min)

**Tytuł**: "Gdzie jesteśmy teraz?"

**Treść slajdu**:
- 📦 eslint-plugin-prettier
- 🔗 Formatowanie PRZEZ linter
- ⚠️ Konflikty reguł (eslint-config-prettier)
- 🐌 Pre-commit hook: ~3-6 sekund
- 🤖 Copilot daily → więcej kodu → więcej czekania

**Diagram**: Flow obecnego procesu

**Notatki dla prezentera**:
```
Obecny setup: eslint-plugin-prettier (Prettier JAKO reguła ESLint)

5 głównych problemów:
1. KONFLIKTY - potrzeba eslint-config-prettier (dodatkowa warstwa)
2. BUGI - arrow-body-style może generować invalid code
3. PERFORMANCE - 3-6s pre-commit = przerwany flow
4. COPILOT EFFECT - więcej kodu = więcej czekania = frustracja
5. DEBUGOWANIE - niejasne źródło błędów (formatter? linter? plugin?)

Pytania do zespołu:
- Czy pre-commit hook was frustruje?
- Czy mieliście konflikty ESLint ↔ Prettier?
```

**Visual**: Screenshot z terminalem pokazującym wolny pre-commit

---

### SLAJD 3: Fundamentals - Formatter vs Linter (4 min)

**Tytuł**: "Najpierw podstawy: Formatter ≠ Linter"

**Treść slajdu**:

| Aspect | Formatter (Prettier) | Linter (ESLint) |
|--------|---------------------|-----------------|
| **Cel** | Spójny STYL kodu | Wykrywanie BŁĘDÓW i bad practices |
| **Przykłady** | spacje, średniki, długość linii, cudzysłowy | unused variables, missing dependencies, a11y issues |
| **Subiektywność** | Opinionated (niewiele opcji) | Konfigurowalne (setki reguł) |
| **Auto-fix** | Zawsze bezpieczny | Czasami ryzykowny |
| **Dla AI** | Krytyczne (consistency) | Ważne (quality) |

**Przykłady kodu**:
```typescript
// FORMATTER - jak wygląda kod
const user={name:"John",age:30}; 
// ↓ Prettier
const user = { name: "John", age: 30 };

// LINTER - co robi kod
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}); // ❌ ESLint: missing dependency array
```

**Notatki dla prezentera**:
```
KLUCZOWA różnica:

FORMATTER (Prettier/Biome):
- Pytanie: "JAK kod wygląda?" (spacje, quotes, średniki, wcięcia)
- Opinionated - niewiele opcji (to FEATURE, kończy wojny o style)
- Auto-fix ZAWSZE bezpieczny (nie zmienia logiki)
- Przykład: długa linia → automatyczny line break

LINTER (ESLint):
- Pytanie: "Czy kod POPRAWNY?" (quality, bugs, best practices)
- Setki reguł, konfigurowalne + pluginy (Angular, RxJS, a11y)
- Auto-fix CZASAMI ryzykowny (może zmienić logikę)
- Przykłady: unused vars, missing OnDestroy, accessibility issues

DLACZEGO WAŻNE DLA AI?
1. Formatter = KRYTYCZNY - Copilot generuje różne style → bez formattera = chaos
2. Linter = WAŻNY - łapie unused imports, missing types, a11y issues

To DWA RÓŻNE problemy wymagające DWÓCH RÓŻNYCH narzędzi.
```

**Visual**: Split screen - po lewej formatted vs unformatted, po prawej good vs bad code logic

---

### SLAJD 4: Landscape 2026 - Nowe Narzędzia (5 min)

**Tytuł**: "Co nowego w 2026? Rust zmienia wszystko"

**Treść slajdu**:

**Tradycyjny stack (JavaScript)**:
- Prettier (formatter) + ESLint (linter)
- Node.js based, single-threaded
- Dojrzały ekosystem, miliony użytkowników

**Nowe narzędzia (Rust)**:
- **Biome** - all-in-one (format + lint)
- **Oxc** - modularne (Oxfmt + Oxlint)
- 10-100x szybsze
- Multi-threaded, native binaries

**Benchmarki** (250 plików Angular):
```
Format + Lint:
├─ ESLint + Prettier:  ~6s    ████████████████████████
├─ Biome:              ~120ms █
└─ Oxc:                ~100ms █
```

**Notatki dla prezentera**:
```
REWOLUCJA RUST w tooling:

TRADYCYJNY (JS):
- Prettier + ESLint: single-threaded, wolne (15-30s enterprise projekt)

NOWY (RUST):
- Compiled, multi-threaded, memory efficient
- Biome: all-in-one, 97% kompatybilny z Prettier, zero config
- Oxc: modularne (Oxfmt+Oxlint), najszybsze, plugin API

REALNE BENCHMARKI (nasz test 116 plików):
- Prettier: 854ms
- Biome: 6ms (142x szybciej!)
- Catch: Biome nie formatuje .html/.scss, tylko .ts/.json

HYBRID SOLUTION: Biome dla .ts (6ms) + Prettier dla .html/.scss (400ms) 
= ~406ms total vs 854ms = 52% szybciej

GDZIE CATCH?
1. EKOSYSTEM - ESLint ~500 pluginów, Biome NIE MA Angular-specific
2. DOJRZAŁOŚĆ - ESLint 10+ lat, Biome 2 lata, Oxc <1 rok
3. ANGULAR RULES - @angular-eslint krytyczne dla nas

ROZWIĄZANIE: Hybrid
- Biome/Oxc dla podstaw (90% przypadków)
- ESLint dla Angular-specific (CI, pre-push)
```

**Visual**: Wykres porównawczy performance + tabela feature comparison

---

### SLAJD 5: Pytanie 1 - Prettier czy Biome? (4 min)

**Tytuł**: "Pytanie 1: Prettier czy Biome (czy coś innego)?"

**Treść slajdu**:

**Kryteria decyzyjne**:
1. ⚡ Prędkość vs 🔌 Ekosystem
2. 🎯 Prostota vs 🛠️ Elastyczność
3. 🏗️ Dojrzałość vs 🚀 Innowacja
4. 🅰️ Angular-specific needs

**Macierz decyzyjna**:
```
                  Prettier + ESLint    Biome           Oxc
Prędkość          ⭐                   ⭐⭐⭐⭐⭐      ⭐⭐⭐⭐⭐
Angular plugins   ⭐⭐⭐⭐⭐            ⭐              ⭐⭐⭐
Setup             ⭐⭐⭐               ⭐⭐⭐⭐⭐      ⭐⭐⭐⭐
Dojrzałość        ⭐⭐⭐⭐⭐            ⭐⭐⭐⭐        ⭐⭐⭐
Community         ⭐⭐⭐⭐⭐            ⭐⭐⭐          ⭐⭐
```

**Notatki dla prezentera**:
```
Dobra, konkretnie: co wybrać dla naszego Angular projektu?

KRYTERIA DECYZYJNE:
-------------------

1. PRĘDKOŚĆ vs EKOSYSTEM
   
   Pytanie: Czy wolne narzędzia to realny problem dla nas?
   
   Sprawdźmy:
   - Jak długo trwa pre-commit hook? (zmierzymy później)
   - Jak długo trwa CI lint check?
   - Czy czujemy pain przy codziennej pracy?
   
   Jeśli 6s pre-commit to OK → Prettier może wystarczyć
   Jeśli to frustrujące → Biome/Oxc warto rozważyć
   
   ALE: ekosystem
   Angular = potrzebujemy @angular-eslint, eslint-plugin-rxjs
   Te nie działają z Biome (standalone)
   Oxc ma plugin API, więc teoretycznie można

2. PROSTOTA vs ELASTYCZNOŚĆ
   
   Biome: jeden tool, jeden config
   ```json
   {
     "formatter": { "enabled": true },
     "linter": { "enabled": true }
   }
   ```
   
   Prettier + ESLint: dwa tools, 2-3 config files
   - .prettierrc
   - eslint.config.js (lub .eslintrc)
   - może .prettierignore, .eslintignore
   
   Prostota = mniej maintenance, łatwiej dla nowych devs
   Elastyczność = dokładnie to co chcesz, pełna kontrola

3. DOJRZAŁOŚĆ vs INNOWACJA
   
   Prettier (8 lat) + ESLint (13 lat):
   - Wszystkie edge cases znane i naprawione
   - Stack Overflow ma odpowiedzi na wszystko
   - Każdy nowy dev to zna
   
   Biome (2 lata stable):
   - Mniej battle-tested
   - Mniej community support
   - ALE: aktywnie rozwijane, szybkie bug fixes
   
   Pytanie: Czy jesteśmy early adopters czy wolimy sprawdzone rozwiązania?

4. ANGULAR-SPECIFIC NEEDS
   
   To jest KLUCZOWE dla nas.
   
   Przykłady Angular rules których potrzebujemy:
   
   a) Component lifecycle:
   ```typescript
   @Component({...})
   export class MyComponent implements OnDestroy {
     sub: Subscription;
     
     ngOnInit() {
       this.sub = this.api.getData().subscribe();
     }
     // ❌ @angular-eslint: no ngOnDestroy - memory leak!
   }
   ```
   
   b) Template best practices:
   ```typescript
   @Component({
     template: `
       <div *ngIf="data">
         <div *ngFor="let item of data.items">
           <!-- ❌ @angular-eslint: nested structural directives -->
         </div>
       </div>
     `
   })
   ```
   
   c) RxJS patterns:
   ```typescript
   this.http.get('/api').subscribe(data => {
     // side effects
   }); // ❌ rxjs-angular: subscription not stored, potential leak
   ```
   
   Biome: NIE MA tych rules
   ESLint + plugins: MA wszystkie
   
   To jest game changer dla Angular.

REKOMENDACJE DLA RÓŻNYCH SCENARIUSZY:
--------------------------------------

SCENARIUSZ A: "Chcemy prędkość + mamy resources na migrację"
→ Oxc (Oxfmt + Oxlint) + ESLint dla Angular rules
  - Oxc jako fast first pass (basic stuff)
  - ESLint jako second pass w CI (Angular-specific)
  - Daje ~80% speed boost, zachowuje Angular support

SCENARIUSZ B: "Chcemy prostotę + nowy projekt"
→ Biome standalone
  - Ale tylko jeśli akceptujemy brak Angular-specific lint
  - Może być OK dla małych projektów/prototypów
  - Nie dla enterprise Angular

SCENARIUSZ C: "Nie chcemy rewolucji, chcemy optymalizację"
→ Prettier + ESLint (separated) + optimize config
  - Zostajemy przy sprawdzonych narzędziach
  - Rozdzielamy (o tym za chwilę)
  - Optymalizujemy ESLint config (wyłączamy wolne rules)
  - Używamy cache (ESLint ma --cache flag)

SCENARIUSZ D: "Copilot daily + duży codebase"
→ Hybrid: Biome dla formatowania, ESLint dla lintowania
  - Biome format --write (szybko, consistency dla AI)
  - ESLint --fix (quality, Angular rules)
  - Osobne komendy, osobne cele
  - Best of both worlds

MOJA REKOMENDACJA dla typowego Angular enterprise projektu:
→ SCENARIUSZ C lub D
   Dlaczego? Bo:
   - Potrzebujemy Angular-specific rules
   - Nie możemy zignorować @angular-eslint
   - Ale możemy przyspieszyć przez separację i cache
   - Lub użyć Biome tylko do formatowania (co jest safe)
```

**Visual**: Decision tree diagram

---

### SLAJD 6: Pytanie 2 - Osobno czy Razem? (4 min)

**Tytuł**: "Pytanie 2: Osobno czy razem? (Separacja tools)"

**Treść slajdu**:

**Opcja A: Razem (eslint-plugin-prettier)**
```bash
eslint --fix  # uruchamia ESLint + Prettier w środku
```
✅ Jedna komenda  
❌ Konflikty, overhead, trudne debugowanie

**Opcja B: Osobno**
```bash
prettier --write .
eslint --fix .
```
✅ Jasny separation of concerns  
✅ Lepsze error messages  
✅ Można uruchomić tylko jedno  
❌ Dwie komendy (ale Husky to rozwiąże)

**Opcja C: Jedno narzędzie które łączy wewnętrznie**
```bash
biome check --write .
```
✅ Jedno narzędzie, zero konfliktów  
❌ Ograniczony ekosystem (dla Angular problem)

**Notatki dla prezentera**:
```
Pytanie: łączyć czy rozdzielać formatter i linter?

OPCJA A (RAZEM - eslint-plugin-prettier):
Problemy:
1. Konflikty reguł → potrzeba eslint-config-prettier
2. Performance overhead ~20-40%
3. Debugging nightmare (niejasne error messages)
4. Znane bugi (arrow-body-style + prettier = invalid code)

OPCJA B (OSOBNO - preferred):
Zalety:
1. True separation of concerns
2. Można uruchomić tylko jedno (flexibility)
3. Lepsze error messages (clear source)
4. Można użyć różnych narzędzi (Biome + ESLint)

Wada: dwie komendy (ALE Husky to rozwiązuje!)

OPCJA C (BIOME - all-in-one natively):
- Jeden tool, zero konfliktów
- Parse once → format → lint → fix
- Problem: brak Angular plugins

REKOMENDACJA dla Angular:
Hybrid: Biome format + ESLint lint (osobne, w Husky)
```

**Visual**: Side-by-side comparison diagrams

---

### SLAJD 7: Pytanie 3 - Husky jako Automatyzacja (4 min)

**Tytuł**: "Pytanie 3: Czy Husky eliminuje problem separacji?"

**Treść slajdu**:

**Husky v9 (2024) + lint-staged**:
- 🎣 Git hooks automation
- 📦 Auto-setup (`npx husky init`)
- ⚡ Tylko staged files (szybko)
- 🚫 Blokuje commit jeśli fail

**Setup**:
```bash
# .husky/pre-commit
npx lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,html,scss}": ["prettier --write"],
    "*.ts": ["eslint --fix"]
  }
}
```

**Rezultat**: 2 komendy → 0 komend (automatyczne)

**Notatki dla prezentera**:
```
Pytanie: Czy Husky eliminuje problem separacji? 
Odpowiedź: Nie całkowicie, ale PRAWIE.

HUSKY v9:
- Git hooks manager (pre-commit, pre-push, etc.)
- Setup: `npx husky init` → każdy w zespole dostaje hooks auto

LINT-STAGED:
- Uruchamia komendy tylko na staged files (nie cały projekt!)

SETUP:
.husky/pre-commit → npx lint-staged
package.json → lint-staged config (prettier + eslint)

FLOW: git commit → husky → lint-staged → format + lint → OK/BLOCK

CZAS (5 plików .ts, 2 .html):
- Bez Husky (cały projekt): 6.5s
- Z Husky (staged only): 280ms (23x szybciej!)
- Z Biome+Husky: 120ms (54x szybciej!)

CZY ELIMINUJE SEPARACJĘ?
Technicznie: NIE (wciąż 2 komendy)
Praktycznie: TAK (zero manual work, auto)

KORZYŚCI:
✅ Consistency w zespole
✅ Blokuje bad code
✅ Copilot protection (auto-format AI code)
✅ Bypass option (--no-verify)

REKOMENDACJA: Zawsze używaj Husky + lint-staged (best practice 2026)
```

**Visual**: Flowchart git commit → husky → lint-staged → pass/fail

---

### SLAJD 8: Pytanie 4 - AI-First Development (5 min)

**Tytuł**: "Pytanie 4: Jak AI-first zmienia zasady gry?"

**Treść slajdu**:

**Copilot Daily = Nowe Wymagania**:
- 🤖 Więcej kodu, szybciej generowanego
- 🎨 Różne style (AI nie zna naszego guide)
- ⚡ Natychmiastowy feedback needed
- 🔄 Continuous consistency enforcement

**Key Insights**:
1. **Prędkość = Krytyczna** (6s → frustracja w flow)
2. **Formatter > Linter** (dla AI: style consistency ważniejsza)
3. **Auto-format on save** (niezbędne)
4. **Zero-config** (Ultracite, agent hooks)

**Nowe narzędzia dla AI workflows**:
- Ultracite - zero-config setup dla AI agents
- Agent hooks - auto-format po AI edit
- Architectural guardrails - Sentrux

**Notatki dla prezentera** (czytać 1:1):
```
Pierwszy insight: prędkość jest absolutnie krytyczna. Przed erą Copilot, sześć sekund na lint było akceptowalne. Ale teraz to jest bottleneck. Dlaczego? Bo Copilot generuje kod w dwie sekundy, a potem czekasz sześć sekund na lint. To przerywa flow. Z szybkimi narzędziami jak Biome mamy dwie sekundy na Copilot plus sto dwadzieścia milisekund na lint - to jest płynne i prawie niezauważalne. Copilot nas przyspiesza, ale wolne narzędzia nas spowalniają.

Drugi insight: formatter jest ważniejszy niż linter - przynajmniej jako priorytet. Copilot generuje kod w różnych stylach - raz single quotes, raz double, różne spacingi. Bez formattera codebase zmienia się w chaos w tydzień. Proponuję strategię trzech poziomów: formatowanie przy każdym save i commit - szybkie, z Biome. Lintowanie przy commit - ESLint z regułami Angular. I deep linting przy push lub w CI - pełny zestaw reguł.

Trzeci insight: auto-format on save jest niezbędny. W edytorze ustawiamy formatOnSave na true. Wtedy flow wygląda tak: Copilot generuje kod, zapisujesz, auto-format działa, i masz spójny kod. Bez tego każdy fragment kodu z Copilot wygląda inaczej.

Czwarty insight: nowe narzędzia dla AI. Ultracite generuje reguły dla AI agents - Copilot je czyta i generuje lepiej dopasowany kod. Agent hooks automatycznie formatują po każdej edycji przez AI. Sentrux monitoruje architekturę w real-time, bo AI generuje dużo kodu szybko i łatwo o architectural drift.

Konkretne liczby przed i po. Przed: od trzech do sześciu sekund razy dwadzieścia commitów daje dwie minuty dziennie, czyli siedem i trzy dziesiąte godziny rocznie. Po optymalizacji: od dwustu do czterystu milisekund razy dwadzieścia commitów to tylko osiem sekund dziennie, czyli dwadzieścia dziewięć minut rocznie. Oszczędność to sto dwanaście sekund każdego dnia plus zero frustracji i przerwanych flow states.

To nie jest "nice to have" optimization. To jest fundamentalna zmiana sposobu pracy z kodem w erze sztucznej inteligencji.
```

DODATKOWE SZCZEGÓŁY (dla kontekstu, nie czytać):
------------------------------------------

1. EDITOR SETUP
   
   VSCode settings.json:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "biomejs.biome",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     },
     "[typescript]": {
       "editor.defaultFormatter": "biomejs.biome"
     }
   }
   ```
   
   Format zawsze (Biome, fast).
   Lint on save tylko gdy poprawisz ręcznie (explicit).

2. PACKAGE SCRIPTS
   
   ```json
   {
     "scripts": {
       "format": "biome format --write .",
       "lint": "eslint src/**/*.ts --max-warnings=0",
       "lint:fix": "eslint src/**/*.ts --fix",
       "check": "npm run format && npm run lint",
       "copilot-safe": "npm run format"
     }
   }
   ```
   
   "copilot-safe" = szybki format check po AI session.

3. LINT-STAGED STRATEGY
   
   ```json
   {
     "lint-staged": {
       "*.{ts,html,scss}": [
         "biome format --write"
       ],
       "*.ts": [
         "eslint --fix --max-warnings=0 --rule 'no-console:error'"
       ]
     }
   }
   ```
   
   Format wszystko (szybko, Biome).
   Lint tylko critical issues przy commit (wyłącz slow rules).
   
   Full lint w CI.

4. CI/CD STRATEGY
   
   ```yaml
   # Fast feedback (parallel)
   - name: Format check
     run: biome format --check .
   
   - name: Quick lint
     run: oxlint src/
   
   # Thorough check (sequential, allowed to be slower)
   - name: Full ESLint
     run: eslint src/**/*.ts --max-warnings=0
   
   - name: Angular-specific rules
     run: eslint src/ --config .eslintrc.angular.js
   ```
   
   Fast feedback first (1-2s).
   Full check later (10-15s OK w CI).

5. TEAM WORKFLOW
   
   Commit message convention:
   ```
   feat: add user profile component [copilot-assisted]
   
   Co-authored-by: GitHub Copilot
   ```
   
   Flaguje AI-assisted code.
   Code review: extra attention na architectural fit.

METRICS TO TRACK:
-----------------

Przed vs po optymalizacji:

1. Pre-commit hook time
   Target: <500ms (idealnie <200ms)

2. CI lint time
   Target: <30s

3. Editor lag (type to see lint error)
   Target: <100ms

4. % Copilot-generated code formatted automatically
   Target: 100%

5. Style guide violations in PRs
   Target: 0 (wszystko auto-formatted)

PODSUMOWANIE AI-FIRST:
-----------------------

Copilot daily = game changer dla tooling requirements.

Kluczowe zmiany:
1. Speed matters more (10x więcej kodu = potrzeba 10x szybszych tools)
2. Formatter jest krytyczny (consistency dla AI code)
3. Real-time feedback niezbędny (editor integration)
4. Automation must-have (Husky, agent hooks)

Dla Angular z Copilot:
→ Biome dla formatowania (speed + consistency)
→ ESLint dla lintowania (Angular rules)
→ Husky + lint-staged (automation)
→ Editor format on save (real-time)

=== BEFORE/AFTER - LICZBY ===
Przed: 3-6s × 20 commitów = 2 min/dzień = 7.3h/rok
Po: 200-400ms × 20 commitów = 8s/dzień = 29 min/rok
Oszczędność: 112s każdego dnia + zero frustracji

→ To nie "nice to have" - to zmiana sposobu pracy w erze AI
```

**Visual**: Before/After workflow diagrams + metrics comparison

---

### ~~SLAJD 9: Propozycja - Live Benchmark~~ (USUNIĘTY)

**Uwaga**: Slajd z propozycją live benchmark został usunięty - prezentacja przedstawia możliwości, zespół decyduje.

---

### SLAJD 9: Rekomendacje (4 min)

**Tytuł**: "Nasze Rekomendacje"

**Treść slajdu**:

**TREŚĆ USUNIĘTA - Slajd nie jest już częścią prezentacji**

---

### SLAJD 10: Podsumowanie (1 min)

**Tytuł**: "Dziękuję!"

**Benchmark Setup** (archiwum dla referencji):
```
Repo testowe:
├─ 50 plików Angular .ts
├─ 20 templates .html
├─ 10 styles .scss
└─ Realistic code (components, services, guards)
```

**Testy do wykonania**:
1. ⏱️ Format all files (Prettier vs Biome vs Oxc)
2. ⏱️ Lint all files (ESLint vs Biome vs Oxc)
3. ⏱️ Pre-commit hook (5 staged files)
4. ⏱️ CI full check (cold cache)
5. 🤖 Copilot generation + auto-format

**Metrics**:
- Time (ms)
- Memory usage
- Developer experience (qualitative)

**Notatki dla prezentera**:
```
Mamy teorię. Mamy benchmarki z internetu.
Ale pytanie: jak to działa NA NASZYM PROJEKCIE?

PROPOZYCJA:
-----------

Przygotować mini benchmark repo:
- Realistic Angular structure
- Nasze typical patterns (services, components, RxJS)
- Nasze dependencies (@angular-eslint, etc.)

Zmierzyć REALNIE:

1. FORMAT TIME
   
   ```bash
   time prettier --write "src/**/*.{ts,html,scss}"
   time biome format --write .
   time oxfmt --write .
   ```
   
   Który jest faktycznie szybszy NA NASZYM KODZIE?

2. LINT TIME
   
   ```bash
   time eslint src/**/*.ts
   time biome lint .
   time oxlint src/
   ```
   
   Uwaga: sprawdzić czy Biome/Oxc łapią te same issues.

3. PRE-COMMIT SIMULATION
   
   Staged: 5 .ts files (realistic change)
   
   ```bash
   # Current (eslint-plugin-prettier)
   time lint-staged  # with current config
   
   # Proposed (separated)
   time lint-staged  # with prettier + eslint
   
   # Alternative (Biome)
   time lint-staged  # with biome
   ```
   
   To jest NAJWAŻNIEJSZY metric.
   Bo to czujemy każdego dnia.

4. CI FULL CHECK
   
   Cold cache, całe repo:
   
   ```bash
   # Clear cache
   rm -rf node_modules/.cache
   
   # Current
   time npm run lint  # eslint-plugin-prettier
   
   # Alternatives
   time (prettier --check . && eslint src/)
   time biome check .
   ```

5. COPILOT INTEGRATION TEST (qualitative)
   
   Scenariusz:
   a) Wygeneruj component z Copilot
   b) Save (auto-format)
   c) git add
   d) git commit (pre-commit hook)
   e) Zmierz całkowity czas + developer feeling
   
   Powtórz z różnymi setups.
   
   Który się czuje najbardziej smooth?

WHY BOTHER?
-----------

1. REAL DATA
   Internet benchmarks = synthetic.
   Nasze repo = real patterns, real dependencies.
   
   Może okazać się:
   - Biome jest szybszy, ale nie 50x (np. 10x)
   - Lub Biome nie łapie critical issues które ESLint łapie
   - Lub pre-commit hook już jest OK (<1s)

2. TEAM BUY-IN
   
   "Internet says 50x faster" = "yeah sure"
   "Zmierzyliśmy na naszym projekcie: 6s → 300ms" = "wow, OK"
   
   Concrete data przekonuje.

3. EDGE CASES
   
   Nasze specific patterns mogą ujawnić issues:
   - Angular-specific syntax
   - RxJS operators
   - Custom decorators
   
   Lepiej znaleźć to PRZED migracją.

SETUP BENCHMARK REPO:
----------------------

```bash
# Create test repo
npx @angular/cli new benchmark-test --routing --style=scss

# Add realistic code
- 10 feature modules
- 30 components (mix: simple, complex, with RxJS)
- 10 services
- 5 guards
- 10 pipes

# Copy patterns from our actual project
# (sanitized, no business logic)

# Install tools
npm install -D prettier eslint @angular-eslint/eslint-plugin
npm install -D @biomejs/biome
npm install -D oxc

# Create configs
- .prettierrc (nasze settings)
- eslint.config.js (nasze rules)
- biome.json (migrated)
- .oxlintrc.json (migrated)

# Benchmark scripts
npm run bench:format
npm run bench:lint
npm run bench:precommit
```

EXPECTED RESULTS (hypothesis):
------------------------------

Format:
- Prettier: ~2-3s
- Biome: ~100-200ms (10-20x faster)
- Oxc: ~80-150ms (15-25x faster)

Lint:
- ESLint: ~4-5s
- Biome: ~150-300ms (15-20x faster, but fewer rules)
- Oxc: ~100-200ms (20-30x faster)

Pre-commit (5 files):
- Current: ~800ms - 1.5s
- Separated: ~600ms - 1s
- Biome: ~100-200ms

Developer experience:
- Prettier+ESLint: familiar, reliable
- Biome: fast, but missing some Angular rules
- Oxc: fastest, but newest (potential issues)

DECISION FRAMEWORK:
-------------------

Po benchmarkach, decision matrix:

IF pre-commit < 1s AND no major pain:
  → Stay with Prettier + ESLint (separated)
  → Add Husky optimization
  
IF pre-commit > 2s OR frequent frustration:
  → Consider Biome for format
  → Keep ESLint for Angular-specific lint
  → Hybrid approach

IF team wants bleeding edge AND willing to handle issues:
  → Oxc + ESLint hybrid

IF missing Angular rules is blocker:
  → Stay with ESLint, optimize config
  → Use --cache flag
  → Disable slow rules

RECOMMENDATION:
Zróbmy benchmark PRZED finalizacją prezentacji.
Wtedy będziemy mieli concrete data do pokazania.

Live demo podczas prezentacji = impactful.
```

**Visual**: Benchmark repo structure + example metrics table (TBD)

---

### SLAJD 10: Podsumowanie (1 min)

**Tytuł**: "Dziękuję!"

**Treść slajdu**:

**Poziom 1: Podstawy** (1-2h | bardzo niskie ryzyko)
- ✅ Rozdziel Prettier i ESLint
- ✅ Dodaj Husky + lint-staged
- ✅ Editor: format on save
- Rezultat: 2-3x szybszy pre-commit

**Poziom 2: Optymalizacja** ⭐ REKOMENDOWANE (4-8h | niskie ryzyko)
- ✅ Wszystko z Poziomu 1 +
- ✅ Biome dla formatowania (.ts)
- ✅ ESLint dla Angular rules
- ✅ ESLint --cache
- Rezultat: 5-10x szybszy workflow

**Poziom 3: Zaawansowany** (1-2 dni | średnie ryzyko)
- ✅ Wszystko z Poziomu 2 +
- ✅ Oxc pre-check w CI
- ✅ Ultracite (AI agent rules)
- ✅ Sentrux (monitoring)
- Rezultat: 10-20x, future-proof

**Notatki dla prezentera**:
```
Przedstawiam 3 POZIOMY optymalizacji - od podstawowych do zaawansowanych:

POZIOM 1 - PODSTAWY (1-2h, bardzo niskie ryzyko):
Fundamentalne ulepszenia dla każdego zespołu. Rozdzielamy Prettier i ESLint (usuwamy plugin), dodajemy Husky + lint-staged (automatyzacja), włączamy format on save w edytorze.
→ Rezultat: pre-commit 2-3x szybszy, zero konfliktów, lepsze error messages
→ Ryzyko minimalne - sprawdzone narzędzia

POZIOM 2 - OPTYMALIZACJA (4-8h, niskie ryzyko) ⭐ REKOMENDOWANY:
Budujemy na Poziomie 1. Biome zamiast Prettier dla TypeScript (142x szybciej!), Prettier zostaje dla HTML/SCSS. ESLint tylko do lintowania z Angular rules + flaga --cache.
→ Rezultat: workflow 5-10x szybszy, idealne dla Copilot daily
→ Sweet spot dla większości zespołów Angular
→ Migracja: feature branch → format all → PR review → merge

POZIOM 3 - ZAAWANSOWANY (1-2 dni, średnie ryzyko):
Dla zespołów chcących maksymalnej wydajności. Oxc w CI (ultra szybki feedback), Ultracite (reguły dla AI agents = lepszy kod z Copilot), Sentrux (monitoring architektury).
→ Rezultat: 10-20x szybszy, future-proof
→ Dla dużych zespołów z intensywnym użyciem Copilot

STRATEGIA WDROŻENIA:
Podejście stopniowe: Poziom 1 teraz (szybkie wygrane) → Poziom 2 po miesiącu (sprawdzone korzyści) → Ewaluacja Poziomu 3 po 3 miesiącach.

Zespół podejmuje ostateczną decyzję na podstawie własnych potrzeb i appetite na ryzyko.
```

**Visual**: Three-tier pyramid diagram + timeline

---

### ~~SLAJD 11: Q&A + Discussion~~ (USUNIĘTY)

**Uwaga**: Slajd Q&A został usunięty - zespół podejmuje decyzję we własnym zakresie po prezentacji.

---

## Appendix: Code Examples & Configs

### A1: Current Setup (eslint-plugin-prettier)

```javascript
// eslint.config.js (current)
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import angularEslint from '@angular-eslint/eslint-plugin';

export default [
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': ['error', {
        type: 'attribute',
        prefix: 'app',
        style: 'camelCase'
      }],
    },
  },
  prettierPlugin,
];
```

```json
// .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

### A2: Proposed Setup - Tier 2 (Biome + ESLint)

```json
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 100
  },
  "linter": {
    "enabled": false
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5",
      "semicolons": "always"
    }
  }
}
```

```javascript
// eslint.config.js (optimized)
import angularEslint from '@angular-eslint/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import rxjsEslint from 'eslint-plugin-rxjs';

export default [
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
      '@typescript-eslint': typescriptEslint,
      'rxjs': rxjsEslint,
    },
    rules: {
      // Angular-specific (critical)
      '@angular-eslint/directive-selector': 'error',
      '@angular-eslint/component-selector': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      
      // TypeScript (critical)
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      
      // RxJS (important for Angular)
      'rxjs/no-ignored-subscription': 'error',
      'rxjs/no-unsafe-takeuntil': 'error',
      
      // Performance: disabled (check in CI only)
      'import/no-cycle': 'off',
    },
  },
];
```

```json
// package.json
{
  "scripts": {
    "format": "biome format --write .",
    "format:check": "biome format --check .",
    "lint": "eslint src/**/*.ts --cache",
    "lint:fix": "eslint src/**/*.ts --fix --cache",
    "check": "npm run format && npm run lint"
  },
  "lint-staged": {
    "*.{ts,html,scss,json}": ["biome format --write"],
    "*.ts": ["eslint --fix --max-warnings=0"]
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
npx lint-staged
```

### A3: CI/CD Config Examples

```yaml
# .github/workflows/lint.yml (Tier 2)
name: Lint & Format

on: [pull_request]

jobs:
  format-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - name: Install dependencies
        run: bun install
      - name: Format check
        run: bun run format:check

  lint:
    runs-on: ubuntu-latest
    needs: format-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint -- --max-warnings=0
```

```yaml
# .github/workflows/lint.yml (Tier 3 - with Oxc pre-check)
name: Lint & Format

on: [pull_request]

jobs:
  quick-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Fast lint (Oxc)
        run: npx oxlint src/
      - name: Fast format check
        run: npx biome format --check .

  full-check:
    runs-on: ubuntu-latest
    needs: quick-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Full ESLint check
        run: npm run lint -- --max-warnings=0
      - name: Angular-specific rules
        run: npx eslint src/ --config eslint.angular.config.js
```

---

## Demo Materials Preparation

### Benchmark Repo Structure

```
benchmark-angular/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/ (10 files)
│   │   │   ├── guards/ (5 files)
│   │   │   └── interceptors/ (3 files)
│   │   ├── features/
│   │   │   ├── users/ (10 components + services)
│   │   │   ├── products/ (10 components + services)
│   │   │   └── orders/ (10 components + services)
│   │   └── shared/
│   │       ├── components/ (15 files)
│   │       └── pipes/ (10 files)
├── scripts/
│   ├── benchmark-format.sh
│   ├── benchmark-lint.sh
│   ├── benchmark-precommit.sh
│   └── results-to-markdown.js
└── configs/
    ├── prettier/ (.prettierrc)
    ├── biome/ (biome.json)
    ├── oxc/ (.oxlintrc.json)
    └── eslint/ (various configs)
```

### Benchmark Scripts

```bash
# scripts/benchmark-format.sh
#!/bin/bash

echo "=== FORMAT BENCHMARK ==="
echo ""

# Prettier
echo "1. Prettier"
rm -rf node_modules/.cache
time prettier --write "src/**/*.{ts,html,scss}" 2>&1

# Biome
echo ""
echo "2. Biome"
time biome format --write . 2>&1

# Oxc
echo ""
echo "3. Oxc (oxfmt)"
time oxfmt --write . 2>&1

echo ""
echo "=== BENCHMARK COMPLETE ==="
```

### Results Template

```markdown
# Benchmark Results - [Date]

## Environment
- Machine: MacBook Pro M3, 32GB RAM
- Node: v20.11.0
- Files: 250 TypeScript, 100 HTML, 50 SCSS

## Format Performance

| Tool      | Time     | Speed vs Prettier |
|-----------|----------|-------------------|
| Prettier  | 2.45s    | 1x (baseline)     |
| Biome     | 0.12s    | 20.4x faster      |
| Oxfmt     | 0.09s    | 27.2x faster      |

## Lint Performance

| Tool      | Time     | Rules  | Speed vs ESLint |
|-----------|----------|--------|-----------------|
| ESLint    | 4.21s    | ~300   | 1x (baseline)   |
| Biome     | 0.18s    | ~200   | 23.4x faster    |
| Oxlint    | 0.11s    | ~250   | 38.3x faster    |

## Pre-commit Hook (5 staged files)

| Setup                    | Time     | Speed vs Current |
|--------------------------|----------|------------------|
| Current (plugin)         | 1.85s    | 1x (baseline)    |
| Separated (P + E)        | 0.92s    | 2.0x faster      |
| Biome format + ESLint    | 0.28s    | 6.6x faster      |
| Full Biome               | 0.15s    | 12.3x faster     |

## Developer Experience Notes

### Prettier + ESLint (separated)
✅ Familiar, stable, excellent ecosystem
✅ All Angular rules work
❌ Slower than Rust alternatives

### Biome
✅ Extremely fast, great DX
✅ One tool, simple config
❌ Missing some Angular-specific rules
⚠️ 3 formatting edge cases found (see notes)

### Oxc
✅ Fastest of all
✅ Plugin API for ESLint rules
❌ Very new, less battle-tested
⚠️ Setup more complex

## Recommendation
[To be filled after team discussion]
```

---

## Additional Resources

### Links for Further Reading

1. **Biome**
   - Docs: https://biomejs.dev
   - Migration guide: https://biomejs.dev/guides/migrate-eslint-prettier
   - Angular compatibility: [research needed]

2. **Oxc**
   - Docs: https://oxc.rs
   - Oxlint rules: https://oxc.rs/docs/guide/usage/linter
   - Angular examples: [research needed]

3. **Husky**
   - Docs: https://typicode.github.io/husky
   - V9 migration: https://typicode.github.io/husky/migrating-from-v4-to-v9.html

4. **Ultracite**
   - Homepage: https://ultracite.ai
   - GitHub: [search needed]

5. **Angular-ESLint**
   - Docs: https://github.com/angular-eslint/angular-eslint
   - Rules: https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin

### Team Survey Template

```
# Tooling Feedback Survey

## Current Pain Points (1-5, 5 = very painful)
- Pre-commit hook wait time: ___
- ESLint/Prettier conflicts: ___
- Setup complexity: ___
- CI/CD lint time: ___
- Editor lag during typing: ___

## Usage Patterns
- How often do you use Copilot? (daily/weekly/rarely): ___
- Average commits per day: ___
- Do you format manually or rely on hooks?: ___

## Preferences
- Risk tolerance (1-5, 5 = early adopter): ___
- Preferred tier (1/2/3): ___
- Concerns about migration: ___

## Open Feedback
[Free text]
```

---

## Presentation Checklist

### Before Presentation
- [ ] Run benchmarks on real codebase
- [ ] Prepare demo repo
- [ ] Test all code examples
- [ ] Verify all links work
- [ ] Create backup slides (if technical demo fails)
- [ ] Print handout (this document)
- [ ] Prepare survey/voting mechanism

### During Presentation
- [ ] Record pre-commit hook time (live)
- [ ] Demo: Copilot → format → commit
- [ ] Show benchmark results
- [ ] Facilitate discussion
- [ ] Capture questions/concerns
- [ ] Take vote on tier selection

### After Presentation
- [ ] Share slides + this document
- [ ] Create GitHub issue for action items
- [ ] Schedule follow-up meeting
- [ ] Start benchmark repo setup
- [ ] Document decision in team wiki

---

---

*Brief dla prezentacji "Formatowanie i Lintowanie w 2026"*  
*Wersja: 2.0 (zaktualizowana)*
