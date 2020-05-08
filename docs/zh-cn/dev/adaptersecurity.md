---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptersecurity.md
title: 适配器开发人员与安全相关的功能
hash: iXhVBmKdkGTG6U453IC5CTNS5Wb5kjpTybMEUkvUEUs=
---
＃适配器开发人员与安全相关的功能
##防止其他适配器访问敏感数据
如果您需要存储用户密码或令牌，以使用户能够访问您提供的服务，则可能对用户有利，外部适配器无法访问此信息。
为此，可以将`protectedNative`字段添加到`io-package.json`文件中。该字段必须包含所有属性的数组，这些属性存储在将受保护的适配器的`native`属性中。

请注意，管理员适配器将始终可以访问受保护的属性，从而使用户能够在适配器自己的配置页中读取属性并手动编辑`system.adapter.<namepsace>.<instance>`中的受保护字段。

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

__当前使用的加密算法__：`default`

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