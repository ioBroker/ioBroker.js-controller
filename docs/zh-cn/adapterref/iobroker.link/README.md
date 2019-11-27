---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.link/README.md
title: ioBroker.link
hash: 9ros7x9xULUX5EdRrAUPqZSbv5lizmiKP7T4wtj6fOM=
---
![商标](../../../en/adapterref/iobroker.link/admin/link.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.link.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.link.svg)
![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)

＃ioBroker.link
此适配器允许通过[ioBroker.link](https://iobroker.link/)云进行安全连接。

＃＃ 常问问题
###如何使用此适配器？
该适配器允许在DSL调制解调器/路由器/防火墙之后安全地连接到本地ioBroker安装和本地网络中的其他服务器/设备。通过公共可用的ioBroker.link云（link-cloud）建立连接。甚至可以通过链接云设置和访问多个本地ioBroker安装。

###我可以在路由器上配置的端口转发有什么区别？
虽然您可以在路由器上配置用于漫游的端口，以便从任何地方访问本地ioBroker安装，但是链接云具有以下主要优点：

-无需在路由器上打开任何端口即可上网
-您的本地ioBroker安装不需要公共IP或（动态）DNS名称
-link-cloud负责身份验证和授权
-链接云使用SSL / TLS保护连接
-链接云提供审核日志
-可以通过链接云服务器的同一UI访问多个本地ioBroker安装
-ioBroker.link适配器充当反向代理，并允许访问支持HTTP / TCP / UDP协议的本地网络中的其他服务器/设备
-您可以授予<sup>第三</sup>人临时或永久访问本地ioBroker安装的权限，例如，解决设备故障的问题，而无需透露密码或管理凭据

###如果没有公共IP并且没有打开端口，如何建立与本地ioBroker安装的连接？
链接云永远不会连接到本地安装，它是ioBroker.link适配器，它在本地运行，并在有连接请求的情况下启动与链接云的连接。

###什么是_connection request_？
连接请求是为了建立与本地ioBroker安装的连接，该安装由经过身份验证和授权的人员通过链接云进行。

### IoBroker.link适配器如何识别存在连接请求？
ioBroker.link适配器通过轮询链接云定期检查未决的连接请求。您可以在ioBroker.link适配器的设置中设置轮询间隔。

###如何确保ioBroker.link适配器建立到链接云而不是中间人的连接？
ioBoker.link适配器只能连接到提供颁发给iobroker.link的有效SSL证书的服务器。

###链接云如何识别并授权所有ioBroker.link适配器轮询未决的连接请求或建立连接？
每个ioBroker.link适配器都会生成自己的唯一2048位密钥对。在链接云上注册后，适配器将传输其公钥。在对链接云的每个后续请求（检查挂起的连接请求，接受或拒绝挂起的连接，关闭打开的连接等）时，适配器通过提供使用适配器的私钥签名的JSON Web令牌（JWT）来授权自己。链接云使用存储的公钥验证JWT的签名，并接受或拒绝连接。

###一个适配器可以使用另一个适配器的JWT连接到链接云吗？
否。适配器使用其自己的唯一私钥对JWT进行签名，该私钥永远不会离开本地安装。链接云使用相应的公钥来验证签名。

###我可以通过旋转用于授权适配器的密钥来提高安全性吗？
是。密钥存储在适配器安装的/ keys文件夹中。删除此文件夹中的所有文件，然后重新启动适配器。适配器将在启动时创建一个新的密钥对，并通过发送新的公共密钥在链接云中刷新注册。

###已建立的连接本身如何得到保护？
如果有未决的连接请求，则ioBroker.link适配器首先建立到链接云的SSH隧道，并接受传入的连接。双方均通过证书进行授权。一旦建立了SSH隧道，通信本身便开始。一旦关闭连接（例如由用户通过链接云服务器UI），SSH隧道就会关闭，并且不再可能进行通信。

###是否也可以通过链接云连接到我的本地设备？
是。如果您的设备支持HTTP协议，则可以通过链接云访问它们。您要通过链接云连接的每个设备都必须在ioBroker.link适配器设置中进行显式配置。默认情况下，无法连接任何设备。甚至必须先配置ioBroker.admin Web-UI才能连接。

###我需要安装什么才能通过链接云连接到本地设备？
通过您选择的浏览器与支持HTTP协议的本地设备建立连接。不需要其他软件。

###我的本地设备仅支持TCP / UDP协议。是否可以连接到TCP / UDP设备？
是。为了连接到本地TCP / UDP设备，请使用ioBroker.link-box：https://www.npmjs.com/package/iobroker.link-box

###如何授予对本地ioBroker安装的访问权限？
必须在ioBroker.link适配器设置中显式配置应被授予对本地ioBroker安装的访问权限的任何人。默认情况下，没有人可以访问。这意味着您还必须配置自己才能连接到自己的本地ioBroker安装。

###如何以及在哪里创建要授予对本地安装访问权限的用户？
首先，您必须在https://iobroker.pro创建一个免费帐户。创建完成后，您可以在ioBroker.link适配器“允许的用户”设置中配置注册的电子邮件。适配器cconfiguration中无需提供密码。

###我已经在https://iobroker.pro上拥有一个帐户。我可以将其用于链接云吗？
是。您可以使用已经存在的https://iobroker.pro帐户。

###是否可以同时使用https://iobroker.pro和link-cloud服务？
是。这两个服务之间没有依赖关系。您可以单独或并行使用它们。

###为什么链接云使用https://iobroker.pro帐户？
链接云不使用https://iobroker.pro帐户。与https://iobroker.pro帐户关联的任何信息都不会传输/可用于链接云。链接云只是将身份验证联合到https://iobroker.pro。反过来，授权完全由链接云处理。

###如何撤消对本地安装的访问权限？
您可以通过从ioBroker.link适配器的_Allowed user_设置中删除个人的电子邮件来撤消授予他们的访问权限。另外，通过将_Allowed users_设置为空，可以完全阻止访问本地安装。同样，停止或卸下ioBroker.link适配器也将阻止通过链接云进行任何访问。

###使用链接云时我需要付费吗？
目前，不收取任何费用，链接云完全免费使用。是否使用免费或付费https://iobroker.pro帐户也无关紧要。请注意，将来可能会更改。

###您为什么打算为此简单服务收费？
即使是这种简单的服务，也需要全天候运行的基础设施并产生成本。确保此服务的高可用性，对故障进行故障排除以及改进或添加新功能会消耗大量时间。为了献身于进一步的发展，我们需要芯片。这将使我们的妻子能够购物，并给我们更多的时间来关注这个项目。

###链接云的局限性是什么？
目前，只能打开到本地ioBroker安装的单个连接。这意味着，如果授予多个用户对本地安装的访问权限，则一次只能连接一个用户。同样，每个用户唯一的连接是允许的。这意味着被授予对多个本地安装的访问权限的同一用户一次只能访问一个安装。

###如何跟踪谁和何时访问了本地安装？
所有请求的连接的元数据都将保留，并且可以在https://iobroker.link下查看。

##适配器配置::主要设置
＃＃＃ 客户名称
这是本地ioBroker安装的名称。您可以自由选择。通过链接云发出连接请求时，它可以帮助您区分不同的ioBroker安装。

###服务器URI
这是链接云的域名。此设置已通过https://iobroker.link进行了预配置，应进行更改。

###代理URI
如果您的ioBroker安装在代理之后，则可以在此处配置代理服务器。代理可以在此处定义为：* http：// proxy：8080 *或通过** HTTPS_PROXY **环境变量。

###轮询间隔（秒）
定义适配器多久轮询一次链接云以查看未决的连接请求。
推荐设置：10

###允许的用户
定义必须被授予对本地ioBroker安装的访问权限的现有https://iobroker.pro帐户。

如果您想授予自己和妻子访问权限，并假设您在创建https://iobroker.pro帐户时提供了me@gmail.com和darling@gmail.com，则_Allowed users_设置将同时包含这两个e-邮件地址。

##适配器配置::设备
在这里，您可以定义可通过链接云访问的设备列表。

###已启用
定义配置的设备是否应可访问。

＃＃＃ 名称
设备的自由选择名称。通过链接云进行连接时，它有助于区分不同的设备。

### IP
要在本地网络中连接的设备的IP地址。您可以提供一个主机名，例如_localhost_而不是IP地址，但是请注意，该名称必须在运行ioBroker-link适配器的计算机上可以解析，并且该主机名不能用于UDP设备。

＃＃＃ 港口
您的设备正在侦听传入连接的端口号。

###类型
-TCP-用于支持TCP和/或HTTP协议的设备
-UDP-用于支持UDP协议的设备

##适配器配置::设备配置示例
要使您的ioBroker.admin Web-UI通过链接云可访问，您可以在_Adapter configuration :: Devices_下对其进行配置，如下所示：

-启用：选中
-名称：ioBrokerAdminWebUI（或您喜欢的任何名称）
-IP：本地主机（或127.0.0.1）
-端口：8081（如果您未更改ioBroker.admin的默认端口）
-类型：TCP

要访问路由器的Web-UI，您可能需要进行以下配置：

-启用：选中
-名称：路由器
-IP：192.168.0.1（或路由器的本地IP是什么）
-端口：80（如果您未更改路由器的Web UI默认端口）
-类型：TCP

## Changelog
### 0.5.2 (2019-11-26)
* (bluefox) Added user enability

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