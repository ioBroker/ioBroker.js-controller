---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: НЕ ОБСЛУЖИВАЕТСЯ В НАСТОЯЩЕЕ ВРЕМЯ !!!
hash: O8jue3Vsog/1wlwxiQ4xFu6UGjUptJA7NZEfwi+kqQo=
---
![Логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![Количество установок](http://iobroker.live/badges/tahoma-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tahoma.svg)
![НПМ](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![Стабильный](http://iobroker.live/badges/tahoma-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# В НАСТОЯЩЕЕ ВРЕМЯ НЕ ПОДДЕРЖИВАЕТСЯ !!!
# IoBroker.tahoma
Адаптер ioBroker для Somfy Tahoma. Этот проект не имеет отношения к Somfy. Изначально на основе скрипта, взятого с https://forum.iobroker.net/post/336001.

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами, настроенными через Tahoma Box (и, скорее всего, Connexoon).
Адаптер еще не является полнофункциональным, но он должен поддерживать большинство действий по управлению жалюзи, ставнями и т. Д.

Выполнение некоторых состояний, созданных адаптером.

## Tahoma.X.location
Состояние в этом дереве содержит личную информацию пользователя, такую как город, почтовый адрес и долгота / широта.

## Tahoma.X.devices. *. deviceURL
Это состояние содержит URL-адрес устройства, который используется Tahoma для идентификации устройства.

## Tahoma.X.devices. *. команды
Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств будут поддерживать такие команды, как `close` и `open`, а также некоторые другие.
Некоторые команды имеют в конце `:slow`, если они поддерживаются устройством. Их использование включает низкую скорость или так называемый бесшумный режим.

## Tahoma.X.devices. *. состояния
Эти состояния содержат текущий статус устройств следующим образом. Все настройки, отмеченные `[**]`, доступны для редактирования для управления поведением устройства / отправки команд.
В некоторых штатах в конце есть `:slow`, если они поддерживаются устройством. Их установка включает низкую скорость или так называемый бесшумный режим.

`[**] tahoma.X.devices.*.states.core:DeploymentState` - предоставляет информацию и контролирует состояние текущего развертывания. 100 означает полностью развернутый, 0 - не развернутый. Не все устройства имеют это значение, у некоторых вместо него есть `ClosureState`.
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState` - см. `tahoma.X.devices.*.states.core:DeploymentState` `[**] tahoma.X.devices.*.states.coreClosureState` - Предоставляет информацию и контролирует состояние текущего закрытия. 100 означает полностью закрыто, 0 открыто. Не все устройства имеют это значение, у некоторых вместо него есть `DeploymentState`.
`[**] tahoma.X.devices.*.states.core:TargetClosureState` - См. `tahoma.X.devices.*.states.core:ClosureState` `[**] tahoma.X.devices.*.states.core:OrientationState` - Предоставляет информацию и контролирует ориентацию (например, жалюзи) ламелей. Не все устройства обладают такой ценностью.
`[**] tahoma.X.devices.*.states.core:TargetOrientationState` - см. `tahoma.X.devices.*.states.core:OrientationState` `tahoma.X.devices.*.states.core:NameState` - содержит текущее имя устройства.
`tahoma.X.devices.*.states.core:OpenClosedState` - содержит `closed`, если устройство закрыто на 100% или 0% развернуто, и `open` в противном случае.
`tahoma.X.devices.*.states.core:PriorityLockTimerState` - Если датчик заблокировал устройство, это указано здесь, например. грамм. датчик ветра, блокирующий тент.
`tahoma.X.devices.*.states.core:RSSILevelState` - текущее качество сигнала устройства.
`tahoma.X.devices.*.states.core:StatusState` - `available`, если устройство в настоящее время доступно.
`tahoma.X.devices.*.states.io:PriorityLockLevelState` - см. `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.io:PriorityLockOriginatorState` - см. `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.moving` - указывает, движется ли устройство в данный момент. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.3.3

-  Removed credentials from log on error and debug

### 0.3.2

-  Fixed silent modes (low speed) for newer Somfy devices
-  Fixed problem with wrong reference to `this`

### 0.3.1

-   Fixed adapter crash on empty response object after request error
-   Fixed problems with slow/silent mode for closure

### 0.3.0

-   Added possibility for low speed open and close on supported devices
-   Fixed commands not stopping on next command for device
-   Smaller fixes

### 0.2.6

-   Added queue for device commands not already covered by update to 0.2.1

### 0.2.5

-   Added README for states

### 0.2.4

-   Switched moving state values 1 / 2 for DeploymentState devices

### 0.2.3

-   Fixed direction (moving state) for deployment devices

### 0.2.2

-   Fixed problem with DeploymentState treated as ClosureState on setting values

### 0.2.1

-   Fixed problems with too many simultanous commands/devices

### 0.2.0

-   Added deployment actions
-   Added new state for moving direction
-   Changed command buttons to boolean type

### 0.1.2

-   Retry device command on error 400 (payload) once

### 0.1.1

-   No changes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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