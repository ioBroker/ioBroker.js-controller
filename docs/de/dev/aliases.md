---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/aliases.md
title: Alias
---
# Alias
Alias (Pseudonym) ist ein virtueller Datenpunkt, der mit einem realen Datenpunkt verknüpft ist.

## Anwendungsfälle
Oft sind die realen Geräte defekt und der Benutzer muss dieses Gerät austauschen.
Zusätzlich dazu, dass die Hardware ausgetauscht wird, wird die Adresse dieses Geräts geändert. Z.B. von `hm-rpc.0.ABC123` in `hm-rpc.0.QJU978`.

Da die alte Adresse an vielen Stellen wie vis, Javascript, Szenen oder anderen verwendet wurde, muss der Benutzer nun alle diese Stellen finden und dort ersetzen.

Diese Funktion ermöglicht es dem Benutzer, einen Alias für den Datenpunkt eines physisches Gerätes zuzuweisen und diesen Alias in allen Fällen zu verwenden.
Wenn das Gerät ausgetauscht werden muss, muss die ID nur im Alias geändert werden.

Ein weiterer Anwendungsfall für diese Funktion ist die Unterstützung von Geräten in speziellen intelligenten Adaptern wie iot oder material.
Mit Hilfe von Aliasen kann die erforderliche Statusstruktur erstellt werden, die Werte werden jedoch von physischen Geräten gelesen.

## Erklärung
Alle Datenpunkte, die im Objektnamensraum `alias.0` angelegt werden, werden als Alias-Datenpunkte verwaltet.

Der Wert des Alias wird aus dem verknüpften Datenpunkt (Ziel) gelesen, aber Objekteigenschaften (wie common, native) werden selbst aus dem Alias-Datenpunkt gelesen.

Tatsächlich spiegelt ein `alias`-Objekt den Wert des Zielobjekts.
Falls zulässig, können beide Werte geändert werden und werden vom ioBroker-Kernsystem automatisch synchronisiert.
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

In der `common.alias.id` ist die ID des Datenpunktes gespeichert, dessen Wert eingelesen oder eingeschrieben werden muss.

Alias konvertiert den Wert automatisch, wenn Min / Max-Einstellungen für beide Objekte (Alias und Ziel) definiert sind.

Z.B. Wenn der Alias `min=0,max=100` und das Ziel `min=0,max=255` hat, wird beim Lesen der Wert 10 aus dem Zielstatus in 3,9215686274509802 konvertiert und der in den Alias 10 geschriebene Wert wird in 25,5 konvertiert.

Die Typen werden ebenfalls automatisch konvertiert: Von string zu number, von number zu boolean und so weiter. Es hängt von den Alias- und Zieltypen ab.

Zusätzlich können Schreib- und Lesefunktionen in `common.alias` definiert werden:

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

Ziel

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

Ziel

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

Seit Version 3.0 des js-controllers können getrennte Status- und Kommando-Datenpunkte im Alias zusammengeführt werden:
* alias.id.write enthält die ID des Datenpunktes, der gesetzt wird, wenn der Alias geschrieben wird
* alias.id.read enthält die ID des Datenpunktes, der durch den Alias gespiegelt wird
```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: {
                read: 'state.id.to.read.from',
                write: 'state.id.to.write.to'
            }
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```

