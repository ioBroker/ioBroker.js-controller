---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: dVXCMS4hRnlunf2m9mBAnmT6hOBkbisQm9521M0eSAg=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Статус зависимости](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Известные уязвимости](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Адаптер vis-material-advanced для ioBroker
Этот адаптер предоставляет стандартизированные виджеты для vis в ioBroker. Множество различных предопределенных виджетов

Основы этого адаптера были созданы:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (пикс ---) https://github.com/Pix---/ioBroker.vis-material

но переписан на 90%

Добавлено несколько исправлений и множество новых виджетов.

## Внимание, старые виджеты (<0.5.0 будут немного испорчены)
вы можете восстановить их вручную в vis или экспортировать, отредактировать и снова импортировать.
для руководства: замените «opacity-color»: «opac- <somecolor>» на «opacity-color»: «<somecolor>». замените colorizeByTemp на colorizeByValue

    Пример из sigi234 (example.json) и мой example2.json есть в github для всех, кто хочет их протестировать

    Приносим извинения за неудобства, но эти изменения были необходимы, чтобы код оставался чистым и понятным.

    это больше не должно происходить очень часто :)

## Сейчас присутствуют следующие виджеты:
### Ток
 - температура
 - влажность
 - дверь
 - Окно
 - Занятие
 - Объем
 - Затвор
 - Свет
 - Диммер
 - Световая температура
 - логический

### В ходе выполнения
еще не окончательно:

 - Гаражная дверь
 - Радио станция

 много виджетов еще в планах

## Параметры
    В большинстве виджетов доступны следующие параметры:

    - цвет текста
    - значок шнура (пока не везде имеет смысл, например диммер)
    - цвет непрозрачности (стандартный цвет непрозрачности)
    - colorizeByValue (в зависимости от некоторых значений цвет непрозрачности может быть изменен, например, если он слишком горячий, сделайте его красным, на холодный синий)
    - ниже, выше, мин., макс. (значения для colorieByValue)
    - цвет низкий / высокий, средний ... (цвет, который будет использоваться, если граница приподнята)
    - только для чтения (некоторые виджеты можно установить в режим только для чтения только для отображения)

### Начиная
установите адаптер и запустите VIS в режиме редактирования.
Слева выберите vis-material-adapter, и все виджеты будут показаны в предварительном просмотре.

............. многие документы отсутствуют ......................

** вы можете импортировать файл example.json в vis ** благодаря @ sigi234

## Changelog

### 0.5.6
* type in volume

### 0.5.5
* no icons anymore for text and number

### 0.5.2
* removed (obsolete) class which caused Problems in other widgets
* added possibility to change the icons for the widgets ( except dimmer )

### 0.5.1
* some icons resized
* bugfix: all widgets have now default background-color #121212 but can be changed in settings.
* reorganized the settings to have some common order
* new Number and Text Widget ( similar to boolean )


### 0.5.0
* opacity now flexible
* reorg code

### 0.4.8
* bugfix alter pfade
* neues Valve Widget für Thermostate

### 0.4.3
* neues Boolean widget

### 0.4.2
* keine Änderungen, nur ein Label für Latest repository

### 0.3.5
* opacity kann beim Luftdruck frei geählt werden. Erstmal nur um es testen zu können

### 0.3.4
* Folgende Readonly Widgets: Light,LightDim,LightTemperature,Volume,Shutter

### 0.3.2
* npm ist erstellt, Pull Request für latest Repo gestellt
* volume widget hinzugrfügt
* erste Version vom Garagentor Widget ist erstellt, infos fehlen noch
* migration von vis-material zu vis-material-advanced ist bestätigt 
    Wer es sich traut, hier eine "Anleitung" für den Umzug:

    In vis alle widgets markieren und dann auf widgets exportieren klicken.

    Im Editor öffnen und folgende 2 "Suchen und ersetzen" ausführen:

    suchen: widgets/material
    ersetzen: widgets/vis-material-advanced

    suchen: "widgetSet": "material"
    ersetzen: "widgetSet": "vis-material-advanced"

    wieder importieren in vis.

### 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
### 0.0.1
* (EdgarM73) initial release


### Best Practices
We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`
Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description                                              |
|-------------|----------------------------------------------------------|
| `test:package`    | Ensures your `package.json` and `io-package.json` are valid. |
| `test` | Performs a minimal test run on package files. |

### Publishing the widget
Since you have chosen GitHub Actions as your CI service, you can 
enable automatic releases on npm whenever you push a new git tag that matches the form 
`v<major>.<minor>.<patch>`. The necessary steps are described in `.github/workflows/test-and-release.yml`.

To get your widget released in ioBroker, please refer to the documentation 
of [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Test the adapter manually on a local ioBroker installation
In order to install the adapter locally without publishing, the following steps are recommended:
1. Create a tarball from your dev directory:  
    ```bash
    npm pack
    ```
1. Upload the resulting file to your ioBroker host
1. Install it locally (The paths are different on Windows):
    ```bash
    cd /opt/iobroker
    npm i /path/to/tarball.tgz
    ```

For later updates, the above procedure is not necessary. Just do the following:
1. Overwrite the changed files in the adapter directory (`/opt/iobroker/node_modules/iobroker.vis-material-advanced`)
1. Execute `iobroker upload vis-material-advanced` on the ioBroker host

## Changelog

### 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
### 0.0.1
* (EdgarM73) initial release

## License
MIT License

Copyright (c) 2020 EdgarM73 <edgar.miller@gmail.com>

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