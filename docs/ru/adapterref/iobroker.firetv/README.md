---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.firetv/README.md
title: без названия
hash: /Cz3gDgOPpGgPIThLnFhQpr1VYtUyYP/Jt1QSmkhE58=
---
![логотип](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.firetv.svg)
![тесты](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус сборки](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![Версия NPM] (https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
-->

С помощью этого адаптера вы можете управлять некоторыми функциями вашего Fire TV или Fire TV Stick.
Например.:

- Вкл выкл
- Отправить ключевые события
- Отправить текстовые строки в поля ввода
- запуск / остановка приложений
- перезагружать
- точные команды оболочки

#### Некоторая информация
Этот адаптер использует функции «Android Debug Bridge», известного как «adb». Adb является частью Android Developer SDK. Поскольку Fire TV имеет операционную систему Android, им можно управлять с помощью adb.

#### Требования
Чтобы использовать этот адаптер, вы должны установить как минимум пакет adb Anroid SDK. Чтобы не устанавливать полный Android SDK, необходимо установить

- *Минимальный ADB и Fastboot*

Поищите в Google (Minimal ADB и Fastboot) последнюю ссылку для скачивания.

Кроме того, вы можете использовать *adbLink*

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.firetv
```