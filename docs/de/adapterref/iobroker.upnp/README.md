---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: 617ChqfRst2Q58t23/VOM3YFegsnPuDI9EQJ+um5Fxs=
---
![Logo](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Logo](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Bild](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
WICHTIG: Dieser Adapter befindet sich im BETA-Status.

*** Knoten 4.x + benötigt! ***

1. [Deutsch] (# Deutsch)
* [Was ist upnp?] (# Was_ist_upnp)
* [Funktionsbeschreibung] (# Funktionsbeschreibung)
* [Objektstruktur] (# Objektstruktur)
* [Allgemeine Objekte] (# Allgemeine_Objekte)
* [Upnp Objekte] (# Upnp_Objekte)
* [Steuerung] (# Steuerung)
* [Geräte / Dienst Spezifische Besonderheiten] (# Besonderheiten)

2. [Englisch] (# Englisch)
* [Was ist upnp?] (# What_is_upnp)
* [Funktionsbeschreibung] (# Funktionsbeschreibung)
* [Objektstruktur] (# Object_structure)
* [Allgemeine Objekte] (# General_objects)
* [Upnp Objects] (# Object_structure)
* [Control] (# Control)
* [Geräte / dienstspezifische Funktionen] (# spezifisch)

3. [Changelog] (# Changelog)

<a name="German">Deutsche Beschreibung:</a> ================================= **Verwendungszweck**

Dient der Kommunikation und Interaktion mit allen Upnp-Fähigen Geräten.

<a name="Was_ist_upnp">** Was ist upnp? **</a>

upnp = Universal Plug and Play. Ist der Versuch eine Standardisierung der Geräte zwischen
Dazu gibt es folgende "Schemas". Sie enthalten alle Informationen über das Gerät oder die Software und deren Dienste. Damit sind diese Dienste auch nutzbar. Diese Beschreibung folgt dem Dienst für das Dienstprogramm, dh die Informationen und Befehle werden ausgetauscht, ohne dass das Modell davon betroffen ist. In der Vergangenheit wurde diese Standardisierung für alle Mediengeräte und Software genutzt. Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des „Internet der Dinge“ mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 die „Open Connectivity Foundation“ gegründet, die die Aufgaben des Upnp-Forums übernimmt, die die Zertifizierung von Upnp-Fähigen durchführt.

<a name="Funktionsbeschreibung">** Funktionsbeschreibung **</a>

Der Adapter führt beim ersten Start eines Broadcast durch und Wertet die Antworten aus. Die Antworten enthalten den Link zu den xml Dateien der Dienste. Anhand der XML-Dateien werden die Objekte in ioBroker erzeugt.

Zeitverzögert wird ein Dienst auf Nachrichten von Geräten / Diensten wartet die sich an oder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem einzelnen Gerät an und abonniert Statusmeldungen, damit bekommt der ioBroker jede Änderung (die übertragen wird) des Gerätes / Dienstes automatisch.

<a name="Objektstruktur">** Objektstruktur **</a>

Jedes Gerät oder Software wird als eigenständiges Objekt angelegt. Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden in 3 Kategorien (Rolle / Rolle) eingeteilt: Indicator.State, Action und Argument.

** Indicator.State - ** ist eine Variable, die den Aktuellen Status eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder Indicator.state hat einen bestimmten Typ wie number, string, boolean,…. Darüber hinaus ist es genau bestimmt, welchen Wert oder Wertebereich der inidcator.state haben, diese Angaben sind im „native“ eines Objekts hinterlegt.
Bisher implementierte Muttersprachler:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowedValues = Strings die Akzeptiert werden.
- minimum = Gibt den niedrigsten Zahlenwert an der Akzeptiert wird.
- Maximum = Gibt den besten Zahlenwert an der Akzeptiert wird.
- step = Gibt einen in welchen Schritten ein Wert verändert werden kann.

** Aktion - ** ist ein Befehl für das Gerät / den Dienst; Dieses Objekt hat im Regelfall ein Unterobjekt, das Argument.

** Argument - ** ist ein Unterobjekt von einer Aktion. Der Typ ist „gemischt“ da er nicht vorgegeben wird. In den Muttersprachen finden Sie verschiedene Informationen, sie können von argument zu argument anders sein.
Bisher bekannte Einheimische:

- direction = Gibt die Richtung an.

„In“ bedeutet es wird kein Wert zurück geliefert.
„Out“ bedeutet es wird ein Wert zurück geliefert.

- relatedStateVariable = Gibt den Indicator.State an der für den Austausch der Daten

Zuständig ist.

- Argument_No = Gibt ein das wievielte Argument der Action es ist.

<a name="Allgemeine_Objekte">** Allgemeine Objekte **</a>

Die folgenden Objekte finden sich für jedes Gerät / jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des Standards oder der Geräte- / Dienstbeschreibung des jeweiligen Gerätes.

** Alive - ** wird vom Gerät / Dienst auf "true" gesetzt und vom Adapter auf x Sekunden auf "null" gesetzt, wenn das Gerät / Dienst nicht auf "true" setzt. Die Ablaufzeit ist abhängig von der maximalen Lebensdauer des Geräts für das Alive-Signal. Wenn ein Gerät sich abmeldet wird der Status auf „false gesetzt. Es ist möglich, dieses Objekt von Hand oder per Skript auf „true“ zu setzen, das sollte jedoch gemacht werden, wenn man sicher ist, dass das Gerät / Dienst erreichbar ist. Wenn Alive manuell auf „true“ gesetzt wurde, sollte auch manuell auf „false“ gesetzt werden, wenn nicht mehr nötig, da andernfalls Fehler auftreten können.

** Sid - ** Dient als Kennung der Subscription. Diese Seite wird jedesmal vom Host erzeugt, wenn ein Abonnement von einem Client angefordert wird. Die sid läuft nach einer vom Host bestimmten Zeit ab, daher wird sie immer wieder aktualisiert. Sie gilt nur für einen bestimmten Dienst.

<a name="Upnp_Objekte">** Upnp Objekte **</a>

Die hier auf gelisteten Objekte finden sich im Standard und / oder den Geräte- / Dinestbeschreibungen. Es handelt sich hier um eine vollständige Liste aller Objekte.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID ist am häufigsten zu finden und wird zwingend benötigt, um die Instanz eines Dienstes angibt der angesprochen werden soll. Diese ID wird bei jeder Ereignismeldung von einem Dienst und jedem Befehl eines Dienstes wird, mit übergeben.

** (A_ARG_TYPE_) Channel (*) - ** Das Channel-Objekt findet sich im Zusammenhang mit Audio / Video-Diensten. Ein Channel muss zum Beispiel angegeben werden, wenn die Lautstärke verändert werden soll. Mögliche Werte können „Master“, „LF“ oder „RF“ sein. In diesem Beispiel steht „Master“ für die Allgemeine Lautstärke, „LF“ für links vorne und „RF“ für rechts vorne. Wenn jetzt die Lautstärke nur rechts vorne verändert wird, gibt man „RF“ bei Channel an.

** (Set / Get) Volume (*) - ** Das Volume-Objekt findet sich im Zusammenhang mit Audio / Video. Je nachdem wo es vorkommt wird es zum Anzeigen der Lautstärke genutzt oder zum Einstellen der Lautstärke. Dieses Objekt hat immer einen Mindestwert und einen Maximalwert angeben, in den meisten Fällen liegt der Wertebereich zwischen 0 und 100.

<a name="Steuerung">** Steuerung **</a>

** Action - Eine Aktion stellt einen Befehl dar, der an das Gerät / den Dienst geschickt wird. Zu jeder Aktion gehören auch Argumente, die Zwingend angegeben werden. Action’s erkennt man an ihrer Rolle, dort steht „Action“. Beschreibt man die Aktion mit "send" wird der Befehl an das Gerät / den Dienst gesendet.

** Argument - ** Muss zwingend bei einer Aktion angegeben werden, wenn unter „Einheimische“ -> „Richtung“ „In“ steht. Mögliche Werte die angegeben werden müssen. Der Name dieser „Related State Variable“ ist im Objekt unter „native“ -> „relatedStateVariable“ hinterlegt. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es „native“ -> Argument_No. Ein Argument erkennt man an seiner Rolle, dort steht „argument“. Manche Zeichenketten müssen mit einem „“ in den Datenpunkt geschrieben werden. Es ist nicht pauschal, wie der Fall sein wird, aber bei komplexen Strings wie zum Beispiel Hier hilft nur ausprobieren. Will man ein "in einem Argument übergeben" muss.

** (Related State) Variable - ** Es handelt sich um Variablen, die für den Datenaustausch genutzt werden. In den Native 's der Variablen finden sich verschiedene Informationen:

Wenn die Argumente einer Variable angezeigt werden sollen, kann das durch die angegebenen Werte der Variable mitgeteilt werden.
- minimum = der niedrigste Wert der Variable;
- maximum = der höchste Wert der Variable;
- Schritt = gibt einen in welchen Schritten ein Wert angegeben.
- sendEvents =? Mögliche Werte sind „yes“ oder „no“. Es ist aber völlig unklar. Die Annahme der Werte für diese Variable wird von einem Gerät / Dienst automatisch gesendet.

<a name="Besonderheiten">## Geräte / Dienst Spezifische Besonderheiten</a>

** Sonos: ** Für QPlay ist es nicht möglich, ein Abonnement zu erstellen. Möglicherweise ist dies eine Autentifikation notwendig

** Phillips Hue Bridge 2: ** Die Implementierung des Upnp Standards in der Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 zwar nicht gefunden wird.

** Yamaha: ** Verwendet eine auf dem Upnp-Standard basierende API, die jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom Upnp Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi-Schnittstelle Derzeit wird das vom Upnp Adapter nicht unterstützt.

** Amazon Kindle: ** Stellt einen Dienst zur Verfügung, wird jedoch nicht genutzt.

<a name="English">Englisch Beschreibung:</a> ================================ *** Übersetzung durch https://www.deepl.com/ Übersetzer***

***Verwendungszweck***

Dient zur Kommunikation und Interaktion mit allen upnp-fähigen Geräten.

<a name="What_is_upnp">** Was ist Upnp? **</a>

upnp = Universal Plug and Play. Der Versuch, die Kommunikation zwischen Geräten im Netzwerk zu standardisieren. Zu diesem Zweck gibt es sogenannte "Schemas", die in Form einer XML-Datei angezeigt werden. Sie enthalten alle Informationen über das Gerät oder die Software und die von ihnen bereitgestellten Dienste. Um sicherzustellen, dass diese Dienste auch verwendet werden können, wird eine Beschreibung jedes Dienstes bereitgestellt. Diese Beschreibung folgt dem für den Dienst definierten Schema, so dass Informationen und Befehle schnell ausgetauscht werden können, ohne zu wissen, welches Modell oder Hersteller das Gerät oder die Software ist. In der Vergangenheit wurde diese Standardisierung hauptsächlich für Mediengeräte und Software verwendet. Seit einiger Zeit wird auch versucht, die Kommunikation des "Internet der Dinge" mit dieser Standardisierung zu vereinheitlichen. Zu diesem Zweck wurde 2016 die "Open Connectivity Foundation" gegründet, die die Aufgaben des upnp-Forums übernimmt, das die Zertifizierung von upnp-fähigen Geräten durchgeführt und Standards geschaffen hat.

<a name="Functional_description">**Funktionsbeschreibung**</a>

Der Adapter sendet und wertet die Antworten beim ersten Start aus. Die Antworten enthalten den Link zu den XML-Dateien der Dienste. Die XML-Dateien werden verwendet, um die Objekte in ioBroker zu erstellen und sie mit allen verfügbaren Informationen zu füllen.

Zeitverzögert wird ein Dienst gestartet, der auf Nachrichten von Geräten / Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, so dass der ioBroker automatisch über Änderungen (gesendet) an dem Gerät / dem Dienst informiert wird.

<a name="Object_structure">** Objektstruktur **</a>

Jedes Gerät oder jede Software, die auf die Übertragung reagiert, wird als separates Objekt erstellt. Unter diesem Objekt finden Sie alle verfügbaren Dienste mit ihren Möglichkeiten. Die Möglichkeiten sind in 3 Kategorien (Rolle / Rolle) unterteilt: Indikator. Staat, Aktion und Argument.

**Indikator. state - ** ist eine Variable, die den aktuellen Status eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder Indikator.Status hat einen bestimmten Typ wie number, string, boolean, ..... Außerdem wird genau angegeben, welchen Wert oder Wertebereich der inidcator hat. Status haben kann, werden diese Details im "nativen" eines Objekts gespeichert. Zuvor implementierte native's:

- sendEvents = Bedeutung bisher unbekannt.
- allowedValues = Zeichenfolgen, die akzeptiert werden.
- minimum = Gibt den niedrigsten Wert an, bei dem der Wert akzeptiert wird.
- maximum = Gibt den höchsten Wert an, bei dem die Abnahme erfolgt.
- step = Gibt an, in welchen Schritten ein Wert geändert werden kann.

** action - ** ist ein Befehl, der an das Gerät / den Dienst gesendet und von diesem akzeptiert werden kann. Dieses Objekt hat normalerweise ein Unterobjekt, das Argument.

** Argument - ** ist ein Unterobjekt einer Aktion. Der Typ ist "gemischt", da er nicht angegeben ist. Die Native des Objekts enthalten unterschiedliche Informationen, sie können sich von Argument zu Argument unterscheiden. Bisher bekannte Einheimische:

- direction = Gibt die Richtung an, in der der Informationsfluss stattfindet. In "bedeutet, dass kein Wert zurückgegeben wird. Out" bedeutet, dass ein Wert zurückgegeben wird.
- relatedStateVariable = Gibt den Indikator zurück. Zustand, für den der Datenaustausch verantwortlich ist.
- Argument_No = Gibt die Anzahl der Argumente der Aktion zurück.

<a name="General_objects">** Allgemeine Objekte **</a>

Die folgenden Objekte werden für jedes Gerät / jeden Dienst gefunden und sind für die Verwaltung erforderlich. Sie sind nicht Bestandteil des Upnp-Standards oder der Geräte- / Betriebsanleitung des jeweiligen Geräts.

** Alive - ** vom Gerät / Dienst auf "true" gesetzt und nach x Sekunden vom Adapter auf "Null" gesetzt, wenn das Gerät / der Dienst es nicht erneut auf "true" setzt. Die Ablaufzeit hängt von der maximalen Lebensdauer des Alive-Signals ab, die vom Gerät ausgegeben wird. Wenn sich ein Gerät abmeldet, wird der Status auf "false" gesetzt. Es ist möglich, dieses Objekt per Hand oder Skript auf "true" zu setzen. Dies sollte jedoch nur erfolgen, wenn Sie sicher sind, dass das Gerät / der Dienst erreichbar ist. Wenn Alive manuell auf "true" gesetzt wurde, sollte es auch manuell auf "false" gesetzt werden, wenn dies nicht mehr erforderlich ist. Andernfalls können Fehler auftreten.

** Sid - ** Dient zur Identifizierung des Abonnements. Diese Seite wird vom Host jedes Mal erstellt, wenn ein Abonnement von einem Client angefordert wird. Die Sid wird nach einer vom Host definierten Zeit ausgeführt und daher immer wieder aktualisiert. Sie gilt nur für einen bestimmten Dienst.

<a name="Upnp_O">** Upnp-Objekte **</a>

Die hier aufgelisteten Objekte finden Sie im upnp-Standard und / oder in der Geräte- / Dinest-Beschreibung. Dies ist keine vollständige Liste aller Objekte. Diese Auswahl von Objekten repräsentiert nur häufig vorkommende Objekte.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID ist die gebräuchlichste und wird benötigt, weil sie die Instanz eines Dienstes angibt, der angesprochen werden soll. In den meisten Fällen ist die Instanz-ID = 0. Diese ID wird mit jeder Ereignismeldung von einem Dienst und jedem Befehl, der an einen Dienst gesendet wird, übergeben.

** (A_ARG_TYPE_) Channel (*) - ** Das Channel-Objekt ist mit Audio- / Videodiensten verknüpft. Zum Beispiel muss ein Kanal angegeben werden, wenn Sie die Lautstärke ändern möchten. Mögliche Werte sind beispielsweise "Master", "LF" oder "RF". In diesem Beispiel steht "Master" für die allgemeine Lautstärke, "LF" für die linke Front und "RF" für die rechte Front. Wenn Sie die Lautstärke nur am rechten vorderen Bedienfeld ändern möchten, müssen Sie "RF" in Channel angeben.

** (Set / Get) Volume (*) - ** Das Volume-Objekt ist mit Audio- / Videodiensten verknüpft. Je nachdem, wo es auftritt, wird es verwendet, um die Lautstärke anzuzeigen oder um die Lautstärke einzustellen. Dieses Objekt hat immer einen minimalen und einen maximalen Wert, der angegeben werden kann. In den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittgröße ist normalerweise 1, dh es können nur gerade Zahlen eingegeben werden.

<A name="Control">**Steuerung**</a>

** Aktion - ** Eine Aktion ist ein Befehl, der an das Gerät / den Dienst gesendet werden kann. Jede Aktion enthält auch Argumente, die als obligatorisch angegeben werden müssen. Aktionen können an ihrer Rolle / Rolle erkannt werden, die "Aktion" sagt. Wenn Sie die Aktion mit "Senden" beschreiben, wird der Befehl an das Gerät / den Dienst gesendet.

** Argument - ** Erforderlich für eine Aktion, wenn "native" -> "direction" auf "in" gesetzt ist. Mögliche Werte, die angegeben werden müssen / müssen, finden Sie in der "Related State Variable". Der Name dieser "Related State Variable" wird im Objekt unter "native" -> "relatedStateVariable" gespeichert. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, dazu gibt es "native" -> Argument_No. Ein Argument kann an seiner Rolle / Rolle erkannt werden, wenn es "Argument" sagt. Einige Zeichenfolgen müssen mit einem "" "" in den Datenpunkt geschrieben werden. Es ist nicht möglich, diese Frage pauschal zu beantworten, aber bei komplexen Zeichenfolgen wie URLs kann dies der Fall sein. Es hilft nur, es auszuprobieren. Wenn Sie in einem Argument ein "übergeben" möchten, müssen Sie "" "verwenden.

** (Related State) -Variable - ** Dies sind Variablen, die für den Datenaustausch verwendet werden. In den Eingeborenen der Variablen gibt es einige Informationen:

- allowedValues = gibt Auskunft über den möglichen Inhalt der Variablen oder was mit einer Aktion als Argument gesendet werden kann.
- minimum = der niedrigste Wert, den die Variable enthalten kann oder mit einer Aktion als Argument gesendet werden kann.
- maximum = der höchste Wert, den die Variable enthalten kann oder als Argument mit einer Aktion gesendet werden kann.
- step = gibt an, in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind "Ja" oder "Nein". Es ist jedoch völlig unklar, was das bedeutet. Die Annahme, dass die Werte für diese Variable nur dann automatisch von einem Gerät / Dienst gesendet werden, wenn bei sendEvents "yes" gesetzt ist, wurde nicht bestätigt.

<a name="Specific">** Geräte / dienstspezifische Funktionen **</a>

** Sonos: ** Es ist nicht möglich, ein Abonnement für QPlay zu erstellen. Dies erfordert möglicherweise eine Authentifizierung.

** Phillips Hue Bridge 2: ** Die Implementierung des Upnp-Standards in Hue Bridge 2 ist fehlerhaft. Daher wird die Hue Bridge 2 gefunden, ist jedoch nicht über Upnp erreichbar.

** Yamaha: ** Verwendet eine API, die auf dem Upnp-Standard basiert, jedoch ein eigenes Datenformat verwendet. Derzeit wird dies vom Upnp-Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi-Schnittstelle, die als adressierbar bezeichnet wird, jedoch ein eigenes Datenformat verwendet. Derzeit wird dies vom Upnp-Adapter nicht unterstützt.

** Amazon Kindle: ** Stellt einen Upnp-Dienst bereit, es wird jedoch keine Upnp-Dienstbeschreibung bereitgestellt und kann daher nicht verwendet werden.

## Changelog

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling upnp devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

## Changelog
### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

## Changelog
### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable


### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs


#### 0.2.0
* (jey-cee) getting all xml data from upnp devices

#### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016 Jey Cee <jey-cee@live.com>

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