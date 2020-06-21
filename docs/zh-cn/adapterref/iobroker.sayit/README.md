---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sayit/README.md
title: ioBroker sayit适配器
hash: 4LM4po1HGU0onQ6qXn4J5z6ZtNCGJq1kDxJoKdWS+Ms=
---
![商标](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![安装数量](http://iobroker.live/badges/sayit-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sayit.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sayit.svg)
![NPM](https://nodei.co/npm/iobroker.sayit.png?downloads=true)

＃ioBroker sayit适配器
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

SayIt Adapter可以将文本转换为语音并在某些设备上播放。

##配置
支持以下实际输出：

-*浏览器*-文本将由打开iobroker.vis页面的浏览器播放。几乎所有台式机浏览器和少数便携式浏览器都支持它。

-* [Home24- MediaPlayer]（http://www.home-24.net/index.php?app=media）*-文本将被发送并播放到安装了Home24-MediaPlayer的Android设备上。为此，将使用内置在Android文本到语音引擎中的引擎。无法更改该端口并将其设置为50000。

-* Home24-MediaPlayer和[FTP服务器]（https://play.google.com/store/apps/details?id=lutey.FTPServer）*-文本将通过Home24-MediaPlayer在Android设备上发送和播放已安装。为此，将使用Google文本语音引擎。生成的mp3文件将通过FTP复制到android设备并与Home24-MediaPlayer一起播放。

    两个应用程序必须具有相同的主目录。 （例如\“ sd卡\”的根目录）。

-*系统*-文本将由运行ioBroker适配器的OS播放。支持以下操作系统：Windows，Linux，Mac OSx。

-* Windows引擎*-文本将在运行sayIt适配器的Windows上播放。为此，将使用Windows文本到语音引擎，该引擎应由用户预先配置。您可以在[此处]（http://windows.microsoft.com/zh-cn/windows/setting-speech-options#1TC=windows-7）中进行设置。

-* Sonos *-在Sonos设备上播放文本。确保已启用Web适配器。需要使SONOS能够读取生成的mp3文件。

-* Chromecast *-在Chromecast设备上播放文字。

-* MPD *-在音乐播放器守护程序上播放文本。仅将** http **用于网络适配器，请勿使用https。

要在RaspberryPI或linux系统上启用文本语音转换，请在命令```sudo apt-get -y install mpg321```之后调用一次以安装mpg321。

可以通过将其名称写入对象来播放mp3 / wav文件。 （例如“ /vis.0/main/img/door-bell.mp3”）

必须先加载文件。

### TTS引擎
线上：

-Google：英语，德语，俄语，意大利语，西班牙语，法语
-Yandex：俄语

要使用Yandex语音，您必须在此处请求API密钥：[https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/)。 [此服务将在2019年1月1日停用，并由Yandex.cloud代替]要使用Yandex.cloud，您应该在此处注册：[https://cloud.yandex.ru/]，在Cloud中安装SpeechKIT API并获取身份验证令牌和文件夹ID（如API说明中所述）。

-伊凡娜：英语，德语，俄语，意大利语，西班牙语，法语，丹麦语，威尔士语，冰岛语，荷兰语，波兰语，葡萄牙语，罗马尼亚语，瑞典语，土耳其语

        要使用Amazon（Ivona）语音，您需要获取访问密钥和秘密密钥[这里](http://www.ivona.com/us/for-business/speech-cloud/)。

- 云：

        要使用云语音，您需要配置云适配器。 （可以禁用它，但必须对其进行配置）。该服务使用AWS Polly，可以直接使用。

-Amazon Web Services Polly：

        要使用AWS Polly语音，您需要创建访问密钥和秘密密钥[此处]（https://console.aws.amazon.com/iam/home）。您可以在[这里找到Amazon文档](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)。

离线：

-PicoTTS（仅Linux）：英语，德语，意大利语，西班牙语，法语

对于PicoTTS，必须安装以下软件包：libttspico-utils和lame。
安装命令：“ sudo apt-get install libttspico-utils me脚”

### Cloud and Amazon Web Services Polly文本格式
您可以使用[语音合成标记语言](http://docs.aws.amazon.com/polly/latest/dg/ssml.html)设置文本格式。

最有用的功能：

-```<break time =“ 3s” />```--暂停x秒（最多10秒）。
-```<emphasis> big </ emphasis>```-强调一些单词。
-```<prosody volume =“ + 6dB” rate =“ 90％”>我在说</ prosody>```-控制速度和音量参数。
-```<say-as interpret-as =“ digits”> 12345 </ say-as>```-分别说出每个数字。

更多[信息](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)。

###系统命令
如果您有一些程序可以在本地或其他地方播放音频文件，则可以在此处编写此命令。例如。

```myCustomPlayer --option```

如果选择了** System **输出，那么sayit适配器将在本地系统上执行以下命令：

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

如果文件名必须保留在中间位置，则可以使用*％s *指定文件名必须放置的位置：

```myCustomPlayer --option "%s" > /dev/null```

sayIt将根据它生成```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null```。

##用法
SayIt适配器不能单独使用。必须通过javascript适配器或带有特定小部件的“ vis”进行控制。
创建适配器实例后，将可以找到以下对象：

-sayit.N.tts.text：要说的短语。
-sayit.N.tts.volume：播放该短语将使用的音量。
-sayit.N.tts.playing：如果正在播放文本，则为true，否则为false。仅支持“ Windows”和“系统”播放模式。
-sayit.N.tts.cachetext：要缓存的词组，然后无需互联网即可使用。

   例如。您可以在此处手动输入“不连接互联网”，如果对google.com的ping否定，请在“ tts.text”中输入“不连接互联网”，它将发音。当然必须启用缓存。

状态** tts.text **支持扩展语法，因此可以将语言/引擎和音量与文本一起定义。它用于启用多语言text2speech引擎。
例如。如果适配器具有引擎“ Google-english”，则可以使用词组```de:Sag es```强制使用Google-Deustch语音引擎。

使用§§JJJJJ_0_0§§，我们可以强制使用俄语和75％的语言。

您可以从当前或给定的数量（不是最大）中指定百分比的公告数量。例如。如果命令是```de;75;Gutes Wetter```§并且“播音音量”为50％，则播音将以100％可能的38％音量播放。

也可以指定播放mp3文件的系统命令。如果将其保留为空白，则将使用默认设置：windows-cmdmp3.exe，OSX-/ usr / bin / afplay，linux-mpg321或omxplayer（推荐）。

要安装omxplayer，请写```sudo apt-get install omxplayer```或写```sudo apt-get install mpg321```来安装mpg321。

**注意：**仅在实例启动后才可以进行默认的公告选择。

###优先级
要在文本排队的情况下立即发音，您有两种可能：

-放置“！”作为文本中的第一个字符，因此该文本将在当前文本之后立即发音。
-将true写入“ tts.clearQueue”状态，队列将被清除。之后，您可以将新文本写入“ tts.text”，但是所有排队的文本都将被丢弃。

＃＃＃ 引擎
以下是引擎的值：

＃＃＃＃ 谷歌
-** zh **-英语
-** de **-德语
-** pl **-Polski
-** ru **-Русский
-** uk **-український
-**-意大利文
-** es **-西班牙文
-** fr **-法语

#### Yandex
-** ru_YA：Yandex **-Русский
-** ru_YA_CLOUD：Yandex Cloud **-Русский[Yandex.Cloud API生成OGG格式的文件。要在linux上播放ogg文件，应安装mplayer并将其选择为系统播放器]

####通过云的Amazon polly
-** ru-RU_CLOUD_Female **-Русский-Татьяна
-** ru-RU_CLOUD_Male **-Русский-Максим
-** de-DE_CLOUD_Female **-德意志-马琳
-** de-DE_CLOUD_Male **-德意志-汉斯
-** zh-CN_CLOUD_Female **-zh-CN-女-Salli
-** zh-CN_CLOUD_Male **-zh-CN-男性-Joey
-** da-DK_CLOUD_Female **-da-DK-女性-眼镜蛇
-** da-DK_CLOUD_Male **-da-DK-男性-Mads
-** en-AU_CLOUD_Female **-zh-AU-女性-Nicole
-** en-AU_CLOUD_Male **-zh-AU-男性-罗素
-** zh-CN_CLOUD_Female_Amy **-zh-CN-女-艾米
-** en-GB_CLOUD_Male **-en-GB-男性-Brian
-** zh-CN_CLOUD_Female_Emma **-zh-CN-女-艾玛
-** en-GB-WLS_CLOUD_Female **-en-GB-WLS-女-Gwyneth
-** en-GB-WLS_CLOUD_Male **-en-GB-WLS-男性-格林
-** cy-GB_CLOUD_Female **-cy-GB-女-Gwyneth
-** cy-GB_CLOUD_Male **-cy-GB-男性-格林
-** en-IN_CLOUD_Female **-en-IN-女-Raveena
-** zh-CN_CLOUD_Male_Chipmunk **-zh-CN-男性-花栗鼠
-** en-US_CLOUD_Male_Eric **-zh-CN-男性-Eric
-** zh-CN_CLOUD_Female_Ivy **-zh-CN-女-常春藤
-** zh-CN_CLOUD_Female_Jennifer **-zh-CN-女-Jennifer
-** zh-CN_CLOUD_Male_Justin **-zh-CN-男性-贾斯汀
-** zh-CN_CLOUD_Female_Kendra **-zh-CN-女-Kendra
-** zh-CN_CLOUD_Female_Kimberly **-zh-CN-女-Kimberly
-** es-ES_CLOUD_Female **-es-ES-女性-Conchita
-** es-ES_CLOUD_Male **-es-ES-Male-Enrique
-** es-US_CLOUD_Female **-es-US-女性-Penelope
-** es-US_CLOUD_Male **-es-US-男性-Miguel
-** fr-CA_CLOUD_Female **-fr-CA-女性-Chantal
-** fr-FR_CLOUD_Female **-fr-FR-女性-Celine
-** fr-FR_CLOUD_Male **-fr-FR-男性-Mathieu
-** is-IS_CLOUD_Female **-is-IS-女性-Dora
-** is-IS_CLOUD_Male **-is-IS-男性-Karl
-** it-IT_CLOUD_Female **-it-IT-女性-Carla
-** it-IT_CLOUD_Male **-it-IT-男性-Giorgio
-** nb-NO_CLOUD_Female **-nb-NO-女性-Liv
-** NL-NL_CLOUD_Female **-NL-NL-女-乐天
-** NL-NL_CLOUD_Male **-NL-NL-男性-鲁本
-** pl-PL_CLOUD_Female_Agnieszka **-pl-PL-女性-Agnieszka
-** pl-PL_CLOUD_Male_Jacek **-pl-PL-男性-Jacek
-** pl-PL_CLOUD_Female_Ewa **-pl-PL-女性-Ewa
-** pl-PL_CLOUD_Male_Jan **-pl-PL-男性-1月
-** pl-PL_CLOUD_Female **-pl-PL-女-Maja
-** pt-BR_CLOUD_Female **-pt-BR-女性-Vitoria
-** pt-BR_CLOUD_Male **-pt-BR-男性-Ricardo
-** pt-PT_CLOUD_Male **-pt-PT-男性-克里斯蒂亚诺
-** pt-PT_CLOUD_Female **-pt-PT-女性-Ines
-** ro-RO_CLOUD_Female **-ro-RO-女-卡门
-** sv-SE_CLOUD_Female **-sv-SE-女-Astrid
-** tr-TR_CLOUD_Female **-tr-TR-女-Filiz

#### Pico TTS
-** zh-CN **-美国英语
-** zh-GB **-英国英语
-** DE-DE **-德语
-** it-IT **-Italiano
-** ES-ES **-西班牙文
-** fr-FR **-法语

####亚马逊Polly Direct
-**（ru-RU_AP_Female）**-Русский-Татьяна
-**（ru-RU_AP_Male）**-Русский-Максим
-**（de-DE_AP_Female）**-德语-马琳
-**（de-DE_AP_Female_Vicki）**-德语-Vicki
-**（de-DE_AP_Male）**-德意志-汉斯
-**（zh-CN_AP_Female）**-zh-美国-女-Salli
-**（zh-CN_AP_Male）**-zh-CN-男性-Joey
-**（da-DK_AP_Female）**-da-DK-女性-眼镜蛇
-**（da-DK_AP_Male）**-da-DK-男性-Mads
-**（zh-CN_AP_Female）**-zh-AU-女性-妮可
-**（zh-AU_AP_Male）**-zh-AU-男性-罗素
-**（zh-CN_AP_Female_Amy）**-zh-GB-女-艾米
-**（zh-CN_AP_Male）**-zh-GB-男性-Brian
-**（zh-CN_AP_Female_Emma）**-zh-CN-女-艾玛
-**（zh-CN-WLS_AP_Female）**-zh-GB-WLS-女-Gwyneth
-**（zh-CN-WLS_AP_Male）**-zh-CN-WLS-男性-格林
-**（cy-GB_AP_Female）**-cy-GB-女性-Gwyneth
-**（cy-GB_AP_Male）**-cy-GB-男性-格林
-**（zh-CN_AP_Female）**-zh-IN-女性-Raveena
-**（zh-CN_AP_Male_Chipmunk）**-zh-CN-男性-花栗鼠
-**（zh-CN_AP_Male_Eric）**-zh-CN-男性-Eric
-**（zh-CN_AP_Female_Ivy）**-zh-CN-女性-常春藤
-**（zh-CN_AP_Female_Jennifer）**-zh-CN-女性-Jennifer
-**（zh-CN_AP_Male_Justin）**-zh-CN-男性-贾斯汀
-**（zh-CN_AP_Female_Kendra）**-zh-CN-女-Kendra
-**（zh-CN_AP_Female_Kimberly）**-zh-CN-女-Kimberly
-**（es-ES_AP_Female）**-es-ES-女性-Conchita
-**（es-ES_AP_Male）**-es-ES-男性-Enrique
-**（es-US_AP_Female）**-es-US-女性-Penelope
-**（es-US_AP_Male）**-es-US-男性-Miguel
-**（fr-CA_AP_Female）**-fr-CA-女性-Chantal
-**（fr-FR_AP_Female）**-fr-FR-女性-Celine
-**（fr-FR_AP_Male）**-fr-FR-男性-Mathieu
-**（is-IS_AP_Female）**-is-IS-女性-Dora
-**（is-IS_AP_Male）**-is-IS-男性-Karl
-**（it-IT_AP_Female）**-it-IT-女性-Carla
-**（it-IT_AP_Male）**-it-IT-男性-Giorgio
-**（nb-NO_AP_Female）**-nb-NO-女性-Liv
-**（nl-NL_AP_Female）**-nl-NL-女-乐天
-**（nl-NL_AP_Male）**-nl-NL-男性-鲁本
-**（pl-PL_AP_Female_Agnieszka）**-pl-PL-女性-Agnieszka
-**（pl-PL_AP_Male_Jacek）**-pl-PL-男性-Jacek
-**（pl-PL_AP_Female_Ewa）**-pl-PL-女性-Ewa
-**（pl-PL_AP_Male_Jan）**-pl-PL-男性-一月
-**（pl-PL_AP_Female）**-pl-PL-女性-Maja
-**（pt-BR_AP_Female）**-pt-BR-女性-Vitoria
-**（pt-BR_AP_Male）**-pt-BR-男性-Ricardo
-**（pt-PT_AP_Male）**-pt-PT-男性-克里斯蒂亚诺
-**（pt-PT_AP_Female）**-pt-PT-女性-Ines
-**（ro-RO_AP_Female）**-ro-RO-女性-卡门
-**（sv-SE_AP_Female）**-sv-SE-女性-Astrid
-**（tr-TR_AP_Female）**-tr-TR-女性-Filiz

## Changelog

### 1.9.8 (2020-06-11)
* (Apollon77) fix error handling on file copy

### 1.9.7 (2020-06-11)
* (algar42) tts.ogg state added for ogg file type

### 1.9.6 (2020-05-24)
* (bluefox) Show names of SONOS devices

### 1.9.4 (2020-05-11)
* (Apollon77) Fix Blockly
* (Apollon77) Update dependencies

### 1.9.3 (2020-04-24)
* (bluefox) Fixed blockly with missing languages

### 1.9.2 (2020-04-21)
Changed type of top-level object to "meta" in order to comply with js-controller v3

### 1.9.1 (2020-03-12)
* (foxriver76) removed usage of adapter.getMessage

### 1.9.0 (2019-11-06)
* (algar42) Output file extension is changed dynamically based on the engine selected

### 1.8.2 (2019-07-11)
* (bluefox) Web server URL will be updated if web server was updated

### 1.8.1
* Add Ukrainian Google Language

### 1.8.0 (2018-12-04)
* (bluefox) Priority for the text was added

### 1.7.1 (2018-09-19)
* (BuZZy1337) fixed error in Blockly-Block

### 1.7.0 (2018-06-08)
* (bluefox) Ivona removed
* (bluefox) Error was fixed by upload of file to FTP
* (bluefox) admin3

### 1.6.8 (2018-04-11)
* (BuZZy1337) Generate separate mp3 files for each instance.
* Fixes [Issue#34](https://github.com/ioBroker/ioBroker.sayit/issues/34)
* (BuZZy1337) Always upload mp3 files to the state sayit.X.tts.mp3

### 1.6.7 (2018-02-05)
* (Apollon77) Remove unneeded logging
* (bondrogeen) Admin3 Fixes

### 1.6.6 (2017-11-27)
* (angelnu) Wait for Google Home announcement to complete

### 1.6.5 (2017-11-04)
* (bluefox) Fix cloud .pro

### 1.6.4 (2017-10-18)
* (bluefox) Fix system commands

### 1.6.3 (2017-10-04)
* (bluefox) Code refactoring
* (bluefox) Add google home as output
* (bluefox) Remove ivona because not more supported

### 1.5.2 (2017-03-09)
* (bluefox) Catch error if some directory in mp3 folder

### 1.5.1 (2017-02-15)
* (bluefox) Fix blockly language

### 1.5.0 (2017-01-27)
* (DarkChaos) Add AWS Polly as source
* (bluefox) Add cloud as source

### 1.4.0 (2017-01-16)
* (bluefox) fix install problem
* (bluefox) add PicoTTS as source

### 1.3.3 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.3.2 (2017-01-10)
* (angelnu) changes for new chromecast tts

### 1.3.1 (2016-12-27)
* (bluefox) small fix of config dialog
* (AirKing555) Fix Volume change

### 1.3.0 (2016-12-20)
* (instalator) add mpd

### 1.2.1 (2016-10-31)
* (bluefox) Fix cache

### 1.2.0 (2016-10-28)
* (bluefox) Finish sayit

### 1.1.3 (2016-10-24)
* (bluefox) Fix changing of engine

### 1.1.2 (2016-10-20)
* (bluefox) Add omxplayer option

### 1.0.1 (2016-10-12)
* (bluefox) support of blockly

### 1.0.0 (2016-05-14)
* (bluefox) Make the type of mp3 as file

### 0.3.16 (2015-12-26)
* (Vegetto) Support for Chromecast devices

### 0.3.16 (2015-12-26)
* (bluefox) enable play of mp3 files from disk

### 0.3.15 (2015-11-10)
* (bluefox) fill default settings by first start

### 0.3.14 (2015-11-01)
* (bluefox) fix error with sayItWindows

### 0.3.13 (2015-10-27)
* (bluefox) fix error with sayItSystem

### 0.3.12 (2015-10-06)
* (bluefox) fix error if received mp3 file is too short
* (bluefox) try to implement cache datapoint (you can use sayit.0.tts.cachetext to create cache for phrases and use sayit without internet)

### 0.3.11 (2015-08-03)
* (bluefox) change google requests from http to https

### 0.3.10 (2015-07-26)
* (bluefox) add new voice Russian-Maxim
* (bluefox) fix error with mp24ftp

### 0.3.9 (2015-07-09)
* (bluefox) fix error by mediaplayer24

### 0.3.8 (2015-06-09)
* (bluefox) make the volume for announce configurable
* (bluefox) make the command for "system" configurable

### 0.3.7 (2015-05-28)
* (bluefox) fix volume for announce
* (bluefox) support of play files from internal filesystem, like "/sayit.0/tts.userfiles/myGong.mp3"

### 0.3.6 (2015-03-24)
* (bluefox) fix error with volume by sonos

### 0.3.5 (2015-03-22)
* (bluefox) fix error in announcement

### 0.3.4 (2015-03-20)
* (bluefox) fix error in announcement

### 0.3.3 (2015-03-20)
* (bluefox) enable announcement

### 0.3.2 (2015-03-16)
* (bluefox) clear cache if engine changed

### 0.3.1 (2015-03-15)
* (bluefox) fix small error with log

### 0.3.0 (2015-03-08)
* (bluefox) add ivona/Amazon voices

### 0.2.2 (2015-03-08)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.1 (2015-03-07)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.0 (2015-03-02)
* (bluefox) add yandex-russian support

### 0.1.0 (2015-03-02)
* (bluefox) queue texts

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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