---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: 6CvYBjhtz9gp9QYsounGpuWdRZEfsOfBUY8C8Lp1t70=
---
![логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Статус сборки](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

# IoBroker.homeconnect
=================

## Voraussetzungen vor der Установка
Es muß mindestens Node.js Версия 8 установка!

Für den Adapter wird eine ClientID benötigt. Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen.

## Требования перед установкой
По крайней мере, Node.js версии 8 должен быть установлен!

ClientID требуется для адаптера. Используйте настройки для каждого шага, чтобы зарегистрироваться.

https://developer.home-connect.com

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Учетная запись пользователя Home Connect по умолчанию для тестирования** die E-Mail-Adresse angeben, mit der die Home-Connect-App registriert wurde, diese wird später auch beim Authorization-Prozess benötigt.

Для **Учетной записи пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, с которого должно отправляться приложение Home Connect.
был зарегистрирован, это также требуется позже в процессе авторизации.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Тип учетной записи** Индивидуальный auswählen. Die restlichen Daten sofern vorhanden ergänzen (keine Ahnung, ob das geprüft wird).

Для **Тип учетной записи** выберите Индивидуальный. Добавьте оставшиеся данные, если они есть (не знаю, будет ли это проверено).

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Приложения** und anschließend auf **Регистрация приложения** gehen.

Затем перейдите в **Приложения** а затем в **Зарегистрировать приложение**

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Заявление ID** einen Namen für die Применение eintragen, z.B. ioBroker. Bei **OAuth Flow** Устройство Flow отобранных для фельд Канн леер блейбен. Дэнн Спейчерн и Дэнн Хэт Мэн умереть

Для **Идентификатор приложения** введите имя приложения, например, ioBroker. С помощью **OAuth Flow** Device Flow выберите последнее поле, которое может остаться пустым. Затем сохраните, и у вас есть требуемый ClientID.

## Конфигурация
В адаптере-настройке необходимо указать ClientID eingetragen werden. Wenn der Adapter läuft, wird eine generiert URL авторизации, die wird in den Einstellungen nach dem Speichern der ClientID angezeigt. Einfach nach dem Speichern die Einstellungen neuöffnen

## Конфигурация
Только ClientID должен быть введен в конфигурации адаптера. Если адаптер работает, генерируется URL авторизации. Этот URL вы можете увидеть в настройках после сохранения, подождите и снова откройте настройки.

## Benutzung
Mit den заявляет в командах, что программа остановлена, pausiren или fortführen
Mit Den State в настройках.
Программы современных государств. Активные.BSH_Common_Root_ActiveProgram führt zum starten eines Программы. Программы заданных состояний. Выбранные.

## Использование
С помощью состояний в командах вы можете остановить, приостановить и возобновить программу.
С помощью состояний в настройках вы можете выключить или включить устройство. Изменить значение Programs.active.BSH_Common_Root_ActiveProgram приводит к запуску программы.

## Changelog

### 0.0.18 (26.06.2019)

-   (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

-   (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

-   (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

-   (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

-   (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

-   (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

-   (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

-   (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

-   (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

-   (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

-   (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

-   (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

-   (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
-   (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

-   (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

-   (dna909) add event-listener

### 0.0.3 (14.11.2018)

-   (dna909) query States and available programs

### 0.0.2 (08.11.2018)

-   (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

-   (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 dna909 <dna909@googlemail.com>

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