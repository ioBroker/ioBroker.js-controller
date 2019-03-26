![Logo](admin/piface.png)
# ioBroker.piface
![Number of Installations](http://iobroker.live/badges/piface-installed.svg) ![Number of Installations](http://iobroker.live/badges/piface-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.piface.svg)](https://www.npmjs.com/package/iobroker.piface)
[![Downloads](https://img.shields.io/npm/dm/iobroker.piface.svg)](https://www.npmjs.com/package/iobroker.piface)
[![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.piface.svg?branch=master)](https://travis-ci.org/Eisbaeeer/ioBroker.piface)   
[![NPM](https://nodei.co/npm/iobroker.piface.png?downloads=true)](https://nodei.co/npm/iobroker.piface/)


This adapter allows to control a Piface on Raspberry Pi .

It uses node-pifacedigial: https://github.com/tualo/node-pifacedigital

The adapter creates 8 input and output objects in iobroker.
The outputs can controlled by buttons from VIS or by setting the object to
"true" or "false" or "1" or "0".

### ! Attention !
Please read the pre requirements of adapter.
The adapter need node version >= v4.0.0
You have to install by console the following libraries and enable SPI support of Raspberry
by setting up in "raspi-config"

```
git clone https://github.com/piface/libmcp23s17.git
cd libmcp23s17/
make
sudo make install
```

```
git clone https://github.com/piface/libpifacedigital.git
cd libpifacedigital/
make
sudo make install
```

If you run in errors, because your node version is too low, please update the node version.
* I installed successfully with node version: v4.2.1

### Settings in iobroker
![Alt text](admin/settings.png?raw=true "settings")
## PiFace board number

You can stack up to 4 boards on one Raspberry Pi. You must address the board with the jumper.
To address the boards use the following jumper settings:

| Board number  | JP1 | JP2 |
| ------------- |:---:|:---:|
| board 0       |  0  |  0  |
| board 1       |  1  |  0  |
| board 2       |  0  |  1  |
| board 3       |  1  |  1  |

If you use more than one board, please create additional instances for every board and change the board number in setup of corrosponding instance.

## PiFace read input in ms
This value define the interval to check the inputs. Value is in ms.

## Inverse inputs
You can inverse the inputs

## Initialize outputs
If this is checked, the outputs will be set to 0 by restarting the adapter.

## To DO:

## ChangeLog

### 1.0.0.(2017-09-19)
* (Eisbaeeer)
* Solving issue #6 (RAM)

### 0.0.9 (2017-03-05)
* (Eisbaeeer)
* Activating Travis - no changes
* (Apollon77)
* Added basic testing

### 0.0.50 (2016-05-07)
* (Eisbeeer)
* Optimized loggin because of RPI´s flash

### 0.0.40
* (Eisbaeeer) RC
added:
* addressing boards

### 0.0.30
* (Eisbaeeer) first aplpha
added:
* Read interval in setup (ms)
* Selectable invers input (pullup)

### 0.0.20
* (Eisbaeeer) first beta

### 0.0.10
* (Eisbaeeer) initial version

## License
MIT
