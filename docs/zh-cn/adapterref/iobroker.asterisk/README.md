---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.asterisk/README.md
title: ioBroker Asterisk VoIP适配器
hash: H+/GtnFRdWUaR0uoJ4mzoeBUIoXKSQKmphpnfeqpC/0=
---
![商标](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Travis CI构建状态](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/asterisk-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![下载](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![NPM](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

#ioBroker Asterisk VoIP适配器
[德语手册/ Deutsche Anleitung](README_DE.md)

Asterisk适配器将文本消息转换为音频文件，然后通过VoIP通过VoIP调用您想要的任何电话号码并播放音频消息。

##安装/配置
Asterisk必须与您的voip提供商（如Telekom或Vodfone）或您的FritzBox连接拨打电话！请按照其中一个安装指南进行操作。

 - 配置[通过带有FritzBox的SIP的星号]（docs / SIP_FRITZBOX.md）（最简单的方法）
 - 配置[带有FriztBox的PJSIP星号]（docs / PJSIP_FRITZBOX.md）（pjsip比sip更现代）
 - 配置[星号通过PJSIP与Telekom作为提供商]（docs / PJSIP_TELEKOM.md）
 - 配置[Asterisk通过PJSIP与Sipgate作为提供者]（docs / PJSIP_SIPGATE.md）
 - 配置[ssh / scp]（docs / SSH.md）（ioBroker和星号在不同的服务器上运行）

##使用Asterisk
###使用带有对象/状态的Asterisk进行拨出
使用星号的最简单方法是通过ioBroker对象页面。在那里，在dialout参数下填写以下值：

*通话：按钮发起通话
* callerid：将显示被叫方的电话号码
* dtmf：被叫按下键盘上的数字
* telnr：要拨打的号码
* text：将播放给被叫方的文本

![iobroker_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

###使用带有对象/状态的Asterisk进行拨号
如果您将SIP提供程序（例如Fritzbox，Sipgate，...）和Asterisk配置配置为允许拨入呼叫，则可以设置以下参数

* callerid：称为asteriks的telephonenumber
* dtmf：呼叫者按下键盘上的数字
* text：将播放给调用者的文本

![iobroker_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

###使用带有javascript或blocky的Asterisk进行拨号
现在，您可以在javascript或blocky程序中使用适配器。

```sh
var number   = "040 666-7766";
var callerid = '040 123 999'; // optional, if not set anonymous call
var msg      = "Hello, this textmessage will be converted to audio";

// call telephone nummber 040 666-7766 and play text message as audio
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play mp3 audio file
// mp3 file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.mp3'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play gsm audio file
// gsm file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.gsm'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// Show entered DTMF code
on({ id: "asterisk.0.dialin.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

// Show entered DTMF code
on({ id: "asterisk.0.dialout.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

```

>您可以在sendTo拨号语句中使用以下参数：> - **言：**语言采用文本到语音（tts）功能。 （允许值：'DE'，'EN'，...默认为ioBroker系统语言）> -** repeat：**重复音频消息的次数（允许值1到n，默认为5）> - **先级：**如果您发送并行多个sendTo拨号语句，优先级最低的消息将首先发送（允许值1到n，默认值为1）> -** text：**将发送为的文本消息audio> - **timeout：**等待连接发生的超时（以毫秒为单位）（默认为60000毫秒）> -** async：**允许在不等待响应的情况下生成多个调用（允许值：false / true ，默认为false）> - **audiofile：**如果使用text参数。转换后的文本到音频将保存在audiofile中。如果音频文件存在，它将被覆盖。如果您不使用参数文本，将播放音频文件。
> -** callerid：**定义标识符（您的发件人电话号码）。如果缺少呼叫者，则转移的电话号码将是匿名的

##解决问题
如果您遇到星号问题，可以尝试在/ var / log / asterisk下的日志文件中查找内容。启动星号后，您可以在命令shell上使用asterisk -rvvvvvv调用asterisk进行调试。启动asterisk -rvvvvv后，您可以初始化iobroker的调用，看看会发生什么。

## Changelog

[Changelog](CHANGELOG.md)

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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