---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.haier/README.md
title: ioBroker Haier-Klimaanlagenadapter
hash: N69K+jE3mMiQAZLXCzj7tUkAaIbUgB9nT/OOTczYy0o=
---
![Logo](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![Anzahl der Installationen](http://iobroker.live/badges/haier-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.haier.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.haier.svg)
![Tests](http://img.shields.io/travis/instalator/ioBroker.haier/master.svg)
![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)

# IoBroker Haier-Klimaanlagenadapter ==================
Der IoBroker Haier-Adapter wird zur Steuerung Ihrer Haier-Klimaanlage über UART in Verbindung mit dem TCP-zu-Serial-Gateway verwendet.
Die Arbeit wird an der Klimaanlage der 'Lightera'-Serie überprüft.

## Hardware
Als TCP-zu-Seriell-Gateway verwende ich diese [code] (https://github.com/instalator/ESP8266.TelnetToSerial) und dieses [Gerät](https://blog.instalator.ru/archives/433).

## Verwenden von
### Leistung
Klimaanlage ein- und ausschalten. (wahr falsch)

### Temp
Aktuelle Anzeigen der Raumtemperatur (°C)

### Settemp
Temperatur einstellen. (16 - 30 °C)

### Modus
* **smart** oder **0** - Ein Schlüssel kann für ein komfortables Zimmer sorgen! Das Klimagerät kann die Innentemperatur und Luftfeuchtigkeit beurteilen und die Einstellung entsprechend vornehmen.
* **cool** oder **1** - Kühlraum.
* **heizen** oder **2** - Raumheizung.
* **Lüfter** oder **3** - Nur Lüfter.
* **trocken** oder **4** - Luftentfeuchtung.

### Lüftergeschwindigkeit
* **min** oder **2**
* **Mitte** oder **1**
* **max** oder **0**
* **automatisch** oder **3**

### Schwingen
* **ud** oder **1** - Auto auf / ab.
* **lr** oder **2** - Auto links / rechts.
* **beide** oder **3** - beide Richtungen.
* **false** oder **0** - Aus.

### Gesundheit
(true / false) Der Wasser-Ionen-Generator im Klimagerät kann eine große Menge Anion erzeugen, die die Position und das Anion in der Luft effektiv ausbalanciert, Bakterien abtötet und das Staubablagment im Raum beschleunigt und schließlich die Luft reinigt das Zimmer.

### Lockremote
IR-Fernbedienung sperren (true / false)

### Kompressor
Wenn der Kompressor eingeschaltet ist

### Frisch
(true / false) Lassen Sie die verdorbene Luft aus dem Raum ab und atmen Sie frische Luft ein.
(Diese Funktion ist bei einigen Modellen nicht verfügbar.)

### Roh
Senden Sie RAW HEX-Code ohne Startbytes und Prüfsummenbeispiel: Einschalten - **0A000000000001014D02**

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