# Equation Alive AI Implementation Plan

## Current Stage

The app is at MVP+ / early Version 2. The product shell, dashboard UI, graphing, formula-to-code solver, and Formula Intelligence Library exist. The next priority is making the math engine deeper and safer to change.

## Phase 1: Stabilize Existing App

- Keep the current static browser app working.
- Add regression tests for:
  - `y = x`
  - `y = x^2`
  - `y = sin(x)`
  - `F = ma`
  - `s = ut + 1/2at²`
  - `A = pi*r^2`
  - finite Sigma series
  - Formula Intelligence Library search/load flow
- Verify:
  - no syntax errors
  - graphable equations generate samples
  - symbolic formulas do not crash graphing
  - solver/code outputs are populated
  - library has at least 50 stored items

## Phase 2: Upgrade Math Renderer

- Add a real rendering layer, preferably KaTeX first.
- Keep the existing custom preview as fallback.
- Support fractions, powers, roots, sums, integrals, matrices, and accessible text.

## Phase 3: Add Structured Parser Layer

- Add a parser abstraction before adding dependencies.
- Later plug in Math.js for AST generation.
- Status: initial Math.js parser is now wired in with fallback parser support.
- Standard parsed shape:

```ts
type ParsedEquation = {
  rawInput: string;
  normalizedInput: string;
  variables: string[];
  constants: string[];
  functions: string[];
  operators: string[];
  equationType: string;
  isGraphable: boolean;
  errors: string[];
};
```

## Phase 4: Unified Math Pipeline

- Route graphing, solver, code generation, verification, and library loading through one pipeline.
- Split logic into modules when the app moves from static MVP into a framework.
- Next: move graph sampling and code generation to consume the parsed equation object more directly.

## Phase 5: Solver Upgrade

- Add more trustworthy algebra rules for:
  - `F = ma`
  - `A = pi*r^2`
  - `E = mc^2`
  - `v = u + at`
  - `s = ut + 1/2at²`
- Show unsupported-equation messages instead of pretending to solve.

## Advanced Product Layers

- Mathematical Intent Engine
- Math Knowledge Graph
- Theorem Explorer
- Simulation Sandbox
- Accessibility Mode
- AI Professor Mode
- OCR and voice input

## Immediate Working Rule

Before every major engine change, run:

```sh
node --check app.js
node tests/regression.test.js
```
