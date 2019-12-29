---
title: 发布
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterpublish.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: 0VW1fW1Nr6cfDendblq7sk1iE3WH96N2hxQEfewx500=
---
＃发布一个适配器
在考虑发布适配器之前，应在[论坛测试线程](https://forum.iobroker.net/category/91/tester)中提供它以进行测试。如果测试成功并且适配器稳定，则最初应将其包含在最新的存储库中。 <br/><br/>体重如果适配器可以在特定版本号上稳定运行，则可以将其转移到稳定存储库中。这需要开发者自己的评估以及用户反馈。

***进一步的当前要求可以在这里找到：*** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

##最新存储库要求
0.使用[https://adapter-check.iobroker.in/[(https://adapter-check.iobroker.in/）测试适配器存储库。

1.适配器的github存储库在ioBroker中应该有一个大写字母B，而在package.json中应该很小。

必须写入，因为``npm``不允许使用大写字母。

2. io-package.json中的标题不应包含单词“ ioBroker”或单词“ adapter”。

3，io-package.json中的``title''属性（通用）是英文适配器的简称。在``titleLang''期间

包含“`title`”属性的翻译。 （扩展名Lang代表语言）

4.适配器应包含README.md文件形式的说明。至少应使用英语

可用。也欢迎其他语言。此[例子](https://github.com/foxriver76/ioBroker.denon)可以作为建议。

5.适配器需要许可证。既在io-package.json中又在单独的一个中

Github存储库中的[文件](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE)。

   io-package.json的示例：

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6，不使用时应删除``www''目录和``widget''目录

7，在io-package.json文件中，应该在common下创建一个``type''属性。为此

[名单](#Adapterkategorien)最合适的类别。

8.适配器创建的状态应为您提供有效的信息

[卷](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles)``role``。
应避免使用角色`state`。

9.适配器都应使用模板中指定的测试。为此，Github在Appveyor上的帐户

（Windows测试）和Travis CI（Linux和Mac OS测试）已链接，并注册了相应的存储库以进行测试。这两个连续集成工具已被证明适用于ioBroker项目，并且对于公共Github存储库是免费的。 <br/><br/>开发人员可以很高兴地扩展测试范围。

10.必须在io-package.json中为属性authors至少输入一个条目。还

必须在package.json中填写属性`author`。 （可选）也可以使用package.json中的`contributors`属性为npm保存多个作者。

11.适配器必须作为npm软件包提供。更多信息可以

可以找到[这里](https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm)。

12.必须在npm上添加ioBroker组织。这对于长期维护包装很有必要

即使开发人员由于时间或其他原因无法再等待软件包。可以在[这里](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet)中找到更多信息。

##稳定存储库的要求
1.适配器已成功添加到最新的存储库
2.适配器有一个[论坛测试线程]（https://forum.iobroker.net/viewforum.php?f=36），其中

给出了用户反馈。

3.应该实现发现功能。这是一个功能

[发现适配器](https://github.com/ioBroker/ioBroker.discovery)来自动识别用户是否可以使用适配器的实例。为此，必须在[发现适配器](https://github.com/ioBroker/ioBroker.discovery)的存储库中发出拉取请求。

##将适配器添加到官方存储库
1.应访问[官方Github存储库]（https://github.com/ioBroker/ioBroker.repositories）

以及具有以下内容的拉取请求，具体取决于存储库。

2.请在现有适配器之间按字母顺序正确排列适配器。

3.版本号在添加到稳定存储库时必须声明。这正在进一步发展中

更新适配器。

4.适配器应在io-package.json中设置一个列表属性“ docs”，并在其中指示位置

可以用相应的语言找到。语言指定为键，降价文件的路径指定为值。
需要英语说明（在紧急情况下，可以参考标准README）。还需要德语手册，因为大多数用户会说德语，但这是可选的。
详细的说明可以在论坛中为开发人员节省大量时间。可以在[这里](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md)中找到一个示例。

   例如：

```json
{
  "common": {
     "docs": {
         "de": "docs/de/README.md"
     }
  }
}
```

###最新
必须编辑文件`sources-dist.json`：

例如：

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

`published`日期代表首次发布的日期，不应更改。

###稳定
必须编辑文件`sources-dist-stable.json`：

例如：

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "version": "2.0.7",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

`published`日期代表首次发布的日期，不应更改。

##适配器版本管理
适配器的当前版本号同时在io-package.json和package.json中给出。这两个规格必须匹配。版本号由两个点分成三部分。

```json
"version": "1.7.6"
```

第一部分（从左到右）代表`Major Part`，第二部分代表`minor`部分，最后一部分代表`micro`部分，应根据以下列表增加版本号：

-**微型**：仅修复了错误
-**次要**：已添加功能，但该版本与以前的版本兼容
-**重大**：不再允许与旧版本向后兼容的重大更改

`news`属性也应在io-package.json中维护。这使用户可以通过管理界面安装列出的任何版本（前提是该版本已在npm上发布）。
版本号和更改应存储在此处。可以记录每种受支持语言的更改，至少以英语记录。

例如：

```json
"news": {
    "1.7.6": {
        "en": "Configuration dialog was corrected",
        "de": "Konfigurationsdialog wurde korrigiert",
        "ru": "Диалог конфигурации был исправлен",
        "pt": "A caixa de diálogo de configuração foi corrigida",
        "nl": "Configuratiedialoog is gecorrigeerd",
        "fr": "La boîte de dialogue de configuration a été corrigée",
        "it": "La finestra di configurazione è stata corretta",
        "es": "Se corrigió el diálogo de configuración",
        "pl": "Okno dialogowe konfiguracji zostało poprawione"
    },
    "1.7.5": {
        "en": "The roles were tuned",
        "de": "Die Rollen waren abgestimmt",
        "ru": "Роли были настроены",
        "pt": "Os papéis foram afinados",
        "nl": "De rollen zijn afgestemd",
        "fr": "Les rôles ont été réglés",
        "it": "I ruoli erano sintonizzati",
        "es": "Los roles fueron sintonizados",
        "pl": "Role zostały dostrojone"
    }
}
```

##适配器类别
-**警报**-安全系统
-**气候控制**-空调，空气过滤器，加热器等
-**通讯**-其他适配器的数据提供，例如B.通过REST
-**日期和时间**-例如B.日历
-**能源**-电力监控，太阳能系统，逆变器等等。
-**计量**-其他测量系统（例如水，气，油）
-**花园**-z B.割草机，洒水系统
-**通用**-通用适配器，例如Admin，Web，发现
-**地理**-物体或人的地理位置
-**硬件**-不同的多功能硬件，例如Arduino，ESP，蓝牙，...
-**健康**-血压，心跳，体重，...
-**家用**-厨房用具，吸尘器等
-**基础设施**-网络，NAS，打印机，电话
-**物联网系统**-其他智能家居系统（硬件和软件）
-**照明**-照明
-**逻辑**-规则，脚本，解析器等。
-**消息传递**-用于发送和接收消息的适配器，例如B.通过电子邮件，电报等...
-** misc-data **-数据的导出和导入，货币转换器等
-**多媒体**-电视，AVR，盒子，语音助手等
-**网络**-ping，网络检测，UPnP，...
-**协议**-通信协议，例如B.MQTT
-**存储**-日志记录，数据存储，例如B.关系数据库，...
-**实用程序**-支持的适配器，例如B.备份
-**可视化**-可视化适配器，例如vis等
-**可视化图标**-可视化图标
-**可视化组件**-iobroker.vis小部件
-**天气**-天气信息，空气质量，环境信息

？&gt; ***这是一个占位符***。 <br><br>帮助ioBroker并扩展本文。请注意[ioBroker样式指南](community/styleguidedoc)，以便更容易接受更改。