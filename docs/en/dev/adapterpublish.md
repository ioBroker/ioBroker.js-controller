---
title: Development - Publishing adapters
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterpublish.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: dwTMQkRGPU/TgOfkndd1Y2lo5lmjAaxCsDaLBue6p3k=
---
# Publish an adapter
Before considering publishing an adapter, it should be offered for testing in [Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36). If the tests are successful and the adapter is stable, it should first be included in the Latest Repository. <br/><br/> Should the adapter run stably on a certain version number, it may be transferred to the stable repository. For this, the developer&#39;s own estimation in interaction with the user feedback is required.

## Requirements for the Latest Repository
1. The github repository of the adapter should have a big B in ioBroker while it's small in the package.json

must be written, because ``npm`` does not allow uppercase letters.

2. The title in the io-package.json should not contain the word ``ioBroker`` und nicht das Wort ``Adapter``.

3. The ``title`` Attribut in der io-package.json (common) ist der Kurzname des Adapters auf Englisch. Während ``titleLang``

contain the translations of the ``title`` attribute. (the extension Lang stands for languages)

4. The adapter should contain instructions in the form of a README.md file. This should at least be in the English language

be available. In addition, other languages are welcome. This §§LLLL_0§§ can serve as a suggestion.

5. The adapter requires a license. Both in the io-package.json as well as a separate one

[file](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) in the Github repository.

   Example of io-package.json:

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6. The ``www`` Verzeichnis sowie das ``widget`` directory should be deleted when not in use.

7. In the io-package.json a ``type`` attribute should be created under common. For this purpose should from this

§§LLLL_0§§ the best suitable category are specified.

8. The states created by the adapter should be valid for their

[roll](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles) ``role`` have common.
The use of the role `state` should be avoided.

9. The adapter should use both the testing specified in the template. This can be done using the Github account with Appveyor

(Windows tests) and Travis CI (Linux and Mac OS tests) linked and the corresponding repository for testing are logged. These two Continious Integration Tools have proven to be suitable for the ioBroker project and are free for public Github repositories. <br/><br/> The test scope can be extended by the developer.

10. In the io-package.json at least one specification must be made under common for the attribute `authors`. Likewise

the attribute `author` must be filled out in the package.json. Optionally, several authors can be stored for npm by using the attribute `contributors` in package.json.

11. The adapter must be available as npm package. More information can

§§LLLL_0§§ are found.

12. The ioBroker organization needs to be added to npm. This is necessary to allow long-term maintenance of the package

even if the developer can not wait for the package due to time or other reasons. Further information can be found [here](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet).

## Requirements for the stable repository
1. The adapter has been successfully added to the Latest Repository
2. There is a [Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36) for the adapter, in which already

User feedback was given.

3. A discovery function should be implemented. This is a function in the

[Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery) to automatically detect if the user can use an instance of the adapter. To do this, a pull request must be placed on the repository of [Discovery Adapters](https://github.com/ioBroker/ioBroker.discovery).

## Add the adapter to the official repository
1. The §§LLLL_0§§ should be visited

and a pull request with the following content, depending on the repository.

2. Please arrange the adapter alphabetically correct, between the existing adapters.

3. Upon inclusion in the stable repository, a version number must be declared. This is under development

of the adapter.

4. The adapter should set a list attribute `docs` in the io-package.json, where where a guide

can be found in the respective language. The key is the language and as value the path to the markdown file.
English instructions are required (in case of emergency, reference can be made to the standard README). Likewise, a German manual is desirable because a majority of users speak German, but this is optional.
A detailed guide, the developer can save a lot of time in the forum. An example can be found [here](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md).

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
The file `sources-dist.json` must be edited:

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
The file `sources-dist-stable.json` must be edited:

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

## Administration of adapter versions
The current version number of the adapter is specified both in the io-package.json and in the package.json. The two details must match. The version number is separated into three parts by two dots.

```json
"version": "1.7.6"
```

The first part (from left to right) represents the `Major Part`, the second part the `minor` Part and the last the `micro` Part. The version numbers should be increased according to the following list:

- **micro** Only bugs were fixed
- **minor** Features have been added, but the version is compatible with previous versions
- **major** Big changes, through which, the backward compatibility to old version is no longer given

The `news` attribute should also be maintained in the io-package.json. This allows users to install any listed version (assuming that it has been released on npm) through the admin interface.
Here the version number as well as the changes should be deposited. The changes can be documented for any supported language, at least in English.

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
- **alarm** - security systems
- **climate-control** - air conditioners, air filters, heaters and more
- **communication** - Data provision for other adapters, eg. B. by REST
- **Date-and-time** - z. Eg calendar
- **energy** - current monitoring, solar systems, inverters and much more.
- **metering** - Additional measuring systems (eg water, gas, oil)
- **garden** - z. As lawnmowers, sprinkler systems
- **general** - General adapters like Admin, Web, Discovery
- **geoposition** - geolocation of objects or persons
- **Hardware** - Different multifunctional hardware like Arduino, ESP, Bluetooth, ...
- **household** - kitchen appliances, vacuum cleaners, etc.
- **infrastructure** - network, NAS, printers, phones
- **iot-systems** - Other Smart Home Systems (Hard- & Software)
- **lighting** - lighting
- **logic** - rules, scripts, parsers, etc.
- **messaging** - Adapter for sending and receiving messages eg. Eg via e-mail, telegram, ...
- **misc-data** - export and import of data, currency converter etc.
- **multimedia** - TV, AVR, speakers, voice assistants, etc.
- **network** - Ping, network discovery, UPnP, ...
- **protocols** - communication protocols, eg. B. MQTT
- **storage** - logging, data storage z. Eg relational databases, ...
- **utility** - Supporting adapters such. Eg backup
- **visualization** - visualization adapter, such as vis etc.
- **visualization-icons** - icons for visualizations
- **visualization-widgets** - iobroker.vis widgets
- **weather** - weather information, air quality, environmental information

?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.