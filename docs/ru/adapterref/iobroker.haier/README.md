---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.haier/README.md
title: ioBroker Haier адаптер для кондиционирования воздуха
hash: N69K+jE3mMiQAZLXCzj7tUkAaIbUgB9nT/OOTczYy0o=
---
![логотип](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![Количество установок](http://iobroker.live/badges/haier-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.haier.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.haier.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.haier/master.svg)
![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)

# IoBroker Адаптер кондиционера Haier =================
Адаптер IoBroker Haier используется для управления кондиционером Haier через UART в сочетании с шлюзом TCP-Serial.
Работа проверена на кондиционере серии «Lightera».

## Аппаратное обеспечение
В качестве шлюза TCP-Serial я использую этот [код] (https://github.com/instalator/ESP8266.TelnetToSerial) и это [устройство](https://blog.instalator.ru/archives/433).

## С помощью
### Мощность
Включение и выключение кондиционера. (Истина / ложь)

### Temp
Текущие показания комнатной температуры. (°C)

### Заданная температура
Установка температуры. (16-30 ° С)

### Режим
* **умный** или **0** - один ключ может дать вам уютную комнату! Блок кондиционирования воздуха может определять температуру и влажность в помещении, а также производить соответствующую регулировку.
* **прохладно** или **1** - холодильная комната.
* **обогрев** или **2** - обогрев помещения.
* **вентилятор** или **3** - только вентилятор.
* **сухой** или **4** - осушение воздуха.

### Скорость вентилятора
* **мин** или **2**
* **середина** или **1**
* **max** или **0**
* **авто** или **3**

### Качели
* **ud** или **1** - Авто вверх / вниз.
* **lr** или **2** - Авто влево / вправо.
* **оба** или **3** - в обоих направлениях.
* **false** или **0** - Выкл.

### Здоровье
(верно / неверно) Генератор ионов воды в кондиционере может генерировать большое количество анионов, эффективно балансируя количество позиции и аниона в воздухе, а также убивать бактерии и ускорять образование пыли в комнате и, наконец, очищать воздух в комната.

### Lockremote
Блокировка ИК пульта (true / false)

### Компрессор
Если компрессор включен

### Свежий
(истина / ложь) Извлеките искаженный воздух из комнаты и вдохните свежий воздух.
(Эта функция недоступна на некоторых моделях.)

### Raw
Отправьте код RAW HEX без начальных байтов и пример контрольной суммы: питание включено - **0A000000000001014D02**

## Changelog

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
  (instalator) initial