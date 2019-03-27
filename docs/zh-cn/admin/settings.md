---
title: 系统设置
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/settings.md
hash: HYarezHAWRhXZbF1hN5OhZczzLtpbYD7YG/A8Z6cEF4=
---
＃系统设置
可以通过屏幕标题栏中的扳手图标从管理员的任何菜单项访问系统设置。

![系统设置](../../de/admin/media/ADMIN_Settings_main.png)

系统设置分布在多个子页面上：

##主要设置
主要设置为ioBroker设置基本参数，ioBroker中的适配器也使用这些参数。

某些参数已从主机的设置中获取。

**系统语言

这允许您在不同的系统语言之间进行选择。可能并非所有语言都得到完全支持。

**温度单位**

某些适配器使用此值。可能是°C或°F。

** **货币

目前，这不使用适配器

**日期格式**

选择如何在admin和vis中显示日期。

** **小数

浮点值的逗号或点

**标准历史实例**

默认情况下，数据会记录到此实例中，并在flot和rickshaw的图表中使用。

如果只安装了一个历史适配器（SQL / History / InfluxDB），它将被使用。如果有几个，你可以选择一个。

**活动存储库**

这里从下拉菜单中选择所需的存储库，从该菜单中安装适配器的版本。下拉菜单提供“存储库”子页面上列出的存储库

##存储库
![存储库](../../de/admin/media/ADMIN_Settings_repos.png)

ioBroker可以从不同的来源获取适配器列表。安装期间列出了以下来源：

* default（= stable）：http：//download.iobroker.net/sources-dist.json
*最新（最新版本）：http：//download.iobroker.net/sources-dist-latest.json

如果从旧安装中输入其他存储库，则应删除它们，因为它们不再维护。

##证书
![证书](../../de/admin/media/ADMIN_Settings_certificates.png)

以下是用于SSL / HTTPS通信的证书的中心位置。证书由admin，web，simple-api，socketio使用。默认情况下，安装标准证书。你不能用它验证任何东西。它们仅用于SSL通信。由于证书是开放的，您应该使用自己的（自签名）证书，购买正确的证书或切换到Let's Encrypt。与默认证书的通信不安全，如果有人有目标读取流量，可以这样做。一定要安装自己的证书。
例如在linux下。

证书可以指定为路径，也可以通过拖放完全上传

##让我们加密
![我们加密吧](../../de/admin/media/ADMIN_Settings_letsencrypt.png)

Let's Encrypt是独立的互联网安全研究组（ISRG）的免费，自动化和开源证书颁发机构。

有关Let的加密的更多信息，请参阅[这里](https://letsencrypt.org/)。

某些安装使用动态DNS或类似方法。通过从那里分配的地址到达您自己的域名。 IoBroker支持Let's Encrypt Organization自动请求和续订证书。

几乎所有可以启动Web服务器并支持HTTPS的适配器都存在使用Let's Encrypt免费配额的选项。

如果启用选项以使用证书，而不是自动更新，则相应的实例将尝试使用存储的证书。

启用自动更新后，实例将尝试从Let's Encrypt请求证书并自动更新它们。

第一次调用相应的地址时会请求证书。那如果你是将“sub.domain.com”配置为地址然后调用https://sub.domain.com将首次请求证书，这可能需要一段时间才能响应。

颁发证书是一个复杂的过程，但如果你按照下面的解释，应该很容易获得免费证书。

**程序：**

必须创建包含输入的电子邮件地址的新帐户（系统设置中的设置）

生成随机密钥作为帐户的密码。

创建帐户后，系统会在端口80上打开一个小型网站以确认该地址。

让加密始终使用端口80来检查地址。

如果端口80已被其他服务使用，则第4点将成为现实 - 因此将另一个端口分配给其他服务！

启动小型Web服务器时，系统设置中指定地址的证书请求将发送到Let的加密服务器。

Let's Encrypt服务器发回一个挑战短语以响应请求，并在一段时间后尝试在http：// yourdomain：80 / .well-known / acme-challenge /中读取挑战短语。

当服务器从我们的站点返回此挑战短语时，Let的加密服务器将发送证书。它们存储在系统设置中输入的目录中。

这听起来很复杂，但您只需激活一些复选框，然后在系统设置中输入电子邮件地址和网址。

收到的证书有效期约为90天。在首次颁发这些证书后，将启动另一个任务，自动扩展有效性。

这个主题非常复杂，成千上万的事情可能会出错。如果这不起作用，建议使用IoT适配器进行移动访问。

我们的加密仅适用于node.js版本> = 4.5

##访问权限
![访问权限](../../de/admin/media/ADMIN_Settings_zugriffsrechte.png)

在该子页面中，可以为所有用户/组定义不同区域的访问权限

##统计
![统计](../../de/admin/media/ADMIN_Settings_statistics.png)

因此，我们对安装（使用的适配器）和地理分布有一点概述，如果我们得到这些信息，我们将非常高兴。

您可以发送不同类型的信息。可以在左侧选择此范围。

将显示右侧，将以何种形式发送这些数据。
这些数据绝对是匿名评估的。