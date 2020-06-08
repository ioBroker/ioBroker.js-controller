# Aliases
Aliases (pseudonyms) are the virtual state objects, that linked with real states.

## Use cases
Often the real devices will be broken and the user must replace this device.
Additionally that the hardware will be replaced, the address of this device will be changed. E.g. from `hm-rpc.0.ABC123` to `hm-rpc.0.QJU978`.

Because the old address was used on many places like vis, javascript, scenes or others, the user must now find all these places and replace it there.

This feature allows to user to allocate alias for physical device and than use this alias in all cases.
As the device must be replaces, the ID must be changed only in alias.

Another use case for this feature is support of device in special smart adapters like iot or material.
With the help of aliases the required state structure could be created but the values will be read from physical devices.

## Explanation
All states that are created in the Object namespace `alias.0` will be managed as aliases.

The state value of the alias will be read from linked state (target), but object values (like common, native) will be read from
alias state himself.

Effectively an `alias` object will mirror the state value of the target object.
If allowed, both states can be changed and are synced automatically by the ioBroker core system.
Also both states can be used to subscribe in scripts and should behave exactly identical.

Here is an example of such an object:
```
{
  "_id": "alias.0.Light.Device_1.WORKING",
  "type": "state",
  "common": {
    "alias": {
      "id": "admin.0.connected"
    },
    "name": "WORKING",
    "role": "indicator.working",
    "type": "boolean"
  },
  "native": {}
}
```

`native` is always empty, because no device is behind alias itself and all settings will be stored in `common`.

But in the `common.alias.id` is stored the ID where the state value must be read or to be written into.

Alias make automatic conversion of the value if min/max settings for both (alias and target) objects is defined.

E.g. if alias has `min=0,max=100` and target has `min=0,max=255` so by the read the value 10 from target state will be
converted to 3.9215686274509802 and written into alias 10 will will be converted to 25.5.

The types will be converted automatic too. From string to number, from number to boolean and so on. Depends on types of
alias and target.

Additionally the write and read functions could be defined in `common.alias`:

```
{
  "_id": "alias.0.Temperature.SET",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786878.value",
      "write": "(val * 9/5) + 32",
      "read": "(val − 32) * 5/9"
    },
    "unit": "°C",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

and

```
{
  "_id": "knx.0.6786878.value",
  "type": "state",
  "common": {
    "unit": "°F",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

If convert functions are defined, so the automatic conversion will be deactivated. For read-only the write function
could be omitted, accordingly for write only functions - the read function.

E.g.

```
{
  "_id": "alias.0.button",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786879.value",
      "write": "val ? 1 : 0"
    },
    "name": "Button",
    "role": "button",
    "type": "boolean"
  },
  "native": {}
}
```

and

```
{
  "_id": "knx.0.6786879.value",
  "type": "state",
  "common": {
    "name": "KNX Switch",
    "role": "value",
    "type": "number",
    "min": 0,
    "max": 1
  },
  "native": {}
}
```

The internal convert function has following parameters and looks like:
```
function read(val, type, min, max, sType, sMin, sMax) {
    // val - source value
    // type - the type of alias
    // min - minimum limit (if exists) of alias
    // max - maximum limit (if exists) of alias
    // sType - the type of "s"ource value
    // sMin - minimum limit (if exists) of source value
    // sMax - maximum limit (if exists) of source value
    return val > max ? max : (val < min ? min : val);
}
```

You as user must write only the line with return: `common.alias.read="val > max ? max : (val < min ? min : val)"`.
 
The write function looks accordingly like this: 

```
function write(val, type, min, max, sType, sMin, sMax) {
    // val - source value
    // type - the type of alias
    // min - minimum limit (if exists) of alias
    // max - maximum limit (if exists) of alias
    // tType - the type of target value
    // tMin - minimum limit (if exists) of target value
    // tMax - maximum limit (if exists) of target value
    return val > tMax ? tMax : (val < tMin ? tMin : val);
}
```
You as user must write only the line with return: `common.alias.write="val > tMax ? tMax : (val < tMin ? tMin : val)"`.

**The `max`, `min` and `type` will be provided only from `js-controller >= 3.2.x`** 

The subscriptions will be managed automatically. If alias will be subscribed, so the target ID will be subscribed too.

The ID of target device could be changed dynamically (via admin) and subscription will be updated for new target ID.