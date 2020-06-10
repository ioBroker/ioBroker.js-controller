---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: GfwwDPxEmBmuil/Z8P9Pkvvn5wsDBFhrYyZv2rg7tMA=
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
Sie können diesen Modus erzwingen, indem Sie die "Max. Leseanforderungslänge" auf 1 setzen.

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
- uint32sb - 32 Bit ohne Vorzeichen (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
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

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für die RTU-Kommunikation, wenn auch aus keinem anderen Grund, als es der grundlegende Komfort ist. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse erstellt, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

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
Das Modbus-Protokoll selbst wird gemäß der Modbus Application Protocol Specification, V1.1.b, als Big-Endian-Protokoll deklariert:

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

Die folgende Tabelle zeigt, wie die FieldServer-Funktion zwei benachbarte 16-Bit-Register auf einen 32-Bit-Gleitkommawert kopiert:

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

# 3.0.4 (2020-06-05)
* (bluefox) Geräte-ID durch Export / Import hinzugefügt
* (bluefox) Der Parameter Schreibintervall wurde hinzugefügt
* (bluefox) Das Deaktivieren des Schreibens mehrerer Register wurde hinzugefügt

# 3.0.3 (2020-06-05)
* (bluefox) Fehler nach dem Refactoring behoben

# 3.0.2 (2020-06-01)
* (compton-git) Dekodiert 0xFF00 als Spule EIN

# 3.0.1 (2020-01-23)
* (BlackBird77) Korrekturen für serielle Zeitüberschreitungen durchgeführt
* (Bluefox) Refactoring

# 3.0.0 (15.05.2019)
* (Apollon77) Unterstützung für NodeJS 12 hinzugefügt, NodeJS 4 wird nicht mehr unterstützt!

# 2.0.9 (2018-10-11)
* (Bjoern3003) Schreibregister wurden korrigiert

# 2.0.7 (2018-07-02)
* (bluefox) Der Servermodus wurde behoben

# 2.0.6 (2018-06-26)
* (bluefox) Der RTU-TCP-Master-Modus wurde behoben

# 2.0.3 (2018-06-16)
* (bluefox) Die Rundung von Zahlen wurde korrigiert

# 2.0.2 (2018-06-12)
* (bluefox) Der Fehler beim Lesen der Blöcke wurde behoben
* (bluefox) Das Blocklesen für diskrete Werte wurde implementiert

# 2.0.1 (2018-05-06)
* (bluefox) Unterstützung für mehrere Geräte-IDs hinzugefügt

# 1.1.1 (15.04.2018)
* (Apollon77) Optimieren Sie die Wiederverbindung

# 1.1.0 (2018-01-23)
* (Bluefox) Little Endian Strings hinzugefügt
* (Apollon77) Upgrade der Serialport-Bibliothek

# 1.0.2 (2018-01-20)
* (Bluefox) Das Lesen von Spulen wurde korrigiert

# 0.5.4 (27.09.2017)
* (Apollon77) Mehrere Korrekturen

# 0.5.0 (2017-02-11)
* (bluefox) Erstellt alle Zustände nacheinander

# 0.4.10 (2017-02-10)
* (Apollon77) Erstellen Sie nicht alle Datenpunkte beim Start des Adapters neu
* (ykuendig) Mehrere Optimierungs- und Wortlautkorrekturen

# 0.4.9 (2016-12-20)
* (bluefox) serielle RTU reparieren

# 0.4.8 (15.12.2016)
* (Apollon77) Aktualisieren Sie die Serialport-Bibliothek, um die Kompatibilität mit Knoten 6.x zu gewährleisten

# 0.4.7 (27.11.2016)
* (bluefox) Verwenden Sie die alte Version von jsmodbus

# 0.4.6 (08.11.2016)
* (Bluefox) Abwärtskompatibilität mit 0.3.x.

# 0.4.5 (2016-10-25)
* (Bluefox) Bessere Pufferbehandlung auf TCP und seriell

# 0.4.4 (2016-10-21)
* (bluefox) Das Schreiben von Halteregistern wurde korrigiert

# 0.4.1 (2016-10-19)
* (bluefox) Unterstützung von ModBus RTU über serielles und über TCP (nur Slave)

# 0.3.11 (18.08.2016)
* (Apollon77) Korrigiert die falsche Byteanzahl in der Schleife

# 0.3.10 (2016-02-01)
* (bluefox) behebt den Verlust der Verlaufseinstellungen.

# 0.3.9 (2015-11-09)
* (bluefox) Verwenden Sie immer write_multiple_registers durch Schreiben von Halteregistern.

# 0.3.7 (2015-11-02)
* (bluefox) Füge einen speziellen Lese- / Schreibmodus hinzu, wenn "Maximale Länge der Leseanforderung" 1 ist.

# 0.3.6 (2015-11-01)
* (bluefox) zyklisches Schreiben zum Halten von Registern hinzufügen (fix)

# 0.3.5 (31.10.2015)
* (bluefox) Füge zyklisches Schreiben zum Halten von Registern hinzu

# 0.3.4 (28.10.2015)
* (bluefox) füge Doubles hinzu und behebe uint64

# 0.3.3 (2015-10-27)
* (Bluefox) Fix Holding Register

# 0.3.2 (2015-10-27)
* (Bluefox) Fix Import aus Textdatei

# 0.3.1 (2015-10-26)
* (bluefox) Fehler mit Länge des Leseblocks beheben (Master)
* (Bluefox) Unterstützung von Leseblöcken und maximale Länge der Leseanforderung (Master)
* (Bluefox) kann Felder durch Import definieren

# 0.3.0 (2015-10-24)
* (Bluefox) runde Einstellungen hinzufügen
* (bluefox) Geräte-ID hinzufügen
* (Bluefox) Slave unterstützt Floats, Ganzzahlen und Strings

# 0.2.6 (22.10.2015)
* (bluefox) füge verschiedene Typen für inputRegisters und zum Halten von Registern NUR FÜR MASTER hinzu

# 0.2.5 (20.10.2015)
* (bluefox) korrigiert Namen von Objekten, wenn Aliase verwendet werden

# 0.2.4 (2015-10-19)
* (bluefox) Fehler beheben neue Werte hinzufügen

# 0.2.3 (2015-10-15)
* (bluefox) Fehler mit Master behoben

# 0.2.2 (14.10.2015)
* (Bluefox) Slave implementieren
* (Bluefox) Adressierungsmodell ändern

# 0.0.1
* (bluefox) anfängliches Commit

Die MIT-Lizenz (MIT)

Copyright (c) 2015-2020 Bluefox <dogafox@gmail.com>

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, kostenlos die Erlaubnis erteilt, uneingeschränkt mit der Software umzugehen, einschließlich, jedoch nicht beschränkt auf die Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen , veröffentlichen, vertreiben, unterlizenzieren und / oder verkaufen Kopien der Software und erlauben Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen:

Der oben genannte Copyright-Hinweis und dieser Erlaubnishinweis sind in allen Kopien oder wesentlichen Teilen der Software enthalten.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG ZUR VERFÜGUNG GESTELLT, EINSCHLIESSLICH DER GEWÄHRLEISTUNG FÜR MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL HAFTEN DIE AUTOREN ODER COPYRIGHT-INHABER FÜR ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNGEN, OB VERTRAGS-, TORT- ODER ANDERWEITIGE MASSNAHMEN, DIE AUS, AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN ANGEBOTE ENTSTEHEN SOFTWARE.

## Changelog