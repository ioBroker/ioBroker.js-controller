---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rpi2/README.md
title: без названия
hash: yUNT/749tkPsNh55r2vRh5FX088bXozqNd5QYjdxJpo=
---
![логотип](../../../en/adapterref/iobroker.rpi2/admin/rpi.png) ioBroker Адаптер RPI-монитора ==============

![Количество установок](http://iobroker.live/badges/rpi2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.rpi2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![NPM](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

Реализация RPI-Monitor для интеграции в ioBroker. Это та же реализация, что и для iobroker.rpi, но с GPIO.

## Важная информация
Работает только с узлом> = 0,12

** ioBroker должен работать под root, чтобы контролировать GPIO. **

## Монтаж
После установки необходимо настроить все необходимые модули через страницу администрирования.

После запуска iobroker.rpi все выбранные модули генерируют дерево объектов в ioBroker в rpi. <Instance>. <Modulename>, например, rpi.0.cpu

Убедитесь, что Python и build-essential установлены:

```
sudo apt-get update
sudo apt-get install -y build-essential python
```

Следующие объекты доступны после выбора:

#### **ЦПУ**
- cpu_frequency
- load1
- нагрузка5
- нагрузка15

#### **Малина (требуется vcgencmd)**
- cpu_voltage
- mem_arm
- mem_gpu

#### **Объем памяти**
- память доступна
- память_свободная
- memory_total

#### **Сеть (eth0)**
- net_received
- net_send

#### **SD Card**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

#### **Своп**
- swap_total
- swap_used

#### **Температура**
- soc_temp

#### **Время работы**
- время работы

#### **WLAN**
- wifi_received
- wifi_send

## Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ЦПУ
- Малина
- Объем памяти
- сеть
- SD Card
- Своп
- температура
- время работы
- WLAN

## Logfiles / Configuration Settings
## Характеристики
## Сделать
## Проверенное оборудование
 - Одроид С1
 - Raspberry Pi 1

## GPIO
Вы также можете читать и контролировать GPIO.
Все, что вам нужно сделать, это настроить в настройках параметры GPIO (дополнительная вкладка).

![GPIOs](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

После включения некоторых портов в дереве объектов появляются следующие состояния:

- rpi.0.gpio.PORT.state

Нумерация портов - BCM (выводы BroadComm на чипе). Вы можете получить перечисление с помощью ```gpio readall```.
Например, PI2:

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## Changelog

### 1.0.0 (2018-08-20)
 - (bluefox) Admin3 support 

### 0.3.2 (2017-11-29)
 - (Homoran) fixed Mem available readings on Stretch

### 0.3.1 (2017-01-11)
 - (olifre) Fixup swap_used calculation.

### 0.2.2 (2016-12-01)
 - (bluefox) Add GPIO direction indication

### 0.2.2 (2016-11-22)
 - (bluefox) Use BCM enumeration

### 0.2.1 (2016-10-29)
 - (bluefox) fix start of adapter

### 0.2.0 (2016-10-23)
 - (bluefox) just version change

### 0.1.1 (2016-10-13)
 - (bluefox) implement GPIOs control

### 0.0.4 (2016-03-25)
 - (bluefox) Try catch by eval
   (bluefox) do not process if exec fails

### 0.0.3 (2015-12-28)
 - (husky-koglhof) Fixed value calc.
   Set Value to 2 digits

### 0.0.2 (2015-12-26)
 - (husky-koglhof) Workaround for node 0.10.x
 - (bluefox) Some Fixes

### 0.0.1 (2015-12-23)
 - Initial commit. Alpha Version.

## License

Copyright (c) 2015-2018 husky-koglhof <husky.koglhof@icloud.com>

MIT License