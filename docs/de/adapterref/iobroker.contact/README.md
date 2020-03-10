---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.contact/README.md
title: ioBroker.contact
hash: l0fM56buVj7TYn/lsPSdNY8WP6oW0ioT1XvE9pTydQ4=
---
![Logo](../../../en/adapterref/iobroker.contact/admin/contact.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.contact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.contact.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/contact-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/contact-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/WLAN-Kabel/ioBroker.contact.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/WLAN-Kabel/ioBroker.contact/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contact.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.contact/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/WLAN-Kabel/ioBroker.contact?branch=master&svg=true)

# IoBroker.contact
## Adapter für ioBroker kontaktieren
Lesen Sie Ihre Google- und Nextcloud-Kontakte.

## Machen
*

## Google-Authentifizierung (nur für Google-Konten, nicht für nextcloud-Konten)
Der folgende Schritt ist nur erforderlich, wenn Ihr ioBroker auf einem anderen Computer / Server installiert ist und Sie nicht über localhost auf das Webinterface zugreifen können.

### Windows:
Führen Sie ```nodepad.exe``` mit Administratorrecht aus und öffnen Sie die Datei ```C:\Windows\System32\drivers\etc\hosts```.
Fügen Sie einen Eintrag wie ```192.168.0.10    example.com //<IP-Adress ioBroker>     <FQDN>``` hinzu. Speichern Sie die Datei und öffnen Sie das Webinterface über den <FQDN>, den Sie in die Hosts-Datei geschrieben haben. Beispiel: http://example.com:8081

### Linux:
    In Kürze ...

### Mac
    In Kürze ...

### Google API-Schlüssel
#### !!! Hinweis: Wenn Sie den Adapter iobroker.contact bereits installiert und eingerichtet haben, müssen Sie nur die API zu Ihrem Projekt hinzufügen (3.).
1. Sie benötigen einen API-Schlüssel. Besuchen Sie https://console.cloud.google.com/apis/dashboard und melden Sie sich mit Ihrem Google-Konto an.

2. Öffnen Sie die Liste in der Kopfzeile und erstellen Sie ein neues Projekt. Geben Sie einen Projektnamen wie "ioBroker" ein und klicken Sie auf "Erstellen".

3. Stellen Sie sicher, dass Sie das richtige Projekt aus der Liste ausgewählt haben. Öffnen Sie die Registerkarte Bibliothek. Suchen Sie nach "Kontakt" und klicken Sie auf "Google People API".

4. Klicken Sie auf "Aktivieren" und dann auf "APIs & Services". Öffnen Sie die Registerkarte "OAuth-Zustimmungsbildschirm" und geben Sie einen Anwendungsnamen wie "ioBroker" ein. Sie können auch ein Logo hochladen, dies ist jedoch nicht erforderlich.

5. Öffnen Sie die Registerkarte "Anmeldeinformationen", klicken Sie auf die Dropdown-Liste "Anmeldeinformationen erstellen" und wählen Sie "OAuth-Client-ID". Wählen Sie im nächsten Schritt "Webanwendung". Geben Sie einen Namen wie "ioBroker" oder "Webclient" ein. Fügen Sie `` `http:// <FQDN>: <Port von Adapterkonfiguration>` `` zu autorisierten JavaScript-Ursprüngen hinzu. Fügen Sie `` `http: // <FQDN>: <Port von Adapterkonfiguration> / google``` und` `` http: // <FQDN>: <Port von Adapterkonfiguration> / google / `` `zur autorisierten Umleitung hinzu URIs.

6. Erstellen Sie die Client-ID und kopieren Sie die angezeigte Client-ID und das Client-Geheimnis.

Gehen Sie zur Adapterkonfiguration und fügen Sie die Client-ID und das Client-Geheimnis hinzu.

### Contact.0
| Staatsname | Bedeutung |
| - | - |
| Abfrage | Fragen Sie einen Kontakt nach einer Telefonnummer ab |
| Familienname | Familienname des gewünschten Kontakts |
| Vorname | Vorname des gewünschten Kontakts |
| fullName | Vollständiger Name des angeforderten Kontakts |
| Foto | Foto des gewünschten Kontakts |
| id | ID des angeforderten Kontakts |

### Contact.0. *.
| Staatsname | Bedeutung |
| - | - |
| Familienname | Familienname des Kontakts |
| Vorname | Vorname des Kontakts |
| fullName | Vollständiger Name des Kontakts |
| Foto | Foto des Kontakts |
| Adressen. * | Adressen des Kontakts |
| emailAddresses. * | E-Mail-Adressen des Kontakts |
| Telefonnummern. * | Telefonnummern des Kontakts |

## Javascript
Eine Anfrage kann über ```sendTo()``` an den Adapter gesendet werden, ebenso wie der Abfragedatenpunkt, aber Sie erhalten ein JSON-Objekt zurück, das in einem Skript verarbeitet werden kann (wurde bereits verwendet: https://forum.iobroker.net / topic / 28294 / asynchron-callback-versprechen-warten-hilfe.

```js
sendTo('contact.0', 'query', {phonenumberr: '+49 1234 567890'}, (obj) => {

    if(obj.error) {

        log(obj.error);

    } else {

        log(JSON.stringify(obj.contact));

    }

});
```

## Changelog

### 1.1.3 (2020-01-23)
* (WLAN-Kabel) The roles have been changed to official once
* (WLAN-Kabel) Fixed deprecation of Buffer
* (WLAN-Kabel) Added error handler for http server

### 1.1.2 (2020-01-07)
* (WLAN-Kabel) Server will stopped on unload
* (WLAN-Kabel) Removed adapter from state settings

### 1.1.1 (2020-01-06)
* (WLAN-Kabel) Cron job will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages

### 1.1.0 (2020-01-05)
* (WLAN-Kabel) sendTo() is now supported
* (WLAN-Kabel) Fixed issue where roads are being written into the roll
* (WLAN-Kabel) Fixed issue where contacts are deleted when refreshed

### 1.0.1 (2019-12-29)
* (WLAN-Kabel) Fixed problem with companies in google contacts
* (WLAN-Kabel) Removed 'undefined' from fullName if one name is missing
* (WLAN-Kabel) Adapter no longer hangs on the schedule
* (WLAN-Kabel) Nextcloud default password changed because the old password caused messages

### 1.0.0 (2019-12-23)
* (WLAN-Kabel) Added Nextcloud contacts
* (WLAN-Kabel) Added state fullName to query and each contact
* (WLAN-Kabel) FQDN and interval moved to main tab
* (WLAN-Kabel) Changed channel name for addresses, emailAddresses and phoneNumbers
* (WLAN-Kabel) Added type state for emailAddresses and phoneNumbers

### 0.0.3 (2019-12-21)
* (WLAN-Kabel) Standard country code can now be selected yourself

### 0.0.2 (2019-12-21)
* (WLAN-Kabel) Fixed an issue that restricted the search
* (WLAN-Kabel) Limit of 100 contacts has been removed

### 0.0.1 (2019-12-17)
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.