---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: Sned5trIfAFdUgBpKKClgG/rVfUx5J55OH8O7QooxDc=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

# Iobroker.modbus
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Implementierung von ModBus Slave und Master für ioBroker. Folgende Typen werden unterstützt:

- Modbus RTU über seriell (Master)
- Modbus RTU über TCP (Master)
- Modbus TCP (Slave, Master)

## Die Einstellungen
### Partner-IP-Adresse
IP-Adresse des Modbus-Partners.

### Hafen
TCP-Port des Modbus-Partners bei Konfiguration als Master (Client) oder eigener Port bei Konfiguration als Slave (Server).

### Geräte ID
Modbus-Geräte-ID. Wichtig, wenn eine TCP / Modbus-Brücke verwendet wird.

### Art
Slave (Server) oder Master (Client).

### Verwenden Sie Aliase als Adresse
Normalerweise können alle Register Adressen von 0 bis 65535 haben. Mithilfe von Aliasen können Sie virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- Die diskreten Eingänge reichen von 10001 bis 20000
- Spulen sind von 1 bis 1000
- Eingangsregister sind von 30001 bis 40000
- Halteregister reichen von 40001 bis 60000

Jeder Alias wird intern der Adresse zugeordnet, z. 30011 wird dem Eingangsregister 10 zugeordnet und so weiter.

### Adressen nicht an Wörtern ausrichten
Normalerweise sind die Spulen und die Adressen der diskreten Eingänge auf 16 Bit ausgerichtet. Gleiche Adressen von 3 bis 20 werden auf 0 bis 32 ausgerichtet.
Wenn diese Option aktiv ist, werden die Adressen nicht ausgerichtet.

### Runde Real zu
Wie viele Stellen nach dem Komma für float und double.

### Abfrageverzögerung
Zyklisches Abfrageintervall (nur für Master relevant)

### Wiederverbindungszeit
Wiederverbindungsintervall (nur für Master relevant)

### Pulszeit
Wenn ein Impuls für Spulen verwendet wird, definiert dies das Intervall, wie lang der Impuls ist.

### Maximale Länge der Leseanforderung
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS als Anzahl der zu lesenden Register.

Einige Systeme erfordern eine erste "Schreibanforderung", um die Daten bei "Leseanforderung" zu liefern.
Sie können diesen Modus erzwingen, indem Sie die "Maximale Länge der Leseanforderung" auf 1 setzen.

** Hinweis: ** Einige USB-Modbus-Lösungen (z. B. basierend auf socat) können Probleme mit dem Serialport-npm-Modul haben.

Es gibt ein Software-Gateway [** Modbus RTU <-> Modbus RTU über TCP **](http://mbus.sourceforge.net/index.html), um die Verwendung der seriellen RTU über das TCP-Protokoll zu ermöglichen.

Beide Lösungen **RTU über TCP** und **TCP** funktionieren gut.

### Verwenden Sie nicht mehrere Register
Wenn der Slave den Befehl "Mehrere Register schreiben" nicht unterstützt, können Sie ihn aktivieren, um Warnungen zu erhalten, wenn die mehreren Register geschrieben werden.

### Schreibintervall
Verzögerung zwischen zwei Schreibanforderungen in ms. Standard 0.

## Datentypen
- uint16be - 16 Bit ohne Vorzeichen (Big Endian): AABB => AABB
- uint16le - Vorzeichenloses 16-Bit (Little Endian): AABB => BBAA
- int16be - Vorzeichenbehaftetes 16-Bit (Big Endian): AABB => AABB
- int16le - Vorzeichenbehaftetes 16-Bit (Little Endian): AABB => BBAA
- uint32be - 32 Bit ohne Vorzeichen (Big Endian): AABBCCDD => AABBCCDD
- uint32le - 32 Bit ohne Vorzeichen (Little Endian): AABBCCDD => DDCCBBAA
- uint32sw - 32 Bit ohne Vorzeichen (Big Endian Word Swap): AABBCCDD => CCDDAABB
- uint32sb - 32-Bit ohne Vorzeichen (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- int32be - Signiertes 32-Bit (Big Endian): AABBCCDD => AABBCCDD
- int32le - Signiertes 32-Bit (Little Endian): ABBCCDD => DDCCBBAA
- int32sw - Signiertes 32-Bit (Big Endian Word Swap): AABBCCDD => CCDDAABB
- int32sb - Signiertes 32-Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- uint64be - Vorzeichenloses 64-Bit (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- uint64le - Vorzeichenloses 64-Bit (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- uint8be - 8 Bit ohne Vorzeichen (Big Endian): AA => AA
- uint8le - 8 Bit ohne Vorzeichen (Little Endian): AA => AA
- int8be - Vorzeichenbehaftetes 8-Bit (Big Endian): AA => AA
- int8le - Vorzeichenbehaftetes 8-Bit (Little Endian): AA => AA
- floatbe - Float (Big Endian): AABBCCDD => AABBCCDD
- floatle - Float (Little Endian): AABBCCDD => DDCCBBAA
- floatsw - Float (Big Endian Word Swap): AABBCCDD => CCDDAABB
- floatsb - Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- doublebe - Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- Doublele - Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- string - String (Nullende): ABCDEF \ 0 => ABCDEF \ 0
- stringle - String (Little Endian, Zero-End): BADCFE \ 0 => ABCDEF \ 0

Die folgende Beschreibung wurde aus [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für die RTU-Kommunikation, wenn auch nicht aus einem anderen Grund, der den grundlegenden Komfort bietet. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse erstellt, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Diese Bequemlichkeit ist jedoch nicht ohne Komplikationen, und das Modbus RTU-Nachrichtenprotokoll ist keine Ausnahme. Das Protokoll selbst wurde basierend auf Geräten mit einer Registerlänge von 16 Bit entwickelt. Folglich waren bei der Implementierung von 32-Bit-Datenelementen besondere Überlegungen erforderlich. Diese Implementierung entschied sich für die Verwendung von zwei aufeinanderfolgenden 16-Bit-Registern, um 32 Datenbits oder im Wesentlichen 4 Datenbytes darzustellen. Innerhalb dieser 4 Datenbytes können Gleitkommadaten mit einfacher Genauigkeit in eine Modbus-RTU-Nachricht codiert werden.

### Die Bedeutung der Bytereihenfolge
Modbus selbst definiert keinen Gleitkomma-Datentyp, aber es ist allgemein anerkannt, dass es 32-Bit-Gleitkommadaten unter Verwendung des IEEE-754-Standards implementiert. Der IEEE-Standard hat jedoch keine eindeutige Definition der Bytereihenfolge der Datennutzlast. Daher ist die wichtigste Überlegung beim Umgang mit 32-Bit-Daten, dass die Daten in der richtigen Reihenfolge adressiert werden.

Beispielsweise sieht die Nummer 123 / 456.00, wie sie im IEEE 754-Standard für 32-Bit-Gleitkommazahlen mit einfacher Genauigkeit definiert ist, wie folgt aus:

![Bild1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen verschiedener Bytereihenfolgen sind signifikant. Zum Beispiel die Reihenfolge der 4 Datenbytes, die 123456.00 in einer "B A D C" -Sequenz darstellen, die als "Byte-Swap" bezeichnet wird. Bei der Interpretation als IEEE 744-Gleitkomma-Datentyp ist das Ergebnis ganz anders:

![Bild2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Das Ordnen der gleichen Bytes in einer "C D A B" -Sequenz wird als "Wortaustausch" bezeichnet. Auch hier unterscheiden sich die Ergebnisse drastisch vom ursprünglichen Wert von 123456.00:

![Bild3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Darüber hinaus würden sowohl ein "Byte-Swap" als auch ein "Word-Swap" die Reihenfolge der Bytes insgesamt umkehren, um ein weiteres Ergebnis zu erzielen:

![Image4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Bei der Verwendung von Netzwerkprotokollen wie Modbus muss natürlich genau darauf geachtet werden, wie Speicherbytes bei der Übertragung geordnet werden, was auch als "Bytereihenfolge" bezeichnet wird.

### Bestimmen der Bytereihenfolge
Das Modbus-Protokoll selbst wird gemäß der Modbus Application Protocol Specification, V1.1.b, als "Big-Endian" -Protokoll deklariert:

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle - so häufig, dass es auch als „Netzwerkreihenfolge“ bezeichnet wird.

Da das Modbus RTU-Nachrichtenprotokoll Big-Endian ist, muss die Endianität sowohl des Masters als auch des Slaves berücksichtigt werden, um einen 32-Bit-Datentyp über eine Modbus RTU-Nachricht erfolgreich auszutauschen. Viele RTU-Master- und Slave-Geräte ermöglichen eine spezifische Auswahl der Bytereihenfolge, insbesondere bei softwaresimulierten Einheiten. Man muss lediglich sicherstellen, dass beide Einheiten auf die gleiche Bytereihenfolge eingestellt sind.

Als Faustregel gilt, dass die Familie des Mikroprozessors eines Geräts dessen Endianness bestimmt. Typischerweise findet sich der Big-Endian-Stil (das Byte höherer Ordnung wird zuerst gespeichert, gefolgt vom Byte niedriger Ordnung) im Allgemeinen in CPUs, die mit einem Motorola-Prozessor entwickelt wurden. Der Little-Endian-Stil (das Byte niedriger Ordnung wird zuerst gespeichert, gefolgt vom Byte hoher Ordnung) wird im Allgemeinen in CPUs verwendet, die die Intel-Architektur verwenden. Es ist eine Frage der persönlichen Perspektive, welcher Stil als „rückwärts“ betrachtet wird.

Wenn jedoch Bytereihenfolge und Endianness keine konfigurierbare Option sind, müssen Sie festlegen, wie das Byte interpretiert werden soll. Dies kann erfolgen, indem ein bekannter Gleitkommawert vom Slave angefordert wird. Wenn ein unmöglicher Wert zurückgegeben wird, d. H. Eine Zahl mit einem zweistelligen Exponenten oder dergleichen, muss die Bytereihenfolge höchstwahrscheinlich geändert werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten verschiedene Funktionsverschiebungen, die 32-Bit-Ganzzahlen und 32-Bit-Float-Werte verarbeiten. Noch wichtiger ist, dass diese Funktionsbewegungen alle verschiedenen Formen der Byte-Sequenzierung berücksichtigen. Die folgende Tabelle zeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register auf einen 32-Bit-Ganzzahlwert kopiert.

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.i32-s | Byte- und Wortwechsel | [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb | Bytetausch | [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw | Worttausch | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopiert:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.ifloat-s | Byte- und Wortwechsel | [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb | Bytetausch | [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw | Worttausch | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt die FieldServer-Funktionsverschiebungen, die einen einzelnen 32-Bit-Gleitkommawert in zwei benachbarte 16-Bit-Register kopieren:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 | N / A | [a b] [c d] | [a b] [c d] |
| 1.float-2.i16-s | Byte und Wortwechsel | [a b] [c d] | [d c] [b a] |
| 1.float-2.i16-sb | Byte-Swap | [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw | Worttausch | [a b] [c d] | [c d] [a b] |

Angesichts der verschiedenen FieldServer-Funktionsbewegungen hängt die korrekte Behandlung von 32-Bit-Daten von der Auswahl der richtigen ab. Beachten Sie das folgende Verhalten dieser FieldServer-Funktion, wenn der bekannte Dezimal-Float-Wert mit einfacher Genauigkeit von 123456.00 verschoben wird:

| 16-Bit-Werte | Funktion Verschieben | Ergebnis | Funktion Verschieben | Ergebnis |
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktionsverschiebung erfordern. Sobald die richtige Funktionsverschiebung ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen Hex-zu-Gleitkommakonvertern und -rechnern, die im Internet verfügbar sind, erlauben nur sehr wenige die Manipulation der Byte- und Wortreihenfolge. Ein solches Dienstprogramm befindet sich unter www.61131.com/download.htm, wo sowohl Linux- als auch Windows-Versionen der Dienstprogramme heruntergeladen werden können. Nach der Installation wird das Dienstprogramm als ausführbare Datei mit einer einzigen Dialogoberfläche ausgeführt. Das Dienstprogramm zeigt den dezimalen Gleitkommawert von 123456.00 wie folgt an:

![Bild5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Man kann dann Bytes und / oder Wörter austauschen, um zu analysieren, welche potenziellen Endianness-Probleme zwischen Modbus RTU-Master- und Slave-Geräten bestehen können.

## Prüfung
Es gibt einige Programme im Ordner * test ', um die TCP-Kommunikation zu testen:

- Ananas32 / 64 ist ein Slave-Simulator (enthält nur Register und Eingänge, keine Spulen und digitale Eingänge).
- RMMS ist Mastersimulator
- mod_RSsim.exe ist ein Slave-Simulator. Möglicherweise benötigen Sie [Microsoft Visual C ++ 2008 SP1 Redistributable Package] (https://www.microsoft.com/en-us/download/details.aspx?id=5582), um es zu starten (aufgrund eines SideBySide-Fehlers).

## Changelog

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the write interval parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all datapoints on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

The MIT License (MIT)

Copyright (c) 2015-2020 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.