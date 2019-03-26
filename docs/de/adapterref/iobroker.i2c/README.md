---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.i2c/README.md
title: ioBroker-Adapter für I2C
hash: YdEHFEtQsNwxTXO34qNX/YQqFan3tm6eR2KEMuVdOBA=
---
![I2C-Logo](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

![Anzahl der Installationen](http://iobroker.live/badges/i2c-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.i2c.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)
![GitHub Probleme](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)

# IoBroker-Adapter für I2C
Kommuniziert über den I2C-Bus mit Geräten, die an das lokale System angeschlossen sind.

Dieser Adapter sollte auf Linux-Boards wie dem Raspberry Pi, C.H.I.P., BeagleBone oder Intel Edison funktionieren.

## Installieren
Bitte lesen Sie vor der Installation die [Installationsanleitung des i2c-bus Moduls](https://www.npmjs.com/package/i2c-bus#installation).

Stellen Sie insbesondere sicher, dass Sie I2C auf Ihrem System ordnungsgemäß konfiguriert und aktiviert haben (falls erforderlich):

* [I2C auf dem Raspberry Pi konfigurieren] (https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)
* [I2C auf dem Intel Edison Arduino Base Board konfigurieren] (https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md)

Nachdem Sie I2C aktiviert und konfiguriert haben, können Sie diesen Adapter über ioBroker Admin installieren:

1. Starten Sie den Adapter (er muss ausgeführt werden, damit die Erkennung funktioniert).
2. Öffnen Sie den Instanzkonfigurationsdialog
3. Klicken Sie auf die Schaltfläche "Search Devices" (Geräte suchen), um alle angeschlossenen I2C-Geräte zu finden. Dies dauert einige Zeit, haben Sie etwas Geduld!
4. Konfigurieren Sie alle gefundenen Geräte in ihren jeweiligen Registerkarten.
5. Speichern Sie die Konfiguration (dadurch wird der Adapter neu gestartet)

## Aufbau
### Bus Nummer
Dies ist die Nummer des zu öffnenden I2C-Bus / -Adapters, 0 für / dev / i2c-0, 1 für / dev / i2c-1, ...

Bei Raspberry Pi 3 ist dies "1".

## Unterstützte Geräte
Die folgenden Geräte werden derzeit unterstützt. Die Zahlen in Klammern sind die bekannten Adressen des Geräts im Hexadezimalformat (ohne das Lesebit).

ADS1015 (48-4B)
Texas Instruments 4x 3,3-kSPS-, 12-Bit-ADCs mit interner Referenz.

ADS1115 (48-4B)
Texas Instruments 4x 860-SPS, 16-Bit-ADCs mit interner Referenz.

BME280 (76, 77)
Bosch Digitaler Feuchte-, Druck- und Temperatursensor.

### MCP23008 8-Bit-E / A-Erweiterung (20-27)
Microchip 8-Bit-E / A-Erweiterungsmodul mit serieller Schnittstelle.

### MCP23017 16-Bit-E / A-Erweiterung (20-27)
Microchip 16-Bit-E / A-Erweiterungsmodul mit serieller Schnittstelle.

### PCF8574 8-Bit-E / A-Erweiterung (20-27)
Texas Instruments 8-Bit-E / A-Erweiterungsmodul für I2C-Bus.

### PCF8574A 8-Bit-E / A-Erweiterungsmodul (38-3F)
Texas Instruments 8-Bit-E / A-Erweiterungsmodul für I2C-Bus.

## Kompatibilität
Die Kompatibilität wurde mit Raspberry Pi 3 getestet.

## Fehlerberichte und Funktionsanfragen
Bitte verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie fehlende Einheiten benötigen, geben Sie bitte den IC-Typ (Marke, Modell, ...) und seine Adresse (n) wie in der Adapterkonfiguration angegeben an.

## MACHEN
* Unterstützung von Interrupts anstatt nur für MCP230xx und PCF8574 abzufragen

## Vielen Dank
Dieses Projekt basiert auf dem Modul [i2c-bus](https://www.npmjs.com/package/i2c-bus) NPM. Danke an fivdi für sein tolles Modul!

## Drittlizenzen
BME280
Der BME280-Code basiert auf https://github.com/skylarstein/bme280-sensor:

MIT-Lizenz

Copyright (c) 2016 Skylar Stein

Jede Person, die eine Kopie dieser Software und der dazugehörigen Dokumentationsdateien (die "Software") erhält, kann hiermit kostenlos die uneingeschränkte Behandlung der Software, einschließlich der Rechte zur Verwendung, zum Kopieren, Ändern, Zusammenführen, vornehmen Kopien der Software veröffentlichen, verteilen, unterlizenzieren und / oder verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zulassen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisschein sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHT VERLETZUNG. DIE AUTOREN ODER COPYRIGHT-INHABER HAFTEN KEINERLEI HAFTUNG FÜR HAFTUNGSANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WENN SIE IN EINEM VERTRAGSVERFAHREN, DORT ODER ANDERWEITIG ENTWICKELN, WENN SIE VON DER SOFTWARE ODER IN VERBINDUNG MIT DER SOFTWARE ODER IN DER VERWENDUNG ODER IN ANDEREN VERHÄLTNISSE ENTSTEHEN SOFTWARE.

### ADS1x15
Der ADS1x15-Code basiert auf https://github.com/alphacharlie/node-ads1x15/blob/master/index.js

node-ads1x15 selbst basiert auf https://github.com/adafruit/Adafruit_Python_ADS1x15

Die MIT-Lizenz (MIT)

Copyright (c) 2016 Adafruit Industries

Jede Person, die eine Kopie dieser Software und der dazugehörigen Dokumentationsdateien (die "Software") erhält, kann hiermit kostenlos die uneingeschränkte Behandlung der Software, einschließlich der Rechte zur Verwendung, zum Kopieren, Ändern, Zusammenführen, vornehmen Kopien der Software veröffentlichen, verteilen, unterlizenzieren und / oder verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zulassen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisschein sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHT VERLETZUNG. DIE AUTOREN ODER COPYRIGHT-INHABER HAFTEN KEINERLEI HAFTUNG FÜR HAFTUNGSANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WENN SIE IN EINEM VERTRAGSVERFAHREN, DORT ODER ANDERWEITIG ENTWICKELN, WENN SIE VON DER SOFTWARE ODER IN VERBINDUNG MIT DER SOFTWARE ODER IN DER VERWENDUNG ODER IN ANDEREN VERHÄLTNISSE ENTSTEHEN SOFTWARE.

## Changelog

### 0.0.6 (2019-03-17)
* (UncleSamSwiss) Added support for BME280.
* (UncleSamSwiss) Added support for ADS1015 / ADS1115.

### 0.0.5 (2019-01-12)
* (UncleSamSwiss) Added support for MCP23008.

### 0.0.4 (2018-07-23)
* (UncleSamSwiss) Improved stability of MCP23017.
* (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3 (2017-11-12)
* (UncleSamSwiss) Added support for MCP23017.

### 0.0.2 (2017-07-30)
* (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1 (2017-07-27)
* (UncleSamSwiss) Initial version