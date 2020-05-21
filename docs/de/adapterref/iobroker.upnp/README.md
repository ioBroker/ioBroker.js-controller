---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: slDPN+9S20LO6Q421lT1Dgn21NMFIPI8ygvsNf8xHtw=
---
![Logo](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/upnp-stable.svg)
![Logo](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Bild](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
*** Knoten 4.x + benötigt! ***

1. [Deutsch] (# german_description)
* [Was ist UPnP?] (# Was-ist-upnp)
* [Funktionsbeschreibung] (# funktionsbeschreibung)
* [Objektstruktur]
* Allgemeine Objekte
* [Upnp-Objekte] (# upnp-objekte)
* [Steuerung] (# steuerung)
* # Gerätedienst-Interessen-Persönlichkeitheiten

2. [Englisch] (# english_description)
* [Was ist UPnP?] (# What-is-upnp)
* [Funktionsbeschreibung] (# Funktionsbeschreibung)
* [Objektstruktur] (# Objektstruktur)
* [Allgemeine Objekte] (# allgemeine Objekte)
* [Upnp Objects] (# Objektstruktur)
* [Kontrolle] (# Kontrolle)
* [Geräte / Service-spezifische Funktionen] (# Devicesservice-spezifische Funktionen)

3. [Changelog] (# changelog)

## Deutsche Beschreibung
### Verwendungszweck
Dient der Kommunikation und Interaktion mit allen UPnP-Fähigen Interessen.

#### War ist UPnP?
UPnP = Universal Plug and Play. Ist der Versuch einer Standardisierung der Kommunikation zwischen im Netzwerk.
Dazu gibt es heißt „Schemas“, diese werden in Form einer xml Datei Darstellung. Sie haben alle Informationen über das Gerät oder die Software und ihre Dienste die sie bereit gestellt. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst gehört Schema, wie es möglich ist, um Informationen zu erhalten, wie es heißt, was das Modell oder die Software ist. In der Vergangenheit wurde diese Standardisierung vor allem für Mediengeräte und Software-Anwendungen. Seit Jahren Zeit gibt es Bestrebungen auch die Kommunikation des Internet der Dinge mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 die „Open Connectivity Foundation“ gehört, diese Rechte die Aufgaben des UPnP-Forums, die die von UPnP-Fähigen-Beziehungs- und -standards haben.

#### Funktionsbeschreibung
Der Adapter wird beim ersten Start einer Sendung durch und Wertet die Antworten aus. Die Antworten erhalten den Link zu den xml Dateien der Dienste. Anhand der xml-Berechtigungen werden die Objekte in ioBroker-Berechtigungen und mit allen Berechtigungsinformationen befolgt.

Zeitverzögerungen werden zu einem Dienst, der auf Nachrichten von Steuern / Verträgen gehört, die sich selbst anmelden oder melden. Neu gewordene Geräte / Dienste werden zu zu gehören hinzugefügt hinzugefügt. Ein zweiter Dienst meldet sich bei jedem möglichen Gerät an und Abonniert Statusmeldungen, damit erhalten ioBroker jede Änderung der Geräte wird.

#### Objektstruktur
Jedes Gerät oder Software wird auf den Broadcast übertragen als wirdiges Objekt angelegt. Unterhalb dieses Objekts können sich alle bereit sein, sich bereit zu halten. Die möglichen werden in 3 Kategorien (Rolle / Rolle) eingeteilt: Indikator.Zustand, Aktion und Argument.

** state - ** ist eine Variable die den Aktuellen zustand eines Objekts / Datenpunkts im Gerät / Dienstweise. Jeder Indikator.Status hat einen möglichen Typ wie Nummer, Zeichenfolge, Boolescher Wert,…. Es ist wichtig, dass auch ein wahrer Wert oder Wertebereich der inidcator.state haben kann, diese sehen sind im „native“ eines Objekts hinterlegt.
Bisher implementierte Eingeborene:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowValues = Strings die werdeniert werden werden.
- Minimum = Gibt die richtigen Zahlen an und wird gezahlt.
- Maximum = Gibt den gleichen Zahlen an und wird gezahlt.
- step = Gibt ein in wahrheitsgemäßem Wert ein Wert wird werden kann.

** button - ** "Anfrage" ist ein Befehl der ein Gerät / den Dienst gegeben werden kann und von diesem Aktzeptiert wird. Dieses Objekt hat im Regelfall ein Unterobjekt, das Argument.

** Argument - ** ist ein Unterobjekt von einer Aktion-Channel. Der Typ ist „wird“ da er nicht vorgegeben wird. In den Eingeborenen des Objekts finden sich unterschiedliche Informationen, sie können von Argument zu Argument anders sein.
Bisher bekannte Eingeborene:

- direction = Gibt die Richtung und den Informationsfluss statt findet.

„In“ bedeutet es wird kein Wert zurückgezogen.
„Out“ wird es wird ein Wert zurückgenommen.

- relatedStateVariable = Gibt den Indikator.Status an den für den Austausch der Daten

Zuständig ist.

- argumentNumber = Gibt ein wievielte Argument der Aktion es ist.

### Allgemeine Objekte
Die folgenden Objekte finden sich für jedes Gerät und werden zur Verwaltung verwaltet. Sie sind nicht geprüft des UPnP Standards oder der Geräte- / Dienstbeschreibung des richtigen Geräts.

** Lebendig - ** wird vom Gerät / Dienst auf „wahr“ und Adapter nach x Sekunden auf „null“, wenn das Gerät / Dienst nicht wieder auf „wahr“ eingestellt. Die Ablaufzeit ist die Wahrscheinlichkeit, dass die maximale Dauer des Geräts für das lebendige Signal wurde. Wenn ein Gerät sich abmeldet wird der Status auf „falsche Angaben. Es ist möglich, dass dieses Objekt von Hand oder per Skript auf „wahr“ gesetzt wird, dass das, was nur gemacht wird, wenn man sicher ist, dass das Gerät / Dienst gehörtbar ist. Wenn Alive manuell auf „wahr“ gestellt wurde, wurde es auch manuell auf „falsch“ gestellt, wenn nicht mehr gehört, da andernfalls Fehler gehört können.

** Sid - ** Dient als Identifikation des Abonnements. Diese Seite wird jedes Mal vom Gastgeber gestellt, wenn ein Abonnement von einem Kunden angefordert wird. Die sid laufen nach einem vom Host definierten Zeit ab, wird wird immer wieder aktualisiert. Sie vergoldete nur für einen eigenen Dienst.

** Anfrage - ** sendet eine SOAP-Anfrage mit den spezifischen Optionen

### UPnP Objekte
Die hier auf gelisteten Objekte finden sich im UPnP Standard und / oder den Geräte- / Dinestbeschreibungen. Es handelt sich um keine Vollständige Liste aller Rechte, diese Auswahl und umsichtige, umsichtige, umsichtige, um.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID ist am sichersten zu finden und wird zwingend hinzugefügt da sie die Instanz eines möglichen Angibt der richtigen werden soll. In den anderen fällen ist die InstanceID = 0. Diese ID wird bei jeder Ereignismeldung von einem Dienst und jedem Befehl der einen Dienst gegeben wird, mit gehört.

** (A_ARG_TYPE_) Kanal (*) - ** Das Kanalobjekt findet sich im Zusammenhang mit Audio / Video-Diensten. Ein Kanal muss zum Beispiel gehört werden, wenn die Lautstärke verursacht werden soll. Mögliche Werte können erkennen „Meister“, „LF“ oder „RF“ sein. In diesem Beispiel steht „Master“ für die Allgemeine Lautstärke, „LF“ für Links vorne und „RF“ für rechts vorne. Wenn jetzt die Lautstärke nur rechts unerwartet werden soll, gibt man „RF“ bei Channel an.

** (Set / Get) Volume (*) - ** Das Volume Objekt findet sich im Zusammenhang mit Audio / Video gehört. Je mehr wo es vorkommen wird es zum Anzeigen der Lautstärke Rechte oder zum Wahrnehmen der Lautstärke. Dies Objekt hat immer einen Mindestwert und einen Maximalwert, den man haben kann, in den meisten fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittweite liegt normal bei 1, das heißt es können nur glatte Zahlen werden.

### Steuerung
** button - ** "request" Eine Aktion wurde einen Befehl dar, der ein Gerät / den Dienst erhalten werden kann. Zu jeder Aktion gehört auch dazu, die Zwingendlichen werden müssen. Action erkennt einen Mann und ihre Rolle, dort steht „Action“. Beschrieben man die Aktion mit „senden“ wird der Befehl an das Gerät.

** state.argument.x - ** Muss zwingend bei einer Aktion sein werden, wenn unter Rolle "state.argument.in" ist. Mögliche Werte die wahrgenommen werden können / müssen gefunden man in der „Related State Variable“. Der Name dieser „Related State Variable“ ist im Objekt unter „native“ -> „relatedStateVariable“ hinterlegt. Die Verantwortlichen müssen in einer bestimmten Person sein, hierzu gibt es „native“ -> Argument_No. Ein Argument erkennt man an seine Rolle / Rolle, dort steht „Argument“. Manche Strings müssen mit einem „“ in den Datenpunkt geschrieben werden. Es kann nicht pauschal sein, wenn das der Fall ist, aber wenn es sich um Beispielzeichen handelt. Hier hilft nur sich darum. Will man ein "in einem Argument fordert muss man" & quot;

** (Verwandter Zustand) Variable - ** Es handelt sich um Variablen sterben für die Datenaustausch-Rechte werden. In den Native der Variablen finden sich unterschiedliche Informationen:

- allowValues = gibt Auskunft über die Möglichkeit, die Variable zu ändern, oder war auch Argument mit einer Aktion, die werden kann.
- Minimum = der Besitzste Wert den die Variable enthält kann oder als Argument mit einer Aktion gehört werden kann.
- Maximum = der Wert Wert der Variable kann kann oder als Argument mit einer Aktion gehört werden kann.
- step = gibt ein in wahrheitsgemäßem Wert ein wird wird.
- sendEvents =? Mögliche Werte sind „ja“ oder „nein“. Es ist aber anders gehört war das zu gehört Hut. Die gleichen, dass die Werte für diese Variablen nur dann von einem Gerät / Dienst werden, wenn wenn „ja“ bei sendEvents steht hat sich nicht gehört.

Beispiel, wie man die Werte Pollen kann:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auch die Möglichkeit bei dem "Antrag" Objekt das Polling im Admin. Dafür Klickt man auf das Schraubenschlüssel Symbol bei dem Objekt.

### Geräte / Dienstliche Besonderheiten
** Sonos: ** Für QPlay ist es nicht möglich ein Abonnement zu erstellen. Möglicherweise ist hierfür eine Autentifikation gegeben

** Phillips Hue Bridge 2: ** Die Implementierung der UPnP-Standards in der Hue Bridge 2 ist Fehlerhaft, die die Hue Bridge 2 wird zwar nicht über UPnP ansprechbar gefunden.

** Yamaha: ** Verwendet eine auf dem UPnP Standard basierende API, die allein ein persönliches Datenformat verwendet. Wird wird das vom UPnP Adapter nicht versucht.

** Sony: ** Verwendet eine ScalarWebApi genannte Schnittstelle sterben über UPnP ansprechbar ist ein ein persönliches Datenformat verwendet. Wird wird das vom UPnP Adapter nicht versucht.

** Amazon Kindle: ** Stellt einen UPnP-Dienst bereit, stattdessen wird keiner UPnP-Dienstbeschreibung gehört und kann sein, was nicht gehört wird.

## Englische Beschreibung
*** Übersetzung von https://www.deepl.com/translator***

### Verwendungszweck
Dient zur Kommunikation und Interaktion mit allen UPnP-fähigen Geräten.

#### Was ist UPnP?
UPnP = Universal Plug and Play. Der Versuch, die Kommunikation zwischen Geräten im Netzwerk zu standardisieren. Zu diesem Zweck gibt es sogenannte "Schemas", die in Form einer XML-Datei angezeigt werden. Sie enthalten alle Informationen über das Gerät oder die Software und die von ihnen bereitgestellten Dienste. Um sicherzustellen, dass diese Dienste auch verwendet werden können, wird eine Beschreibung jedes Dienstes bereitgestellt. Diese Beschreibung folgt dem für den Dienst definierten Schema, sodass Informationen und Befehle schnell ausgetauscht werden können, ohne zu wissen, um welches Modell oder welchen Hersteller es sich bei dem Gerät oder der Software handelt. In der Vergangenheit wurde diese Standardisierung hauptsächlich für Mediengeräte und Software verwendet. Seit einiger Zeit werden auch Anstrengungen unternommen, um die Kommunikation des "IoT - Internet der Dinge" mit dieser Standardisierung zu standardisieren. Zu diesem Zweck wurde 2016 die "Open Connectivity Foundation" gegründet, die die Aufgaben des UPnP-Forums übernimmt, das die Zertifizierung von UPnP-fähigen Geräten durchgeführt und Standards geschaffen hat.

#### Funktionsbeschreibung
Der Adapter sendet und wertet die Antworten beim ersten Start aus. Die Antworten enthalten den Link zu den XML-Dateien der Dienste. Die XML-Dateien werden verwendet, um die Objekte in ioBroker zu erstellen und sie mit allen verfügbaren Informationen zu füllen.

Zeitverzögert wird ein Dienst gestartet, der auf Nachrichten von Geräten / Diensten wartet, die sich anmelden oder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, sodass ioBroker automatisch über Änderungen (gesendet) am Gerät / Dienst benachrichtigt wird.

#### Objektstruktur
Jedes Gerät oder jede Software, die auf die Übertragung reagiert, wird als separates Objekt erstellt. Unter diesem Objekt finden Sie alle verfügbaren Dienste mit ihren Funktionen. Die Möglichkeiten sind in 3 Kategorien unterteilt (Rolle / Rolle): Indikator. Zustand, Aktion und Argument.

** state - ** ist eine Variable, die den aktuellen Status eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder Indikatorstatus hat einen bestimmten Typ wie Zahl, Zeichenfolge, Boolescher Wert, ..... Außerdem wird genau angegeben, welchen Wert oder Wertebereich der Inidcator hat. Zustand haben können, werden diese Details im "native" eines Objekts gespeichert. Zuvor implementierte native:

- sendEvents = Bedeutung bisher unbekannt.
- allowValues = Zeichenfolgen, die akzeptiert werden.
- Minimum = Gibt den niedrigsten Wert an, bei dem der Wert akzeptiert wird.
- Maximum = Gibt den höchsten Wert an, zu dem die Annahme erfolgt.
- step = Gibt an, in welchen Schritten ein Wert geändert werden kann.

** button - ** "reuqest" ist ein Befehl, der an das Gerät / den Dienst gesendet und von diesem akzeptiert werden kann. Dieses Objekt hat normalerweise ein Unterobjekt, das Argument.

** Argument - ** ist ein Unterobjekt einer Aktion. Der Typ ist "gemischt", da er nicht angegeben ist. Die Eingeborenen des Objekts enthalten unterschiedliche Informationen. Sie können von Argument zu Argument unterschiedlich sein. Bisher bekannte Eingeborene:

- direction = Gibt die Richtung an, in der der Informationsfluss stattfindet. In "bedeutet, dass kein Wert zurückgegeben wird. Out" bedeutet, dass ein Wert zurückgegeben wird.
- relatedStateVariable = Gibt den Indikator zurück. Staat, für den der Datenaustausch zuständig ist.
- argumentNumber = Gibt die Anzahl der Argumente der Aktion zurück.

### Allgemeine Objekte
Die folgenden Objekte werden für jedes Gerät / jeden Dienst gefunden und sind für die Verwaltung erforderlich. Sie sind nicht Teil des UPnP-Standards oder der Geräte- / Bedienungsanleitung des jeweiligen Geräts.

** Lebendig - ** vom Gerät / Dienst auf "true" und vom Adapter nach x Sekunden auf "null" gesetzt, wenn das Gerät / der Dienst es nicht erneut auf "true" setzt. Die Ablaufzeit hängt von der maximalen Lebensdauer des vom Gerät ausgegebenen Alive-Signals ab. Wenn sich ein Gerät abmeldet, wird der Status auf "false" gesetzt. Es ist möglich, dieses Objekt per Hand oder Skript auf "true" zu setzen. Dies sollte jedoch nur erfolgen, wenn Sie sicher sind, dass das Gerät / der Dienst erreichbar ist. Wenn Alive manuell auf "true" gesetzt wurde, sollte es auch manuell auf "false" gesetzt werden, wenn dies nicht mehr erforderlich ist. Andernfalls können Fehler auftreten.

** Sid - ** Dient als Identifikation des Abonnements. Diese Seite wird vom Host jedes Mal erstellt, wenn ein Abonnement von einem Client angefordert wird. Die Sid wird nach einer vom Host festgelegten Zeit ausgeführt, sodass sie immer wieder aktualisiert wird. Es gilt nur für einen bestimmten Dienst.

### UPnP-Objekte
Die hier aufgeführten Objekte finden Sie im UPnP-Standard und / oder in den Geräte- / Dinest-Beschreibungen. Dies ist keine vollständige Liste aller Objekte. Diese Auswahl von Objekten repräsentiert nur häufig vorkommende Objekte.

** (A_ARG_TYPE_) InstanceID - ** Die instanceID ist die häufigste und wird benötigt, da sie die Instanz eines zu adressierenden Dienstes angibt. In den meisten Fällen ist die Instanz-ID = 0. Diese ID wird mit jeder Ereignismeldung von einem Dienst und jedem Befehl, der an einen Dienst gesendet wird, übergeben.

** (A_ARG_TYPE_) Kanal (*) - ** Das Kanalobjekt ist Audio- / Videodiensten zugeordnet. Beispielsweise muss ein Kanal angegeben werden, wenn Sie die Lautstärke ändern möchten. Mögliche Werte können beispielsweise "Master", "LF" oder "RF" sein. In diesem Beispiel steht "Master" für die allgemeine Lautstärke, "LF" für die linke Vorderseite und "RF" für die rechte Vorderseite. Wenn Sie die Lautstärke nur auf der rechten Vorderseite ändern möchten, müssen Sie im Kanal "RF" angeben.

** (Set / Get) Volume (*) - ** Das Volume-Objekt ist Audio- / Videodiensten zugeordnet. Je nachdem, wo es auftritt, wird es verwendet, um die Lautstärke anzuzeigen oder die Lautstärke anzupassen. Dieses Objekt hat immer einen minimalen und einen maximalen Wert, die angegeben werden können. In den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittgröße beträgt normalerweise 1, was bedeutet, dass nur gerade Zahlen eingegeben werden können.

### Steuerung
** button - ** Die Aktion "request" ist ein Befehl, der an das Gerät / den Dienst gesendet werden kann. Jede Aktion enthält auch Argumente, die als obligatorisch angegeben werden müssen. Aktionen können an ihrer Rolle / Rolle erkannt werden, die "Aktion" sagt. Wenn Sie die Aktion mit "Senden" beschreiben, wird der Befehl an das Gerät / den Dienst gesendet.

** state.argument.x - ** Obligatorisch für eine Aktion, wenn die Rolle "state.argument.in" ist. Mögliche Werte, die angegeben werden können / müssen, finden Sie in der "Related State Variable". Der Name dieser "Related State Variable" wird im Objekt unter "native" -> "relatedStateVariable" gespeichert. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, dafür gibt es "native" -> Argument_No. Ein Argument kann an seiner Rolle / Rolle erkannt werden, in der "Argument" steht. Einige Zeichenfolgen müssen mit einem "" "" im Datenpunkt geschrieben werden. Es ist nicht möglich, diese Frage pauschal zu beantworten, aber bei komplexen Zeichenfolgen wie URLs kann dies der Fall sein. Es hilft nur, es auszuprobieren. Wenn Sie ein "in einem Argument" übergeben möchten, müssen Sie "" verwenden.

** (verwandter Zustand) Variable - ** Dies sind Variablen, die für den Datenaustausch verwendet werden. In den Native der Variablen gibt es einige Informationen:

- allowValues = gibt Auskunft über den möglichen Inhalt der Variablen oder darüber, was als Argument mit einer Aktion gesendet werden kann.
- Minimum = der niedrigste Wert, den die Variable enthalten oder als Argument mit einer Aktion gesendet werden kann.
- Maximum = der höchste Wert, den die Variable enthalten oder als Argument mit einer Aktion gesendet werden kann.
- step = gibt an, in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind "Ja" oder "Nein". Es ist jedoch völlig unklar, was das bedeutet. Die Annahme, dass die Werte für diese Variable nur dann automatisch von einem Gerät / Dienst gesendet werden, wenn bei sendEvents "yes" gesetzt ist, wurde nicht bestätigt.

Beispiel für die Abfrage der Werte:

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

** Phillips Hue Bridge 2: ** Die Implementierung des UPnP-Standards in Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 gefunden wird, aber über UPnP nicht zugänglich ist.

** Yamaha: ** Verwendet eine API, die auf dem UPnP-Standard basiert, jedoch ein eigenes Datenformat verwendet. Derzeit wird dies vom UPnP-Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi-Schnittstelle namens UPnP adressierbar, verwendet jedoch ein eigenes Datenformat. Derzeit wird dies vom UPnP-Adapter nicht unterstützt.

** Amazon Kindle: ** Bietet einen UPnP-Dienst, es wird jedoch keine Beschreibung des UPnP-Dienstes bereitgestellt und kann daher nicht verwendet werden.

## Changelog

### 1.0.16 (2020-04-27)
* fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
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

Copyright (c) 2016-2020 Jey Cee <jey-cee@live.com>

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