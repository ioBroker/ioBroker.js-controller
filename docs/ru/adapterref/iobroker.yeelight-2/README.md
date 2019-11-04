---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: wDWdWZngi4yY2tvEIk9nlPOBTlLqkwqMQfNSRCw9xlk=
---
![логотип](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Количество установок](http://iobroker.live/badges/yeelight-2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)
![Трэвис-CI](https://api.travis-ci.org/MeisterTR/ioBroker.yeelight-2.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.yeelight-2?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.yeelight-2.png?downloads=true)

# IoBroker.yeelight-2
=================

[Deutsche Beschreibung hier](README_de.md)

Этот адаптер управляет вашим устройством Yeelight. этот адаптер только для admin3. Admin2 не поддерживается

## Перейти к версии
При изменении с 0.4.X на 0.9.X или выше, объекты должны быть удалены вручную, чтобы их можно было воссоздать.

## Монтаж
для ламп RGB необходимо включить локальную сеть в настройках приложения yeelight.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Config
Вы можете добавить устройства вручную или найти устройства в сети. базовый порт 55443. если вы хотите, вы можете изменить имя, IP, порт и смарт-имя

### Smartname
если вы вводите смарт-имя, устройство добавляется в iobroker.cloud и может управлять alexa.

### Найти устройство
с помощью этой кнопки вы можете сканировать вашу сеть на наличие устройств, если что-то найдено, устройства добавляются в таблицу. Для сканирования сети требуется около 20 секунд. если устройства не найдены, режим Lan не включен или лампы находятся в другой сети.

## Set_scene
Использование: Этот метод используется для установки интеллектуального светодиода непосредственно в указанное состояние. Если интеллектуальный индикатор выключен, он сначала включит интеллектуальный индикатор, а затем подаст указанную команду.

Параметры: 3 ~ 4.

 "class" может быть "color", "hsv", "ct", "cf", "auto_dealy_off".

- «цвет» означает изменение интеллектуального светодиода на указанный цвет и

яркость.

- «hsv» означает изменение интеллектуального светодиода на указанный цвет и яркость.
- «ct» означает изменение интеллектуального светодиода на указанные ct и яркость.
- «cf» означает запуск цветового потока указанным способом.
- «auto_delay_off» означает включение интеллектуального светодиода для указанного

Яркость и запустить таймер сна, чтобы выключить свет через указанные минуты.

 «val1», «val2», «val3» относятся к классу.

Пример запроса:

- `` ["color", 65280, 70] ``
- `` ["hsv", 300, 70, 100] ``
- `` ["ct", 5400, 100] ``
- `` ["cf", 0,0, "500,1,255,100,1000,1,16776960,70"] ``
- `` ["auto_delay_off", 50, 5] ``

ПРИМЕЧАНИЕ. Принимается как во включенном, так и в выключенном состоянии.

 Для приведенных выше примеров:

 - Во-первых, установите цвет «652280» и яркость 70%.
 - Во-вторых, установить цветовой тон: 300, насыщенность: 70 и максимальная яркость.
 - Третий установлен CT на 500K и яркость 100%.
 - Четвертый - запустить бесконечный поток цветов на двух кортежах потока.
 - Пятый - включить свет до 50% яркости, а затем выключить

через 5 минут.

## Changelog
### 1.0.1 (2018-12-08)
* (MeisterTR) push version, added set_scene
### 0.9.6 (2018-12-08)
* (MeisterTR) yeelight-wifi added
* (MeisterTR) fixed  bugs
* (MeisterTR) add manuell light
* (MeisterTR) better error handling
* (MeisterTR) fixed reconnect at start
* (MeisterTR) delete object and smartname bug fixed
### 0.9.1 (2018-10-31)
* (MeisterTR) added offline detection, poll sates, cleanup
### 0.9.0 (2018-08-29)
* (MeisterTR) rebuild
### 0.4.1 (2018-08-29)
* (MeisterTR) fixed JSON error
### 0.4.0 (2018-08-29)
* (MeisterTR) fixed errors
* (MeisterTR) added scenen
### 0.3.6 (2018-07-07)
* (MeisterTR) catch spaces in config, small performance changes
### 0.3.5 (2018-06-18)
* (MeisterTR) added yeelight650, fixed some bugs, power on when ct change
### 0.2.9 (2018-06-07)
* (MeisterTR) change name for repo and npm
### 0.2.8 (2018-06-01)
* (MeisterTR) fixed bug wit port, fixed set ct by alexa
### 0.2.6 (2018-05-31)
* (MeisterTR) fixed manny bugs.
### 0.2.0 (2018-03-07)
* (MeisterTR) many changes add smartname Option, add manual devices, many fixes
* (MeisterTR) fix role for alexa
### 0.1.1 (2018-03-07)
* (MeisterTR)return to default value when turn on
* (MeisterTR)fix role for alexa
### 0.1.0 (2018-03-07)
* (MeisterTR) many changes, add hue and sat for alexa control
### 0.0.2 (2018-03-07)
* (MeisterTR) objects not overwirte after restart
### 0.0.2 (2018-03-07)
* (MeisterTR) testing added, log changed
### 0.0.1 (2018-01-29)
* (cahek2202) initinal version



base from: adb backup https://github.com/cahek2202/ioBroker.yeelight