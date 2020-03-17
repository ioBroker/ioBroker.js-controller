---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: inpuJcrJGC7RESSm0g1nQTMTq4Cpov0itsvJVpeo4nk=
---
![商标](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![安装数量](http://iobroker.live/badges/alexa2-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![建立状态](https://travis-ci.org/Apollon77/ioBroker.alexa2.svg?branch=master)
![建造状态](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![环保管理员徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)

＃ioBroker.alexa2
**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

此适配器使您可以远程控制Alexa（Amazon Echo）设备。

非常感谢soef提供的适配器版本1，感谢Hauke和ruhr70提供的来自ioBroker-Forum的脚本中的想法（尤其是媒体进度更新）！还要感谢meicker对所有这些文档的支持以及ioBroker论坛的许多用户的测试支持！

##状态及其含义：
在适配器名称空间（例如alexa2.0）中，创建了一些通道

### Alexa2.0
|州名|意思|
| - | - |
| *。| |将文本命令发送到虚拟设备，就好像您要说话一样。 |
|回声设备。每个Echo设备的状态，请参见下文|
|历史记录。有关命令历史记录的信息，请参见下文|
|智能家居设备。* |每个智能家居设备的状态，以及一般情况，请参见下文|
|信息* |有关适配器状态的常规信息|
| requestResult | TuneIn和智能家居设备请求的错误信息|

### Alexa2.0.Bespoken。*
Bespoken通常是帮助自动测试技能的服务提供商。但是实际上，您可以使用它向“您的” Alexa / Amazon帐户发送命令。使用此工具，您可以触发通常无法通过Alexa应用程序访问的技能操作。从本质上讲，它只能执行与“与您说话的设备”不直接交互的命令，例如执行特定操作并提供答案的普通命令。播放音频或视频或通常由您说出该命令的设备完成的操作将不起作用！

由于发送的文本首先转换为音频，然后发送到Alexa语音服务，然后由Alexa答复并发回，所以Bespoken请求将花费几秒钟。因此，它最多可能需要10秒钟。

|州名|意思|
| - | - |
| #sendText |要发送到虚拟设备的文本|
|回答|来自设备的答复为文本|
| anwserJson |来自适配器的答复为JSON，可能包含其他信息，例如卡信息或类似|
|状态|使用bespoken进行通信的状态（确定=完成/等待下一条命令，PROCESSING =等待来自bespoken的答复，FAILURE =处理时发生错误）|

### Alexa2.0.Contacts.ContactId。*
可用于向其发送文本消息的所有Alexa联系人，包括他本人。自己的联系人在其姓名后得到一个特殊的“（（自我）”）。

|州名|意思|
| - | - |
| #clearOwnMessages |仅存在于自己的联系人中，触发器将删除发送给自己的所有消息（还包括通过App或设备发送给自己的消息！） |
| textMessage |将此文本作为消息发送给用户。此用户的所有设备上均显示“黄色环”。 |

### Alexa2.0.Echo-Devices.Serialnumber。*
在“回声设备”下，列出了每个亚马逊回声设备及其序列号。并非每个设备都显示所有状态。每个设备都有自己的状态，如下所述：

### Alexa2.0.Echo-Devices.Serialnumber.Alarm。*
每个设备的警报（Wecker）设置（如果有）。

|州名|意思|价值|
| - | - | - |
|启用|显示警报状态并允许对其进行更改：以true激活警报-以false停用警报|对/错|
|时间|警报时间。覆盖现有警报的时间以为此警报设置新时间。如果您已有警报，可以在此处通过简单地以hh：mm：ss格式覆盖时间来更改时间，而无需设置|秒。时间输入|
|触发如果达到并触发警报，则为true。时钟必须与Amazon和iobroker保持同步，一旦达到闹钟时间，就可以使用此时钟来触发其他操作|对/错|
|新该设备发出新警报的时间。如果在此处输入值，将创建一个新警报。时间输入（hh：mm：ss，不需要秒） |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth。*
在这里，您可以找到所有具有MAC地址的已连接或已知的蓝牙设备。每个设备的状态：

|州名|意思|
| - | - |
|连接|显示当前连接状态，并允许连接（设置为true）或断开连接（设置为false） |
|不配对|使该设备与echo设备取消配对的按钮。 |

### Alexa2.0.Echo-Devices.Serialnumber.Commands。*
使用命令，您可以在Alexa设备上触发一些操作。如果您在多房间设备上使用它们，那么它们将独立执行，并且*将不会*在单个设备上同步运行！

|州名|意思|价值|
| - | - | - |
| doNotDisturb |打开/关闭请勿打扰此设备|是/否|
|简报|在100秒内进行简报-新闻等。纽扣 |
|早安|来自Alexa的早上好... |纽扣 |
| singasong | Alexa唱了一首歌... |纽扣 |
|说Alexa说您在这里输入的内容... |文字输入|
|音量|调整Alexa的语音音量，该音量会在语音通话之前设置好，然后再重新设置| 0-100 |
|讲故事| Alexa讲故事|纽扣 |
|交通|交通新闻|纽扣 |
|天气|天气新闻纽扣 |
| deviceStop |停止设备上的所有操作|纽扣 |
|通知|发送文本通知给设备的客户|文字|
|公告|播放公告（例如讲话，但在文本前加上Bing）|文字|
| ssml |说出SSML XML字符串|文字|

详细信息发言：在此处输入您想让Alexa说的内容。您还可以通过在文本前输入百分比来调整Alexa的音量。
例如：10; Alexa说Alexa的音量为10％，而100; Alexa的音量为100％。
通常，每个语音命令只能发送250个字符。通过使用分号，只要用分号分隔250个字符，就可以编写任意数量的文字。
然后，Alexa将稍稍休息一下，然后彼此说出文字。您还可以通过编写#Volume;＃Block1;＃Block2，a.s.o将音量与更多255个块一起使用。此处设置的音量将用于定义的语音音量。

### Alexa2.0.Echo-Devices.Serialnumber.Info。*
有关Alexa设备的信息

|州名|意思|价值|
| - | - | - |
|能力| alexa设备提供的功能|信息|
| deviceType |来自亚马逊的设备类型|信息|
| deviceTypeString |设备类型为字符串|信息|
| isMultiroomDevice |是多房间设备-多房间是虚拟设备组|信息，对/错|
| isMultiroomMember |是Multiroom成员-如果为true，则该设备属于Multiroom设备组|信息，对/错|
|多人家长|如果此设备是多房间设备组的一部分，则此状态显示父组设备|信息|
|名称| Alexa设备的名称|信息|
|序列号| Alexa设备的序列号|

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider。*
直接告诉Alexa播放音乐或受支持的音乐提供商的播放列表。实际支持的是：“我的图书馆”，“ Amazon音乐”，“调入”。您还可以在短语中加入一个多房间设备组名称，以便在该组中播放（例如“ SWR3 auf Erdgeschoss”）

|州名|意思|价值|
| - | - | - |
|亚马逊音乐|玩Amazon Music的短语文字输入|
|亚马逊音乐播放列表|播放列表可与Amazon Music一起播放|文字输入|
|我的图书馆|玩“我的书架”的短语文字输入|
|我的图书馆播放列表|播放列表可与“我的图书馆”一起使用文字输入|
|调入|播放“ Tune In”的短语文字输入|
|播放中音调|播放列表可与Tune In一起播放|文字输入|

### Alexa2.0.Echo-Devices.Serialnumber.Player。*
控制设备播放并查看当前状态和媒体信息的状态

|州名|意思|价值|
| - | - | - |
| TuneIn-Station |输入要在该设备上播放此电台的电台名称的文本字段。也可以输入站号（s123456 ...），显示/播客ID（p1234567 ...）或主题ID（t123456789 ...）|文字输入|
| ContentType |文本字段以放入所需内容以在此设备上播放|信息|
| controlForward |按钮触发播放器“前进”命令（30秒）|纽扣 |
|控制下一个|按钮触发播放器“下一个”命令纽扣 |
| controlPause |按钮触发播放器“暂停”命令纽扣 |
| controlPlay |按钮触发播放器“播放”命令纽扣 |
| controlPrevious |按钮触发播放器“上一个”命令纽扣 |
| controlRepeat |按钮触发播放器“重复”命令对/错|
| controlRewind |按钮触发播放器“倒带”命令（30秒）|纽扣 |
| controlShuffle |切换为播放器启用或禁用随机播放模式|对/错|
| currentAlbum |当前正在播放专辑信息|
| currentArtist |当前正在演奏的艺术家|信息|
| currentState |如果播放-> true，则为false |对/错|
| currentTitle |当前正在播放的标题|信息|
| imageURL |相册图像的URL |信息|
| mainArtURL |当前主要艺术作品的网址|信息|
| mediaLength |当前标题的长度|信息|
| mediaLengthStr |有效媒体长度为（HH：）MM：SS |信息|
| mainProgress |主动媒体经过时间|信息|
| mainProgressPercent |有效媒体经过时间百分比信息|
| mediaProgressStr |活动媒体进度为（HH：）MM：SS |信息|
| miniArtUrl |艺术品网址（迷你）|信息|
|静音| “ MUTE”的状态|信息，对/错，音量= 0被认为是静音|
| providerID |当前音乐提供商的ID |信息|
| providerName |当前音乐提供商的名称|信息|
| radioStationId | TuneIn广播电台的ID |信息|
|服务|当前音乐服务的名称|信息|
|数量播放音量。您可以输入0-100％|输入量|

### Alexa2.0.Echo-Devices.Serialnumber.Reminder。*
每个设备的提醒（Erinnerungen）设置（如果有）。

|州名|意思|价值|
| - | - | - |
|启用|显示提醒状态并允许对其进行更改：使用true激活提醒-使用false禁用提醒，禁用后将在一段时间后自动删除。对/错|
|时间|提醒时间。覆盖现有提醒的时间以设置新时间|时间输入|如果您已有提醒，则可以在此处通过简单地以hh：mm：ss格式覆盖时间来更改时间，而无需设置秒|
|触发如果达到并触发了提醒，则为true。时钟必须与Amazon和iobroker保持同步，达到提醒时间后，请使用此时钟来触发其他操作|对/错|

|新以以下格式添加新的提醒<br>时间（hh：mm），文字<br> |文字输入<br> 12:00，提醒我

### Alexa2.0.Echo-Devices.Serialnumber.Routines。*
在Alexa App中设置的例程概述。自行创建的例程具有序列号，Amazon显示为“ preconfigured：...”（预配置：...），每个例程都可以通过按钮触发一次，以运行一次。

|州名|意思|价值|
| - | - | - |

|例程的序列号或内部名称|例程名称|纽扣

### Alexa2.0.Echo-Devices.Serialnumber.Timer。*
您可以在每个Alexa设备上运行一个或多个计时器。由于计时器具有非常动态的性质，因此不会再创建像“警报”或“提醒”这样的其他对象，但是存在一种获取触发信息的方法。

|州名|意思|价值|
| - | - | - |

|触发计时器被触发|信息

### Alexa2.0.Echo-Devices.Serialnumber.online
此Alexa设备是否在线且已连接到Amazon云？

|州名|意思|价值|
| - | - | - |

|在线|设备在线吗？ |真假

### Alexa2.0。历史
|州名|意思|价值|
| - | - | - |
| #trigger |按钮以获取新的历史记录（更多的当前时间，然后是creationTime中的时间戳），仅在不使用推送连接时才需要|纽扣 |
| cardContent |如Alexa-App / Echo Show |中所示，更多信息。信息|
| cardJson |其他信息，如Alexa-App / Echo中所示以JSON格式显示|信息|
| creationTime |此历史记录条目的日期，仅当此时间戳记|信息|
| domainApplicationId |其他信息，例如Skill-ID等，可选|信息|
| domainApplicationName |其他信息，例如技能名称等，可选|信息|
| json |最后命令数据的Json能够处理所有信息，例如用自己的JavaScript | JSON |
|名称|上次请求的设备名称|信息|
| serialNumber |得到最后一个请求的设备的序列号|信息|
|状态|对Alexa的最后命令状态|成功/故障/ DISCARDED_NON_DEVICE_DIRECTED_INTENT;当说出唤醒字来激活设备时，或者当设备将输入丢弃为“不适合我”时，将生成最后一个。 |
|总结设备收到的文本/摘要/操作|信息|

### Alexa.0。智能家居设备
包括Alexa从您的技能中了解的所有智能家居设备。所有已知设备的状态如下：

|州名|意思|价值|
| - | - | - |

| deleteAll |与Alexa应用程序中的按钮相同，从Alexa删除所有智能家居设备。纽扣discoverDevices |查找新的智能家居设备，与Alexa App中的按钮相同|纽扣queryAll |查询所有设备，仅当至少一台设备能够检索信息时才可见|纽扣

### Alexa.0.Smart-Home-Devices.SerialNumber。*
|州名|意思|价值|
| - | - | - |

| #delete |从Alexa删除智能家居设备|纽扣#enabled |智能家居设备是否处于活动状态？ |信息

| #query |查询此设备的数据，仅当智能家居设备/技能支持检索信息时才可见|纽扣 |
|活跃当场景可以被激活/关闭时显示对/错|
| powerState |打开/关闭电源|多变，对/错|
| ... |根据智能家居设备的类型，还有更多可能的状态。信息或可变的:-) |

**->彩色/灯光设备的特殊状态**

|州名|意思|价值|
| - | - | - |
|亮度| HUE灯的亮度|可变0-100％|
|颜色亮度|色彩清晰度的亮度（以及色相和饱和度，HSV）|信息，0-1％|
|色相|颜色的色相值（以及亮度和饱和度，HSV）|信息，0-360°|
|颜色饱和度|颜色的饱和度（以及亮度和色相，HSV）|信息0-1 |
| colorRGB |实际颜色的RGB代码由color- *值构建|信息，＃rrggbb |
| colorName | Alexa定义的颜色名称-固定值|可变以设置颜色0-144 |
| colorTemperarureInKelvin |开尔文色温|信息，1000-10000K |
| colorTemperatureName | Alexa定义的色温名称-固定值|可变设置，0-18 |

使用#brightness，您可以调整灯光的亮度，＃colorName是选择一种预定义的颜色（0-144）。对于HUE环境光，您可以在#colorTemperatureName中的0-18值之间选择19个值。使用#powerState可以打开和关闭所有指示灯。

### Alexa2.0.Info。*
|州名|意思|价值|
| - | - | - |
|连接|如果与Alexa的连接正常|信息->是/否|
| Cookie | Alexa cookie，与几个也要访问Alexa API的外部脚本一起使用|信息|
| csrf | Alexa CSRF，与几个也要访问Alexa API的外部脚本一起使用|信息|

##缺少功能
*如何更新音量，随机播放或重复播放和doNotDisturb的初始状态？还是不需要？
*添加字段以显示播放信息，例如JS版本
*如果cookie / csrf无效，则自动停用

##安装
像往常一样，使用稳定的存储库，最新的存储库或使用GitHub的ioBroker“安装”选项

＃＃ 故障排除
###通过电子邮件/密码确定Cookie的问题
有时，当Amazon在登录时检测到意外流量时，就会对其进行怪异的检查。
这可能会导致需要输入验证码才能登录的问题。
通常，此验证码需要回答一次，此后登录无需验证码即可。

当您需要回答这样的验证码时，请尝试执行以下操作：

*使用常见的浏览器（例如Chrome）
*禁用Javascript！
*清除Amazon可能存在的所有cookie或使用浏览器的Proivate / Incognito模式
*致电https://alexa.amazon.de
*您应该获得一个登录表单（通常显示在较旧的移动浏览器中）
*使用您在其中注册了Echo / Alexa的Amazon凭证登录那里
*您可能需要登录两次或解决验证码
*最后，您应该看到“ https://alexa.amazon.de/spa/index.html”作为URL，但没有任何实际内容（因为JS仍被禁用），但这完全可以！！！
*现在尝试再次获取cookie
*如果仍然无法正常运行，请再次执行该操作，然后从浏览器中检查User-Agent和accept-Language并在下次尝试中使用适配器中的那些

此外，Accept-Language-Header（默认为“ de-DE”）需要与您的语言/浏览器语言/您登录的亚马逊页面的语言匹配。

您也可以尝试使用User-Agent，并使用一种与您使用的系统类型更多匹配项。
例如，当ioBroker在Linux系统上运行时，使用User-Agent的示例使用“ Mozilla / 5.0（X11; Linux x86_64）AppleWebKit / 537.36（KHTML，例如Gecko）Chrome / 51.0.2704.103 Safari / 537.36”可以更好地工作。

您可以在适配器配置中覆盖所有这些参数。

###如何自行确定Cookie？
如果无法自动确定Cookie，或者您不信任适配器提供电子邮件/密码，那么您可以自己确定Cookie。网路上有几个资讯。这里有一些链接：

* https://www.gehrig.info/alexa/Alexa.html
*或使用https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html中的shellscript在外壳上获取它...

但是请注意：Cookie会在若干时间后超时，然后适配器将停止工作并自行禁用。然后，您需要手动获取一个新的cookie！

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**有关您，电子邮件，姓名等的任何其他信息）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes 

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems 

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above) 

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive


### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.x (Github only as iobroker.alexa)
* (Apollon77) 0.1.5: Adapter disables itself on error (no cookie/no csrf in cookie/captcha needed)
* (Apollon77) 0.1.5: Reorganized some states (delete object again please), add playerinfo section for later usage, hopefully fixed unplanned device renaming and other things
* (Apollon77) 0.1.5: Added adapter config options to overwrite used amazon-page, user-agent and accept-language for cookie determination and
* (Apollon77) 0.1.4: State changes are logged and only considered when ack=false!
* (Apollon77) 0.1.3: Corrected all roles, delete objects and start again!
* (Apollon77) 0.1.3: bluetooth connection status filled correctly initially
* (Apollon77) 0.1.2: Library fixes and updates
* (Apollon77) 0.1.1: Library fixes and updates

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2017-2018 soef <soef@gmx.net>, 2018-2020 Ingo Fischer <iobroker@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.