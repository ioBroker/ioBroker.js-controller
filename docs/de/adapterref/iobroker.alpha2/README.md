---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: s+MSHp+45KY+zq2sC5OI4+Ed4K/7PvZ2HcLVGQsK0YI=
---
![Logo](../../../en/adapterref/iobroker.alpha2/admin/mh-logo-schrift.png)

![Anzahl der Installationen](http://iobroker.live/badges/alpha2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alpha2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.alpha2.png?downloads=true)

# IoBroker.alpha2
Mit diesem Adapter können Sie Werte des Heizungsreglers von Mühlenhoff Alpha2 abrufen und einstellen.
Der Adapter verwendet die XML-API des Alpha2. Wenn Sie mehr als einen Alpha2-Controller verwenden, müssen Sie eine zweite Instanz des Adapters installieren.

## Installation
- Installieren Sie den Adapter
- Geben Sie Ihre IP-Adresse oder den Hostnamen des Alpha2-Controllers ein
- Füllen Sie das Abrufintervall aus, um Zustände zu erhalten

## Verwendungszweck
Sie können die folgenden Objekte ändern in:

- Für jede HEATAREA (max. 8 Bereiche)

| Beschreibung | Objekt | Werte |
|---------------------|-----------------|---------------------------|
| Zieltemperatur | T_TARGET | Temp. in Grad Celsius |
| Zieltemp. Tag | T_HEAT_DAY | Temp. in Grad Celsius |
| Zieltemp. Nacht | T_HEAT_NIGHT | Temp. in Grad Celsius |
| Modus von HeatArea | HEATAREA_MODE | 0 = Auto, 1 = Tag, 2 = Nacht |
| Programm Wochentage | PROGRAM_WEEK | Programm Nr. 0-3 |
| Programmwochenende | PROGRAM_WEEKEND | Programm Nr. 0-3 |

- Für jedes PROGRAMM mit max. 4 Schichten für jedes Programm.
- Die Schritte der Minuten sind 15. Nur zulässig 00,15,30,45
- Stunden im 24 Stil

| Beschreibung | Objekt | Werte |
|---------------------|-----------------|-------------------------------|
| Startzeit | START | Uhrzeit des Programmstarts [hh: mm] |
| Endzeit | ENDE | Zeitpunkt des Programmendes [hh: mm] |

- Für die Ferien

| Beschreibung | Objekt | Werte |
|-----------------------|---------------------|--------------------------|
| Urlaub beginnen | VACATION.START_DATE | [JJJJ-MM-TT] |
| Ende des Urlaubs | VACATION.END_DATE | [JJJJ-MM-TT] |
| Temp. während des Urlaubs | T_HEAT_VACATION | Temp. in Grad Celsius |

- Alle anderen Objekte sind schreibgeschützt

## Beispiele
### Stellen Sie die Temperatur von Raum1 ein
Um die Zieltemperatur einzustellen (gilt nur für den nächsten Programmstart oder -ende), setzen Sie das Objekt T_TARGET im entsprechenden Heatarea.
Der Adapter verwendet die XML-API, um den Wert im Wärmebereich festzulegen.

Urlaub einstellen
Achten Sie beim Festlegen des Urlaubs darauf, dass Sie die Urlaubszielzeit mit dem Objekt T_HEAT_VACATION definiert haben. Sie finden dieses Objekt in GERÄT.
Danach legen Sie die beiden Objekte VACATION.START_DATE und VACATION.END_DATE fest. Wenn Sie die Urlaubseinstellungen deaktivieren, setzen Sie beide Objekte mit Datumsangaben vor heute.
Sie können das Objekt VACATION.STATE überprüfen, um den Status zu überprüfen. Wenn der Status wahr ist, ist der Urlaub aktiv.

## Bekannte Einschränkungen
- keine virtuellen Räume
- max. 8 Wärmebereiche (es gibt Alpha2-Basisstationen mit 12 Wärmebereichen)
- keine Verriegelung der Raumregler (Kindermodus)

## Changelog

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)