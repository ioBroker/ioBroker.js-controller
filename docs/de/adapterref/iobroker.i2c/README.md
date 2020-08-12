---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.i2c/README.md
title: ioBroker Adapter für I2C
hash: 6LeU2QT3MHsl6Bh2FqtsRihb34PN6QOwp+5QpwhKy9E=
---
![Anzahl der Installationen](http://iobroker.live/badges/i2c-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.i2c.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)
![GitHub Probleme](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)

*** **WICHTIGES UPDATE**

Die Entwicklung dieses Adapters wird im August 2020 wieder aufgenommen. Bleib dran!

Ich werde zunächst die dringendsten Probleme lösen, gefolgt von einer neuen Hauptversion, die den Adapter auf den neuesten Entwicklungsstandard bringt.
***.

![I2C-Logo](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

# IoBroker Adapter für I2C
Kommuniziert mit Geräten, die über den I2C-Bus mit dem lokalen System verbunden sind.

Dieser Adapter sollte auf Linux-Boards wie Raspberry Pi, C.H.I.P., BeagleBone oder Intel Edison funktionieren.

## Installieren
Bitte lesen Sie vor der Installation die [Installationsanleitung des i2c-Bus-Moduls](https://www.npmjs.com/package/i2c-bus#installation).

Stellen Sie insbesondere sicher, dass Sie I2C auf Ihrem System ordnungsgemäß konfiguriert und aktiviert haben (falls erforderlich):

* [I2C auf dem Raspberry Pi konfigurieren] (https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)
* [Konfigurieren von I2C auf dem Intel Edison Arduino Base Board] (https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md)

Nachdem Sie I2C aktiviert und konfiguriert haben, können Sie diesen Adapter über ioBroker Admin installieren:

1. Starten Sie den Adapter (er muss ausgeführt werden, damit die Erkennung funktioniert).
2. Öffnen Sie den Instanzkonfigurationsdialog
3. Klicken Sie auf die Schaltfläche "Geräte suchen", um alle angeschlossenen I2C-Geräte zu ermitteln. Dies kann einige Zeit dauern. Seien Sie geduldig!
4. Konfigurieren Sie alle gefundenen Geräte auf ihren jeweiligen Registerkarten.
5. Speichern Sie die Konfiguration (dadurch wird der Adapter neu gestartet)

### Problem mit Zugriffsrechten
Abhängig vom Alter Ihrer ioBroker-Installation verfügt der Benutzer `iobroker` (oder unter welchem Benutzer auch immer ioBroker ausgeführt wird) möglicherweise nicht über die entsprechenden Rechte für den Zugriff auf I2C.

Wenn Sie ein Gerät angeschlossen haben und es nicht im Konfigurationsbildschirm angezeigt wird, stellen Sie sicher, dass der Benutzer zur Gruppe `i2c` hinzugefügt wurde:

```sh
sudo usermod -G i2c iobroker
```

Hinweis: Wenn Sie keine Standardinstallation haben, ersetzen Sie `iobroker` im obigen Befehl durch den Benutzer, der Ihre ioBroker-Installation ausführt (überprüfen Sie dies mit `ps`).

## Aufbau
### Bus Nummer
Dies ist die Nummer des zu öffnenden I2C-Busses / Adapters, 0 für / dev / i2c-0, 1 für / dev / i2c-1, ...

Auf Raspberry Pi 3 ist dies "1".

## Unterstützte Geräte
Die folgenden Geräte werden derzeit unterstützt. Die Zahlen in Klammern sind die bekannten Adressen des Geräts im Hexadezimalformat (ohne das Lesebit).

### ADS1015 (48-4B)
Texas Instruments 4x 3,3-kSPS, 12-Bit-ADCs mit interner Referenz.

### ADS1115 (48-4B)
Texas Instruments 4x 860-SPS, 16-Bit-ADCs mit interner Referenz.

### BME280 (76, 77)
Bosch Digitaler Feuchtigkeits-, Druck- und Temperatursensor.

### MCP23008 8-Bit-E / A-Expander (20-27)
Microchip 8-Bit I / O Expander mit serieller Schnittstelle.

### MCP23017 16-Bit-E / A-Expander (20-27)
Microchip 16-Bit I / O Expander mit serieller Schnittstelle.

### PCF8574 8-Bit-E / A-Expander (20-27)
Remote 8-Bit-E / A-Expander von Texas Instruments für I2C-Bus.

### PCF8574A 8-Bit-E / A-Expander (38-3F)
Remote 8-Bit-E / A-Expander von Texas Instruments für I2C-Bus.

## Kompatibilität
Die Kompatibilität wurde mit Raspberry Pi 3 getestet.

## Fehlerberichte und Funktionsanforderungen
Verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie fehlende Abweichungen benötigen, geben Sie bitte den IC-Typ (Marke, Modell, ...) und dessen Adresse (n) an, wie in der Adapterkonfiguration angegeben.

## MACHEN
* Unterstützt Interrupts, anstatt nur MCP230xx und PCF8574 abzufragen

## Vielen Dank
Dieses Projekt basiert auf dem NPM-Modul [i2c-bus](https://www.npmjs.com/package/i2c-bus) NPM. Vielen Dank an fivdi für sein tolles Modul!

## Lizenzen von Drittanbietern
### BME280
Der BME280-Code basiert auf https://github.com/skylarstein/bme280-sensor:

MIT-Lizenz

Copyright (c) 2016 Skylar Stein

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, kostenlos die Erlaubnis erteilt, uneingeschränkt mit der Software umzugehen, einschließlich, jedoch nicht beschränkt auf die Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen , veröffentlichen, vertreiben, unterlizenzieren und / oder verkaufen Kopien der Software und erlauben Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen:

Der oben genannte Copyright-Hinweis und dieser Genehmigungshinweis sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNG FÜR MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL HAFTEN DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNGEN, OB VERTRAGS-, TORT- ODER ANDERWEITIGE MASSNAHMEN, DIE AUS, AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN ANGEBOTE ENTSTEHEN SOFTWARE.

### ADS1x15
Der ADS1x15-Code basiert auf https://github.com/alphacharlie/node-ads1x15/blob/master/index.js

node-ads1x15 selbst basiert auf https://github.com/adafruit/Adafruit_Python_ADS1x15

Die MIT-Lizenz (MIT)

Copyright (c) 2016 Adafruit Industries

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, kostenlos die Erlaubnis erteilt, uneingeschränkt mit der Software umzugehen, einschließlich, jedoch nicht beschränkt auf die Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen , veröffentlichen, vertreiben, unterlizenzieren und / oder verkaufen Kopien der Software und erlauben Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen:

Der oben genannte Copyright-Hinweis und dieser Genehmigungshinweis sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNG FÜR MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL HAFTEN DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNGEN, OB VERTRAGS-, TORT- ODER ANDERWEITIGE MASSNAHMEN, DIE AUS, AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN ANGEBOTE ENTSTEHEN SOFTWARE.

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