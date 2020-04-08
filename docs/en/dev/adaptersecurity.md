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

__Currently used encryption algorithm__: `default`

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
