---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.calendar/README.md
title: ioBroker.calendar
hash: 5Oon6BS1Ri7dDHrSAvewD1qgw+8jZjHpH7mlDgI486s=
---
![Logo](../../../en/adapterref/iobroker.calendar/admin/calendar.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.calendar.svg?logo=npm)
![Downloads](https://img.shields.io/npm/dm/iobroker.calendar?logo=npm)
![Installationen](http://iobroker.live/badges/calendar-installed.svg)
![Stabil](http://iobroker.live/badges/calendar-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/WLAN-Kabel/ioBroker.calendar.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/WLAN-Kabel/ioBroker.calendar/badge.svg)
![NPM](https://nodei.co/npm/iobroker.calendar.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.calendar/master.svg?logo=travis)
![AppVeyor](https://img.shields.io/appveyor/build/WLANKabel/ioBroker-calendar/master?logo=appveyor)

# IoBroker.calendar
## Kalenderadapter für ioBroker
Lesen Sie Ihren Google-, Caldav- oder Iical-Kalender.

## Machen
* Outlook-Kalender hinzufügen
* Funktion zum Hinzufügen von Ereignissen zum Kalender hinzufügen
* Vis Widget erweitern

## Google-Authentifizierung
Der folgende Schritt ist nur erforderlich, wenn Ihr ioBroker auf einem anderen Computer / Server installiert ist und Sie nicht über localhost auf das Webinterface zugreifen können.

### Windows:
Führen Sie ```nodepad.exe``` mit Administratorrecht aus und öffnen Sie die Datei ```C:\Windows\System32\drivers\etc\hosts```.
Fügen Sie einen Eintrag wie ```192.168.0.10    example.com``` (\ <IP-Adresse ioBroker \> \ <FQDN \>) hinzu. Speichern Sie die Datei und öffnen Sie das Webinterface über den <FQDN>, den Sie in die Hosts-Datei geschrieben haben. Beispiel: http://example.com:8081

### Linux:
    In Kürze ...

### Mac
    In Kürze ...

### Google API-Schlüssel
Sie benötigen einen API-Schlüssel. Besuchen Sie https://console.cloud.google.com/apis/dashboard und melden Sie sich mit Ihrem Google-Konto an.

Öffnen Sie die Liste in der Kopfzeile und erstellen Sie ein neues Projekt. Geben Sie einen Projektnamen wie "ioBroker Calendar" ein und klicken Sie auf "Erstellen".

Stellen Sie sicher, dass Sie das richtige Projekt aus der Liste ausgewählt haben. Öffnen Sie die Registerkarte Bibliothek. Suchen Sie nach "Kalender" und klicken Sie auf "Google Kalender-API".

Klicken Sie auf "Aktivieren" und dann auf "APIs & Services". Öffnen Sie die Registerkarte "OAuth-Zustimmungsbildschirm" und geben Sie einen Anwendungsnamen wie "ioBroker-Kalender" ein. Sie können auch ein Logo hochladen, dies ist jedoch nicht erforderlich.

Öffnen Sie die Registerkarte "Anmeldeinformationen", klicken Sie auf die Dropdown-Liste "Anmeldeinformationen erstellen" und wählen Sie "OAuth-Client-ID". Wählen Sie im nächsten Schritt "Webanwendung". Geben Sie einen Namen wie "ioBroker" oder "Webclient" ein. Fügen Sie autorisierten JavaScript-Ursprüngen ```http://<FQDN>:<Port from adapter config>``` hinzu. Fügen Sie ```http://<FQDN>:<Port from adapter config>/google``` und ```http://<FQDN>:<Port from adapter config>/google/``` zu autorisierten Weiterleitungs-URIs hinzu.

Erstellen Sie die Client-ID und kopieren Sie die angezeigte Client-ID und das Client-Geheimnis.

Gehen Sie zur Adapterkonfiguration und fügen Sie die Client-ID und das Client-Geheimnis hinzu.

## Caldav Kalender (Getestet mit Nextcloud, Web.de und Mail.de)
Sie können Ihren Caldav-Kalender in der Adapterkonfiguration hinzufügen.

Geben Sie Ihre Zugangsdaten und den Hostnamen in die Konfiguration ein.

### Baseurl-Liste
* Nextcloud: https:// \ <Hostname \> /remote.php/dav/principals
* Web.de: https://caldav.web.de
* mail.de: https://kalender.mail.de
* Posteo: https://posteo.de:8443

Wenn Sie mehr wissen, lassen Sie es mich bitte wissen, damit ich sie aufnehmen kann.

## ICal-Dateikalender
Sie können Ihren iCal-Kalender in der Adapterkonfiguration hinzufügen.

Geben Sie den Dateipfad auf der Registerkarte CalDav in das Feld Hostname ein.

## Changelog

### 1.1.2 (2020-03-03)
* (WLAN-Kabel) #15 - Fixed a serious bug that caused incorrect credentials for CalDav accounts
* (WLAN-Kabel) #15 - Fixed a bug that caused a 'TypeError' message

### 1.1.1 (2020-02-26)
* (WLAN-Kabel) Password encryption added
* (WLAN-Kabel) Error messages for caldav lib extended
* (WLAN-Kabel) Fixed an issue that caused errors when reading null events

### 1.1.0 (2020-02-05)
* (WLAN-Kabel) Caldav support expanded
* (WLAN-Kabel) iCal file support added

### 1.0.1 (2020-01-11)
* (WLAN-Kabel) Missing dependency added

### 1.0.0 (2020-01-11)
* (WLAN-Kabel) Added caldav support
* (WLAN-Kabel) Multiple calendars can be displayed in one widget
* (WLAN-Kabel) Added more widget settings
* (WLAN-Kabel) State structure changed
* (WLAN-Kabel) Appointments are now shown in the popup
* (WLAN-Kabel) Some internal functions revised
* (WLAN-Kabel) Fixed an error when saving the authentication data

### 0.2.0 (2020-01-08)
* (WLAN-Kabel) Multiple calendar support for one account
* (WLAN-Kabel) Calendar color is now supported
* (WLAN-Kabel) Calender states color, name, account added
* (WLAN-Kabel) Calendar name is set as the state name
* (WLAN-Kabel) Fixed an issue where the credentials were not properly controlled
* (WLAN-Kabel) The google calendar name and color will be adopted

### 0.1.0 (2020-01-07)
* (WLAN-Kabel) Added calendar widget
* (WLAN-Kabel) Cron job and server will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages
* (WLAN-Kabel) Removed adapter from state settings
* (WLAN-Kabel) Fixed problem where series appointments were not loaded

### 0.0.1
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