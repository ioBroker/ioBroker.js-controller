[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ReadWriteStream

# Interface: ReadWriteStream

[<internal>](../modules/internal_.md).ReadWriteStream

## Hierarchy

- [`ReadableStream`](internal_.ReadableStream.md)

- [`WritableStream`](internal_.WritableStream.md)

  ↳ **`ReadWriteStream`**

## Table of contents

### Properties

- [readable](internal_.ReadWriteStream.md#readable)
- [writable](internal_.ReadWriteStream.md#writable)

### Methods

- [[asyncIterator]](internal_.ReadWriteStream.md#[asynciterator])
- [addListener](internal_.ReadWriteStream.md#addlistener)
- [emit](internal_.ReadWriteStream.md#emit)
- [end](internal_.ReadWriteStream.md#end)
- [eventNames](internal_.ReadWriteStream.md#eventnames)
- [getMaxListeners](internal_.ReadWriteStream.md#getmaxlisteners)
- [isPaused](internal_.ReadWriteStream.md#ispaused)
- [listenerCount](internal_.ReadWriteStream.md#listenercount)
- [listeners](internal_.ReadWriteStream.md#listeners)
- [off](internal_.ReadWriteStream.md#off)
- [on](internal_.ReadWriteStream.md#on)
- [once](internal_.ReadWriteStream.md#once)
- [pause](internal_.ReadWriteStream.md#pause)
- [pipe](internal_.ReadWriteStream.md#pipe)
- [prependListener](internal_.ReadWriteStream.md#prependlistener)
- [prependOnceListener](internal_.ReadWriteStream.md#prependoncelistener)
- [rawListeners](internal_.ReadWriteStream.md#rawlisteners)
- [read](internal_.ReadWriteStream.md#read)
- [removeAllListeners](internal_.ReadWriteStream.md#removealllisteners)
- [removeListener](internal_.ReadWriteStream.md#removelistener)
- [resume](internal_.ReadWriteStream.md#resume)
- [setEncoding](internal_.ReadWriteStream.md#setencoding)
- [setMaxListeners](internal_.ReadWriteStream.md#setmaxlisteners)
- [unpipe](internal_.ReadWriteStream.md#unpipe)
- [unshift](internal_.ReadWriteStream.md#unshift)
- [wrap](internal_.ReadWriteStream.md#wrap)
- [write](internal_.ReadWriteStream.md#write)

## Properties

### readable

• **readable**: `boolean`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[readable](internal_.ReadableStream.md#readable)

#### Defined in

node_modules/@types/node/globals.d.ts:191

___

### writable

• **writable**: `boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[writable](internal_.WritableStream.md#writable)

#### Defined in

node_modules/@types/node/globals.d.ts:205

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[[asyncIterator]](internal_.ReadableStream.md#[asynciterator])

#### Defined in

node_modules/@types/node/globals.d.ts:201

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[addListener](internal_.WritableStream.md#addlistener)

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[emit](internal_.WritableStream.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### end

▸ **end**(`cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:208

▸ **end**(`data`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Uint8Array` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:209

▸ **end**(`str`, `encoding?`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:210

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[WritableStream](internal_.WritableStream.md).[eventNames](internal_.WritableStream.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to defaultMaxListeners.

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[getMaxListeners](internal_.WritableStream.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[isPaused](internal_.ReadableStream.md#ispaused)

#### Defined in

node_modules/@types/node/globals.d.ts:196

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[listenerCount](internal_.WritableStream.md#listenercount)

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[WritableStream](internal_.WritableStream.md).[listeners](internal_.WritableStream.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[off](internal_.WritableStream.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[on](internal_.WritableStream.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[once](internal_.WritableStream.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### pause

▸ **pause**(): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[pause](internal_.ReadableStream.md#pause)

#### Defined in

node_modules/@types/node/globals.d.ts:194

___

### pipe

▸ **pipe**<`T`\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`WritableStream`](internal_.WritableStream.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[pipe](internal_.ReadableStream.md#pipe)

#### Defined in

node_modules/@types/node/globals.d.ts:197

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[prependListener](internal_.WritableStream.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[prependOnceListener](internal_.WritableStream.md#prependoncelistener)

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[WritableStream](internal_.WritableStream.md).[rawListeners](internal_.WritableStream.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### read

▸ **read**(`size?`): `string` \| [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | `number` |

#### Returns

`string` \| [`Buffer`](../modules/internal_.md#buffer)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[read](internal_.ReadableStream.md#read)

#### Defined in

node_modules/@types/node/globals.d.ts:192

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[removeAllListeners](internal_.WritableStream.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[removeListener](internal_.WritableStream.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### resume

▸ **resume**(): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[resume](internal_.ReadableStream.md#resume)

#### Defined in

node_modules/@types/node/globals.d.ts:195

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[setEncoding](internal_.ReadableStream.md#setencoding)

#### Defined in

node_modules/@types/node/globals.d.ts:193

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[setMaxListeners](internal_.WritableStream.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### unpipe

▸ **unpipe**(`destination?`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [`WritableStream`](internal_.WritableStream.md) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[unpipe](internal_.ReadableStream.md#unpipe)

#### Defined in

node_modules/@types/node/globals.d.ts:198

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `string` \| `Uint8Array` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

`void`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[unshift](internal_.ReadableStream.md#unshift)

#### Defined in

node_modules/@types/node/globals.d.ts:199

___

### wrap

▸ **wrap**(`oldStream`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [`ReadableStream`](internal_.ReadableStream.md) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[wrap](internal_.ReadableStream.md#wrap)

#### Defined in

node_modules/@types/node/globals.d.ts:200

___

### write

▸ **write**(`buffer`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `string` \| `Uint8Array` |
| `cb?` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[write](internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/globals.d.ts:206

▸ **write**(`str`, `encoding?`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[write](internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/globals.d.ts:207
