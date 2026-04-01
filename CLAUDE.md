# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ioBroker.js-controller is the core runtime of the ioBroker smart home automation platform. It manages adapter processes, the central configuration, and provides the runtime environment. Written in TypeScript, it's a Lerna-managed monorepo using npm workspaces.

## Common Commands

```bash
# Install (--ignore-scripts required because preinstall needs built code)
npm ci --ignore-scripts

# Build all packages (Lerna handles build order via project references)
npm run build

# Lint / auto-fix formatting
npm run lint
npm run prettier

# Tests (require Redis installed locally; no ioBroker instance using same DB ports)
npm test                    # packages/controller/test/*.ts
npm run test-jsonl          # packages/controller/test/jsonl/*.ts
npm run test-redis-socket   # packages/controller/test/redis-socket/*.ts
npm run test-redis-sentinel # packages/controller/test/redis-sentinel/*.ts

# Run a single test file
npx mocha packages/controller/test/testSomeFile.ts --exit

# Type checking / type tests
npm run test-types-check    # tsc --project packages/controller/tsconfig.check.json
npm run test-types          # type-check + tsd tests for @iobroker/types

# Generate JSON schemas from TypeScript types
npm run update-schema
```

Tests run via Mocha with `ts-node/esm` loader (no separate build step needed). Integration tests start an actual controller instance.

## Monorepo Package Structure

All packages live under `packages/`:

- **controller** — Main runtime (`iobroker.js-controller`). Entry point: `src/main.ts`. This is the package installed on end-user systems. All other packages are its direct or indirect dependencies.
- **adapter** — Base adapter framework (`@iobroker/js-controller-adapter`). Adapters extend this.
- **cli** — CLI and setup tools (`@iobroker/js-controller-cli`)
- **common** — Shared utilities (`@iobroker/js-controller-common`): notification handler, upgrade managers, multihost server, zip utilities
- **common-db** — Database-agnostic utilities (`@iobroker/js-controller-common-db`)
- **db-base** — Base class for all DB implementations (in-memory file DB, Redis handler)
- **db-objects-file / db-objects-jsonl / db-objects-redis** — Objects database backends
- **db-states-file / db-states-jsonl / db-states-redis** — States database backends
- **types-dev** — Internal TypeScript type definitions (`@iobroker/types-dev`)
- **types-public** — Public API types (`@iobroker/types`), generated from internal types

## Architecture

**Two core databases:**
- **Objects DB** — stores configuration, adapter metadata, device definitions (persistent)
- **States DB** — stores real-time device state values (volatile)

Both have pluggable backends (file, JSONL, Redis) via the `db-*` packages.

**Process management:** The controller spawns adapter processes as child processes, monitors health, tracks resource usage (CPU/memory), handles restarts and graceful shutdown.

**Event-driven:** Heavy use of EventEmitter for state changes, object changes, and adapter lifecycle events.

**Build output:** TypeScript compiles to dual format — ESM (`build/esm/`) and CJS (`build/cjs/`). Post-build runs `esm2cjs` conversion and `tsc-alias` for path resolution.

## Code Conventions

- TypeScript strict mode, ES module imports
- Use `.js` extensions in import paths (for compiled output compatibility)
- JSDoc required on all public methods/classes/interfaces
- `async/await` over raw promises; `const`/`let` only (no `var`)
- No synchronous file operations in production code
- No circular dependencies between packages
- Dev dependencies go in root `package.json`; package-specific deps go in their own `package.json`
- New files must be TypeScript

## CI

GitHub Actions runs on push to master and all PRs:
- ESLint check
- Matrix: Windows / Ubuntu / macOS × Node 18, 20, 22, 24
- Full test suite (requires Redis, installed automatically in CI)
