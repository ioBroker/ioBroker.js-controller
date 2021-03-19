---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: Ew5C/WAqxQyCGVP/+828vB0zzLpiKzpAD/T+7SwXc8A=
---
![Logo](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Anzahl der Installationen](http://iobroker.live/badges/mielecloudservice-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![Travis-CI](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)

# IoBroker.MieleCloudService
## Beschreibung
Mit diesem Adapter können Sie Informationen zu allen Ihren Miele @ Home-Geräten von der offiziellen Miele-API eines Drittanbieters abrufen.
Unabhängig davon, ob sie direkt über Wi-Fi oder XGW3000 Gateway verbunden sind. Es implementiert die **Miele 3rd Party API V1.0.4**

## Voraussetzungen
* Miele @ Home User (Smartphone App)
* Miele @ Home Passwort (Smartphone App)
* Miele Client_id (von https://www.miele.com/developer/)
* Miele Client_secret (von https://www.miele.com/developer/)

## Installation
Gehen Sie zur Installation wie folgt vor:

1. Installieren Sie über Admin mit dem
 * Stable Repo - um die aktuelle stabile Version zu erhalten
 * aktuelles Repo - um die neueste Testversion zu erhalten (möglicherweise nicht stabil)
 * via: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - um die neueste Entwicklungsversion zu erhalten
2. Erstellen Sie in der Miele Smartphone App ein App-Konto für Miele @ Home
3. Erstellen Sie ein Entwicklerkonto unter https://www.miele.com/f/com/en/register_api.aspx
4. Fügen Sie Ihre Miele-Geräte zur App hinzu (falls nicht automatisch hinzugefügt)
6. Geben Sie client_secret und client_id ein, die Sie vom Miele-Entwicklerteam erhalten haben, sowie die Konto-ID und das Kennwort von der App.

## Steuern Ihrer Geräte
Alle derzeit unterstützten und dokumentierten Aktionen für alle Geräte sind implementiert (API V1.0.4).
> Bitte denken Sie daran, dass Aktionen nur funktionieren, wenn Sie Ihr Gerät in den entsprechenden Zustand versetzen (z. B. Mobile Control, PowerOn, ...).
Weitere Informationen zu Aktionen finden Sie in [Miele-Dokumentation](#documentation).

## Bekannte Probleme
* keiner

## Dokumentation
Bitte beziehen Sie sich hauptsächlich auf die von Miele veröffentlichte API-Hauptdokumentation

* [Allgemeine Dokumentation] (https://www.miele.com/developer/swagger-ui/index.html)
* [Voraussetzungen für die Ausführung einer Aktion auf einem Gerät] (https://www.miele.com/developer/swagger-ui/put_additional_info.html)

Es gibt einige Datenpunkte in zwei Arten. Als lesbarer Text und als Zahl.
Diese numerischen Datenfelder, die zu einem Textfeld gehören, haben denselben Namen, aber ein "_raw" wird angehängt.
Die Felder, die eine allgemeine Bedeutung haben, sind unten aufgeführt.
Die Felder, die nicht aufgeführt sind, unterscheiden sich in ihrer Bedeutung von Gerät zu Gerät und werden von Miele nicht dokumentiert.
Wenn Sie in Skripten auf diese Felder verweisen müssen, verwenden Sie immer die _raw-Werte.
Die Textwerte können sich in Zukunft ändern und hängen auch von der Sprache ab.
Hier ist eine Liste, wofür diese Rohwerte stehen:

### Gerätetypen
 | Rohwert | Staat |
 |----------|-------|
 | 1 | WASCHMASCHINE |
 | 2 | TUMBLE DRYER |
 | 7 | SPÜLMASCHINE |
 | 8 | SPÜLMASCHINE SEMI-PROF |
 | 12 | OFEN |
 | 13 | OFEN MIKROWELLE |
 | 14 | HOB HIGHLIGHT |
 | 15 | DAMPFOFEN |
 | 16 | MIKROWELLE |
 | 17 | KAFFEESYSTEM |
 | 18 | HAUBE |
 | 19 | KÜHLSCHRANK |
 | 20 | Gefrierschrank |
 | 21 | KÜHL- / GEFRIERKOMBINATION |
 | 23 | VAKUUMREINIGER, AUTOMATISCHER ROBOTER VAKUUMREINIGER |
 | 24 | SCHEIBETROCKNER |
 | 25 | DISH WARMER |
 | 27 | HOB INDUKTION |
 | 28 | HOB GAS |
 | 31 | DAMPFOFENKOMBINATION |
 | 32 | WEINKABINETTE |
 | 33 | WEINKONDITIONIERUNGSEINHEIT |
 | 34 | WEINLAGERUNGSKONDITIONIERUNGSEINHEIT |
 | 39 | DOPPELTER OFEN |
 | 40 | DOPPELDAMPFOFEN |
 | 41 | DOPPELDAMPFOFENKOMBINATION |
 | 42 | DOPPELTE MIKROWELLE |
 | 43 | DOPPELTER MIKROWELLENOFEN |
 | 45 | DAMPFOFEN MIKROWELLENKOMBINATION |
 | 48 | VAKUUMSCHUBLADE |
 | 67 | DIALOGOVEN |
 | 68 | WEINKABINETTEN-GEFRIERKOMBINATION |

### Status / Status
 | Rohwert | Staat |
 |----------|-------|
| 1 | AUS |
 | 2 | STAND_BY |
 | 3 | PROGRAMMIERT |
 | 4 | PROGRAMMED_WAITING_TO_START |
 | 5 | LAUFEN |
 | 6 | PAUSE |
 | 7 | END_PROGRAMMED |
 | 8 | FEHLER |
 | 9 | PROGRAMME_INTERRUPTED |
 | 10 | LEERLAUF |
 | 11 | RINSE_HOLD |
 | 12 | SERVICE |
 | 13 | SUPERFREEZING |
 | 14 | SUPERCOOLING |
 | 15 | ÜBERHITZUNG |
 | 144 | STANDARD |
 | 145 | GESPERRT |
 | 146 | SUPERCOOLING_SUPERFREEZING |
 | 255 | Gerät offline |

### ProgramType / Programmart
| Rohwert | Staat |
|----------|-------|
| 0 | Normaler Betriebsmodus |
| 1 | Eigenes Programm |
| 2 | Automatisches Programm |
| 3 | Reinigungs- / Pflegeprogramm |

### Trocknungsschritt / Trockenstufe
 | Rohwert | Staat |
 |----------|-------|
 | 0 | Extra trocken |
 | 1 | Normal Plus |
 | 2 | Normal |
 | 3 | Leicht trocken |
 | 4 | Handeisen Stufe 1 |
 | 5 | Handeisen Stufe 2 |
 | 6 | Maschineneisen |

### ProgramBezeichnung
| Rohwert | Staat | verfügbar für |
|----------|-------|---------------|
| 1 | "Baumwolle" / "Baumwolle" | Waschmaschine |
| 23 | "Oberhemden" / | Waschmaschine |
| 27 | "Imprägnieren" / | Waschmaschine |
| 48 | "Flusen ausspülen" | Waschtrockner |
| 50 | "Dunkle Wäsche" / | Waschtrockner |
| 122 | "Express 20" / | Waschtrockner |
| 123 | "Dunkles / Jeans" | Waschmaschine |

### ProgramPhase
| Rohwert | Staat | verfügbar für |
|----------|-------|---------------|
| 260 | "Waschen" / "Waschen" | Waschmaschine |
| 261 | "Spülen" / "Spülen" | Waschmaschine |
| 266 | "Schleudern" / "Spinnen" | Waschmaschine |
| 267 | "Knitterschutz" / "" | Waschmaschine |
| 268 | "Ende" / "Ende" | Die meisten Geräte |
| 256 | "Vorbügeln" | Waschmaschine |
| 514 | "Trocknen" | Waschtrockner |
| 519 | "Abkühlen" | Waschtrockner |
| 532 | "Flusen ausspülen" | Waschtrockner |

## Urheberrechte ©
Copyright (c) 2019, 2020 grizzelbee <hanjo@hingsen.de>

## Changelog
### 4.0.0 (2021-03-18) (Symphony of life)
> ***Hint:*** The adapter received a complete code refactoring! This means that most of the code has been changed and some parts are working now differently than ever before. Update with care and read the change log!
*  (grizzelbee) New: FULL support of Miele cloud API v1.0.4
*  (grizzelbee) Upd: [83](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/83) estimatedEndTime isn't shown anymore after the device has finished
*  (grizzelbee) Upd: [85](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/85) full code refactoring and split into multiple files. 
*  (grizzelbee) Upd: [86](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/86) every folder and device now gets a nice little icon
*  (grizzelbee) Upd: [89](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/89) Washer dryers are fully supported now
*  (grizzelbee) Upd: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) implemented targetTemperature for fridges & freezers
*  (grizzelbee) Upd: Devices get fully created on startup and aren't modified afterwards - only updated
*  (grizzelbee) Upd: New folder ecoFeedback to group ecoFeedback states 
*  (grizzelbee) Upd: New folder IDENT to group ident states
*  (grizzelbee) Upd: Removed signalActionRequired - since there is no signalDoor for washing machines, dryers and dishwashers this approach doesn't work
*  (grizzelbee) Upd: All folders and states which are being created depend on the capabilities of their devices as described in [this Miele documentation](https://www.miele.com/developer/assets/API_V1.x.x_capabilities_by_device.pdf). So there shouldn't be useless states anymore caused by the generic Miele cloud API.

### 3.0.2 (2021-03-05)
*  (grizzelbee) Fix: [79](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/79) When a devices serial is missing, the identNumber is assigned instead.
*  (grizzelbee) Upd: Changed folder name cooktops to hobs since this is the more common name
*  (grizzelbee) Upd: added PowerOn/Off buttons for Coffee-systems & hoods
*  (grizzelbee) Upd: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) testing actions better before sending to permit errors

### 3.0.1 (2021-02-25)
> *Hint:* Action_Information and Action_Status objects are created on first action execution and contain infos to the last executed action.
> Please take care of notes regarding [Controlling your devices](#Controlling your devices).
*  (grizzelbee) Upd: Improved logging in some parts - objects get stringified.
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Actions are working again
*  (grizzelbee) Upd: Actions are tested before sending whether they are permitted in current device state
*  (grizzelbee) Upd: estimatedEndTime doesn't show seconds anymore
*  (grizzelbee) Upd: Improved documentation
*  (grizzelbee) Upd: removed unused function decrypt
*  (grizzelbee) Upd: removed superfluent parameters


### 3.0.0 (2021-02-18)
> Hint: ecoFeedback objects are created on the first run of the device. This allows to only create them, when they contain data.
*  (grizzelbee) New: BREAKING CHANGE: Making use of build-in password de-/encryption. This raises the need to re-enter your passwords again, because the old ones can't be decrypted anymore.
*  (grizzelbee) New: [70](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/70) Implements Miele API 1.0.4
*  (grizzelbee) New: [64](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/64) Introduces data point estimatedFinishingTime
*  (grizzelbee) New: [54](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/54) Poll interval can now freely be selected in seconds and minutes
*  (grizzelbee) Upd: [73](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/73) BREAKING CHANGE: Removed white-spaces from any ID in device tree. This creates completely new device trees. So please delete the old ones.
*  (grizzelbee) Upd: removed david-dm badge
*  (grizzelbee) Upd: updated dependencies
*  (grizzelbee) Fix: added passwords to encryptedNative
*  (grizzelbee) Fix: added passwords to protectedNative
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) added missing info.connection object to io-package
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) Fixed new Warnings introduced with js-controller 3.2
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Light-Actions should work now

### 2.0.3 (2020-09-15)
* (grizzelbee) Upd: Updated country list in config dialog
* (grizzelbee) New: Some more debug code

### 2.0.2 (2020-09-15)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on failed authentication preventing a valid error message

### 2.0.1 (2020-09-14)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on logout while invalidating token

### 2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some data points changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that data points with invalid values aren't created any longer, I recommend deleting all data points in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-data points are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens.
* (grizzelbee) Fix: Data points with invalid values (null/-32768) are no longer created.

### 1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### 1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling

### 1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com
* (grizzelbee) Fix: signalActionRequired should work better now
* (grizzelbee) Upd: Updated documentation
* (grizzelbee) Upd: Improved error handling in function APISendRequest
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### 1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumble dryers, washer dryer and dishwashers. **Doesn't work perfectly currently.**
* (grizzelbee) Upd: Updated Documentation
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### 1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios**
* (grizzelbee) Change: Made functions communicating with API asynchronous

### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices.
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control)
please refer to [Miele-Documentation](#documentation) for more Information on actions.

### 1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity
  to schedule with less than a minute in the future

### 1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### 1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions


### 1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### 1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting adapter into the Repo
* (grizzelbee) Passwords are stored encrypted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefore it's incompatible with prior versions and needs to be installed freshly.
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug
* (grizzelbee) Chg: removed Push-API checkbox (maybe introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for non-german Miele-Accounts (ALL should be included)
* (grizzelbee) Complete new layout of data points
* (grizzelbee) Device types are grouped now

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
  - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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