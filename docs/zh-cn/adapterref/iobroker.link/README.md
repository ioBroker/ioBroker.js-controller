---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.link/README.md
title: ioBroker.link
hash: 3SVNU91/5JWyIAkycj0waKAt6eWMFrap0jxcmoNb0ok=
---
![商标](../../../en/adapterref/iobroker.link/admin/link.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.link.svg)
![下载](https://img.shields.io/npm/dm/iobroker.link.svg)
![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)

#ioBroker.link
此适配器允许通过[ioBroker.link](https://iobroker.link/)云进行安全连接。

＃＃ 常问问题
###使用此适配器可以做什么？
此适配器允许在DSL调制解调器/路由器/防火墙后面安全地连接本地ioBroker安装和本地网络中的其他服务器/设备。通过公开的ioBroker.link云（链接云）建立连接。甚至可以通过链接云设置和访问多个本地ioBroker安装。

###我可以在路由器上配置的端口转发有什么区别？
虽然您可以在路由器上配置端口转发，因此从任何位置访问本地ioBroker安装，链路云提供以下主要优势：

 - 您的路由器上没有必须打开到互联网的端口
 - 本地ioBroker安装不需要公共IP或（动态）DNS名称
 -  link-cloud负责身份验证和授权
 -  link-cloud使用SSL / TLS保护连接
 -  link-cloud提供审计日志
 - 可以通过链接云服务器的同一UI访问多个本地ioBroker安装
 -  ioBroker.link适配器充当反向代理，允许访问本地网络中支持HTTP / TCP / UDP协议的其他服务器/设备
- 您可以将当地ioBroker安装的临时或永久访问权限发送给<sup>第三方</sup> ，例如解决设备中断问题，而无需泄露密码或管理凭据

###如果没有公共IP且没有打开端口，如何建立与本地ioBroker安装的连接？
链接云永远不会连接到本地安装，它是ioBroker.link适配器，它在本地运行并在有连接请求的情况下启动与链路云的连接。

###什么是_connection request_？
连接请求旨在通过链路云建立与经过身份验证和授权的人员进行的本地ioBroker安装的连接。

### IoBroker.link适配器如何识别出存在连接请求？
ioBroker.link适配器通过轮询链路云定期检查挂起的连接请求。您可以在ioBroker.link适配器的设置中设置轮询间隔。

###如何确保ioBroker.link适配器与链接云建立连接而不是中间人？
ioBoker.link适配器只能连接到提供发布到iobroker.link的有效SSL证书的服务器。

###链接云如何识别和授权所有ioBroker.link适配器轮询挂起的连接请求或建立连接？
每个ioBroker.link适配器都会生成自己独特的2048位密钥对。在链路云注册后，适配器发送其公钥。在对链接云的每个后续请求中（检查挂起的连接请求，接受或拒绝挂起的连接，关闭打开的连接等），适配器通过提供使用适配器的私钥签名的JSON Web令牌（JWT）来授权自己。链接云使用存储的公钥验证JWT的签名并接受或拒绝连接。

###一个适配器可以使用另一个适配器JWT连接到链路云吗？
不可以。适配器使用自己独特的私钥来签署JWT，该私钥永远不会离开本地安装。链接云使用相应的公钥来验证签名。

###我可以通过旋转用于授权我的适配器的密钥来提高安全性吗？
是。密钥存储在适配器安装的/ keys文件夹中。删除此文件夹中的所有文件，然后重新启动适配器。适配器将在启动时创建新的密钥对，并通过发送新的公钥来刷新链路云上的注册。

###如何确保已建立的连接本身？
如果存在挂起的连接请求，则ioBroker.link适配器首先建立到链接云的SSH隧道并接受进入的连接。双方通过证书授权自己。设置SSH隧道后，通信本身就会开始。一旦连接被关闭，例如，由用户经由链路 - 云服务器UI关闭，SSH隧道就关闭并且不再可能进行通信。

###是否也可以通过链接云连接到我的本地设备？
是。如果您的设备支持HTTP协议，则可以通过链接云访问它们。您希望通过链接云连接的每台设备都必须在ioBroker.link适配器设置中明确配置。默认情况下，无法连接任何设备。甚至必须首先配置ioBroker.admin Web-UI才能连接。

###我需要安装什么才能通过链接云连接到我的本地设备？
通过您选择的浏览器建立与本地设备的连接，支持HTTP协议。无需其他软件。

###我的本地设备仅支持TCP / UDP协议。是否可以连接到TCP / UDP设备？
是。要连接到本地TCP / UDP设备，请使用ioBroker.link-box：https：//www.npmjs.com/package/iobroker.link-box

###如何访问本地ioBroker安装？
任何应该被嘲笑访问本地ioBroker安装的人都必须在ioBroker.link适配器设置中明确配置。默认情况下，没有人可以访问。这意味着您还必须自行配置才能连接到您自己的本地ioBroker安装。

###我如何以及在哪里创建我想要访问本地安装的用户？
首先，您必须在https://iobroker.pro上创建一个免费帐户。创建后，您可以在ioBroker.link适配器_Allowed users_设置中配置已注册的电子邮件。在适配器配置中不必提供密码。

###我已经在https://iobroker.pro上开了一个帐户。我可以将它用于链接云吗？
是。您可以使用现有的https://iobroker.pro帐户。

###是否可以同时使用https://iobroker.pro和链接云服务？
是。这两个服务之间没有依赖关系。您可以单独或并行使用它们。

###为什么链接云使用https://iobroker.pro帐户？
链接云不使用https://iobroker.pro帐户。没有与https://iobroker.pro帐户相关的信息传输/可用于链接云。链接云只是将身份验证联合到https://iobroker.pro。反过来，授权完全由链接云处理。

###如何取消对本地安装的访问？
您可以通过从ioBroker.link适配器的_Allowed user_设置中删除其电子邮件来撤消与个人相关的访问权限。或者，您可以通过将_Allowed users_设置为空来完全阻止对本地安装的访问。同时停止或删除ioBroker.link适配器将阻止通过链接云进行任何访问。

###使用链接云时是否收取任何费用？
目前没有收费，链接云完全免费使用。无论您使用免费或付费的https://iobroker.pro帐户，它都是独立的。请注意，将来可能会更改。

###为什么你打算为这项简单的服务收费？
即使这种简单的服务也需要全天候运行的infrustructure并产生成本。确保此服务的高可用性，对故障进行故障排除以及改进或添加新功能会占用大量时间。为了进一步发展，我们需要芯片。这样我们的妻子就可以去购物，给我们更多的时间来关注这个项目。

###链接云有哪些限制？
目前，只能为本地ioBroker安装打开一个连接。这意味着如果多个用户对本地安装进行了访问权限，则一次只能有一个用户连接到该用户。此外，每个用户唯一的连接是允许的。这意味着同一个用户，多个本地安装的访问权限，一次只能访问一个安装。

###如何跟踪访问本地安装的人员和时间？
所有请求的连接的元数据都是持久的，可以在https://iobroker.link下查看。

##适配器配置::主要设置
＃＃＃ 客户名称
这是您本地ioBroker安装的名称。你可以自由选择。它可以帮助您在通过链接云发出连接请求时区分不同的ioBroker安装。

###服务器URI
这是链接云的域名。此设置已预先配置为https://iobroker.link，应进行更改。

###代理URI
如果您的ioBroker安装位于代理后面，则可以在此处配置代理服务器。代理可以在这里定义为：* http：// proxy：8080 *或通过** HTTPS_PROXY **环境变量。

###民意调查间隔（秒）
定义适配器轮询链接云以查找挂起的连接请求的频率。
推荐设置：10

###允许用户
定义现有的https://iobroker.pro帐户，这些帐户必须是对本地ioBroker安装的访问权限。

如果您想要访问自己和您的妻子，并假设您在创建https://iobroker.pro帐户时提供了me@gmail.com和darling@gmail.com，_Allowed users_设置将包含这两个e-邮件地址。

##适配器配置::设备
在这里，您可以定义可通过链接云访问的设备列表。

###已启用
定义配置的设备是否应该可访问。

＃＃＃ 名称
自由选择的设备名称。通过链路云连接时，它有助于区分不同的设备。

### IP
要在本地网络中连接的设备的IP地址。您可以提供主机名，例如_localhost_，而不是IP地址，但请注意，此名称必须在运行ioBroker-link适配器的计算机上可解析，并且该主机名不能用于UDP设备。

＃＃＃ 港口
设备正在侦听连接的端口号。

###类型
 -  TCP  - 用于支持TCP和/或HTTP协议的设备
 -  UDP  - 用于支持UDP协议的设备

## Adapter configuration :: Device Configuration Example
要使您的ioBroker.admin Web-UI可通过链接云访问，您可以在_Adapter configuration :: Devices_下配置它，如下所示：

 - 已启用：已选中
 - 名称：ioBrokerAdminWebUI（或您喜欢的任何名称）
 -  IP：localhost（或127.0.0.1）
 - 端口：8081（如果你没有更改ioBroker.admin的默认端口）
 - 类型：TCP

要访问路由器的Web-UI，您可能具有以下配置：

 - 已启用：已选中
 - 名称：路由器
 -  IP：192.168.0.1（或路由器的本地网络IP）
 - 端口：80（如果您没有更改路由器的Web UI默认端口）
 - 类型：TCP

## Changelog
### 0.4.4 (2019-07-16)
* (gh-got) closing tunnels in case server considers an agent as offline
* (gh-got) fixed timeout to query active connection status

### 0.4.2 (2019-03-28)
* (gh-got) agents will report own version by registration

### 0.4.0 (2019-03-10)
* (bluefox) Made this adapter to be compatible with the new server

### 0.3.7 (2018-09-23)
* (bluefox) Do not connect to the cloud if no configuration defined

### 0.3.6 (2018-06-26)
* (bluefox) The download of SSF from github depending on platform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).