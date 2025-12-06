[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LicenseInformationFree

# Interface: LicenseInformationFree

## Properties

### license?

> `optional` **license**: `string`

License of the software

#### Defined in

[types-dev/objects.d.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L546)

***

### link?

> `optional` **link**: `string`

Hyperlink, where information about the license can be found. For non-free licenses, the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
This is required if the license type is different from 'free'. For 'free' licenses, an optional link to the license file can be placed here.

#### Defined in

[types-dev/objects.d.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L553)

***

### type

> **type**: `"free"`

Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.

#### Defined in

[types-dev/objects.d.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L548)
