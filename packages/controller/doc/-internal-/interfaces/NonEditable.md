[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonEditable

# Interface: NonEditable

ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of an object cannot be changed by the user without a valid password.
To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
If an object does not have "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that, if someone changes the object, he must provide the password in "nonEdit.password".
If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
Note, that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.

## Properties

### common?

> `optional` **common**: `Record`\<`string`, `any`\>

These properties can only be changed by providing the password, else they stay on the initial value

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L909)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

These properties can only be changed by providing the password, else they stay on the initial value

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L911)

***

### passHash?

> `optional` **passHash**: `string`

Hashed version of current password

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L907)

***

### password?

> `optional` **password**: `string`

Password needed to edit non-editable information

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L905)
