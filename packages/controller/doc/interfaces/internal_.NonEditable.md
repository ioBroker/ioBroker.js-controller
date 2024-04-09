[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / NonEditable

# Interface: NonEditable

[\<internal\>](../modules/internal_.md).NonEditable

ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of object cannot be changed by the user without valid password.
To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
If object does not have "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that if someone will change the object, he must provide the password in "nonEdit.password".
If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
Note, that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.

## Table of contents

### Properties

- [common](internal_.NonEditable.md#common)
- [native](internal_.NonEditable.md#native)
- [passHash](internal_.NonEditable.md#passhash)
- [password](internal_.NonEditable.md#password)

## Properties

### common

• `Optional` **common**: `Record`\<`string`, `any`\>

These properties can only be changed by providing the password, else they stay on the initial value

#### Defined in

[types-dev/objects.d.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/d68ed299/packages/types-dev/objects.d.ts#L773)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

These properties can only be changed by providing the password, else they stay on the initial value

#### Defined in

[types-dev/objects.d.ts:775](https://github.com/ioBroker/ioBroker.js-controller/blob/d68ed299/packages/types-dev/objects.d.ts#L775)

___

### passHash

• `Optional` **passHash**: `string`

Hashed version of current password

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/d68ed299/packages/types-dev/objects.d.ts#L771)

___

### password

• `Optional` **password**: `string`

Password needed to edit non-editable information

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/d68ed299/packages/types-dev/objects.d.ts#L769)
