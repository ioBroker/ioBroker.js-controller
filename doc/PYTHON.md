# Adapters written in Python

Up from js-controller 8, an adapter may be written in Python instead of JavaScript. This document
is the contract between the three parties involved. It describes what the controller does and what
it expects — everything an SDK or the `py-controller` adapter builds on should be checked against
this page, not against the controller sources.

**The division of labour:**

- **js-controller** starts, supervises and stops Python adapter processes exactly the way it does
  Node.js adapters. It never creates or modifies Python environments — it only checks whether one
  is there.
- **py-controller** (a regular adapter) owns the Python environments: it creates the virtual
  environment, resolves and installs dependencies, and rebuilds environments that have fallen
  behind. It watches for instances the controller refused to start and triggers their restart once
  the environment is ready.
- **The Python SDK** (used by the adapter code itself) talks to the states and objects databases
  directly and implements the adapter-side conventions described below.

## Declaring a Python adapter

In `io-package.json`:

```json
{
    "common": {
        "platform": "Python",
        "mode": "daemon",
        "main": "python/pyexample/__main__.py"
    }
}
```

- `common.platform: "Python"` is what selects the Python start path. The default
  `"Javascript/Node.js"` keeps everything exactly as it was. (The controller compares the value
  case-insensitively, because the field is hand-written and wrong casing already exists in the
  wild; the schema only accepts the exact spelling.)
- `common.main` must follow the layout `python/<module>/__main__.py`. The controller starts the
  module with `python -m <module>` from the adapter's `python/` directory — started by module
  rather than by file path, because a file started directly is not part of a package and its
  relative imports fail. Nested packages (`python/a/b/__main__.py`) are rejected.
- Adapters are still distributed as npm packages (`iobroker.<name>`) and installed the usual way;
  the `python/` directory simply ships inside the package.

The `io-package.json` schema enforces for Python adapters: `main` is required and must match the
layout above, `compact` must not be `true`, and `nodeProcessParams` must be absent. The following
`common` attributes are meaningless for Python and ignored (or rejected by the schema):

| Attribute                                     | Why                                                                                                                                                                                                                                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compact`, `compactGroup`, `runAsCompactMode` | Compact mode loads an adapter into a running Node.js process. A mistakenly set `compact: true` is cleared with a warning before anything reads it.                                                                                                                                      |
| `nodeProcessParams`                           | Arguments for the Node.js runtime.                                                                                                                                                                                                                                                      |
| `engines.node` (package.json)                 | The Python equivalent, `requires-python` in `pyproject.toml`, is enforced by the tool that builds the environment.                                                                                                                                                                      |
| `mode: "extension"`                           | Web extensions are loaded into the Node.js process of the hosting web server. Not rejected by the schema, because running extensions out of process (over an internal socket) is a possible later addition — the controller refuses to start such an instance with a clear log message. |

`common.memoryLimitMB` currently has no effect either — it translates to a V8 heap flag.

## The environment on disk

Each Python adapter gets **one environment per adapter** (not per instance) below the data
directory:

```text
<iobroker-data>/py/<adapterName>/
├── venv/                  # the virtual environment
│   └── bin/python         # Scripts/python.exe on Windows
└── environment.json       # stamp written by py-controller
```

`environment.json` records what the environment was built for:

```json
{
    "adapterVersion": "1.2.3",
    "dependencyHash": "…",
    "builtAt": "2026-08-31T12:00:00Z",
    "pythonVersion": "3.12.4"
}
```

- `adapterVersion` (required) — `common.version` of the adapter the environment was built for.
- `dependencyHash` (optional) — hash over the adapter's `pyproject.toml`, so dependency edits
  without a version bump are noticed too.
- `builtAt`, `pythonVersion` (optional) — informational.

Before starting an instance, the controller checks that the interpreter exists and that
`adapterVersion` matches the installed `common.version`. If the environment is missing or stale,
the instance is **not** started and the reason is logged — that log line is py-controller's signal
to build or rebuild the environment and then restart the instance. An environment without a stamp
file is accepted as-is (environments built by hand or before the stamp existed) and left to
py-controller to bring up to date.

The environment is host-local state like `node_modules`: `iobroker del <adapter>` removes it
together with the npm package, and it is not part of backups — after a restore, py-controller
rebuilds it.

## How an instance is started

```text
<venv>/python -u -m <module> --instance <n> --loglevel <level>
```

- Working directory: the adapter's `python/` directory.
- `-u` disables Python's output buffering, so forwarded log lines arrive when they are written.
- The command line carries **no credentials**. Database connection settings are passed through the
  environment instead, because `/proc/<pid>/cmdline` is readable by every user on the machine
  while the environment of a running process is not:

| Variable                               | Content                                                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IOB_STATES_HOST` / `IOB_OBJECTS_HOST` | Database host                                                                                                                                                  |
| `IOB_STATES_PORT` / `IOB_OBJECTS_PORT` | Database port                                                                                                                                                  |
| `IOB_STATES_TYPE` / `IOB_OBJECTS_TYPE` | `redis`, `file` or `jsonl` — for `file`/`jsonl` the controller itself serves the Redis protocol on the given port, so the SDK always speaks the Redis protocol |
| `IOB_STATES_DB` / `IOB_OBJECTS_DB`     | Redis database number (only when configured)                                                                                                                   |
| `IOB_STATES_PASS` / `IOB_OBJECTS_PASS` | Redis password (only when one is configured)                                                                                                                   |
| `IOB_INSTANCE`                         | Instance number, e.g. `0`                                                                                                                                      |
| `IOB_LOGLEVEL`                         | Log level for this instance (only when configured)                                                                                                             |

The SDK must read these variables instead of parsing `iobroker.json`. Any `IOB_*` variables
inherited from the shell the controller was started in are cleared first — the adapter's
connection is decided by the configuration alone.

**Limitation:** a Redis **Sentinel** setup (multiple hosts) cannot be expressed through these
variables yet. The controller refuses to start Python adapters on such installations with a clear
log message rather than letting them connect to a sentinel as if it were a plain Redis.

All `common.mode` values except `extension` behave as for Node.js adapters: `daemon` is kept
running, `schedule` is started by CRON, `once` runs on start and on configuration changes
(`allowInit`).

## Logging

A Node.js adapter logs exclusively through the states database and its process output is
discarded. For Python both output streams are captured instead of discarded, because `print()` and
libraries writing to stdout, as well as tracebacks and the `logging` module's default handler on
stderr, would otherwise be lost:

- **stdout** → controller log at level `info`, prefixed with the instance id
- **stderr** → controller log at level `error`

Output is re-assembled into whole lines before logging (a traceback must not arrive torn across
log entries), and whatever is still buffered when the process exits is flushed to the log.

This forwarding is a safety net, not the logging mechanism. A well-behaved adapter logs through
the states database (`log.<hostname>` conventions) like a Node.js adapter does, honouring
`IOB_LOGLEVEL`.

## Stopping, exit codes, restarts

The stop protocol is the same as for Node.js adapters and is driven through the state
`system.adapter.<name>.<instance>.sigKill`:

1. When the controller starts a `daemon` instance, it sets `sigKill` to the process PID
   (`ack: true`). The SDK **must subscribe** to this state. If its value ever differs from the
   process's own PID, another supervisor took over and the adapter must exit.
2. To stop an instance, the controller sets `sigKill` to `-1` (`ack: false`). The adapter is
   expected to shut down gracefully on its own.
3. If the process has not exited after `common.stopTimeout` milliseconds (default 1000), it is
   killed with `SIGKILL`. Adapters that need longer to shut down declare a larger `stopTimeout`.
4. Alternatively an adapter can declare `common.supportedMessages.stopInstance` and receive a
   `stopInstance` message through the messagebox instead.

Exit codes the controller gives meaning to (from `EXIT_CODES` in
`@iobroker/js-controller-common-db`):

| Code | Name                            | Controller reaction                                                                                                                                                                              |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0    | `NO_ERROR`                      | For `schedule`/`once`: normal end. An enabled `daemon` is restarted after 30 s (a daemon is not supposed to exit).                                                                               |
| 6    | `UNCAUGHT_EXCEPTION`            | Restarted, and counted towards restart-loop detection: three such exits without 10 quiet minutes in between stop further restarts. The SDK should exit with this code on an unhandled exception. |
| 11   | `ADAPTER_REQUESTED_TERMINATION` | Planned stop, instance is **not** restarted.                                                                                                                                                     |
| 156  | `START_IMMEDIATELY_AFTER_STOP`  | Instance is restarted after 1 s.                                                                                                                                                                 |

Every other exit code of an enabled daemon also leads to a restart. (`ADAPTER_REQUESTED_REBUILD` =
13 triggers an `npm rebuild` of native Node.js modules and is meaningless for Python.)

Telemetry (`alive`, `connected`, `memHeapUsed` etc.) is written by the SDK the same way the Node.js
adapter framework does; process-level CPU/memory monitoring by the controller works on the PID and
needs nothing from the adapter.

## Messaging (`sendTo`)

There is no IPC channel between the controller and a Python adapter process (nothing is ever sent
over one for Node.js adapters either). `sendTo` messages travel through the states database: the
SDK subscribes to `messagebox.system.adapter.<name>.<instance>` and answers to the messagebox of
the sender. Declare `common.messagebox` / `common.supportedMessages` as usual.

## ACL — what the SDK must implement

ioBroker access control is **not** enforced by the databases; it is enforced cooperatively by the
client libraries (in the JS stack: the objects client and the adapter framework). A Python adapter
talks to the databases directly, so the SDK has the same abilities — and the same obligations — as
the JS libraries:

1. **Stamp new objects with the default ACL.** `system.config.common.defaultNewAcl` defines owner,
   group and permission bits for newly created objects. The JS objects client applies it (and
   tracks changes to it via a subscription on `system.config`); an SDK that creates objects
   without an `acl` produces objects that admin displays and treats differently.
2. **File rights.** If the SDK offers `readFile`/`writeFile` style APIs, the permission checks the
   JS client performs (`acl.file` of the corresponding meta object) are its job too.
3. **User-scoped operations.** If a Python adapter executes requests on behalf of a user (the way
   web or admin do), the SDK needs an equivalent of the adapter framework's
   `calculatePermissions` — resolving the user's groups and checking the requested operation
   against object/state ACLs before performing it.

None of this makes the process less privileged: like every Node.js adapter, a Python adapter holds
full database credentials. The ACL layer is about behaving correctly towards the rest of the
system, not about restricting the adapter itself.
