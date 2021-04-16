---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: vIxnJU5+4gRaAdEznofPvvebwkka4SysNVbqfTkSZAU=
---
![Логотип](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![Количество установок](http://iobroker.live/badges/sma-em-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![Тесты](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

# IoBroker.sma-em
### Информация
Этот адаптер считывает информацию из SMA Energy Meter и Sunny Home Manager 2.
Он поддерживает протокол SMA-EMETER-2.

SMA Energy Meter и Sunny Home Manager 2 рассылают многоадресные датаграммы с данными измерений энергии в сеть каждую секунду.
Адаптер SMA Energy Meter Adapter получает эти многоадресные сообщения и сохраняет их как состояния iobroker.
Один экземпляр SMA Energy Meter Adapter обнаруживает все SMA Energy Meters и Sunny Home Managers во всех подключенных сетях.

![состояния](../../../en/adapterref/iobroker.sma-em/docs/en/img/overview.png)

### Состояния в нерасширенном режиме
- Мгновенные значения общей потребляемой активной мощности (pregard) и потребляемой активной мощности (psurplus)
- Показания счетчика энергии общего потребления активной мощности (pregardcounter) и подачи активной мощности (psurpluscounter)
- Счетчик времени SMA, отметка времени последнего полученного сообщения,
- Серийный номер, SUSyID, версия программного обеспечения SMA Energy Meter и Sunny Home Manager
- Подробные значения для каждой из отдельных фаз L1 / L2 / L3 (необязательно):
  - Мгновенные значения потребляемой активной мощности (pregard) и подачи активной мощности (psurplus) на фазу
  - Показания счетчика энергии активной мощности (pregardcounter) и подачи активной мощности (psurpluscounter) по фазе

### Состояния в расширенном режиме
Помимо состояний в нерасширенном режиме, в расширенном режиме доступны следующие значения

- Мгновенные значения общей потребляемой реактивной мощности (qregard) и подводимой реактивной мощности (qsurplus)
- Показания счетчика энергии общего потребления реактивной мощности (qregardcounter) и подачи реактивной мощности (qsurpluscounter)
- Мгновенные значения полной полной потребляемой мощности (sregard) и полной потребляемой мощности (ssurplus)
- Значения счетчика энергии полной полной потребляемой мощности (sregardcounter) и полной потребляемой мощности (ssurpluscounter)
- cosphi (коэффициент мощности)
- частота сети (доступно только с Sunny Home Manager 2, SMA Energy Meter в настоящее время не предоставляет никаких значений частоты сети)
- Подробно для каждой из отдельных фаз L1 / L2 / L3 (необязательно):
  - Мгновенные значения реактивной и полной потребляемой мощности / подачи на фазу
  - Показания счетчика энергии реактивной и полной потребляемой мощности / подачи по фазе
  - Напряжение и сила тока на фазу

### Параметры конфигурации
![Настройки](../../../en/adapterref/iobroker.sma-em/docs/en/img/adminpage.png)

- Multicast IP: значение по умолчанию - 239.12.255.254.
- Порт многоадресной рассылки: значение по умолчанию для порта UDP - 9522.

  (Оба не следует изменять, поскольку устройства SMA всегда используют этот IP-адрес и порт)

- Подробности L1 - L3: эти параметры выбора можно использовать для отображения подробностей каждой фазы.
- Расширенный режим: предоставляет более подробную информацию, такую как реактивная мощность, полная мощность, cosphi, частота сети, напряжение, сила тока.

  (Не настраивайте детали L1-L3 и расширенный режим одновременно, поскольку это создает высокую нагрузку на систему ioBroker)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->
## Юридические уведомления
SMA и Sunny Home Manager являются зарегистрированными товарными знаками SMA Solar Technology AG <https://www.sma.de/en.html>.

Все остальные товарные знаки являются собственностью соответствующих владельцев.

## Changelog
### 0.6.4 (2021-04-14)
* (TGuybrush) Bug fixes
  * Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
  * Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)
* (TGuybrush) The adapter binds now to all external IPv4 addresses.

### 0.6.1-beta.0 (2021-01-18)
* (TGuybrush) Bug fixes
  * Software Version string, last part is the revision as character (e.g. R = release)
  * Potential Warning during the first start
  * Revised units to follow the SI standardization (DIN 1301)
* (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
* (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0
* (TGuybrush) Fixed wrong status information 
  * Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  *  Improved compatibility to future new OBIS values
* (TGuybrush) Add additional status information
  * Power grid frequency
  * Time tick counter
  * SMA SUSy ID
  * Software Version
* Add a timestamp for each received status information

### 0.5.7
* (DutchmanNL) Solved incorrect stated ID type for JS-controller 3.x

### 0.5.4
* (Andiling) Adapter compatibility extended for Node 10 and higher

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 IoBroker-Community

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