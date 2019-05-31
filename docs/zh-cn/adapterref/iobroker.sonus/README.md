---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonus/README.md
title: ioBroker.sonus
hash: f/UNNn9ThmG+ZNMzYnqolr5P5GUUFagnCxNbFzENobU=
---
![商标](../../../en/adapterref/iobroker.sonus/admin/sonus.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.sonus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonus.svg)
![依赖状态](https://img.shields.io/david/GermanBluefox/iobroker.sonus.svg)
![已知的漏洞](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sonus.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.sonus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/GermanBluefox/ioBroker.sonus?branch=master&svg=true)

＃ioBroker.sonus
适用于ioBroker的## sonus适配器
使用此适配器，您可以使用多种语言的语音控制ioBroker。

它使用开源软件包snowboy来检测热门词汇和谷歌语音服务，将录制的语音转换为文本。
热记录后仅5秒钟。

##在linux上安装
要编译snowboy（在安装此适配器之前），您需要一些Linux软件包，可以按如下方式安装：

```
sudo apt-get install libmagic-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install build-essential
sudo apt-get install sox libsox-fmt-all
```

###检查麦克风
要获得良好的识别质量，您需要一个好的麦克
我用[UMA-8 USB麦克风阵列](https://www.minidsp.com/products/usb-audio-interface/uma-8-microphone-array)测试了它。

列出所有记录设备：

``` arecord -l```

如果您有额外的micro，则必须设置默认麦克风：

```
**** List of CAPTURE Hardware Devices ****
card 1: SpkUAC20 [miniDSP VocalFusion Spk (UAC2.0], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

编辑`/usr/share/alsa/alsa.conf`并将`defaults.pcm.card 0`替换为`defaults.pcm.card 1`，因为在示例中卡1上有麦克风。

您可以使用`rec test.wav`测试麦克风。

### Google凭据
对于检测到热词后的文本识别，此适配器使用谷歌语音API。要启用它，您必须获得自己的凭据并将其作为JSON粘贴到配置中。

该指令可在此处找到：[https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library](https://www.npmjs.com/package/@google-cloud/speech#using-the -client-library）或[这里](https://github.com/googleapis/nodejs-speech#using-the-client-library)

Google JSON文件如下所示：

```
{
  "type": "service_account",
  "project_id": "ыаыаыаыва",
  "private_key_id": "ун457567565",
  "private_key": "-----BEGIN PRIVATE KEY-----\шукгншугкнеушеуке\n-----END PRIVATE KEY-----\n",
  "client_email": "рапрарапрапр.iam.gserviceaccount.com",
  "client_id": "апрапрарапрапр",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/аапрарарапрапра.iam.gserviceaccount.com"
}
```

只需将整个复制的文本插入到iobroker配置中。

###拥有热词
默认热门词是`snowboy`或`sonus`，但您可以在此处创建自己的“热词”模型[https://snowboy.kitt.ai/hotword/](https://snowboy.kitt.ai/hotword/)并将其上传到适配器。

##如何解析文本
 通常有两种方法可以解析文本并触发命令：

  -  text2command
  -  javascript

### Text2command
您可以在text2命令中设置触发词，因为您必须在配置中选择text2command实例。

### Javascript
编写一个脚本来解析sonus.X.data.detected中出现的文本，其中X是sonus适配器的实例。

脚本应该像这样：

```
on({id: 'sonus.0.data.detected', change: 'any'), obj => {
    console.log('Detected words: ' + obj.state.val);
    let command = '';
    if (obj.state.val.match(/on|ein/)) {
        command = true;
    } else if (obj.state.val.match(/off|aus/)) {
        command = false;
    }

    if (command === '') {
        console.log('Cannot detect command');
    } else {
        if (obj.state.val.match(/light|backlight/) && obj.state.val.match(/living/)) {
            setState('hm-rpc.0.Q92837293.1.STATE'/* Living room light */, command);
        } else {
            console.log('Cannot detect room or function');
        }
    }
});
```

## Changelog


### 0.1.1 (2019-05-24)
* (bluefox) added sensitivity parameter

### 0.1.0 (2019-05-20)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.