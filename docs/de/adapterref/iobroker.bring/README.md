---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: EG7xfJyq/qRZYg9VctTZlelxO4Q8EknXrX6ZY2CMseA=
---
![Logo](../../../en/adapterref/iobroker.bring/admin/bring.png)

![Build Status Travis](https://travis-ci.org/foxriver76/ioBroker.bring.svg?branch=master)
![Build-Status](https://ci.appveyor.com/api/projects/status/r7whpsbjfqn18toe/branch/master?svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/bring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.bring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bring.svg)
![NPM](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# IoBroker.bring ============================
[![Greenkeeper-Abzeichen] (https://badges.greenkeeper.io/foxriver76/ioBroker.bring.svg)](https://greenkeeper.io/)

## Zustände
Eine Beschreibung der erstellten Zustände finden Sie unten.

### Channel: info
* info.verbindung

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R |

   * Schreibgeschützter boolescher Indikator. Wenn Ihr Broker beim Bringen angemeldet ist, lautet der Status true, andernfalls false. *

* info.user

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   * Nur lesbare Zeichenfolge. Enthält den Namen des angemeldeten Benutzers. *

### Einkaufslisten
Für jede Einkaufsliste wird ein Kanal mit den folgenden Status erstellt:

* *list* .content / *list* .contentHtml / NoHead

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

* Nur lesbare json / html-Zeichenfolge, die als Liste oder HTML-Tabelle formatiert ist. Enthält die Artikel, die sich aktuell auf Ihrer Einkaufsliste befinden.
Die NoHead-Html-Tabellen haben keine Tabellenköpfe. *

* *list* .recentContent / *list* .recentContentHtml / NoHead

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

* Nur lesbare json / html-Zeichenfolge, die als Liste oder HTML-Tabelle formatiert ist. Enthält die Artikel, die sich kürzlich auf Ihrer Einkaufsliste befanden.
Die NoHead-Html-Tabellen haben keine Tabellenköpfe. *

* *liste* .removeItem

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Wählen Sie einen Artikel aus, der aus der Einkaufsliste und der Liste der letzten Inhalte entfernt werden soll.
Der Zustand wird bestätigt, wenn der Befehl von Bring! Bestätigt wird. API. *

* *liste* .moveToRecentContent

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Wählen Sie ein Element aus, das verschoben oder zur Liste der letzten Inhalte hinzugefügt werden soll.
Der Zustand wird bestätigt, wenn der Befehl von Bring! Bestätigt wird. API. *

* *liste* .saveItem

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Wählen Sie einen Artikel aus, der zur Einkaufsliste hinzugefügt werden soll. Sie können auch zusätzliche Informationen zum Element angeben, indem Sie den Status anhand des folgenden Schemas festlegen: *

```Apple, 2.50 $, the green ones```

* Beachten Sie, dass alles hinter dem Komma die Spezifikation beschreibt.
Der Zustand wird bestätigt, wenn der Befehl von Bring! Bestätigt wird. API. *

* *Liste* .users / *Liste* .usersHtml / NoHead

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

* Nur lesbare json / html-Zeichenfolge, die als Liste oder HTML-Tabelle formatiert ist. Enthält die Benutzer, die Teil der Einkaufsliste sind, sowie ihre E-Mail-Adresse.
Die NoHead-Html-Tabellen haben keine Tabellenköpfe. *

* *liste* .count

    Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R |

   * Nur-Lese-Nummer, die die Anzahl der enthaltenen Elemente der Liste darstellt. *

* *list* .messageTrigger

    Datentyp | Berechtigung |
    |:---:|:---:|
    Taste | R / W |

* Wenn Sie diese Taste drücken, wird die Einkaufsliste an die konfigurierten Instanzen gesendet, z. G. Pushover, Telegramm oder / und E-Mail. *

* *liste* .enumSentence

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

* Nur-Lese-Zeichenfolge, die eine Aufzählung der Einkaufslistenelemente in einer sprechbaren Form enthält.
Dies kann verwendet werden e. G. für die Sprachausgabe über intelligente Assistenten. *

## Changelog

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