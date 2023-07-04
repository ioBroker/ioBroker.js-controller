# Contributing
If you are interested in contributing to the js-controller, this document contains an overview to getting started.

### Structure
The js-controller repository is a monorepo which is managed via `lerna`. Every folder inside the `packages` folder is a separate package. Developer dependencies should only be added to the top-level `package.json`. Package-specific dependencies need to be added to the `package.json` of the corresponding package. The `controller` folder is the package which is installed on client systems. All other packages are required by the `controller` package directly or indirectly.

### Installing
To install the dependencies, execute

```bash
npm i --ignore-scripts
```

in the root folder of the project.
The `--ignore-scripts` flag is necessary, because the `preinstall` script requires the project to be already built.

### Building
To build the project, simply run

```bash
npm run build
```

in the root folder of the project. `lerna` will automatically build the projects in the right order.

### Linting
We are using `eslint` as well as `prettier`. Prettier is integrated into our eslint config. Thus, please use `eslint` when performing code changes. On every push and PR the CI server will check for linting issues, please make sure that there are no linting issues, when creating a PR. As the execution of `eslint` also applies basic style guides like line breaks, it is a good practice to enable `eslint` to run automatically when saving a file.

### Testing
All tests are inside the `controller/test` folder. Tests are entirely written in TypeScript and are executed without a separate build step by using `ts-node`.

Executing

```bash
npm run test
```

will run the tests on your local system. As integration tests are starting a controller, please make sure that there is no ioBroker running on your local system using the same database ports.
Tests are running against databases which are integrated and fully taken care of by the controller as well as Redis DB. 
Thus, you need to install a [Redis DB](https://redis.io/docs/getting-started/installation/), else the tests will fail.
When creating a PR, the tests will automatically run on the CI server on all currently supported Node.js versions on Windows/Linux and MacOS. After creating your PR, check back if all tests have passed.

### Best practices
We have migrated most of the codebase to TypeScript, thus new files have to be written in TypeScript too.
Please ensure that your code changes are in line with our style guide via `eslint` (see [Linting](#linting)).
If you are adding a new feature, or you have fixed a bug which is testable, please make sure to add a new test. Also ensure, that all existing tests are passing, before proposing a code change (see [Testing](#testing)).
Testing your code change in a running environment is currently a bit tricky. Ensure you have installed the latest nightly release of the js-controller by executing

```bash
npm i iobroker.js-controller@dev
```

in your local iobroker folder, e.g. `/opt/iobroker`. Then build the project in the workspace and replace the files, 
where you have applied changes too in the build folder with the ones from the corresponding build directory of your workspace.

### Release
Prepare the changelog with a `## __WORK IN PROGRESS__` header. When this is present on `master` branch, you can use the `Official release` workflow, 
which is triggered by a workflow dispatch button directly on GitHub.