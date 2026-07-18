[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LicenseInformationFree

# Interface: LicenseInformationFree

Defined in: [types-dev/objects.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L573)

## Properties

### license?

> `optional` **license?**: `string`

Defined in: [types-dev/objects.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L575)

License of the software

***

### link?

> `optional` **link?**: `string`

Defined in: [types-dev/objects.d.ts:582](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L582)

Hyperlink, where information about the license can be found. For non-free licenses, the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
This is required if the license type is different from 'free'. For 'free' licenses, an optional link to the license file can be placed here.

***

### type

> **type**: `"free"`

Defined in: [types-dev/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L577)

Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.
