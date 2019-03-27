---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.paw/README.md
title: ioBroker.paw 2 БЕТА
hash: nKYrj5A/bzAI2th1osxbRj0Ds552M9TpehrhgHk376Y=
---
![логотип](../../../en/adapterref/iobroker.paw/admin/paw.png)

![Количество установок](http://iobroker.live/badges/paw-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.paw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.paw.svg)
![NPM](https://nodei.co/npm/iobroker.paw.png?downloads=true)

# IoBroker.paw 2 BETA
=================

## Описание
Это адаптер для управления устройствами Android.
Он может говорить тексты, контролировать громкость, совершать звонки, вибрировать и многое другое ...
Поддержка плагинов Tasker и Locale.

## Установите программу и настройте адаптер.
> !!! Не забудьте обновить адаптер с приложением. Если вы используете старую версию, могут возникнуть ошибки.

<a href="https://play.google.com/store/apps/details?id=ru.codedevice.iobrokerpawii" target="_blank"><img alt="Получить его в Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" height="60"/></a>

![Скриншот](../../../en/adapterref/iobroker.paw/admin/img/Picture_for_description.jpg)

![Скриншот](../../../en/adapterref/iobroker.paw/admin/img/Screenshot_1.jpg)

## Объект
[name_device] - имя устройства

Для каждого устройства создаются две основные ветви объекта:

*** paw.0. [name_device] .info. *** - информация об устройстве *** paw.0. [name_device] .comm. *** - управляющие команды

Также есть ветка для всех устройств: ***paw.0.all_device.*** - управляющие команды для всех устройств

*** paw.0. [name_device] .comm.audio.alarm *** *** paw.0. [name_device] .comm.audio.music *** *** paw.0. [name_device] .comm .audio.notification *** *** paw.0. [name_device] .comm.audio.ring *** *** paw.0. [name_device] .comm.audio.system *** *** paw. 0. [name_device] .comm.audio.voice ***> Установить громкость на устройстве [номер]

*** paw.0. [name_device] .comm.call.number ***> Позвонить по номеру [номер]

*** paw.0. [name_device] .comm.call.end ***> Отклонить вызов [логический]

*** paw.0. [name_device] .comm.display.brightness ***> Уровень яркости подсветки от 4 до 100 [число]

*** paw.0. [name_device] .comm.display.mode ***> Тип подсветки автоматический или ручной [логический]

*** paw.0. [name_device] .comm.display.toWake ***> Пробуждение устройств из спящего режима [логическое значение]

*** paw.0. [name_device] .comm.display.turnOnOff ***> Включить экран [логическое значение]

*** paw.0. [name_device] .comm.display.timeOff ***> Установить время подсветки [число] (сек)

*** paw.0. [name_device] .comm.other.home ***> Перейти на главный экран [логическое значение]

*** paw.0. [name_device] .comm.other.openURL ***> Открыть URL в браузере [строка]

*** paw.0. [name_device] .comm.other.play ***> Воспроизвести мелодию уведомления [логическое значение]

*** paw.0. [name_device] .comm.other.vibrate ***> Включить вибрацию, время в секундах [число]

*** paw.0. [name_device] .comm.tts.request ***> Отправить текст в речь [строка]

*** paw.0. [name_device] .comm.tts.stop ***> Остановить речь [логическое значение]

![Скриншот](../../../en/adapterref/iobroker.paw/admin/img/Screenshot_2.jpg)

## Команды для JavaScript
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
* (bondrogeen) (адаптер) Незначительные исправления. (приложение) добавлен виджет и расширены функциональные возможности

#### 0.3.0
* (foxriver76) добавлена совместимость в компактном режиме

#### 0.2.8
* (bondrogeen) незначительное исправление предмета приложения, карта SDK> = 29 и измененное добавление устройства.

#### 0.2.7
* (bondrogeen) диалоговое окно исправлений, приложение noti SDK> = 26

#### 0.2.6
* (bondrogeen) незначительное исправление адаптер и приложение

#### 0.2.5
* (bondrogeen) npm опубликовать

#### 0.2.3
* (bondrogeen) приложение для мелких исправлений

#### 0.2.2
* (bondrogeen) незначительное исправление, добавить отзыв о товаре

#### 0.2.1
* (Bondrogeen) релиз приложение

#### 0.2.0
* (bondrogeen) первоначальный выпуск

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