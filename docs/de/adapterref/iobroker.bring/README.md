---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: /Wjo9AQ70gH4PJhPIemLunXGyFwECi5//bKRPvuagFg=
---
![Logo](../../../en/adapterref/iobroker.bring/admin/bring.png)

![Build Status Travis](https://travis-ci.org/foxriver76/ioBroker.bring.svg?branch=master)
![Build-Status](https://ci.appveyor.com/api/projects/status/r7whpsbjfqn18toe/branch/master?svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/bring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.bring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bring.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/foxriver76/ioBroker.bring.svg)
![NPM](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# IoBroker.bring
===========================

## Zustände
Eine Beschreibung der erstellten Zustände finden Sie unten.

### Kanal: info
* info.connection

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R |

   *Nur-Lese-Boolean-Indikator. Wenn Ihr Broker bei bring angemeldet ist, ist der Status true, andernfalls false.*

* info.user

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   *Nur lesbare Zeichenfolge. Enthält den Namen des angemeldeten Benutzers.*

### Einkaufslisten
Für jede Einkaufsliste wird ein Kanal mit folgenden Status erstellt:

* *list* .content / *list* .contentHtml / NoHead

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

*Schreibgeschützter JSON / HTML-String, der als Liste oder HTML-Tabelle formatiert ist. Enthält die Artikel, die sich aktuell auf Ihrer Einkaufsliste befinden.
Die NoHead-HTML-Tabellen enthalten keine Tabellenüberschriften.*

* *list* .recentContent / *list* .recentContentHtml / NoHead

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

*Schreibgeschützter JSON / HTML-String, der als Liste oder HTML-Tabelle formatiert ist. Enthält die Artikel, die kürzlich auf Ihrer Einkaufsliste standen.
Die NoHead-HTML-Tabellen enthalten keine Tabellenüberschriften.*

* *list* .removeItem

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Wählen Sie einen Artikel aus, der aus der Einkaufsliste und der Liste der zuletzt verwendeten Inhalte entfernt werden soll.
Der Status wird bestätigt, wenn der Befehl vom Bring! API.*

* *list* .moveToRecentContent

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Wählen Sie ein Element aus, das verschoben oder zur Liste der zuletzt verwendeten Inhalte hinzugefügt werden soll.
Der Status wird bestätigt, wenn der Befehl vom Bring! API.*

* *Liste* .saveItem

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Wählen Sie einen Artikel aus, der zur Einkaufsliste hinzugefügt werden soll. Sie können auch zusätzliche Informationen zu dem Element angeben, indem Sie den Status anhand des folgenden Schemas festlegen:*

```Apple, 2.50 $, the green ones```

*Beachten Sie, dass alles hinter dem Komma die Spezifikation beschreibt.
Der Status wird bestätigt, wenn der Befehl vom Bring! API.*

* *list* .users / *list* .usersHtml / NoHead

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

*Schreibgeschützter JSON / HTML-String, der als Liste oder HTML-Tabelle formatiert ist. Enthält die Benutzer, die Teil der Einkaufsliste sind, sowie ihre E-Mail-Adresse.
Die NoHead-HTML-Tabellen enthalten keine Tabellenüberschriften.*

* *Liste* .count

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | number | R |

   *Schreibgeschützte Nummer, die die Anzahl der enthaltenen Elemente der Liste darstellt.*

* *list* .messageTrigger

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Taste | R / W |

*Wenn Sie diese Schaltfläche drücken, wird die Einkaufsliste an die konfigurierten Instanzen gesendet, z. G. Pushover, Telegramm oder / und E-Mail.*

* *list* .enumSentence

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

*Read only string, der eine Aufzählung der Artikel der Einkaufsliste in sprechbarer Form enthält.
Dies kann z. G. für die Sprachausgabe über intelligente Assistenten.*

* *Liste* Übersetzung

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

    *Read only json string, der ein Wörterbuch enthält, um die Schweizer Artikelnamen in die Listensprache zu übersetzen.*

## Changelog
### 1.6.1 (2019-07-13)
* (foxriver76) fixed bug, that prevent html states and other from being set

### 1.6.0 (2019-07-12)
* (foxriver76) get translations according to list language
* (foxriver76) translations will be stored in datapoint
* (foxriver76) use bring-node-api at least 1.2.1
* (foxriver76) widget now uses configured language
* (foxriver76) bugfixes and optimizations in front- and backend

### 1.4.0 (2019-06-07)
* (foxriver76) use textFit to fit text to one line in widget
* (foxriver76) internal reworks on widget

### 1.3.4
* (foxriver76) add possibility to use this widget multiple times on same page

### 1.3.3
* (foxriver76) also change height and div sizes according to users specification
* (foxriver76) when item is on recent list and added by text input it is now instantly removed from recent list

### 1.3.2
* (foxriver76) enable configuration of width for items in widget

### 1.3.1
* (foxriver76) api module outsourced

### 1.3.0
* (foxriver76) added widget
* (foxriver76) add possibility to move items to recentContent

### 1.2.1
* (foxriver76) uri encode login request because it can contain special character

### 1.2.0
* (foxriver76) added state which contains a speakable enumeration of each shopping list

### 1.1.0
* (foxriver76) add possibility to send messages
* (foxriver76) respect in app list renaming / recreate channel on name change

### 1.0.0
* (foxriver76) stable release
   
### 0.0.10
* (foxriver76) set info.connection state to false, when cannot get data
   
### 0.0.9
* (foxriver76) also update no head states on normal polling
* (foxriver76) fix bug where polling could grow exponentially
* (foxriver76) fix unhandled error when no internet connection

### 0.0.8
* (foxriver76) add html states w/o header
* (foxriver76) minor fixes
   
### 0.0.7
* (foxriver76) fixed a potential memory leak by setTimeout functions

### 0.0.6
* (foxriver76) add equivalent html states for json states
* (foxriver76) add counter for every list

### 0.0.4
* (foxriver76) fix when login fails

### 0.0.3
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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