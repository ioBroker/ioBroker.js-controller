---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: N5iJnz+zMACr/jOpD4kKZSjgK6n51TAKFE52hRcrxjE=
---
![логотип](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![Количество установок](http://iobroker.live/badges/fhem-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fhem.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fhem.svg)
![NPM](https://nodei.co/npm/iobroker.fhem.png?downloads=true)

# IoBroker.fhem =================
Этот адаптер позволяет подключить FHEM к ioBroker.

Чтобы включить соединение, telnet должен быть включен в FHEM. Чтобы включить его (включено по умолчанию), проверьте следующие настройки в fhen.cfg:

```
define telnetPort telnet 7072 global
```

Точно такой же порт и IP-адрес хоста FHEM (или localhost, если FHEM и ioBroker работают на одном ПК) должны использоваться для настроек адаптера.

ioBroker отправляет в начале команду «jsonlist2», чтобы получить все «Показания» из списка.

## Поддерживаемые устройства
Обычно все устройства поддерживаются. Но некоторые из них лучше интегрированы.

Проблемы возникают особенно при контроле штатов.
Поскольку нет четкой структуры атрибутов, ioBroker пытается угадать, какие поля «Возможные наборы» можно использовать.
На самом деле поддерживаются только следующие атрибуты:

- RGB: если RGB существует в *возможном наборе* и *чтениях* он будет объединен в одно состояние, которое может быть прочитано и записано. Значения типа `` `# 234567``` будут автоматически преобразованы в` `` 234567```.
- состояние выключено: если **включено** и **выключено** существует в *Возможные наборы* и **состояние** в *Показания* оно будет объединено во включенное состояние под именем **состояние** Им можно управлять с помощью true и false, и команды будут изменены на `` `set DEVICE on``` и` `` set DEVICE off```.

## Особенности и использование
* Если комната «ioBroker» существует в FHEM, будут синхронизированы только эти объекты
* После синхронизации FHEM неиспользуемые объекты будут автоматически удалены.
* Внутренние элементы, такие как TYPE, NAME, PORT, имя производителя, modelid, swversion будут синхронизированы (role = value.xxx)
* Атрибуты, такие как комната, псевдоним, отключение, комментарий будут синхронизированы, и можно редактировать атрибуты в ioBroker. (Роль = state.xxx)
* Установите роль и другое во время синхронизации
  * Показания xxx с любыми возможными наборами будут установлены role = state.xxx
  * Показания xxx без возможных наборов будут установлены role = value.xxx
  * Показания xxx с возможными наборами "noArg" будут установлены role = button.xxx
  * Показания xxx с «ползунком» возможных наборов будут установлены role = level.xxx, min = ползунок (min), max = ползунок (max)
  * Показания «требуемая температура» будут установлены: роль = уровень. Температура, минимум = 5, максимум = 35, единица измерения = °C.
  * Показания "pct, яркость, затемнение" будут установлены role = level.dimmer, min = 0, max = 100, unit =%
  * Показания "Volume, volume, GroupVolume" будут установлены role = level.volume, min = 0, max = 100, unit =%
  * Показания "GroupVolume" будут установлены role = level.volume.group, min = 0, max = 100, unit =%
* SmartName для Cloud Adapter будет установлен автоматически с псевдонимом или именем (только fhem.0 и объекты с role = level.temperam, level.dim, level.volume)

## Changelog
### 1.1.0 (2018-10-22)
* (LausiD) Big changes

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2018 bluefox <dogafox@gmail.com>

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