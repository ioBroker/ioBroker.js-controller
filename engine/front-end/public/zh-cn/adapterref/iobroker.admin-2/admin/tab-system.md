---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.admin/edit/master//admin/tab-system.md
title: Admin
hash: Dn5CtO5okGfvvxL112X2km8W/OB3HqarZ13QntOJiLU=
adapter: true
license: MIT
authors: bluefox <bluefox@ccu.io>, hobbyquaker <hq@ccu.io>
description: 配置ioBroker的Web界面
keywords: setup, config, update, upgrade, system, konfiguration, administration, einrichtung, wartung
readme: https://github.com/ioBroker/ioBroker.admin/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-04-12T17:51:06.332Z
version: 2.0.10
---
＃系统设置
这为ioBroker设置了基本参数。

![管理员系统设置](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-system_Systemeinstellungen.jpg)

##主要设置
###系统语言
所以你可以选择系统语言：德语，英语，俄语

###单位温度
某些适配器使用此值。可能是°C或°F。

###货币
目前，这不使用适配器

###日期格式
选择如何在admin和vis中显示日期。

###分隔符
浮点值的逗号或点

###默认历史记录实例
默认情况下，此SQL / History / InfluxDB适配器实例用于flot和rickshaw（图表）。

##存储库或存储库
![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-system_Verwahrungsorte2.jpg)

ioBroker可以从不同的来源获取适配器列表。安装期间列出了以下来源：

* **默认**  -  http://download.iobroker.net/sources-dist.json  - 每天01:00在服务器上生成。

访问速度非常快，但版本信息最长可达24小时。

* **在线**  -  https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json  - 存储库

由在线资源生成。访问可能需要很长时间，这是最新的来源

* **sources - conf / sources-dist.json** - 也是自动生成的，需要很长时间，但链接可能已过期（某些适配器可能丢失）

##证书
![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-system_2017-01-19-09_33_54-ioBroker.jpg)

以下是用于SSL / HTTPS通信的证书的中心位置。证书由admin，web，simple-api，socketio使用。默认情况下，安装标准证书。你不能用它验证任何东西。它们仅用于SSL通信。由于证书是开放的，您应该使用自己的（自签名）证书，购买正确的证书或切换到Let's Encrypt。与默认证书的通信不安全，如果有人有目标读取流量，可以这样做。一定要安装自己的证书。例如根据[Linux的](http://guides.intertech.de/ssl_certificate_self.html)。

##让我们加密
![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-system_2017-01-19-09_40_07-ioBroker.jpg)

Let's Encrypt是独立互联网安全研究组（ISRG）的免费，自动和开源_certificate权限。

有关Let的加密的更多信息，请参阅[这里](https://letsencrypt.org/)。

某些安装使用动态DNS或类似方法。通过从那里分配的地址到达您自己的域名。 IoBroker支持Let's Encrypt Organization自动请求和续订证书。

几乎所有可以启动Web服务器并支持HTTPS的适配器都存在使用Let's Encrypt免费配额的选项。

如果启用选项以使用证书，而不是自动更新，则相应的实例将尝试使用存储的证书。

启用自动更新后，实例将尝试从Let's Encrypt请求证书并自动更新它们。

第一次调用相应的地址时会请求证书。那如果你是“sub.domain.com”配置为地址，然后第一次请求证书上的[https://sub.domain.com](https://sub.domain.com/)，这可能需要一段时间才能得到答案。

颁发证书是一个复杂的过程，但如果您遵循以下说明，则应该很容易获得免费证书。

**程序：**

1.必须创建包含输入的电子邮件地址的新帐户（系统设置中的设置）
2.生成随机密钥作为帐户的密码。
3.创建帐户后，系统会在端口80上打开一个小型网站以确认该地址。
4.让我们加密**总是**端口** 80 **来检查地址。
5.如果端口80已经被另一个服务使用，则第4点将会实现 - 所以将另一个端口分配给另一个服务！
6.启动小型Web服务器时，系统设置中指定地址的证书请求将发送到Let的加密服务器。
7. Let的加密服务器发回一个挑战短语以响应请求，并在一段时间后尝试在地址“http：// yourdomain：80 / .well-known / acme-challenge /”中读取该挑战短语。
8.当服务器从我们的站点返回此挑战短语时，Let的加密服务器将发送证书。它们存储在系统设置中输入的目录中。

这听起来很复杂，但您只需激活一些复选框，然后在系统设置中输入电子邮件地址和网址。

收到的证书有效期约为90天。在首次颁发这些证书后，将启动另一个任务，自动扩展有效性。

这个主题非常复杂，成千上万的事情可能会出错。如果这不起作用，建议使用云适配器在路上访问。

**让我们的加密仅适用于node.js版本> = 4.5 **

##统计
![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-system_2017-01-19-09_48_46-ioBroker.jpg)

ioBroker管理员将以下信息发送到download.iobroker.net：

<pre> {“uuid”：“56cf0d20-XXXX-YYYY-BBBB-66eec47ZZZZZ”，“language”：“de”，“hosts”：[{“version”：“0.15.1”，“platform”：“Javascript / Node。 js“，”type“：”win32“}]，”adapters“：{”admin“：{”version“：”1.0.2“，”platform“：”Javascript / Node.js“}，”hm-rpc “：{”version“：”1.1.2“，”platform“：”Javascript / Node.js“}}} </pre>

可以通过将统计信息设置为“** nothing **”来禁用此功能。

但是，开发人员要求提供以下信息：

<pre>我们努力让这个项目继续进行。
作为回报，我们会要求您向我们发送使用情况统计信息。
不会向ioBroker.org发送任何私人信息。
每次更新适配器列表时，也会发送匿名统计信息。
谢谢！ </pre>