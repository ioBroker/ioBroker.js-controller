---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Apollon77/ioBroker.alexa2/edit/master//README.md
title: Alexa2 (Amazon Echo)
hash: BETUPt5sfnfHnfbVc/NvgU2FhyUg61czcNtFLQrdETw=
adapter: true
license: MIT
authors: Apollon77 <iobroker@fischer-ka.de>
description: Remote control for Alexa (Amazon Echo)
keywords: alexa, amazon, amazon echo, echo dot, echo show
readme: https://github.com/Apollon77/ioBroker.alexa2/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-07-20T14:34:19.324Z
version: 1.1.3
BADGE-安装数量: http://iobroker.live/badges/alexa2-stable.svg
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.alexa2.svg
BADGE-建立状态: https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true
BADGE-执照: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
---
![商标](zh-cn/adapterref/iobroker.alexa2/../../../en/adapterref/iobroker.alexa2/admin/alexa.png)


＃ioBroker.alexa2 <！ -   - > <！ -   - >
此适配器允许您远程控制您的Alexa（Amazon Echo）设备。

非常感谢适用于适配器的良好版本1的soef以及来自ioBroker-Forum的脚本中的Hauke和ruhr70（尤其是媒体进度更新）！还要非常感谢支持记录所有这些以及来自ioBroker论坛的众多用户的测试支持！

###国家及其含义：
在适配器命名空间（例如alexa2.0）中，创建了一些通道

#### Alexa2.0
|州名|意义|
| - | - |
|直言不讳。* |将文本命令发送到虚拟设备，就像您要对它说话一样
| echo-devices。* |每个Echo设备的状态，见下文|
|历史。* |命令历史信息，见下文|
|智能家居设备。* |每个智能家居设备的状态和一般情况，见下文|
|信息。* |有关适配器状态的一般信息|
| requestResult | TuneIn和智能家居设备请求的错误信息

#### Alexa2.0.bespoken。*
Bespoken通常是一个帮助自动测试技能的服务提供商。但事实上，您可以使用它向“您的”Alexa /亚马逊帐户发送命令。通过这种方式，您可以触发通常无法通过Alexa应用程序访问的技能操作。根据其工作方式的性质，只有命令可能不直接与“您说话的设备”交互，就像执行某个操作并提供答案的普通命令一样。播放音频或视频等通常由您说出的设备完成的命令将无效！

请求Bespoken将花费几秒钟，因为发送的文本首先被转换为音频，然后发送到Alexa语音服务，然后由Alexa回答并发回。所以它最多可能需要10秒。

|州名|意义|
| - | - |
| #sendText |要发送到虚拟设备的文本|
|回答|从设备回答文本|
| anwserJson |来自适配器的答案为JSON，可能包含其他信息，如卡片信息或此类信息
|状态|与beceoken进行通信的状态（OK =完成/等待下一个命令，PROCESSING =等待来自bespoken的回答，FAILURE =处理时发生错误）|

#### Alexa2.0.echo-devices.Serialnumber。*
在“echo-devices”下，每个亚马逊回声设备都列有它的序列号。并非每个设备都显示所有状态。每个设备都有自己的状态，如下所述：

#### Alexa2.0.echo-devices.Serialnumber.Alarm。*
每个设备的警报（Wecker）设置（如果有）。

|州名|意义|价值|
| - | - | - |
|启用|显示警报状态并允许更改警报：使用true激活警报 - 使用false |取消激活警报真/假|
|时间|是时候报警了。覆盖现有警报的时间以设置此警报的新时间。如果您有现有的警报，您可以通过简单地以格式hh：mm：ss覆盖时间来更改此处的时间，不需要秒来设置时间输入|
|触发|如果达到并触发警报，则为true。时钟必须与Amazon和iobroker同步，一旦达到闹钟时间，请使用此选项触发其他操作真/假|
|新的|此设备的新警报时间。如果在此处输入值，将创建新的警报时间输入（hh：mm：ss，不需要秒）|

#### Alexa2.0.echo-devices.Serialnumber.Bluetooth。*
在这里，您可以找到所有已连接或已知的具有MAC地址的蓝牙设备。每个设备的状态：

|州名|意义|
| - | - |
|连接|显示当前连接状态并允许连接（设置为true）或断开连接（设置为false）|
| unpair |用于从echo设备取消配对此设备的按钮

#### Alexa2.0.echo-devices.Serialnumber.Commands。*
使用命令，您可以在Alexa-Device上触发某些操作。如果您在多房间设备上使用它们，那么它们将独立执行，并且*不会*在单个设备上同步运行！

|州名|意义|价值|
| - | - | - |
| doNotDisturb |打开/关闭此设备请勿打扰|真/假|
| flashbriefing |在100秒内简报 - 新闻等.pp |按钮|
|早上好Alexa早上好... |按钮|
| singasong | Alexa唱了一首歌...... |按钮|
|说| Alexa说你在这里输入什么...... |文字输入|
| speakvolume |调整Alexa的说话音量，此音量在说话之前设定并在之后重置| 0-100 |
| tellstory | Alexa讲述了一个故事按钮|
|交通|交通新闻|按钮|
|天气|天气新闻|按钮|
| deviceStop |停止设备上的所有操作|按钮|
|通知|将文本通知发送给设备的客户|文字|
|公告|播放公告（比如说话，但在文本之前使用Bing）|文字|
| ssml |说出SSML XML字符串|文字|

详细信息说出：在此输入您想要Alexa的内容。您还可以通过在文本前面给出一个百分比来调整Alexa的音量。
示例：10; Alexa表示Alexa的音量为10％，而100; Alexa的音量为100％。
通常，每个说话命令只能发送250个字符。通过使用分号，可以根据需要编写，只要用分号分隔250个字符即可。
然后Alexa会在一个小小的休息时间之后互相讲话。您还可以通过编写#Volume来使用该卷以及更多255个块;＃Block1;＃Block2，a.s.o此处设置的卷将用于定义的说话卷。

#### Alexa2.0.echo-devices.Serialnumber.Info。*
有关Alexa设备的信息

|州名|意义|价值|
| - | - | - |
|能力|功能，如果alexa设备|信息|
| deviceType |来自亚马逊的设备类型信息|
| deviceTypeString |设备类型为字符串|信息|
| isMultiroomDevice |多房间设备 -  Multiroom是虚拟设备组|信息，真/假|
| isMultiroomMember |是Multiroom成员 - 如果为true，则设备是多房间设备组的一部分信息，真/假|
|多房间父母|如果此设备是多房间设备组的一部分，则此状态显示父组设备|信息|
|名字| Alexa设备名称|信息|
| SerialNumber | Alexa设备的序列号|

#### Alexa2.0.echo-devices.Serialnumber.Music-Provider。*
直接告诉Alexa播放音乐或支持音乐提供商的播放列表。实际上支持的是：我的图书馆，亚马逊音乐，调整。您还可以在短语中包含多房间设备组名称以在该组中播放（例如“SWR3 auf Erdgeschoss”）

|州名|意义|价值|
| - | - | - |
|亚马逊音乐|使用亚马逊音乐的短语|文字输入|
|亚马逊音乐播放列表|用于播放亚马逊音乐的播放列表|文字输入|
|我的图书馆|用我的图书馆播放的短语|文字输入|
|我的图书馆播放列表|用我的图书馆播放的播放列表|文字输入|
| Tune-In |使用Tune In |的短语文字输入|
| Tune-In-Playlist |播放列表与Tune In |文字输入|

#### Alexa2.0.echo-devices.Serialnumber.Player。*
用于控制设备播放以及查看当前状态和媒体信息的状态

|州名|意义|价值|
| - | - | - |
| TuneIn-Station |将文本字段放入工作站名称以在此设备上播放此工作站。此外，还可以输入电台号码（s123456 ...），节目/播客ID（p1234567 ...）或主题ID（t123456789 ...）|文字输入|
| ContentType |要在此设备上播放所需内容的文本字段|信息|
| controlForward |按钮触发玩家“前进”命令（30秒）|按钮|
| controlNext |按钮触发玩家“下一步”命令|按钮|
| controlPause |按钮触发玩家“暂停”命令|按钮|
| controlPlay |按钮触发玩家“播放”命令|按钮|
| controlPrevious |按钮触发播放器“上一个”命令|按钮|
| controlRepeat |按钮触发玩家“重复”命令|真/假|
| controlRewind |按钮触发玩家“倒带”命令（30秒）|按钮|
| controlShuffle |切换为启用或禁用播放器的随机播放模式真/假|
| currentAlbum |目前的专辑实际上播放|信息|
|当前艺术家|现在的艺术家实际上在玩信息|
| currentState |如果正在播放 - > true，则为false |真/假|
| currentTitle |目前的冠军实际上正在播放信息|
| imageURL |专辑图像的URL |信息|
| mainArtURL |当前主要艺术的URL |信息|
| mediaLength |当前标题的长度|信息|
| mediaLengthStr |有效媒体长度为（HH：）MM：SS |信息|
| mainProgress |活动媒体播放时间|信息|
| mainProgressPercent |活动媒体经过的时间百分比|信息|
| mediaProgressStr |活跃的媒体进展为（HH：）MM：SS |信息|
| miniArtUrl |艺术的URL（迷你）|信息|
|静音| 'MUTE'的状态信息，true / false，volume = 0被视为静音|
| providerID |当前音乐提供商的ID |信息|
| providerName |当前音乐提供商的名称|信息|
| radioStationId | TuneIn电台的ID |信息|
|服务|当前音乐服务的名称|信息|
|音量|播放音量。您可以输入介于0-100％|之间的值输入音量|

#### Alexa2.0.echo-devices.Serialnumber.Reminder。*
每个设备的提醒（Erinnerungen）设置（如果有）。

|州名|意义|价值|
| - | - | - |
|启用|显示提醒状态并允许更改提醒：使用true激活提醒 - 使用false取消提醒，将在禁用后自动删除一段时间真/假|
|时间|提醒的时间。覆盖现有提醒设置新时间的时间时间输入|如果你有一个现有的提醒，你可以通过简单地用格式hh：mm：ss覆盖时间来改变时间，不需要秒来设置
|触发|如果到达并触发了提醒，则为true。时钟必须与Amazon和iobroker同步，一旦达到提醒时间，请使用此选项触发其他操作真/假|

|新的|以格式添加新提醒<br>时间（小时：分钟），文本<br> |文字输入<br> 12:00，提醒我

#### Alexa2.0.echo-devices.Serialnumber.Routines。*
在Alexa App中设置的例程概述。自创程序有一个序列号，亚马逊显示为'预先配置：......'每个例程都可以通过一个按钮运行一次。

|州名|意义|价值|
| - | - | - |

|例程的序列号或内部名称例程的名称|按键

#### Alexa2.0.echo-devices.Serialnumber.Timer。*
您可以在每个Alexa设备上运行一个或多个计时器。由于计时器非常动态，因此不会像Alarm或Reminders那样创建更多的对象，但是存在获取触发信息的方法。

|州名|意义|价值|
| - | - | - |

|触发|计时器被触发了|信息

#### Alexa2.0.echo-devices.Serialnumber.online
这个Alexa设备是否在线并连接到亚马逊云？

|州名|意义|价值|
| - | - | - |

|在线|设备在线吗？ |真假

#### Alexa2.0.history
|州名|意义|价值|
| - | - | - |
| #trigger |按钮获取新的历史记录（更新当前时间戳创建时间），仅在不使用推送连接时才需要按钮|
| cardContent | Alexa-App / Echo Show中显示的其他信息信息|
| cardJson |其他信息如以JSON格式的Alexa-App / Echo Show所示信息|
| creationTime |此历史记录条目的日期，新历史记录条目仅在稍后作为此时间戳记时被考虑信息|
| domainApplicationId |其他信息，如Skill-ID等，可选|信息|
| domainApplicationName |其他信息，如技能名称等，可选|信息|
| json |最后一个命令数据的Json能够处理所有信息，例如在自己的JavaScripts中| JSON |
|名字|获得最后一个请求的设备的名称信息|
| serialNumber |获得最后一个请求的设备的序列号信息|
|状态| Alexa的最后一个命令的状态SUCCESS / FAULT / DISCARDED_NON_DEVICE_DIRECTED_INTENT;通过说出唤醒字来激活设备时，或者当设备丢弃输入为“不适合我”时，生成最后一个
|摘要|设备收到的文本/摘要/操作|信息|

#### Alexa.0.smart-home-devices
包括Alexa从您的技能中了解到的所有智能家居设备。对于所有已知设备，说明如下：

|州名|意义|价值|
| - | - | - |

| deleteAll |删除Alexa中的所有智能家居设备，与Alexa App中的按钮相同按钮| discoverDevices |找到新的智能家居设备，与Alexa App中的按钮相同按钮| queryAll |查询所有设备，仅在至少一个设备能够检索信息时才可见按键

#### Alexa.0.smart-home-devices.serialNumber。*
|州名|意义|价值|
| - | - | - |

| #delete |从Alexa删除智能家居设备按钮| #enabled |智能家居设备是否有效？ |信息

| #query |查询此设备的数据，仅在智能家居设备/技能支持检索信息时可见按钮|
|活跃的|显示可以激活/停用的场景|真/假|
| powerState |打开/关闭电源|多变的，真/假的
| ...... |更多可能的状态取决于智能家居设备的类型信息或多变的:-) |

**  - >彩色/灯光设备的特殊状态**

|州名|意义|价值|
| - | - | - |
|亮度| HUE灯的亮度|可变0-100％|
|颜色 - 亮度|颜色定义的亮度（以及色调和饱和度，HSV）|信息，0-1％|
|色调|颜色的色调值（连同亮度和饱和度，HSV）|信息，0-360°|
|色饱和度颜色饱和度（连同亮度和色调，HSV）|信息，0-1 |
| colorRGB |实际颜色的RGB代码由color- *值构成信息，＃rrggbb |
| colorName | Alexa定义的颜色名称 - 固定值|可设置颜色，0-144 |
| colorTemperarureInKelvin |色温以开尔文为单位信息，1000-10000K |
| colorTemperatureName | Alexa定义的色温名称 - 固定值|可设置为0-18 |

使用#brightness可以调整灯光的亮度，＃colorName是选择一种预定义的颜色（0-144）。对于HUE环境光，您可以在#colorTemperatureName中选择0到18之间的值。所有灯都可以通过#powerState打开和关闭。

#### Alexa2.0-info。*
|州名|意义|价值|
| - | - | - |
|连接|如果连接到Alexa是OK |信息 - > true / false |
|饼干| Alexa cookie，与几个也想访问Alexa API的外部脚本一起使用信息|
| csrf | Alexa CSRF，与几个也想访问Alexa API的外部脚本一起使用信息|

##缺少功能
*如何更新音量，随机播放或重复的初始状态以及doNotDisturb ?!还是不需要的？
*添加字段以显示播放信息，如JS版本
*如果cookie / csrf无效，则自动停用

##安装
使用GitHub中的ioBroker“Install”选项或从最新的存储库中执行iobroker根目录中的以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.alexa2
npm add alexa2
iobroker upload alexa2
```

然后进入ioBroker Admin并添加一个Alexa实例。

＃＃ 故障排除
###通过电子邮件/密码确定Cookie的问题
有时亚马逊在检测到登录时的意外流量时已经进行了检查。
这可能导致需要回答验证码才能登录的问题。
大多数情况下，这个验证码需要回答一次，此后登录工作没有验证码。

当您需要回答这样的验证码时，请尝试执行以下操作：

*使用通用浏览器（例如Chrome）
*禁用Javascript！
*清除亚马逊可能存在的所有cookie或使用浏览器的Proivate / Incognito模式
*致电https://alexa.amazon.de
*您应该获得一个登录表单（通常显示为较旧的移动浏览器）
*使用您在其中注册Echo / Alexa的Amazon凭据登录
*您可能需要登录两次或解决验证码
*最后你应该看到“https://alexa.amazon.de/spa/index.html”作为URL但没有任何实际内容（因为JS仍然被禁用），但是这完全没问题！
*现在尝试再次获取cookie
*如果它仍然不起作用再次执行并检查用户代理和从您的浏览器接受语言并在下次尝试时使用适配器

此外，Accept-Language-Header（默认为“de-DE”）需要与您的语言/浏览器语言/您登录的亚马逊页面的语言相匹配。

您还可以尝试使用User-Agent，并使用与您使用的系统类型更匹配的用户代理。
例如，使用“Mozilla / 5.0（X11; Linux x86_64）AppleWebKit / 537.36（KHTML，如Gecko）Chrome / 51.0.2704.103 Safari / 537.36”作为用户代理据报道，当ioBroker在Linux系统上运行时效果更好。

您可以覆盖适配器配置中的所有这些参数。

###如何自己确定Cookie？
如果自动Cookie确定不起作用或您不相信适配器提供电子邮件/密码，那么您可以自己确定cookie。网上有几个信息如何做到这一点。这里有一些链接：

* https://www.gehrig.info/alexa/Alexa.html
*或使用来自https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html的shellscript来获取shell ...

但请注意：Cookie会在几次后超时，然后适配器将停止工作并自行禁用。然后，您需要手动获取新的cookie！

## Changelog

### 2.2.0 (2019-01-xx)
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13)
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