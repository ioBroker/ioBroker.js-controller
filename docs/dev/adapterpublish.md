---
title:       "Entwicklung - Veröffentlichen von Adaptern"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/dev/adapterpublish.md"
---

# Veröffentlichen eines Adapters {docsify-ignore-all}
Bevor über das veröffentlichen eines Adapters nachgedacht wird, sollte dieser im
[Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36) zum testen angeboten werden. Sollten die Tests
erfolgreich verlaufen und der Adapter stabil laufen, sollte dieser vorerst in das Latest-Repository aufgenommen werden.
<br/><br/>
Sollte dar Adapter auf einer bestimmten Versionsnummer stabil laufen, darf dieser gerne in das Stable Repository
überführt werden. Hierzu ist die Eigeneinschätzung des Entwicklers im Zusammenspiel mit den Nutzerrückmeldungen gefragt.

## Anforderungen für das Latest Repository
1. Das Github Repository des Adapters sollte ein großes B in ioBroker haben, während es in der package.json klein
geschrieben sein muss, da ``npm`` keine Großbuchstaben zulässt.

2. Der Titel in der io-package.json sollte nicht das Wort ``ioBroker`` und nicht das Wort ``Adapter`` enthalten.

3. Das ``title`` Attribut in der io-package.json (common) ist der Kurzname des Adapters auf Englisch. Während ``titleLang``
die Übersetzungen des ``title`` Attributes enthalten. (die Erweiterung Lang steht für languages)

4. Der Adapter sollte eine Anleitung in Form einer README.md Datei enthalten. Diese sollte mindestens in der englsichen Sprache
verfügbar sein. Ergänzend sind andere Sprachen willkommen. Als Anregung kann dieses
[Beispiel](https://github.com/foxriver76/ioBroker.denon) dienen.

5. Der Adapter benötigt eine Lizenz. Sowohl in der io-package.json als auch eine separate
[Datei](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) im Github Repository.

   Beispiel für io-package.json:

   ```json
   {
     "common": {
         "license": "MIT"
     }
   }
   ```
6. Das ``www`` Verzeichnis sowie das ``widget`` Verzeichnis sollen bei Nichtnutzung gelöscht werden.

7. In der io-package.json sollte ein ``type`` Attribut unter common erstellt werden. Hierzu soll aus dieser
[Liste](#Adapterkategorien) die best passende Kategorie angegeben werden.

8. Die durch den Adapter erstellten States, sollten valide Angaben für ihre
[Rollen](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles) ``role`` unter common haben.
Das Nutzen der Rolle `state` sollte vermieden werden.

9. Der Adapter sollte sowohl das im Template vorgegebene Testing nutzen. Hierzu kann das Github Konto mit Appveyor
(Windows Tests) sowie Travis CI (Linux und Mac OS Tests) verknüpft und das entsprechende Repository für das Testing angemeldet werden.
Diese beiden Continious Integration Tools, haben sich für das ioBroker Projekt als geeignet erwiesen und sind für öffentliche Github
Repositories kostenfrei.
<br/><br/>
Gerne kann der Testumfang durch den Entwickler erweitert werden.

10. In der io-package.json muss mindestens eine Angabe unter common für das Attribut `authors` gemacht werden. Ebenfalls
muss das Attribute `author` in der package.json ausgefüllt sein. Optional können auch für npm mehrere Autoren hinterlegt werden,
indem in der package.json das Attribut `contributors` genutzt wird.

11. Der Adapter muss als npm Package verfügbar sein. Mehr Informationen können
[hier](https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm) gefunden werden.

12. Die ioBroker Organisation muss auf npm hinzugefügt werden. Dies ist nötig um eine langfristige Wartung des Paketes zu ermöglichen,
selbst wenn der Entwickler aus zeitlichen oder anderen Gründen das Paket nicht mehr warten kann. Nähere Informationen
können [hier](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet) gefunden werden.

## Anforderungen für das Stable Repository
1. Der Adapter wurde erfolgreich in das Latest Repository aufgenommen
2. Es gibt einen [Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36) für den Adapter, in welchem bereits
Nutzerfeedback gegeben wurde.
3. Eine Discovery Funktion sollte implementiert werden. Hierbei handelt es sich um eine Funktion im
[Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery),
 um automatisch zu erkennen ob der Nutzer eine Instanz des Adapters gebrauchen kann. Hierzu ist ein Pull Request auf dem
 Repository des [Discovery Adapters](https://github.com/ioBroker/ioBroker.discovery) zu stellen.

## Hinzufügen des Adapters zum offiziellen Repository
1. Das [offizielle Github Repository](https://github.com/ioBroker/ioBroker.repositories) sollte aufgesucht
werden und ein Pull Request mit folgendem Inhalt, je nach  Repository, gestellt werden.

2. Bitte den Adapter alphabetisch korrekt, zwischen den bestehenden Adaptern, anordnen.

3. Bei der Aufnahme in das Stable Repository muss eine Versionsnummer deklariert werden. Diese ist bei Weiterentwicklung
des Adapters zu aktualisieren.

4. Der Adapter sollte in der io-package.json ein Listenattribut `docs` festlegen, unter der Angabe wo eine Anleitung
in der jeweiligen Sprache zu finden ist. Als Key wird die Sprache angegeben und als Value der Pfad zur Markdown Datei.
Eine englische Anleitung ist Pflicht (im Notfall kann auf die Standard README verwiesen werden). Ebenfalls ist eine deutsche 
Anleitung wünschenswert, da ein Großteil der Nutzer deutsch spricht, jedoch ist dies optional. 
Eine ausführliche Anleitung, kann dem Entwickler viel Zeit im Forum ersparen. Ein Beispiel kann
[hier](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md) gefunden werden.

   Beispiel:
   ```json
   {
     "common": {
        "docs": {
            "de": "docs/de/README.md"
        }
     }
   }
   ```

### Latest

Die Datei `sources-dist.json` muss editiert werden:

Beispiel:
```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

Das `published` Datum stellt das Datum der Erstveröffentlichung dar und sollte nicht mehr geändert werden.

### Stable

Die Datei `sources-dist-stable.json` muss editiert werden:

Beispiel:
```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "version": "2.0.7",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

Das `published` Datum stellt das Datum der Erstveröffentlichung dar und sollte nicht mehr geändert werden.

## Verwaltung von Adapterversionen

Die aktuelle Versionsnummer des Adapters wird sowohl in der io-package.json als auch in der package.json angegeben. Die
beiden Angaben müssen übereinstimmen. Die Versionsnummer wird, durch zwei Punkte, in drei Teile separiert.

```json
"version": "1.7.6"
```

Wobei der erste Teil (von links nach rechts) den `Major Part` darstellt, der zweite Teil den `minor` Part und der Letzte
den `micro` Part. Die Versionsnummern sollten entsprechend folgender Liste erhöht werden:

- **micro**: Es wurden lediglich Fehler behoben
- **minor**: Es wurden Features hinzugefügt, jedoch ist die Version mit vorherigen Versionen kompatibel
- **major**: Große Änderungen, durch die, die Abwärtskompatibilität zu alten Version nicht mehr gegeben ist

Ebenfalls sollte in der io-package.json das `news` Attribut gepflegt werden. Dies ermöglicht es Nutzern jede aufgelistete
Version (unter der Voraussetzung, dass diese auf npm veröfefntlicht wurde) über die Admin-Oberfläche zu installieren.
Hierbei sollte die Versionsnummer sowie die Änderungen hinterlegt werden. Die Änderungen können für jede unterstütze 
Sprache dokumentiert werden, wobei diese mindestens auf Englisch angegeben sein sollten.

Beispiel:

```json
"news": {
    "1.7.6": {
        "en": "Configuration dialog was corrected",
        "de": "Konfigurationsdialog wurde korrigiert",
        "ru": "Диалог конфигурации был исправлен",
        "pt": "A caixa de diálogo de configuração foi corrigida",
        "nl": "Configuratiedialoog is gecorrigeerd",
        "fr": "La boîte de dialogue de configuration a été corrigée",
        "it": "La finestra di configurazione è stata corretta",
        "es": "Se corrigió el diálogo de configuración",
        "pl": "Okno dialogowe konfiguracji zostało poprawione"
    },
    "1.7.5": {
        "en": "The roles were tuned",
        "de": "Die Rollen waren abgestimmt",
        "ru": "Роли были настроены",
        "pt": "Os papéis foram afinados",
        "nl": "De rollen zijn afgestemd",
        "fr": "Les rôles ont été réglés",
        "it": "I ruoli erano sintonizzati",
        "es": "Los roles fueron sintonizados",
        "pl": "Role zostały dostrojone"
    }
}
```

## Adapterkategorien

- **alarm** - Sicherheitssysteme
- **climate-control** - Klimaanlagen, Luftfilter, Heizungen und mehr
- **communication** - Datenbereitstellung für andere Adapter, z. B. per REST
- **date-and-time** - z. B. Kalender
- **energy** - Stromüberwachung, Solaranlagen, Wechselrichter uvm.
- **metering** - Weitere Messsysteme (z. B. Wasser, Gas, Öl)
- **garden** - z. B. Rasenmäher, Sprinkleranlagen
- **general** - Generelle Adapter wie Admin, Web, Discovery
- **geoposition** - Geolokalisierung von Objekten oder Personen
- **hardware** - Unterschiedliche Multifunktionshardware wie Arduino, ESP, Bluetooth, ...
- **household** - Küchengeräte, Staubsauger, usw.
- **infrastructure** - Netzwerk, NAS, Drucker, Telefone
- **iot-systems** - Andere Smart Home Systeme (Hard- & Software)
- **lighting** - Beleuchtungen
- **logic** - Regeln, Skripte, Parser, usw.
- **messaging** - Adapter zum Senden und Empfangen von Nachrichten z. B. via E-Mail, Telegram, ...
- **misc-data** - Export und Import von Daten, Währungsrechner usw.
- **multimedia** - TV, AVR, Boxen, Sprachassistenten usw.
- **network** - Ping, Netzwerkerkennung, UPnP, ...
- **protocols** - Kommunikationsprotokolle, z. B. MQTT
- **storage** - Logging, Datenhaltung z. B. relationale Datenbanken, ...
- **utility** - Unterstützende Adapter wie z. B. Backup
- **visualization** - Visualisierungsadapter, wie vis usw.
- **visualization-icons** - Icons für Visualisierungen
- **visualization-widgets** - iobroker.vis Widgets
- **weather** - Wetterinformationen, Luftqualität, Umgebungsinformationen

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.
