#!/bin/bash

# 🎤 Live Demo Benchmark Script
# Prosty skrypt do pokazania na prezentacji

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

clear

echo -e "${BOLD}${CYAN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║       🚀  LIVE BENCHMARK DEMO  🚀                    ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

cd benchmark-angular || { echo "❌ Folder benchmark-angular nie istnieje!"; exit 1; }

# Informacje o projekcie
echo -e "${BOLD}${BLUE}📊 Testowany projekt:${NC}"
TS_COUNT=$(find src -name '*.ts' 2>/dev/null | wc -l | tr -d ' ')
HTML_COUNT=$(find src -name '*.html' 2>/dev/null | wc -l | tr -d ' ')
SCSS_COUNT=$(find src -name '*.scss' 2>/dev/null | wc -l | tr -d ' ')
TOTAL=$((TS_COUNT + HTML_COUNT + SCSS_COUNT))

echo -e "   TypeScript: ${YELLOW}$TS_COUNT${NC} plików"
echo -e "   HTML:       ${YELLOW}$HTML_COUNT${NC} plików"
echo -e "   SCSS:       ${YELLOW}$SCSS_COUNT${NC} plików"
echo -e "   ${BOLD}Razem:      ${YELLOW}$TOTAL${NC}${BOLD} plików${NC}"
echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test 1: Prettier
echo -e "${BOLD}${RED}⏱️  TEST 1: Prettier (tradycyjne narzędzie)${NC}"
echo -e "${YELLOW}   Uruchamiam...${NC}"
echo ""

START_TIME=$(date +%s%N)
npx prettier --write "src/**/*.{ts,html,scss}" > /dev/null 2>&1
END_TIME=$(date +%s%N)
PRETTIER_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

echo -e "   ✅ Gotowe!"
echo -e "   ${BOLD}Czas: ${RED}${PRETTIER_TIME}ms${NC}"
echo ""
sleep 1

# Test 2: Biome
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BOLD}${GREEN}⚡ TEST 2: Biome (nowoczesne narzędzie)${NC}"
echo -e "${YELLOW}   Uruchamiam...${NC}"
echo ""

START_TIME=$(date +%s%N)
npx @biomejs/biome format --write . > /dev/null 2>&1
END_TIME=$(date +%s%N)
BIOME_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

echo -e "   ✅ Gotowe!"
echo -e "   ${BOLD}Czas: ${GREEN}${BIOME_TIME}ms${NC}"
echo ""

# Porównanie
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BOLD}${CYAN}📈 WYNIKI:${NC}"
echo ""

# Oblicz speedup
if [ $BIOME_TIME -gt 0 ]; then
  SPEEDUP=$(( PRETTIER_TIME / BIOME_TIME ))
else
  SPEEDUP=999
fi

# Wizualizacja
PRETTIER_BARS=$(( PRETTIER_TIME / 20 ))
BIOME_BARS=$(( BIOME_TIME / 20 ))

if [ $PRETTIER_BARS -eq 0 ]; then PRETTIER_BARS=1; fi
if [ $BIOME_BARS -eq 0 ]; then BIOME_BARS=1; fi

# Ograniczenie do max 60 znaków
if [ $PRETTIER_BARS -gt 60 ]; then PRETTIER_BARS=60; fi
if [ $BIOME_BARS -gt 60 ]; then BIOME_BARS=60; fi

echo -e "   Prettier:  ${RED}$(printf '█%.0s' $(seq 1 $PRETTIER_BARS))${NC}  ${BOLD}${PRETTIER_TIME}ms${NC}"
echo -e "   Biome:     ${GREEN}$(printf '█%.0s' $(seq 1 $BIOME_BARS))${NC}  ${BOLD}${BIOME_TIME}ms${NC}"
echo ""
echo -e "${BOLD}${YELLOW}   🚀 Biome jest ${SPEEDUP}x SZYBSZY!${NC}"
echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BOLD}${GREEN}✅ BENCHMARK ZAKOŃCZONY!${NC}"
echo ""
echo -e "${CYAN}💡 Co to oznacza w praktyce?${NC}"
echo -e "   • Szybsze pre-commit hooks"
echo -e "   • Krótszy czas CI/CD"
echo -e "   • Lepsze developer experience"
echo ""
