#!/bin/bash

# Benchmark Script - Lint Performance

echo "=== LINT BENCHMARK ==="
echo ""
echo "Environment:"
echo "- TypeScript files: 50"
echo ""

# ESLint
echo "1. Testing ESLint..."
if command -v eslint &> /dev/null; then
  time eslint "**/*.ts" 2>&1
else
  echo "   ESLint not installed (npm install -D eslint)"
fi

echo ""

# Biome Lint
echo "2. Testing Biome lint..."
if command -v biome &> /dev/null; then
  time biome lint . 2>&1
else
  echo "   Biome not installed"
fi

echo ""

# Oxlint
echo "3. Testing Oxlint..."
if command -v oxlint &> /dev/null; then
  time oxlint . 2>&1
else
  echo "   Oxlint not installed (npm install -D oxc)"
fi

echo ""
echo "=== BENCHMARK COMPLETE ==="
