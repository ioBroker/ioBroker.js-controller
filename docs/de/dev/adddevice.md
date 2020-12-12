---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adddevice.md
title: So fügen Sie das Gerät zu alexa oder google home hinzu
hash: KJyj2QNgNPa29Jr/BcB/QJi6yPa8ucW5nGzTU+4Hr+A=
---
# So fügen Sie das Gerät zu alexa oder google home hinzu
Um das Gerät hinzuzufügen, haben wir 4 Schritte:

- Erweitern Sie die Statusrollen bei Bedarf um die erforderlichen neuen Rollen.
- Erweitern Sie den Typdetektor mit einem neuen Gerät
- Fügen Sie iobroker.devices ein Gerät hinzu, um es zu simulieren.
- Gerät zu alexa / google and co hinzufügen

## Neue Rollen
Wir haben 3 (oder noch mehr) Quellen, die überprüft werden müssen, bevor ein neues Gerät hinzugefügt wird:

- Alexa smarthome API: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex-API: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google API: https://developers.google.com/assistant/smarthome/guides

Zusätzlich kann es nützlich sein, das vorhandene Gerät in einem Adapter zu überprüfen.

Nehmen wir als Beispiel die Klimaanlage. Wir haben:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex hat das umfassendste Bild der Staaten, daher wäre es vernünftig, es als Grundlage zu nehmen.
Wir konnten sehen, dass es für den Thermostatmodus und für die Schwenkposition keine Rollen in der Dokumentation gibt.

Also werden wir es hier hinzufügen: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

Alle anderen Zustände (Leistung, eingestellte Temperatur) sind noch vorhanden.

## Typdetektor
Nachdem alle erforderlichen Rollen hinzugefügt wurden, muss der Typdetektor erweitert werden.
Fügen Sie der globalen Liste einen neuen Gerätetyp hinzu: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Nehmen Sie ein Gerät als Grundlage und kopieren Sie es in die `patterns` von die Klasse `ChannelDetector`.
Der Typdetektor muss irgendwie zwischen Geräten unterscheiden, sodass Ihr Gerät eindeutige Rollen haben muss.
Wir nehmen `level.temperature` und `level.mode.thermostat` als spezifisches Muster für Klimaanlagen und markieren diese beiden Zustände als `required`.
Die meisten komplexen Geräte müssen ganz oben in der Liste stehen, damit sie zuerst erkannt werden und am Ende immer einfachere Geräte.

Sie müssen eine neue Version des Pakets `iobroker.type-detector` npm erstellen.

 ## iobroker.devices
Gehen Sie zu https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json und aktualisieren Sie dort Ihre Version.
Danach erweitern Sie die Liste des Symbols: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

 Und erstellen Sie auch eine neue Version.