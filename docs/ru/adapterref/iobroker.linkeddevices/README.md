---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.linkeddevices/README.md
title: Objekt (Datenpunkt) verlinken
hash: sJ8Vym9Cn0EmgbYJG+B0IgjEQKfhM9SkZlVFUvWfLE8=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![Количество установок](http://iobroker.live/badges/linkeddevices-installed.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

## Адаптер связанных устройств для ioBroker
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Создавайте связанные объекты (точки данных) ваших устройств с определенной структурой. Это позволяет создать структуру в ioBroker, где все объекты централизованы, например, для использования в vis или скриптах. Это дает преимущество, например, в том, что при аппаратном обмене должны быть воссозданы только связанные объекты, и все vis и сценарии снова работают.

С помощью адаптера вы можете конвертировать объекты или преобразовывать их в другие типы (еще не полностью реализованные).

<img src="screenshots/structure.png?sanitize=true&raw=true" title="Beispiel для лучшего структурирования"/>

Этот адаптер вдохновлен в [скрипт виртуальных устройств от Pman](https://forum.iobroker.net/topic/7751/virtual-devices).

# Objekt (Datenpunkt) verlinken
Ein Objekt (Datenpunkt) Каннст дю Абер ден Баттон 'Einstellungen' im Men� 'Objekt' erstellen.

<img src="screenshots/object_tree_custom_button.png?sanitize=true&raw=true" title="Men� &#39;Objekt&#39;"/>

## Objekt (Datenpunkt) Einstellungen
<img src="screenshots/custom_dialog.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

Die folgenden Grundeinstellungen m�ssen f�r das verlinkte Объект проекта vordenommen werden:

| Eingabefeld | Beschreibung |
|---|---|
| Активьерт | ein Verlinkung f�r das Objekt aktivieren |
| Исправление для идентификатора объекта | Bezeichung die der Id des verlinkten Objektes vorangestellt werden soll |
| ID des verlinkten Объекты | Id des verlinkten Objektes |
| Zusammengesetze Id des verlinkten Объекты | Zeigt a wie die Id des verlinkten Objektes aussehen wird - Zusammensetzung von *'Исправление для идентификатора verlinkten Objektes' & 'ID для verlinkten Objekts'* |

Weiter k�nnt ihr noch folgende Einstellungen vornehmen:

| Eingabefeld | Beschreibung |
|---|---|
| Имя des verlinkten Objekts | Hier k�nnt ihr einen Namen f�r das verlinkte Objekte festlegen |
| Experteneinstellungen f verr verlinktes Objekt vom Typ 'X' | weitere Einstellungen die abh�ngig vom Typ des Objektes sind. ([Об этом говорится в сообщении )) <ul><li> [Захл (только для чтения)] (https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl-readonly) </li><li> [Zahl](https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl) </ li> </ ul> |

** Beispiel: ** Die oben im Screenshot dargestellten Eingaben erzeugen das folgende verlinkte Объект: <img src="screenshots/example_create_linkedObject.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

## Experteneinstellungen for verlinktes Objekt vom Typ 'X'
Abh�ngig vom Typ (Zahl, Logigwert, Zeichenkette и др.) Des zu verlinkenden Objektes, ktesnnt Ihr weitere Einstellungen, wie z.B. Umrechnungen oder Umwandlungen in einen anderen Typ for fasr das verlinkte Objekt einstellen.

### Experteneinstellungen for verlinktes Objekt vom Typ 'Zahl (readonly)'
<img src="screenshots/expert_settings_number_readonly.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

#### 'Захл (только для чтения)': конвертируется в Typ 'nicht umwandeln'
<img src="screenshots/expert_settings_number_readonly_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | Erlaubte Eingabe | Бейспил (Сихе Билд) |
|---|---|---|---|
| Endere Einheit 'X' в | Einheit f�r das verlinkte Objekt festlegen | Кейне Бешрункунг | Objekt hat Einheit 'кВтч', verlinktes Objekt hat Einheit 'Wh' |
| Максимум. Anzahl der Nachkommastellen | Максимум. Anzahl der Nachkommastellen f�r das verlinkte Objekt festlegen | Захлен | Wert des Objekts '100.561' ergibt f�r das verlinkte Objekt den Wert '101' |
| Minndere min 'X' в | минималер Wert der das verlinkte Objekt annehmen darf | Захлен | - |
| Maxndere max 'X' auf | Maximaler Wert der Das Verlinkte Objekt Annehmen Darf | Захлен | - |
| Umrechnung f verr verlinktes «читать» Объект | математический форум по делам женщин | _ + - / * ,. () _ & * Zahlen * | Wert des Objektes '279688.9' mit Umrechnung '/ 1000' zeigt beim verlinkten Objekt den Wert '280.6889' an |

#### Zahl (только для чтения): конвертирование в Typ 'Logikwert'
<img src="screenshots/expert_settings_number_readonly_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | Erlaubte Eingabe | Бейспил (Сихе Билд) |
|---|---|---|---|
| Bedingung 'true' for verlinktes Objekt | Wert des Objektes, в настоящее время объект Objekt auf 'true' gesetzt werden soll | *=! => <> = <=* + *Захлен* | F�r Werte '> 100' Объяснение истины Объектив 'истина' |

### Experteneinstellungen for verlinktes Objekt vom Typ 'Zahl'
#### "Захл": Конвертир в типе 'nicht umwandeln'
<img src="screenshots/expert_settings_number_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | Erlaubte Eingabe | Бейспил (Сихе Билд) |
|---|---|---|---|
| Endere Einheit 'X' в | Einheit f�r das verlinkte Objekt festlegen | Кейне Бешрункунг | Objekt hat keine Einheit, verlinktes Objekt hat kein Einheit '%' |
| Максимум. Anzahl der Nachkommastellen | Максимум. Anzahl der Nachkommastellen f�r das verlinkte Objekt festlegen | Захлен | Wert des Objekts '100.561' ergibt f�r das verlinkte Objekt den Wert '101' |
| Minndere min 'X' в | минималер Wert der das verlinkte Objekt annehmen darf | Захлен | - |
| Maxndere max 'X' auf | Maximaler Wert der Das Verlinkte Objekt Annehmen Darf | Захлен | - |
| Umrechnung f�r verlinktes Objekt | математический форум по делам женщин | _ / *, ._ & * Zahlen * | Wert des Objektes '180' mit Umrechnung '* 100/255' zeigt beim verlinkten Objekt den Wert '71' an. Umgekehrt wird der Kehrwert bei der Berechnung gebildet, d.h. Вен дас Верлинте Objekt den Wert '71' шляпа, шляпа das Objekt den Wert '180'. Das kann z.B. для Hue Lampen verwendet werden, um den Wertebereich von '0-255' в '0% -100%' umzuwandeln |

#### "Захл": Конвертир в типе "Логикверт"
<img src="screenshots/expert_settings_number_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | Erlaubte Eingabe | Бейспил (Сихе Билд) |
|---|---|---|---|
| Bedingung 'true' for verlinktes Objekt | Wert des Objektes, в настоящее время объект Objekt auf 'true' gesetzt werden soll | *=! => <> = <=* + *Захлен* | F�r Werte '> 30' Объяснение истины Объектив 'истина' |
| Wert wenn verlinktes Objekt 'true' ist | Wert des Objektes wenn das verlinkte Objekt 'истинный' ist | Захлен | Wird das verlinkte Objekt auf 'true' gesetzt, wird der Wert des Objektes '30' |
| Wert wenn verlinktes Objekt 'false' ist | Wert des Objektes wenn das verlinkte Objekt 'false' ist | Захлен | Wird das verlinkte Objekt auf 'false' gesetzt, wird der Wert des Objektes '10' |

## Changelog

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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