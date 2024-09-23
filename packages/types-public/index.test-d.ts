import { clearTimeout } from 'node:timers';

declare function assertNever(val: never): never;

// Let the tests begin
declare let adapter: ioBroker.Adapter;

// Test EventEmitter definitions
adapter
    .on('ready', readyHandler)
    .on('stateChange', stateChangeHandler)
    .on('objectChange', objectChangeHandler)
    .on('message', messageHandler)
    .on('unload', unloadHandler);
adapter
    .removeListener('ready', readyHandler)
    .removeListener('stateChange', stateChangeHandler)
    .removeListener('objectChange', objectChangeHandler)
    .removeListener('message', messageHandler)
    .removeListener('unload', unloadHandler);
adapter.removeAllListeners();

// Test adapter constructor options
const adapterOptions: ioBroker.AdapterOptions = {
    name: 'foo',
    ready: readyHandler,
    stateChange: stateChangeHandler,
    objectChange: objectChangeHandler,
    message: messageHandler,
    unload: unloadHandler,
    error: err => {
        console.log(err);
        return true;
    },
};

function readyHandler(): void {}

function stateChangeHandler(id: string, state: ioBroker.State | null | undefined): void {
    // Test State properties
    if (state) {
        state.ack;
        state.c && state.c.toLowerCase();
        state.expire && state.expire.toFixed();
        state.from.toLowerCase();
        state.lc.toFixed();
        state.q && state.q.toFixed();
        state.user && state.user.toLowerCase();
        state.ts.toFixed();
        state.val;
    }
}

function objectChangeHandler(id: string, object: ioBroker.Object | null | undefined): void {
    // Test properties of all objects
    if (object) {
        object._id.toLowerCase();
        const name = object.common.name;
        if (typeof name !== 'string') {
            name.de; // $ExpectType string | undefined
        }
        object.common.role && object.common.role.toLowerCase();
        object.common.icon && object.common.icon.toLowerCase();
        object.native.toString();
        object.enums && object.enums.toString();
        if (object.acl) {
            object.acl.object.toFixed();
            object.acl.owner.toLowerCase();
            object.acl.ownerGroup.toLowerCase();
        }
        // Test different object kinds
        switch (object.type) {
            case 'adapter':
            case 'config':
            case 'enum':
            case 'group':
            case 'host':
            case 'instance':
            case 'meta':
            case 'script':
            case 'user':
                // nothing special here, update these tests when we have specialized definitions
                break;

            case 'state':
                if (object.acl) {
                    object.acl.state.toFixed();
                }
                object.common.def;
                typeof object.common.desc === 'string' && object.common.desc.toLowerCase();
                object.common.history;
                object.common.max && object.common.max.toFixed();
                object.common.min && object.common.min.toFixed();
                object.common.read.valueOf();
                object.common.states && object.common.states.toString();
                object.common.type && object.common.type.toLowerCase();
                object.common.unit && object.common.unit.toLowerCase();
                object.common.workingID && object.common.workingID.toLowerCase();
                object.common.write.valueOf();
                break;

            case 'channel':
                if (typeof object.common.desc === 'object') {
                    object.common.desc.en.toLowerCase();
                } else if (object.common.desc) {
                    object.common.desc.toLowerCase();
                }
                break;

            case 'device':
                // nothing special here, update these tests when we have specialized definitions
                break;
        }
    }
}

function messageHandler(msg: ioBroker.Message): void {
    msg._id.toFixed();
    if (msg.callback) {
        // callback is optional and if there types have to match
        msg.callback.ack.valueOf();
        msg.callback.id.toFixed();
        msg.callback.message.toString();
        msg.callback.time.toFixed();
    }
    msg.command.toLowerCase();
    msg.from.toLowerCase();
    typeof msg.message === 'object' && msg.message.anything;
    typeof msg.message === 'string' && msg.message.toLowerCase();
}

function unloadHandler(callback: ioBroker.EmptyCallback): void {
    adapter.log.info('shutting down');
    callback();
}

// Test the most important methods
adapter.setState('state.name', 'value');
adapter.setState('state.name', 'value', true);
adapter.setState('state.name', 'value', (err, id) => {});
adapter.setState('state.name', { val: 'value', ack: true });
adapter.setState('state.name', { val: 'value', ack: true }, (_err, _id) => {});
adapter.setState('state.name', { val: 'value', ack: true, q: adapter.constants.STATE_QUALITY.BAD });
// @ts-expect-error invalid quality
adapter.setState('state.name', { val: 'value', ack: true, q: 1234 });

// setState without callback is returning a promise
adapter.setState('state.name', true, true).then(id => id.toLowerCase());
adapter.setState('state.name', true).then(id => id.toLowerCase());
adapter.setState('state.name', true, {}).then(id => id.toLowerCase());
adapter.setState('state.name', true, true, {}).then(id => id.toLowerCase());

adapter.setStateAsync('state.name', 'value').then(id => id.toLowerCase());
adapter.setStateAsync('state.name', 'value', true).then(id => id.toLowerCase());
adapter.setStateAsync('state.name', { val: 'value', ack: true }).then(id => id.toLowerCase());

adapter.setStateChanged('state.name', 'value');
adapter.setStateChanged('state.name', 'value', true);
adapter.setStateChanged('state.name', 'value', (_err, _id) => {});
adapter.setStateChanged('state.name', { val: 'value', ack: true });
adapter.setStateChanged('state.name', { val: 'value', ack: true }, (_err, _id) => {});

adapter.setStateChangedAsync('state.name', 'value').then(id => id.toLowerCase());
adapter.setStateChangedAsync('state.name', 'value', true).then(id => id.toLowerCase());
adapter.setStateChangedAsync('state.name', { val: 'value', ack: true }).then(id => id.toLowerCase());

adapter.setForeignState('state.name', 'value');
adapter.setForeignState('state.name', 'value', true);
adapter.setForeignState('state.name', 'value', (_err, _id) => {});
adapter.setForeignState('state.name', { val: 'value', ack: true });
adapter.setForeignState('state.name', { val: 'value', ack: true }, (_err, _id) => {});

adapter.setForeignStateAsync('state.name', 'value').then(id => id.toLowerCase());
adapter.setForeignStateAsync('state.name', 'value', true).then(id => id.toLowerCase());
adapter.setForeignStateAsync('state.name', { val: 'value', ack: true }).then(id => id.toLowerCase());

adapter.setForeignStateChanged('state.name', 'value');
adapter.setForeignStateChanged('state.name', 'value', true);
adapter.setForeignStateChanged('state.name', 'value', (_err, _id) => {});
adapter.setForeignStateChanged('state.name', { val: 'value', ack: true });
adapter.setForeignStateChanged('state.name', { val: 'value', ack: true }, (_err, _id) => {});

adapter.setForeignStateChangedAsync('state.name', 'value').then(id => id.toLowerCase());
adapter.setForeignStateChangedAsync('state.name', 'value', true).then(id => id.toLowerCase());
adapter.setForeignStateChangedAsync('state.name', { val: 'value', ack: true }).then(id => id.toLowerCase());

adapter.getState('state.id', (err, state) => state && state.from.toLowerCase());
adapter.getStateAsync('state.id').then(state => state && state.from.toLowerCase());
adapter.getForeignState('state.id', (err, state) => state && state.from.toLowerCase());
adapter.getForeignStateAsync('state.id').then(state => state && state.from.toLowerCase());

adapter.setObject('obj.id', { type: 'device', common: { name: 'foo' }, native: {} });
adapter.setObject('obj.id', { type: 'device', common: { name: 'foo' }, native: {} }, (_err, _id) => {});
adapter.setForeignObject('obj.id', { type: 'device', common: { name: 'foo' }, native: {} });
adapter.setForeignObject('obj.id', { type: 'device', common: { name: 'foo' }, native: {} }, (_err, _id) => {});

adapter
    .setObjectAsync('obj.id', { type: 'device', common: { name: 'foo' }, native: {} })
    .then(({ id }) => id.toLowerCase());
adapter
    .setForeignObjectAsync('obj.id', { type: 'device', common: { name: 'foo' }, native: {} })
    .then(({ id }) => id.toLowerCase());

adapter.setObjectNotExists('obj.id', { type: 'device', common: { name: 'foo' }, native: {} });
adapter.setObjectNotExists('obj.id', { type: 'device', common: { name: 'foo' }, native: {} }, (err, _id) => {});
adapter.setForeignObjectNotExists('obj.id', { type: 'device', common: { name: 'foo' }, native: {} });
adapter.setForeignObjectNotExists('obj.id', { type: 'device', common: { name: 'foo' }, native: {} }, (_err, _id) => {});

adapter
    .setObjectNotExistsAsync('obj.id', { type: 'device', common: { name: 'foo' }, native: {} })
    .then(({ id }) => id.toLowerCase());
adapter
    .setForeignObjectNotExistsAsync('obj.id', { type: 'device', common: { name: 'foo' }, native: {} })
    .then(({ id }) => id.toLowerCase());

adapter.getObject('obj.id', (_err, _obj) => {});
adapter.getForeignObject('obj.id', (_err, _obj) => {});

adapter.getObjectAsync('obj.id').then(obj => obj && obj._id.toLowerCase());
adapter.getForeignObjectAsync('obj.id').then(obj => obj && obj._id.toLowerCase());

adapter.getForeignObjects('*', (err, objs) => objs!.foo._id.toLowerCase());
// getForeignObjectsAsync always returns a Record when it doesn't throw
adapter.getForeignObjectsAsync('*').then(objs => objs.foo._id.toLowerCase());
// If an object type was specified, the returned objects have the correct type
adapter.getForeignObjectsAsync('*', 'adapter').then(objs => {
    objs[0].type; // $ExpectType "adapter"
});

// Check that required properties are enforced
// OK:
adapter.setObject('id', {
    _id: 'id',
    type: 'state',
    common: {
        type: 'array',
        name: 'foo',
        read: true,
        write: false,
        role: 'some role',
        def: [],
        defAck: false,
    },
    native: {},
    from: 'me',
    user: 'also me',
    ts: Date.now(),
});

adapter.setObject(
    'id',
    // missing property type
    // @ts-expect-error
    {
        common: {
            type: 'array',
            name: 'foo',
            read: true,
            write: false,
            role: 'some role',
        },
        native: {},
        protectedNative: ['none'],
        encryptedNative: ['none'],
        from: 'me',
        ts: Date.now(),
    },
);

adapter.setObject(
    'id',
    // missing property common
    // @ts-expect-error
    {
        type: 'state',
        native: {},
        from: 'me',
        ts: Date.now(),
    },
);

adapter.setObject(
    'id',
    // missing property common.role
    // @ts-expect-error
    {
        type: 'state',
        common: {
            name: 'foo',
            read: true,
            write: false,
        },
        native: {},
    },
);

// TODO: Cannot enforce this without making it impossible to use interfaces to describe the shape of `native`
// adapter.setObject('id', {
//     type: 'device',
//     common: {
//         name: 'foo',
//     },
//     native: {
//         // Date is not allowed here
//         // @ts-expect-error
//         date: new Date(),
//     },
// });

// Check that name as object is okay:
adapter.extendForeignObject('id', {
    common: {
        name: {
            en: 'foobar',
            fr: 'le foo de bar',
        },
    },
});

// Check that `preserve` is typed correctly
adapter.extendObject(
    'id',
    {},
    {
        preserve: { common: ['name'] },
        // And that undocumented options are allowed
        undocumented: true,
    },
);
adapter.extendObject(
    'id',
    {},
    {
        preserve: { common: { name: true } },
    },
);
adapter.extendForeignObject(
    'id',
    {},
    {
        preserve: { common: { name: { en: true } } },
    },
);

// Make sure the return type of getObjectView is inferred correctly
adapter.getObjectView('system', 'admin', { startkey: 'foo', endkey: 'bar' }, (err, docs) => {
    docs!.rows[0].id; // $ExpectType string
    // FIXME: This should check for ioBroker.Object | null instead, but dtslint with TS4.7 is broken
    // https://github.com/microsoft/dtslint/issues/352
    docs!.rows[0].value?._id; // $ExpectType string | undefined
});
adapter.getObjectViewAsync('system', 'admin', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].id; // $ExpectType string
    // FIXME: This should check for ioBroker.Object | null instead, but dtslint with TS4.7 is broken
    // https://github.com/microsoft/dtslint/issues/352
    docs.rows[0].value?._id; // $ExpectType string | undefined
});
adapter.getObjectView('system', 'admin', { startkey: 'foo', endkey: 'bar' }, (err, docs) => {
    docs!.rows[0].id; // $ExpectType string
    // FIXME: This should check for ioBroker.Object | null instead, but dtslint with TS4.7 is broken
    // https://github.com/microsoft/dtslint/issues/352
    docs!.rows[0].value?._id; // $ExpectType string | undefined
});
adapter.getObjectViewAsync('system', 'admin', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].id; // $ExpectType string
    // FIXME: This should check for ioBroker.Object | null instead, but dtslint with TS4.7 is broken
    // https://github.com/microsoft/dtslint/issues/352
    docs.rows[0].value?._id; // $ExpectType string | undefined
});
adapter.getObjectView('hm-rpc', 'foo', { startkey: 'foo', endkey: 'bar' }, (err, docs) => {
    docs!.rows[0].id; // $ExpectType string
    docs!.rows[0].value; // $ExpectType any
});
adapter.getObjectViewAsync('hm-rpc', 'admin', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].id; // $ExpectType string
    docs.rows[0].value; // $ExpectType any
});
// And without repetition some of the special ones:
adapter.getObjectViewAsync('system', 'instance', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].value.type; // $ExpectType "instance"
});
adapter.getObjectViewAsync('system', 'state', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].value.type; // $ExpectType "state"
});
adapter.getObjectViewAsync('system', 'custom', { startkey: 'foo', endkey: 'bar' }).then(docs => {
    docs.rows[0].value; // $ExpectType Record<string, any> | null
});

adapter.getObjectList({ startkey: 'foo', endkey: 'bar' }, {}, (err, result) => {
    result && result.rows[0] && result.rows[0].id.toLowerCase();
});
adapter.getObjectList({ startkey: 'foo', endkey: 'bar' }, (err, result) => {
    result && result.rows[0] && result.rows[0].id.toLowerCase();
});
adapter.getObjectListAsync({ startkey: 'foo', endkey: 'bar' }, {}).then(result => {
    result && result.rows[0] && result.rows[0].id.toLowerCase();
});
adapter.getObjectListAsync({ startkey: 'foo', endkey: 'bar' }).then(result => {
    result && result.rows[0] && result.rows[0].id.toLowerCase();
});

adapter.delObject('foo');
adapter.delObject('foo', { recursive: true });
adapter.delObject('foo', { someWeirdOption: 1 });

adapter.subscribeObjects('*');
adapter.subscribeStates('*');
adapter.subscribeForeignObjects('*');
adapter.subscribeForeignStates('*');
adapter.unsubscribeObjects('*');
adapter.unsubscribeStates('*');
adapter.unsubscribeForeignObjects('*');
adapter.unsubscribeForeignStates('*');

adapter.encrypt('top secret').toLocaleLowerCase();
adapter.decrypt('garbled nonsense').toLocaleLowerCase();

adapter.log.info('msg');
adapter.log.debug('msg');
adapter.log.warn('msg');
adapter.log.error('msg');
adapter.log.silly('msg');

switch (adapter.log.level) {
    case 'debug':
    case 'error':
    case 'info':
    case 'silly':
    case 'warn':
        break;
    default:
        assertNever(adapter.log.level);
}

adapter.sendTo('foo.0', 'command', 'message');
adapter.sendTo('foo.0', 'message');
adapter.sendTo('foo.0', 'command', { msg: 'message' });
adapter.sendTo('foo.0', { msg: 'message' });

function handleMessageResponse(response?: ioBroker.Message | Error): void {
    if (!response || response instanceof Error) {
        return;
    }

    response._id.toFixed();
    if (response.callback) {
        response.callback.ack.valueOf();
        response.callback.id.toFixed();
        response.callback.message.toString();
        response.callback.time.toFixed();
    }
    response.command.toLowerCase();
    response.from.toLowerCase();
    typeof response.message === 'object' && response.message.anything;
    typeof response.message === 'string' && response.message.toLowerCase();
}
adapter.sendTo('foo.0', 'command', 'message', handleMessageResponse);
adapter.sendTo('foo.0', 'message', handleMessageResponse);
adapter.sendTo('foo.0', 'command', { msg: 'message' }, handleMessageResponse);
adapter.sendTo('foo.0', { msg: 'message' }, handleMessageResponse);

adapter.sendToAsync('foo.0', 'command', 'message').then(handleMessageResponse);
adapter.sendToAsync('foo.0', 'message').then(handleMessageResponse);
adapter.sendToAsync('foo.0', 'command', { msg: 'message' }).then(handleMessageResponse);
adapter.sendToAsync('foo.0', { msg: 'message' }).then(handleMessageResponse);

adapter.sendToHost('host-foo', 'command', 'message');
adapter.sendToHost('host-foo', 'message');
adapter.sendToHost('host-foo', 'command', { msg: 'message' });
adapter.sendToHost('host-foo', { msg: 'message' });

adapter.sendToHost('host-foo', 'command', 'message', handleMessageResponse);
adapter.sendToHost('host-foo', 'message', handleMessageResponse);
adapter.sendToHost('host-foo', 'command', { msg: 'message' }, handleMessageResponse);
adapter.sendToHost('host-foo', { msg: 'message' }, handleMessageResponse);

adapter.sendToHostAsync('host-foo', 'command', 'message').then(handleMessageResponse);
adapter.sendToHostAsync('host-foo', 'message').then(handleMessageResponse);
adapter.sendToHostAsync('host-foo', 'command', { msg: 'message' }).then(handleMessageResponse);
adapter.sendToHostAsync('host-foo', { msg: 'message' }).then(handleMessageResponse);

function handleError(_err?: string): void {}
adapter.subscribeStates('*', handleError);
adapter.subscribeForeignStates('*', handleError);
adapter.unsubscribeStates('*', handleError);
adapter.unsubscribeForeignStates('*', handleError);

adapter.subscribeStatesAsync('*').catch(handleError);
adapter.subscribeForeignStatesAsync('*').catch(handleError);
adapter.unsubscribeStatesAsync('*').catch(handleError);
adapter.unsubscribeForeignStatesAsync('*').catch(handleError);
adapter.subscribeObjectsAsync('*').catch(handleError);
adapter.subscribeForeignObjectsAsync('*').catch(handleError);
adapter.unsubscribeObjectsAsync('*').catch(handleError);
adapter.unsubscribeForeignObjectsAsync('*').catch(handleError);

adapter.getHistory('state.id', {}, (_err, _result?: ioBroker.GetHistoryResult) => {});

(() => adapter.terminate())();
(() => adapter.terminate(1))();
(() => adapter.terminate('Reason'))();
(() => adapter.terminate('Reason', 4))();

// @ts-expect-error
adapter.supportsFeature && !!adapter.supportsFeature('foo');
adapter.supportsFeature && !!adapter.supportsFeature('ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE');

() => {
    const instance = adapter.getPluginInstance('my-plugin');
    instance && instance.someMethod();
    const config = adapter.getPluginConfig('my-plugin');
    config && config.x;
};

// @ts-expect-error
adapter.states.getStates();
// @ts-expect-error
adapter.objects.getObjectView();

adapter.oObjects && adapter.oObjects.foo && adapter.oObjects.foo._id.toString();
adapter.oStates && adapter.oStates.foo && adapter.oStates.foo.val;

// Repro from https://github.com/ioBroker/adapter-core/issues/3
const _repro1: ioBroker.ObjectChangeHandler = (id, obj) => {
    if (!obj || !obj.common) {
        return;
    }
    if (obj.common.custom) {
        const _test1: ioBroker.StateCommon = obj.common;
    }
    obj && obj.common && obj.common.custom && obj.common.custom['adapter.0'] && obj.common.custom['adapter.0'].enabled;
};

// Repro from https://github.com/ioBroker/adapter-core/issues/4
function _repro2(): void {
    // Prepare custom object
    const obj = {
        common: {
            custom: {
                'adapter.namespace': { start_day: null as any },
            },
        },
    };

    adapter.extendForeignObject('obj.id', obj, _err => {});
}

// repro from https://github.com/ioBroker/adapter-core/issues/6
function _repro3(): void {
    adapter.getDevices((error, deviceList) => {
        if (deviceList) {
            deviceList; // $ExpectType DeviceObject[]
        }
    });
    adapter.getDevicesAsync().then(list => {
        list; // $ExpectType DeviceObject[]
    });
    adapter.getChannels((error, channelList) => {
        if (channelList) {
            channelList; // $ExpectType ChannelObject[]
        }
    });
    adapter.getChannelsAsync().then(list => {
        list; // $ExpectType ChannelObject[]
    });
    adapter.getChannelsOfAsync().then(list => {
        list; // $ExpectType ChannelObject[]
    });
    adapter.getStatesOf((error, stateList) => {
        if (stateList) {
            stateList; // $ExpectType StateObject[]
        }
    });
    adapter.getStatesOfAsync().then(list => {
        list; // $ExpectType StateObject[]
    });
}

const _folderObj: ioBroker.FolderObject = {
    _id: 'id',
    type: 'folder',
    common: {
        name: 'something',
        // any property is allowed
        foo: 'bar',
    },
    native: {},
};

// This used to be an error: https://github.com/ioBroker/ioBroker.js-controller/issues/782
// With JS-Controller 3.3 it no longer is.
adapter.setState('id', { ack: false });
// @ts-expect-error
adapter.setState('id', {});

// null is a valid state value
adapter.setState('id', null);
adapter.setForeignState('id', null);
adapter.setStateAsync('id', null);
adapter.setForeignStateAsync('id', null);
adapter.setStateChanged('id', null);
adapter.setForeignStateChanged('id', null);
adapter.setStateChangedAsync('id', null);
adapter.setForeignStateChangedAsync('id', null);

// Objects and arrays are not valid state values
// @ts-expect-error
adapter.setState('id', { an: 'object' });
// @ts-expect-error
adapter.setForeignState('id', { an: 'object' });
// @ts-expect-error
adapter.setStateAsync('id', { an: 'object' });
// @ts-expect-error
adapter.setForeignStateAsync('id', { an: 'object' });
// @ts-expect-error
adapter.setStateChanged('id', { an: 'object' });
// @ts-expect-error
adapter.setForeignStateChanged('id', { an: 'object' });
// @ts-expect-error
adapter.setStateChangedAsync('id', { an: 'object' });
// @ts-expect-error
adapter.setForeignStateChangedAsync('id', { an: 'object' });
// @ts-expect-error
adapter.setState('id', ['an', 'array']);
// @ts-expect-error
adapter.setForeignState('id', ['an', 'array']);
// @ts-expect-error
adapter.setStateAsync('id', ['an', 'array']);
// @ts-expect-error
adapter.setForeignStateAsync('id', ['an', 'array']);
// @ts-expect-error
adapter.setStateChanged('id', ['an', 'array']);
// @ts-expect-error
adapter.setForeignStateChanged('id', ['an', 'array']);
// @ts-expect-error
adapter.setStateChangedAsync('id', ['an', 'array']);
// @ts-expect-error
adapter.setForeignStateChangedAsync('id', ['an', 'array']);
// @ts-expect-error
adapter.setState('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setForeignState('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setStateAsync('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setForeignStateAsync('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setStateChanged('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setForeignStateChanged('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setStateChangedAsync('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setForeignStateChangedAsync('id', { val: { an: 'object' } });
// @ts-expect-error
adapter.setState('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setForeignState('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setStateAsync('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setForeignStateAsync('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setStateChanged('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setForeignStateChanged('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setStateChangedAsync('id', { val: ['an', 'array'] });
// @ts-expect-error
adapter.setForeignStateChangedAsync('id', { val: ['an', 'array'] });

// Allow alias states
adapter
    .getForeignObjectAsync('adapter.0.stateId')
    .then(
        obj =>
            obj &&
            obj.type === 'state' &&
            (typeof obj.common.alias?.id === 'string' || typeof obj.common.alias?.id.read === 'string'),
    );

adapter.getObjectAsync('id').then(obj => {
    // Allow accessing unknown properties - the user is on its own here
    obj && obj.common && obj.common.alias && obj.common.alias.id;
    obj && obj.common && obj.common.unit && obj.common.workingID;
});

declare let state: ioBroker.StateObject;
if (typeof state.common.smartName === 'object' && state.common.smartName !== null) {
    state.common.smartName.de && state.common.smartName.de.toUpperCase();
    state.common.smartName.byON && state.common.smartName.byON.toUpperCase();
}

declare let enumObj: ioBroker.EnumObject;
enumObj.common.members && enumObj.common.members.map(() => 1);

adapter.setInterval((_param1: number, _param2: string) => {}, 100, 100, '');
// @ts-expect-error missing required parameter _param2
adapter.setInterval((_param1: number, _param2: string) => {}, 100, 100);
// @ts-expect-error wrong type of _param2
adapter.setInterval((_param1: number, _param2: string) => {}, 100, 100, 1);
adapter.setTimeout((_param1: number, _param2: string) => {}, 100, 100, '');
// @ts-expect-error missing required parameter _param2
adapter.setTimeout((_param1: number, _param2: string) => {}, 100, 100);
// @ts-expect-error wrong type of _param2
adapter.setTimeout((_param1: number, _param2: string) => {}, 100, 100, 1);
// Adapter.clearTimeout and clearInterval are not compatible with the builtins
adapter.clearTimeout(adapter.setTimeout(() => {}, 10));
adapter.clearInterval(adapter.setInterval(() => {}, 10));
// @ts-expect-error
adapter.clearInterval(adapter.setTimeout(() => {}, 10));
// @ts-expect-error
adapter.clearTimeout(adapter.setInterval(() => {}, 10));
// @ts-expect-error
clearTimeout(adapter.setTimeout(() => {}, 10));
// @ts-expect-error
clearInterval(adapter.setInterval(() => {}, 10));
// @ts-expect-error
adapter.clearTimeout(setTimeout(() => {}, 10));
// @ts-expect-error
adapter.clearInterval(setInterval(() => {}, 10));
// And they must not be switched
// @ts-expect-error
adapter.clearInterval(adapter.setTimeout(() => {}, 10));
// @ts-expect-error
adapter.clearTimeout(adapter.setInterval(() => {}, 10));

adapter.sendToUI({ data: 'blabla', clientId: '123-456-789' });
// @ts-expect-error clientId has to be string
adapter.sendToUI({ data: 'blabla', clientId: 12 });
// send to all clients
adapter.sendToUI({ data: [1, 2, 3] });

// Error callbacks were changed to Error objects
adapter.delFile(null, 'foo', err => {
    if (err) {
        // And the fs-specific ones now contain the code
        err.code;
        err.message;
        err.syscall;
    }
});

adapter.FORBIDDEN_CHARS.test('foo');
// @ts-expect-error
adapter.FORBIDDEN_CHARS = /_/;

// Repro from ioBroker.i2c
{
    interface PCF8574Config {
        pollingInterval: number;
        interrupt?: string;
        pins: PinConfig[];
    }

    interface PinConfig {
        dir: 'in' | 'out';
        inv?: boolean;
    }

    const config: PCF8574Config = undefined as any;

    adapter.extendObject(`some state`, {
        type: 'state',
        common: {
            name: `some name`,
            read: true,
            write: false,
            type: 'boolean',
            role: 'indicator',
            color: 'yellow',
        },
        native: config,
    });
}

// Test some of the more uncommon object types
const _adapterObject: ioBroker.AdapterObject = {
    _id: 'system.adapter.test',
    type: 'adapter',
    native: {},
    common: {
        enabled: true,
        installedVersion: '1.2.3',
        materialize: false,
        materializeTab: false,
        mode: 'daemon',
        name: 'test',
        automaticUpgrade: 'minor',
        platform: 'Javascript/Node.js',
        localLinks: {
            link1: '%web_protocol%://%ip%:%web_port%/vis-2/edit.html',
            link2: {
                name: { en: 'Service' },
                link: '%web_protocol%://%ip%:%web_port%/vis-2/edit.html',
            },
        },
        supportedMessages: {
            deviceManager: true,
        },
        titleLang: {
            de: 'foo',
            es: 'foo',
            fr: 'foo',
            it: 'foo',
            nl: 'foo',
            pl: 'foo',
            pt: 'foo',
            ru: 'foo',
            en: 'foo',
            uk: 'foo',
            'zh-cn': 'foo',
        },
        version: '1.2.3',
        blockedVersions: ['~3.14.0', '4.0.1'],
        plugins: {
            sentry: {
                dsn: 'XYZ',
            },
        },
    },
    instanceObjects: [],
    objects: [],
};

if (_adapterObject.common.licenseInformation && _adapterObject.common.licenseInformation.type === 'paid') {
    // for non-free licenses link is non optional
    _adapterObject.common.licenseInformation.link.includes('https://');
} else {
    // @ts-expect-error link is optional on free license
    _adapterObject.common.licenseInformation.link.includes('https://');
}

const _folderObject: ioBroker.FolderObject = {
    _id: '',
    type: 'folder',
    common: { name: 'My Folder' },
    native: {},
};

const _enumObject: ioBroker.EnumObject = {
    _id: '',
    type: 'enum',
    common: { name: 'My Enum', members: [] },
    native: {},
};

const _metaObject: ioBroker.MetaObject = {
    _id: '',
    type: 'meta',
    common: { type: 'meta.folder', name: 'foobar' },
    native: {},
};

const _deviceObject: ioBroker.DeviceObject = {
    _id: '',
    type: 'device',
    common: {
        name: 'my device',
        statusStates: {
            offlineId: 'device.isOffline',
            onlineId: 'device.isOnline',
            errorId: 'device.isError',
        },
    },
    native: {},
};

const _instanceObject: ioBroker.InstanceObject = {
    _id: 'system.adapter.test.0',
    type: 'instance',
    common: {
        enabled: true,
        host: 'my host',
        mode: 'daemon',
        name: 'instance 1',
        version: '1.0.0',
        platform: 'Javascript/Node.js',
        materialize: true,
        installedVersion: '1.0.0',
    },
    native: {},
    instanceObjects: [],
    objects: [],
};

const _userObject: ioBroker.UserObject = {
    _id: 'system.user.me',
    type: 'user',
    common: { name: 'me', password: '*****', enabled: true },
    native: {},
};

// Ensure that getForeignObject tries to resolve a specific object type
async () => {
    const inst: ioBroker.InstanceObject | null | undefined =
        await adapter.getForeignObjectAsync('system.adapter.admin.0');

    const adptr: ioBroker.AdapterObject | null | undefined =
        await adapter.getForeignObjectAsync('system.adapter.admin');

    let meta: ioBroker.MetaObject | null | undefined;
    meta = await adapter.getForeignObjectAsync('admin.0');
    meta = await adapter.getForeignObjectAsync('admin.admin');
    meta = await adapter.getForeignObjectAsync('admin.meta');
    meta = await adapter.getForeignObjectAsync('admin.meta.foobar');
    meta = await adapter.getForeignObjectAsync('admin.0.meta.blub');

    let chnl: ioBroker.ChannelObject | null | undefined;
    chnl = await adapter.getForeignObjectAsync('script.js.common');
    chnl = await adapter.getForeignObjectAsync('script.js.global');
    chnl = await adapter.getForeignObjectAsync('admin.777.info');

    const state: ioBroker.StateObject | null | undefined = await adapter.getForeignObjectAsync(
        'system.adapter.admin.0.foobar',
    );

    let scrChnl: ioBroker.ChannelObject | ioBroker.ScriptObject | null | undefined;
    scrChnl = await adapter.getForeignObjectAsync('script.js.my-script');
    scrChnl = await adapter.getForeignObjectAsync('script.js.my-script.foobar');

    let enm: ioBroker.EnumObject | null | undefined;
    enm = await adapter.getForeignObjectAsync('enum.functions');
    enm = await adapter.getForeignObjectAsync('enum.functions.light');

    const group: ioBroker.GroupObject | null | undefined =
        await adapter.getForeignObjectAsync('system.group.admin.faz');

    const user: ioBroker.UserObject | null | undefined = await adapter.getForeignObjectAsync('system.user.admin.faz');

    const host: ioBroker.HostObject | null | undefined = await adapter.getForeignObjectAsync('system.host.my-hostname');

    const config: (ioBroker.OtherObject & { type: 'config' }) | null | undefined =
        await adapter.getForeignObjectAsync('system.certificates');

    const sysConfig: ioBroker.SystemConfigObject | null | undefined =
        await adapter.getForeignObjectAsync('system.config');

    const systemRepo: ioBroker.RepositoryObject | null | undefined =
        await adapter.getForeignObjectAsync('system.repositories');

    let misc:
        | ioBroker.FolderObject
        | ioBroker.DeviceObject
        | ioBroker.ChannelObject
        | ioBroker.StateObject
        | null
        | undefined;
    misc = await adapter.getForeignObjectAsync('system.host.hostname.foobar');
    misc = await adapter.getForeignObjectAsync('adapter-name.0.foo');
    misc = await adapter.getForeignObjectAsync('adapter-name.0.foo.bar');
    misc = await adapter.getForeignObjectAsync('adapter-name.0.foo.bar.baz');

    // combined
    const idCombined = '' as 'enum.functions' | 'script.js.global';
    const combined: ioBroker.ChannelObject | ioBroker.EnumObject | null | undefined =
        await adapter.getForeignObjectAsync(idCombined);

    // unknown id
    const unknown: ioBroker.Object | null | undefined = await adapter.getForeignObjectAsync('');
};

// Ensure that setForeignObject tries to resolve a specific object type
() => {
    adapter.setForeignObject('system.host.my-hostname', {
        // @ts-expect-error
        type: 'not-host',
    });

    adapter.setForeignObject('admin.0.maybe-channel', {
        type: 'channel',
        common: {
            name: 'A channel',
        },
        native: {},
    });

    adapter.setForeignObject(null! as string, null! as ioBroker.Object);
};

// Test convenience types for subsets of SettableObject
{
    // Should be OK
    const stateObj: ioBroker.SettableStateObject = {
        type: 'state',
        common: {
            type: 'string',
            name: 'Dummy name',
            role: 'value',
            read: true,
            write: false,
            unit: '%',
        },
        native: {},
    };
}
{
    const stateObj: ioBroker.SettableDeviceObject = {
        // @ts-expect-error
        type: 'state',
        common: {
            name: 'Dummy name',
        },
        native: {},
    };
}

// Repro for https://github.com/ioBroker/adapter-core/issues/334
async () => {
    const states = await adapter.getStatesAsync('foo');
    // This should not error
    states.foo;
};

// Test registerNotification
// @ts-expect-error known scope can only have defined category
adapter.registerNotification('system', 'unknown', 'This is a problem!');
adapter.registerNotification('system', 'accessErrors', 'This is a problem!');
adapter.registerNotification('system', null, 'This is a problem!');
// unknown scopes can have any category null | string
adapter.registerNotification('someAdapter', null, 'This is a notification!');
adapter.registerNotification('someAdapter', 'unknown', 'This is a notification!');

// https://github.com/ioBroker/adapter-core/issues/429
adapter.namespace === 'foo-bar.0';
adapter.namespace === 'foooooo.10';
// @ts-expect-error
adapter.namespace === 'foo.bar.0';
// @ts-expect-error
adapter.namespace === 'foo-bar.a';
adapter.getForeignObjectAsync(`system.adapter.${adapter.namespace}`).then(o => {
    // $ExpectType InstanceObject
    o!;
});

// https://github.com/ioBroker/adapter-core/issues/378
adapter.performStrictObjectChecks = true;

// Ensure narrowing of SettableState works correctly

function testSettableState(arg: ioBroker.SettableState): void {
    if (arg.val !== undefined && arg.val !== null) {
        arg.val.toString(); // OK
        // @ts-expect-error
        arg.ts.toString();
        if (arg.ts !== undefined && arg.ts !== null) {
            arg.ts.toString(); // OK
        }
    }
    // $ExpectType number | undefined
    arg.ts;
}
