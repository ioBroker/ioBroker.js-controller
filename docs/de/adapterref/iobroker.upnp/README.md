---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: zbYTjN9EkG7QUp56ty2BCSqYG1r0JxrFC1QOKagJl0U=
---
![Logo](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.upnp.svg)
![Anzahl der Installationen](http://iobroker.live/badges/upnp-stable.svg)
![Logo](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Bild](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
WICHTIG: Bei diesem Adapter handelt es sich um einen BETA-Status.

*** Node 4.x + benötigt! ***

1. [Deutsch] (# german_description)
* [Was ist UPnP?] (# Was-ist-upnp)
* [Funktionsbeschreibung] (# funktionsbeschreibung)
* [Objektstruktur] (# objektstruktur)
* [Allgemeine Objekte] (# allgemeine-objekte)
* [Upnp Objekte] (# upnp-objekte)
* [Steuerung] (# steuerung)
* [Geräte / Dienst Spezifische Besonderheiten] (# gerätedienst-spezifische-besondereerheiten)

2. [Englisch] (# english_description)
* [Was ist UPnP?] (# What-is-upnp)
* [Funktionsbeschreibung] (# Funktionsbeschreibung)
* [Objektstruktur] (# Objektstruktur)
* [Allgemeine Objekte] (# allgemeine Objekte)
* [Upnp Objects] (# Objektstruktur)
* [Kontrolle] (# Kontrolle)
* [Geräte- / Service-spezifische Funktionen] (# Geräte-spezifische Funktionen)

3. [Changelog] (# changelog)

## Deutsche Beschreibung
### Verwendungszweck
Dient der Kommunikation und Interaktion mit allen UPnP-Fähigen Geräten.

#### Was ist UPnP?
UPnP = Universal Plug and Play. Is the versuch a standardization of communication between devices in network produziert.
Dazu gibt es sogenannte „Schemas“, die in Form einer xml-Datei dargestellt werden. Sie enthalten alle Informationen über das Gerät oder die Software und deren Dienste die sie bereit stellen. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst möglichen Schema, dadurch können Informationen und Befehle ausgetauscht werden, ohne dass es der Kenntnis bedarf, welches Modell oder von welchem Hersteller das Gerät oder die Software ist. In der Vergangenheit wurde diese Standardisierung für alle Mediengeräte und Software genutzt. Seit einiger Zeit gibt es auch Bestrebungen für die Kommunikation des „IoT - Internet of Things“ mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 die „Open Connectivity Foundation“ gegründet, welche Zertifizierung von UPnP-Fährgeräten durchgeführt und Standards erstellt wurde.

#### Funktionsbeschreibung
The adapter is when first start a broadcast through and value the answers from. The answers include the link to the xml files of services. Anhand der xml-Dateien werden die Objekte in ioBroker erstellt und mit allen verfügbaren Informationen befüllt.

Zeitverzögert wird ein Dienst gestartet, der auf Nachrichten von Geräten / Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, damit ioBroker jede Änderung (die gesendet wird) des Gerätes / Dienstes automatisch übermittelt.

#### Objektstruktur
Each device or software the on the Broadcast reply wird als eigenständiges Objekt angelegt. Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden in 3 Kategorien (Rolle / role) eingeteilt: indicator.state, action und argument.

** state - ** ist eine Variable, die den aktuellen Zustand eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder indicator.state hat einen bestimmten Typ wie number, string, boolean,…. Darüber hinaus können diese Angaben im „native“ eines Objekts hinterlegt werden.
Bisher implementierte native's:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowedValues = Strings die Akzeptiert werden.
- minimum = Gibt den niedrigsten Wert an der Akzeptiert wird.
- maximum = Gibt den höchsten Wert an der Akzeptiert wird.
- step = Gibt an, in welchen Schritten ein Wert verändert werden kann.

** button - ** "request" (Anfordern) This object hat in regelfall a under object, the argument.

** argument - ** ist ein Unterobjekt von einer Aktion-Channel. Der Typ ist „gemischt“ da er nicht vorgegeben wird. In the native’s of the Objects find be different information, you can from argument to argument different its.
Bisher bekannte Muttersprachler:

- direction = Gibt die Richtung an in der der Informationsfluss statt findet.

„In“ bedeutet es wird kein Wert zurück geliefert.
„Out“ bedeutet es wird ein Wert zurück geliefert.

- relatedStateVariable = Gibt den Indikator

Zuständig ist.

- argumentNumber = Gibt ein wievieltes Argument der Action es ist.

### Allgemeine Objekte
Die folgenden Objekte finden Sie für jedes Gerät / jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des UPnP Standards oder der Geräte- / Dienstbeschreibung des jeweiligen Gerätes.

** Alive - ** wird vom Gerät / Dienst auf „true“ gesetzt und vom Adapter nach x Sekunden auf „null“ gesetzt, wenn das Gerät / Dienst diesen nicht wieder auf „true“ setzt. The flow time is depend to the maximum lifetime of the device for the Alive signal mitgeteilt worden. Wenn ein Gerät abmeldet wird der Status auf „false gesetzt. Es ist möglich, dass dieses Objekt von Hand oder per Skript auf „true“ gesetzt wird, wenn man sicher ist, dass das Gerät / der Dienst erreichbar ist. Wenn Alive manuell auf „true“ gesetzt wurde, sollte es auch manuell auf „false“ gesetzt werden, wenn nicht mehr nötig, da andernfalls Fehler auftreten können.

** Sid - ** Dient als identifikation der Subscription. This sid is every time from the host if a subscription from a client used to be used. The sid running to the host based time, also is always again updated. Sie gilt nur für einen bestimmten Dienst.

### UPnP Objekte
Die hier auf gelisteten Objekte finden sich im UPnP Standard und / oder den Geräte- / Dinestbeschreibungen. Es wird hier nicht um eine vollständige Liste aller Objekte gebeten, diese Auswahl an Objekten stellt lediglich häufig vorkommende Objekte dar.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID ist die häufigste Instanz, die benötigt wird, um eine Instanz zu finden, die angesprochen werden soll. In den meisten Fällen ist die InstanceID = 0. Diese ID wird bei jeder Ereignismeldung von einem Dienst und jedem Befehl, der an einen Dienst gesendet wird, übergeben.

** (A_ARG_TYPE_) Channel (*) - ** Das Channel-Objekt findet sich im Zusammenhang mit Audio / Video Diensten. Ein Channel muss zum Beispiel angegeben werden, wenn die Lautstärke verändert werden soll. Mögliche Werte können beispielsweise „Master“, „LF“ oder „RF“ sein. In diesem Beispiel steht „Master“ für die Allgemeine Lautstärke, „LF“ für Links vorne und „RF“ für rechts vorne. Wenn jetzt die Lautstärke geändert wird, gibt man „RF“ bei Channel an.

** (Set / Get) Volume (*) - ** Das Volume-Objekt findet sich im Zusammenhang mit Audio / Video Diensten. Je nachdem, wo es vorkommt, wird es zum Anzeigen der Lautstärke verwendet oder zum Einstellen der Lautstärke. This object is always a minimum value and a maximum value can be, in the most fällen is the value areas between 0 and 100.

### Steuerung
** button - ** "request" (Anfordern) Zu jeder Aktion gehören auch Argumente, die zwingend angegeben werden müssen. Action's erkennt man an ihrer Rolle, dort steht „action“. Beschreibt man die Aktion mit „send“.

** state.argument.x - ** Muss bei einer Aktion angegeben werden, wenn unter Rolle "state.argument.in" ist. Mögliche Werte können / müssen man in der „Related State Variable“ finden. Der Name dieser „Related State Variable“ ist im Objekt unter „native“ -> „relatedStateVariable“ hinterlegt. The argumente must in a specific sequence given, Dazu gibt es „native“ -> Argument_No. Ein Argument erkennt man an seiner Rolle. Manche Zeichenfolgen müssen mit einem „“ in den Datenpunkt geschrieben werden. Es kann nicht pauschal beantwortet werden, wann das der Fall ist, aber bei komplexen Strings wie zum Beispiel URL's can the Fall its. Hier hilft nur ausprobieren. Will man ein "in einem Argument übergeben muss man" verwenden.

** (Related State) Variable - ** Es wird für den Datenaustausch genutzt. In den Native’s finden sich verschiedene Informationen:

- allowedValues = gibt Auskunft über die möglichen Inhalte der Variable oder was als Argument with a action sent be can.
- minimum = der niedrigste Wert der Variable kann oder als Argument with a action sent be can.
- maximum = the maximum value the variable can be than a argument with a action sent be can.
- step = gibt an in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind „ja“ oder „nein“. Es ist aber völlig unklar was das zu bedeuten hat. Die Annahme, dass die Werte für diese Variable nur von einem Gerät / Dienst automatisch gesendet werden, wenn „yes“ bei sendEvents bestätigt wird.

Beispiel, wie man die Werte pollen kann:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auch die Möglichkeit bei den "Anfrage" Zuständen das Polling über Admin einzustellen.

### Geräte / Dienst Spezifische Besonderheiten
** Sonos: ** Für QPlay ist es nicht möglich ein Abonnement zu erstellen. Möglicherweise ist dadurch eine Autentifikation notwendig

** Phillips Hue Bridge 2: ** Die Implementierung der UPnP-Standards in der Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 zwar gefunden wird, jedoch nicht über UPnP ansprechbar ist.

** Yamaha: ** Verwendet eine auf dem UPnP-Standard basierende API, jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom UPnP Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi welche Schnittstelle über UPnP ansprechbar ist jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom UPnP Adapter nicht unterstützt.

** Amazon Kindle: ** Stellt einen UPnP-Dienst bereit, jedoch wird keine UPnP-Dienstbeschreibung geliefert und kann daher nicht genutzt werden.

## Deutsche Beschreibung
*** Übersetzung von https://www.deepl.com/translator***

### Verwendungszweck
Dient zur Kommunikation und Interaktion mit allen UPnP-fähigen Geräten.

#### Was ist UPnP?
UPnP = Universal Plug and Play. Der Versuch, die Kommunikation zwischen Geräten im Netzwerk zu standardisieren. Zu diesem Zweck gibt es sogenannte "Schemata", die in Form einer XML-Datei angezeigt werden. Sie enthalten alle Informationen über das Gerät oder die Software und deren Dienste, die sie bereitstellen. Um sicherzustellen, dass diese Dienste auch verwendet werden können, wird eine Beschreibung jedes Dienstes bereitgestellt. Diese Beschreibung folgt dem für den Dienst definierten Schema, sodass Informationen und Befehle schnell ausgetauscht werden können, ohne dass bekannt ist, um welches Modell oder welchen Hersteller es sich bei dem Gerät oder der Software handelt. In der Vergangenheit wurde diese Standardisierung hauptsächlich für Mediengeräte und Software verwendet. Seit einiger Zeit wird auch versucht, die Kommunikation des "IoT - Internet of Things" mit dieser Standardisierung zu vereinheitlichen. Zu diesem Zweck wurde 2016 die "Open Connectivity Foundation" gegründet, die die Aufgaben des UPnP-Forums übernimmt, das die Zertifizierung von UPnP-fähigen Geräten durchgeführt und Standards erstellt hat.

#### Funktionsbeschreibung
Der Adapter sendet und wertet die Antworten beim ersten Start aus. Die Antworten enthalten den Link zu den XML-Dateien der Dienste. Die XML-Dateien werden verwendet, um die Objekte in ioBroker zu erstellen und sie mit allen verfügbaren Informationen zu füllen.

Zeitverzögert wird ein Dienst gestartet, der auf Nachrichten von Geräten / Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, sodass ioBroker automatisch über Änderungen (gesendet) an das Gerät / den Dienst benachrichtigt wird.

#### Objektstruktur
Jedes Gerät oder jede Software, die auf die Übertragung reagiert, wird als separates Objekt erstellt. Unterhalb dieses Objekts finden Sie alle verfügbaren Dienste mit ihren Funktionen. Die Möglichkeiten sind in 3 Kategorien (Rolle / Rolle) unterteilt: Indikator. Zustand, Aktion und Argument.

** state - ** ist eine Variable, die den aktuellen Status eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder indicator.state hat einen bestimmten Typ wie number, string, boolean, ..... Außerdem wird genau angegeben, welchen Wert oder Wertebereich der Inidcator hat. Zustand haben kann, werden diese Details im "native" eines Objekts gespeichert. Zuvor implementierte native 's:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowedValues = Zeichenfolgen, die akzeptiert werden.
- minimum = Gibt den niedrigsten Wert an, bei dem der Wert akzeptiert wird.
- maximum = Gibt den höchsten Wert an, bei dem die Annahme erfolgt.
- step = Gibt an, in welchen Schritten ein Wert geändert werden kann.

** button - ** "reuqest" ist ein Befehl, der an das Gerät / den Dienst gesendet und von diesem akzeptiert werden kann. Dieses Objekt hat normalerweise ein Unterobjekt, das Argument.

** argument - ** ist ein Unterobjekt einer Aktion. Der Typ ist "gemischt", da er nicht angegeben ist. Die Natives des Objekts enthalten unterschiedliche Informationen. Sie können von Argument zu Argument unterschiedlich sein. Bisher bekannte Ureinwohner:

- direction = Gibt die Richtung an, in die der Informationsfluss stattfindet. In "bedeutet, dass kein Wert zurückgegeben wird. Out" bedeutet, dass ein Wert zurückgegeben wird.
- relatedStateVariable = Gibt den Indikator zurück. Staat, für den der Datenaustausch zuständig ist.
- argumentNumber = Gibt die Anzahl der Argumente der Aktion zurück, um die es sich handelt.

### Allgemeine Objekte
Die folgenden Objekte werden für jedes Gerät / jeden Dienst gefunden und sind für die Administration erforderlich. Sie sind nicht Bestandteil des UPnP-Standards oder des Gerätes / der Bedienungsanleitung des jeweiligen Gerätes.

** Alive - ** vom Gerät / Dienst auf "true" gesetzt und vom Adapter nach x Sekunden auf "null" gesetzt, wenn das Gerät / der Dienst es nicht wieder auf "true" setzt. Die Ablaufzeit hängt von der maximalen Lebensdauer des vom Gerät ausgegebenen Alive-Signals ab. Wenn sich ein Gerät abmeldet, wird der Status auf "false" gesetzt. Es ist möglich, dieses Objekt manuell oder per Skript auf "true" zu setzen. Dies sollte jedoch nur erfolgen, wenn Sie sicher sind, dass das Gerät / der Dienst erreichbar ist. Wenn Alive manuell auf "true" gesetzt wurde, sollte es auch manuell auf "false" gesetzt werden, wenn dies nicht mehr erforderlich ist, da andernfalls Fehler auftreten können.

** Sid - ** Dient zur Identifizierung des Abonnements. Diese Seite wird vom Host jedes Mal erstellt, wenn ein Abonnement von einem Client angefordert wird. Das Sid wird nach einer vom Host festgelegten Zeit ausgeführt, sodass es immer wieder aktualisiert wird. Sie gilt nur für einen bestimmten Service.

### UPnP-Objekte
Die hier aufgeführten Objekte finden Sie im UPnP-Standard und / oder in den Geräte- / Dinest-Beschreibungen. Dies ist keine vollständige Liste aller Objekte, diese Auswahl von Objekten repräsentiert nur häufig vorkommende Objekte.

** (A_ARG_TYPE_) Instanz-ID - ** Die Instanz-ID ist die häufigste und wird benötigt, da sie die Instanz eines zu adressierenden Dienstes angibt. In den meisten Fällen ist die Instanz-ID = 0. Diese ID wird mit jeder Ereignismeldung von einem Dienst und jedem an einen Dienst gesendeten Befehl übergeben.

** (A_ARG_TYPE_) Channel (*) - ** Das Kanalobjekt ist Audio- / Videodiensten zugeordnet. Zum Beispiel muss ein Kanal angegeben werden, wenn Sie die Lautstärke ändern möchten. Mögliche Werte können beispielsweise "Master", "LF" oder "RF" sein. In diesem Beispiel steht "Master" für die allgemeine Lautstärke, "LF" für die linke Vorderseite und "RF" für die rechte Vorderseite. Wenn Sie die Lautstärke nur auf der rechten Frontplatte ändern möchten, müssen Sie "RF" in Channel angeben.

** (Set / Get) Volume (*) - ** Das Volume-Objekt ist Audio- / Videodiensten zugeordnet. Je nachdem, wo es auftritt, wird es zum Anzeigen der Lautstärke oder zum Anpassen der Lautstärke verwendet. Dieses Objekt hat immer einen minimalen und einen maximalen Wert, die angegeben werden können. In den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittgröße ist normalerweise 1, dh es können nur gerade Zahlen eingegeben werden.

### Steuerung
** button - ** "request" -Aktion ist ein Befehl, der an das Gerät / den Dienst gesendet werden kann. Jede Aktion enthält auch Argumente, die als obligatorisch angegeben werden müssen. Handlungen können an ihrer Rolle / Rolle erkannt werden, die "Handlung" sagt. Wenn Sie die Aktion mit "senden" beschreiben, wird der Befehl an das Gerät / den Dienst gesendet.

** state.argument.x - ** Obligatorisch für eine Aktion, wenn die Rolle "state.argument.in" ist. Mögliche Werte, die angegeben werden können / müssen, finden Sie in der "Related State Variable". Der Name dieser "Related State Variable" wird im Objekt unter "native" -> "relatedStateVariable" gespeichert. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, dafür gibt es "native" -> Argument_No. Ein Argument kann an seiner Rolle / Rolle erkannt werden, in der "Argument" steht. Einige Zeichenfolgen müssen mit einem "" "" im Datenpunkt geschrieben werden. Es ist nicht möglich, diese Frage pauschal zu beantworten, aber bei komplexen Zeichenfolgen wie URLs kann dies der Fall sein. Es hilft nur, es auszuprobieren. Wenn Sie in einem Argument ein "" übergeben möchten, müssen Sie "" "verwenden.

** (Related State) Variable - ** Dies sind Variablen, die für den Datenaustausch verwendet werden. In den Natives der Variablen gibt es einige Informationen:

- allowedValues = gibt Auskunft über den möglichen Inhalt der Variablen oder darüber, was als Argument mit einer Aktion gesendet werden kann.
- minimum = der niedrigste Wert, den die Variable enthalten kann oder der als Argument mit einer Aktion gesendet werden kann.
- maximum = der höchste Wert, den die Variable enthalten kann oder der als Argument mit einer Aktion gesendet werden kann.
- step = gibt an, in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind "ja" oder "nein". Aber es ist völlig unklar, was das bedeutet. Die Annahme, dass die Werte für diese Variable nur dann automatisch von einem Gerät / Dienst gesendet werden, wenn bei sendEvents "yes" gesetzt ist, wurde nicht bestätigt.

Beispiel, wie die Werte abgefragt werden:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Sie können die Abfrage in admin über die Objektkonfiguration aktivieren.

### Geräte / Service-spezifische Funktionen
** Sonos: ** Es ist nicht möglich, ein Abonnement für QPlay zu erstellen. Dies erfordert möglicherweise eine Authentifizierung.

** Phillips Hue Bridge 2: ** Die Implementierung des UPnP-Standards in Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 gefunden wird, aber nicht über UPnP erreichbar ist.

** Yamaha: ** Verwendet eine API, die auf dem UPnP-Standard basiert, jedoch ein eigenes Datenformat verwendet. Dies wird derzeit vom UPnP-Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi-Schnittstelle mit dem Namen UPnP-adressierbar, verwendet jedoch ein eigenes Datenformat. Dies wird derzeit vom UPnP-Adapter nicht unterstützt.

** Amazon Kindle: ** Bietet einen UPnP-Dienst, es wird jedoch keine UPnP-Dienstbeschreibung bereitgestellt und kann daher nicht verwendet werden.

## Changelog
### 1.0.12 (2019-06-12)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

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
* (jey-cee) added possibility for controling UPnP devices

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
* (jey-cee) getting all xml data from UPnP devices

#### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2019 Jey Cee <jey-cee@live.com>

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