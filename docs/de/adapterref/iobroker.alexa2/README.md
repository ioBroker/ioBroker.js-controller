---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: BETUPt5sfnfHnfbVc/NvgU2FhyUg61czcNtFLQrdETw=
---
![Logo](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Anzahl der Installationen](http://iobroker.live/badges/alexa2-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.alexa2 <! - -> <! - ->
Mit diesem Adapter können Sie Ihre Alexa (Amazon Echo) -Geräte fernsteuern.

Vielen Dank für die gute Version 1 des Adapters und für die Ideen in ihren Skripten vom ioBroker-Forum (insbesondere die Updates zum Fortschritt des Mediums)! Vielen Dank auch an meicker für die Unterstützung bei der Dokumentation all dieser und zahlreicher Benutzer des ioBroker Forums für ihre Testunterstützung!

### Staaten und ihre Bedeutungen:
Im Adapternamensraum (z. B. alexa2.0) werden einige Kanäle erstellt

#### Alexa2.0
| Staatsname | Bedeutung |
| - | - |
| besagt. * | Senden Sie Textbefehle an ein virtuelles Gerät, als würden Sie mit ihm sprechen
| Echogeräte. * | Zustände pro Echogerät, siehe unten
| Geschichte. * | Infos zur Befehlshistorie finden Sie unter |
| Smart-Home-Geräte. * | Zustände pro Smart-Home-Gerät und im Allgemeinen siehe unten
| info. * | Allgemeine Informationen zum Adapterstatus |
| requestResult | Fehlerinformationen für TuneIn- und Smart-Home-Geräteanforderungen |

#### Alexa2.0.bespoken. *
Bespoken ist normalerweise ein Dienstanbieter, der beim automatischen Testen von Fähigkeiten hilft. Tatsächlich können Sie damit jedoch Befehle an "Ihren" Alexa / Amazon-Account senden. Damit können Sie Skill-Aktionen auslösen, die normalerweise nicht über die Alexa App zugänglich sind. Es sind nur Befehle möglich, die nicht direkt mit dem "Gerät, mit dem Sie sprechen" interagieren, wie normale Befehle, die eine bestimmte Aktion ausführen und eine Antwort geben. Die Wiedergabe von Audio oder Video oder von einem Gerät, auf das Sie den Befehl normalerweise gesprochen haben, funktioniert nicht!

Eine Anfrage an Bespoken dauert einige Sekunden, da der gesendete Text zuerst in Audio umgewandelt wird. Dieser wird an Alexa Voice Services gesendet und von Alexa beantwortet und anschließend zurückgesendet. Es kann also leicht bis zu 10s dauern.

| Staatsname | Bedeutung |
| - | - |
| #sendText | Text, der an das virtuelle Gerät gesendet werden soll
| Antwort | Antwort vom Gerät als Text |
| anwserJson | Antwort vom Adapter als JSON, kann zusätzliche Informationen enthalten, z. B. Karteninfos oder |
| Status | Status der Kommunikation mit bespoken (OK = Fertig / Warten auf den nächsten Befehl, PROCESSING = Warten auf Antwort von bespoken, FAILURE = Fehler während der Verarbeitung) |

#### Alexa2.0.echo-devices.Seriennummer. *
Unter "Echogeräte" wird jedes Amazon-Echogerät mit seiner Seriennummer aufgeführt. Nicht jedes Gerät zeigt alle Zustände. Jedes Gerät hat seine eigenen Zustände wie unten beschrieben:

#### Alexa2.0.echo-devices.Seriennummer.Alarm. *
Alarmeinstellungen (Wecker) für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Status des Alarms an und ermöglicht dessen Änderung: Alarm mit true aktivieren - Alarm mit false | deaktivieren wahr / falsch |
| Zeit | Zeit für Alarm. Überschreiben Sie die Zeit für den vorhandenen Alarm, um eine neue Uhrzeit für diesen Alarm einzustellen. Falls Sie bereits einen Alarm haben, können Sie die Uhrzeit hier ändern, indem Sie einfach die Uhrzeit im Format hh: mm: ss überschreiben, es werden keine Sekunden zum Einstellen von | benötigt Zeiteingabe |
| ausgelöst | wahr, wenn Alarm erreicht und ausgelöst wird. Die Uhr muss mit Amazon und Iobroker synchron sein. Verwenden Sie diese Option, um andere Aktionen auszulösen, sobald die Weckzeit erreicht ist wahr / falsch |
| neu | Zeit für neuen Alarm für dieses Gerät. Wenn Sie hier einen Wert eingeben, wird ein neuer Alarm erstellt Zeit (hh: mm: ss, Sekunden werden nicht benötigt) |

#### Alexa2.0.echo-devices.Serialnumber.Bluetooth. *
Hier finden Sie alle verbundenen oder bekannten Bluetooth-Geräte mit MAC-Adresse (n). Die Zustände jedes Geräts:

| Staatsname | Bedeutung |
| - | - |
| verbunden | Zeigt den aktuellen Verbindungsstatus an und lässt die Verbindung zu (gesetzt auf true) oder die Verbindung trennen (auf false gesetzt) |
| unpaarig | Schaltfläche zum Trennen dieses Geräts vom Echogerät |

#### Alexa2.0.echo-devices.Serialnumber.Commands. *
Mit Befehlen können Sie einige Aktionen auf Ihrem Alexa-Gerät auslösen. Wenn Sie diese auf einem Multiroom-Gerät verwenden, werden sie unabhängig voneinander ausgeführt und *laufen* auf den einzelnen Geräten nicht synchron!

| Staatsname | Bedeutung | Wert |
| - | - | - |
| doNotDisturb | Ein- / Ausschalten Bitte nicht stören für dieses Gerät | wahr / falsch |
| Flashbriefing | Briefing in 100 Sekunden - Nachrichten etc.pp Schaltfläche |
| guten morgen | Guten Morgen von Alexa ... | Schaltfläche |
| singasong | Alexa singt ein Lied ... | Schaltfläche |
| sprechen | Alexa sagt, was du hier eingibst ... | Texteingabe |
| speak volume | Passen Sie die Sprachlautstärke von Alexa an. Diese Lautstärke wird vor dem Sprechen eingestellt und anschließend zurückgesetzt 0-100 |
| Erzählung | Alexa erzählt eine Geschichte Schaltfläche |
| Verkehr | Verkehrsnachrichten | Schaltfläche |
| Wetter | Wetternachrichten | Schaltfläche |
| deviceStop | Stoppen Sie alle Aktionen auf Gerät | Schaltfläche |
| Benachrichtigung | Senden Sie eine Textbenachrichtigung an den Kunden des Geräts | Text |
| Ankündigung | Ansage abspielen (wie sprechen, aber mit Bing vor Text) | Text |
| ssml | SSML-XML-Zeichenfolge sprechen Text |

Ausführliche Informationen Sprechen Sie: Geben Sie hier ein, was Alexa sagen soll. Sie können die Lautstärke von Alexa auch anpassen, indem Sie vor Ihrem Text einen Prozentsatz angeben.
Beispiel: 10; Alexa sagt Alexa mit 10% Volumen, während 100; Alexa 100% Volumen ist.
Normalerweise können Sie nur 250 Zeichen pro Sprachbefehl senden. Mit dem Semikolon können Sie so viel schreiben, wie Sie möchten, solange Sie 250 Zeichen mit einem Semikolon trennen.
Alexa spricht dann den Text mit einer kurzen Pause nacheinander. Sie können das Volume auch zusammen mit mehr 255 Blöcken verwenden, indem Sie #Volume; # Block1; # Block2, a.s.o schreiben. Ein hier eingestelltes Volume wird für ein definiertes Sprachvolumen verwendet.

#### Alexa2.0.echo-devices.Serialnumber.Info. *
Informationen zum Alexa-Gerät

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Fähigkeiten | Fähigkeiten, wenn das Alexa-Gerät | Informationen |
| deviceType | Gerätetyp von Amazon | Informationen |
| deviceTypeString | Gerätetyp als Zeichenfolge | Informationen |
| isMultiroomDevice | Ist Multiroom-Gerät - Multiroom ist eine virtuelle Gerätegruppe | Information wahr / falsch |
| isMultiroomMember | Ist Multiroom-Mitglied - Wenn true, ist das Gerät Teil einer Multiroom-Gerätegruppe Information wahr / falsch |
| MultiroomParents | Wenn dieses Gerät Teil einer Multiroom-Gerätegruppe ist, wird in diesem Status das übergeordnete Gruppengerät angezeigt Informationen |
| name | Name des Alexa-Geräts | Informationen |
| Seriennummer | Seriennummer des Alexa-Geräts |

#### Alexa2.0.echo-devices.Serialnumber.Music-Provider. *
Teilen Sie Alexa direkt mit, dass Sie Musik oder eine Wiedergabeliste von unterstützten Musikanbietern abspielen sollen. Aktuell werden unterstützt: Meine Bibliothek, Amazon Music, Tune In. Sie können der Gruppe auch einen Multiroom-Gerätegruppennamen hinzufügen, um sie in dieser Gruppe abzuspielen (z. B. "SWR3 auf Erdgeschoss")

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Amazon-Musik | Phrase zum Spielen mit Amazon Music | Texteingabe |
| Amazon-Music-Playlist | Wiedergabeliste zum Abspielen mit Amazon Music | Texteingabe |
| Meine-Bibliothek | Phrase zum Spielen mit My Library | Texteingabe |
| Meine-Bibliothek-Playliste | Playlist, um mit My Library | zu spielen Texteingabe |
| Tune-In | Phrase zum Spielen mit Tune In | Texteingabe |
| Tune-In-Playlist | Wiedergabeliste zum Abspielen mit Tune In | Texteingabe |

#### Alexa2.0.echo-devices.Serialnumber.Player. *
Zustände, um die Wiedergabe des Geräts zu steuern und den aktuellen Status und die Medieninformationen anzuzeigen

| Staatsname | Bedeutung | Wert |
| - | - | - |
| TuneIn-Station | Textfeld, um einen Stationsnamen einzugeben, um diesen Sender auf diesem Gerät abzuspielen. Es ist auch möglich, die Stationsnummer (s123456 ...), eine Show- / Podcast-ID (p1234567 ...) oder eine Themen-ID (t123456789 ...) einzugeben Texteingabe |
| ContentType | Textfeld zum Einfügen des gewünschten Inhalts zum Abspielen auf diesem Gerät Informationen |
| controlForward | Taste zum Auslösen des Vorwärtsbefehls des Spielers (30s) | Schaltfläche |
| controlNext | Taste zum Auslösen des "nächsten" Befehls | Schaltfläche |
| controlPause | Taste zum Auslösen des Befehls "Pause" für den Spieler | Schaltfläche |
| controlPlay | Taste zum Auslösen des "play" -Befehls | Schaltfläche |
| controlPrevious | Schaltfläche zum Auslösen des Players "vorheriger" Befehl | Schaltfläche |
| controlRepeat | Taste zum Auslösen des Wiederholungsbefehls | wahr / falsch |
| controlRewind | Taste zum Auslösen des Rückspulbefehls (30s) | Schaltfläche |
| controlShuffle | Wechseln Sie zum Aktivieren oder Deaktivieren des Shuffle-Modus für den Player | wahr / falsch |
| currentAlbum | Aktuelles Album, das gerade spielt Informationen |
| currentArtist | Aktueller Künstler, der tatsächlich | spielt Informationen |
| currentState | Wenn Sie -> true spielen, andernfalls false | wahr / falsch |
| currentTitle | Aktueller Titel, der tatsächlich spielt | Informationen |
| imageURL | URL zum Bild des Albums | Informationen |
| mainArtURL | URL zum aktuellen Hauptartikel | Informationen |
| mediaLength | Länge des aktuellen Titels | Informationen |
| mediaLengthStr | aktive Medienlänge als (HH:) MM: SS | Informationen |
| mainProgress | Aktive Medien verstrichene Zeit | Informationen |
| mainProgressPercent | Aktive Medien verstrichene Zeit in Prozent | Informationen |
| mediaProgressStr | aktiver Medienfortschritt als (HH:) MM: SS | Informationen |
| miniArtUrl | URL zur Kunst (Mini) | Informationen |
| stummgeschaltet | Zustand von 'MUTE' | Information true / false, volume = 0 wird als stummgeschaltet angesehen
| providerID | ID des aktuellen Musikanbieters | Informationen |
| providerName | Name des aktuellen Musikanbieters | Informationen |
| radioStationId | ID des TuneIn-Radiosenders | Informationen |
| Service | Name des aktuellen Musikdienstes | Informationen |
| Volumen | Lautstärke der Wiedergabe Sie können einen Wert zwischen 0 und 100% eingeben INPUT Volume |

#### Alexa2.0.echo-devices.Serialnumber.Reminder. *
Erinnerungseinstellungen für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Status der Erinnerung an und ermöglicht deren Änderung: Erinnerung mit true aktivieren - Erinnerung mit false deaktivieren, wird einige Zeit nach dem Deaktivieren automatisch gelöscht wahr / falsch |
| Zeit | Zeit zur Erinnerung. Überschreiben Sie die Zeit für die bestehende Erinnerung, um eine neue Zeit einzustellen Zeiteingabe | Falls Sie bereits über eine Erinnerung verfügen, können Sie die Uhrzeit hier ändern, indem Sie einfach die Uhrzeit im Format hh: mm: ss überschreiben, es werden keine Sekunden zum Einstellen von | benötigt
| ausgelöst | wahr, wenn Erinnerung erreicht und ausgelöst wird. Uhr muss mit Amazon und Iobroker synchron sein. Verwenden Sie diese Option, um andere Aktionen auszulösen, sobald die Erinnerungszeit erreicht ist wahr / falsch |

| neu | Fügen Sie eine neue Erinnerung im Format hinzu <br> Zeit (hh: mm), Text <br> | Text Eingabe <br> 12: 00, erinnere mich

#### Alexa2.0.echo-devices.Seriennummer.Routinen. *
Übersicht über die in der Alexa App eingerichteten Routinen. Selbst erstellte Routinen haben eine Seriennummer, Amazon zeigt als "vorkonfiguriert: ...". Jede Routine kann mit einer Schaltfläche ausgelöst werden, die einmal ausgeführt wird.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| Serien- oder interner Name der Routine | Name der Routine | Taste

#### Alexa2.0.echo-devices.Serialnumber.Timer. *
Auf jedem Alexa-Gerät können ein oder mehrere Timer ausgeführt werden. Aufgrund der sehr dynamischen Natur von Timern werden keine weiteren Objekte wie mit Alarm oder Erinnerungen erstellt. Es gibt jedoch eine Möglichkeit, ausgelöste Informationen zu erhalten.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| ausgelöst | Ein Timer wurde ausgelöst Information

#### Alexa2.0.echo-devices.Seriennummer.online
Ist dieses Alexa-Gerät online und mit der Amazon-Cloud verbunden?

| Staatsname | Bedeutung | Wert |
| - | - | - |

| online | Ist das Gerät online? | Wahr falsch

#### Alexa2.0.history
| Staatsname | Bedeutung | Wert |
| - | - | - |
| #Trigger | Schaltfläche zum Abrufen eines neuen Verlaufs (aktueller als Zeitstempel in creationTime), nur erforderlich, wenn die Push-Verbindung nicht verwendet wird Schaltfläche |
| cardContent | Weitere Informationen wie in Alexa-App / Echo Show | Informationen |
| cardJson | Zusätzliche Informationen wie in Alexa-App / Echo Show im JSON-Format gezeigt Informationen |
| creationTime | Datum dieses Historieneintrags werden neue Historieneinträge nur dann berücksichtigt, wenn sie später als dieser Zeitstempel verwendet werden Informationen |
| domainApplicationId | Zusätzliche Informationen wie Skill-ID oder solche, optional | Informationen |
| domainApplicationName | Zusätzliche Informationen wie Name oder Name der Fertigkeit, optional | Informationen |
| Json | Json der letzten Befehlsdaten, um alle Informationen verarbeiten zu können, z. in eigenen JavaScripts | JSON |
| name | Name des Geräts, das die letzte Anforderung erhalten hat Informationen |
| Seriennummer | Seriennummer des Geräts, das die letzte Anforderung erhalten hat Informationen |
| Status | Status des letzten Befehls an Alexa | ERFOLG / FEHLER / DISCARDED_NON_DEVICE_DIRECTED_INTENT; Letzteres wird generiert, wenn das Gerät durch das Sprechen des Wortes aktiviert wird oder wenn das Gerät die Eingabe als "nicht für mich" verworfen hat
| Zusammenfassung | vom Gerät empfangener Text / Zusammenfassung / Aktion | Informationen |

#### Alexa.0.smart-home-devices
Umfasst alle Smart-Home-Geräte, die Alexa von Ihren Fähigkeiten kennt. Zustände für alle bekannten Geräte wie folgt:

| Staatsname | Bedeutung | Wert |
| - | - | - |

| deleteAll | löscht alle Smart-Home-Geräte von Alexa, genauso wie die Schaltfläche in der Alexa-App | Schaltfläche | entdeckenGeräte | findet neue Smart-Home-Geräte, genauso wie die Schaltfläche in der Alexa-App | Schaltfläche | queryAll | fragt alle Geräte ab, nur sichtbar, wenn mindestens ein Gerät Informationen abrufen kann Taste

#### Alexa.0.smart-home-devices.serialNumber. *
| Staatsname | Bedeutung | Wert |
| - | - | - |

| #delete | Löschen Sie das Smart Home-Gerät von Alexa | Schaltfläche | #enabled | Ist das Smart Home-Gerät aktiv? | Information

| #abfrage | Abfragedaten für dieses Gerät, nur sichtbar, wenn das Smart Home-Gerät / der Skill das Abrufen von Informationen unterstützt Schaltfläche |
| aktiv | für Szenen angezeigt, wenn sie aktiviert / deaktiviert werden können wahr / falsch |
| powerState | Stromversorgung ein- / ausschalten | veränderlich, wahr / falsch |
| ... | Je nach Typ des Smart Home-Geräts sind noch viele weitere Zustände möglich Informationen oder veränderbar :-) |

** -> Besondere Zustände für Farb- / Lichtgeräte **

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Helligkeit | Helligkeit des HUE-Lichts | veränderbar 0-100% |
| Farbe-Helligkeit | Helligkeit für die Farbdefinition (zusammen mit Farbton und Sättigung, HSV) | Information, 0-1% |
| Farbton | Farbtonwert der Farbe (zusammen mit Helligkeit und Sättigung, HSV) | Information 0-360 ° |
| Farbsättigung | Sättigung der Farbe (zusammen mit Helligkeit und Farbton, HSV) | Information, 0-1 |
| colorRGB | RGB-Code des tatsächlichen Farbaufbaus aus Farbwerten * Informationen, #rrggbb |
| colorName | Name der Farbe, wie durch Alexa definiert - feste Werte | änderbar zur eingestellten Farbe, 0-144 |
| colorTemperarureInKelvin | Farbtemperatur in Kelvin | Information, 1000-10000K |
| colorTemperatureName | Name der Farbtemperatur wie durch Alexa definierte Werte | einstellbar, 0-18 |

Mit #brightness können Sie die Helligkeit Ihres Lichts anpassen, #colorName wählt eine vordefinierte Farbe (0-144). Für HUE Ambient light können Sie in #colorTemperatureName zwischen 19 Werten von 0-18 wählen. Mit #powerState kann alles Licht ein- und ausgeschaltet werden.

#### Alexa2.0-info. *
| Staatsname | Bedeutung | Wert |
| - | - | - |
| Verbindung | Wenn die Verbindung zu Alexa in Ordnung ist | Information -> wahr / falsch |
| Cookie | Alexa-Cookie, verwenden Sie mehrere externe Skripts, die auch auf Alexa APIs | zugreifen möchten Informationen |
| csrf | Alexa CSRF, verwenden Sie mehrere externe Skripts, die auch auf Alexa APIs | zugreifen möchten Informationen |

## Fehlende Funktionen
* Wie aktualisiere ich den Ausgangsstatus für Volume, Shuffle oder Repeat und doNotDisturb? Oder nicht gebraucht?
* Felder hinzufügen, um Spielinformationen wie JS-Version anzuzeigen
* Selbstabschaltung bei ungültigem Cookie / csrf

## Installation
Verwenden Sie die ioBroker-Optionen "Installieren" von GitHub oder führen Sie aus dem neuesten Repository den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in / opt / iobroker).

```
npm install iobroker.alexa2
npm add alexa2
iobroker upload alexa2
```

Gehen Sie dann in ioBroker Admin und fügen Sie eine Alexa-Instanz hinzu.

## Fehlerbehebung
### Probleme bei der Cookie-Ermittlung per E-Mail / Passwort
Manchmal hat Amazon Prüfungen vorgenommen, wenn unerwarteter Datenverkehr beim Anmelden erkannt wird.
Dies kann zu dem Problem führen, dass ein Captcha beantwortet werden muss, um sich anmelden zu können.
Meist muss dieses Captcha einmal beantwortet werden und danach funktioniert der Login ohne Captcha.

Wenn Sie auf ein solches Captcha antworten müssen, versuchen Sie Folgendes:

* Verwenden Sie einen allgemeinen Browser (z. B. Chrome)
* Javascript ausschalten!
* Löschen Sie alle Cookies, die möglicherweise für Amazon existieren, oder verwenden Sie den Proivate / Incognito-Modus des Browsers
* rufen Sie https://alexa.amazon.de an
* Sie sollten ein Anmeldeformular erhalten (normalerweise für ältere mobile Browser angezeigt).
* Melden Sie sich dort mit Ihren Amazon-Zugangsdaten an, in denen das Echo / Alexa registriert ist
* Möglicherweise müssen Sie sich zweimal anmelden oder ein Captcha lösen
* Am Ende sollte "https://alexa.amazon.de/spa/index.html" als URL angezeigt werden, jedoch ohne echten Inhalt (da JS noch deaktiviert ist), ABER DAS IST VOLLSTÄNDIG OK !!!!
* Versuchen Sie jetzt erneut, einen Cookie zu erhalten
* Wenn es immer noch nicht funktioniert, überprüfen Sie den User-Agent und die Accept-Language in Ihrem Browser und verwenden Sie diese im nächsten Versuch

Außerdem muss der Accept-Language-Header (Standardeinstellung "de-DE") mit Ihrer Sprache / der Browsersprache / der Sprache der Amazon-Seite übereinstimmen, auf die Sie sich anmelden.

Sie können auch versuchen, mit dem User-Agent herumzuspielen und einen zu verwenden, der dem verwendeten Systemtyp mehr entspricht.
Als Beispiel für die Verwendung von "Mozilla / 5.0 (X11; Linux x86_64) AppleWebKit / 537.36 (KHTML, wie Gecko) Chrome / 51.0.2704.103 Safari / 537.36" wurde berichtet, dass der Benutzer-Agent besser funktioniert, wenn ioBroker auf einem Linux-System ausgeführt wird.

Sie können alle diese Parameter in der Adapterkonfiguration überschreiben.

### Wie kann ich das Cookie selbst bestimmen?
Wenn die automatische Cookie-Bestimmung nicht funktioniert oder Sie dem Adapter nicht die E-Mail / das Kennwort geben, können Sie den Cookie selbst bestimmen. Im Internet gibt es mehrere Infos, wie das geht. Hier einige Links:

* https://www.gehrig.info/alexa/Alexa.html
* oder nutzen Sie das Shellscript von https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html um es auf die Shell zu bekommen

Aber seien Sie sich bewusst: Der Cookie wird nach einiger Zeit abgemeldet und der Adapter funktioniert nicht mehr und deaktiviert sich. Sie müssen dann manuell einen neuen Cookie erhalten!

## Changelog

### 2.2.0 (2019-01-xx)
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13)
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