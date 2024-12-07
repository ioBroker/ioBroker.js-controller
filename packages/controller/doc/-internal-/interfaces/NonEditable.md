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

[types-dev/objects.d.ts:902](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L902)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

These properties can only be changed by providing the password, else they stay on the initial value

#### Defined in

[types-dev/objects.d.ts:904](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L904)

***

### passHash?

> `optional` **passHash**: `string`

Hashed version of current password

#### Defined in

[types-dev/objects.d.ts:900](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L900)

***

### password?

> `optional` **password**: `string`

Password needed to edit non-editable information

#### Defined in

[types-dev/objects.d.ts:898](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L898)
