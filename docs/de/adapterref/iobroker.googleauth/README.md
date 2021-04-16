---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.googleauth/README.md
title: ioBroker.googleauth
hash: 1wMF7cNxCw6XrKvVD8nwrm18lNz4siJe1LV1GJJUBAc=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.googleauth.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.googleauth.svg)
![Codacy-Abzeichen](https://api.codacy.com/project/badge/Grade/9c7ca543cf1b48a8837cc14adb50a264)
![NPM](https://nodei.co/npm/iobroker.googleauth.png?downloads=true)

<img src="admin/logo-google.svg" alt="Logo" width="100" height="100">

# IoBroker.googleauth
Dieser Adapter ist eine Erweiterung der [Webadapter](https://github.com/ioBroker/ioBroker.web). Sie können sich mit Ihrem Google-Konto anmelden.
Verwenden Sie den Web-Erweiterungsadapter [Weblogin](https://github.com/Vertumnus/ioBroker.weblogin), um die Anmeldeseite mit der entsprechenden Schaltfläche "Mit Google anmelden" zu erweitern.

Natürlich ist die Erweiterung nur dann nützlich, wenn Sie die Authentifizierung auf Ihrem ioBroker-Webserver aktiviert haben.

## Aufbau
### Google API
Zunächst müssen Sie eine Anwendung in den [Google Developers Console](https://console.developers.google.com/) erstellen.
Auf diese Weise erhalten Sie eine *Kunden-ID* und ein *Kundengeheimnis* die Sie benötigen, damit die Google-Anmeldung funktioniert.
Sie finden einen [Leiten](https://developers.google.com/identity/protocols/oauth2/web-server) auf der Google Developers Page.
Aber hier erhalten Sie eine verkürzte Anleitung:

1. Öffnen Sie [Google Developers Console] (https://console.developers.google.com/) (melden Sie sich bei Bedarf mit Ihrem Google-Konto an).
2. Wählen Sie Ihr bevorzugtes Projekt aus oder erstellen Sie ein neues
3. Wechseln Sie zur Seite Anmeldeinformationen
4. Klicken Sie auf **Anmeldeinformationen erstellen> OAuth-Client-ID**
5. Wählen Sie den Anwendungstyp **Webanwendung** aus
6. Geben Sie Ihrer Anwendung einen Namen (z. B. ioBroker).
7. Geben Sie einen autorisierten Umleitungs-URI an

   * Sie benötigen das verwendete Protokoll (http oder https)
   * Ihr Hostname (z. B. iobroker.example.com)
   * Ihr verwendeter Port (z. B. 8090)
   * und die feste Route / Login / Google / CB

     > Vollständiges Beispiel: _https://iobroker.example.com: 8090 / login / google / cb_

Nach der Erstellung der Anwendung erhalten Sie die *Client-ID* und *Client-Geheimnis* die Sie im nächsten Schritt benötigen.

> __Hinweise zu autorisierten Umleitungs-URIs__ >> Sie können mehrere Umleitungs-URIs verwenden. Das einzige, was immer gleich ist, ist die feste Route / Login / Google / CB.
> Der localhost ist ebenfalls erlaubt. Sie können es zu Testzwecken auf Ihrem lokalen System verwenden.
> Im Allgemeinen benötigen Sie jedoch einen Hostnamen mit einer Top-Level-Domain (wie .com oder .org). Daher müssen Sie einen passenden Namen für Ihren ioBroker-Server in Ihrem Netzwerk konfigurieren, z. B.: Iobroker.mynetwork.net.

### Adapter
Es gibt drei Felder, die Sie ausfüllen müssen.

__Erweiterter Webadapter__

Hier können Sie die Instanz des Webadapters auswählen, den Sie durch die Google-Authentifizierung erweitern möchten.
Standard ist Alle Instanzen.

__Kunden ID__

In diesem Feld müssen Sie die *Client-ID* aus Ihrer Anwendung angeben, die Sie im vorherigen Schritt erstellt haben.

__Client Secret__

In diesem Feld müssen Sie das *Client-Geheimnis* aus Ihrer Anwendung angeben.

## Verwendung
Um diese Erweiterung sinnvoll zu nutzen, wird empfohlen, auch die [Weblogin-Adapter](https://github.com/Vertumnus/ioBroker.weblogin) zu verwenden.
Auf der Anmeldeseite des Webservers wird ein Kontrollkästchen mit dem Namen **Erstmalige Anmeldung mit Konto** und die Schaltfläche **Mit Google anmelden** bereitgestellt, sofern dies entsprechend konfiguriert ist.

> Andernfalls müssen Sie es selbst verwalten, damit die Google-Authentifizierung funktioniert.

Wenn Sie sich zum ersten Mal mit Ihrem Google-Konto anmelden, müssen Sie das Kontrollkästchen **Zum ersten Mal** aktivieren und Ihren *Benutzernamen* und *Ihr Passwort* angeben. Dies ist erforderlich, um Ihr Google-Konto Ihrem Benutzerprofil in ioBroker zuzuordnen. Anstelle der Schaltfläche **Anmelden** müssen Sie die Schaltfläche **Mit Google anmelden** drücken.

Nach dieser ersten Anmeldung müssen Sie bei weiteren Anmeldungen nur noch auf die Schaltfläche **Mit Google anmelden** klicken.

> Wenn Sie derzeit nicht in Ihrem Google-Konto angemeldet sind, werden Sie zur Anmeldung zu Google weitergeleitet.

## License
MIT License

Copyright (c) 2021 [Armin Junge](mailto:armin.junge.81@gmail.com)

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