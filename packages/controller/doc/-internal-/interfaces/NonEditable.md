[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonEditable

# Interface: NonEditable

Defined in: [types-dev/objects.d.ts:983](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L983)

ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of an object cannot be changed by the user without a valid password.
To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
If an object does not have a "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that, if someone changes the object, he must provide the password in "nonEdit.password".
If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
Note that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.

## Properties

### common?

> `optional` **common?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L989)

These properties can only be changed by providing the password, else they stay on the initial value

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L991)

These properties can only be changed by providing the password, else they stay on the initial value

***

### passHash?

> `optional` **passHash?**: `string`

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L987)

Hashed version of the current password

***

### password?

> `optional` **password?**: `string`

Defined in: [types-dev/objects.d.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L985)

Password needed to edit non-editable information
