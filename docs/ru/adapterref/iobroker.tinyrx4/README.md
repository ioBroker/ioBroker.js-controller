---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinyrx4/README.md
title: ioBroker.tinyrx4
hash: WCXvCw2USMZuNPV7OuAYAc/BhULhccxu9wUup20j7Hw=
---
![логотип](../../../en/adapterref/iobroker.tinyrx4/admin/tinyRX4.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tinyrx4.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinyrx4.svg)
![Статус зависимости](https://img.shields.io/david/bowao/iobroker.tinyrx4.svg)
![Известные уязвимости](https://snyk.io/test/github/bowao/ioBroker.tinyrx4/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tinyrx4.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/bowao/ioBroker.tinyrx4/master.svg)

# IoBroker.tinyrx4
## TinyRX4 адаптер для ioBroker
(Немецкая версия см. Ниже)

Чтение беспроводных сенсордат, полученных через TinyRX4

Беспроводной трансивер TinyTX4 и ресивер TinyRX4 были разработаны meigrafd на немецком форуме Raspberry Pi.

Страница проекта: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Трансивер: https://github.com/meigrafd/TinyTX4
* Получатель: https://github.com/meigrafd/TinyRX4

Целью проекта является использование беспроводных датчиков с питанием от батарей, а также получение и оценка данных с помощью RaspberryPI.

В принципе, вы можете использовать все типы датчиков в качестве датчика, например, температура, влажность, давление воздуха, высотомер, датчики присутствия, магнитные переключатели, датчики вибрации, измерители влажности и т. д.

Этот ioBroker-адаптер поддерживает все эскизы датчиков, опубликованные на https://github.com/meigrafd/TinyTX4.

* BMP085 (Датчик давления / температуры)
* DHT22 (Датчик температуры / влажности)
* DS18B20 (датчик температуры)
* HCSR04 (ультразвуковой датчик)
* ReedSwitch (дверной / оконный контакт)

Далее поддерживаются эскизы:

* BME280 (Датчик давления / температуры / влажности) https://github.com/bowao/tinytx4_bme280

В конфигурации адаптера можно установить последовательный интерфейс и соответствующую скорость передачи. Кроме того, в уже созданных датчиках можно искать новые или случайно удаленные точки данных, не создавая заново весь датчик.

Датчики автоматически создаются с их идентификатором узла после получения первого сообщения. Создаются только те точки данных, которые обнаруживаются через переменные msg. Кроме того, соответствующие точки данных смещения создаются в «config», так что значения датчика могут быть скорректированы при необходимости. Рассчитанные данные точек влажности абсолютной и точки росы создаются в «Рассчитанном», но только если датчик выдает значения температуры и относительной влажности.

Если вы используете другие датчики с настроенными переменными msg, я могу реализовать это в адаптере или сделать запрос на извлечение. Переменные msg должны отличаться от уже используемых.

Уже используемые msg-переменные

* d = расстояние
* h = влажность
* он = высота
* p = давление воздуха
* r = Рид-контакт
* t = температура
* v = напряжение аккумулятора

-------------------------------------------------------------------------------------------

## TinyRX4 адаптер для ioBroker
Einlesen der vom TinyRX4 empfangenen Funksensordaten

Der Funksender TinyTX4 и der Funkempfänger TinyRX4 предоставляет полный набор услуг Raspberry Pi Forum entwickelt.

Проект-Сайт: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Отправитель: https://github.com/meigrafd/TinyTX4
* Empfänger: https://github.com/meigrafd/TinyRX4

Ziel des Projekts ist es, schnurlose Funk Sensoren, die uber Batterien versorgt werden, zu betreiben und mit dem RaspberryPI die Daten zu empfangen sowie auszuwerten.

Алс Сенсор канн мэн им Принцип алле Артен фон Сенсорен Фервенден, з.б. Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw.

Dieser ioBroker-Adapter unterstützt alter unter https://github.com/meigrafd/TinyTX4 hinterlegten Sensorsketche:

* BMP085 (Druck- / Temperatursensor)
* DHT22 (Temperatur- / Feuchtesensor)
* DS18B20 (Температурсенсор)
* HCSR04 (датчик ультразвука)
* ReedSwitch (Tür- / Fensterkontakt)

Weitere unterstützte Sketche:

* BME280 (Druck- / Temperatur- / Feuchtesensor) https://github.com/bowao/tinytx4_bme280

В адаптере Конфигурация может быть использована в качестве дополнительной информации. Außerdem besteht die möglichkeit für bereits erstellte Sensoren nach neuen oder versehentlich gelöschten Datenpunkte zu suchen ohne das der komplette Датчик neu angelegt werden muss.

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt. Es werden jewelils nur die Datenpunkte angelegt, die über die msg-Variablen erkannt wurden. Свернуть все как можно раньше "config" die zugehörigen offset. Unter "рассчитанный" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur and родственник Feuchte liefert.

Falls ihr anddere Sensoren mit angepassten msg-Variablen verwendet, kannich dies gerne im Adapter. Die msg-Variablen müssen sich von den bereits benutzten unterscheiden.

Bereits Benutzte MSG-Variablen:

* d = Entfernung
* h = Luftfeuchte
* он = Хохе
* p = Люфтдрук
* r = Рид-Контакт
* t = температура
* v = Batteriespannung

## Changelog
### 0.1.4
- (bowao) fix typo

### 0.1.3
- (bowao) fix npm Version

### 0.1.2
- (bowao) close serialport on unload and cleanup 2

### 0.1.1
- (bowao) close serialport on unload and cleanup

### 0.1.0
- (boawo) add option to search new data points on already created sensors
- (bowao) add calculated data points humidity_absolute and dew point
- (bowao) remove TiNo support (TiNo now has his own adapter)

### 0.0.3
- (bowao) add support for TiNo
- (bowao) bugfix

### 0.0.2
- (bowao) cleanup and npm release

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2019 bowao

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