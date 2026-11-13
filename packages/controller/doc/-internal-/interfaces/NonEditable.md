[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonEditable

# Interface: NonEditable

Defined in: [types-dev/objects.d.ts:1056](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1056)

ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of an object cannot be changed by the user without a valid password.
To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
If an object does not have a "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that, if someone changes the object, he must provide the password in "nonEdit.password".
If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
Note that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.

## Properties

### common?

> `optional` **common?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1062](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1062)

These properties can only be changed by providing the password, else they stay on the initial value

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1064](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1064)

These properties can only be changed by providing the password, else they stay on the initial value

***

### passHash?

> `optional` **passHash?**: `string`

Defined in: [types-dev/objects.d.ts:1060](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1060)

Hashed version of the current password

***

### password?

> `optional` **password?**: `string`

Defined in: [types-dev/objects.d.ts:1058](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1058)

Password needed to edit non-editable information
