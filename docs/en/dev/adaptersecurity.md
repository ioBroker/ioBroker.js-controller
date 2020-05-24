# Security related features for Adapter developers

## Prevent access from other adapters to sensitive data
If you need to store a user password or a token that gives users access to the service you provide, it may be in the user's interest, that foreign adapters cannot access this information.
To do so, you can add a field `protectedNative` to your `io-package.json` file. This field has to contain an array of all attributes which are stored in the `native` attribute of the adapter, 
which will be protected.

Note, that the Admin adapter will always have access to protected attributes, to give users the ability to read attribute in adapters own configuration page and edit protected fields in 
`system.adapter.<namepsace>.<instance>` manually.

__Example__:
```json
...
"protectedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Automatically encrypt and decrypt sensitive data
If you need to store a user password or a token that gives users access to the service you provide, it may be in the user's interest, that this sensitive information is not stored in cleartext.
To do so, you can add a field `encryptedNative` to your `io-package.json` file. This field has to contain an array of all attributes which are stored in the `native` attribute of the adapter, 
which will be stored encrypted and automatically be decrypted at adapter runtime.

Whenever the currently used encryption algorithm gets unsafe, it will be changed in the js-controller.

__Currently used encryption algorithm__
- js-controller >= 3.0: `default`
- js-controller >= 3.2: `aes-192-cbc`

Note, that this feature requires at least js-controller 3.0.0.

__Example__:
```json
...
"encryptedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Manually encrypt and decrypt sensitive data
We also provide adapter methods to encrypt data manually inside your code.
For this you can use the `adapter.encrypt` and `adapter.decrypt` methods. The key used for encryption and decryption is the 
systemwide unique secret of the users installation. If you want to use your own key (192 bit Hex) for encryption, you can do so, by passing a second argument to the `encrypt` and `decrypt` methods.

__Example__:
```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent); 
// decryptedContent === 'super secret message'

// Or use your own key (24 byte Hex) for encryption
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedContent = adapter.encrypt(key, 'super secret message');
const decryptedContent = adapter.decrypt(key, encryptedContent);
// decryptedContent === 'super secret message'
```
