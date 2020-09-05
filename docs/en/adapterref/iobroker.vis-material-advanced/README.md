![Logo](admin/vis-material-advanced.png)
# ioBroker.vis-material-advanced

[![NPM version](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)](https://www.npmjs.com/package/iobroker.vis-material-advanced)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)](https://www.npmjs.com/package/iobroker.vis-material-advanced)
![Number of Installations (latest)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
[![Dependency Status](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)](https://david-dm.org/EdgarM73/iobroker.vis-material-advanced)
[![Known Vulnerabilities](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced)

[![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)](https://nodei.co/npm/iobroker.vis-material-advanced/)

## vis-material-advanced adapter for ioBroker

This Adapter provides standardized Widgets for vis in ioBroker. Lots of different predifined widgets

the basics of this adapter has been created by :
* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

but rewritten in 90% 

Several bugfixes and lots of new widgets added 

## Attention, old widgets ( < 0.5.0 will be corrupted a little bit)
    you can repair them manually in vis or export them, edit them, and import them again.
    for manual : replace "opacity-color": "opac-<somecolor>" with "opacity-color": "<somecolor>". replace colorizeByTemp with colorizeByValue

    Example from sigi234 ( example.json ) and my example2.json are in the github for everybody who wants to test them

    Sorry for the inconveniance, but these changes were neccessary to keep code clean and understandable.

    this should not happen very often any more :)

## following widgets are present right now:

### current
 - Temperature
 - Humidity
 - Door
 - Window
 - Occupacy
 - Volume
 - Shutter
 - Light
 - Dimmer
 - Light-temperature
 - Boolean

### in progress
not yet final:
 - Garagedoor
 - Radiostation 


 lot of widgets still in plan

## Options
    following options are available in most of the widgets:
    
    - text-color
    - cord-icon ( does not yet make sense everywhere, e.g. dimmer )
    - opacity color ( the standard opacity color )
    - colorizeByValue ( depending on some values the opacity color can be changed e.g. if it is too hot make it red, to cold blue )
    - below,above, min, max ( the values for colorieByValue )
    - color-low/high,medium... ( the color to use if border is raised)
    - read-only ( some widgets can be set to read only mode for display only)


### Getting started

install the Adapter and start VIS in Edit mode.
On left side choose vis-material-adapter and than all widgets are shown in preview.

............. lots of docu missing ......................

**you can import the example.json file into vis**
thanks to @sigi234

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