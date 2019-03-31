---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: UvnJYD84v5/tnMP91+G2jJw4UrQJ5eWwfjmx1JMSXas=
---
![логотип](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![Количество установок](http://iobroker.live/badges/nuki-stable.svg)

# IoBroker.nuki
Этот адаптер ioBroker позволяет контролировать и контролировать [Nuki Smart Lock](https://nuki.io/de/) с помощью API-интерфейса моста Nuki.

## Требования
* Nuki Smart Lock (очевидно) и Nuki (аппаратный или программный) мост.
* Работающий экземпляр ioBroker.

## Использование
Каждый экземпляр адаптера Nuki представляет собой мост Nuki. При создании экземпляра просто введите IP-адрес, порт и токен вашего моста Nuki. Имя является необязательным и будет сгенерировано автоматически, если оставить его пустым. Флажок «использовать обратный вызов» и значение «порт обратного вызова в ioBroker» являются необязательными и могут быть установлены для использования функции обратного вызова Nuki. После сохранения экземпляра будет создано мостовое устройство с каналом для каждой блокировки Nuki, которая подключена к указанному мосту Nuki. Каналы предоставляют текущее состояние блокировки Nuki в качестве выходных параметров:

* batteryCritical: индикатор низкого заряда батареи
* lockState: индикатор того, заблокирован ли Nuki
* состояние: текущее (числовое) состояние блокировки (Nuki native)
* отметка времени: последнее обновление

Кроме того, каналы предоставляют входные параметры, которые обеспечивают базовое управление замком Nuki:

* action: числовой код действия для установки состояния Nuki (Nuki native).

Допустимые значения ввода:

0 (без действия) 1 (разблокировка) 2 (блокировка) 3 (разблокировка) 4 (блокировка n 'go) 5 (блокировка n' go с разблокировкой)

* lockAction: переключатель для блокировки / разблокировки Nuki (true = разблокировать; false = заблокировать)
* openAction: кнопка разблокировки Nuki
* openLocknGoAction: кнопка для разблокировки и через несколько секунд блокировки Nuki
* unlockLocknGoAction: кнопка для разблокировки и через несколько секунд блокировки Nuki.

## Дополнительная информация
Как получить свой токен мостов:

* Звоните http:// <bridge_ip>: <bridge_port> / auth из любого браузера в вашей локальной сети -> мост включает его светодиод
* Нажмите кнопку моста в течение 30 секунд
* Результат вызова браузера должен выглядеть примерно так:

{"token": "token123", "success": true} Функция обратного вызова:

Если используется функция обратного вызова, адаптер попытается автоматически установить обратный вызов на мосту Nuki при сохранении экземпляра. Когда экземпляр выгружен, обратный вызов будет снова удален. Все состояния Nuki будут обновляться мостом Nuki, пока активирован обратный вызов.
Обратные вызовы могут быть установлены и удалены из любого браузера со следующими URL:

Задавать:

* http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fapi% 2Fnuki & token = <bridgeToken>

Удалить:

* http:// <bridge_ip>: <bridge_port> / callback / remove? id = <callback_id> & token = <bridgeToken>

## Обновить
При обновлении с 0.1.x до 0.2.0 или выше рекомендуется удалить все экземпляры старой версии перед установкой новой версии. Помните, что изменения версии больше, чем на уровне патча (-> изменение только последней цифры), всегда могут содержать изменения в точках данных, например, От 0,1,3 до 0,2,0

## Changelog

### 1.0.5
* (ldittmar81) add gulp auto translation
* (smaragdschlange) add license

### 1.0.4
* (smaragdschlange) improvement: added Support for Compact mode (js-Controller 2.0 Feature)

### 1.0.3
* (smaragdschlange) bug fix: action buttons were not working properly

### 1.0.1
* (smaragdschlange) version synch

### 1.0.0
* (smaragdschlange) initial release on npm

### 0.2.0
* (smaragdschlange) periodic state updates added
* (smaragdschlange) restructure objects

### 0.1.3
* (smaragdschlange) timestamp bug fixed

### 0.1.2
* (smaragdschlange) minor bugfixes
* (smaragdschlange) added delay before each Nuki request to avoid null responses

### 0.1.1
* (smaragdschlange) callback will be removed when instance is unloading

### 0.1.0
* (smaragdschlange) callback finally working
* (smaragdschlange) added another State

### 0.0.6
* (smaragdschlange) additional states/actions and improved compatibility (callback still not completely working)

### 0.0.5
* (smaragdschlange) added support for nuki bridge callback (web server still to be added)

### 0.0.4
* (smaragdschlange) added input parameter for lock actions

### 0.0.3
* (smaragdschlange) bug fixes and restructure

### 0.0.2
* (smaragdschlange) added input parameters

### 0.0.1
* (smaragdschlange) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Smaragdschlange <smaragdschlange@gmx.de>

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