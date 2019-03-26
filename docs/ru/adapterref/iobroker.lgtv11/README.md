---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lgtv11/README.md
title: ioBroker.lgtv11
hash: fUNqRBv5qACrw27zBNd33tLdtC19BbCGNUAOTk6m4MA=
---
![логотип](../../../en/adapterref/iobroker.lgtv11/admin/lgtv2011.png)

![Количество установок](http://iobroker.live/badges/lgtv11-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lgtv11.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lgtv11.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv11.png?downloads=true)
![Трэвис-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv11.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/fwlpfd33mafbivcm/branch/master?svg=true)

# IoBroker.lgtv11 =================
LG WebOS SmartTV адаптер для ioBroker

Дистанционное управление LG WebOS SmartTV (модели 2011 года до WebOS) из [ioBroker](https://www.iobroker.net).

---

## Использование:
1.) Установите адаптер через интерфейс администратора ioBroker.

2.) В конфигурации адаптера введите IP-адрес вашего телевизора LG WebOS.

3.) Запустите адаптер

4.) Откройте конфигурацию адаптера, щелкнув «запросить ключ сопряжения».

5.) Вставьте ключ сопряжения, показанный на экране телевизора, в конфигурацию адаптера.

6.) Перезагрузите адаптер.

## Некоторые примеры:
```setState('lgtv.0.turnOff', true);```

Выключаю телевизор.

```setState('lgtv.0.back', true);```

Идет назад.

```setState('lgtv.0.mute', true);```

Приглушить телевизор.

```setState('lgtv.0.mute', false);```

Включить звук телевизора.

```setState('lgtv.0.volumeUp', true);```

Это увеличит громкость телевизора.

```setState('lgtv.0.volumeDown', true);```

Уменьшение громкости телевизора.

```setState('lgtv.0.channelUp', true);```

Увеличение текущего телеканала.

```setState('lgtv.0.channelDown', true);```

Снижение текущего телеканала.

```setState('lgtv.0.3Dmode', true);```

Активирует режим 3D на телевизоре

```setState('lgtv.0.3Dmode', false);```

Деактивирует режим 3D на телевизоре.

```setState('lgtv.0.input', true);```

Откройте список ввода, чтобы переключиться на.

---

## Changelog

### 1.0.5 (2019-01-21)
* (SebastianSchultz) Added compact mode

### 1.0.4 (2018-05-08)
* (SebastianSchultz) Added "back" command/state

### 1.0.3 (2018-04-27)
* (SebastianSchultz) Fixed a bug in Admin interface that no pairing key could be requested

### 1.0.2 (2018-04-18)
* (SebastianSchultz) Renamed from ioBroker.lgtv2011 to ioBroker.lgtv11

### 1.0.1 (2018-04-17)
* (SebastianSchultz) Code clean up

### 1.0.0 (2018-04-15)
* (SebastianSchultz) Initial Release


---

## License

The MIT License (MIT)

Copyright (c) 2019 Sebastian Schultz.

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