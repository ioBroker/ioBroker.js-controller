---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: 7C8JiWKGGPkBIOH/OwE5jSPJtbtE9l8IuyAwz3khMYc=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

# Iobroker.modbus ======================
Implementierung von ModBus Slave und Master für ioBroker. Folgende Typen werden unterstützt:

- Modbus RTU über seriell (Master)
- Modbus RTU über TCP (Master)
- Modbus TCP (Slave, Master)

## Die Einstellungen
### Partner-IP-Adresse
IP-Adresse des Modbus-Partners.

### Hafen
TCP-Port des Modbus-Partners, wenn als Master (Client) oder eigener Port als Slave (Server) konfiguriert.

### Geräte ID
Modbus-Geräte-ID Wichtig bei Verwendung einer TCP / Modbus-Bridge.

### Art
Slave (Server) oder Master (Client).

### Verwenden Sie Aliase als Adresse
Normalerweise können alle Register eine Adresse von 0 bis 65535 haben. Durch die Verwendung von Aliasnamen können Sie virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- Digitaleingänge liegen zwischen 10001 und 20000
- Spulen sind von 1 bis 1000
- Eingangsregister sind von 30001 bis 40000
- Halteregister liegen zwischen 40001 und 60000

Jeder Alias wird intern der Adresse zugeordnet, z. 30011 wird dem Eingangsregister 10 zugeordnet. Und so weiter.

### Adressen nicht an Wort ausrichten
Normalerweise sind die Spulen- und die diskreten Eingangsadressen auf 16 Bit ausgerichtet. Gleiche Adressen von 3 bis 20 werden auf 0 bis 32 ausgerichtet.
Wenn diese Option aktiviert ist, werden die Adressen nicht ausgerichtet.

### Round Real um
Wie viele Stellen nach Komma für Float und Verdopplung.

### Abrufverzögerung
Zyklisches Abfrageintervall (nur für Master relevant)

### Wiederherstellungszeit
Wiederverbindungsintervall (nur für Master relevant)

### Impulszeit
Wenn der Impuls für Spulen verwendet wird, wird hiermit das Intervall festgelegt, wie lange der Impuls ist.

### Maximale Leseanforderungslänge
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS als Anzahl der zu lesenden Register.

Einige Systeme erfordern eine erste "Schreibanforderung", um die Daten bei "Leseanforderung" zu liefern.
Sie können diesen Modus erzwingen, indem Sie "Maximale Leseanforderungslänge" auf 1 setzen.

** Hinweis: ** Einige USB-Modbus-Lösungen (z. B. auf Socat-Basis) können Probleme haben, mit dem serialport npm-Modul zu arbeiten.

Es gibt ein Software-Gateway gemäß [** Modbus RTU <-> Modbus RTU über TCP **](http://mbus.sourceforge.net/index.html), das die Verwendung des seriellen RTU-Protokolls über TCP ermöglicht.

Beide Lösungen **RTU über TCP** und **TCP** funktionieren gut.

## Datentypen
- uint16be - Vorzeichenlose 16 Bit (Big Endian): AABB => AABB
- uint16le - Vorzeichenlose 16 Bit (Little Endian): AABB => BBAA
- int16be - Signiertes 16 Bit (Big Endian): AABB => AABB
- int16le - Signiertes 16 Bit (Little Endian): AABB => BBAA
- uint32be - Vorzeichenlose 32 Bit (Big Endian): AABBCCDD => AABBCCDD
- uint32le - Vorzeichenlose 32 Bit (Little Endian): AABBCCDD => DDCCBBAA
- uint32sw - 32 Bit ohne Vorzeichen (Big Endian Word Swap): AABBCCDD => CCDDAABB
- uint32sb - 32 Bit ohne Vorzeichen (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- int32be - Signiertes 32 Bit (Big Endian): AABBCCDD => AABBCCDD
- int32le - Signiertes 32 Bit (Little Endian): ABBCCDD => DDCCBBAA
- int32sw - Signiertes 32 Bit (Big Endian Word Swap): AABBCCDD => CCDDAABB
- int32sb - Signiertes 32 Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- uint64be - 64 Bit ohne Vorzeichen (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- uint64le - 64 Bit ohne Vorzeichen (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- uint8be - Vorzeichenlose 8 Bit (Big Endian): AA => AA
- uint8le - Vorzeichenlose 8 Bit (Little Endian): AA => AA
- int8be - Signiertes 8 Bit (Big Endian): AA => AA
- int8le - Signiertes 8 Bit (Little Endian): AA => AA
- floatbe - Float (Big Endian): AABBCCDD => AABBCCDD
- floatle - Float (Little Endian): AABBCCDD => DDCCBBAA
- floatsw - Float (Big Endian Word Swap): AABBCCDD => CCDDAABB
- floatsb - Float (Big Endian-Byte-Swap): AABBCCDD => DDCCBBAA
- doublebe - Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- Doublele - Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- Zeichenfolge - Zeichenfolge (Nullende): ABCDEF \ 0 => ABCDEF \ 0
- stringle - String (Little Endian, Nullende): BADCFE \ 0 => ABCDEF \ 0

Die folgende Beschreibung wurde aus [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert.

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für die RTU-Kommunikation, wenn es aus keinem anderen Grund als dem grundlegenden Komfort dient. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse ermittelt, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Diese Bequemlichkeit ist jedoch nicht unkompliziert, und das Modbus RTU Message-Protokoll bildet keine Ausnahme. Das Protokoll selbst wurde basierend auf Geräten mit einer 16-Bit-Registerlänge entworfen. Bei der Implementierung von 32-Bit-Datenelementen waren daher besondere Überlegungen erforderlich. Diese Implementierung entschied sich für die Verwendung von zwei aufeinanderfolgenden 16-Bit-Registern, um 32 Datenbits oder im Wesentlichen 4 Datenbytes darzustellen. Innerhalb dieser 4 Byte Daten können Gleitkommadaten mit einfacher Genauigkeit in eine Modbus RTU-Nachricht codiert werden.

### Die Bedeutung der Byte-Reihenfolge
Modbus selbst definiert keinen Fließkomma-Datentyp, es wird jedoch allgemein akzeptiert, dass er 32-Bit-Fließkommadaten unter Verwendung des IEEE-754-Standards implementiert. Der IEEE-Standard hat jedoch keine klare Definition der Bytereihenfolge der Datennutzlast. Daher ist die wichtigste Überlegung beim Umgang mit 32-Bit-Daten, dass die Daten in der richtigen Reihenfolge adressiert werden.

Die Nummer 123 / 456.00, wie sie im IEEE 754-Standard für 32-Bit-Gleitkommazahlen mit einfacher Genauigkeit definiert ist, sieht beispielsweise folgendermaßen aus:

![Image1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen verschiedener Bytereihenfolgen sind signifikant. Beispielsweise werden die 4 Datenbytes, die 123456.00 in einer Sequenz "B A D C" repräsentieren, als "Byte-Swap" bezeichnet. Bei der Interpretation als IEEE 744-Fließkomma-Datentyp sieht das Ergebnis ganz anders aus:

![Image2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Die Anordnung derselben Bytes in einer "C D A B" -Sequenz wird als "Wortwechsel" bezeichnet. Wiederum unterscheiden sich die Ergebnisse drastisch vom ursprünglichen Wert von 123456.00:

![Image3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Außerdem würden sowohl ein "Byte-Austausch" als auch ein "Wort-Austausch" die Reihenfolge der Bytes insgesamt umkehren, um ein weiteres Ergebnis zu erzeugen:

![Image4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Bei der Verwendung von Netzwerkprotokollen wie Modbus muss natürlich genau darauf geachtet werden, wie die Bytes des Speichers bei der Übertragung angeordnet werden (auch als "Byte-Reihenfolge" bezeichnet).

### Byte-Reihenfolge bestimmen
Das Modbus-Protokoll selbst wird gemäß der Modbus Application Protocol-Spezifikation V1.1.b als "Big-Endian" -Protokoll deklariert:

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle. Tatsächlich wird es auch als "Netzwerkreihenfolge" bezeichnet.

Da das Modbus RTU-Nachrichtenprotokoll Big-Endian ist, muss ein 32-Bit-Datentyp über eine Modbus RTU-Nachricht erfolgreich ausgetauscht werden. Daher muss die Endianness sowohl des Masters als auch des Slaves berücksichtigt werden. Viele RTU-Master- und Slave-Geräte ermöglichen die gezielte Auswahl der Bytereihenfolge, insbesondere bei Software-simulierten Einheiten. Es muss lediglich sichergestellt werden, dass alle Einheiten auf dieselbe Byte-Reihenfolge eingestellt sind.

Als Faustregel gilt, dass die Familie des Mikroprozessors eines Geräts die Endianness bestimmt. Typischerweise wird der Big-Endian-Stil (das höherwertige Byte wird zuerst gespeichert, gefolgt vom niederwertigen Byte) im Allgemeinen bei CPUs gefunden, die mit einem Motorola-Prozessor entworfen wurden. Der Little-Endian-Stil (das niederwertige Byte wird zuerst gespeichert, gefolgt vom höherwertigen Byte) wird normalerweise bei CPUs mit Intel-Architektur gefunden. Es ist eine Frage der persönlichen Perspektive, welcher Stil als „rückwärts“ betrachtet wird.

Wenn jedoch Byte-Reihenfolge und -Endianness keine konfigurierbare Option sind, müssen Sie festlegen, wie das Byte interpretiert werden soll. Dazu kann vom Slave ein bekannter Gleitkommawert angefordert werden. Wenn ein unmöglicher Wert zurückgegeben wird, d. H. Eine Zahl mit einem zweistelligen Exponenten oder einem solchen, muss die Reihenfolge der Bytes höchstwahrscheinlich geändert werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten mehrere Funktionsbewegungen, die 32-Bit-Ganzzahlen und 32-Bit-Gleitkommazahlen verarbeiten. Noch wichtiger ist, dass diese Funktionsbewegungen alle verschiedenen Formen der Byte-Sequenzierung berücksichtigen. In der folgenden Tabelle wird gezeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register in einen 32-Bit-Integerwert kopiert.

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.i32-s | Byte- und Wortwechsel | [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb | Byte-Swap | [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw | Wortwechsel | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt die FieldServer-Funktion, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopiert:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.float | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.ifloat-s | Byte- und Wortwechsel | [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb | Byte-Swap | [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw | Wortwechsel | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die einen einzelnen 32-Bit-Fließkommawert in zwei benachbarte 16-Bit-Register kopieren:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|------------------|-------------------|-----------------|----------------|
| 1.Flat-2.i16 | N / A | [a b] [c d] | [a b] [c d] |
| 1. Float-2.i16-s | Byte und Wortwechsel | [a b] [c d] | [d c] [b a] |
| 1. Float-2.i16-sb | Byte-Swap | [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw | word swap | [a b] [c d] | [c d] [a b] |

Aufgrund der verschiedenen FieldServer-Funktionsbewegungen hängt die korrekte Handhabung von 32-Bit-Daten von der Auswahl der richtigen ab. Beachten Sie das folgende Verhalten dieser FieldServer-Funktion auf dem bekannten dezimalen Gleitkommawert von 123456.00 mit einfacher Genauigkeit:

| 16-Bit-Werte | Funktion Bewegen | Ergebnis | Funktion Bewegen | Ergebnis |
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.Flat-2.i16 | 0x2000 0x47F1 |
0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.Flat-2.i16-s | 0xF147 0X0020 |
0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.Flat-2.i16-sb | 0x0020 0xF147 |
0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.Flat-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktionsverschiebung erfordern. Sobald die richtige Funktionsverschiebung ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen Hex-zu-Fließkomma-Konvertern und -Rechnern, die im Internet verfügbar sind, erlauben nur sehr wenige die Manipulation der Byte- und Wortreihenfolge. Ein solches Dienstprogramm befindet sich unter www.61131.com/download.htm. Dort können sowohl Linux- als auch Windows-Versionen der Dienstprogramme heruntergeladen werden. Nach der Installation wird das Dienstprogramm als ausführbare Datei mit einer einzigen Dialogschnittstelle ausgeführt. Das Dienstprogramm präsentiert den dezimalen Gleitkommawert von 123456.00 wie folgt:

![Image5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Sie können dann Bytes und / oder Wörter austauschen, um zu analysieren, welche potenziellen Endprobleme zwischen Modbus RTU-Master- und Slave-Geräten bestehen können.

## Prüfung
Es gibt einige Programme im Ordner * test ', um die TCP-Kommunikation zu testen:

- Ananas32 / 64 ist Slave-Simulator (nur Halteregister und -eingänge, keine Spulen und digitale Eingänge)
- RMMS ist Mastersimulator
- mod_RSsim.exe ist Slave-Simulator. Es kann sein, dass Sie [Microsoft Visual C ++ 2008 SP1 Redistributable Package] (https://www.microsoft.com/en-us/download/details.aspx?id=5582) benötigen, um es zu starten (aufgrund eines SideBySide-Fehlers).

# 2.0.9 (2018-10-11)
* (Bjoern3003) Schreibregister wurden korrigiert

# 2.0.7 (2018-07-02)
* (bluefox) Der Servermodus wurde behoben

# 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp Master-Modus wurde behoben

# 2.0.3 (2018-06-16)
* (bluefox) Die Rundung von Zahlen wurde korrigiert

# 2.0.2 (2018-06-12)
* (bluefox) Der Fehler beim Lesen von Blöcken wurde behoben
* (bluefox) Die Blockablesung für diskrete Werte wurde implementiert

# 2.0.1 (2018-05-06)
* (bluefox) Unterstützung für mehrere Geräte-IDs hinzugefügt

# 1.1.1 (2018-04-15)
* (Apollon77) Optimieren Sie die Wiederverbindungsbehandlung

# 1.1.0 (2018-01-23)
* (bluefox) Little Endian-Strings hinzugefügt
* (Apollon77) Aktualisieren Sie die Serialport-Bibliothek

# 1.0.2 (2018-01-20)
* (bluefox) Fehler beim Lesen der Spulen behoben

# 0.5.4 (2017-09-27)
* (Apollon77) Mehrere Korrekturen

# 0.5.0 (2017-02-11)
* (bluefox) Erstellt alle Zustände nacheinander

# 0.4.10 (2017-02-10)
* (Apollon77) Erstellen Sie nicht alle Datenpunkte beim Start des Adapters neu
* (ykuendig) Mehrere Optimierungen für die Optimierung und Formulierung

# 0.4.9 (2016-12-20)
* (bluefox) fixe serielle RTU

# 0.4.8 (2016-12-15)
* (Apollon77) Update der Serialport-Bibliothek zur Kompatibilität mit Knoten 6.x

# 0.4.7 (2016-11-27)
* (bluefox) Alte Version von jsmodbus verwenden

# 0.4.6 (2016-11-08)
* (bluefox) Abwärtskompatibilität mit 0.3.x

# 0.4.5 (2016-10-25)
* (bluefox) bessere pufferbehandlung auf tcp und seriell

# 0.4.4 (2016-10-21)
* (bluefox) Fixes Schreiben der Halteregister

# 0.4.1 (2016-10-19)
* (bluefox) Unterstützung von ModBus RTU über seriell und über TCP (nur Slave)

# 0.3.11 (2016-08-18)
* (Apollon77) Falsche Bytezahl in der Schleife korrigiert

# 0.3.10 (2016-02-01)
* (bluefox) Korrektur der Verlaufseinstellungen.

# 0.3.9 (2015-11-09)
* (bluefox) Verwenden Sie immer write_multiple_registers, indem Sie Halteregister schreiben.

# 0.3.7 (2015-11-02)
* (bluefox) fügt einen speziellen Lese- / Schreibmodus hinzu, wenn "Maximale Leseanforderungslänge" 1 ist.

# 0.3.6 (2015-11-01)
* (bluefox) zyklisches Schreiben für Halteregister hinzufügen (Fix)

# 0.3.5 (2015-10-31)
* (bluefox) addiert zyklisches Schreiben für Halteregister

# 0.3.4 (2015-10-28)
* (bluefox) addiere doppelte und fixiere uint64

# 0.3.3 (2015-10-27)
* (bluefox) fixe Register

# 0.3.2 (2015-10-27)
* (bluefox) Fiximport aus Textdatei

# 0.3.1 (2015-10-26)
* (bluefox) Korrekturfehler mit Länge des Leseblocks (Master)
* (bluefox) Unterstützung der Leseblöcke und maximale Länge der Leseanforderung (Master)
* (bluefox) kann Felder durch Import definieren

# 0.3.0 (2015-10-24)
* (bluefox) füge runde einstellungen hinzu
* (bluefox) add deviceID
* (bluefox) -Slave unterstützt Floats, Ganzzahlen und Strings

# 0.2.6 (2015-10-22)
* (bluefox) fügt verschiedene Typen für inputRegisters und NUR FÜR MASTER hinzu

# 0.2.5 (2015-10-20)
* (bluefox) fixiert Namen von Objekten, wenn Aliasnamen verwendet werden

# 0.2.4 (2015-10-19)
* (bluefox) Fehler beheben neue Werte hinzufügen

# 0.2.3 (2015-10-15)
* (bluefox) Fehler beim Master behoben

# 0.2.2 (2015-10-14)
* (bluefox) implementiere Slave
* (bluefox) Adressierungsmodell ändern

# 0.0.1
* (bluefox) anfängliches Commit

## Changelog