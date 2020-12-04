---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: JNG2u5ob50WeA6YDs9uIdJwkkjLcM4JW5m2HxnDnJAw=
---
![Логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Статус сборки](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

# IoBroker.homeconnect
## Voraussetzungen vor der Installation
Es muß mindestens Node.js Version 8 installiert sein !!

Für den Adapter wird eine ClientID benötigt. Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen.

## Требования перед установкой
Должен быть установлен как минимум Node.js версии 8!

Для адаптера требуется ClientID. Используйте настройки для каждого шага для регистрации.

<https://developer.home-connect.com>

![Снимок экрана](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Учетная запись пользователя Home Connect по умолчанию для тестирования** адрес электронной почты и адрес приложения Home-Connect, зарегистрированный в приложении, не требующий авторизации.

Для **Учетная запись пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, с которым будет отправлено приложение Home Connect.
был зарегистрирован, это также потребуется позже в процессе авторизации.

![Снимок экрана](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Тип учетной записи** Индивидуальный auswählen. Die restlichen Daten sofern vorhanden ergänzen (keine Ahnung, ob das geprüft wird).

Для **Тип учетной записи** выберите Индивидуальный. Добавьте оставшиеся данные, если они доступны (не знаю, будет ли это проверяться).

![Снимок экрана](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Applications** und anschließend auf **Register Application** gehen.

Затем перейдите в **Приложения** а затем в **Зарегистрировать приложение**

![Снимок экрана](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Application ID** einen Namen für die Application eintragen, z.B. ioBroker. Bei **OAuth Flow** Device Flow select das letzte Feld kann leer bleiben. Данн Шпайхерн и Данн знают, как получить ClientID.

В поле **Application ID** введите имя приложения, например ioBroker. С **OAuth Flow** Device Flow выберите Последнее поле может оставаться пустым. Затем сохраните, и у вас будет требуемый ClientID.

## Конфигурация
В конфигурации Adapter-Config указано значение ClientID. Wenn der Adapter läuft, wird eine Authorization-URL generiert, diese wird in den Einstellungen nach dem Speichern der ClientID angezeigt. Einfach nach dem Speichern die Einstellungen neuöffnen

## Конфигурация
В конфигурации адаптера необходимо ввести только ClientID. Если адаптер запущен, создается URL-адрес авторизации. Этот URL вы можете увидеть в настройках после сохранения, подождите и снова откройте настройки.

## Benutzung
Mit den указывает в командах kannst du das Programm stoppen, pausieren oder fortführen.
Mit den заявляет в настройках kannst du das Gerät ein oder ausschalten.
Современные программы состояний.active.BSH_Common_Root_ActiveProgram führt zum start eines Programms Современные программы состояний.selected.BSH_Common_Root_SelectedProgram führt zum auswählen des Programms or Optionen

## Применение
С помощью состояний в командах вы можете останавливать, приостанавливать и возобновлять программу.
С помощью состояний в настройках вы можете выключить или включить устройство. Изменение значения программ. Active.BSH_Common_Root_ActiveProgram приводит к запуску программы. Изменение значения программ .selected.BSH_Common_Root_SelectedProgram приводит к выбору программы или параметров.

## Changelog

### 0.0.31

- (ta2k) fix pause start command

### 0.0.30 (10.05.2020)

- (ta2k) fix js controller 3 issues

### 0.0.27 (13.11.2019)

- (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

- (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

- (ta2k) fix compact mode
- (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

- (ta2k) bugfixing

### 0.0.21 (12.07.2019)

- (ta2k) bugfixing

### 0.0.19 (30.06.2019)

- (ta2k) improve displaying long states, options and events

### 0.0.18 (26.06.2019)

- (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

- (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

- (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

- (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

- (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

- (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

- (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

- (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

- (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

- (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

- (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

- (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

- (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
- (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

- (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

- (dna909) add event-listener

### 0.0.3 (14.11.2018)

- (dna909) query States and available programs

### 0.0.2 (08.11.2018)

- (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

- (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 dna909 <dna909@googlemail.com>, TA2k

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