---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: oHwz0i8ruJc4gnX7bkTWCtf1HJx+7bMjXbH3Qwq+4B0=
---
![Логотип](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn
Этот адаптер позволяет подключить [LCN](https://www.lcn.eu/) к локальной сети управления ioBroker.

## Поддерживаемые шлюзы
- LCN-PKE

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- LCN-PKU с LCN-PCHK

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

** Не забывайте, что ioBroker.lcn заблокирует одну лицензию на подключение к LCN. **

Конфигурация и модули будут автоматически обнаружены при сканировании, которое должно запускаться вручную из диалогового окна конфигурации и может быть повторено в любое время снова.

## Типы
Поддерживаются следующие группы чтения и записи:

- Аналоговые значения (выход / вход)
- Реле (выход)
- Датчики (вход)
- светодиоды (выход / вход)
- Переменные (ввод)

## Переменные
Чтобы применить допустимые функции преобразования к переменным, переменные должны иметь допустимые роли. Поддерживаются следующие роли:

- **значение. температура** - температура в градусах Цельсия
- **значение. яркость** - Люкс (I- вход) в люксах
- **value.speed.wind** - скорость ветра в м / с
- **значение. напряжение** - напряжение в вольтах
- **value.current** - ток в амперах
- **value.sun.azimuth** - азимут солнца
- **value.sun.elevation** - высота солнца

## Дисплей
Для каждого устройства вы можете активировать, есть ли у него дисплей или нет.

## Регулятор (Regler)
Для каждого устройства вы можете активировать, есть ли у него регуляторы или нет.

## Настройки
- Reconnect interval (sec) - как часто адаптеры пытаются подключиться. По умолчанию каждые 30 секунд.
- Таймаут подключения (мс) - как долго адаптер ждет ответа на подключение, включая аутентификацию. По умолчанию 6 секунд.
- Таймаут ответа на сканирование (мс) - как долго адаптер ждет ответов при сканировании модулей.
- Response timeout (ms) - тайм-аут для команд управления
- Ping Interval (sec) - как часто адаптер отправляет запросы ping
- Ping response timeout (ms) - таймаут для ping запросов
- Реле IN / OUT одинаковы - если реле «out» и «in» - это одно и то же, или если эти реле разные.

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

## Как пользоваться
После первого запуска устройства необходимо просканировать. Это можно сделать в диалоговом окне конфигурации с помощью кнопки сканирования.

![сканировать](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

## Сделать
- Диалог конфигурации для определения типа переменных.

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 1.0.2 (2020-10-11)
* (bluefox) Implemented the regulators and the display support.

### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2020 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.