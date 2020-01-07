---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tradfri/README.md
title: ioBroker.tradfri
hash: wCRFsvNTOwcQ7dNNzURGLTQpKapsCsi2SxdETCGwcDM=
---
![логотип](../../../en/adapterref/iobroker.tradfri/admin/tradfri.png)

![Всего предупреждений](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)
![Количество установок](http://iobroker.live/badges/tradfri-stable.svg)

# IoBroker.tradfri
![Статус сборки](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

## Требования
* Linux (например, Raspberry Pi) / OSX / Windows
* NodeJS> = 6.x
* Trådfri шлюз

## Установка
1. Установите этот адаптер через интерфейс администратора iobroker или через `npm install iobroker.tradfri --production`
1. В графическом интерфейсе ioBroker добавьте экземпляр адаптера.
1. Настройте экземпляр, введя IP / имя хоста вашего шлюза и код безопасности, который можно найти на ярлыке внизу.

### Устранение неполадок при установке:
#### Linux / OSX:
Убедитесь, что вы установили самую последнюю выпущенную версию. Если есть ошибки компиляции, вам может потребоваться установить build-essential:

```
apt-get -y install build-essential
```

#### Windows:
Если вы работаете в более старых версиях NodeJS (<10), установка может завершиться ошибкой со следующей ошибкой где-то в журнале:

```
Can't find Python executable "python", you can set the PYTHON env variable.
```

Чтобы решить эту проблему, откройте административную оболочку:

1. Нажмите <kbd>клавишу Windows</kbd>
2. Введите `cmd`, нажмите <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>
3. Подтвердите приглашение UAC

и выполните следующую команду:

```
npm install --add-python-to-path --global windows-build-tools
```

Это может занять некоторое время ... после этого установка должна пройти успешно.

## Отправка пользовательских пакетов CoAP
Вы можете отправлять пользовательские пакеты CoAP из других адаптеров, используя `sendTo`. Пример из JavaScript:

```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```

Объект `options` выглядит следующим образом:

```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```

Объект результата `ret` выглядит следующим образом:

```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog

### 2.5.1 (2019-12-23)
* Made it possible to operate plugs using virtual groups

### 2.5.0 (2019-12-22)
* Allow more device types in virtual groups

### 2.4.7 (2019-11-18)
* Fixed small display issues with 3rd party bulbs

### 2.4.6 (2019-11-15)
* Group states for blinds are now synchronized correctly

### 2.4.5 (2019-11-07)
* Fix: Suppress log warnings for motion sensors

### 2.4.4 (2019-10-11)
* Fix: Suppress log warnings for slave remotes and signal repeaters

### 2.4.3 (2019-09-22)
* Fix: Operate blinds when states are changed

### 2.4.2 (2019-09-22)
* Fix: Also create objects for blinds

### 2.4.0 (2019-08-18)
* Add support for blinds

### 2.3.0 (2019-04-05)
* The gateway can now be discovered automatically

### 2.2.0 (2019-02-25)
* Expose the battery percentage for devices with a battery

### 2.1.0 (2019-01-08)
* When `node-aead-crypto` is not installed, display instructions on how to fix it
* Optimizations and fixes under the hood
* Support for compact mode

### 2.0.0 (2018-05-14)
* Support for Admin v3 and material design
* **BREAKING:** Dropped support for Admin v2

### 1.5.4 (2018-11-11)
* Fix handling of decimal digits in the adapter settings. This fixes rounding of group states.

### 1.5.2 (2018-11-06)
* Reworked installation procedure to fix problems with `node-aead-crypto`

### 1.5.1 (2018-10-29)
* Added experimental support for smart plugs

### 1.4.0 (2018-05-14)
* The names of state objects no longer get overwritten

### 1.3.0 (2018-05-06)
* Reduce logging of "updated scenes for group..."
* Made rounding of numeric values configurable
* Stability improvements

### 1.2.1 (2018-05-01)
* Use the native encryption methods of NodeJS 10 instead of `node-aead-crypto`

### 1.1.11 (2018-04-27)
* Add support for NodeJS 10

### 1.1.10 (2018-03-18)
* Improved automatic reconnection

### 1.1.9 (2018-03-15)
* Fixed group states not always updating the lightbulbs when changed

### 1.1.8 (2018-03-09)
* Ignore minimum brightness reports when lights are turned off

### 1.1.7 (2018-02-23)
* Fixed activation of scenes when the scene is already selected

### 1.1.6 (2018-02-22)
* Fixes for RGB support
* Support for floating point values

### 1.1.3 (2018-02-15)
* Update `node-tradfri-client` version for better RGB support and floating point values

### 1.1.1 (2018-02-07)
* Attempt to fix `TypeError: generator already running`

### 1.1.0 (2018-02-07)
* Added an option to preserve the transition duration for single lightbulbs

### 1.0.7 (2018-02-05)
* Fixed an error loading virtual groups

### 1.0.6 (2018-01-13)
* Update `node-tradfri-client` version

### 1.0.5 (2018-01-13)
* Removed error in log on adapter startup
* Change brightness role for better compatibility with the cloud adapter

### 1.0.4 (2018-01-10)
* Removed warning caused by Gateway v1.3.14

### 1.0.3 (2018-01-07)
* Updated `node-tradfri-client` version
* Load objects on adapter start so they don't get overwritten (#35)

### 1.0.2 (2017-12-28)
* New attempt at automatically restarting the adapter on connection loss

### 1.0.1 (2017-12-25)
* Update `node-tradfri-client` dependency to support receiving blockwise messages

### 1.0.0 (2017-11-19)
* This is stable enough for a 1.x version
* Improved browser compatiblity of the admin UI

### 0.6.0 (2017-11-07)
* Moved tradfri-related code into its own library
* Changed authentication procedure to comply with IKEA's request

### 0.5.5 (2017-10-31)
* Restored compatibility to Gateway version 1.2.42

### 0.5.4 (2017-10-29)
* Brightness is now expressed in 0..100%
* Fixed parsing RGB colors

### 0.5.3 (2017-10-28)
* Fixed transition duration for groups

### 0.5.2 (2017-10-28)
* Added icons for devices

### 0.5.1 (2017-10-28)
* Support virtual groups
* Validate hex colors on input

### 0.4.5 (2017-10-20)
* RGB and connection fixes.

### 0.4.3 (2017-10-17)
* Experimental support for RGB and lightbulbs with fixed color

### 0.3.4 (2017-10-17)
* Disabled automatic restart on connection loss.

### 0.3.3 (2017-10-07)
* Eliminated potential sources of infinite loops

### 0.3.2 (2017-10-04)
* Fixed an error resulting from the upgrade to ES2015 output

### 0.3.1 (2017-10-02)
* Update CoAP library to fix a bug

### 0.3.0 (2017-09-25)
* official release of the previous changes
* added transition duration and brightness change for groups
* monitor connection state and update info.connection
* fix connection attempts to unavailable endpoints

### 0.2.9 (2017-09-25)
* Support changing the transition duration

### 0.2.8 (2017-09-24)
* Fixed group and scene deletion

### 0.2.7 (2017-09-23)
* Update CoAP and DTLS library for the next features
* Offloaded concurrency handling to CoAP lib

### 0.2.5 (2017-09-12)
* Selection of scenes from the admin UI is now possible

### 0.2.4 (2017-09-11)
* Add support for groups (renaming, switching)
* Partial support for scenes (switching when id is known)

### 0.2.3 (2017-09-11)
* Send custom CoAP packets by using sendTo

### 0.2.2 (2017-09-10)
* Changed internal handling of objects to prepare the next updates

### 0.2.1 (2017-08-26)
* Sync io-package and package version

### 0.2.0 (2017-08-14)
* Remove git dependency, publish on npm

### 0.1.5 (2017-08-14)
* Ensure only whole numbers are sent (fixes #6)
* Fix connection to the gateway using the hostname

### 0.1.4 (2017-08-12)
* Switched to TypeScript

### 0.1.3 (2017-07-21)
* Reboot of the adapter without 3rd party libraries.

### 0.1.2 (2017-05-06)
* Color temperature of lightbulbs is now expressed in terms of 0 (cold) - 100% (warm).

### 0.1.1 (2017-05-04)
* Added support for NodeJS 4.X and building the dependencies on Windows systems

### 0.1.0 (2017-05-02)
* initial release. 
* Functionality limited to controlling lightbulbs.

### 0.0.0
* not ready yet!

## License
The MIT License (MIT)

Copyright (c) 2017-2019 AlCalzone <d.griesel@gmx.net>

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