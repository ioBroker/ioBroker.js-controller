[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonEditable

# Interface: NonEditable

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1009)

ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of an object cannot be changed by the user without a valid password.
To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
If an object does not have a "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that, if someone changes the object, he must provide the password in "nonEdit.password".
If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
Note that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.

## Properties

### common?

> `optional` **common?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1015](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1015)

These properties can only be changed by providing the password, else they stay on the initial value

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1017](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1017)

These properties can only be changed by providing the password, else they stay on the initial value

***

### passHash?

> `optional` **passHash?**: `string`

Defined in: [types-dev/objects.d.ts:1013](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1013)

Hashed version of the current password

***

### password?

> `optional` **password?**: `string`

Defined in: [types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1011)

Password needed to edit non-editable information
