---
title: Publish
lastChanged: 21.01.2020
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterpublish.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: iLFFwmHGGEvoX1jzWG4/Zs7xSpudVBvxMEzm9P5Qcps=
---
# Publish an adapter
Before thinking about publishing an adapter, it should be offered for testing in [Forum test thread](https://forum.iobroker.net/category/91/tester).
If the tests are successful and the adapter is stable, it should initially be included in the latest repository.

If the adapter runs stable on a certain version number, it can be transferred to the stable repository. This requires the developer's own assessment in conjunction with the user feedback.

*** Further current requirements can be found here: *** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

## Latest Repository Requirements
0.Use [https://adapter-check.iobroker.in/[(https://adapter-check.iobroker.in/) to test the adapter repo.

1. The adapter's github repository should have a capital B in ioBroker, while it must be lowercase in the package.json, since `` npm '' does not allow capital letters.

2. The title in the io-package.json should not contain the word `` ioBroker '' or the word `` adapter ''.

3.The `` title '' attribute in the io-package.json (common) is the short name of the adapter in English. While `` titleLang '' contains the translations of the `` title '' attribute. (the extension Lang stands for languages)

4. The adapter should contain instructions in the form of a README.md file. This should at least be available in the English language. Other languages are also welcome. This [example] (https://github.com/foxriver76/ioBroker.denon) can serve as a suggestion.

5. The adapter requires a license. Both in the io-package.json and a separate [file] (https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) in the Github repository.

   Example for io-package.json:

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6. The `www` directory and the` widget` directory should be deleted when not in use.

7. In the io-package.json a `type` attribute should be created under common. For this purpose, the best fitting category should be specified from this [list] (# adapter categories).

8. In the io-package.json the `connectionType` and` dataSource` attributes should be created under common. For this purpose, the best fitting connection category should be specified from this [list] (# adapter connection type).

9. The states created by the adapter should have valid information for their [roles] (https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles) `role` under common ,

The use of the role `state` should be avoided.

10. The adapter should both use the testing specified in the template. For this purpose, the Github account can be linked to Appveyor (Windows tests) and Travis CI (Linux and Mac OS tests) and the corresponding repository can be registered for testing.

These two continuous integration tools have proven to be suitable for the ioBroker project and are free of charge for public Github repositories.

The developer can gladly extend the scope of tests.

11. In the io-package.json at least one entry under common for the attribute `authors` must be made.

The attribute `author` in the package.json must also be filled out.
Optionally, several authors can also be saved for npm by using the attribute `contributors` in the package.json.

12. The adapter must be available as an npm package. More information can be found [here] (https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm).

13. The ioBroker organization must be added on npm. This is necessary to enable long-term maintenance of the package, even if the developer can no longer maintain the package due to time or other reasons.

More information can be found in [here](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet).

## Requirements for the stable repository
1. The adapter was successfully added to the latest repository
2. There is a [Forum Test Thread] (https://forum.iobroker.net/viewforum.php?f=36) for the adapter, in which user feedback has already been given.
3. A discovery function should be implemented. This is a function in the [Discovery Adapter] (https://github.com/ioBroker/ioBroker.discovery),

to automatically recognize whether the user can use an instance of the adapter.
To do this, a pull request must be made in the repository of [Discovery adapters](https://github.com/ioBroker/ioBroker.discovery).

## Add the adapter to the official repository
1. The [official Github Repository] (https://github.com/ioBroker/ioBroker.repositories) should be visited and a pull request should be made with the following content, depending on the repository.

2. Please arrange the adapter correctly alphabetically between the existing adapters.

3. A version number must be declared when it is added to the stable repository. This must be updated when the adapter is further developed.

4. The adapter should define a list attribute `docs` in the io-package.json, stating where instructions can be found in the respective language.

The language is specified as the key and the path to the markdown file as the value.
English instructions are required (in an emergency, reference can be made to the standard README). A German manual is also desirable, since a majority of users speak German, but this is optional.
Detailed instructions can save the developer a lot of time in the forum.
An example can be found in [here](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md).

   Example:

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
The `sources-dist.json` file must be edited:

Example:

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

The `published` date represents the date of the first publication and should not be changed.

### Stable
The `sources-dist-stable.json` file must be edited:

Example:

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "version": "2.0.7",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

The `published` date represents the date of the first publication and should not be changed.

## Management of adapter versions
The current version number of the adapter is given in both the io-package.json and the package.json.
The two specifications must match. The version number is separated into three parts by two dots.

```json
"version": "1.7.6"
```

The first part (from left to right) represents the `Major Part`, the second part the `minor` Part and the last part the `micro` Part.
The version numbers should be increased according to the following list:

- **micro** Only bugs were fixed
- **minor** Features have been added, but the version is compatible with previous versions
- **major** Major changes which make backward compatibility with the old version no longer possible

The `news` attribute should also be maintained in the io-package.json.
This enables users to install any version listed (provided that it has been published on npm) via the admin interface.
The version number and the changes should be stored here.
The changes can be documented for each supported language, at least in English.

Example:

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

## Adapter categories
- `alarm` - security systems
- `climate-control` - air conditioners, air filters, heaters and more
- `communication` - data provision for other adapters, e.g. B. via REST
- `date-and-time` - e.g. B. Calendar
- `energy` - power monitoring, solar systems, inverters and much more.
- `metering` - other measuring systems (e.g. water, gas, oil)
- `garden` - e.g. B. lawn mowers, sprinkler systems
- `general` - General adapters like Admin, Web, Discovery
- `geoposition` - geolocation of objects or people
- `hardware` - Different multifunction hardware like Arduino, ESP, Bluetooth, ...
- `health` - blood pressure, heartbeat, body weight, ...
- `household` - kitchen appliances, vacuum cleaners, etc.
- `infrastructure` - network, NAS, printers, telephones
- `iot-systems` - Other smart home systems (hardware & software)
- `lighting` - lighting
- `logic` - rules, scripts, parsers, etc.
- `messaging` - adapter for sending and receiving messages e.g. B. via email, telegram, ...
- `misc-data` - export and import of data, currency converter etc.
- `multimedia` - TV, AVR, boxes, voice assistants etc.
- `network` - ping, network detection, UPnP, ...
- `protocols` - communication protocols, e.g. B. MQTT
- `storage` - logging, data storage e.g. B. relational databases, ...
- `utility` - supporting adapters such as B. Backup
- `vehicle` - cars
- `visualization` - visualization adapter, such as vis etc.
- `visualization-icons` - icons for visualizations
- `visualization-widgets` - iobroker.vis widgets
- `weather` - weather information, air quality, environmental information

## Adapter connection type
Define `connectionType` in `common` part of `io-package.json` as:

- `local` - Provides direct communication with the device or hub.
- `cloud` - The integration of this device takes place via the cloud and requires an active internet connection

Define `dataSource` in `common` as:

- `poll` - Polling the status means that an update may be noticed later.
- `push` - ioBroker will be notified as soon as a new status is available.
- `assumption` - The status of the device cannot be determined. ioBroker takes status based on last ioBroker command.