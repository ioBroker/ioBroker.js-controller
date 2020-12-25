---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: D+SRUcPZBTZSG1ROflwqDxficUfm4fatrviEkRp4RUQ=
---
![Logo](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Anzahl der Installationen](http://iobroker.live/badges/alexa2-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)

# IoBroker.alexa2
** Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um Ausnahmen und Codefehler sowie neue Geräteschemata automatisch an mich als Entwickler zu melden. ** Weitere Details siehe unten!

Mit diesem Adapter können Sie Ihre Alexa-Geräte (Amazon Echo) fernsteuern.

Ein großes Dankeschön geht an soef für die Version 1 des Adapters und an Hauke und ruhr70 für die Ideen in ihren Skripten vom ioBroker-Forum (insbesondere die Aktualisierungen des Medienfortschritts)! Ein großes Dankeschön auch an meicker für die Unterstützung bei der Dokumentation all dessen und an zahlreiche Benutzer des ioBroker-Forums für ihre Testunterstützung!

## Staaten und ihre Bedeutungen:
Im Adapter-Namespace (z. B. alexa2.0) werden einige Kanäle erstellt

### Alexa2.0
| Staatsname | Bedeutung |
| - | - |
| Echogeräte. * | Zustände pro Echo-Gerät, siehe unten |
| Geschichte. * | Infos zum Befehlsverlauf siehe unten |
| Smart-Home-Geräte. * | Zustände pro Smart-Home-Gerät und allgemein siehe unten |
| info. * | Allgemeine Informationen zum Adapterstatus |
| requestResult | Fehlerinformationen für TuneIn- und Smart-Home-Geräteanforderungen |

### Alexa2.0.Contacts.ContactId. *
Alle Alexa-Kontakte, an die Textnachrichten gesendet werden können, einschließlich sich selbst. Der eigene Kontakt erhält nach seinem Namen ein spezielles "(Selbst)".

| Staatsname | Bedeutung |
| - | - |
| #clearOwnMessages | Existiert nur im eigenen Kontakt und ein Trigger löscht alle Nachrichten, die an sich selbst gesendet werden (schließt auch Nachrichten an sich selbst über App oder Geräte ein!) |
| textMessage | Sendet diesen Text als Nachricht an den Benutzer. Es wird auf allen Geräten dieses Benutzers mit einem "gelben Ring" | angezeigt |

### Alexa2.0.Echo-Devices.Serialnumber. *
Unter "Echo-Geräte" wird jedes Amazon-Echo-Gerät mit seiner Seriennummer aufgelistet. Nicht jedes Gerät zeigt alle Zustände an. Jedes Gerät hat seine eigenen Zustände, wie unten beschrieben:

### Alexa2.0.Echo-Devices.Serialnumber.Alarm. *
Alarmeinstellungen (Wecker) für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Status des Alarms an und ermöglicht das Ändern: Alarm mit wahr aktivieren - Alarm mit falsch deaktivieren | wahr / falsch |
| Zeit | Zeit für Alarm. Überschreiben Sie die Zeit für einen vorhandenen Alarm, um eine neue Zeit für diesen Alarm festzulegen. Falls ein Alarm vorhanden ist, können Sie die Zeit hier ändern, indem Sie einfach die Zeit im Format hh: mm: ss überschreiben. Für die Einstellung von | werden keine Sekunden benötigt Zeiteingabe |
| ausgelöst | true, wenn der Alarm erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchron sein. Verwenden Sie diese Option, um eine andere Aktion auszulösen, sobald die Alarmzeit erreicht ist wahr / falsch |
| neu | Zeit für neuen Alarm für dieses Gerät. Wenn Sie hier einen Wert eingeben, wird ein neuer Alarm erstellt Zeiteingabe (hh: mm: ss, Sekunden werden nicht benötigt) |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth. *
Hier finden Sie alle verbundenen oder bekannten Bluetooth-Geräte mit MAC-Adresse (n). Die Zustände jedes Geräts:

| Staatsname | Bedeutung |
| - | - |
| verbunden | Zeigt den aktuellen Verbindungsstatus an und ermöglicht die Verbindung (auf true gesetzt) oder die Trennung (auf false gesetzt) |
| ungepaart | Schaltfläche zum Trennen dieses Geräts vom Echogerät |

### Alexa2.0.Echo-Devices.Serialnumber.Commands. *
Mit Befehlen können Sie einige Aktionen auf Ihrem Alexa-Gerät auslösen. Wenn Sie diese auf einem Multiroom-Gerät verwenden, werden sie unabhängig ausgeführt und *werden* auf den einzelnen Geräten nicht synchron ausgeführt!

| Staatsname | Bedeutung | Wert |
| - | - | - |
| doNotDisturb | Ein- / Ausschalten Nicht stören für dieses Gerät | wahr / falsch |
| Flashbriefing | Briefing in 100 Sekunden - Nachrichten etc.pp | Taste |
| guten morgen | Guten Morgen von Alexa ... | Taste |
| funfact | Lustige Tatsache von Alexa ... (im Moment nur USA) | Taste |
| Witz | Witz von Alexa ... | Taste |
| Aufräumen | Spielt einen "Gong" -Ton wie für Start / Ende des Hörmodus ... | Taste |
| kuratiert | Zufälliger Satz aus dem ausgewählten Bereich von Alexa ... | Text (erlaubt: "Auf Wiedersehen", "Bestätigungen", "Guten Morgen", "Komplimente", "Geburtstag", "Gute Nacht", "iamhome") |
| singasong | Alexa singt ein Lied ... | Taste |
| sprechen | Alexa sagt, was Sie hier eingeben ... | Texteingabe |
| Sprachvolumen | Stellen Sie die Sprechlautstärke von Alexa ein. Diese Lautstärke wird vor dem Sprechen eingestellt und anschließend zurückgesetzt 0-100 |
| Geschichte | Alexa erzählt eine Geschichte Taste |
| Verkehr | Verkehrsnachrichten | Taste |
| Wetter | Wetternachrichten | Taste |
| deviceStop | Beenden Sie alle Aktionen auf dem Gerät Taste |
| Benachrichtigung | Senden Sie eine Textbenachrichtigung an den Kunden des Geräts Text |
| Ankündigung | Ansage abspielen (wie sprechen, aber mit Bing vor dem Text) | Text |
| ssml | Sprechen Sie SSML XML-Zeichenfolge | Text |
| Textbefehl | Senden Sie einen Textbefehl an Alexa, derzeit nur USA! | Text |

Detaillierte Informationen Sprechen und Ankündigung: Geben Sie hier ein, was Alexa sagen soll. Sie können die Lautstärke von Alexa auch anpassen, indem Sie vor Ihrem Text einen Prozentsatz angeben.
Beispiel: 10; Alexa sagt Alexa mit 10% Volumen, während 100; Alexa 100% Volumen ist.
Normalerweise können Sie nur 250 Zeichen pro Sprachbefehl senden. Mit dem Semikolon können Sie so viel schreiben, wie Sie möchten, solange Sie 250 Zeichen durch ein Semikolon trennen.
Alexa wird dann den Text mit einer kleinen Pause nacheinander sprechen. Sie können das Volume auch zusammen mit mehr als 255 Blöcken verwenden, indem Sie #Volume; # Block1; # Block2, a.s.o schreiben. Ein hier festgelegtes Volume wird über einem definierten Speak-Volume verwendet.

### Alexa2.0.Echo-Devices.Serialnumber.Info. *
Informationen zum Alexa-Gerät

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Fähigkeiten | Fähigkeiten, wenn das alexa Gerät | Informationen |
| deviceType | Gerätetyp von Amazon | Informationen |
| deviceTypeString | Gerätetyp als Zeichenfolge | Informationen |
| isMultiroomDevice | Ist Multiroom-Gerät - Multiroom ist eine virtuelle Gerätegruppe | Information, wahr / falsch |
| isMultiroomMember | Ist Multiroom-Mitglied - Wenn true, ist das Gerät Teil einer Multiroom-Gerätegruppe | Information, wahr / falsch |
| MultiroomParents | Wenn dieses Gerät Teil einer Multiroom-Gerätegruppe ist, zeigt dieser Status das übergeordnete Gruppengerät | an Informationen |
| Name | Name des Alexa-Geräts | Informationen |
| Seriennummer | Seriennummer des Alexa-Geräts |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider. *
Weisen Sie Alexa direkt an, Musik oder eine Wiedergabeliste von unterstützten Musikanbietern abzuspielen. Derzeit unterstützt werden: Meine Bibliothek, Amazon Music, Tune In. Sie können auch einen Multiroom-Gerätegruppennamen in die Phrase aufnehmen, um ihn in dieser Gruppe abzuspielen (z. B. "SWR3 auf Erdgeschoss").

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Amazon-Musik | Phrase zum Spielen mit Amazon Music | Texteingabe |
| Amazon-Musik-Playlist | Wiedergabeliste zum Spielen mit Amazon Music | Texteingabe |
| Meine Bibliothek | Phrase zum Spielen mit My Library | Texteingabe |
| Meine-Bibliothek-Wiedergabeliste | Wiedergabeliste zum Spielen mit Meine Bibliothek | Texteingabe |
| Einschalten | Phrase zum Spielen mit Tune In | Texteingabe |
| Tune-In-Playlist | Wiedergabeliste zum Spielen mit Tune In | Texteingabe |

### Alexa2.0.Echo-Devices.Serialnumber.Player. *
Gibt an, dass die Wiedergabe des Geräts gesteuert und der aktuelle Status und die Medieninformationen angezeigt werden sollen

| Staatsname | Bedeutung | Wert |
| - | - | - |
| TuneIn-Station | Textfeld zum Eingeben eines Sendernamens zum Abspielen dieser Station auf diesem Gerät. Es ist auch möglich, die Sendernummer (s123456 ...), eine Show- / Podcast-ID (p1234567 ...) oder eine Themen-ID (t123456789 ...) | einzugeben Texteingabe |
| ContentType | Textfeld zum Einfügen des gewünschten Inhalts zur Wiedergabe auf diesem Gerät | Informationen |
| controlForward | Taste zum Auslösen des Vorwärtsbefehls des Spielers (30s) | Taste |
| controlNext | Taste zum Auslösen des "nächsten" Befehls des Spielers | Taste |
| controlPause | Taste zum Auslösen des Befehls "Pause" des Spielers | Taste |
| controlPlay | Taste zum Auslösen des Befehls "Abspielen" des Spielers | Taste |
| controlPrevious | Taste zum Auslösen des "vorherigen" Befehls des Spielers | Taste |
| controlRepeat | Taste zum Auslösen des Befehls "Wiederholen" des Spielers | wahr / falsch |
| controlRewind | Taste zum Auslösen des Befehls "Zurückspulen" des Spielers (30s) | Taste |
| controlShuffle | Wechseln Sie zum Aktivieren oder Deaktivieren des Zufallsmodus für Player | wahr / falsch |
| currentAlbum | Aktuelles Album läuft gerade | Informationen |
| currentArtist | Aktueller Künstler spielt tatsächlich | Informationen |
| currentState | Beim Spielen -> wahr, sonst falsch | wahr / falsch |
| currentTitle | Aktueller Titel spielt gerade | Informationen |
| imageURL | URL zum Bild des Albums | Informationen |
| mainArtURL | URL zum aktuellen Hauptbild | Informationen |
| mediaLength | Länge des aktuellen Titels | Informationen |
| mediaLengthStr | aktive Medienlänge als (HH :) MM: SS | Informationen |
| mainProgress | verstrichene Zeit der aktiven Medien | Informationen |
| mainProgressPercent | verstrichene aktive Medienzeit in Prozent | Informationen |
| mediaProgressStr | aktiver Medienfortschritt als (HH :) MM: SS | Informationen |
| miniArtUrl | URL zur Kunst (mini) | Informationen |
| stumm geschaltet | Zustand von 'MUTE' | Information, wahr / falsch, Volumen = 0 wird als stummgeschaltet betrachtet |
| providerID | ID des aktuellen Musikanbieters | Informationen |
| Anbietername | Name des aktuellen Musikanbieters | Informationen |
| radioStationId | ID des TuneIn-Radiosenders | Informationen |
| Service | Name des aktuellen Musikdienstes | Informationen |
| Volumen | Lautstärke der Wiedergabe. Sie können einen Wert zwischen 0-100% | eingeben INPUT Volume |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder. *
Erinnerungseinstellungen für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Status der Erinnerung an und ermöglicht das Ändern: Erinnerung mit true aktivieren - Erinnerung mit false deaktivieren, wird einige Zeit später automatisch gelöscht, wenn deaktiviert | wahr / falsch |
| Zeit | Zeit zur Erinnerung. Überschreiben Sie die Zeit für die vorhandene Erinnerung, um eine neue Zeit festzulegen Zeiteingabe | Wenn Sie bereits eine Erinnerung haben, können Sie die Zeit hier ändern, indem Sie einfach die Zeit im Format hh: mm: ss überschreiben. Zum Einstellen von | werden keine Sekunden benötigt |
| ausgelöst | true, wenn die Erinnerung erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchron sein. Verwenden Sie diese Option, um eine andere Aktion auszulösen, sobald die Erinnerungszeit erreicht ist wahr / falsch |

| neu | Fügen Sie eine neue Erinnerung im Format hinzu<br> Zeit (hh: mm), Text<br> | Text Eingabe<br> 12: 00, Erinnere mich

### Alexa2.0.Echo-Devices.Serialnumber.Routines. *
Übersicht über die in der Alexa App eingerichteten Routinen. Selbst erstellte Routinen haben eine Seriennummer, die Amazon als "vorkonfiguriert: ..." anzeigt. Jede Routine kann mit einer Schaltfläche ausgelöst werden, die einmal ausgeführt werden soll.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| Serien- oder interner Name der Routine Name der Routine | Taste

### Alexa2.0.Echo-Devices.Serialnumber.Timer. *
Auf jedem Alexa-Gerät können ein oder mehrere Timer ausgeführt werden. Aufgrund der sehr dynamischen Natur von Timern werden keine weiteren Objekte wie mit Alarm oder Erinnerungen erstellt, aber es gibt eine Möglichkeit, ausgelöste Informationen zu erhalten.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| ausgelöst | Ein Timer wurde ausgelöst | Information

### Alexa2.0.Echo-Devices.Serialnumber.online
Ist dieses Alexa-Gerät online und mit der Amazon Cloud verbunden?

| Staatsname | Bedeutung | Wert |
| - | - | - |

| online | Ist das Gerät online? | Wahr falsch

### Alexa2.0.Geschichte
| Staatsname | Bedeutung | Wert |
| - | - | - |
| #trigger | Schaltfläche zum Abrufen eines neuen Verlaufs (aktueller als Zeitstempel in CreationTime), der nur benötigt wird, wenn die Push-Verbindung | nicht verwendet wird Taste |
| cardContent | Zusätzliche Informationen wie in Alexa-App / Echo Show | gezeigt Informationen |
| cardJson | Zusätzliche Informationen wie in Alexa-App / Echo Show im JSON-Format | angezeigt Informationen |
| Erstellungszeit | Datum dieses Verlaufseintrags, neue Verlaufseinträge werden nur berücksichtigt, wenn sie später als dieser Zeitstempel gelten Informationen |
| domainApplicationId | Zusätzliche Informationen wie Skill-ID oder ähnliches, optional | Informationen |
| domainApplicationName | Zusätzliche Informationen wie Fertigkeitsname oder ähnliches, optional | Informationen |
| json | Json der letzten Befehlsdaten, um alle Infos verarbeiten zu können, z. in eigenen JavaScripts | JSON |
| Name | Name des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| Seriennummer | Seriennummer des Geräts, das die letzte Anforderung erhalten hat | Informationen |
| Status | Status des letzten Befehls an Alexa | SUCCESS / FAULT / DISCARDED_NON_DEVICE_DIRECTED_INTENT; Der letzte wird generiert, wenn das Gerät durch Sprechen des Weckworts aktiviert wird oder wenn das Gerät die Eingabe als "nicht für mich" verworfen hat |
| Zusammenfassung | vom Gerät empfangener Text / Zusammenfassung / Aktion | Informationen |

### Alexa.0.Smart-Home-Geräte
Beinhaltet alle Smart-Home-Geräte, die Alexa aus Ihren Fähigkeiten kennt. Gibt für alle bekannten Geräte Folgendes an:

| Staatsname | Bedeutung | Wert |
| - | - | - |

| deleteAll | löscht alle Smart-Home-Geräte aus Alexa, genau wie die Schaltfläche in der Alexa-App | Taste | removeDevices | findet neue Smart-Home-Geräte, genau wie die Schaltfläche in der Alexa App | Taste | queryAll | fragt alle Geräte ab, die nur sichtbar sind, wenn mindestens ein Gerät Informationen abrufen kann Taste

### Alexa.0.Smart-Home-Devices.SerialNumber. *
| Staatsname | Bedeutung | Wert |
| - | - | - |

| #delete | Smart-Home-Gerät aus Alexa | löschen Taste | #enabled | Ist das Smart Home-Gerät aktiv? | Information

| #query | Daten für dieses Gerät abfragen, nur sichtbar, wenn das Smart-Home-Gerät / die Smart-Home-Fähigkeit das Abrufen von Informationen unterstützt Taste |
| aktiv | wird für Szenen angezeigt, in denen sie aktiviert / deaktiviert werden können | wahr / falsch |
| powerState | Ein- / Ausschalten | veränderbar, wahr / falsch |
| ... | Viele weitere mögliche Zustände je nach Typ des Smart-Home-Geräts | Information oder veränderbar :-) |

** -> Sonderzustände für Farb- / Lichtgeräte **

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Helligkeit | Helligkeit des HUE-Lichts | veränderbar 0-100% |
| Farbhelligkeit | Helligkeit für die Farbdefinition (zusammen mit Farbton und Sättigung, HSV) | Information, 0-1% |
| Farbton | Farbtonwert der Farbe (zusammen mit Helligkeit und Sättigung, HSV) | Information, 0-360 ° |
| Farbsättigung | Farbsättigung (zusammen mit Helligkeit und Farbton, HSV) | Information, 0-1 |
| colorRGB | RGB-Code der tatsächlichen Farbe, aufgebaut aus Farb- * Werten | Information, #rrggbb |
| colorName | Name der Farbe wie von Alexa definiert - feste Werte | änderbar, um Farbe einzustellen, 0-144 |
| colorTemperarureInKelvin | Farbtemperatur in Kelvin | Information, 1000-10000K |
| colorTemperatureName | Farbtemperaturname wie von Alexa definiert - feste Werte | änderbar auf setzen, 0-18 |

Mit #helligkeit können Sie die Helligkeit Ihres Lichts anpassen. Mit #colorName wählen Sie eine vordefinierte Farbe (0-144). Für HUE Ambient Light können Sie in #colorTemperatureName zwischen 19 Werten von 0-18 wählen. Alle Lichter können mit #powerState ein- und ausgeschaltet werden.

### Alexa2.0.Info. *
| Staatsname | Bedeutung | Wert |
| - | - | - |
| Verbindung | Wenn die Verbindung zu Alexa in Ordnung ist | Information -> wahr / falsch |
| Keks | Alexa-Cookie, Verwendung mit mehreren externen Skripten, die auch auf Alexa-APIs zugreifen möchten Informationen |
| csrf | Alexa CSRF, Verwendung mit mehreren externen Skripten, die auch auf Alexa APIs zugreifen möchten Informationen |

## Fehlende Funktionen
* Wie aktualisiere ich den Anfangsstatus für Volume, Shuffle oder Repeat und doNotDisturb?! Oder nicht benötigt?
* Fügen Sie Felder hinzu, um Spielinformationen wie die JS-Version anzuzeigen
* Selbstdeaktivierung, wenn Cookie / CSRF ungültig ist

## Installation
Verwenden Sie wie gewohnt ein stabiles Repository, das neueste Repository oder die ioBroker-Optionen "Installieren" von GitHub

## Fehlerbehebung
### Probleme mit der Cookie-Ermittlung per E-Mail / Passwort
Manchmal hat Amazon Überprüfungen durchgeführt, wenn bei der Anmeldung unerwarteter Datenverkehr festgestellt wird.
Dies kann zu dem Problem führen, dass ein Captcha beantwortet werden muss, um sich anzumelden.
Meistens muss dieses Captcha einmal beantwortet werden und danach funktioniert die Anmeldung ohne Captcha.

Wenn Sie ein solches Captcha beantworten müssen, versuchen Sie Folgendes:

* Verwenden Sie einen gemeinsamen Browser (z. B. Chrome).
* Javascript ausschalten!
* Löschen Sie alle Cookies, die möglicherweise für Amazon existieren, oder verwenden Sie den Proivate / Incognito-Modus des Browsers
* Rufen Sie https://alexa.amazon.de an
* Sie sollten ein Anmeldeformular erhalten (normalerweise für ältere mobile Browser angezeigt).
* Melden Sie sich dort mit Ihren Amazon-Anmeldeinformationen an, in denen das Echo / Alexa registriert ist
* Möglicherweise müssen Sie sich zweimal anmelden oder ein Captcha lösen
* Am Ende sollte "https://alexa.amazon.de/spa/index.html" als URL angezeigt werden, jedoch ohne echten Inhalt (da JS immer noch deaktiviert ist), ABER DAS IST VOLLSTÄNDIG OK !!!!
* Versuchen Sie jetzt erneut, einen Cookie zu erhalten
* Wenn es immer noch nicht funktioniert, wiederholen Sie den User-Agent und die Accept-Language in Ihrem Browser und verwenden Sie diese beim nächsten Versuch im Adapter

Zusätzlich muss der Accept-Language-Header (standardmäßig "de-DE") mit Ihrer Sprache / der Browsersprache / der Sprache der Amazon-Seite übereinstimmen, auf der Sie sich anmelden.

Sie können auch versuchen, mit dem User-Agent herumzuspielen und einen zu verwenden, der dem von Ihnen verwendeten Systemtyp besser entspricht.
Als Beispiel für die Verwendung von "Mozilla / 5.0 (X11; Linux x86_64) AppleWebKit / 537.36 (KHTML, wie Gecko) Chrome / 51.0.2704.103 Safari / 537.36" als User-Agent wurde berichtet, dass es besser funktioniert, wenn ioBroker auf einem Linux-System ausgeführt wird.

Sie können alle diese Parameter in der Adapterkonfiguration überschreiben.

### Wie bestimme ich Cookies selbst?
Wenn die automatische Cookie-Ermittlung nicht funktioniert oder Sie dem Adapter nicht vertrauen, dass er die E-Mail / das Passwort angibt, können Sie das Cookie selbst bestimmen. Es gibt verschiedene Infos im Web, wie es geht. Hier einige Links:

* https://www.gehrig.info/alexa/Alexa.html
* oder verwenden Sie das Shellscript von https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html, um es auf Shell zu bekommen ...

Beachten Sie jedoch, dass das Cookie nach einiger Zeit eine Zeitüberschreitung aufweist und der Adapter dann nicht mehr funktioniert und sich selbst deaktiviert. Sie müssen dann manuell ein neues Cookie erhalten!

## Was ist Sentry.io und was wird den Servern dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## Changelog

### 3.5.0 (2020-12-24)
* (Apollon77) Remove bespoken because textCommand is more flexible
* (Apollon77) Add and adjust some known devices, add Echo 4 image

### 3.4.0 (2020-12-11)
* (Apollon77) add support for textCommand - tell an Alexa device a text as you would speak it
* (Apollon77) make sure discovery of devices is still possible also after deleting all devices before

### 3.3.5 (2020-12-03)
* (Apollon77) make sure music providers with empty names do not produce errors

### 3.3.2 (2020-11-23)
* (Apollon77) prevent crash cases and optimize reconnection handling

### 3.3.1 (2020-07-24)
* (Apollon77) Further optimize Cookie handling

### 3.3.0 (2020-07-19)
* (Apollon77) Hopefully allow easier upgrades if old deviceId is invalid now
* (Apollon77) Allow to have separate deviceIds per instance

### 3.2.8 (2020-07-16)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.7 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again
* (arteck) add echo studio

### 3.2.6 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again 

### 3.2.5 (2020-07-13)
* (Apollon77) Work around Amazon Security changes and make proxy working again 
* (Apollon77) fix Sentry crash case when Amazon do not respond correctly (IOBROKER-ALEXA2-1C)

### 3.2.4 (2020-06-18)
* (Apollon77) Update Alexa-Remote Library to optimize communication error/timeout cases

### 3.2.3 (2020-06-17)
* (Apollon77) Fix currentState handling

### 3.2.2 (2020-06-17)
* (Apollon77) remove goodnight because was not working
* (Apollon77) Fix Play/Pause states and some media optimizations

### 3.2.1 (2020-06-17)
* (Apollon77) update amazon-cookie library: another optimization for Node.js 14

### 3.2.0 (2020-06-17)
* (Apollon77/hive) add new commands, jokes/facts/goodnight/cleanup
* (Apollon77/hive) add new command curatedtts with allowed values ["goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome"] to play random curated sentences
* (Apollon77) Prevent some crashes
* (Apollon77) Make sure Timer are not triggering the state when deleted
* (Apollon77) make sure that Lists objects are deleted correctly when deleting
* (Apollon77) Make compatible with nodejs 14
* (Apollon77) Adjust to changes from Amazon so that initial Proxy process works again
* (OberstVonGatow) Make sure that for Spotify Media data requests do not have negative effects and stop the playback  

### 3.1.2 (2020-03-18)
* (Gieskanne/Apollon77) Add Next Timer Date as state
* (Apollon77) Fix missing history entries
* (Apollon77) Prevent List deletions from logging errors
* (Apollon77) optimiztions, dependency updates and fixes
* (Apollon77) Switch to ioBroker own sentry instance
* (Apollon77) add Info.softwareVersion

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes 

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

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

## License

The MIT License (MIT)

Copyright (c) 2017-2018 soef <soef@gmx.net>, 2018-2020 Ingo Fischer <iobroker@fischer-ka.de>

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