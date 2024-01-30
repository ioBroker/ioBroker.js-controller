[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / LicenseInformationFree

# Interface: LicenseInformationFree

[\<internal\>](../modules/internal_.md).LicenseInformationFree

## Table of contents

### Properties

- [license](internal_.LicenseInformationFree.md#license)
- [link](internal_.LicenseInformationFree.md#link)
- [type](internal_.LicenseInformationFree.md#type)

## Properties

### license

• `Optional` **license**: `string`

License of the software

#### Defined in

[types-dev/objects.d.ts:498](https://github.com/ioBroker/ioBroker.js-controller/blob/1196b435/packages/types-dev/objects.d.ts#L498)

___

### link

• `Optional` **link**: `string`

Hyperlink, where information about the license can be found. This is required if the license type is different from 'free'.

#### Defined in

[types-dev/objects.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/1196b435/packages/types-dev/objects.d.ts#L502)

___

### type

• **type**: ``"free"``

Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.

#### Defined in

[types-dev/objects.d.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/1196b435/packages/types-dev/objects.d.ts#L500)
