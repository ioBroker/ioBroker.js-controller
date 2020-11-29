---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.adb/README.md
title: ioBroker.adb
hash: DJ8OQXPjNVglgAUFzwu5+DM1TbuY2as654gOxACSAWI=
---
![Логотип](../../../en/adapterref/iobroker.adb/admin/adb.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.adb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.adb.svg)
![Статус зависимости](https://img.shields.io/david/om2804/iobroker.adb.svg)
![Известные уязвимости](https://snyk.io/test/github/om2804/ioBroker.adb/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.adb.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/om2804/ioBroker.adb/master.svg)

# IoBroker.adb
## Адаптер adb для ioBroker
С помощью этого адаптера вы можете управлять некоторыми функциями ваших устройств Android через Android Debug Bridge:

- настраиваемая команда оболочки
- запустить / остановить приложение
- перезагрузка
- сделать снимок экрана

### Пользовательская команда оболочки
Чтобы выполнить команду оболочки, напишите команду в состояние **оболочка** Вы всегда получите ответ в состоянии **результат**

Пример: нажмите кнопку POWER **кнопку ввода, событие POWER** или **клавишу ввода оболочки, событие POWER**

### Запуск / остановка приложения
Запустите приложение. Укажите имя компонента с префиксом имени пакета, чтобы создать явное намерение.
Чтобы запустить приложение, напишите намерение (* com.example.app / .ExampleActivity *.) Для состояния **startApp**

Пример: для запуска KODI напишите **org.xbmc.kodi / .Splash**

Остановите приложение. Принудительно остановить все, что связано с пакетом (имя пакета приложения).
Чтобы остановить приложение, напишите имя пакета в состоянии **stopApp**

Пример: для остановки KODI напишите **org.xbmc.kodi**

### Перезагрузите устройство
Перезагружает устройство. Запишите любое значение в состояние **перезагрузка**

### Сделать снимок экрана
Сделайте снимок экрана и сохраните его в папке адаптера. Запишите любое значение в состояние **screencap**

## Информация
Android Debug Bridge (adb) - это универсальный инструмент командной строки, который позволяет взаимодействовать с устройством. Команда adb упрощает выполнение различных действий с устройством, таких как установка и отладка приложений, и обеспечивает доступ к оболочке Unix, которую вы можете использовать для выполнения различных команд на устройстве.

adb включен в пакет Android SDK Platform-Tools. Вы можете загрузить этот пакет с помощью SDK Manager, который устанавливает его по адресу android_sdk / platform-tools /. Чтобы не устанавливать полный Android SDK, вы можете установить Minimal ADB и Fastboot или использовать adbLink

Для использования адаптера необходимо запустить adb server.
** adb start-server **

### Больше информации
[Документы Android Debug Bridge](https://developer.android.com/studio/command-line/adb?hl=ru)

## Changelog

### 0.0.4
* (om2804) js-controller dependency upgraded to > 2.0.0

### 0.0.3
* (om2804) fixes ater review

### 0.0.2
* (om2804) start/stop application
* (om2804) reboot device
* (om2804) take screenshot

### 0.0.1
* (om2804) initial release

## License
MIT License

Copyright (c) 2020 om2804 <om2804@mail.ru>

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