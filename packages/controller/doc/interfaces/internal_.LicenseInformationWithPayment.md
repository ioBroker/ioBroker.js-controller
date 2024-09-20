[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / LicenseInformationWithPayment

# Interface: LicenseInformationWithPayment

[\<internal\>](../modules/internal_.md).LicenseInformationWithPayment

## Table of contents

### Properties

- [license](internal_.LicenseInformationWithPayment.md#license)
- [link](internal_.LicenseInformationWithPayment.md#link)
- [type](internal_.LicenseInformationWithPayment.md#type)

## Properties

### license

• `Optional` **license**: `string`

License of the software

#### Defined in

[types-dev/objects.d.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L533)

___

### link

• **link**: `string`

Hyperlink, where information about the license can be found. For non-free licenses, the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
This is required if the license type is different from 'free'. For 'free' licenses, an optional link to the license file can be placed here.

#### Defined in

[types-dev/objects.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L540)

___

### type

• **type**: [`PaidLicenseType`](../modules/internal_.md#paidlicensetype)

Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.

#### Defined in

[types-dev/objects.d.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L535)
