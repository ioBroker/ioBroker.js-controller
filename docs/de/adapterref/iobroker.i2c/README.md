---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.i2c/README.md
title: ioBroker.i2c
hash: HiafKBZXcIvhJGJZZKuT+LfM2j3JgZ8pnQi59bg3gY8=
---
![Logo](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.i2c.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/i2c-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/i2c-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/UncleSamSwiss/iobroker.i2c.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/UncleSamSwiss/ioBroker.i2c/badge.svg)
![NPM](https://nodei.co/npm/iobroker.i2c.png?downloads=true)

# IoBroker.i2c
[![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/i2c/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Tests: ** ![Testen und freigeben](https://github.com/UncleSamSwiss/ioBroker.i2c/workflows/Test%20and%20Release/badge.svg)

## I2C-Adapter für ioBroker
Kommuniziert mit Geräten, die über den I2C-Bus mit dem lokalen System verbunden sind.

Dieser Adapter sollte auf Linux-Boards wie Raspberry Pi, C.H.I.P., BeagleBone oder Intel Edison funktionieren.

## Installieren
Bitte lesen Sie vor der Installation die [Installationsanleitung des i2c-Bus-Moduls](https://www.npmjs.com/package/i2c-bus#installation).

Stellen Sie insbesondere sicher, dass Sie I2C auf Ihrem System ordnungsgemäß konfiguriert und aktiviert haben (falls erforderlich):

- [I2C auf dem Raspberry Pi konfigurieren] (https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)
- [I2C auf dem Intel Edison Arduino Base Board konfigurieren] (https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md)

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
sudo usermod -aG i2c iobroker
```

Hinweis: Wenn Sie keine Standardinstallation haben, ersetzen Sie `iobroker` im obigen Befehl durch den Benutzer, der Ihre ioBroker-Installation ausführt (überprüfen Sie dies mit `ps`).

## Aufbau
### Bus Nummer
Dies ist die Nummer des zu öffnenden I2C-Busses / Adapters, 0 für / dev / i2c-0, 1 für / dev / i2c-1, ...

Bei Raspberry Pi 3 und 4B ist dies "1".

## Unterstützte Geräte
Die folgenden Geräte werden derzeit unterstützt. Die Zahlen in Klammern sind die bekannten Adressen des Geräts im Hexadezimalformat (ohne das Lesebit).

### Adafruit STEMMA Bodensensor (36)
Adafruit STEMMA Bodensensor - Kapazitiver Feuchtigkeitssensor I2C mit dem ATSAMD10-Chip.

### ADS1015 16-Bit-4-Kanal-ADC (48-4B)
Texas Instruments 4x 3,3-kSPS, 12-Bit-ADCs mit interner Referenz.

### ADS1115 16-Bit-4-Kanal-ADC (48-4B)
Texas Instruments 4x 860-SPS, 16-Bit-ADCs mit interner Referenz.

### BME280 (76, 77)
Bosch Digitaler Feuchtigkeits-, Druck- und Temperatursensor.

### GY-US42 Sonar-Entfernungsmesser (70)
MaxSonar GY-US42 Sonar-Entfernungsmesser 20 - 720 cm.

### HMC5883L 3-Achsen-Digitalkompass (1E)
Honeywell 3-Achsen-Digitalkompass-IC.

### INA219 Strom- / Leistungsüberwachung (40-4F)
Zero-Drift, bidirektionaler Strom- / Leistungsmonitor von Texas Instruments.

### MCP23008 8-Bit-E / A-Expander (20-27)
8-Bit-E / A-Expander mit Mikrochip und serieller Schnittstelle.

### MCP23017 16-Bit-E / A-Expander (20-27)
Microchip 16-Bit-E / A-Expander mit serieller Schnittstelle.

### MCP3422 18-Bit-2-Kanal-ADC (68)
Mikrochip 18-Bit-2-Kanal-Analog-Digital-Wandler mit integrierter Referenz.

### MCP3423 18-Bit-2-Kanal-ADC (68-6F)
Mikrochip 18-Bit-2-Kanal-Analog-Digital-Wandler mit integrierter Referenz.

### MCP3424 18-Bit-4-Kanal-ADC (68-6F)
Mikrochip 18-Bit, 4-Kanal-Analog-Digital-Wandler mit integrierter Referenz.

### MCP3426 16-Bit-2-Kanal-ADC (68)
16-Bit-Mikrochip-2-Kanal-Analog-Digital-Wandler mit integrierter Referenz.

### MCP3427 16-Bit-2-Kanal-ADC (68-6F)
16-Bit-Mikrochip-2-Kanal-Analog-Digital-Wandler mit integrierter Referenz.

### MCP3428 16-Bit-4-Kanal-ADC (68-6F)
16-Bit-4-Kanal-Analog-Digital-Wandler mit Mikrochip und integrierter Referenz.

### MCP4725 12-Bit-Digital-Analog-Wandler (60-67)
Mikrochip 12-Bit-Digital-Analog-Wandler mit EEPROM-Speicher.

### PCF8574 8-Bit-E / A-Expander (20-27)
Remote 8-Bit-E / A-Expander von Texas Instruments für I2C-Bus.

### PCF8574A 8-Bit-E / A-Expander (38-3F)
Remote 8-Bit-E / A-Expander von Texas Instruments für I2C-Bus.

### PCA9685 16-Kanal 12-Bit-PWM-Servo- / LED-Treiber (40-7F)
Adafruit PCA9685 Breakout-Board für 16-Kanal-12-Bit-PWM. Der Adapter konzentrierte sich auf die Verwendung der 16 Kanäle von 0..4095 als LED-Dimmer.
Kann viele LEDs ansteuern, wenn PWM (und GND) an ein N-Kanal-Mosfet-Modul angeschlossen sind, z. basierend auf D4184. Verbinden Sie die LED GND mit dem MOSFET und +12 / 24 / n V mit dem Netzteil.

### QMC5883L 3-Achsen-Magnetsensor (0D)
QST 3-Achsen-Magnetsensor.

### SHT3x Feuchtigkeits- und Temperatursensor (44-45)
Sensirion SHT3x Feuchtigkeits- und Temperatursensor.

### SRF02 Ultraschall-Ranger-Finder (70)
Devantech Ultrasonic Ranger Finder 16 - 600cm.

### SX1507 4-Kanal-Pegelverschiebungs-GPIO mit LED-Treiber (3E, 3F, 70, 71)
Semtech Worlds GPIO mit der niedrigsten Spannungspegelverschiebung und LED-Treiber für 4 Kanäle.

### SX1508 8-Kanal-Pegelverschiebungs-GPIO mit LED-Treiber und Tastaturmotor (20-23)
Semtech Worlds GPIO mit der niedrigsten Spannungspegelverschiebung mit LED-Treiber und Tastaturmotor für 8 Kanäle.

### SX1509 GPIO mit 16 Kanalpegelverschiebung mit LED-Treiber und Tastaturmotor (3E, 3F, 70, 71)
Semtech Worlds GPIO mit der niedrigsten Spannungspegelverschiebung mit LED-Treiber und Tastaturmotor für 16 Kanäle.

### Generisches Gerät (03-77)
Generisches I2C-Gerät. Register können je nach Hardware konfiguriert werden.

## Verwendung in Skripten
Unterstützte Befehle für `sendTo` in Skripten sind `search`, `read` und `write`.

`search` nimmt als Nachricht die Busnummer und gibt eine JSON-Zeichenfolge eines Arrays gefundener Adressen auf dem Bus zurück.

`read` nimmt als Nachricht ein Objekt, das die Adresse und optional das Register und die Anzahl der zu lesenden Bytes enthält. Es gibt einen Puffer mit den gelesenen Daten zurück.

`write` nimmt als Nachricht ein Objekt, das die Adresse, die Daten als Puffer und optional das zu schreibende Register enthält. Bei Erfolg wird der geschriebene Puffer zurückgegeben.

### Beispiele für die Verwendung von Skripten
```js
sendTo('i2c.0', 'search', 1, (ret) => {
    log('Ret: ' + ret, 'info');
});

sendTo(
    'i2c.0',
    'read',
    {
        address: 0x40,
        register: 0x02,
        bytes: 2,
    },
    (ret) => {
        log('Ret: ' + ret.inspect(), 'info');
    },
);

sendTo(
    'i2c.0',
    'write',
    {
        address: 0x40,
        register: 0x00,
        data: Buffer.from([0x44, 0x27]),
    },
    (ret) => {
        log('Ret: ' + ret.inspect(), 'info');
    },
);
```

## Kompatibilität
Die Kompatibilität wurde mit Raspberry Pi 3 und 4B getestet.

## Fehlerberichte und Funktionsanforderungen
Bitte verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie fehlende Abweichungen benötigen, geben Sie bitte den IC-Typ (Marke, Modell, ...) und dessen Adresse (n) an, wie in der Adapterkonfiguration angegeben.

## Entwicklung
### VS Code & Devcontainer
Dieses Repository ist so eingerichtet, dass die Entwicklung mit VS Code und Devcontainer durchgeführt werden kann. Öffnen Sie einfach den Stammordner dieses Repositorys mit VS-Code und bestätigen Sie, zu Devcontainer zu wechseln.

### Remote I2C
Wenn Sie auf einem Desktop-PC entwickeln und I2C auf einem SBC (z. B. einem Raspberry Pi) testen möchten, können Sie Folgendes tun:

- Installieren Sie ioBroker mit I2C auf dem SBC
- Installieren Sie diesen Adapter auf dem SBC
- Konfigurieren Sie die Adapterinstanz auf dem SBC manuell so, dass sie die Einstellung "serverPort" in "native" enthält:

```json
  "native": {
    "busNumber": 1,
    "serverPort": 5555
  }
```

- Sie müssen hier keine I2C-Geräte konfigurieren
- Fügen Sie Ihrem Desktop-ioBroker eine Adapterinstanz hinzu (oder verwenden Sie Devcontainer wie oben beschrieben).
- Konfigurieren Sie die Adapterinstanz auf Ihrem Desktop-PC manuell so, dass sie die Einstellung "clientAddress" in "native" enthält:

```json
  "native": {
    "busNumber": 1,
    "clientAddress": "http://<your-ip-address>:5555/rpc"
  }
```

- Stellen Sie sicher, dass Sie die richtige IP-Adresse und den richtigen Port verwenden (den auf dem Gerät konfigurierten).
- Starten Sie die Adapterinstanz auf Ihrem Desktop-PC neu
- Der Adapter führt jetzt alle I2C-Befehle auf dem konfigurierten SBC anstatt lokal aus
- Sie können die Einstellungen der Adapterinstanz auf Ihrem Desktop-PC öffnen und wie auf dem echten SBC nach I2C-Geräten suchen

Beachten Sie, dass der RPC-Server vollständig ungesichert ist und daher nur für die Entwicklung in einem sicheren Netzwerk verwendet werden sollte!

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

### PCA9685
Der PCA9685-Code basiert auf https://github.com/adafruit/Adafruit_Python_PCA9685/blob/master/Adafruit_PCA968/PCA9685.py

Die MIT-Lizenz (MIT)

Copyright (c) 2016 Adafruit Industries Autor: Tony DiCola

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, kostenlos die Erlaubnis erteilt, uneingeschränkt mit der Software umzugehen, einschließlich, jedoch nicht beschränkt auf die Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen , veröffentlichen, vertreiben, unterlizenzieren und / oder verkaufen Kopien der Software und erlauben Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen:

Der oben genannte Copyright-Hinweis und dieser Genehmigungshinweis sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNG FÜR MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL HAFTEN DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNGEN, OB VERTRAGS-, TORT- ODER ANDERWEITIGE MASSNAHMEN, DIE AUS, AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN ANGEBOTE ENTSTEHEN SOFTWARE.

Ebenfalls basierend auf: https://github.com/tessel/servo-pca9685/blob/master/index.js

Copyright 2014 Technical Machine, Inc. Siehe die COPYRIGHT-Datei im obersten Verzeichnis dieser Distribution.

Lizenziert unter der Apache-Lizenz, Version 2.0 <LICENSE-APACHE oder http://www.apache.org/licenses/LICENSE-2.0> oder der MIT-Lizenz <LICENSE-MIT oder http://opensource.org/licenses/MIT> nach Ihrer Wahl. Diese Datei darf nur gemäß diesen Bedingungen kopiert, geändert oder verteilt werden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.2.0 (2021-03-02)

-   (UncleSamSwiss) Added support for MCP342x family (#44).
-   (UncleSamSwiss) Added proper error handling on all periodic I2C operations (#112).

### 1.1.1 (2020-11-29)

-   (UncleSamSwiss) Fixed issue with device search not working (#53).

### 1.1.0 (2020-11-05)

-   (UncleSamSwiss) Added support for SX1507, SX1508 and SX1509.
-   (UncleSamSwiss) Added support for MCP4725.
-   (UncleSamSwiss) Added support for HMC5883L and QMC5883L.
-   (UncleSamSwiss) Added support for Adafruit STEMMA Soil Sensor.
-   (UncleSamSwiss) Added support for INA219.
-   (UncleSamSwiss) Changed polling interval of ADS1x15 to milliseconds.
-   (UncleSamSwiss) Fixed several bugs.

### 1.0.1 (2020-10-27)

-   (UncleSamSwiss) Removed unneeded files in NPM package

### 1.0.0 (2020-10-27)

-   (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language
-   (UncleSamSwiss) Rewrote entire UI in React with TypeScript

### 0.0.8 (2020-05-26)

-   (Peter Müller) Added support for Generic device.
-   (Peter Müller) Added support for `read` and `write` commands in scripts using `sendTo`.
-   (Peter Müller) Added support for interrupts on PCF8574, MCP23008, MCP23017 devices.

### 0.0.7 (2020-01-19)

-   (CC1337) Added support for PCA9685.

### 0.0.6 (2019-03-17)

-   (UncleSamSwiss) Added support for BME280.
-   (UncleSamSwiss) Added support for ADS1015 / ADS1115.

### 0.0.5 (2019-01-12)

-   (UncleSamSwiss) Added support for MCP23008.

### 0.0.4 (2018-07-23)

-   (UncleSamSwiss) Improved stability of MCP23017.
-   (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3 (2017-11-12)

-   (UncleSamSwiss) Added support for MCP23017.

### 0.0.2 (2017-07-30)

-   (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1 (2017-07-27)

-   (UncleSamSwiss) Initial version

## License

Copyright 2020 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.