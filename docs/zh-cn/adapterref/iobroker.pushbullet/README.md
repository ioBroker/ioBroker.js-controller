---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pushbullet/README.md
title: 无题
hash: kJ0zgTEjLANl9bgHFl4Jz+xj3LlmAK61u53V7xo7Sjo=
---
![商标](../../../en/adapterref/iobroker.pushbullet/admin/pushbullet.png)ioBrokerpushbullet适配器==============

从ioBroker发送pushbullet通知。
此适配器主要基于bluefox的ioBroker Pushover Adapter。

### 0.0.11（2015-10-11）
*（Jens1809）Man kann nun Pushnachrichten一个bestimmteGeräteschickenindem mandieGeräteIDmitangibt。
* sendTo（“pushbullet”，{

message：“message body”，//要发送标题的消息：“title”，//消息类型的标题：“note”，//类型注释接收者：“ID hier einsetzen”//GeräteID}） ;

### 0.0.8（2015-09-26）
*（Jens1809）适配器empfängtun推Nachrichten und schreibt die Daten der Nachricht in die Objekte：
*  -  pushbullet.0.push.type
   -  pushbullet.0.push.title
   -  pushbullet.0.push.message
   -  pushbullet.0.push.payload

### 0.0.7（2015-09-24）
*（Jens1809）MöglichkeitaususwählteGerätezusenden ohne an den kompletten Account zu senden。

### 0.0.6（2015-07-25）
*（Jens1809）在NPM上发布

##安装
```npm install https://github.com/Jens1809/iobroker.pushbullet/tarball/master/```

##配置
##用法
要从ScriptEngine发送通知，只需写：

```javascript
// send note
sendTo("pushbullet", "message body");

//OR

sendTo("pushbullet", {
    message: "message body",    //The Message you want to send
    title: "title",             //The Title of your message
    type: "note"                //Type Note
});

// send link
sendTo("pushbullet", {
    link: "http://www.example.com", //The Link you want to send
    title: "Title",             //The Title of your link
    type: "link"                //Type link
});

// send file

sendTo("pushbullet", {
    file: "/path/to/file",  //The file you want to send
    title: "Title",         //The Title of your file
    type: "file"            //Type file
});

```

## License

The MIT License (MIT)

Copyright (c) 2015 Jens1809

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