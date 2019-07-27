---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: sruIPG+JeXe62IdXZcmDN/1PDmjBL7OS7KZp/kXRnPA=
---
![Logo](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Anzahl der Installationen](http://iobroker.live/badges/alexa2-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![Build Status](https://travis-ci.org/Apollon77/ioBroker.alexa2.svg?branch=master)
![Build-Status](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)

# IoBroker.alexa2
Mit diesem Adapter können Sie Ihre Alexa-Geräte (Amazon Echo) fernsteuern.

Ein großes Dankeschön geht an soef für die gute Version 1 des Adapters und an Hauke und ruhr70 für Ideen in ihren Skripten aus dem ioBroker-Forum (insbesondere die Medienfortschritts-Updates)! Ein großes Dankeschön an meicker für die Unterstützung bei der Dokumentation all dessen und an zahlreiche Benutzer des ioBroker Forums für ihre Testunterstützung!

## Staaten und ihre Bedeutungen:
Im Adapter-Namespace (z. B. alexa2.0) werden einige Kanäle erstellt

### Alexa2.0
| Name des Staates | bedeutung |
| - | - |
| maßgeschneidert. * | Senden Sie Textbefehle an ein virtuelles Gerät, als würden Sie mit ihm sprechen |
| echo-geräte. * | Zustände pro Echo-Gerät, siehe unten |
| Geschichte. * | Infos zur Kommandogeschichte siehe unten |
| Smart-Home-Geräte. * | Zustände pro Smart-Home-Gerät und allgemein, siehe unten |
| info. * | Allgemeine Informationen zum Adapterstatus |
| requestResult | Fehlerinfo für TuneIn- und Smart-Home-Geräteanforderungen |

### Alexa2.0.Bespoken. *
Bespoken ist normalerweise ein Dienstleister, der beim automatischen Testen von Fähigkeiten hilft. Tatsächlich können Sie damit Befehle an "Ihr" Alexa / Amazon-Konto senden. Damit können Sie Skillaktionen auslösen, auf die normalerweise nicht über die Alexa App zugegriffen werden kann. Aufgrund der Funktionsweise sind nur Befehle möglich, die nicht direkt mit dem "Gerät, mit dem Sie sprechen" interagieren, wie normale Befehle, die eine bestimmte Aktion ausführen und eine Antwort liefern. Das Abspielen von Audio- oder Videodaten oder dergleichen, die normalerweise von dem Gerät ausgeführt werden, für das Sie den Befehl gesprochen haben, funktioniert nicht!

Eine Anfrage an Bespoken dauert einige Sekunden, da der gesendete Text zuerst in Audio konvertiert wird, der dann an Alexa Voice Services gesendet und dann von Alexa beantwortet und zurückgesendet wird. So kann es leicht bis zu 10s dauern.

| Name des Staates | bedeutung |
| - | - |
| #sendText | An das virtuelle Gerät zu sendender Text |
| antworten | Antwort vom Gerät als Text |
| anwserJson | Antwort vom Adapter als JSON, kann zusätzliche Informationen wie Karteninfos oder ähnliches enthalten |
| status | Status der Kommunikation mit Bespoken (OK = Fertig / Warten auf nächsten Befehl, PROCESSING = Warten auf Antwort von Bespoken, FAILURE = Fehler beim Verarbeiten) |

### Alexa2.0.Contacts.ContactId. *
Alle Alexa-Kontakte, an die SMS gesendet werden können, einschließlich sich selbst. Der eigene Kontakt erhält nach seinem Namen ein spezielles "(Selbst)".

| Name des Staates | bedeutung |
| - | - |
| #clearOwnMessages | Existiert nur im eigenen Kontakt und ein Trigger löscht alle Nachrichten, die an sich selbst gesendet werden (beinhaltet auch Nachrichten an sich selbst über App oder Geräte!) |
| textMessage | Sendet diesen Text als Nachricht an den Benutzer. Es wird auf allen Geräten dieses Benutzers mit einem "gelben Ring" | angezeigt |

### Alexa2.0.Echo-Devices.Serialnumber. *
Unter "Echo-Geräte" wird jedes Amazon Echo-Gerät mit seiner Seriennummer aufgelistet. Nicht jedes Gerät zeigt alle Zustände an. Jedes Gerät hat seinen eigenen Status, wie unten beschrieben:

### Alexa2.0.Echo-Devices.Serialnumber.Alarm. *
Alarmeinstellungen (Wecker) für jedes Gerät, falls verfügbar.

| Name des Staates | bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Alarmstatus an und ermöglicht dessen Änderung: Alarm mit true aktivieren - Alarm mit false deaktivieren | wahr / falsch |
| Zeit | Zeit für Alarm. Überschreiben Sie die Zeit für den vorhandenen Alarm, um eine neue Zeit für diesen Alarm festzulegen. Falls Sie einen bestehenden Alarm haben, können Sie die Zeit hier ändern, indem Sie einfach die Zeit im Format hh: mm: ss überschreiben. Sekunden werden nicht benötigt, um | einzustellen Zeit Eingabe |
| ausgelöst | true, wenn der Alarm erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchron sein. Verwenden Sie diese Option, um eine andere Aktion auszulösen, sobald die Weckzeit erreicht ist wahr / falsch |
| neu | Zeit für einen neuen Alarm für dieses Gerät. Wenn Sie hier einen Wert eingeben, wird ein neuer Alarm erzeugt Zeitangabe (hh: mm: ss, Sekunden werden nicht benötigt) |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth. *
Hier finden Sie alle verbundenen oder bekannten Bluetooth-Geräte mit MAC-Adresse (n). Die Zustände der einzelnen Geräte:

| Name des Staates | bedeutung |
| - | - |
| verbunden | Zeigt den aktuellen Verbindungsstatus an und erlaubt die Verbindung (auf true gesetzt) oder die Trennung (auf false gesetzt) |
| ungepaart | Taste, um dieses Gerät vom Echo-Gerät zu trennen |

### Alexa2.0.Echo-Devices.Serialnumber.Commands. *
Mit Kommandos können Sie einige Aktionen auf Ihrem Alexa-Device auslösen. Wenn Sie diese auf einem Multiroom-Gerät verwenden, werden sie unabhängig voneinander ausgeführt und *laufen* nicht synchron auf den einzelnen Geräten!

| Name des Staates | bedeutung | Wert |
| - | - | - |
| doNotDisturb | Ein- / Ausschalten Für dieses Gerät nicht stören wahr / falsch |
| Flashbriefing | Briefing in 100 Sekunden - Nachrichten etc.pp | Knopf |
| guten morgen Guten Morgen von Alexa ... | Knopf |
| singasong | Alexa singt ein Lied ... | Knopf |
| sprechen | Alexa sagt was du hier eingibst ... | Texteingabe |
| lautstärke | Stellen Sie die Sprechlautstärke von Alexa ein, diese Lautstärke wird vor dem Sprechen eingestellt und danach zurückgesetzt 0-100 |
| erzählung | Alexa erzählt eine Geschichte | Knopf |
| Verkehr Verkehrsnachrichten | Knopf |
| wetter | Wetter Nachrichten | Knopf |
| deviceStop | Stoppen Sie alle Aktionen auf dem Gerät Knopf |
| Benachrichtigung | Senden Sie eine SMS-Benachrichtigung an den Kunden des Geräts Text |
| Ankündigung | Ansage abspielen (wie aber mit Bing vor Text sprechen) | Text |
| ssml | Sprechen Sie die SSML-XML-Zeichenfolge | Text |

Detaillierte Informationen Sprechen Sie: Geben Sie hier ein, was Alexa sagen soll. Sie können die Lautstärke von Alexa auch anpassen, indem Sie einen Prozentsatz vor Ihrem Text eingeben.
Beispiel: 10; Alexa sagt Alexa mit 10% Volumen, während 100; Alexa 100% Volumen ist.
Normalerweise können Sie nur 250 Zeichen pro Sprachbefehl senden. Mit dem Semikolon können Sie so viel schreiben, wie Sie möchten, solange Sie 250 Zeichen mit einem Semikolon trennen.
Alexa spricht dann den Text nacheinander mit einer kleinen Pause. Sie können die Lautstärke auch zusammen mit weiteren 255 Blöcken verwenden, indem Sie #Volume; # Block1; # Block2, a.s.o eingeben. Eine hier festgelegte Lautstärke wird über einer definierten Sprechlautstärke verwendet.

### Alexa2.0.Echo-Devices.Serialnumber.Info. *
Informationen zum Alexa-Gerät

| Name des Staates | bedeutung | Wert |
| - | - | - |
| Fähigkeiten Fähigkeiten, wenn das Gerät alexa | Informationen |
| deviceType | Gerätetyp von Amazon | Informationen |
| deviceTypeString | Gerätetyp als Zeichenfolge | Informationen |
| isMultiroomDevice | Ist ein Multiroom-Gerät - Multiroom ist eine virtuelle Gerätegruppe Information, wahr / falsch |
| isMultiroomMember | Ist Multiroom-Mitglied - Wenn true, ist das Gerät Teil einer Multiroom-Gerätegruppe Information, wahr / falsch |
| MultiroomParents | Wenn dieses Gerät Teil einer Multiroom-Gerätegruppe ist, wird in diesem Status die übergeordnete Gerätegruppe angezeigt Informationen |
| name | Name des Alexa-Geräts | Informationen |
| Seriennummer | Seriennummer des Alexa-Geräts |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider. *
Weisen Sie Alexa direkt an, Musik oder eine Wiedergabeliste von unterstützten Musikanbietern abzuspielen. Derzeit unterstützt werden: My Library, Amazon Music, Tune In. Sie können auch den Namen einer Multiroom-Gerätegruppe in die Phrase einfügen, um sie in dieser Gruppe abzuspielen (z. B. "SWR3 auf Erdgeschoss").

| Name des Staates | bedeutung | Wert |
| - | - | - |
| Amazon-Musik | Phrase zum Spielen mit Amazon Music | Texteingabe |
| Amazon-Musik-Playlist | Wiedergabeliste zum Spielen mit Amazon Music | Texteingabe |
| Meine-Bibliothek | Phrase zum Spielen mit My Library | Texteingabe |
| Meine-Bibliothek-Wiedergabeliste | Wiedergabeliste zum Abspielen mit "Meine Bibliothek" Texteingabe |
| Tune-In | Phrase zum Spielen mit Tune In | Texteingabe |
| Tune-In-Playlist | Playlist zum Spielen mit Tune In | Texteingabe |

### Alexa2.0.Echo-Devices.Serialnumber.Player. *
Status, um die Wiedergabe des Geräts zu steuern und den aktuellen Status sowie Medieninformationen anzuzeigen

| Name des Staates | bedeutung | Wert |
| - | - | - |
| TuneIn-Station | Textfeld zur Eingabe eines Stationsnamens, um diese Station auf diesem Gerät abzuspielen. Es ist auch möglich, die Sendernummer (s123456 ...), eine Show- / Podcast-ID (p1234567 ...) oder eine Themen-ID (t123456789 ...) | einzugeben Texteingabe |
| ContentType | Textfeld, um den gewünschten Inhalt für die Wiedergabe auf diesem Gerät einzugeben Informationen |
| controlForward | Taste zum Auslösen des Vorwärtsbefehls des Spielers (30s) | Knopf |
| controlNext | Taste zum Auslösen des Befehls "Nächster" des Spielers | Knopf |
| controlPause | Taste, um den Befehl "Pause" des Spielers auszulösen | Knopf |
| controlPlay | Taste zum Auslösen des Spielerbefehls "play" | Knopf |
| controlPrevious | Taste zum Auslösen des Befehls "Vorheriger" des Spielers | Knopf |
| controlRepeat | Taste zum Auslösen des Wiederholungsbefehls | wahr / falsch |
| controlRewind | Taste zum Auslösen des "Zurückspulen" -Befehls des Spielers (30s) | Knopf |
| controlShuffle | Wechseln Sie zum Aktivieren oder Deaktivieren des Zufallsmodus für den Player wahr / falsch |
| aktuellesAlbum | Aktuelles Album, das gerade abgespielt wird | Informationen |
| aktuellerKünstler | Aktueller Künstler spielt gerade | Informationen |
| currentState | Wenn spielen -> wahr, sonst falsch | wahr / falsch |
| currentTitle | Aktueller Titel, der gerade abgespielt wird | Informationen |
| imageURL | URL zum Bild des Albums | Informationen |
| mainArtURL | URL zum aktuellen Hauptwerk | Informationen |
| mediaLength | Länge des aktuellen Titels Informationen |
| mediaLengthStr | aktive Medienlänge als (HH:) MM: SS | Informationen |
| mainProgress | aktive Medien abgelaufene Zeit | Informationen |
| mainProgressPercent | aktive Medien verstrichene Zeit in Prozent | Informationen |
| mediaProgressStr | aktiver Medienfortschritt als (HH:) MM: SS | Informationen |
| miniArtUrl | URL zur Kunst (mini) | Informationen |
| gedämpft | Zustand 'MUTE' | Information, wahr / falsch, Volumen = 0 gilt als stummgeschaltet |
| providerID | ID des aktuellen Musikanbieters | Informationen |
| providerName | Name des aktuellen Musikanbieters | Informationen |
| radioStationId | ID des TuneIn-Radiosenders | Informationen |
| service | Name des aktuellen Musikdienstes | Informationen |
| volumen | Lautstärke der Wiedergabe. Sie können einen Wert zwischen 0-100% | eingeben INPUT Volume |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder. *
Erinnerungseinstellungen (Erinnerungen) für jedes Gerät, falls verfügbar.

| Name des Staates | bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Status der Erinnerung an und ermöglicht das Ändern: Erinnerung mit true aktivieren - Erinnerung mit false deaktivieren, wird einige Zeit danach automatisch gelöscht, wenn | deaktiviert wahr / falsch |
| Zeit | Zeit für eine Erinnerung. Überschreiben Sie die Zeit für die vorhandene Erinnerung, um eine neue Zeit festzulegen Zeit Eingabe | Wenn Sie bereits eine Erinnerung haben, können Sie die Zeit hier ändern, indem Sie einfach die Zeit im Format hh: mm: ss überschreiben. Sekunden werden nicht benötigt, um | einzustellen |
| ausgelöst | true, wenn die Erinnerung erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchron sein. Verwenden Sie diese Option, um eine andere Aktion auszulösen, sobald die Erinnerungszeit erreicht ist wahr / falsch |

| neu | Fügen Sie im Format eine neue Erinnerung hinzu <br> Zeit (hh: mm), Text <br> | Text Eingabe <br> 12: 00, erinnere mich

### Alexa2.0.Echo-Devices.Serialnumber.Routines. *
Übersicht über die in der Alexa App eingerichteten Routinen. Selbst erstellte Routinen haben eine Seriennummer, Amazon zeigt diese als 'vorkonfiguriert: ...' an. Jede Routine kann mit einem Knopf zum einmaligen Ausführen ausgelöst werden.

| Name des Staates | bedeutung | Wert |
| - | - | - |

| Serien- oder interner Name der Routine Name der Routine Taste

### Alexa2.0.Echo-Devices.Serialnumber.Timer. *
Auf jedem Alexa-Gerät können ein oder mehrere Timer ausgeführt werden. Aufgrund der sehr dynamischen Natur von Timern werden keine weiteren Objekte wie mit Alarm oder Erinnerungen erstellt, aber es gibt eine Möglichkeit, eine ausgelöste Information zu erhalten.

| Name des Staates | bedeutung | Wert |
| - | - | - |

| ausgelöst | Ein Timer wurde ausgelöst Information

### Alexa2.0.Echo-Devices.Serialnumber.online
Ist dieses Alexa-Gerät online und mit der Amazon-Cloud verbunden?

| Name des Staates | bedeutung | Wert |
| - | - | - |

| online | Ist das Gerät online? | Wahr falsch

### Alexa2.0.Geschichte
| Name des Staates | bedeutung | Wert |
| - | - | - |
| #trigger | Schaltfläche zum Abrufen eines neuen Verlaufs (aktueller als der Zeitstempel in creationTime), nur erforderlich, wenn die Push-Verbindung nicht verwendet wird | Knopf |
| cardContent | Zusätzliche Informationen siehe Alexa-App / Echo Show | Informationen |
| cardJson | Zusätzliche Informationen wie in der Alexa-App / Echo Show im JSON-Format | angezeigt Informationen |
| creationTime | Datum dieses Verlaufseintrags, neue Verlaufseinträge werden erst berücksichtigt, wenn sie später als dieser Zeitstempel liegen Informationen |
| domainApplicationId | Zusätzliche Informationen wie Skill-ID oder ähnliches, optional | Informationen |
| domainApplicationName | Zusätzliche Informationen wie Name der Fertigkeit oder dergleichen, optional | Informationen |
| json | Json der letzten Befehlsdaten, um alle Informationen verarbeiten zu können, z. in eigenen JavaScripts | JSON |
| name | Name des Geräts, das die letzte Anforderung erhalten hat | Informationen |
| Seriennummer | Seriennummer des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| status | Status des letzten Befehls an Alexa | SUCCESS / FAULT / DISCARDED_NON_DEVICE_DIRECTED_INTENT; Die letzte wird generiert, wenn das Gerät durch Sprechen des Aktivierungsworts aktiviert wird oder wenn das Gerät die Eingabe als "Nicht für mich" | verworfen hat |
| Zusammenfassung | Vom Gerät empfangener Text / Zusammenfassung / Aktion | Informationen |

### Alexa.0.Smart-Home-Geräte
Beinhaltet alle Smart-Home-Geräte, die Alexa aufgrund Ihrer Fähigkeiten kennt. Geben Sie für alle bekannten Geräte Folgendes an:

| Name des Staates | bedeutung | Wert |
| - | - | - |

| deleteAll | löscht alle Smart-Home-Geräte von Alexa, genauso wie die Schaltfläche in der Alexa-App | Knopf | discoverDevices | findet neue Smart-Home-Geräte, genau wie die Schaltfläche in der Alexa App | Knopf | queryAll | fragt alle Geräte ab, nur sichtbar, wenn mindestens ein Gerät Informationen abrufen kann Taste

### Alexa.0.Smart-Home-Devices.SerialNumber. *
| Name des Staates | bedeutung | Wert |
| - | - | - |

| #delete | Löschen Sie das Smart Home-Gerät von Alexa | Knopf | #enabled | Ist das Smart Home-Gerät aktiv? | Information

| #query | Abfragedaten für dieses Gerät, nur sichtbar, wenn das Smart Home-Gerät / die Fähigkeit das Abrufen von Informationen unterstützt Knopf |
| aktiv | wird für Szenen angezeigt, bei denen sie aktiviert / deaktiviert werden können | wahr / falsch |
| powerState | Ein- / Ausschalten | veränderbar, wahr / falsch |
| ... | Je nach Typ des Smart-Home-Geräts sind viele weitere Zustände möglich Information oder änderbar :-) |

** -> Sonderzustände für Farb- / Lichtgeräte **

| Name des Staates | bedeutung | Wert |
| - | - | - |
| Helligkeit | Helligkeit des HUE-Lichts | veränderbar 0-100% |
| Farbhelligkeit | Helligkeit für die Farbdefinition (zusammen mit Farbton und Sättigung, HSV) | Information, 0-1% |
| Farbton | Farbtonwert der Farbe (zusammen mit Helligkeit und Sättigung, HSV) | Information, 0-360 ° |
| Farbsättigung Farbsättigung (zusammen mit Helligkeit und Farbton, HSV) | Information, 0-1 |
| colorRGB | RGB-Code der tatsächlichen Farbe, der aus Farb- * werten aufgebaut ist Information, #rrggbb |
| colorName | Name der Farbe nach Alexa - Festwert | farblich veränderbar, 0-144 |
| colorTemperarureInKelvin | Farbtemperatur in Kelvin | Information, 1000-10000K |
| colorTemperatureName | Name der Farbtemperatur gemäß Alexa - Festwerte | änderbar zum Setzen, 0-18 |

Mit #brightness können Sie die Helligkeit Ihres Lichts anpassen. #ColorName wählt eine vordefinierte Farbe aus (0-144). Für HUE Ambient Light können Sie unter #colorTemperatureName zwischen 19 Werten von 0-18 wählen. Alles Licht kann mit #powerState ein- und ausgeschaltet werden.

### Alexa2.0.Info. *
| Name des Staates | bedeutung | Wert |
| - | - | - |
| Verbindung | Wenn die Verbindung zu Alexa in Ordnung ist | Information -> wahr / falsch |
| cookie | Alexa-Cookie, wird mit mehreren externen Skripten verwendet, die auch auf Alexa-APIs zugreifen möchten Informationen |
| csrf | Alexa CSRF, wird mit mehreren externen Skripten verwendet, die auch auf Alexa-APIs zugreifen möchten Informationen |

## Fehlende Funktionen
* Wie aktualisiere ich den Anfangsstatus für Volume, Shuffle oder Repeat und doNotDisturb ?! Oder nicht benötigt?
* Felder hinzufügen, um Spielinformationen wie die JS-Version anzuzeigen
* Selbstdeaktivierung, wenn Cookie / CSRF ungültig ist

## Installation
Verwenden Sie wie gewohnt das stabile Repository, das neueste Repository oder die "Install" -Optionen von ioBroker von GitHub

## Fehlerbehebung
### Probleme bei der Cookie-Ermittlung per E-Mail / Passwort
Manchmal hat Amazon Prüfungen veranlasst, wenn beim Anmelden unerwarteter Datenverkehr festgestellt wird.
Dies kann zu dem Problem führen, dass ein Captcha beantwortet werden muss, um sich anzumelden.
Meist muss dieses Captcha einmal beantwortet werden und danach funktioniert der Login ohne Captcha.

Wenn Sie ein solches Captcha beantworten müssen, versuchen Sie Folgendes:

* Verwenden Sie einen gängigen Browser (z. B. Chrome).
* Javascript ausschalten!
* Löschen Sie alle Cookies, die möglicherweise für Amazon existieren, oder verwenden Sie den Proivate / Incognito-Modus des Browsers
* Rufen Sie https://alexa.amazon.de an
* Sie sollten ein Anmeldeformular erhalten (normalerweise angezeigt für ältere mobile Browser)
* Melden Sie sich dort mit Ihren Amazon-Anmeldeinformationen an, in denen Echo / Alexa registriert ist
* Möglicherweise müssen Sie sich zweimal anmelden oder ein Captcha lösen
* Am Ende sollte "https://alexa.amazon.de/spa/index.html" als URL angezeigt werden, jedoch ohne echten Inhalt (da JS immer noch deaktiviert ist), ABER DAS IST VOLLSTÄNDIG OK !!!!
* Versuchen Sie nun erneut, einen Cookie zu erhalten
* Wenn es immer noch nicht funktioniert, machen Sie es noch einmal und überprüfen Sie den User-Agent und die Accept-Sprache in Ihrem Browser und verwenden Sie diese im Adapter beim nächsten Versuch

Außerdem muss der Accept-Language-Header (standardmäßig "de-DE") mit Ihrer Sprache / der Browsersprache / der Sprache der Amazon-Seite übereinstimmen, auf der Sie sich anmelden.

Sie können auch versuchen, mit dem User-Agent herumzuspielen und einen zu verwenden, der dem von Ihnen verwendeten Systemtyp entspricht.
Als Beispiel wurde angegeben, dass die Verwendung von "Mozilla / 5.0 (X11; Linux x86_64) AppleWebKit / 537.36 (KHTML, wie Gecko) Chrome / 51.0.2704.103 Safari / 537.36" als User-Agent besser funktioniert, wenn ioBroker auf einem Linux-System ausgeführt wird.

Sie können alle diese Parameter in der Adapterkonfiguration überschreiben.

### Wie bestimme ich den Cookie selbst?
Wenn die automatische Cookie-Bestimmung nicht funktioniert oder Sie dem Adapter nicht vertrauen, dass er Ihnen die E-Mail / das Passwort übermittelt, können Sie den Cookie selbst bestimmen. Es gibt verschiedene Infos im Web, wie es geht. Hier einige Links:

* https://www.gehrig.info/alexa/Alexa.html
* oder benutze das Shellscript von https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html um es auf Shell zu bekommen ...

Beachten Sie jedoch, dass das Cookie nach einiger Zeit abläuft und der Adapter dann nicht mehr funktioniert und sich selbst deaktiviert. Sie müssen dann manuell einen neuen Cookie erhalten!

## Changelog


### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems 

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above) 

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive


### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.x (Github only as iobroker.alexa)
* (Apollon77) 0.1.5: Adapter disables itself on error (no cookie/no csrf in cookie/captcha needed)
* (Apollon77) 0.1.5: Reorganized some states (delete object again please), add playerinfo section for later usage, hopefully fixed unplanned device renaming and other things
* (Apollon77) 0.1.5: Added adapter config options to overwrite used amazon-page, user-agent and accept-language for cookie determination and
* (Apollon77) 0.1.4: State changes are logged and only considered when ack=false!
* (Apollon77) 0.1.3: Corrected all roles, delete objects and start again!
* (Apollon77) 0.1.3: bluetooth connection status filled correctly initially
* (Apollon77) 0.1.2: Library fixes and updates
* (Apollon77) 0.1.1: Library fixes and updates

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions