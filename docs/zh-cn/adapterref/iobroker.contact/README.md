---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.contact/README.md
title: ioBroker.contact
hash: l0fM56buVj7TYn/lsPSdNY8WP6oW0ioT1XvE9pTydQ4=
---
![商标](../../../en/adapterref/iobroker.contact/admin/contact.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.contact.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.contact.svg)
![安装数量（最新）](http://iobroker.live/badges/contact-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/contact-stable.svg)
![依赖状态](https://img.shields.io/david/WLAN-Kabel/ioBroker.contact.svg)
![已知漏洞](https://snyk.io/test/github/WLAN-Kabel/ioBroker.contact/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contact.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/WLAN-Kabel/ioBroker.contact/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/WLAN-Kabel/ioBroker.contact?branch=master&svg=true)

＃ioBroker.contact
## IoBroker的接触适配器
阅读您的Google和nextcloud联系人。

＃＃ 去做
*

## Google身份验证（仅适用于Google帐户，不适用于nextcloud帐户）
仅当ioBroker安装在另一台计算机/服务器上并且您无法通过本地主机访问Web界面时，才需要执行以下步骤。

### Windows：
使用管理员权限运行```nodepad.exe```，然后打开```C:\Windows\System32\drivers\etc\hosts```文件。
添加诸如```192.168.0.10    example.com //<IP-Adress ioBroker>     <FQDN>```之类的条目。保存文件并通过您在hosts文件中编写的<FQDN>打开Web界面。范例：http：//example.com：8081

### Linux：
    即将推出...

＃＃＃ 苹果电脑
    即将推出...

### Google API密钥
#### !!!注意：如果您已经安装并设置了iobroker.contact适配器，则只需将API添加到您的项目中（3.）。
1.您需要一个api密钥。访问https://console.cloud.google.com/apis/dashboard并使用您的Google帐户登录。

2.打开标题中的列表并创建一个新项目。输入项目名称，例如“ ioBroker”，然后单击创建。

3.确保从列表中选择了正确的项目。打开库选项卡。搜索“联系人”，然后单击“ Google People API”。

4.单击“激活”，然后单击“ API和服务”。打开标签“ OAuth同意屏幕”，然后键入一个应用程序名称，例如“ ioBroker”。您也可以上传徽标，但这不是必需的。

5.打开“凭据”选项卡，单击“创建凭据”下拉列表，然后选择“ OAuth客户端ID”。在下一步中选择“ Web应用程序”。输入类似“ ioBroker”或“ Webclient”的名称。将```http：// <FQDN>：<来自适配器配置的端口>``添加到授权的JavaScript来源。将```http：// <FQDN>：<适配器配置的端口> / google```和`http：// <FQDN>：<适配器配置的端口> / google /`添加到授权重定向URI。

6.创建客户端ID，然后复制显示的客户端ID和客户端密码。

转到适配器配置，然后添加客户端ID和客户端密钥。

### Contact.0
|州名|意思|
| - | - |
|查询|查询联系人的电话号码|
| familyName |请求联系人的姓氏|
|给定名称|给定联系人的姓名|
| fullName |请求联系人的全名|
|照片|请求的联系人的照片|
| id |所请求联系人的ID |

### Contact.0。*。
|州名|意思|
| - | - |
| familyName |联系人的姓氏|
|给定名称|给定联系人姓名|
| fullName |联系人全名|
|照片|联系人照片|
|地址。* |联系地址|
| emailAddresses。* |联系人的电子邮件地址|
|电话号码。* |联系人的电话号码|

## Javascript
可以通过§§JJJJJ_0_0§§将请求发送到适配器，查询数据点也是如此，但是您获得了可以在脚本中处理的JSON对象（已使用：https://forum.iobroker.net / topic / 28294 / asynchron-callback-promise-await-hilfe。

```js
sendTo('contact.0', 'query', {phonenumberr: '+49 1234 567890'}, (obj) => {

    if(obj.error) {

        log(obj.error);

    } else {

        log(JSON.stringify(obj.contact));

    }

});
```

## Changelog

### 1.1.3 (2020-01-23)
* (WLAN-Kabel) The roles have been changed to official once
* (WLAN-Kabel) Fixed deprecation of Buffer
* (WLAN-Kabel) Added error handler for http server

### 1.1.2 (2020-01-07)
* (WLAN-Kabel) Server will stopped on unload
* (WLAN-Kabel) Removed adapter from state settings

### 1.1.1 (2020-01-06)
* (WLAN-Kabel) Cron job will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages

### 1.1.0 (2020-01-05)
* (WLAN-Kabel) sendTo() is now supported
* (WLAN-Kabel) Fixed issue where roads are being written into the roll
* (WLAN-Kabel) Fixed issue where contacts are deleted when refreshed

### 1.0.1 (2019-12-29)
* (WLAN-Kabel) Fixed problem with companies in google contacts
* (WLAN-Kabel) Removed 'undefined' from fullName if one name is missing
* (WLAN-Kabel) Adapter no longer hangs on the schedule
* (WLAN-Kabel) Nextcloud default password changed because the old password caused messages

### 1.0.0 (2019-12-23)
* (WLAN-Kabel) Added Nextcloud contacts
* (WLAN-Kabel) Added state fullName to query and each contact
* (WLAN-Kabel) FQDN and interval moved to main tab
* (WLAN-Kabel) Changed channel name for addresses, emailAddresses and phoneNumbers
* (WLAN-Kabel) Added type state for emailAddresses and phoneNumbers

### 0.0.3 (2019-12-21)
* (WLAN-Kabel) Standard country code can now be selected yourself

### 0.0.2 (2019-12-21)
* (WLAN-Kabel) Fixed an issue that restricted the search
* (WLAN-Kabel) Limit of 100 contacts has been removed

### 0.0.1 (2019-12-17)
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.