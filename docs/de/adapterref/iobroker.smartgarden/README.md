---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: yRQ1kH5yZ+LlZk7k2uqFylv98qOlrWYFKz/AXPuTjfE=
---
![Logo](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Eingerichtet](http://iobroker.live/badges/smartgarden-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Build-Status](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![Stabil](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## IoBroker Smartgarden Adapter für GARDENA Smart System
Ein Adapter für das GARDENA Smart System unter Verwendung der offiziellen [GARDENA Smart System API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) und des Dienstes.

Der Adapter ermöglicht die Entwicklung einer Anwendung (z. B. mit VIS), die parallel zur offiziellen GARDENA-App verwendet werden kann. Der Adapter und seine zusätzlichen Funktionen wirken sich nicht auf die Grundfunktionen der GARDENA-App aus und umgekehrt.

Der Adapter ist kein vollständiger Ersatz für die GARDENA-App, sondern eine Ergänzung zur Integration der GARDENA-Geräte in ein Smart Home mit ioBroker.
Die wichtigsten Aktionen können mit dem Adapter ausgeführt werden. Es bietet auch die Möglichkeit, eigene Ideen umzusetzen, die mit der GARDENA-App nicht möglich sind.

## Unterstützte Geräte
  - GARDENA smart SILENO Roboter-Rasenmäher
  - GARDENA Smart Irrigation Control
  - GARDENA Smart Druckpumpe
  - GARDENA Smart Water Control
  - GARDENA Smart Netzteil
  - GARDENA Smart Sensor

Weitere Informationen zu den Geräten finden Sie unter [GARDENA Deutsche Website](https://www.gardena.com/de/produkte/smart/smartsystem/) und [hier auf Englisch](https://www.gardena.com/uk/products/smart/smart-system/).

## Bedarf
Um diesen Adapter zu verwenden, benötigen Sie zwei Dinge:

1. ein GARDENA Smart System-Konto
1. einen GARDENA-Anwendungsschlüssel

Um beide Dinge zu erhalten, gehen Sie bitte zu [https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/](https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/).

![Getting_application_key](../../../en/adapterref/iobroker.smartgarden/getting_application_key.jpg)

**Hinweis:**

  - Wenn Sie bereits einen Husqvarna Automower® Connect oder einen haben

GARDENA Smart System-Konto, Sie können sich mit diesem Konto anmelden und mit Schritt 2, Anwendung erstellen fortfahren, um den Anwendungsschlüssel zu erhalten.

	---

*** Und es ist fast sicher, dass Sie ein Konto haben. ** Bitte verwenden Sie dasselbe Konto wie für die GARDENA-App, in der Ihre GARDENA-Geräte registriert sind. Andernfalls erhalten Sie keinen Zugriff auf Ihre Geräte. *

	---

  - Stellen Sie sicher, dass Sie die Anwendung (ab Schritt 2) mit den APIs verbunden haben
  - Authentifizierungs-API ***und***
- GARDENA Smart System API.

Und natürlich benötigen Sie eine laufende ioBroker-Installation und sollten mindestens einen [GARDENA Smart Device](#supported-devices) besitzen.

## Inhaltsverzeichnis
  * [ioBroker Smartgarden-Adapter für GARDENA Smart System] (# iobroker-Smartgarden-Adapter für Gardena-Smart-System)
  * [Unterstützte Geräte] (# unterstützte Geräte)
  * [Anforderungen] (# Anforderungen)
  * [Inhaltsverzeichnis] (# Inhaltsverzeichnis)
  * [Installation] (# Installation)
  * [Setup-Adapter] (# Setup-Adapter)
  * [Unterstützung erhalten] (# Unterstützung erhalten)
  * [Datenpunkte des Adapters] (# Datenpunkte des Adapters)
     * [Allgemeine Informationen zu Datenpunkten] (# Allgemeine Informationen zu Datenpunkten)
     * [Für SERVICE_MOWER] (# for-service_mower)
     * [Für SERVICE_VALVE_SET] (# for-service_valve_set)
     * [Für SERVICE_VALVE] (# for-service_valve)
     * [Für SERVICE_POWER_SOCKET] (# for-service_power_socket)
     * [Für SERVICE_SENSOR] (# for-service_sensor)
     * [Für SERVICE_COMMON] (# for-service_common)
  * [Bewässerung beim Mähen nicht erlaubt] (# Bewässerung beim Mähen nicht erlaubt)
     * [Was ist das Problem?] (# Was ist das Problem)
* [Was wird getan?] (# Was wird getan)
* [Grundverhalten - WARNUNG] (# Grundverhalten ---- Warnung)
  * [Wünsche für Datenpunkte] (# Wünsche für Datenpunkte)
  * [Anmerkung] (# Anmerkung)
  * [Changelog] (# changelog)
     * [1.0.0] (# 100)
     * [0.6.0] (# 060)
     * [0.5.1] (# 051)
     * [0.5.0] (# 050)
     * [frühere Versionen] (# 042)
  * [Credits] (# Credits)
  * [Lizenz] (# Lizenz)

## Installation
Adapter ist verfügbar

- um npm: Installation mit `npm install iobroker.smartgarden`
- bei GitHub unter https://github.com/jpgorganizer/ioBroker.smartgarden.

Eine Beschreibung zur Installation von GitHub finden Sie in [Hier](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren) (deutsche Sprache).

## Setup-Adapter
1. Installieren Sie den Adapter
2. Erstellen Sie eine Instanz des Adapters
3. Überprüfen und vervollständigen Sie die Instanzkonfiguration

  **Wenn Sie einen Wert dieser Einstellungen ändern, starten Sie bitte Ihren Adapter neu.**

3.1 Bearbeiten Sie den Benutzernamen, das Kennwort und den Anwendungsschlüssel in der Konfiguration der Hauptinstanz

      | Parameter | Beschreibung |
      | - | - |
      | Benutzername | Benutzername für GARDENA Smart System |
      | Passwort | entsprechendes Passwort |
      | API-Schlüssel | API-Schlüssel (Anwendungsschlüssel), z. unter [Bedarf](#requirements) |

Bitte beachten Sie, dass Kennwort und Anwendungsschlüssel im Adapter codiert und gespeichert sind und nur zur Authentifizierung beim GARDENA-Anwendungshost dekodiert werden.

3.2 Überprüfen Sie die Standardwerte für verschiedene Einstellungen und schalten Sie die Optionen in der Instanzkonfiguration ein / aus. Für die meisten Benutzer sind die Standardwerte in Ordnung.

      | Parameter | Beschreibung |
      | - | - |
   | Zustände vordefinieren | Definieren Sie alle Zustände der Gardena-API vorab, unabhängig davon, ob sie aktuell übertragen werden. ein- oder ausschalten; Wenn diese Option aktiviert ist, werden alle Status der GARDENA-Smart-System-API erstellt, unabhängig davon, ob sie derzeit vom GARDENA-Dienst übertragen werden oder nicht. Standard: Aus; *(neu in v0.4.0)* |
   | Prognose | Verwenden Sie die Prognose für die Ladezeit und die verbleibende Zeit des Mähers. Ein- / Ausschalten der prognostizierten Lade- und Mähzeit des Mähers; Standard: Aus; *(neu in v0.5.0)* |
   | Zyklen | Anzahl der MOWER-Verlaufszyklen; Sie können eine beliebige Zahl von 3 (Minimum) verwenden, aber 10 (Standard) scheint ein guter Wert zu sein. nur relevant, wenn die obige *'Prognose'* aktiviert ist; *(neu in v0.5.0)* |
   | Bewässerungsprüfung | Überprüfen Sie, ob beim Mähen eine Bewässerung zulässig ist. Ein-/ Ausschalten; Standard: Aus; *(neu in v0.6.0)* |

3.3 Überprüfen Sie die Standardwerte der Systemeinstellungen und schalten Sie die Optionen in der Instanzkonfiguration ein / aus. **Die meisten Benutzer müssen auf dieser Registerkarte nichts ändern.**

      | Parameter | Beschreibung |
      | - | - |
      | Loglevel | Loglevel: 0 = kein Protokoll, 1 = einige Protokolle, 2 = einige weitere Protokolle, 3 = alle Protokolle; Standard: 0 |
      | Ping-Frequenz | Häufigkeit für das Senden von Pings an Gardena Webservice (in Sekunden); Standard: 150 |
      | Auth-Faktor | Faktor für die Gültigkeit des Authentifizierungstokens; Standard: 1.001 |
      | Auth-URL | URL des Authentifizierungshosts; Standard: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev) |
      | Basis-URL | Webservice-Basis-URL; Standard: [https://api.smart.gardena.dev] (https://api.smart.gardena.dev) |
      | TestVar | Verwenden Sie die Testvariable zum Debuggen. Ein-/ Ausschalten; Standard: Aus |

## Unterstützung bekommen
Um Hilfe zu erhalten, lesen Sie diese README-Datei und die [FAQ](FAQ.md) sorgfältig durch. Wenn Sie weitere Unterstützung benötigen, treten Sie bitte den [ioBroker Forum Thread](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system) bei.

## Datenpunkte des Adapters
Der Adapter dient zur Überwachung und Steuerung von GARDENA Smart System-Geräten.
Hierfür gibt es einen `LOCATION` und einen oder mehrere `DEVICE`.
Für jeden `DEVICE` gibt es

  - ein `SERVICE_COMMON_ <id>` und
  - ein oder mehrere `SERVICE_ <servicelink_type> _ <id>`.

Wobei `<servicelink_type>` eine Typbeschreibung für das Gerät ist, z. B. MÄHER oder VENTIL, und `<id>` eine (codierte) GARDENA-Geräte-ID ist, die von der API verwendet wird.
Siehe Beschreibung für ServiceLink unter [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Die Steuerung / Überwachung für jedes Gerät ist über die in der folgenden Tabelle aufgeführten `SERVICE_<servicelink_type>` möglich. Die `SERVICE_COMMON` enthalten allgemeine Informationen zum Gerät.

  | Gerät | SERVICE_ <Servicelink-Typ> |
  | - | - |
  | smart SILENO Roboter Rasenmäher | SERVICE_MOWER und SERVICE_COMMON |
  | intelligente Bewässerungssteuerung | SERVICE_VALVE_SET, SERVICE_VALVE und SERVICE_COMMON |
  | intelligente Druckpumpe | SERVICE_VALVE und SERVICE_COMMON |
  | intelligente Wasserkontrolle | SERVICE_VALVE und SERVICE_COMMON |
  | intelligentes Netzteil | SERVICE_POWER_SOCKET und SERVICE_COMMON |
  | intelligenter Sensor | SERVICE_SENSOR und SERVICE_COMMON |

Wenn Sie weitere Informationen zu den Datenpunkten benötigen, lesen Sie bitte [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).
Dort finden Sie eine Beschreibung für jeden Datenpunkt; mit Ausnahme derjenigen, die als Datenpunkte des Adapters und nicht der GARDENA Smart System API gekennzeichnet sind.

Der Adapter erstellt eigene Datenpunkte für verschiedene Funktionen / Optionen, wenn die Funktion ausgewählt wird. Diese Datenpunkte werden nicht automatisch gelöscht, wenn die Funktion deaktiviert wird. Wenn Sie diese Datenpunkte nicht mehr benötigen, müssen sie von Hand gelöscht werden.

### Allgemeine Informationen zu Datenpunkten
Der Adapter ändert keine von der GARDENA Smart API übertragenen Werte.
Das einzige, was (ab Version 1.0.0) getan wird, ist die Überprüfung der Art der *Zeitstempel* und *Zahlen*

| auf | prüfen Beschreibung |
| - | - |
| Zeitstempel | Alle Zeitstempel sind in UTC angegeben. Wenn ein empfangener Zeitstempel kein gültiger Zeitstempel ist, wird stattdessen `01 Jan 1970 00:00:00Z` (Unix-Zeit Null) verwendet. Wenn Sie dieses Datum / diese Uhrzeit sehen, melden Sie sich bitte. |
| Zahlen | Wenn eine Zahl keine gültige Zahl ist, wird stattdessen "-1" verwendet. Wenn Sie diese Nummer sehen, melden Sie sich bitte. |

### Für SERVICE_MOWER
#### Controlling
Verwenden Sie zur Steuerung des Geräts den Datenpunkt

- `activity_control_i`

  *Dieser Datenpunkt wird vom Adapter generiert und ist aufgrund der GARDENA Smart System API nicht erforderlich.*

  Ändern Sie diesen Datenpunkt, um den Mäher zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf die geplante Dauer in

  Sekunden (bitte ein Vielfaches von 60 verwenden)

  - für den automatischen Betrieb die Zeichenfolge "START_DONT_OVERRIDE" setzen
  - um den aktuellen Betrieb abzubrechen und zur Nutzung der Ladestation zurückzukehren

  Zeichenfolge `PARK_UNTIL_NEXT_TASK`

  - Um den aktuellen Vorgang abzubrechen, kehren Sie zur Ladestation zurück und ignorieren Sie diese

  Zeitplan verwenden Zeichenfolge `PARK_UNTIL_FURTHER_NOTICE`

#### Überwachung
Alle anderen Datenpunkte dienen nur zur Überwachung und Information.

Spezielle Datenpunkte:

- `activity_mowing_i`

  *Dieser Datenpunkt wird vom Adapter generiert und ist aufgrund der GARDENA Smart System API nicht erforderlich.*

  Dieser Datenpunkt zeigt zwei verschiedene Zustände für den Mäher:

  - `true`: mähen oder
  - `false`: nicht mähen.

Dieser Datenpunkt kann für weitere Aktionen verwendet werden, bei denen es wichtig ist zu wissen, ob sich der Mäher sicher auf dem Rasen befindet oder nicht.

Abhängig vom Wert des Datenpunktes `activity_value` wird dieser Datenpunkt gesetzt.
Einzelheiten entnehmen Sie bitte der folgenden Tabelle.

  | `activity_value` | `activity_mowing_i` |
  | `OK_CHARGING` Der Mäher muss mähen, aber ein unzureichender Ladezustand hält ihn in der Ladestation. | false |
  | `PARKED_TIMER` Der Mäher wird gemäß Timer geparkt und startet zur konfigurierten Zeit erneut. | false |
  | `PARKED_PARK_SELECTED` Der Mäher ist bis auf weiteres geparkt. | false |
  | `PARKED_AUTOTIMER` Der Mäher überspringt das Mähen wegen unzureichender Grashöhe. | false |
  | `PAUSED` Der Mäher befindet sich in einem Wartezustand mit geschlossener Luke. | false |
  | `OK_CUTTING` Der Mäher schneidet im AUTO-Modus (Zeitplan). | wahr |
  | `OK_CUTTING_TIMER_OVERRIDDEN` Der Mäher schneidet außerhalb des Zeitplans. | wahr |
  | `OK_SEARCHING` Der Mäher sucht nach der Ladestation. | wahr |
  | `OK_LEAVING` Der Mäher verlässt die Ladestation. | wahr |
  | `NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | wahr |
  | `NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | wahr |
|   alle anderen Werte wahr |

- `batterieState_chargingTime_remain_i` *(unter SERVICE_COMMON ...)* und <br/>

`activity_mowingTime_remain_i` *(unter SERVICE_MOWER ...)*

  *Beide Datenpunkte werden vom Adapter generiert und sind aufgrund der GARDENA Smart System API nicht erforderlich.*

Diese Datenpunkte zeigen eine Vorhersage für die verbleibende Lade- und Mähzeit in Sekunden des Mähers.
Sie werden nur erstellt, wenn die Funktion in der Instanzkonfiguration ausgewählt ist.

Um einen Wert vorherzusagen, wird eine Historie der letzten Lade- und Mähzyklen in zwei Zuständen gespeichert: `info.saveMowingHistory` und `info.saveChargingHistory`.

Diese Funktion kann in der Konfiguration der Adapterinstanz zusammen mit der Anzahl der gespeicherten Lade- und Mähzyklen in der Historie ein- und ausgeschaltet werden.

Um diese Funktion in Betrieb zu nehmen, **stellen Sie bitte sicher, dass mindestens ein Zyklus von Mäh- und Ladeläufen fehlerfrei ist (z. B. nicht manuell unterbrochen oder Sensorsteuerung).** Es ist besser, wenn mindestens drei Läufe fehlerfrei ausgeführt werden.
Diese Funktion versucht, den Normalfall zu erkennen und geht zunächst davon aus, dass der nächste Prozess ein Normalfall ist. Wenn dies fehlerhaft ist, wird dieser fehlerhafte Lauf als normaler Fall angesehen und die Läufe, die dann normal durchlaufen werden, als Fehlerfall. Wenn während des Laufs ein Fehler auftritt, stoppen Sie bitte den Adapter, löschen Sie die beiden Datenpunkte und starten Sie erneut.

Weitere Informationen zu allgemeinen Prognosemechanismen finden Sie unter [PROGNOSE.md](FORECAST.md).

  **Anmerkungen:**

    1. Prognosewerte sind nur verfügbar, wenn mindestens einer vollständig ist

Der Lade- und Mähzyklus wird in der Historie gespeichert.

    2. Der Verlauf wird unter "info" gespeichert, damit der "LOCATION" benötigt wird

gelöscht werden, z. Im Falle eines zukünftigen Updates geht es nicht verloren.

    3. Wenn Sie Ihren Mäher vom GARDENA Smart System trennen und

Schließen Sie es erneut an, der Verlauf geht verloren, da Ihr Mäher eine neue ID im GARDENA Smart System erhält. Dies bedeutet, dass der Adapter den Mäher nicht als vorherigen Mäher erkennen kann - möglicherweise handelt es sich um einen zweiten.
In diesem Fall wird empfohlen, diese beiden Datenpunkte zu löschen und den Adapter neu zu starten, damit die vorherigen (jetzt alten) Verlaufssätze nicht ständig gelesen und geschrieben werden. Der Adapter beginnt dann mit dem Erstellen eines neuen Verlaufs.

4. Diese Funktion sollte für mehr als einen Mäher funktionieren, ist es aber

nicht getestet *(das kann ich nicht, weil ich nur einen Mäher habe)* Wenn Sie mehr als einen Mäher haben, testen und melden Sie bitte Fehler und melden Sie natürlich, ob er wie vorgesehen funktioniert. Vielen Dank im Voraus dafür.

- `lastErrorCode_value`

Bitte achten Sie besonders auf den Datenpunkt `lastErrorCode_value`.
Eine Beschreibung möglicher Werte finden Sie unter https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, siehe "MowerService - lastErrorCode".

### Für SERVICE_VALVE_SET
#### Controlling
Verwenden Sie zur Steuerung des Geräts den Datenpunkt

- `stop_all_valves_i`

  *Dieser Datenpunkt wird vom Adapter generiert und ist aufgrund der GARDENA Smart System API nicht erforderlich.*

  Ändern Sie diesen Datenpunkt, um alle Ventile zu stoppen.

  - Um alle Ventile sofort anzuhalten, verwenden Sie die Zeichenfolge `STOP_UNTIL_NEXT_TASK`

** Hinweis: ** Zeigen Sie den Wert dieses Datenpunkts in Ihrer Anwendung nicht an, da der Wert größtenteils undefiniert ist. Darüber hinaus kann dieser Datenpunkt nicht als Auslöser für Ihre eigenen Aktionen dienen, da er nach dem Auslösen des Befehls nur auf den Wert *null* gesetzt wird.

#### Überwachung
Alle anderen Datenpunkte dienen nur zur Überwachung und Information.

### Für SERVICE_VALVE
#### Controlling
Verwenden Sie zur Steuerung des Geräts den Datenpunkt

- `duration_value`

  Ändern Sie diesen Datenpunkt, um das Ventil zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

  (Bitte verwenden Sie ein Vielfaches von 60).

** Hinweis: ** Es gibt einige Einschränkungen für die zulässigen Werte.
Bitte melden Sie, wenn Sie andere Einschränkungen sehen.

    | Gerät | limit |
    | - | - |
|     GARDENA Smart Irrigation Control 3540 Sekunden (59 Minuten) |
    | GARDENA smart Pump | 36000 (10 Stunden) |
|     GARDENA Smart Water Control 36000 (10 Stunden) |

  - Um die aktuelle Bewässerung abzubrechen und mit dem Zeitplan fortzufahren, verwenden Sie eine Zeichenfolge

  `STOP_UNTIL_NEXT_TASK`

  - Um den automatischen Betrieb bis zur angegebenen Zeit zu überspringen, ist die aktuell aktiv

Der Vorgang kann abgebrochen werden oder nicht (abhängig vom Gerätemodell). Verwenden Sie die Zeichenfolge `PAUSE_<number_of_seconds>`, z. `PAUSE_86400` für 24 Stunden pausieren

  - Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge "UNPAUSE"

- `irrigationWhileMowing_allowed_i` und` irrigationWhileMowing_mowerDefinition_i`

  *Diese Datenpunkte werden vom Adapter generiert und sind aufgrund der GARDENA Smart System API nicht erforderlich.*

Diese Datenpunkte geben die Kontrolle über die Funktion *Bewässerung beim Mähen nicht zulässig* Sie werden nur erstellt, wenn die Funktion in der Instanzkonfiguration ausgewählt ist.
Eine Beschreibung dieser Funktion finden Sie in Kapitel [Bewässerung beim Mähen nicht erlaubt](#Irrigation-not-allowed-while-mowing).

#### Überwachung
Alle anderen Datenpunkte dienen nur zur Überwachung und Information.

Spezieller Datenpunkt:

- `duration_leftover_i`

  *Dieser Datenpunkt wird vom Adapter generiert und ist aufgrund der GARDENA Smart System API nicht erforderlich.*

Der Wert beschreibt die Anzahl der Minuten, bis das Ventil geschlossen ist und die Bewässerung stoppt.

    - Eine ganze Zahl, eine (`1`) oder mehr.
    - `null` wenn undefiniert

### Für SERVICE_POWER_SOCKET
#### Controlling
Verwenden Sie zur Steuerung des Geräts den Datenpunkt

- `duration_value`

  Ändern Sie diesen Datenpunkt, um die Steckdose zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

  (Bitte verwenden Sie ein Vielfaches von 60)

  - Um das Gerät für immer einzuschalten, verwenden Sie bitte die Zeichenfolge `START_OVERRIDE`.
  - Um das Gerät zu stoppen, verwenden Sie `STOP_UNTIL_NEXT_TASK`.
  - Um den automatischen Betrieb bis zur angegebenen Zeit zu überspringen. Der aktuell aktive Vorgang

wird NICHT storniert. Verwenden Sie die Zeichenfolge `PAUSE_<number_of_seconds>`, z. `PAUSE_86400` 24 Stunden pausieren (bitte ein Vielfaches von 60 verwenden)

  - Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge "UNPAUSE"

#### Überwachung
Alle anderen Datenpunkte dienen nur zur Überwachung und Information.

Spezieller Datenpunkt:

- `duration_leftover_i`

  *Dieser Datenpunkt wird vom Adapter generiert und ist aufgrund der GARDENA Smart System API nicht erforderlich.*

  Der Wert beschreibt die Anzahl der Minuten bis zum Ausschalten der Steckdose.

    - Eine ganze Zahl, eine (`1`) oder mehr.
    - `null` wenn undefiniert

### Für SERVICE_SENSOR
#### Controlling
Keine Steuerfunktionen verfügbar.

#### Überwachung
Alle Datenpunkte dienen nur zur Überwachung und Information.

### Für SERVICE_COMMON
Die `SERVICE_COMMON` enthalten allgemeine Informationen zum Gerät.
Die Beschreibung wird bei Bedarf in die Beschreibung anderer DIENSTLEISTUNGEN integriert.

## Bewässerung beim Mähen nicht erlaubt
### Was ist das Problem?
Wenn Sie sowohl einen Mäher als auch ein Bewässerungssystem mit Aufklappsprinklern haben, besteht die Gefahr, dass Ihr Mäher während der Bewässerung auf einen Aufklappsprinkler stößt und diesen beschädigt oder selbst beschädigt.

Um dies zu verhindern, sollte das Bewässerungssystem oder besser einzelne Ventile beim Mähen des Mähers ausgeschaltet werden.

### Was wird gemacht?
Mit dieser Funktion ist es möglich, die Bewässerung zu stoppen, wenn sich der Mäher auf dem Rasen befindet. Dies kann für jedes Ventil separat definiert werden.

Für jedes Ventil können ein oder mehrere Mäher definiert werden, für die das Ventil nicht geöffnet werden darf, während der Mäher mäht.
Grundsätzlich hat der Mäher Vorrang vor der Bewässerung, d. H. Wenn der Konflikt auftritt, dass der Mäher mäht und ein Ventil geöffnet ist, wird das Ventil geschlossen und eine entsprechende Warnung eingestellt.

Zusätzlich kann definiert werden, dass ein Ventil unabhängig von einem Mäher niemals öffnen darf. Z.B. kann verwendet werden, wenn ein Ventil oder das dahinterliegende Rohr beschädigt ist.

Die gesamte Prüfung kann in der Instanzkonfiguration mit Paraneter *Bewässerungsprüfung* ein- oder ausgeschaltet werden.

Für jeden `SERVICE_VALVE` stehen drei Datenpunkte zur Verfügung.
Sie werden zur Konfiguration und zum Melden von Warnungen verwendet.

  | Datenpunkt | beschreibbar | Beschreibung der Datenpunkte |
  | - | - | - |
  | `irrigationWhileMowing_allowed_i` | ja | auf `false` setzen, wenn überprüft werden soll, ob eine Bewässerung zulässig ist, während der Mäher auf dem Rasen mäht, andernfalls `true` |
  | `irrigationWhileMowing_warningCode_i` | nein | Der Warncode wird gesetzt, wenn das Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung festgelegt ist, werden Codes mit `+` (z. B. `STOPPED+UNKNOWN_MOWER`) verkettet |
  | `irrigationWhileMowing_warningCode_i` | nein | Der Warncode wird gesetzt, wenn das Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung festgelegt ist, werden Codes mit "+" verknüpft (z. B. "STOPPED + UNKNOWN_MOWER") |

* ***Mäher-ID-Format***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Sie können diese Mäher-ID von der Registerkarte Objekte von ioBroker kopieren (siehe roter Pfeil im folgenden Bild).

  ![Mäher ID](../../../en/adapterref/iobroker.smartgarden/mowerid.jpg)

* ***Warncodes*** </ br>

  | Warncode | Beschreibung |
  | - | - |
  | `NO_WARNING` | keine Warnung, Ventil geöffnet |
  | `STOPPED` | Ventil automatisch geschlossen, weil Mäher mäht |
  | `FORBIDDEN` | Ventil geschlossen, da im Datenpunkt `IRRIGATION_FORBIDDEN` der Sondercode §§SSSSS_1§§ gesetzt ist |
  | `FORBIDDEN` | Ventil geschlossen, da im Datenpunkt` irrigationWhileMowing_mowerDefinition_i` | der spezielle Code `IRRIGATION_FORBIDDEN` gesetzt ist |

Diese Funktion wird jedes Mal ausgeführt, wenn

- ein Ventil wird geöffnet oder
- Ein Mäher beginnt zu mähen

Es wird nicht ausgeführt, wenn Sie die Werte in den oben aufgeführten Datenpunkten ändern.
Das heißt: Wenn eine Konfliktsituation vorliegt und Sie `irrigationWhileMowing_allowed_i` von `true` in `false` ändern, wird der Konflikt nicht erkannt und der Konflikt wird fortgesetzt. Das gleiche Verhalten gilt für eine Änderung von `irrigationWhileMowing_mowerDefinition_i`.

### Grundlegendes Verhalten - WARNUNG
Diese Funktion kann nicht verhindern, dass sich ein Ventil öffnet, während der Mäher mäht. Dies kann z.B. manuell über die GARDENA App oder automatisch über einen Zeitplan.

Diese Funktion kann das Ventil im Konfliktfall nur so schnell wie möglich schließen. Und ein Konflikt kann auch nicht erkannt werden.
So kann es passieren, dass Wasser durchgelassen wird.
**Z.B. Es kann nicht verhindert werden, dass sich die Aufklappsprinkler ausfahren und der Mäher auf die Aufklappsprinkler **trifft, aber die Wahrscheinlichkeit, dass dies geschieht, wurde minimiert.
** Es liegt also an Ihrer Bewerbung, sicherzustellen, dass dieser Konflikt niemals auftritt.**

## Wünsche für Datenpunkte
Dieser Adapter meldet **jeden Wert** als Datenpunkt, der über die GARDENA Smart System API bereitgestellt wird. Wenn jemand mehr Werte möchte, wenden Sie sich bitte an GARDENA und teilen Sie ihm mit, dass dieser Wert auch in der API enthalten sein wird. Gehen Sie dazu in der Fußzeile auf [GARDENA Entwicklerportal](https://developer.husqvarnagroup.cloud) zu ***Kontaktieren Sie uns und hinterlassen Sie Feedback*** .

## Hinweis
Dies ist ein privates Projekt. Ich bin nicht mit GARDENA oder Husqvarna verbunden.

## Credits
smartgarden logo: http://www.freepik.com Entworfen von Freepik

## Changelog
### 1.0.0
* (jpgorganizer)
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser.
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer) 
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 
  - Dependency get's resolved now
  
### 0.4.0
* (jpgorganizer) 
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1
* (jpgorganizer) initial release

## License

Copyright (c) 2020 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2157 $ $Date: 2020-06-11 19:24:52 +0200 (Do, 11 Jun 2020) $ --->