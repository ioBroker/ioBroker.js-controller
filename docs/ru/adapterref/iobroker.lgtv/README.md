---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: e1vRRQd3Kvr7YBcscpRBGok3Apv+ZLAD2XhIHxpR73w=
---
![логотип](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![Количество установок](http://iobroker.live/badges/lgtv-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lgtv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)
![Трэвис-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/xx55hgsuff4fas47/branch/master?svg=true)

# IoBroker.lgtv
=================

LG WebOS SmartTV адаптер для ioBroker

Дистанционное управление LG WebOS SmartTV (модели 2013 года и выше) из [ioBroker](https://www.iobroker.net).

---

## Использование:
Установите адаптер через интерфейс администратора ioBroker.
В конфигурации адаптера введите IP-адрес вашего телевизора LG WebOS.
При первом подключении вы получите сообщение о сопряжении на экране телевизора, где вы должны разрешить подключение.

### Опрос
Некоторые телевизоры отключаются от сетевой розетки, когда телевизор выключен, и не сообщают об этом правильно адаптеру. Затем требуется дополнительный опрос. Вы можете определить время в настройках. Если значение пустое, адаптер пытается определить это автоматически: при перезапуске адаптера опрос (каждые 60 секунд) активен, пока не будет обнаружено первое правильное событие выключения телевизора.

## Некоторые примеры:
```setState('lgtv.0.states.popup', 'Some text!');```

Это покажет всплывающее окно с текстом "Некоторый текст!" на ТВ.
Вы можете использовать HTML разрывы строк (br) в тексте.

```setState('lgtv.0.states.turnOff', true);```

Выключаю телевизор.

```setState('lgtv.0.states.mute', true);```

Приглушить телевизор.

```setState('lgtv.0.states.mute', false);```

Включить звук телевизора.

```setState('lgtv.0.states.volumeUp', true);```

Это увеличит громкость телевизора.

```setState('lgtv.0.states.volumeDown', true);```

Уменьшение громкости телевизора.

```setState('lgtv.0.states.channelUp', true);```

Увеличение текущего телеканала.

```setState('lgtv.0.states.channelDown', true);```

Уменьшается текущий телеканал.

```setState('lgtv.0.states.3Dmode', true);```

Активирует режим 3D на телевизоре

```setState('lgtv.0.states.3Dmode', false);```

Деактивирует режим 3D на телевизоре.

```setState('lgtv.0.states.channel', 7);```

Переключение прямого эфира на канал № 7.

```setState('lgtv.0.states.launch', 'livetv');```

Переключение в режим Live TV.

```setState('lgtv.0.states.launch', 'smartshare');```

Открытие приложения SmartShare на телевизоре.

```setState('lgtv.0.states.launch', 'tvuserguide');```

Запускает приложение «Руководство пользователя телевизора» на телевизоре.

```setState('lgtv.0.states.launch', 'netflix');```

Открытие приложения Netflix на телевизоре.

```setState('lgtv.0.states.launch', 'youtube');```

Открывает приложение Youtube на телевизоре.

```setState('lgtv.0.states.launch', 'prime');```

Открывает приложение Amazon Prime по телевизору.

```setState('lgtv.0.states.launch', 'amazon');```

На некоторых телевизорах эта команда открывает приложение Amazon Prime.

```setState('lgtv.0.states.openURL', 'http://www.iobroker.net');```

Открывает веб-браузер на телевизоре и переходит на www.iobroker.net.
Может также использоваться для открытия изображений или видео (в браузере).

```setState('lgtv.0.states.input', 'av1');```

Переключает iput с телевизора на AV1.

```setState('lgtv.0.states.input', 'scart');```

Переключает iput с телевизора на Scart.

```setState('lgtv.0.states.input', 'component');```

Переключает входной сигнал телевизора на компонентный.

```setState('lgtv.0.states.input', 'hdmi1');```

Переключение входа телевизора на HDMI 1.

```setState('lgtv.0.states.input', 'hdmi2');```

Переключает входной сигнал телевизора на HDMI 2.

```setState('lgtv.0.states.input', 'hdmi3');```

Переключение входа телевизора на HDMI 3.

```setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');```

Воспроизвести видео с YouTube.

```setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');```

```setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');```

Отправка и ответ RAW команды API.

```setState('lgtv.0.remote.*KEY*', true);```

Отправить удаленный ключ к телевизору.

```setState('lgtv.0.states.power', true/false);```

Выключите телевизор и включите телевизор (TurnOn, работает только локальная сеть, используя WOL).

```setState('lgtv.0.states.soundOutput', 'external_arc');```

Переключите аудиовыход через ARC (HDMI).

---

## Состояния
канал

содержит текущий канал

объем

удерживает текущий уровень громкости и может изменить громкость

на

true, когда телевизор включен, и false, если телевизор выключен.

---

## Changelog
### 1.1.6 (2020-03-07)
* (dirkhe) make healthintervall configurable

### 1.1.5 (2020-02-25)
* (dirkhe) stable connection and subsciptions
* (dirkhe) add Polling for TV, which not support Power Off event 
* (dirkhe) change some states role switch to button

### 1.1.4 (2020-02-07)
* (dirkhe) changed from pull to subscribing
* (dirkhe) add livetv to launch list

### 1.1.3 (2019-12-16)
* (merdok) fixed connect() [Pull requests #62](https://github.com/SebastianSchultz/ioBroker.lgtv/pull/62) 
* (instalator) fixed [issues #64](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/64) 
* (instalator) change error log to debug [issues #59](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/59) 

### 1.1.1 (2019-10-26)
* (instalator) Safe keyfile to /opt/iobroker [issues #52](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/52) 
* (instalator) fix error reconect
* (instalator) fix raw object
* (instalator) add mac address to admin settings

### 1.1.0 (2019-10-10)
* (instalator) adding object remote.KEY
* (instalator) fix connect to TV
* (instalator) add subscribe volume and mute state
* (instalator) translate admin to RUS
* (instalator) add Turn On, using WOL
* (instalator) adding new different objects
* (SebastianSchultz) changed roles "button" to "switch" for compatibility for iot- & cloud-adapter

### 1.0.8 (2019-03-15)
* (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)
* (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)
* (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)
* (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)
* (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
* (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)
* (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
* (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)
* (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)
* (SebastianSchultz) added channel polling
* (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)
* (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)
* (SebastianSchultz) added volumeUp true|false
* (SebastianSchultz) added volumeDown true|false
* (SebastianSchultz) added 3Dmode true|false
* (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
* (SebastianSchultz) added channel <channelNumber>
* (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)
* (SebastianSchultz) removed reconnect function, not used
* (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)
* (SebastianSchultz) initial commit


---

## License

The MIT License (MIT)

Copyright (c) 2020 Sebastian Schultz.

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