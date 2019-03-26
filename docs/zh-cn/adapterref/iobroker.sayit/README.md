---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sayit/README.md
title: ioBroker说适配器
hash: YGa+7pXYvlsP3g77L7+oVvhRap1ISB9PKQfchOw2rQw=
---
![商标](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![安装数量](http://iobroker.live/badges/sayit-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sayit.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sayit.svg)
![NPM](https://nodei.co/npm/iobroker.sayit.png?downloads=true)

#ioBroker sayit adapter
SayIt Adapter可以将文本转换为语音并在某些设备上播放。

##配置
支持以下实际输出：

 -  *浏览器*  - 文本将由浏览器在打开的iobroker.vis页面上播放。它几乎被每个桌面浏览器和少数动态浏览器支持。

 -  * [Home24- MediaPlayer]（http://www.home-24.net/index.php?app=media）*  - 文本将被发送并播放到安装了Home24  -  MediaPlayer的Android设备。为此将用于构建Android文本到语音引擎。端口无法更改并设置为50000。

 -  * Home24  -  MediaPlayer和[FTP服务器]（https://play.google.com/store/apps/details?id=lutey.FTPServer）*  - 将使用Home24在Android设备上发送和播放文本 -  MediaPlayer安装。对于这将使用谷歌文本到语音引擎。生成的mp3文件将通过FTP复制到Android设备并与Home24  -  MediaPlayer一起播放。

    两个应用程序都必须具有相同的主目录。 （例如\“sd card \”的根目录）。

 - *System* - 文本将由运行ioBroker适配器的OS播放。支持以下操作系统：Windows，Linux，Mac OSx。

 -  * Windows引擎*  - 文本将由windows运行，其中sayIt适配器运行。对于这将使用Windows文本到语音引擎，应该由用户预先配置。您可以查看[此处]（http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7）如何设置它。

 - *Sonos* - 在sonos设备上播放文字。确保已启用Web Adaptor。需要启用SONOS才能读取生成的mp3文件。

 - *Chromecast* - 在Chromecast设备上播放文字。

 - *MPD* - 在音乐播放器守护程序上播放文本。仅使用** http **作为Web适配器，不要使用https。

要在RaspberryPI或Linux系统上启用文本到语音，请按照命令```sudo apt-get -y install mpg321```进行一次调用以安装mpg321。

可以通过将其名称写入对象来播放mp3 / wav文件。 （例如“/vis.0/main/img/door-bell.mp3”）

必须先加载该文件。

### TTS引擎
线上：

 - 谷歌：英语，德语，俄语，意大利语，西班牙语，法语
 -  Yandex：俄罗斯人

要使用Yandex语音，您必须在此处请求API密钥：[https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/)。 [此服务将于2019年1月1日禁用，并由Yandex.cloud取代]要使用Yandex.cloud，您应在此处注册：[https://cloud.yandex.ru/]，在Cloud中安装SpeechKIT API并获取Auth令牌和API指令中描述的文件夹ID。

 -  Ivona：英语，德语，俄语，意大利语，西班牙语，法语，Dansk，威尔士语，冰岛语，荷兰语，波兰语，葡萄牙语，罗马尼亚语，瑞典语，土耳其语

        要使用Amazon（Ivona）语音，您需要获取访问密钥和密钥[这里](http://www.ivona.com/us/for-business/speech-cloud/)。

- 云：

        要使用云语音，您需要配置云适配器。 （可以禁用它，但必须配置）。此服务使用AWS Polly，可以直接使用。

 - 亚马逊网络服务Polly：

        要使用AWS Polly语音，您需要创建访问密钥和密钥[这里]（https://console.aws.amazon.com/iam/home）。亚马逊文档可以找到[这里](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)。

离线：

 -  PicoTTS（仅限linux）：英语，德语，意大利语，西班牙语，法语

对于PicoTTS，必须安装以下软件包：libttspico-utils和lame。
安装命令：'sudo apt-get install libttspico-utils lame'

###云和Amazon Web Services Polly文本格式
您可以使用[语音合成标记语言](http://docs.aws.amazon.com/polly/latest/dg/ssml.html)格式化文本。

最有用的功能：

 - `````<break time =“3s”/>``` - 暂停x秒（最长10秒）。
 - ````<emphasis> big </ emphasis>``` - 强调一些词。
 - ````<韵律音量=“+ 6dB”率=“90％”>我说这个</韵律>``` - 控制速度和音量参数。
 - ````say-as interpre-as =“digits”> 12345 </ say-as>``` - 分别说出每一个数字。

更多[信息](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)。

###系统命令
如果您有一些程序，可以在本地或其他地方播放音频文件，您可以在此处编写此命令。例如。

```myCustomPlayer --option```

如果选择了** System **输出，则sayit适配器将在本地系统上执行以下命令：

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

如果文件名必须保留在中间位置，则可以使用*％s *指定文件名必须放置的位置：

```myCustomPlayer --option "%s" > /dev/null```

说它会从中```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null```。

##用法
SayIt适配器不能单独使用。它必须通过javascript适配器或来自特定小部件的“vis”进行控制。
创建适配器实例后，可以找到以下对象：

 -  sayit.N.tts.text：要说的短语。
 -  sayit.N.tts.volume：播放短语将使用的音量。
 -  sayit.N.tts.playing：如果正在播放文本则为true，否则为false。仅支持“windows”和“system”播放模式。
 -  sayit.N.tts.cachetext：要缓存的短语，然后可以在没有互联网的情况下使用。

   例如。您可以手动输入“无互联网”，如果ping到google.com是否定的，请将“No internet”写入“tts.text”，它会发音。当然，必须启用缓存。

State **tts.text** 持扩展语法，因此langugage / engine和volume可以与文本一起定义。它用于启用多语言text2speech引擎。
例如。如果适配器具有引擎“Google-english”，则可以使用短语```de:Sag es```强制使用Google-Deustch语音引擎。

使用```ru;75;Погода хорошая```，我们可以强制使用俄语和75％的音量。

您可以从当前或给定的卷（而不是从最大值）指定公告的百分比。例如。如果命令是```de;75;Gutes Wetter```并且“宣布音量”是50％，则宣布将从100％可能播放38％的音量。

也可以指定播放mp3文件的系统命令。如果将其留空，将使用默认设置：windows  -  cmdmp3.exe，OSX  -  / usr / bin / afplay，linux  -  mpg321或omxplayer（推荐）。

安装omxplayer编写```sudo apt-get install omxplayer```或编写```sudo apt-get install mpg321```来安装mpg321。

**注意：**只有在实例启动后才能进行默认的通知选择。

###优先事项
要在排队的文本中立即发音，您有两种可能：

 - 放置“！”作为文本中的第一个字符，因此该文本将在当前文本之后立即发音。
 - 将true写入“tts.clearQueue”状态，队列将被清除。之后，您可以将新文本写入“tts.text”，但所有排队的文本都会被丢弃。

＃＃＃ 引擎
可以使用以下引擎值：

＃＃＃＃ 谷歌
 - **en** - 英文
 - **de** - Deutsch
 - **pl** - Polski
 - **ru** - Русский
 - **uk** - український
 -  **它**  -  Italiano
 - **es** - Espaniol
 - **fr** - Français

#### Yandex
 - **ru_YA：Yandex** - Русский
 - **ru_YA_CLOUD：Yandex Cloud** - Русский[Yandex.Cloud API生成OGG格式的文件。要在linux上播放ogg文件，应安装并选择系统播放器作为系统播放器]

####亚马逊polly通过云
 - **ru-RU_CLOUD_Female** - Русский - Татьяна
 - **ru-RU_CLOUD_Male** - Русский - Максим
 - **de-DE_CLOUD_Female** - Deutsch - Marlene
 - **de-DE_CLOUD_Male** - Deutsch - Hans
 - **en-US_CLOUD_Female** - en-US - 女性 - Salli
 - **en-US_CLOUD_Male** - en-US - 男 - Joey
 - **da-DK_CLOUD_Female** - da-DK - 女性 - 眼镜蛇
 - **da-DK_CLOUD_Male** - da-DK - 男 - Mads
 - **en-AU_CLOUD_Female** - en-AU - 女 - 妮可
 - **en-AU_CLOUD_Male** - en-AU - 男 - 罗素
 - **en-GB_CLOUD_Female_Amy** - en-GB - 女性 - 艾米
 - **en-GB_CLOUD_Male** - en-GB - 男 - Brian
 - **en-GB_CLOUD_Female_Emma** - en-GB - 女 - 艾玛
 - **en-GB-WLS_CLOUD_Female** - en-GB-WLS - 女性 - 格温妮丝
 - **en-GB-WLS_CLOUD_Male** - en-GB-WLS - 男性 - Geraint
 - **cy-GB_CLOUD_Female** - cy-GB - 女性 - 格温妮丝
 - **cy-GB_CLOUD_Male** - cy-GB - 男性 - Geraint
 - **en-IN_CLOUD_Female** - en-IN - 女性 - Raveena
 - **en-US_CLOUD_Male_Chipmunk** - en-US - 男性 - 花栗鼠
 - **en-US_CLOUD_Male_Eric** - en-US - 男 - Eric
 - **en-US_CLOUD_Female_Ivy** - en-US - 女性 - 常春藤
 - **en-US_CLOUD_Female_Jennifer** - en-US - 女性 - Jennifer
 - **en-US_CLOUD_Male_Justin** - en-US - 男 - 贾斯汀
 - **en-US_CLOUD_Female_Kendra** - en-US - 女性 - 肯德拉
 - **en-US_CLOUD_Female_Kimberly** - en-US - 女性 - 金佰利
 - **es-ES_CLOUD_Female** - es-ES - 女性 - Conchita
 - **es-ES_CLOUD_Male** - es-ES - 男 - 恩里克
 - **es-US_CLOUD_Female** - es-US - 女性 - 佩内洛普
 - **es-US_CLOUD_Male** - es-US - 男 - Miguel
 - **fr-CA_CLOUD_Female** - fr-CA - 女性 - Chantal
 - **fr-FR_CLOUD_Female** - fr-FR - 女性 - Celine
 - **fr-FR_CLOUD_Male** - fr-FR - 男 - Mathieu
 - **is-IS_CLOUD_Female** - is-IS - 女性 - 多拉
 - **is-IS_CLOUD_Male** - is-IS - 男 - 卡尔
 - **it-IT_CLOUD_Female** - it-IT - 女性 - Carla
 - **it-IT_CLOUD_Male** - it-IT - 男 - Giorgio
 - **nb-NO_CLOUD_Female** - nb-NO - 女性 - Liv
 - **nl-NL_CLOUD_Female** - nl-NL - 女 - 乐天
 - **nl-NL_CLOUD_Male** - nl-NL - 男 - 鲁本
 - **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - 女性 - Agnieszka
 - **pl-PL_CLOUD_Male_Jacek** - pl-PL - 男 - Jacek
 - **pl-PL_CLOUD_Female_Ewa** - pl-PL - 女性 - Ewa
 - **pl-PL_CLOUD_Male_Jan** - pl-PL - 男 - Jan
 - **pl-PL_CLOUD_Female** - pl-PL - 女性 - Maja
 - **pt-BR_CLOUD_Female** - pt-BR - 女性 - 维多利亚
 - **pt-BR_CLOUD_Male** - pt-BR - 男 - 里卡多
 - **pt-PT_CLOUD_Male** - pt-PT-男 - Cristiano
 - **pt-PT_CLOUD_Female** - pt-PT - 女 - Ines
 - **ro-RO_CLOUD_Female** - ro-RO - 女性 - 卡门
 - **sv-SE_CLOUD_Female** - sv-SE - 女性 - Astrid
 - **tr-TR_CLOUD_Female** - tr-TR - 女性 - Filiz

#### Pico TTS
 - **en-US** - Englisch US
 - **en-GB** - Englisch GB
 - **de-DE** - Deutsch
 - **it-IT** - Italiano
 - **es-ES** - Espaniol
 - **fr-FR** - Français

####亚马逊polly直接
 -  **（ru-RU_AP_Female）**  - Русский - Татьяна
 -  **（ru-RU_AP_Male）**  - Русский - Максим
 -  **（de-DE_AP_Female）**  -  Deutsch  -  Marlene
 -  **（de-DE_AP_Female_Vicki）**  -  Deutsch  -  Vicki
 -  **（de-DE_AP_Male）**  - 德意志 - 汉斯
 -  **（en-US_AP_Female）**  -  en-US  - 女性 -  Salli
 -  **（en-US_AP_Male）**  -  en-US  - 男 -  Joey
 -  **（da-DK_AP_Female）**  -  da-DK  - 女性 - 眼镜蛇
 -  **（da-DK_AP_Male）**  -  da-DK  - 男 -  Mads
 -  **（en-AU_AP_Female）**  -  en-AU  - 女 - 妮可
 -  **（en-AU_AP_Male）**  -  en-AU  - 男 - 罗素
 -  **（zh-CN_AP_Female_Amy）**  -  en-GB  - 女性 - 艾米
 -  **（en-GB_AP_Male）**  -  en-GB  - 男 -  Brian
 -  **（en-GB_AP_Female_Emma）**  -  en-GB  - 女性 - 艾玛
 -  **（zh-CN-WLS_AP_Female）**  -  en-GB-WLS  - 女性 - 格温妮丝
 -  **（zh-CN-WLS_AP_Male）**  -  en-GB-WLS  - 男性 -  Geraint
 -  **（cy-GB_AP_Female）**  -  cy-GB  - 女性 - 格温妮丝
 -  **（cy-GB_AP_Male）**  -  cy-GB  - 男性 -  Geraint
 -  **（en-IN_AP_Female）**  -  en-IN  - 女性 -  Raveena
 -  **（en-US_AP_Male_Chipmunk）**  -  en-US  - 男性 - 花栗鼠
 -  **（en-US_AP_Male_Eric）**  -  en-US  - 男 -  Eric
 -  **（en-US_AP_Female_Ivy）**  -  en-US  - 女性 - 常春藤
 -  **（en-US_AP_Female_Jennifer）**  -  en-US  - 女性 -  Jennifer
 -  **（en-US_AP_Male_Justin）**  -  en-US  - 男 - 贾斯汀
 -  **（en-US_AP_Female_Kendra）**  -  en-US  - 女性 - 肯德拉
 -  **（en-US_AP_Female_Kimberly）**  -  en-US  - 女性 - 金伯利
 -  **（es-ES_AP_Female）**  -  es-ES  - 女性 -  Conchita
 -  **（es-ES_AP_Male）**  -  es-ES  - 男 - 恩里克
 -  **（es-US_AP_Female）**  -  es-US  - 女性 - 佩内洛普
 -  **（es-US_AP_Male）**  -  es-US  - 男 -  Miguel
 -  **（fr-CA_AP_Female）**  -  fr-CA  - 女性 -  Chantal
 -  **（fr-FR_AP_Female）**  -  fr-FR  - 女性 -  Celine
 -  **（fr-FR_AP_Male）**  -  fr-FR  - 男 -  Mathieu
 -  **（is-IS_AP_Female）**  - 是 - 女 - 多拉
 -  **（is-IS_AP_Male）**  - 是 -  IS  - 男 - 卡尔
 -  **（it-IT_AP_Female）**  -  it-IT  - 女性 -  Carla
 -  **（it-IT_AP_Male）**  -  it-IT  - 男 -  Giorgio
 -  **（nb-NO_AP_Female）**  -  nb-NO  - 女 -  Liv
 -  **（nl-NL_AP_Female）**  -  nl-NL  - 女 - 乐天
 -  **（nl-NL_AP_Male）**  -  nl-NL  - 男 - 鲁本
 -  **（pl-PL_AP_Female_Agnieszka）**  -  pl-PL  - 女性 -  Agnieszka
 -  **（pl-PL_AP_Male_Jacek）**  -  pl-PL  - 男 -  Jacek
 -  **（pl-PL_AP_Female_Ewa）**  -  pl-PL  - 女性 -  Ewa
 -  **（pl-PL_AP_Male_Jan）**  -  pl-PL  - 男 -  Jan
 -  **（pl-PL_AP_Female）**  -  pl-PL  - 女性 -  Maja
 -  **（pt-BR_AP_Female）**  -  pt-BR  - 女性 - 维多利亚
 -  **（pt-BR_AP_Male）**  -  pt-BR  - 男 - 里卡多
 -  **（pt-PT_AP_Male）**  -  pt-PT-男 - 克里斯蒂亚诺
 -  **（pt-PT_AP_Female）**  -  pt-PT  - 女性 -  Ines
 -  **（ro-RO_AP_Female）**  -  ro-RO  - 女性 - 卡门
 -  **（sv-SE_AP_Female）**  -  sv-SE  - 女性 -  Astrid
 -  **（tr-TR_AP_Female）**  -  tr-TR  - 女性 - 菲利兹

## Changelog
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

Copyright (c) 2014-2019, bluefox <dogafox@gmail.com>

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