![Logo](admin/radio.svg)
# ioBroker.frontier_silicon

[![NPM version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)](https://www.npmjs.com/package/iobroker.frontier_silicon)
[![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)](https://www.npmjs.com/package/iobroker.frontier_silicon)
![Number of Installations (latest)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/frontier_silicon-stable.svg)
[![Dependency Status](https://img.shields.io/david/halloamt/iobroker.frontier_silicon.svg)](https://david-dm.org/halloamt/iobroker.frontier_silicon)
[![Known Vulnerabilities](https://snyk.io/test/github/halloamt/ioBroker.frontier_silicon/badge.svg)](https://snyk.io/test/github/halloamt/ioBroker.frontier_silicon)

[![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)](https://nodei.co/npm/iobroker.frontier_silicon/)

**Tests:** ![Test and Release](https://github.com/halloamt/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg) [![Build Status](https://travis-ci.org/halloamt/ioBroker.frontier_silicon.svg?branch=master)](https://travis-ci.org/halloamt/ioBroker.frontier_silicon)

## frontier_silicon adapter for ioBroker

Provides support for media players equipped with a Frontier Silicon chipset using FSAPI.

## Features

PRs and contructive criticism are always welcome.

### Implemented features

- Power control
- Mode selection
- Preset selection
- Notifications for several states
- Volume control
- Notifications

### Planned features

- Auto discovery
- More states
- Translations
- More Exception handling
- Cleaner code
- Multi room features

### Not planned features

- Changing system information

### Known Bugs

- Media player must be on for preset discovery
- No notifies after some time

## Documentation

This adapter lets you control internet radios and media playsers based on Frontier Silicon chipsets. Many devices which can be controlled via [Undok](https://www.frontiersmart.com/undok) should work. Tested devices come from [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp) and [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/), others should work, too.

After installation the device's IP and PIN must be entered in the configuration dialog. If the radio does not play DAB after switching on via Undok or this adapter try with "DAB starts without sound" enabled.

When the adapter starts for the first time it collects information about the device. For that it needs to switch through all modes. During checking settings the device will be muted for a few seconds to avoid disturbing sounds.

While the adapter reads the device's setting objects and states are created. States can be read-only (`ro`) or read-write (`rw`) *ok, write-only for buttons is also possible*.

- audio

  Basic audio settings. No equalizer controls implemented yet.

  - maxVolume (`number, ro`)

    The maximum volume selectable

  - mute (`boolean, rw`)

    `true` if the device is muted, `false`otherwise

  - volume (`number, rw`)
  - control
    - volumeDown and volumeUp
	
	  In-/ or decreases volume by 1

- device

  - friendlyName (`text, rw`)
  - power (`boolean, rw`)
  - radioId (`test, ro`)

    My guess is that this is the MAC of the device

  - version (`text, ro`)

    Software version

  - webfsapi (`text, ro`)

    The address of the API

- info

  - connection (`boolean, ro`)

    Connection indicator for the adapter

- media

  - state (`number, rw`)

    valid values are:
    - 0: Pause
    - 1: Play

  - control

    - next
    - plause
    - play
    - previous

  Do not take the following names too seriously. The radio uses them differently in different modes.

  - album (`text, ro`)
  - artist (`text, ro`)
  - graphic (`text, ro`)

    Use this URL to get an album cover or a station's logo.

  - name (`text, ro`)
  - text (`text, ro`)
  - title (`text, ro`)

- modes

  - readPresets

    Re-reads all presets

  - selectPreset (`number, rw`)

    Used to get or select a preset. Be warned that the adapter guesses as this value cannot be read from the API.

  - selected (`number, rw`)

    Indicates or selects the selected mode. Can also be selected via `modes.{number}.switchTo`

  - `{number}`

    - id (`text, ro`)
    
      The name of that mode

    - key (`number, ro`)

      The index of that mode. Equals `mode.{number}` from object tree and can be written into `modes.selected`.
      
    - selectable (`boolean, ro`)
      
      `true` if this mode can be manually selected.
      
    - streamable (`boolean, ro`)
      
      Only present on multi-room enabled devices. `true` if this mode can be used as source for several multi-room devices.
  
    - switchTo
      
      Selects that mode.
	    
    - presets
      
      - availabe (`boolean, ro`)

        Indicates whether presets for this mode are available
      
      - `{number}`

        The index of that preset. Equals `mode.*.presets.{number}.key`.

        - key
	
          The index of that preset. Equals `mode.*.presets.{number}` from object tree and can be written into `modes.selectPreset`.
	
        - name (`text, ro`)

          The name of that preset
	    
        - switchTo

          Selects that preset and the corresponding mode.

Please be aware that you can sometimes choose between "pushing a button" or "setting a value". Use what is more convenient for you.

## Changelog
### 0.0.10 (2020-11-29)
* Übersetzungen

### 0.0.9
* (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.
* (halloamt) Nicer readme
* (halloamt) (Hopefully) more robust session handling.
* (halloamt) Long polling should work more reliably
* (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8
* (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6
* (halloamt) Nothing really, small stuff for npm

### 0.0.5
* (halloamt) Media state controls
* (halloamt) Bugfixes

### 0.0.4
* (halloamt) Media and volume control buttons
* (halloamt) Bugfixes

### 0.0.3
* (halloamt) Get notifications from the radio
* (halloamt) Change volume / mute

### 0.0.1
* (halloamt) initial release
* (halloamt) Change mode
* (halloamt) Select Preset

<details>
<summary>Developer Manual</summary>
## Developer manual
This section is intended for the developer. It can be deleted later

### Getting started

You are almost done, only a few steps left:
1. Create a new repository on GitHub with the name `ioBroker.frontier_silicon`

1. Push all files to the GitHub repo. The creator has already set up the local repository for you:  
	```bash
	git push origin master
	```
1. Add a new secret under https://github.com/halloamt/ioBroker.frontier_silicon/settings/secrets. It must be named `AUTO_MERGE_TOKEN` and contain a personal access token with push access to the repository, e.g. yours. You can create a new token under https://github.com/settings/tokens.

1. Head over to [main.js](main.js) and start programming!

### Best Practices
We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`
Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description                                              |
|-------------|----------------------------------------------------------|
| `test:js`   | Executes the tests you defined in `*.test.js` files.     |
| `test:package`    | Ensures your `package.json` and `io-package.json` are valid. |
| `test` | Performs a minimal test run on package files and your tests. |
| `lint` | Runs `ESLint` to check your code for formatting errors and potential bugs. |

### Writing tests
When done right, testing code is invaluable, because it gives you the 
confidence to change your code while knowing exactly if and when 
something breaks. A good read on the topic of test-driven development 
is https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92. 
Although writing tests before the code might seem strange at first, but it has very 
clear upsides.

The template provides you with basic tests for the adapter startup and package files.
It is recommended that you add your own tests into the mix.

### Publishing the adapter
Since you have chosen GitHub Actions as your CI service, you can 
enable automatic releases on npm whenever you push a new git tag that matches the form 
`v<major>.<minor>.<patch>`. The necessary steps are described in `.github/workflows/test-and-release.yml`.

To get your adapter released in ioBroker, please refer to the documentation 
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
1. Overwrite the changed files in the adapter directory (`/opt/iobroker/node_modules/iobroker.frontier_silicon`)
1. Execute `iobroker upload frontier_silicon` on the ioBroker host
</details>

## License
MIT License

Copyright (c) 2020 halloamt <iobroker@halloserv.de>

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
