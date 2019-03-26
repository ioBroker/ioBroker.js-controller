---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.broadlink2/README.md
title: ! [Logo] (./ admin / broadlink.png) Steuert BroadLink IR / RF-Remotes und Schaltsteckdosen
hash: ojXJVWaPDij5W3jYFX3qBu8GsySY/rPG3ElGnBuLIqE=
---
# ![логотип](../../../en/adapterref/iobroker.broadlink2/./admin/broadlink.png) Steuert BroadLink IR / RF-Remotes und Schaltsteckdosen

![Версия NPM](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI Статус сборки](https://travis-ci.org/frankjoke/ioBroker.broadlink2.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/d2wwp0f02t512wp8?svg=true)
![NPM](https://nodei.co/npm/iobroker.broadlink2.png?downloads=true)

## Адаптер для расширенной работы Broadlink WLan-Geräte (RM ++, SP ++, A1)
Это адаптер ioBroker для нескольких коммутаторов Broadlink, таких как RM2, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus и некоторых продуктов OEM от них.
Также поддерживаются удаленные контроллеры, такие как RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 и RM2 Pro Plus BL. Несколько контроллеров будут генерировать свои собственные записи и должны быть обучены отдельно.
Он сканирует сеть, чтобы найти совместимые устройства и устанавливает их (в настоящее время только коммутаторы типа SP?).

Если вы изучили состояния для RM *, а затем переименовали их имя, идентификатор штата также изменится на новое имя!

Вы также можете создавать свои собственные новые команды в LearnedStates, если вы используете «code» + ваш код в качестве значения (с «CODE_» перед кодом или даже лучше (потому что оно останется, если вы переименуете состояние) добавьте поле «code» 'с помощью карандаша admin.object и поместите туда шестнадцатеричный код (без' CODE_ '!).

Адаптер имеет фиксированные состояния для отправки кодов с RM-устройств или для их изучения. Он также может отправлять отдельные сцены (действия на нескольких устройствах).

Если устройства, настроенные на определенном IP-адресе, не найдены снова, они будут помечены как notReachable! Если они подключены снова, они будут использоваться в обычном режиме.

Если устройство не отвечает 2 раза подряд, оно установлено как недоступное. ***Устройства notReachable*** будут выдавать предупреждающее сообщение журнала каждые 50 сканирований. После 10 сканирований адаптер попытается снова найти их по тому же IP, что и раньше. Если вы изменили IP, пожалуйста, сделайте повторное сканирование.

Пожалуйста, удалите устройства из admin.objects, если вы удалите их навсегда или переименуете их в своем роутере!

### Заметка
Устройства SP1 не могут быть опрошены.

* Этот адаптер основан на оригинальном адаптере Broadlink v0.1.1, который находится здесь: <https://github.com/hieblmedia/ioBroker.broadlink>

## Конфигурация
* Введите префикс сетевого адреса в конфигурации, который должен быть удален при создании имен устройств
* Введите количество секунд между опросами. В каждом опросе все устройства SP *, исключающие SP1, спрашивают, каково состояние коммутатора. Эту функцию можно отключить, установив задержку опроса на 0. На некоторых устройствах RM с показаниями температуры также будет обновляться температура.

## How-To выучить коды
* В объектах ioBroker вы можете найти "broadlink2. [Devicename] .Learn или LearnRF для устройств '+' типа".
* Для устройств RM (x) + (Plus) вы также получаете специальную кнопку RS-Sweep-Lear, которая может выучить больше устройств, чем на обычных 433 МГц.
* Установите для этого объекта значение true. (вы можете нажать на кнопку в представлении объекта)
* Теперь нажмите кнопку на пульте дистанционного управления в течение 30 секунд.
* Новый объект должен теперь появиться внутри объекта "broadlink. [N]. [Devicename] .LearnedState" с именем ">>> Rename learn @ YYYYMMDDTHHmmSS"
* Вы можете нажать на кнопку в представлении объекта, чтобы отправить код.
* Чтобы переименовать элемент, нажмите на имя (начиная с `>>>`) и измените имя. Он не должен включать `,`, `.` или`; `

Также можно использовать коды из [RM-Bridge](http://rm-bridge.fun2code.de/).
Просто создайте объект (состояние, кнопка типа) со значением, в котором вы добавляете «CODE_», или с собственной записью `code` без «CODE_».

## Используйте сцены
* Szenen bestehen aus ID's oder Zahlen mit `,` aneinandergereiht. Нормальный werden sie einfach im Abstand von 100ms hintereinander ausgelöst. Wird eine Zahl gefunden wird dort so viele ms gewartet bis zum nächsten Auslösen. Также `, SP: доза1, RM: your.L.StereoEin, 1000, RM: your.L.TVEin` würde die Steckdose einschalten, dann den Fernseher 1100ms nachher die Stereoanlage. Man kann auch Werte bei anderen (auch fremde) Государства в полном порядке: `hm-rpc.0.MEQ1435726.1.STATE` würde diesen einschalten! Übrigens, Bei boolschen Stateskann kann beim Einschalten das '= 1 / = on / = true / = ein' weggelassen werden da true der default-Wert ist. Beim Ausschalten был ein '= 0 / = false / = aus / = off' undbedingt notwendig!

## Использовать состояния
* Sie können заявляет, что это означает, что Signale einder ausgeschaltet werden.
* Damit geben sie den State-Namen and und die Signale (listem mit ',' getrennt) die das Gerät einschalten und auch solche die es ausschalten.
* Государства Вирда вирда дер Вирт дер Государства Гетсета. Das ist von Vorteil wenn mehrere Tasten ein Gerät einschalten (oder Ausschalten)
* Es kännen zum Ausschalten auch keine Signale gelistet werden dann werden die zum Einschalten verwendeten Werte in einer Liste
* wird als Aus-Signal nur '+' angegeben werden die Werte im Ein-Bereich (hoffentlich 10 Signale) также Zehnertastatur verwendet die Wete bis zu 9999 senden kann. Wenn dann der State mit Wert 123 beschrieben wird wird dann '1', '2' und dann '3' mit jewelils nach 1/3 Sekunde Verzögerung gesendet!

Die Liste muss mit dem 0-Befehl beginnen und mit dem 9-Befehl enden!

## Использовать отправку сообщений на адаптер
Der Adapter versteht jetzt auch 'sendTo' Kommandos.

* `debug`:` sendTo ('broadlink2.0', 'debug', 'on') `(es geht auch 0,1, on, off, ein, aus, true, false) würde debug einder ausschalten.
* `get`:` sendTo ('broadlink2.0', 'get', 'RM2: RMPROPLUS.Temperau`` kann der state von Werten abgefragt werden, man bekommt zB `{val: 29.9, ack: true, ts: 1505839335870 , q: 0, от: 'system.adapter.broadlink2.0', lc: 1505839335870} `zurück
* `switch`: schaltet Steckdose ein / aus je nach Текст:` sendTo ('broadlink2.0', 'switch', 'SP: идентификатор вашего устройства = on') `
* `switch_on` /` switch_off`: sendTo ('broadlink2.0', 'switch_on', 'SP: идентификатор вашего устройства') `
* `send`:` sendTo («broadlink2.0», «send», «RM: yourdev.Learn») .yourid ') `würde den code (oder eine Scene) senden.
* `send_scene`:` sendTo ('broadlink2.0', 'send_scene', 'scene xxx') `würde den als message angegebenen Текст als Szene ausführen
* `send_code`:` sendTo ('broadlink2.0', 'send_code', 'RM: ваш remote.CODE_xxxxx') `würde den CODE_xxxx vom R: ваше имя senden.

## Известные вопросы
* Если вы узнаете один и тот же сигнал несколько раз, код может отличаться каждый раз. Это не может быть изменено.
* Иногда не находит устройства, если они не отвечают на поиск. Выполните повторное сканирование или перезапустите адаптер, чтобы перезапустить новый экземпляр.

## Важно / Wichtig
* Требуется узел> = v4.2

## Монтаж
Mit ioBroker admin, npm install iobroker.broadlink2 oder von.

## Changelog

### 1.9.1
* added anothe RM Mini code

### 1.8.1
* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### 1.6.0

* Added RF learning for RM-Plus devices
* Changed Learn states to LearnRF and LearnIR to differentiate
* a lot of code change to improve error handling and renaming

### 1.5.3

* Added ***notReachable*** states to devices which can return values (SP,RM,A1)
* Added info when SP's are switched manually
* devices which are disconnected will be stated as such and reconeccted automatically

### 1.5.0

* Added ***Scenes*** um mehrere Befehle hintereinander auszuführen. Diese können aud Adapter.config angelegtr werden.
* Adapter verwendet kürzere Namen
* Adapter kann codes oder Szenen direkt als Befehl senden
* Adapter verwendet keine 'strings' mehr als button type

### 1.1.1

* Added ***NewDeviceScan***-Button um einen neuen scan zu veranlassen ohne den Adapter zu starten.
* Adapter lest sofort die Werte der Devices ein
* Problem solved which occured when multiple IP names were resolved by reverse-dns.

### 1.1.0

* Support for A1 devices added (thanks a lot to **blackrozes**)
* bug fix for SP?
* Receive and execute message from sendTo to broadlink2 implemented

### 1.0.3

* Renamed to ioBroker.broadlink2 on Git
* Bug fix on 1.0.1

### 1.0.0

* Added learned state renaming, just rename the name and the ID will be renamed as well.
* Added debugging with 'debug!' at beginning of IP suffix and you will see debug messages without setting Adapter to debug.

### 0.2.0

* Implemented SP2 switches and they are working to set them!
* Currently ONLY SP1 && SP2 (SP3?) are working, please test!
* Disabled RM? devices, no test available, ordered one for later re-implementation

### Todo for later revisions

## License

The MIT License (MIT)

Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>

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