---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: CqnuREdS9tFaI0kSXVWIDM+H7j1E1pIEYXmRorlQxwQ=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

# Iobroker.modbus
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
Normalerweise können alle Register Adressen von 0 bis 65535 haben. Mithilfe von Aliasnamen können Sie virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- Digitaleingänge liegen zwischen 10001 und 20000
- Spulen sind von 1 bis 1000
- Die Eingangsregister reichen von 30001 bis 40000
- Halteregister sind von 40001 bis 60000

Jeder Alias wird intern einer Adresse zugeordnet, z. 30011 wird dem Eingangsregister 10 zugeordnet und so weiter.

### Adressen nicht an Wörtern ausrichten
Normalerweise sind die Adressen der Spulen und der Digitaleingänge auf 16 Bit ausgerichtet. Gleiche Adressen von 3 bis 20 werden mit 0 bis 32 abgeglichen.
Wenn diese Option aktiviert ist, werden die Adressen nicht ausgerichtet.

### Runde Real zu
Wie viele Stellen nach dem Komma für Float und Doubles.

### Umfrageverzögerung
Zyklisches Abfrageintervall (nur für Master relevant)

### Verbindungswiederherstellungszeit
Wiederverbindungsintervall (nur für Master relevant)

### Pulszeit
Wenn für Spulen ein Impuls verwendet wird, definiert dies das Intervall, wie lang der Impuls ist.

### Maximale Länge der Leseanforderung
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS als Anzahl der zu lesenden Register.

Einige Systeme erfordern eine erste "Schreibanforderung", um die Daten bei "Leseanforderung" zu liefern.
Sie können diesen Modus erzwingen, indem Sie die "Max read request length" auf 1 setzen.

** Hinweis: ** Bei einigen USB-Modbus-Lösungen (z. B. auf Socat-Basis) kann es zu Problemen mit dem Serialport-Npm-Modul kommen.

Es gibt ein Software-Gateway [** Modbus RTU <-> Modbus RTU über TCP **](http://mbus.sourceforge.net/index.html), um die Verwendung des seriellen RTU-Protokolls über TCP zu ermöglichen.

Beide Lösungen **RTU over TCP** und **TCP** funktionieren gut.

## Datentypen
- uint16be - 16-Bit ohne Vorzeichen (Big Endian): AABB => AABB
- uint16le - 16 Bit ohne Vorzeichen (Little Endian): AABB => BBAA
- int16be - Signiertes 16-Bit (Big Endian): AABB => AABB
- int16le - Signiertes 16-Bit (Little Endian): AABB => BBAA
- uint32be - Vorzeichenloses 32-Bit (Big Endian): AABBCCDD => AABBCCDD
- uint32le - Vorzeichenloses 32-Bit (Little Endian): AABBCCDD => DDCCBBAA
- uint32sw - Vorzeichenloses 32-Bit (Big Endian Word Swap): AABBCCDD => CCDDAABB
- uint32sb - Vorzeichenloses 32-Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- int32be - 32-Bit mit Vorzeichen (Big Endian): AABBCCDD => AABBCCDD
- int32le - 32-Bit mit Vorzeichen (Little Endian): ABBCCDD => DDCCBBAA
- int32sw - 32-Bit mit Vorzeichen (Big Endian Word Swap): AABBCCDD => CCDDAABB
- int32sb - Vorzeichenbehaftetes 32-Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- uint64be - 64-Bit ohne Vorzeichen (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- uint64le - 64-Bit ohne Vorzeichen (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- uint8be - 8-Bit ohne Vorzeichen (Big Endian): AA => AA
- uint8le - 8-Bit ohne Vorzeichen (Little Endian): AA => AA
- int8be - 8 Bit signiert (Big Endian): AA => AA
- int8le - 8 Bit signiert (Little Endian): AA => AA
- floatbe - Float (Big Endian): AABBCCDD => AABBCCDD
- floatle - Float (Little Endian): AABBCCDD => DDCCBBAA
- floatsw - Float (Big Endian Word Swap): AABBCCDD => CCDDAABB
- floatsb - Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- doublebe - Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- doublele - Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- string - String (Null-Ende): ABCDEF \ 0 => ABCDEF \ 0
- stringle - String (Little Endian, Zero-End): BADCFE \ 0 => ABCDEF \ 0

Die folgende Beschreibung wurde von [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für die RTU-Kommunikation, wenn auch nicht aus einem anderen Grund, der den Grund für die Bequemlichkeit darstellt. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse ermittelt, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Diese Bequemlichkeit ist jedoch nicht ohne Komplikationen und das Modbus RTU-Nachrichtenprotokoll ist keine Ausnahme. Das Protokoll selbst wurde basierend auf Geräten mit einer 16-Bit-Registerlänge entwickelt. Daher waren bei der Implementierung von 32-Bit-Datenelementen besondere Überlegungen erforderlich. Diese Implementierung entschied sich dafür, zwei aufeinanderfolgende 16-Bit-Register zu verwenden, um 32 Datenbits oder im Wesentlichen 4 Datenbytes darzustellen. Innerhalb dieser 4 Datenbytes können Gleitkommadaten mit einfacher Genauigkeit in eine Modbus RTU-Nachricht codiert werden.

### Die Bedeutung der Bytereihenfolge
Modbus selbst definiert keinen Gleitkomma-Datentyp, es ist jedoch allgemein anerkannt, dass 32-Bit-Gleitkomma-Daten unter Verwendung des IEEE-754-Standards implementiert werden. Der IEEE-Standard hat jedoch keine eindeutige Definition der Bytereihenfolge der Datennutzlast. Daher ist die wichtigste Überlegung beim Umgang mit 32-Bit-Daten, dass die Daten in der richtigen Reihenfolge adressiert werden.

Die im IEEE 754-Standard für 32-Bit-Gleitkommazahlen mit einfacher Genauigkeit definierte Zahl 123 / 456.00 sieht beispielsweise folgendermaßen aus:

![Image1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen verschiedener Bytereihenfolgen sind erheblich. Ordnen Sie beispielsweise die 4 Datenbytes, die 123456.00 repräsentieren, in einer "B A D C" -Sequenz, die als "Bytetausch" bezeichnet wird. Bei der Interpretation als IEEE 744-Gleitkomma-Datentyp ist das Ergebnis ganz anders:

![Image2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Das Anordnen der gleichen Bytes in einer "C D A B" -Sequenz wird als "Wortaustausch" bezeichnet. Auch hier weichen die Ergebnisse drastisch vom ursprünglichen Wert von 123456.00 ab:

![Image3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Außerdem würden sowohl ein "Byte-Tausch" als auch ein "Wort-Tausch" die Reihenfolge der Bytes insgesamt im Wesentlichen umkehren, um noch ein weiteres Ergebnis zu erzielen:

![Image4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Bei der Verwendung von Netzwerkprotokollen wie Modbus muss natürlich genau darauf geachtet werden, wie die Speicherbytes bei der Übertragung sortiert werden. Dies wird auch als "Bytereihenfolge" bezeichnet.

### Bestimmung der Bytereihenfolge
Das Modbus-Protokoll selbst wird gemäß der Modbus Application Protocol Specification, V1.1.b, als Big-Endian-Protokoll deklariert:

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle - so häufig, dass es auch als "Netzwerkreihenfolge" bezeichnet wird.

Da das Modbus RTU-Nachrichtenprotokoll ein Big-Endian-Protokoll ist, muss die Endianität sowohl des Masters als auch des Slaves berücksichtigt werden, um einen 32-Bit-Datentyp erfolgreich über eine Modbus RTU-Nachricht auszutauschen. Viele RTU-Master- und Slave-Geräte ermöglichen eine gezielte Auswahl der Bytereihenfolge, insbesondere bei softwaresimulierten Einheiten. Man muss lediglich sicherstellen, dass beide Einheiten auf die gleiche Bytereihenfolge eingestellt sind.

Als Faustregel gilt, dass die Familie des Mikroprozessors eines Geräts dessen Endianness bestimmt. Normalerweise wird der Big-Endian-Stil (das höherwertige Byte wird zuerst gespeichert, gefolgt vom niederwertigen Byte) in CPUs verwendet, die mit einem Motorola-Prozessor ausgestattet sind. Der Little-Endian-Stil (das niederwertige Byte wird zuerst gespeichert, gefolgt vom höherwertigen Byte) wird im Allgemeinen in CPUs mit Intel-Architektur verwendet. Es ist eine Frage der persönlichen Perspektive, welcher Stil als „rückwärts“ betrachtet wird.

Wenn jedoch die Bytereihenfolge und die Endianzahl nicht konfigurierbar sind, müssen Sie festlegen, wie das Byte interpretiert werden soll. Dies kann erfolgen, indem ein bekannter Gleitkommawert vom Slave angefordert wird. Wenn ein unmöglicher Wert zurückgegeben wird, d. H. Eine Zahl mit einem zweistelligen Exponenten oder dergleichen, muss die Bytereihenfolge höchstwahrscheinlich geändert werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten mehrere Funktionsverschiebungen, die 32-Bit-Ganzzahlen und 32-Bit-Gleitkommawerte verarbeiten. Noch wichtiger ist, dass diese Funktionsbewegungen alle unterschiedlichen Formen der Byte-Sequenzierung berücksichtigen. Die folgende Tabelle zeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register in einen 32-Bit-Ganzzahlwert kopiert.

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.i32-s | Byte und Wort tauschen | [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb | Bytetausch | [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw | Wortwechsel | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopiert:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.ifloat-s | Byte und Wort tauschen | [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb | Bytetausch | [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw | Wortwechsel | [a b] [c d] | [c d a b] |

Die folgende Tabelle zeigt, wie die FieldServer-Funktion einen einzelnen 32-Bit-Gleitkommawert in zwei benachbarte 16-Bit-Register kopiert:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 | N / A | [a b] [c d] | [a b] [c d] |
| 1.float-2.i16-s | Byte und Wortaustausch | [a b] [c d] | [d c] [b a] |
| 1.float-2.i16-sb | Byte-Swap | [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw | Wortwechsel | [a b] [c d] | [c d] [a b] |

Angesichts der verschiedenen Verschiebungen der FieldServer-Funktion hängt die korrekte Verarbeitung von 32-Bit-Daten von der Auswahl der richtigen ab. Beachten Sie, dass das folgende Verhalten dieser FieldServer-Funktion für den bekannten dezimalen Gleitkommawert mit einfacher Genauigkeit von 123456.00 gilt:

| 16-Bit-Werte | Funktion Verschieben | Ergebnis | Funktion Verschieben | Ergebnis |
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktion zum Verschieben erfordern. Sobald die richtige Funktionsverschiebung ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen im Internet verfügbaren Hex-zu-Fließkomma-Wandlern und Taschenrechnern erlauben nur sehr wenige eine Manipulation der Byte- und Wortreihenfolge. Ein solches Dienstprogramm befindet sich unter www.61131.com/download.htm, wo sowohl Linux- als auch Windows-Versionen der Dienstprogramme heruntergeladen werden können. Nach der Installation wird das Dienstprogramm als ausführbare Datei mit einer einzigen Dialogschnittstelle ausgeführt. Das Dienstprogramm zeigt den dezimalen Gleitkommawert von 123456.00 wie folgt an:

![Image5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Man kann dann Bytes und / oder Wörter austauschen, um zu analysieren, welche potenziellen Endianness-Probleme zwischen Modbus RTU-Master- und -Slave-Geräten bestehen können.

## Prüfung
Es gibt einige Programme im Ordner * test ', um die TCP-Kommunikation zu testen:

- Ananas32 / 64 ist Slave-Simulator (hält nur Register und Eingänge, keine Spulen und digitale Eingänge)
- RMMS ist Mastersimulator
- mod_RSsim.exe ist Slave-Simulator. Möglicherweise benötigen Sie [Microsoft Visual C ++ 2008 SP1 Redistributable Package] (https://www.microsoft.com/en-us/download/details.aspx?id=5582), um es zu starten (aufgrund eines SideBySide-Fehlers).

# 3.0.1 (2020-01-23)
* (BlackBird77) Korrekturen für serielle Timeouts durchgeführt
* (Bluefox) Refactoring

# 3.0.0 (15.05.2019)
* (Apollon77) Unterstützung für NodeJS 12 hinzugefügt, NodeJS 4 wird nicht mehr unterstützt!

# 2.0.9 (2018-10-11)
* (Bjoern3003) Schreibregister wurden korrigiert

# 2.0.7 (2018-07-02)
* (bluefox) Der Servermodus wurde behoben

# 2.0.6 (2018-06-26)
* (Bluefox) RTU-TCP-Master-Modus wurde behoben

# 2.0.3 (2018-06-16)
* (bluefox) Die Rundung von Zahlen wurde korrigiert

# 2.0.2 (2018-06-12)
* (bluefox) Der Fehler beim Lesen von Blöcken wurde behoben
* (bluefox) Die Blockablesung für diskrete Werte wurde implementiert

# 2.0.1 (2018-05-06)
* (bluefox) Unterstützung für mehrere Geräte-IDs hinzugefügt

# 1.1.1 (15.04.2018)
* (Apollon77) Optimieren Sie das Reconnect-Handling

# 1.1.0 (2018-01-23)
* (bluefox) Little-Endian-Strings hinzugefügt
* (Apollon77) Serialport-Bibliothek aktualisieren

# 1.0.2 (2018-01-20)
* (bluefox) Fehler beim Lesen von Spulen behoben

# 0.5.4 (2017-09-27)
* (Apollon77) Verschiedene Korrekturen

# 0.5.0 (2017-02-11)
* (bluefox) Erstelle alle Zustände nacheinander

# 0.4.10 (2017-02-10)
* (Apollon77) Erstellen Sie beim Start des Adapters nicht alle Datenpunkte neu
* (ykuendig) Mehrere Optimierungs- und Textkorrekturen

# 0.4.9 (2016-12-20)
* (bluefox) fix serielle RTU

# 0.4.8 (15.12.2016)
* (Apollon77) Serialport-Bibliothek aktualisieren, um die Kompatibilität mit Knoten 6.x zu gewährleisten

# 0.4.7 (27.11.2016)
* (bluefox) Verwenden Sie eine alte Version von jsmodbus

# 0.4.6 (08.11.2016)
* (Bluefox) Abwärtskompatibilität mit 0.3.x

# 0.4.5 (25.10.2016)
* (Bluefox) Besseres Pufferhandling bei TCP und Seriell

# 0.4.4 (21.10.2016)
* (bluefox) Fix Write von Halteregistern

# 0.4.1 (19.10.2016)
* (bluefox) Unterstützung von ModBus RTU über seriell und über TCP (nur Slave)

# 0.3.11 (2016-08-18)
* (Apollon77) Korrigiert die falsche Byteanzahl in der Schleife

# 0.3.10 (2016-02-01)
* (bluefox) Korrektur der Verlaufseinstellungen.

# 0.3.9 (09.11.2015)
* (bluefox) Verwenden Sie beim Schreiben von Halteregistern immer write_multiple_registers.

# 0.3.7 (2015-11-02)
* (bluefox) Füge einen speziellen Lese- / Schreibmodus hinzu, wenn "Max read request length" 1 ist.

# 0.3.6 (2015-11-01)
* (bluefox) füge zyklisches Schreiben für Halteregister hinzu (fix)

# 0.3.5 (31.10.2015)
* (bluefox) füge zyklisches Schreiben für Halteregister hinzu

# 0.3.4 (2015-10-28)
* (bluefox) füge double hinzu und repariere uint64

# 0.3.3 (27.10.2015)
* (bluefox) Halteregister korrigieren

# 0.3.2 (27.10.2015)
* (Bluefox) Fix Import aus Textdatei

# 0.3.1 (26.10.2015)
* (bluefox) Fehler mit Länge des Leseblocks (Master) beheben
* (bluefox) Unterstützung von Leseblöcken und maximale Länge der Leseanforderung (Master)
* (bluefox) kann Felder durch Import definieren

# 0.3.0 (24.10.2015)
* (bluefox) runde Einstellungen hinzufügen
* (bluefox) Geräte-ID hinzufügen
* (Bluefox) Slave unterstützt Floats, Integer und Strings

# 0.2.6 (2015-10-22)
* (bluefox) füge NUR FÜR MASTER verschiedene Typen für inputRegisters und für das Halten von Registern hinzu

# 0.2.5 (20.10.2015)
* (bluefox) Namen von Objekten korrigieren, wenn Aliase verwendet werden

# 0.2.4 (19.10.2015)
* (bluefox) Fehler beheben, neue Werte hinzufügen

# 0.2.3 (2015-10-15)
* (bluefox) Fehler beim Master beheben

# 0.2.2 (14.10.2015)
* (bluefox) Sklave implementieren
* (bluefox) Adressierungsmodell ändern

# 0.0.1
* (Bluefox) Initial Commit

Die MIT-Lizenz (MIT)

Copyright (c) 2015-2020 Bluefox <dogafox@gmail.com>

Jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, wird hiermit kostenlos die Erlaubnis erteilt, mit der Software uneingeschränkt umzugehen, einschließlich der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen Sie können Kopien der Software unter folgenden Bedingungen veröffentlichen, verbreiten, unterlizenzieren und / oder verkaufen und Personen gestatten, denen die Software zur Verfügung gestellt wird:

Der obige Copyright-Hinweis und dieser Erlaubnishinweis sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH DER GARANTIEN FÜR HANDELBARKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG, ZUR VERFÜGUNG GESTELLT. IN KEINEM FALL HAFTEN DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHE HAFTUNGSANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN, OB AUS VERTRAGSVERHÄLTNISSEN, UNTER BERÜCKSICHTIGUNG ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELNDEN HANDELNDEN HANDELNDEN SOFTWARE.

## Changelog