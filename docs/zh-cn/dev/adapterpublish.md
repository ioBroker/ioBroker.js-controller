---
title: 开发 - 发布适配器
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterpublish.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: dwTMQkRGPU/TgOfkndd1Y2lo5lmjAaxCsDaLBue6p3k=
---
＃发布适配器
在考虑发布适配器之前，应该在[论坛测试线程](https://forum.iobroker.net/viewforum.php?f=36)中进行测试。如果测试成功且适配器稳定，则应首先将其包含在最新存储库中。 <br/><br/>如果适配器在某个版本号上稳定运行，它可能会被转移到稳定的存储库。为此，需要开发人员自己与用户反馈交互的估计。

##最新存储库的要求
1.适配器的github存储库在ioBroker中应该有一个大的B，而在package.json中它很小。

必须写，因为``npm``不允许使用大写字母。

2. io-package.json中的标题不应包含“`ioBroker`` und nicht das Wort ``Adapter`”。

3.`title`` Attribut in der io-package.json (common) ist der Kurzname des Adapters auf Englisch. Während ``titleLang`

包含``title``属性的翻译。 （扩展郎代表语言）

4.适配器应包含README.md文件形式的指令。这至少应该是英语

可用。此外，欢迎使用其他语言。本段§§LLLL_0§§可作为建议。

5.适配器需要许可证。两者都在io-package.json中以及单独的一个

Github存储库中的[文件](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE)。

   io-package.json的示例：

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6.不使用时，应删除“`www`` Verzeichnis sowie das ``widget`”目录。

7.在io-package.json中，应该在common下创建``type``属性。为此目的应该由此而来

§§LLLL_0§§指定了最合适的类别。

8.适配器创建的状态应该对其有效

[卷](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles)``role``有共同之处。
应避免使用角色`state`。

9.适配器应使用模板中指定的测试。这可以使用Appveyor的Github帐户完成

（Windows测试）和Travis CI（Linux和Mac OS测试）链接，并记录相应的测试存储库。这两个连续集成工具已经证明适用于ioBroker项目，并且对于公共Github存储库是免费的。 <br/><br/>测试范围可以由开发人员扩展。

10.在io-package.json中，至少必须为属性`authors`制定一个规范。还

必须在package.json中填写属性`author`。 （可选）通过使用package.json中的属性`contributors`，可以为npm存储多个作者。

11.适配器必须以npm包的形式提供。更多信息可以

找到§§LLLL_0§§。

12.需要将ioBroker组织添加到npm。这对于允许包装的长期维护是必要的

即使开发人员因时间或其他原因无法等待包裹。可以找到更多信息[这里](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet)。

##稳定存储库的要求
1.适配器已成功添加到Latest Repository中
2.适配器有一个[论坛测试线程](https://forum.iobroker.net/viewforum.php?f=36)，其中已经有

提供了用户反馈。

3.应实施发现功能。这是一个功能

[发现适配器](https://github.com/ioBroker/ioBroker.discovery)自动检测用户是否可以使用适配器的实例。为此，必须在[发现适配器](https://github.com/ioBroker/ioBroker.discovery)的存储库上放置一个pull请求。

##将适配器添加到官方存储库
1.应访问§§LLLL_0§§

以及具有以下内容的pull请求，具体取决于存储库。

2.请在现有适配器之间按字母顺序排列适配器。

3.包含在稳定存储库中后，必须声明版本号。这正在开发中

适配器。

4.适配器应在io-package.json中设置列表属性`docs`，其中指南

可以在相应的语言中找到。关键是语言和值作为降价文件的路径。
需要英文说明（在紧急情况下，可以参考标准README）。同样，德语手册是可取的，因为大多数用户会讲德语，但这是可选的。
一个详细的指南，开发人员可以在论坛中节省大量时间。可以找到一个例子[这里](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md)。

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

`published`日期代表第一次发布的日期，不应更改。

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

`published`日期代表第一次发布的日期，不应更改。

##管理适配器版本
适配器的当前版本号在io-package.json和package.json中指定。这两个细节必须匹配。版本号由两个点分成三个部分。

```json
"version": "1.7.6"
```

第一部分（从左到右）代表`Major Part`，第二部分代表`minor`部分，最后一部分代表`micro`部分。版本号应根据以下列表增加：

 - **micro** 只修复了错误
 - **minor** 已添加功能，但该版本与以前的版本兼容
 - **major** 大的变化，通过它，不再给出对旧版本的向后兼容性

还应在io-package.json中维护`news`属性。这允许用户通过管理界面安装任何列出的版本（假设它已在npm上发布）。
这里应该存放版本号以及更改。可以记录任何支持语言的更改，至少用英语。

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
 -  **警报**  - 安全系统
 -  **气候控制**  - 空调，空气过滤器，加热器等
 -  **通信**  - 其他适配器的数据提供，例如。 B.通过REST
 -  **日期和时间**  -  z。例如日历
 -  **能量**  - 电流监测，太阳能系统，逆变器等等。
 -  **计量**  - 附加测量系统（例如水，气，油）
 -  **花园**  -  z。作为割草机，喷水灭火系统
 - **general** - 通用适配器，如Admin，Web，Discovery
 -  **地理位置**  - 物体或人员的地理位置
 -  **硬件**  -  Arduino，ESP，蓝牙等不同的多功能硬件......
 -  **家用**  - 厨房用具，吸尘器等
 -  **基础设施**  - 网络，NAS，打印机，电话
 - **iot-systems** - 其他智能家居系统（硬件和软件）
 -  **照明**  - 照明
 -  **逻辑**  - 规则，脚本，解析器等
 - **messaging** - 用于发送和接收消息的适配器，例如。例如通过电子邮件，电报，......
 - **misc-data** - 数据的输出和输入，货币转换器等。
 -  **多媒体**  - 电视，AVR，扬声器，语音助理等
 -  **网络**  -  Ping，网络发现，UPnP，......
 -  **协议**  - 通信协议，例如。 B. MQTT
 -  **存储**  - 日志记录，数据存储z。例如关系数据库，......
 -  **实用程序**  - 支持适配器等。例如备份
 -  **可视化**  - 可视化适配器，如vis等。
 - **visualization-icons** - 可视化图标
 - **visualization-widgets** - iobroker.vis小部件
 -  **天气**  - 天气信息，空气质量，环境信息

？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。