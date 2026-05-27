#!/bin/bash

# Benchmark Script - Format Performance
# Ten skrypt można użyć do zmierzenia wydajności różnych formatters

echo "=== FORMAT BENCHMARK ==="
echo ""
echo "Environment:"
echo "- Files: 50 .ts, 20 .html, 10 .scss"
echo ""

# Prettier
echo "1. Testing Prettier..."
if command -v prettier &> /dev/null; then
  time prettier --write "**/*.{ts,html,scss}" 2>&1
else
  echo "   Prettier not installed (npm install -D prettier)"
fi

echo ""

# Biome
echo "2. Testing Biome..."
if command -v biome &> /dev/null; then
  time biome format --write . 2>&1
else
  echo "   Biome not installed (npm install -D @biomejs/biome)"
fi

echo ""

# Oxc (oxfmt)
echo "3. Testing Oxc (oxfmt)..."
if command -v oxfmt &> /dev/null; then
  time oxfmt --write . 2>&1
else
  echo "   Oxc not installed (npm install -D oxc)"
fi

echo ""
echo "=== BENCHMARK COMPLETE ==="
echo ""
echo "Note: Run this script multiple times and take the average."
echo "First run may include cache warming."
