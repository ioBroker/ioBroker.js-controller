# Type definitions for ioBroker

## Usage

Since this package does not start with `@types/`, the types are not automatically included in your project. You need to add a reference to this package in your `tsconfig.json`:

```json
{
  "compilerOptions": {
	"types": ["node", "@iobroker/types"]
  }
}
```

or by adding an import to a file in your project:

```ts
import '@iobroker/types';
```