[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SuitableLicense

# Interface: SuitableLicense

Defined in: [adapter/src/lib/\_Types.ts:73](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L73)

A license that may be suitable for use by an adapter

## Properties

### datapoints?

> `optional` **datapoints?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:93](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L93)

License is only valid for X number of datapoints

***

### decoded

> **decoded**: `object`

Defined in: [adapter/src/lib/\_Types.ts:95](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L95)

Decoded property from JWT verifies on JSON content with cloud cert

#### address

> **address**: `object`

Address of a license owner

##### address.AddressLine1

> **AddressLine1**: `string`

First address line

##### address.AddressLine2

> **AddressLine2**: `string`

Second address line

##### address.City

> **City**: `string`

City of the license owner

##### address.Country

> **Country**: `string`

Country of the license owner

##### address.Name

> **Name**: `string`

Name of the license owner

##### address.ZIP

> **ZIP**: `string`

ZIP / postal code

#### comment

> **comment**: `string`

Free text comment

#### country

> **country**: `string`

Country code of the license owner

#### email

> **email**: `string`

E-Mail of a license owner

#### eu

> **eu**: `string`

Whether the license owner is within the EU

#### expires

> **expires**: `number`

Date when license expires

#### iat

> **iat**: `number`

Issued-at timestamp of the JWT

#### id

> **id**: `string`

Unique id of the license

#### invoice

> **invoice**: [`Invoice`](../type-aliases/Invoice.md)

If it is a free license or not

#### ltype

> **ltype**: `string`

License type identifier

#### name

> **name**: `string`

Adapter name

#### netto

> **netto**: `number`

Netto price information

#### type

> **type**: `string`

License type, e.g. private

#### uuid?

> `optional` **uuid?**: `string`

License is only valid for a given UUID

#### valid\_till

> **valid\_till**: `string`

How long a license is valid, always in the future if valid

#### vat

> **vat**: `number`

VAT price information

#### vatP

> **vatP**: `19`

VAT in percent

#### version

> **version**: `string` \| `number`

Version for which this license is valid

***

### email

> **email**: `string`

Defined in: [adapter/src/lib/\_Types.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L77)

E-Mail of a license owner

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L79)

Unique id of this license

***

### invoice

> **invoice**: [`Invoice`](../type-aliases/Invoice.md)

Defined in: [adapter/src/lib/\_Types.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L83)

If it is a free license or not

***

### json

> **json**: `string`

Defined in: [adapter/src/lib/\_Types.ts:81](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L81)

The actual license

***

### product

> **product**: `string`

Defined in: [adapter/src/lib/\_Types.ts:75](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L75)

Name of the license type, not necessarily matching adapter

***

### usedBy?

> `optional` **usedBy?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:85](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L85)

The adapter instance that uses this license

***

### uuid?

> `optional` **uuid?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:89](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L89)

License is only valid for a given UUID

***

### validTill

> **validTill**: `string`

Defined in: [adapter/src/lib/\_Types.ts:91](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L91)

License if valid until this date 0000-00-00 00:00:00 if unlimited

***

### version

> **version**: `string`

Defined in: [adapter/src/lib/\_Types.ts:87](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L87)

Version for which this license is valid
