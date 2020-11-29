---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufig gestellte Fragen zur Adapterentwicklung
hash: vAedyXkcC+wYcnNf+WP6LfPgxlS1ayqADzQwmtv2pzQ=
---
# Häufig gestellte Fragen zur Adapterentwicklung
## Einführung
Die Idee dieser Seite ist es, häufig gestellte Fragen zur Entwicklung von ioBroker-Adaptern zu sammeln.
Diese Idee wurde von Ralf am 24. November 2020 im ioBroker # adapter Discord-Kanal während einer Diskussion mit einer Frage von Mic geboren.

## Bitte beitragen (es ist wirklich einfach!)
Fühlen Sie sich frei, Fragen und entsprechende Antworten zu dieser Seite hinzuzufügen. Die einzige Einschränkung ist: Stellen Sie sicher, dass Sie der Antwort ein Datum hinzufügen. Perfektionismus ist nicht erforderlich. Schreiben Sie einfach, was Ihnen bei der Adapterentwicklung geholfen hat. Links zu Adaptern, in denen die Frage implementiert ist, sind ebenfalls sehr willkommen. Wir Entwickler sehen gerne Implementierungsbeispiele :-)

* Hinweis: * Dies ist keine offizielle Dokumentation. Hinweise, Problemumgehungen, Links zu noch älteren Forenbeiträgen usw. sind willkommen. Ziel ist es, Entwickler bei häufig gestellten Entwicklerfragen schnell zu unterstützen und zu unterstützen. Wenn Sie hier Probleme beim Schreiben in Englisch haben, verwenden Sie bitte Ihre Landessprache wie Deutsch, Russisch usw. Wir helfen Ihnen gerne weiter und übersetzen später.

Zum Aktualisieren des Inhaltsverzeichnisses können Sie einen Inhaltsverzeichnisgenerator verwenden, z. [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

# Inhaltsverzeichnis
- [Adapter-Updates] (# Adapter-Updates)
  - [Veröffentlichen von Adapter-Updates] (# Publishing-Adapter-Updates)
- [Adaptertest und Fehlerberichterstattung] (# Adaptertest und Fehlerberichterstattung)
  - [Kompaktmodus] (# Kompaktmodus)
  - [Wachposten] (# Wachposten)
- [Benutzeroberfläche für die Adapterkonfiguration (admin / index_m.html)] (# adapter-configuration-ui-adminindexmhtml)
  - [Eingabevalidierung] (# Eingabevalidierung)

---

### Adapter-Updates
#### Adapter-Updates veröffentlichen
** Frage: ** In welchen Dateien muss ich die Versionsnummer ändern?

** Antwort: ** Grundsätzlich müssen Sie 3 Dateien berühren:

 * `io-package.json`: Ändere die Versionsnummer und füge das letzte Änderungsprotokoll hinzu
 * `package.json`: Nur Versionsnummer ändern
 * `README.md`: Neue Versionsnummer und das Änderungsprotokoll hinzufügen

Bitte beachten Sie, dass die Verwendung von [Semantische Versionierung] (https://semver.org/), siehe [Versionierung](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning) erforderlich ist.<br> (25.11.2020)

** Frage: ** Mein Adapter befindet sich im neuesten Repository. Ich habe den Adapter auf Github aktualisiert und auch auf NPM veröffentlicht. Wann sehen die Benutzer die neue Version im Admin?

** Antwort: ** ioBroker sucht zweimal täglich nach Versionsänderungen.<br> (25.11.2020)

** Frage: ** Wie kann ich dem neuesten Repository einen neuen Adapter hinzufügen?

** Antwort: ** Siehe [Fügen Sie dem neuesten Repository einen neuen Adapter hinzu](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> (25.11.2020)

### Adaptertest und Fehlerberichterstattung
#### Kompaktmodus
** Frage: ** Wie kann ich den Kompaktmodus testen?

** Antwort: ** Siehe [Kompaktmodus testen](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)<br> (25.11.2020)

#### Wachposten
** Frage: ** Wie kann ich Sentry zu meinem Adapter hinzufügen?

** Antwort: ** Siehe [Sentry Read.me](https://github.com/ioBroker/plugin-sentry#readme)<br> (25.11.2020)

### Benutzeroberfläche für die Adapterkonfiguration (admin / index_m.html)
#### Eingabevalidierung
** Frage: ** Ich möchte Felder der Adapterkonfiguration mithilfe der Kernadaptermethoden sowie der Klassen / Methoden des Adaptercodes von node.j validieren. Die Validierung sollte erfolgen, sobald ein Benutzer in der Adapterkonfiguration auf "Speichern" klickt und dann `save()` von `admin/index_m.html` aufruft.

** Antwort: ** Sie können die Methode `sendTo()` verwenden, um die Variable `obj` von `admin/index_m.html` an den Adaptercode zu senden, den Inhalt dort zu validieren und dann das Ergebnis per Rückruf an zu liefern `sendTo()` von `admin/index_m.html`.<br> Beispiel: Dies ist im Adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan) implementiert.<br> HINWEIS: Möglicherweise müssen Sie Ihre `io-package.json` ändern, siehe z. B. [ioBroker-Forum: sendTo () funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> (24.11.2020)