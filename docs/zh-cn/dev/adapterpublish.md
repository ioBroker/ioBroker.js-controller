---
title: 发布
lastChanged: 21.01.2020
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterpublish.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: I0FIhrW7GjK+oU9/a+Snt1/LZjxE7xtbGDLoF8Lr2VE=
---
＃发布适配器
在考虑发布适配器之前，应在[论坛测试线程](https://forum.iobroker.net/category/91/tester)中提供它以进行测试。
如果测试成功并且适配器稳定运行，则应首先将其包含在最新的存储库中。

如果适配器在某个版本号上稳定运行，则可以将其传输到稳定存储库。这需要开发者自己的评估以及用户反馈。

***进一步的当前要求可以在这里找到：*** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

##最新存储库要求
0.使用[https://adapter-check.iobroker.in/[(https://adapter-check.iobroker.in/））测试适配器存储库。

1.适配器的github存储库在ioBroker中应该使用大写字母B，而在package.json中必须使用小写字母，因为“ npm”不允许使用大写字母。

2. io-package.json中的标题不应包含单词“ ioBroker”或单词“ adapter”。

3. io-package.json中的``title''属性（常见）是英文适配器的简称。而``titleLang''包含``title''属性的翻译。 （扩展名Lang代表语言）

4.适配器应包含README.md文件形式的说明。至少应以英语提供。也欢迎其他语言。这个[示例]（https://github.com/foxriver76/ioBroker.denon）可以作为建议。

5.适配器需要许可证。两者都在io-package.json和Github存储库中单独的[file]（https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE）中。

   io-package.json的示例：

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6.不使用时，应删除www目录和widget目录。

7.在io-package.json中，应该在common下创建一个`type`属性。为此，应从此[列表]中指定最合适的类别（＃适配器类别）。

8.在io-package.json中，应该在common下创建connectionType和dataSource属性。为此，应从此[列表]（＃适配器连接类型）中指定最合适的连接类别。

9.适配器创建的状态应具有其[角色]的有效信息（https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles） ，

应避免使用角色`state`。

10.适配器都应使用模板中指定的测试。为此，可以将Github帐户链接到Appveyor（Windows测试）和Travis CI（Linux和Mac OS测试），并且可以注册相应的存储库以进行测试。

这两个连续集成工具已被证明适合ioBroker项目，并且对于公共Github存储库是免费的。

开发人员可以很高兴地扩展测试范围。

11.在io-package.json中，必须在属性authors的common下至少创建一个条目。

package.json中的`author`属性也必须填写。
（可选）也可以使用package.json中的`contributors`属性为npm保存多个作者。

12.适配器必须作为npm软件包提供。可以在[here]（https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm）中找到更多信息。

13.必须在npm上添加ioBroker组织。即使开发人员由于时间或其他原因无法再维护软件包，这对于实现软件包的长期维护也是必要的。

可以在[这里](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet)中找到更多信息。

##稳定存储库的要求
1.适配器已成功添加到最新的存储库
2.适配器有一个[论坛测试线程]（https://forum.iobroker.net/viewforum.php?f=36），其中已经给出了用户反馈。
3.应该实现发现功能。这是[发现适配器]（https://github.com/ioBroker/ioBroker.discovery）中的功能，

自动识别用户是否可以使用适配器的实例。
为此，必须在[发现适配器](https://github.com/ioBroker/ioBroker.discovery)的存储库中发出拉取请求。

##将适配器添加到官方存储库
1.应访问[官方Github存储库]（https://github.com/ioBroker/ioBroker.repositories），并应根据存储库的内容发出拉取请求。

2.请在现有适配器之间按字母顺序正确排列适配器。

3.版本号添加到稳定存储库时必须声明。当适配器进一步开发时，必须对此进行更新。

4.适配器应在io-package.json中设置一个列表属性“ docs”，说明可以使用相应语言找到指令的位置。

语言指定为键，降价文件的路径指定为值。
需要英语说明（在紧急情况下，可以参考标准README）。还需要德语手册，因为大多数用户会说德语，但这是可选的。
详细的说明可以在论坛中为开发人员节省大量时间。
可以在[这里](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md)中找到一个示例。

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
适配器的当前版本号在io-package.json和package.json中给出。
这两个规格必须匹配。版本号由两个点分成三部分。

```json
"version": "1.7.6"
```

第一部分（从左到右）代表`Major Part`，第二部分代表`minor`部分，最后一部分代表`micro`部分。
应根据以下列表增加版本号：

-**微型**：仅修复了错误
-**次要**：已添加功能，但该版本与以前的版本兼容
-**重大**：不再允许与旧版本向后兼容的重大更改

`news`属性也应在io-package.json中维护。
这使用户可以通过管理界面安装列出的任何版本（前提是该版本已在npm上发布）。
版本号和更改应存储在此处。
可以记录每种受支持语言的更改，至少以英语记录。

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
-`alarm`-安全系统
-“气候控制”-空调，空气过滤器，加热器等
-`communication`-其他适配器的数据提供，例如B.通过REST
-日期和时间-例如B.日历
-`energy`-电力监控，太阳能系统，逆变器等。
-“计量”-其他测量系统（例如水，气，油）
-`花园`-例如B.割草机，洒水系统
-`general`-通用适配器，例如Admin，Web，Discovery
-`geoposition`-物体或人物的地理位置
-`hardware`-不同的多功能硬件，例如Arduino，ESP，蓝牙，...
-`健康`-血压，心跳，体重，...
-“家用”-厨房用具，吸尘器等。
-基础设施-网络，NAS，打印机，电话
-`iot-systems`-其他智能家居系统（硬件和软件）
-`照明`-照明
-`logic`-规则，脚本，解析器等
-`messaging`-用于发送和接收消息的适配器，例如B.通过电子邮件，电报等...
-`misc-data`-数据的进出口和货币转换器等。
-`multimedia`-电视，AVR，盒子，语音助手等
-`network`-ping，网络检测，UPnP，...
-`protocols`-通信协议，例如B.MQTT
-`storage`-日志记录，数据存储，例如B.关系数据库，...
-`utility`-支持适配器，例如B.备份
-`车辆`-汽车
-`visualization`-可视化适配器，例如vis等
-`visualization-icons`-可视化图标
-`visualization-widgets`-iobroker.vis小部件
-`weather`-天气信息，空气质量，环境信息

##适配器连接类型
在`io-package.json`的`common`部分中将`connectionType`定义为：

-`local`-提供与设备或集线器的直接通信。
-`cloud`-此设备的集成通过云端进行，并且需要有效的Internet连接

将`common`中的`dataSource`定义为：

-`poll`-轮询状态意味着以后可能会注意到更新。
-`push`-一旦有新状态可用，ioBroker将会收到通知。
-`assumption`-无法确定设备的状态。 ioBroker会根据上一个ioBroker命令获得状态。