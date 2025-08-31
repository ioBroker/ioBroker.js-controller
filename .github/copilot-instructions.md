# GitHub Copilot Instructions for ioBroker.js-controller

## Project Overview

The ioBroker.js-controller is the core heart of any ioBroker smart home automation installation. It's a TypeScript/JavaScript monorepo managed with Lerna that controls and monitors all adapter processes, manages central configuration, and provides the runtime environment for the ioBroker ecosystem.

## Architecture & Structure

### Monorepo Structure
This is a Lerna-managed monorepo with packages in `/packages/`:
- **controller**: Main js-controller package (the core runtime)
- **cli**: Command-line interface and setup tools
- **adapter**: Base adapter framework
- **common**: Shared utilities used by the controller
- **common-db**: Database-agnostic utilities
- **db-***: Various database backends (file, jsonl, redis) for objects and states
- **types-dev**: Internal TypeScript definitions
- **types-public**: Public API types

### Key Design Patterns
- **Plugin Architecture**: Uses `@iobroker/plugin-base` for extensible functionality
- **Database Abstraction**: Separate packages for objects and states with multiple backends
- **Event-Driven**: Heavy use of event emitters and callbacks
- **Process Management**: Spawns and monitors adapter processes
- **Configuration-Driven**: All behavior controlled via centralized configuration

## Coding Standards

### Language & Tools
- **Primary Language**: TypeScript (ES modules)
- **Node.js**: Minimum version 18.x (check package.json engines field)
- **Linting**: ESLint with `@iobroker/eslint-config`
- **Formatting**: Prettier (integrated into ESLint config)
- **Testing**: Mocha with TypeScript support via ts-node

### Code Style
- **JSDoc Required**: All public methods, classes, and interfaces must have JSDoc comments
- **TypeScript Strict**: Use strict TypeScript settings
- **Import Style**: Use ES6 imports, prefer absolute imports with `@/` for local modules
- **Error Handling**: Always handle errors explicitly, use proper error types
- **Async/Await**: Prefer async/await over promises where appropriate

### File Organization
- Source code in `src/` directories
- Build output in `build/` directories (ignored in git)
- Tests in `test/` directories
- Use `.ts` extension for TypeScript files
- Use explicit file extensions in imports (`.js` for compiled output)

## Development Workflow

### Setup
```bash
npm i --ignore-scripts    # Install dependencies
npm run build            # Build all packages
npm run lint             # Run ESLint
npm run test             # Run tests
```

### Testing
- Tests are in TypeScript and run with ts-node
- Integration tests start a controller instance
- Ensure Redis is installed for database tests
- All tests must pass on Node.js 18.x, 20.x, and 22.x on Windows/Linux/macOS

### Building
- Use `lerna` to manage package dependencies and build order
- TypeScript compilation with project references
- Source maps generated for debugging

## Key Concepts & Patterns

### Database Abstraction
- Objects database: Configuration, adapter metadata, device definitions
- States database: Real-time device states and values
- Multiple backends: file-based, JSONL, Redis
- Connection handling with automatic reconnection

### Process Management
- Controller spawns adapter processes
- Health monitoring with restart logic
- Resource usage tracking (CPU, memory)
- Graceful shutdown handling

### Configuration Management
- Central configuration in objects database
- Host-specific settings and capabilities
- Instance configuration for each adapter
- Runtime configuration updates

### Event System
- Heavy use of EventEmitter patterns
- State change notifications
- Object change notifications
- Adapter lifecycle events

### Plugin System
- Extensible via plugins (e.g., Sentry reporting)
- Plugin registration and lifecycle management
- Plugin-specific configuration

## Common Patterns to Follow

### Error Handling
```typescript
try {
    const result = await someAsyncOperation();
    return result;
} catch (error) {
    logger.error(`Operation failed: ${error.message}`);
    throw error; // or handle appropriately
}
```

### Database Operations
```typescript
const obj = await this.objects.getObjectAsync(id);
if (!obj) {
    throw new Error(`Object ${id} not found`);
}
```

### Event Emission
```typescript
this.emit('stateChange', id, state);
```

### JSDoc Documentation
```typescript
/**
 * Start an adapter instance
 * @param instanceId - The adapter instance identifier
 * @param wakeUp - Whether to wake up the adapter if sleeping
 * @returns Promise that resolves when adapter is started
 */
async startInstance(instanceId: string, wakeUp = true): Promise<void> {
    // implementation
}
```

## Anti-Patterns to Avoid

- Don't use `var`, always use `const` or `let`
- Don't ignore promise rejections
- Don't modify objects/states directly without proper API calls
- Don't hardcode file paths (use path.join)
- Don't use synchronous file operations in production code
- Don't catch errors without proper logging or handling
- Don't create circular dependencies between packages

## Testing Guidelines

- Write tests for new features and bug fixes
- Use descriptive test names
- Test both success and error scenarios
- Mock external dependencies appropriately
- Ensure tests are deterministic and don't depend on external state

## Performance Considerations

- Use streaming for large file operations
- Implement proper cleanup in event handlers
- Be mindful of memory usage in long-running processes
- Use connection pooling for database operations
- Implement proper timeouts for network operations

## Security Considerations

- Validate all external inputs
- Use secure defaults for configuration
- Implement proper access controls
- Log security-relevant events
- Handle sensitive data appropriately (passwords, tokens)

## Contributing Notes

- Follow the existing code patterns in the module you're modifying
- Update JSDoc comments when changing method signatures
- Run tests before submitting changes
- Check that builds complete successfully
- Follow the contribution guidelines in CONTRIBUTING.md
- **Add changelog entries to CHANGELOG.md for functional changes or enhancements** - Focus on the user-facing effect rather than technical implementation details

When working with this codebase, prioritize correctness, maintainability, and following established patterns over clever solutions.