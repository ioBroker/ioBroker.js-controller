---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.piface/README.md
title: ioBroker.piface
hash: Jem0qrM+xiBBoAyyrGiFXroWjtJRbc2Xbj1MfzL0XXs=
---
![логотип](../../../en/adapterref/iobroker.piface/admin/piface.png)

![Количество установок](http://iobroker.live/badges/piface-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.piface.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.piface.svg)
![Трэвис-CI](https://travis-ci.org/Eisbaeeer/ioBroker.piface.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.piface.png?downloads=true)

# IoBroker.piface
Этот адаптер позволяет управлять Piface на Raspberry Pi.

Он использует pifacedigial узла: https://github.com/tualo/node-pifacedigital

Адаптер создает 8 входных и выходных объектов в iobroker.
Выходы могут управляться кнопками из VIS или путем установки объекта в «true» или «false» или «1» или «0».

###! Внимание!
Пожалуйста, прочтите предварительные требования к адаптеру.
Адаптеру требуется версия узла> = v4.0.0. Вы должны установить с помощью консоли следующие библиотеки и включить поддержку SPI для Raspberry, установив в «raspi-config»

```
git clone https://github.com/piface/libmcp23s17.git
cd libmcp23s17/
make
sudo make install
```

```
git clone https://github.com/piface/libpifacedigital.git
cd libpifacedigital/
make
sudo make install
```

Если вы работаете с ошибками, потому что версия вашего узла слишком низкая, пожалуйста, обновите версию узла.

* Я успешно установил с версией узла: v4.2.1

### Настройки в iobroker
![Альтернативный текст](../../../en/adapterref/iobroker.piface/admin/settings.png?raw=true "настройки")

## Номер платы PiFace
Вы можете сложить до 4 досок на одном Raspberry Pi. Вы должны обратиться к доске с помощью перемычки.
Для адресации плат используйте следующие настройки перемычек:

| Номер платы | JP1 | JP2 |
| ------------- |:---:|:---:|
| доска 0 | 0 | 0 |
| доска 1 | 1 | 0 |
| доска 2 | 0 | 1 |
| доска 3 | 1 | 1 |

Если вы используете более одной доски, пожалуйста, создайте дополнительные экземпляры для каждой доски и измените номер платы в настройке соответствующего экземпляра.

## PiFace считывает ввод в мс
Это значение определяет интервал для проверки входных данных. Значение в мс.

## Обратные входы
Вы можете инвертировать входы

## Инициализировать результаты
Если это проверено, выходы будут установлены в 0 путем перезапуска адаптера.

## Сделать:

## Changelog

### 1.0.0.(2017-09-19)
* (Eisbaeeer)
* Solving issue #6 (RAM)

### 0.0.9 (2017-03-05)
* (Eisbaeeer)
* Activating Travis - no changes
* (Apollon77)
* Added basic testing

### 0.0.50 (2016-05-07)
* (Eisbeeer)
* Optimized loggin because of RPI´s flash

### 0.0.40
* (Eisbaeeer) RC
added:
* addressing boards

### 0.0.30
* (Eisbaeeer) first aplpha
added:
* Read interval in setup (ms)
* Selectable invers input (pullup)

### 0.0.20
* (Eisbaeeer) first beta

### 0.0.10
* (Eisbaeeer) initial version

## License
MIT