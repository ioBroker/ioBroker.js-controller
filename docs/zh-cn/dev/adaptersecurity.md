---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptersecurity.md
title: 适配器开发人员与安全相关的功能
hash: X2HcDsT5TE/W4x20hMFpAqHF23iMYbOPyEK6TXNkyG4=
---
＃适配器开发人员与安全相关的功能
##防止其他适配器访问敏感数据
如果您需要存储用户密码或令牌，以使用户能够访问您提供的服务，则可能对用户有利，外部适配器无法访问此信息。
为此，可以将`protectedNative`字段添加到`io-package.json`文件中。此字段必须包含所有属性的数组，这些属性存储在将受保护的适配器的`native`属性中。

请注意，管理员适配器将始终有权访问受保护的属性，从而使用户能够在适配器自己的配置页中读取属性，并手动编辑`system.adapter.<namepsace>.<instance>`中的受保护字段。

__例__：

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

##自动加密和解密敏感数据
如果您需要存储用户密码或令牌，以使用户能够访问您提供的服务，则此敏感信息不会以明文形式存储，这可能对用户有利。
为此，可以将`encryptedNative`字段添加到`io-package.json`文件中。该字段必须包含所有属性的数组，这些属性存储在适配器的`native`属性中，该属性将被加密存储并在适配器运行时自动解密。

每当当前使用的加密算法变得不安全时，它将在js-controller中进行更改。

__当前使用的加密算法__

-js-controller> = 3.0：`default'
-JS控制器> = 3.2：`aes-192-cbc`

请注意，此功能至少需要js-controller 3.0.0。

__例__：

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

##手动加密和解密敏感数据
我们还提供了适配器方法来在代码内部手动加密数据。
为此，可以使用`adapter.encrypt`和`adapter.decrypt`方法。用于加密和解密的密钥是用户安装在系统范围内的唯一秘密。如果要使用自己的密钥（192位十六进制）进行加密，可以通过将第二个参数传递给`encrypt`和`decrypt`方法来实现。

__例__：

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