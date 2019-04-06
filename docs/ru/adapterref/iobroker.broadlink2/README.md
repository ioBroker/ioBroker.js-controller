---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.broadlink2/README.md
title: ! [Logo] (./ admin / broadlink2.png) Управляет устройствами, совместимыми с BroadLink
hash: WTYq/WXAyxAsoH6tiIsBCs4yCcfe2WO0lK+6ud+WRQg=
---
# ![логотип](../../../en/adapterref/iobroker.broadlink2/./admin/broadlink2.png) Управляет устройствами, совместимыми с BroadLink

![Версия NPM](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![установлены](http://iobroker.live/badges/broadlink2-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Немецкое руководство - Deutsche Anleitung](README_DE.md)

## Адаптер для различных WLan-устройств, совместимых с Broadlink (RM ++, SP ++, A1, Floureon, S1C)
Это адаптер ioBroker для нескольких коммутаторов Broadlink, таких как RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus и некоторых продуктов OEM от них.
Также поддерживаются удаленные контроллеры, такие как RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 и RM2 Pro Plus BL. Несколько контроллеров будут генерировать свои собственные записи и должны быть обучены отдельно.
Он сканирует сеть, чтобы найти совместимые устройства и устанавливает их (в настоящее время только коммутаторы типа SP?).

Если вы изучили состояния для RM *, а затем переименовали их имя, идентификатор штата также изменится на новое имя!

Вы также можете создавать свои собственные новые команды в LearnedStates, если вы используете «code» + ваш код в качестве значения (с «CODE_» перед кодом или даже лучше (потому что оно останется, если вы переименуете состояние) добавьте поле «code» 'с помощью карандаша admin.object и поместите туда шестнадцатеричный код (без' CODE_ '!).

Адаптер имеет фиксированные состояния для отправки кодов с RM-устройств или для их изучения. Он также может отправлять отдельные сцены (действия на нескольких устройствах).

Если устройства, настроенные для определенного IP-адреса, не найдены снова, они будут помечены как «недоступные»! Если они подключены снова, они будут использоваться в обычном режиме.

Если устройство не отвечает в течение 5 минут подряд, оно установлено на недоступное. ***Устройства notReachable*** будут выдавать предупреждающее сообщение журнала при каждом x сканировании. После некоторых сканирований адаптер попытается снова найти их по тому же MAC-адресу.

Пожалуйста, удалите старые устройства из admin.objects, если вы удалите их навсегда или переименуете их в своем роутере!

### Заметка
Устройства SP1 не могут быть опрошены.

## Конфигурация
* Введите префикс сетевого адреса в конфигурации, который должен быть удален при создании имен устройств
* Введите количество секунд между опросами. В каждом опросе все устройства SP *, исключающие SP1, спрашивают, каково состояние коммутатора. Эту функцию можно отключить, установив задержку опроса на 0. На некоторых устройствах RM с показаниями температуры также будет обновляться температура.

## How-To выучить коды
* В объектах ioBroker вы можете найти "broadlink2. [Devicename] .Learn или LearnRF для устройств '+' типа".
* Для устройств RM (x) + (Plus) вы также получаете специальную кнопку RS-Sweep-Lear, которая может выучить больше устройств, чем на обычных 433 МГц.
* Установите для этого объекта значение true. (вы можете нажать на кнопку в представлении объекта)
* Теперь нажмите кнопку на пульте дистанционного управления в течение 30 секунд. в обычном режиме кратковременно нажимайте их, пока не научитесь.
* В RF-Sweep Learning необходимо сначала нажать кнопку на ~ 10 секунд, затем отпустить, а затем нажать еще раз на короткое время.
* Новый объект должен теперь появиться внутри объекта "broadlink. [N]. [Devicename] .LearnedState" с именем ">>> Rename learn @ YYYYMMDDTHHmmSS"
* Вы можете нажать на кнопку в представлении объекта, чтобы отправить код.
* Чтобы переименовать элемент, нажмите на имя (начиная с `_Rename_learned_`) и измените имя. Он не должен включать `,`, `.` или`; `, а также некоторые другие символы, они будут заменены на '_';

Также можно использовать коды из [RM-Bridge](http://rm-bridge.fun2code.de/).
Просто создайте объект (состояние, кнопка типа) со значением, в котором вы добавляете «CODE_» или с собственной записью `code` без «CODE_».

## Используйте сцены
* Сцены могут содержать идентификаторы или имена, а также числа, разделенные `,`. Обычно идентификаторы будут выполняться / отправляться с разницей во времени 100 мс, но если вам потребуется более длительная пауза между ними, вы можете записать число, которое отражает миллисекунды ожидания. Например, `SP: доза = 1, 1000, RM: your.L.StereoEin, 1000, RM: your.L.TVEin` включит беспроводной штекер с именем 'SP: доза', затем подождет одну секунду (фактически 1,1 секунды ), Включите стерео и через секунду телевизор. Вы также можете переключать устройства других адаптеров, например, `hm-rpc.0.MEQ1435726.1.STATE = true` включит это устройство Homematic! Состояния Boolsche можно переключать с помощью '= 1 / = on / = true / = ein', если вы оставите его без `=`, тогда он будет использовать true. Чтобы выключить устройство, вы заканчиваете его нажатием '= 0 / = false / = aus / = off', которое необходимо выключить!

## Использовать состояния
* Вы также можете создавать состояния для ваших устройств, которые объединяют команды включения и выключения в одно состояние, которое можно переключать как любое другое устройство.
* Вам нужно перечислить команды для включения и выключения состояния в отдельных столбцах, они могут быть несколькими, чтобы государство знало, когда ваше устройство включается / выключается любым из них.
* Если вы установите состояние on on или off onlöy, первая команда on / off будет отправлена
* Если присутствуют только команды, коммутатор отправит соответствующую команду с числовым значением -1, что означает, что он отправит первую команду, если получит `0`, вторую, если получит` 1`. Таким образом, вы можете моделировать несколько состояний в одном состоянии.
* Если вы используете только «+» в качестве команды выключения, вам нужно указать 10 команд, разделенных «,», которые отражают цифры «0-9» на пульте дистанционного управления. Затем вы можете отправить состояние, затем число, например, `123` (макс. 9999), и оно будет отправлять` 1`, `2` и` 3` с задержкой в 1/3 секунды между ними! Таким образом, вы можете установить, например, канал на телевизоре на «33», просто записав «TVchannel = 33», если название штата - «TVchannel».

## Использовать отправку сообщений на адаптер
Адаптер также понимает команды sendTo.

* `debug`:` sendTo ('broadlink2.0', 'debug', 'on') `(также 0,1, on, off, ein, aus, true, false) включит режим отладки.
* `get`:` sendTo ('broadlink2.0', 'get', 'RM2: RMPROPLUS.Tempera'` может запрашивать данные с устройства, например `{val: 29.9, ack: true, ts: 1505839335870, q: 0, от: 'system.adapter.broadlink2.0', lc: 1505839335870} `zurück
* `switch`: может включить или выключить плагин:` sendTo ('broadlink2.0', 'switch', 'SP: id вашего устройства = on') `
* `switch_on` /` switch_off`: sendTo ('broadlink2.0', 'switch_on', 'SP: идентификатор вашего устройства') `
* `send`:` sendTo ('broadlink2.0', 'send', 'RM: yourdev._Learn') `запустит обучение и` sendTo ('broadlink2.0', 'send', 'RM: yourdev.L .yourid ') `отправит код.
* `send_scene`:` sendTo ('broadlink2.0', 'send_scene', 'scene xxx') `würde den als message angegebenen Текст als Szene ausführen
* `send_code`:` sendTo ('broadlink2.0', 'send_code', 'RM: ваш remote.CODE_xxxxx') `würde den CODE_xxxx vom R: ваше имя senden.

## Floureon или Beok313 Термостаты
* Большинство данных может быть установлено, время может быть установлено путем записи чего-либо в `_setTime`; в этом случае время устройства будет установлено на системное время ioBroker. Это будет сделано автоматически также при запуске адператора.

## Конфигурировать дополнительные устройства dnew
* Вы можете добавить новые устройства, которые используют тот же протокол, добавив их с идентификатором устройства (в шестнадцатеричном или десятичном виде) и классом устройства (там перечислены (класс = A1, MP1, RM, RMP, S1C, SP1, SP2, SP3P, T1). Таким образом, вы можете добавить новый пульт, который адаптер обнаружит только как неизвестное устройство с шестнадцатеричным идентификатором 0x1234 в списке RM по 0x01234 = RMP.

## Переименовать устройства
* Устройства обычно получают имя своего сетевого хоста или комбинацию типа устройства, идентификатора и MAC-адреса в качестве имени с первыми 2 буквами типа с «:» впереди. Вы можете переименовать такое устройство с помощью `T1: BroadLink-OEM-T1-fa-83-7c = Beok313`, и в этом случае оригинальное имя не будет использоваться, но новое имя будет` Beok313`.

## Режим отладки
* Если вы добавите `!` В конец списка добавленных новых устройств (даже если оно пустое), вы можете установить адаптер в режим отладки, в котором будет записываться много дополнительной информации, даже если для него не установлено значение ' информационный режим в Admin.

## Известные вопросы
* Если вы узнаете один и тот же сигнал несколько раз, код может отличаться каждый раз. Это не может быть изменено.
* Иногда не находит устройства, если они не отвечают на поиск. Выполните повторное сканирование или перезапустите адаптер, чтобы перезапустить новый экземпляр.

## Важно / Wichtig
* Требуется узел> = V6

## Монтаж
с администратором ioBroker npm установите iobroker.broadlink2 или по адресу <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

### 2.0.0
* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed


### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

<<<<<<< HEAD
Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>
=======
Copyright (c) 2014-2019 Frank Joke <frankjoke@hotmail.com>
>>>>>>> 7aa61304cbc5059e752952ce3a494629cd151962

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