---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: 5EyTLSIHjhIfH6MS/cb+yVrDxgGfH0Kijr4bXEZyRNk=
---
![логотип](../../../en/adapterref/iobroker.tino/admin/tino.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tino.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Статус зависимости](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Известные уязвимости](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)

# IoBroker.tino
## Адаптер TiNo для ioBroker
(Немецкая версия см. Ниже)

Чтение беспроводных сенсорных данных, полученных через протокол TiNo версии 1.01 и протокол TiNo версии 2.0
Соответствующая версия протокола автоматически определяется на основе полученных данных.

Беспроводной приемопередатчик и приемник TiNo были разработаны nurazur.

Страница проекта: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

«** TI ** ny ** NO ** de»: беспроводной датчик с батарейным питанием или беспроводной субъект. Целью проекта является разработка экономичных беспроводных датчиков с батарейным питанием небольшого размера. Датчики связываются со шлюзами, как малиновый пи. Цели:

* низкая стоимость (спецификация до 5 евро)
* очень маленький размер (спичечный коробок)
* сверхнизкий ток сна
* длительное время автономной работы: 5 лет и более на элементе CR2032
* большой радиус действия (что бы это ни значило :-), но очень долго)
* просто построить
* безопасность связи
* Прошивка Plug & Play

Датчики могут быть практически любыми, такими как температура, относительная влажность, давление воздуха, высотомер, интенсивность света, УФ-индекс, датчики движения, герконы и т. Д.

В конфигурации адаптера можно установить последовательный интерфейс и соответствующую скорость передачи.
Когда режим обучения активирован, датчики автоматически создаются с их идентификатором узла и всеми распознанными точками данных после первого приема сообщения.
Режим обучения заканчивается автоматически через 10 минут и может быть активирован еще на 10 минут в разделе «Информация» через пункт данных «learningMode».
Соответствующие точки данных смещения создаются в «config», так что значения датчика могут быть скорректированы при необходимости.
Рассчитанные данные точек влажности абсолютной и точки росы создаются в разделе «Рассчитано», но только если датчик выдает значения температуры и относительной влажности.

Для протокола получателя версии 1.01 будут созданы следующие точки данных:

* NodeId
* RSSI
* Напряжение батареи
* Счетчик сообщений
* Температура
* Влажность
* Сердцебиение (только в версии протокола 1.01)
* Интерпрет 1, 2 и 3
* Индикатор ошибки частоты (только в версии протокола 1.01)
* Температура RFM69 (только в версии протокола 1.01)
* Битовые ошибки

Кроме того, следующие точки данных создаются для протокола приемника версии 2.0 (если доступно).

* Прерывание от 4 до 8
* синхронизирован
* Индикатор качества связи
* Смещение частоты
* Расстояние (только при установленном датчике расстояния)
* Высота (только с установленным датчиком высоты)
* Давление воздуха (только при установленном датчике давления воздуха)
* Контакт (только при установленном герконовом контакте)

-------------------------------------------------------------------------------------------

## Адаптер TiNo для ioBroker
Einlesen der vom TiNo Версия 1.01 и TiNo Версия 2.0 empfangenen Функциональные возможности.
Die entsprechende Protokoll-Version - необычный автомат для ручной работы с датами.

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Проект-Сайт: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"** TI ** ny ** NO ** de": Аккумуляторный блок Funksensor oder Funk-Aktor. Ziel Dieses Projekts ist die Entwicklung schnurloser Funk Sensoren, die über Batterien versorgt werden und z.B. mit dem Raspberry Pi kommunizieren. Die Entwicklung hat zum Ziel:

* минимальный Костен (Штюккостен под 5 евро)
* минимальный Grösse (Streichholzschachtel)
* минималер Стромвербраух
* maximale Batterielebensdauer (5 часов)
* максимальный рейхвайт
* максимальный einfach nachzubauen
* Прошивка Plug & Play

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsonsen Senssen usten также.

В адаптере Конфигурация может быть использована в качестве дополнительной информации.
Wenn der Anlermodus aktiviert ist, werden die Sensoren nach demersten Nachrichten-Empfang automatisit mit ihrer Node-Id and allen erkannten Datenpunkten angelegt.
Der Anlernmodus вирд нач 10мин. Автоматизированные данные и информация "Информация" über den Datenpunkt "Режим обучения" в течение 10 минут. erneut aktiviert werden.
Unter «config» werden die zugehörigen offset, Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.
Unter «рассчитанный» werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur and родственник Feuchte liefert.

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt:

* NodeId
* Signalstärke (RSSI)
* Batteriespannung
* Nachrichtenzähler
* Температур
* Фейхте
* Heartbeat (Nur в Protokoll версии 1.01)
* Прерывает 1 бис 3
* Frequenzfehler Indikator (Nur в Protokoll версии 1.01)
* RFM69 Temperatur (Nur в Protokoll версии 1.01)
* Битфехлер

zusätzlich werden für das Empfänger-Protokoll Version 2.0 folgende Datenpunkte angelegt (wenn vorhanden).

* Прерывание 4 бис 8
* Синхронизация
* Каналгюте
* Frequenzversatz
* Entfernung (Nur bei installiertem Entfernungssensor)
* Хоэ (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Рид-Контакт (Nur bei installiertem Рид-Контакт)

## Changelog
### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

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