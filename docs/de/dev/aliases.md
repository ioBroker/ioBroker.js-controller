---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/aliases.md
title: Aliase
hash: NWUy6T4dxNPqgj/4GIA3p697eSGnvkF0Twd3+v0eRmg=
---
# Aliase
Aliase (Pseudonyme) sind die virtuellen Zustandsobjekte, die mit realen Zuständen verknüpft sind.

## Anwendungsfälle
Oft sind die realen Geräte defekt und der Benutzer muss dieses Gerät austauschen.
Zusätzlich dazu, dass die Hardware ausgetauscht wird, wird die Adresse dieses Geräts geändert. Z.B. von `hm-rpc.0.ABC123` bis `hm-rpc.0.QJU978`.

Da die alte Adresse an vielen Stellen wie vis, Javascript, Szenen oder anderen verwendet wurde, muss der Benutzer nun alle diese Stellen finden und dort ersetzen.

Diese Funktion ermöglicht es dem Benutzer, einen Alias für ein physisches Gerät zuzuweisen und diesen Alias in allen Fällen zu verwenden.
Da das Gerät ausgetauscht werden muss, darf die ID nur im Alias geändert werden.

Ein weiterer Anwendungsfall für diese Funktion ist die Unterstützung von Geräten in speziellen intelligenten Adaptern wie iot oder material.
Mit Hilfe von Aliasen konnte die erforderliche Statusstruktur erstellt werden, die Werte werden jedoch von physischen Geräten gelesen.

## Erklärung
Alle Zustände, die im Objektnamensraum `alias.0` angelegt werden, werden als Aliase verwaltet.

Der Statuswert des Alias wird aus dem verknüpften Status (Ziel) gelesen, aber Objektwerte (wie common, native) werden selbst aus dem Alias-Status gelesen.

Tatsächlich spiegelt ein `alias`-Objekt den Statuswert des Zielobjekts.
Falls zulässig, können beide Status geändert werden und werden vom ioBroker-Kernsystem automatisch synchronisiert.
Beide Zustände können auch zum Abonnieren von Skripten verwendet werden und sollten sich genau gleich verhalten.

Hier ist ein Beispiel für ein solches Objekt:

```
{
  "_id": "alias.0.Light.Device_1.WORKING",
  "type": "state",
  "common": {
    "alias": {
      "id": "admin.0.connected"
    },
    "name": "WORKING",
    "role": "indicator.working",
    "type": "boolean"
  },
  "native": {}
}
```

`native` ist immer leer, da sich kein Gerät hinter dem Alias befindet und alle Einstellungen in `common` gespeichert werden.

In der `common.alias.id` ist jedoch die ID gespeichert, in die der Zustandswert eingelesen oder eingeschrieben werden muss.

Alias konvertiert den Wert automatisch, wenn Min / Max-Einstellungen für beide Objekte (Alias und Ziel) definiert sind.

Z.B. Wenn der Alias `min=0,max=100` und das Ziel `min=0,max=255` hat, wird beim Lesen der Wert 10 aus dem Zielstatus in 3,9215686274509802 konvertiert und der in den Alias 10 geschriebene Wert wird in 25,5 konvertiert.

Die Typen werden ebenfalls automatisch konvertiert. Von string zu number, von number zu boolean und so weiter. Hängt von den Alias- und Zieltypen ab.

Zusätzlich können die Schreib- und Lesefunktionen in `common.alias` definiert werden:

```
{
  "_id": "alias.0.Temperature.SET",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786878.value",
      "write": "(val * 9/5) + 32",
      "read": "(val − 32) * 5/9"
    },
    "unit": "°C",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

und

```
{
  "_id": "knx.0.6786878.value",
  "type": "state",
  "common": {
    "unit": "°F",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

Wenn Konvertierungsfunktionen definiert sind, wird die automatische Konvertierung deaktiviert. Für Nur-Lese-Funktionen könnte die Schreibfunktion weggelassen werden, entsprechend für Nur-Schreiben-Funktionen - die Lesefunktion.

Z.B.

```
{
  "_id": "alias.0.button",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786879.value",
      "write": "val ? 1 : 0"
    },
    "name": "Button",
    "role": "button",
    "type": "boolean"
  },
  "native": {}
}
```

und

```
{
  "_id": "knx.0.6786879.value",
  "type": "state",
  "common": {
    "name": "KNX Switch",
    "role": "value",
    "type": "number",
    "min": 0,
    "max": 1
  },
  "native": {}
}
```

Die Abonnements werden automatisch verwaltet. Wenn ein Alias abonniert wird, wird auch die Ziel-ID abonniert.

Die ID des Zielgeräts kann dynamisch (über den Administrator) geändert werden, und das Abonnement wird für eine neue Ziel-ID aktualisiert.