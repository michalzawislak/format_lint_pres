#!/bin/bash
# Ultra-prosty benchmark - 2 komendy, szybki wynik

cd benchmark-angular 2>/dev/null || cd /Users/michal/Projects/pres/benchmark-angular

echo ""
echo "🔴 Prettier..."
time npx prettier --write "src/**/*.{ts,html,scss}" 2>/dev/null

echo ""
echo "🟢 Biome..."
time npx @biomejs/biome format --write . 2>/dev/null

echo ""
echo "✅ Porównanie gotowe!"
