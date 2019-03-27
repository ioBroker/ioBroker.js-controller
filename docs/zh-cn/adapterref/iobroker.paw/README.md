---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.paw/README.md
title: ioBroker.paw 2 BETA
hash: nKYrj5A/bzAI2th1osxbRj0Ds552M9TpehrhgHk376Y=
---
![商标](../../../en/adapterref/iobroker.paw/admin/paw.png)

![安装数量](http://iobroker.live/badges/paw-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.paw.svg)
![下载](https://img.shields.io/npm/dm/iobroker.paw.svg)
![NPM](https://nodei.co/npm/iobroker.paw.png?downloads=true)

#ioBroker.paw 2 BETA
=================

##说明
它是一个控制Android设备的适配器。
它可以说文本，控制音量，拨打电话，振动等等......
Tasker和Locale插件支持。

##安装程序并配置适配器。
> !!!不要忘记使用应用程序更新适配器。如果您使用旧版本，可能会发生错误。

<a href="https://play.google.com/store/apps/details?id=ru.codedevice.iobrokerpawii" target="_blank"><img alt="在Google Play上获取它" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" height="60"/></a>

![截图](../../../en/adapterref/iobroker.paw/admin/img/Picture_for_description.jpg)

![截图](../../../en/adapterref/iobroker.paw/admin/img/Screenshot_1.jpg)

##对象
[name_device]  - 名称设备

对于每个设备，创建两个主要对象分支：

*** paw.0。[name_device] .info。***  - 有关设备的信息*** paw.0。[name_device] .comm。***  - 控制命令

所有设备都有一个分支：*** paw.0.all_device。***  - 所有设备的控制命令

*** paw.0。[name_device] .comm.audio.alarm *** *** paw.0。[name_device] .comm.audio.music *** *** paw.0。[name_device] .comm .audio.notification *** *** paw.0。[name_device] .comm.audio.ring *** *** paw.0。[name_device] .comm.audio.system *** *** paw。 0. [name_device] .comm.audio.voice ***>设置设备上的音量[编号]

*** paw.0。[name_device] .comm.call.number ***>拨打号码[号码]

*** paw.0。[name_device] .comm.call.end ***>拒绝调用[boolean]

*** paw.0。[name_device] .comm.display.brightness ***>背光亮度等级从4到100 [数字]

*** paw.0。[name_device] .comm.display.mode ***>背光类型自动或手动[布尔]

*** paw.0。[name_device] .comm.display.toWake ***>从睡眠中唤醒设备[boolean]

*** paw.0。[name_device] .comm.display.turnOnOff ***>打开屏幕[boolean]

*** paw.0。[name_device] .comm.display.timeOff ***>设置背光时间[数字]（秒）

*** paw.0。[name_device] .comm.other.home ***>转到主屏幕[布尔]

*** paw.0。[name_device] .comm.other.openURL ***>在浏览器中打开网址[string]

*** paw.0。[name_device] .comm.other.play ***>播放通知旋律[boolean]

*** paw.0。[name_device] .comm.other.vibrate ***>启用振动，以秒为单位的时间[编号]

*** paw.0。[name_device] .comm.tts.request ***>发送文字到语音[string]

*** paw.0。[name_device] .comm.tts.stop ***>停止发言[布尔]

![截图](../../../en/adapterref/iobroker.paw/admin/img/Screenshot_2.jpg)

## Javascript的命令
```javascript


// [dev1] - is the name of the device, you can also enter IP devices.
// You can specify multiple devices separated by commas 'dev1, dev3, 192.168.1.71'
// all - send to all devices.


// send the text to the speech synthesizer.
sendTo("paw.0",'dev1,dev3',{tts:  'Hello World'});

// with callback
sendTo("paw.0",'all',{
    tts:  'Hello World'},function (res){
    log(JSON.stringify(res));
});

// set the screen backlight time in seconds. '0' - do not quit the screen (does not work on all devices)
sendTo("paw.0",'dev1',{timeOff: '60'});

// activate the screen on the device.
sendTo("paw.0",'all',{turnOnOff:'true'});

// backlight brightness level from 4-100
sendTo("paw.0",'dev1',{brightness: '50'});

// execute shell command (need root)
// "input tap x y" emulates a click on the screen x - coordinates along the mountains. Y - vertical coordinates.
// "poweroff -f" turn off devices
// "reboot" reboot device
sendTo("paw.0",'all',{exec:'input tap 100 100'});

// Exit to home screen. Emulate pressing the HOME button.
sendTo("paw.0",'all',{home:'true'});

// disable battery tracking, translates 0% (need root)
sendTo("paw.0",'dev1',{send:'battery_off'});

// run the application. You can enter a package name 'ru.codedevice.iobrokerpawii' or title name 'ioBroker.PAW II'
sendTo("paw.0",'all',{startApp:'lcf.clock'});

// get the list of installed applications.
sendTo("paw.0",'dev1',{
    apps:  'installed'  // or apps: 'all'  - get all applications
},function (res){
    log(JSON.stringify(res));
});

// !!! Not working yet

// send message.
//sendTo("paw.0",'dev1',{message: '8123456789',text:  'Any text'});
//
//sendTo("paw.0",'192.168.1.71',{
//    message: '8123456789',
//    text:  'Any text'
//},function (res){
//    log(JSON.stringify(response));
//});


// setting the volume from 0 to 15, the maximum volume is set by the system,
sendTo("paw.0",'dev1',{volume: 5});

// call to number
sendTo("paw.0",'192.168.1.71',{call: '0611'});

// play default sound notifications
sendTo("paw.0",'all',{play: true});

// call the number or send ussd command.
sendTo("paw.0",'dev1',{call: '*100#'});

// enables vibration, [number] (time in milliseconds)
sendTo("paw.0",'dev1',{vibrate: '1000'});

// send notifications to devices
sendTo("paw.0",'all',{
    noti:  'Any text',       // text notifications
    title: 'Title',          //optional (default: Title)
    info: 'Any text',        //optional (default: '')
    vibrate:false,           //optional (default: false)  only works on SDK <= 26
    sound:false,             //optional (default: false)  only works on SDK <= 26
    light:true,              //optional (default: false)  only works on SDK <= 26
    id:2,                    //optional (default: id++)
    channel:'Notification_2' //optional (default: 'Notification') Notification profile name, only works on SDK >= 26

},function(res){
     log(JSON.stringify(res));
});

// send alert dialog to devices.
sendTo("paw.0",'all',{
    alert:  'Any text', // text notifications
    id:'alert1',        // id alert, need to respone. respone = {"id":"alert1","state":"Maybe"}
    title: 'Title',     //optional (default: Title)
    positive: 'Yes',    //optional (default: '')
    neutral: 'Maybe',   //optional (default: '')
    negative: 'No' ,    //optional (default: '')
    sound:true          //optional (default: false)
},function(res){
     log(JSON.stringify(res));
});

// open the browser at the specified address
sendTo("paw.0",'dev1',{link: 'http://iobroker.net'});

// end call
sendTo("paw.0",'dev1',{callEnd: 'true'});

// get list Notification Sounds
sendTo("paw.0",'dev1',{listNotificationSounds: 'true'});

// get list Notification Sounds
sendTo("paw.0",'dev1',{
  listNotificationSounds: 'true'
},function(res){
     log(JSON.stringify(res));

// [[{"uri":"content://media/internal/audio/media/14","title":"Beep once"},
// {"uri":"content://media/internal/audio/media/62","title":"Beep once"},
// {"uri":"content://media/internal/audio/media/29","title":"Whistle"}]]
});

// set sounds notification
sendTo("paw.0",'dev1',{sound: 'content://media/internal/audio/media/62'});


/*******  Tasker  *******/

// Attention!!! Enable in settings Tasker "Allow external access"

// Get the task list from the Tasker application "tasks": [auto, bubble, call, clock]
sendTo("paw.0",'dev1',{
    taskerList:  'tasker'
},function (res){
    log(JSON.stringify(res));
});

// Run the task from the Tasker application.
sendTo("paw.0",'dev2',{
    tasker : 'task_name',        // Name task
    myKeyOne : 123,              // (Optional) parameter will be passed to the variable %myKeyOne
    myKeyTwo : "Hello World",    // (Optional) parameter will be passed to the variable %myKeyTwo
                                 // ... and so on
},function (res){
    log(JSON.stringify(res));
});



```

### 0.3.1
*（bondrogeen）（适配器）次要修复。 （app）添加了小部件和扩展项功能

#### 0.3.0
*（foxriver76）增加了紧凑模式兼容性

#### 0.2.8
*（bondrogeen）minore修复应用项目，映射SDK> = 29并更改添加设备。

#### 0.2.7
*（bondrogeen）修复警报对话框，noti SDK> = 26 app

#### 0.2.6
*（bondrogeen）次要修复适配器和应用程序

#### 0.2.5
*（bondrogeen）npm发布

#### 0.2.3
*（bondrogeen）小修复应用程序

#### 0.2.2
*（bondrogeen）次要修复，添加项目反馈

#### 0.2.1
*（bondrogeen）发布应用

#### 0.2.0
*（bondrogeen）初始发布

## License
The MIT License (MIT)

Copyright (c) 2017 bondrogeen <bondrogeen@gmail.com>

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