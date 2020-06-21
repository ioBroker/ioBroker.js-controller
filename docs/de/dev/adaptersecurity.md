---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptersecurity.md
title: Sicherheitsbezogene Funktionen für Adapterentwickler
hash: X2HcDsT5TE/W4x20hMFpAqHF23iMYbOPyEK6TXNkyG4=
---
# Sicherheitsrelevante Funktionen für Adapterentwickler
## Verhindern Sie den Zugriff anderer Adapter auf vertrauliche Daten
Wenn Sie ein Benutzerkennwort oder ein Token speichern müssen, mit dem Benutzer auf den von Ihnen bereitgestellten Dienst zugreifen können, liegt es möglicherweise im Interesse des Benutzers, dass ausländische Adapter nicht auf diese Informationen zugreifen können.
Dazu können Sie Ihrer `io-package.json` Datei ein Feld `protectedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des Adapters gespeichert sind, das geschützt werden soll.

Beachten Sie, dass der Admin-Adapter immer Zugriff auf geschützte Attribute hat, damit Benutzer Attribute auf der eigenen Konfigurationsseite des Adapters lesen und geschützte Felder in `system.adapter.<namepsace>.<instance>` manuell bearbeiten können.

__Beispiel__:

```json
...
"protectedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Vertrauliche Daten automatisch verschlüsseln und entschlüsseln
Wenn Sie ein Benutzerkennwort oder ein Token speichern müssen, mit dem Benutzer auf den von Ihnen bereitgestellten Dienst zugreifen können, liegt es möglicherweise im Interesse des Benutzers, dass diese vertraulichen Informationen nicht im Klartext gespeichert werden.
Dazu können Sie Ihrer `io-package.json` Datei ein Feld `encryptedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des Adapters gespeichert sind. Diese werden verschlüsselt gespeichert und zur Laufzeit des Adapters automatisch entschlüsselt.

Immer wenn der aktuell verwendete Verschlüsselungsalgorithmus unsicher wird, wird er im js-Controller geändert.

__ Derzeit verwendeter Verschlüsselungsalgorithmus__

- js-controller> = 3.0: `default`
- js-controller> = 3.2: "aes-192-cbc"

Beachten Sie, dass für diese Funktion mindestens js-controller 3.0.0 erforderlich ist.

__Beispiel__:

```json
...
"encryptedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Vertrauliche Daten manuell verschlüsseln und entschlüsseln
Wir bieten auch Adaptermethoden zum manuellen Verschlüsseln von Daten in Ihrem Code.
Hierzu können Sie die Methoden `adapter.encrypt` und `adapter.decrypt` verwenden. Der für die Ver- und Entschlüsselung verwendete Schlüssel ist das systemweit eindeutige Geheimnis der Benutzerinstallation. Wenn Sie Ihren eigenen Schlüssel (192-Bit-Hex) für die Verschlüsselung verwenden möchten, können Sie dies tun, indem Sie ein zweites Argument an die Methoden `encrypt` und `decrypt` übergeben.

__Beispiel__:

```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent);
// decryptedContent === 'super secret message'

// Or use your own key (24 byte Hex) for encryption
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedContent = adapter.encrypt(key, 'super secret message');
const decryptedContent = adapter.decrypt(key, encryptedContent);
// decryptedContent === 'super secret message'
```