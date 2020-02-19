---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: iU4VTquXT8wLOTsxI8XsBIZpHUdUgfekYjMGvx+s2XU=
---
![логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![Количество установок](http://iobroker.live/badges/tahoma-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tahoma.svg)
![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.tahoma
Адаптер ioBroker для Somfy Tahoma. Этот проект не имеет никакого отношения к Somfy. Первоначально на основе сценария, взятого из https://forum.iobroker.net/post/336001.

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами, настроенными через Tahoma Box (и, скорее всего, Connexoon).
Адаптер еще не полностью укомплектован, но он должен поддерживать большинство действий для управления жалюзи и ставнями и т. Д.

Свертывание некоторых состояний, созданных адаптером.

## Tahoma.X.location
Состояние в этом дереве содержит личную информацию пользователя, такую как город, адрес улицы и долгота / широта.

## Tahoma.X.devices. *. deviceURL
Это состояние содержит URL-адрес устройства, который используется Tahoma для идентификации устройства.

## Tahoma.X.devices. *. команды
Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств будут поддерживать такие команды, как `close` и `open`, но также и некоторые другие.
Некоторые из команд имеют `:slow` в конце, если они поддерживаются устройством. Использование этих включает низкоскоростной или так называемый бесшумный режим.

## Tahoma.X.devices. *. Состояния
Эти состояния содержат текущее состояние устройств следующим образом. Все настройки, отмеченные `[**]`, могут редактироваться для управления поведением устройства / отправки команд.
В некоторых состояниях в конце есть `:slow`, если это поддерживается устройством. Их установка включает низкую скорость или так называемый бесшумный режим.

`[**] tahoma.X.devices.*.states.core:DeploymentState` - Предоставляет информацию о текущем развертывании и управляет им. 100 означает полностью развернутый, 0 не развернут. Не все устройства имеют это значение, некоторые вместо этого имеют `ClosureState`.
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState` - см. `tahoma.X.devices.*.states.core:DeploymentState` `[**] tahoma.X.devices.*.states.coreClosureState` - Предоставляет информацию о состоянии текущего закрытия и контролирует его. 100 означает полностью закрыт, 0 открыт. Не все устройства имеют это значение, некоторые вместо этого имеют `DeploymentState`.
`[**] tahoma.X.devices.*.states.core:TargetClosureState` - См. `tahoma.X.devices.*.states.core:ClosureState` `[**] tahoma.X.devices.*.states.core:OrientationState` - Предоставляет информацию об ориентации (например, для жалюзи) планок и контролирует ее. Не все устройства предлагают это значение.
`[**] tahoma.X.devices.*.states.core:TargetOrientationState` - См. `tahoma.X.devices.*.states.core:OrientationState` `tahoma.X.devices.*.states.core:NameState` - Содержит текущее название устройства.
`tahoma.X.devices.*.states.core:OpenClosedState` - Содержит `closed`, если устройство закрыто на 100% или развернуто на 0%, а `open` в противном случае.
`tahoma.X.devices.*.states.core:PriorityLockTimerState` - Если датчик заблокировал устройство, это указано здесь, e. грамм. датчик ветра, блокирующий тент.
`tahoma.X.devices.*.states.core:RSSILevelState` - Текущее качество сигнала устройства.
`tahoma.X.devices.*.states.core:StatusState` - `available`, если устройство доступно в данный момент.
`tahoma.X.devices.*.states.io:PriorityLockLevelState` - См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.io:PriorityLockOriginatorState` - См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.moving` - Укажите, движется ли устройство в данный момент. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

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