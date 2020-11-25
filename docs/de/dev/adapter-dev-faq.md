---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufig gestellte Fragen zur Adapterentwicklung
hash: 5dEjacU1AHJylH65Fm27UxFiSV0NYLcsREgs++uwcKY=
---
# Häufig gestellte Fragen zur Adapterentwicklung
## Einführung
Die Idee dieser Seite ist es, häufig gestellte Fragen zur Entwicklung von ioBroker-Adaptern zu sammeln.
Diese Idee wurde von Ralf am 24. November 2020 im ioBroker # adapter Discord-Kanal während einer Diskussion mit einer Frage von Mic geboren.

## Bitte beitragen (es ist wirklich einfach!)
Fühlen Sie sich frei, Fragen und entsprechende Antworten zu dieser Seite hinzuzufügen. Die einzige Einschränkung ist: Stellen Sie sicher, dass Sie der Antwort ein Datum hinzufügen. Perfektionismus ist nicht erforderlich. Schreiben Sie einfach, was Ihnen bei der Adapterentwicklung geholfen hat. Links zu Adaptern, in denen die Frage implementiert ist, sind ebenfalls sehr willkommen. Wir Entwickler sehen gerne Implementierungsbeispiele :-)

* Hinweis: * Dies ist keine offizielle Dokumentation. Hinweise, Problemumgehungen, Links zu noch älteren Forenbeiträgen usw. sind willkommen. Ziel ist es, Entwickler bei häufig gestellten Entwicklerfragen schnell zu unterstützen und zu unterstützen. Wenn Sie hier Probleme beim Schreiben in Englisch haben, verwenden Sie bitte Ihre Landessprache wie Deutsch, Russisch usw. Wir helfen Ihnen gerne weiter und übersetzen später.

Alles einfach hier;)

## FAQ
### Adapterkonfiguration (admin / index_m.html)
#### Eingabevalidierung
** Frage: ** Ich möchte Felder der Adapterkonfiguration mithilfe der Kernadaptermethoden sowie der Klassen / Methoden des Adaptercodes von node.j validieren. Die Validierung sollte stattfinden, sobald ein Benutzer in der Adapterkonfiguration auf "Speichern" klickt, wodurch dann `save()` von `admin/index_m.html` aufgerufen werden.

** Antwort: ** Sie können die Methode `sendTo()` verwenden, um die Variable `obj` von `admin/index_m.html` an den Adaptercode zu senden, den Inhalt dort zu validieren und dann das Ergebnis per Rückruf an zu liefern `sendTo()` von `admin/index_m.html`.<br> Beispiel: Dies ist im Adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan) implementiert.<br> HINWEIS: Möglicherweise müssen Sie Ihre `io-package.json` ändern, siehe z. B. [ioBroker-Forum: sendTo () funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> (24.11.2020)