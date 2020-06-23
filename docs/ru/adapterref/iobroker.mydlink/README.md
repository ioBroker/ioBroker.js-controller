---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mydlink/README.md
title: ioBroker.mydlink
hash: 8ZmcRc9HDuf1rvpmcj1/4KRrtRQDEhepPhbEKfqYfqA=
---
![логотип](../../../en/adapterref/iobroker.mydlink/admin/mydlink.png)

![Количество установок](http://iobroker.live/badges/mydlink-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mydlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mydlink.svg)
![тесты](https://travis-ci.org/iobroker-community-adapters/ioBroker.mydlink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)

# IoBroker.mydlink
Адаптер MyDlink для ioBroker.
-------------------------------------------------- ----------------------------

Позволяет управлять силовыми розетками или детекторами движения из [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) из ioBroker.

** Этот адаптер использует библиотеки Sentry, чтобы автоматически сообщать разработчикам об исключениях и ошибках кода. ** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. В [Sentry-Plugin Документация](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry report используется начиная с js-controller 3.0.
Это также помогает с поддержкой новых устройств.

В настоящее время проверенные устройства:

| Модель | Тип | Изображение |
| :---: | :---: | :---: |
| DSP-W215 | Smart Plug (розетка, температура, ток) **Требуется опрос** | ![Образ](../../../en/adapterref/iobroker.mydlink/docs/media/DSP_W215.png) |
| DCH-S150 | Детектор движения (последнее обнаруженное движение) **Требуется опрос** | ![Образ](../../../en/adapterref/iobroker.mydlink/docs/media/DCH_S150.png) |
| DCH-S150 | Детектор движения (последнее обнаруженное движение) **Требуется опрос** | ! [Image] (docs / media / DCH_S150.png) |

Адаптер должен опрашивать некоторые устройства. Более новые отправляют push-сообщения, что теперь поддерживается. Показания датчика и обнаружение движения будут задерживаться интервалом опроса, если они должны быть опрошены (может быть установлено в конфигурации).

#### Конфигурация:
* Список устройств, каждое устройство со следующими настройками:

<table><tr><td> название </td><td> установите здесь имя, должно быть уникальным (для устройств mydlink) </td></tr><tr><td> IP </td><td> введите здесь IP-адрес, имя хоста также должно работать </td></tr><tr><td> ШТЫРЬ </td><td> PIN-код напечатан на наклейке на устройстве, вероятно, внизу. Может быть TELNET для DSP-W115, см. Ниже. </td></tr><tr><td> Интервал опроса </td><td> за интервал опроса устройства <br /> Установите 0, чтобы отключить опрос. <br /> <b>Рекомендация:</b> установите быстрый интервал опроса для датчиков и более длинный для штекеров. </td></tr><tr><td> включить </td><td> если не включен, не будет опрашиваться или контролироваться. <br /> Устройства, которые не подключены, могут быть отключены, чтобы избежать сетевого трафика и сообщений об ошибках в журнале. </td></tr></table>

Адаптер не мешает использованию приложения.

## Настройка DSP-W115
А другие *более новые* устройства используют совершенно другой протокол и другую настройку. Если вы удалите устройства из приложения mydlink, вы можете просто использовать их как другие устройства и ввести свой обычный PIN-код.

Если вы хотите продолжать использовать приложение, вы должны перевести устройство в заводской режим, выполнив следующую процедуру:

1. Переведите устройство в режим восстановления, удерживая кнопку wps / reset во время загрузки, пока оно не начнет мигать **красным** вместо оранжевого.
2. Теперь работает Telnet Deamon, подключиться к устройству Wi-Fi
3. Запустите `telnet 192.168.0.20` и войдите в систему с помощью` admin: 123456` (или используйте putty, не забудьте выбрать `telnet` вместо` ssh`).
4. Запустите `nvram_set FactoryMode 1`
5. Запустите перезагрузку; выход; `для перезагрузки устройства.

Теперь вам нужно ввести `TELNET` в качестве Pin, и адаптер извлечет необходимые данные из самого устройства.

## Changelog
<!-- 
	Placeholder for next versions (this needs to be indented):
	### __WORK IN PROGRESS__
	npm install @alcalzone/release-script
-->
### 1.1.4 (2020-06-23)
* fixed: sometimes state was always reported as true.

### 1.1.3 (2020-06-18)
* fixed: if error during login, polling would stop.
* fixed: can now update device name from config again
* change: read devices from config in UI again
* change: in UI do not create +-Button if detected device is already in devices table.

### 1.1.2 (2020-06-01)
* fixed two possible crashes with offline / wrong devices.

### 1.1.1 (2020-06-01)
* Improved auto detection of DSP-W115 (but mdns seems very unreliable whit that device)
* UI should never delete user devices

### 1.1.0 (2020-05-31)
* Added Support for w115 (and maybe other never myDlink devices, might even do *something* with cameras)
* Fix relogin to device (i.e. when device was restarted during adapter runtime) 
* Fix error when switching a socket.

### 1.0.11 (2020-05-10)
* Tried to add even more information in case device seems incompatible

### 1.0.10 (2020-05-10)
* Returned to login with user "Admin"
* Tried to add more debug for incompatible devices.

### 1.0.9 (2020-05-07)
* Fixed: changes in configuration were not respected once devices were created
* Fixed: re-login to device on switching if polling is disabled
* Fixed: Error output on switching now more informative

### 1.0.8 (2020-05-05)
* Fixed switching, was broken in some circumstances by id changes.

### 1.0.7 (2020-05-02)
* Made saving config more robust and direct again.
* Made identify by IP more robust and allows saving right away. 
* Prevent saving if devices without PIN are configured.

### 1.0.6 (2020-05-02)
* Prevent creation of empty devices (MYDLINK-6)

### 1.0.5 (2020-05-02)
* Fixed possible issue with device ids.
* Improved device creation
* Adjusted for discovery adapter that not yet stores passwords encrypted.

### 1.0.4 (2020-05-01)
* Improved connection keepAlive
* Improved logging of network errors

### 1.0.3 (2020-05-01)
* Fixed login/identification loop on (possibly) duplicate devices

### 1.0.2 (2020-04-30)
* Fixed potential crashes on network errors.

### 1.0.1 (2020-04-30)
* Re-added device config to adapter config (in case objects get deleted).

### 1.0.0 (2020-04-30)
* BREAKING CHANGE: device id is now mac instead of name -> all devices need to be recreated. Sorry for that. But should never happen again, now. New devices *should* be created automatically.
* added encryption of PIN
* settings stored in native part of device (please do not delete them or you have to reconfigure them)
* modified device creation / identification / start to allow devices to be (re-)started during runtime (you do not need to press save on config page anymore)
* added auto detection
* added missing translations
* added sentry plugin (including sending information about unknown devices)
* a lot of internal restructuring and cleanup for better maintenance in future.

### 0.0.7
* (Garfonso) added info.connection state
* (Garfonso) suppressed repeated error messages during polling.

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.