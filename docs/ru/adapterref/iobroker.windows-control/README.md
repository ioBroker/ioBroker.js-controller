---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.windows-control/README.md
title: ioBroker.windows-контроль
hash: Kr+lRoHT9v9TWLnQNQKnASNvuGeEXJARhXoQZcGq5mA=
---
![логотип](../../../en/adapterref/iobroker.windows-control/admin/windows-control_90.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.windows-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.windows-control.svg)
![Количество установок (последняя)](http://iobroker.live/badges/windows-control-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/windows-control-stable.svg)
![Статус зависимости](https://img.shields.io/david/Mic-M/iobroker.windows-control.svg)
![Известные уязвимости](https://snyk.io/test/github/Mic-M/ioBroker.windows-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.windows-control.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Mic-M/ioBroker.windows-control/master.svg)

# IoBroker.windows-control
## Адаптер для управления устройствами Windows
Этот адаптер обеспечивает управление устройствами Microsoft Windows. Требуется, чтобы инструмент GetAdmin был установлен на каждом устройстве Windows, которым вы хотите управлять. <br> <strong>Большое спасибо [Владимир Вилисов](https://blog.instalator.ru) за его инструмент GetAdmin!</strong>

## Инструмент GetAdmin
Чтобы использовать этот адаптер, необходимо запустить инструмент GetAdmin (версия 2.6) на каждом устройстве Windows, которым вы хотите управлять.
GetAdmin - это один исполняемый файл (776 кБ). Он был закодирован Владимиром Вилисовым в Delphi и опубликован [в своем блоге instalator.ru](https://blog.instalator.ru/archives/47).
Скачать:

 1. Первоисточник: https://blog.instalator.ru/archives/47
 2. Если он недоступен, вы найдете копию на сайте Github этого адаптера [в папке «files»] (https://github.com/Mic-M/ioBroker.windows-control/tree/master/files).

### Конфигурация
Поместите файл `GetAdmin.exe` в любую папку вашего устройства Windows. Запустите файл и установите следующее:

1. Вверху слева в разделе «Сервер»:
    * IP: IP-адрес вашего сервера ioBroker
    * Порт: `8585` является стандартным портом. Обычно нет необходимости менять этот порт.
2. В верхней части раздела «Параметры»: активируйте «Свернуть в лотке» и «Запуск», чтобы автоматически запустить свернутую программу в системный трей.
3. Подтвердите, нажав «Сохранить».

![Настройки GetAdmin](../../../en/adapterref/iobroker.windows-control/img/getadmin-settings.png)

### Примеры отдельных записей в списке команд GetAdmin.exe:
* Спящий режим (немецкий язык: Ruhezustand):
    * Столбец `Command`: введите` m_hibernate` или любое другое имя по вашему выбору (без пробелов, пожалуйста)
    * Столбец `PATH или URL`:` shutdown`
    * Колонка `PARAMETERS`:` -h`
* Режим ожидания (немецкий: Energie sparen):
    * Столбец `Command`: введите` m_sleep` или любое другое имя по вашему выбору (без пробелов, пожалуйста)
    * Столбец `PATH или URL`:` rundll32.exe`
    * Столбец `PARAMETERS`:` powrprof.dll, SetSuspendState`

### Дальнейшая информация
* Форум ioBroker:
    * [Адаптер Windows Control] (https://forum.iobroker.net/topic/31485/)
    * [Windows-Steuerung] (https://forum.iobroker.net/topic/1570/windows-steuerung)
    * [Программа управления компьютером GetAdmin] (https://forum.iobroker.net/topic/1505/)
* [Статья в блоге] (https://blog.instalator.ru/archives/47) GetAdmin. Используйте Google Translate, если вы не знакомы с русским языком.

## Changelog

### 0.1.2
* (Mic-M) Several fixes.

### 0.1.1
* (Mic-M) Readme updated.

### 0.1.0
* (Mic-M) Add states "_processGetStatus" and "_processGetStatusResult" to check if a Windows process (like Chrome browser) is running or not

### 0.0.3
* (Mic-M) `io-package.json` fixed

### 0.0.2
* (Mic-M) Fixed sendkey issue
* (Mic-M) State _sendKey: provide all supported keys as dropdown and no longer as open text field.
* (Mic-M) Renamed states: sendKey -> _sendKey, connected -> _connection

### 0.0.1
* (Mic-M) Initial release

## License
MIT License

Copyright (c) 2020 Mic-M

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