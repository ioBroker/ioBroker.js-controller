[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LicenseInformationFree

# Interface: LicenseInformationFree

Defined in: [types-dev/objects.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/e120bedfe97ccc05353afb78489da9de14b8814c/packages/types-dev/objects.d.ts#L544)

## Properties

### license?

> `optional` **license**: `string`

Defined in: [types-dev/objects.d.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/e120bedfe97ccc05353afb78489da9de14b8814c/packages/types-dev/objects.d.ts#L546)

License of the software

***

### link?

> `optional` **link**: `string`

Defined in: [types-dev/objects.d.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/e120bedfe97ccc05353afb78489da9de14b8814c/packages/types-dev/objects.d.ts#L553)

Hyperlink, where information about the license can be found. For non-free licenses, the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
This is required if the license type is different from 'free'. For 'free' licenses, an optional link to the license file can be placed here.

***

### type

> **type**: `"free"`

Defined in: [types-dev/objects.d.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/e120bedfe97ccc05353afb78489da9de14b8814c/packages/types-dev/objects.d.ts#L548)

Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.
