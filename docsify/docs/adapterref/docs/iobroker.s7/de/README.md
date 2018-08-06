![Logo](media/S7.png)
# iobroker.s7
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.s7.svg)](https://www.npmjs.com/package/iobroker.s7)
[![Downloads](https://img.shields.io/npm/dm/iobroker.s7.svg)](https://www.npmjs.com/package/iobroker.s7)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.s7.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.s7)

[![NPM](https://nodei.co/npm/iobroker.s7.png?downloads=true)](https://nodei.co/npm/iobroker.s7/)


## Deutsch
Der Siemens S7 Adapter basiert auf Snap7, wobei Snap7 bei der Erstinstallation des
S7 Adapters mitinstalliert wird und die eigentliche S7-Kommunikation zwischen ioBroker und der S7 über TCP/IP organisiert.

Es ist also notwendig, dass die S7 über eine Ethernet-Schnittstelle verfügt
(in der CPU integriert oder als separater CP) und über TCP/IP mit der Hardware kommunizieren kann, auf der ioBroker läuft.

Es wird vorausgesetzt, dass der Anwender über die notwendigen Kenntnisse zur TCP/IP-Kommunikation verfügt
und in der Lage ist, die S7 mittels Step7 entsprechend zu konfigurieren und zu programmieren.
Der geübte Umgang mit PC und verschiedenen Betriebssystem ist ebenfalls Voraussetzung.
Diese Anforderungen stellen sicherlich keine Herausforderung für jemanden dar,
der die Kommunikation zwischen ioBroker und einer S7 in Erwägung zieht.

### Installation
Unter Linux braucht man "make" Umgebung um die binries zu bauen. Das kann man mit folgenden Kommando installieren:

```
sudo apt-get update
sudo apt-get install build-essential
```

Unter windows braucht man Visual Studio 2013 (Community Edition ist genug) oder später. Auch Python 2.7 (nicht 3.x) muss instaliert werden.
## English
Format of the addresses for Inputs, Outputs or markers is "X.Y", where X is byte offset and Y is bit offset in byte.
Format of the addresses for DBs is "DBZ +X.Y", where z is number of DB, like "DB34 +12.0"

### Install
On some Linux systems the build essentials must be installed to get this adapter work. You can install it with:

```
sudo apt-get update
sudo apt-get install build-essential
```

Under windows is Visual Studio 2013 (Community Edition is enough) or later is required to get it run.
Python 2.x is required too. Not 3.x.

## Time offset
You can use 4 time offset modes for S7TIME:
- Local: the time value will be not modified
- UTC: local time offset will be added to received time. E.g. for Germany: -60 Minutes in winter and -120 Minutes in summer.
- Set offset (use summer/winter): Given offset in minutes will be subtracted from received time and in summer additionally 60 minutes will be subtracted.
- Set offset (no summer/winter): Just the given offset in minutes will be subtracted from received time. No matter in winter or in summer.

## S5TIME
S5 decoded as described here: http://www.plccenter.cn/Siemens_Step7/Format_des_Datentyps_S5TIME_Zeitdauer.htm

## Changelog
### 1.1.4 (2018.07.10)
* (Apollon77) Support for nodejs 10 on windows

### 1.1.3 (2018.01.19)
* (bluefox) The time offset was added

### 1.1.1 (2018.01.05)
* (Apollon77) Fix LOGO! support

### 1.1.0 (2018.01.03)
* (bluefox) Fix strings
* (bluefox) fix names if they have more than one space

### 1.0.6 (2017.12.18)
* (bluefox) Decode error codes

### 1.0.5 (2017.12.17)
* (bluefox) Error by the DB import is fixed

### 1.0.4 (2017.11.30)
* (bluefox) Fix read of DB (range error)

### 1.0.2 (2017.10.30)
* (Apollon77) Enhance object data to allow writing if available
* (bluefox) Add export from Graphpic

### 1.0.1 (2017.10.24)
* (bluefox) Detect DB and db in addresses

### 1.0.0 (2017.09.25)
* (bluefox) Activate save button if something was deleted

### 0.3.2 (2017.09.20)
* (bluefox) Fix DB bit offset bug if starting not from 0

### 0.3.0 (2017.07.12)
* (Apollon77) Upgrade node-snap7 library to current version

### 0.2.6 (2017.05.19)
* (Apollon77) Fix history handling

### 0.2.5 (2016.12.09)
* (bluefox) Fix button text: Import

### 0.2.4 (2015.10.29)
* (bluefox) add comment about python
* (bluefox) implement string read and write
* (bluefox) implement auto-increment of addresses.
* (bluefox) fix length
* (bluefox) implement export import from/to CSV
* (bluefox) fix small errors in config
* (bluefox) implement import/export for inputs and outputs too.
* (bluefox) add translation

### 0.2.3 (2015.09.24)
* (bluefox) add suppor of Logo!

### 0.2.2 (2015.09.11)
* (bluefox) add S7time
* (bluefox) support rooms and roles
* (bluefox) it works
* (bluefox) update packets

### 0.2.1 (2015.09.09)
* (bluefox) fix creation of objects

### 0.2.0 (2015.08.15)
* (bluefox) improve performance and enable DB2 3.9 addresses.

### 0.1.8 (2015.08.10)
* (smiling_Jack) Bugfix send info states
* (smiling_Jack) Remove unneeded conole.log

### 0.1.7 (2015.08.06)
* (smiling_Jack) Bugfix send to SPS
* (smiling_Jack) Bugfix reconnect on connection lost

### 0.1.6 (2015.07.31)
* (smiling_Jack) Bugfix typo (Adress, Merkers)

### 0.1.5 (2015.07.29)
* (smiling_Jack) Bugfix translation Admin

### 0.1.4 (2015.07.28)
* (smiling_Jack) Add S5Time as Type
* (smiling_Jack) Bugfix History
* (smiling_Jack) Bugfix (fast value change)

### 0.1.3 (2015.06.04)
* (bluefox) translate admin
* (bluefox) remove jshint warnings
* (bluefox) add info.connected and rename info.connection to info.state

### 0.1.2
* Bugfix startup
* Bugfix add states

### 0.1.1
* change import options

### 0.1.0
* redesign Admin UI
* add write as Pulse
* Bugfix delete unused objects

### 0.0.8
* Bugfix start file
* Bugfix DB import
* Working on Admin style
* Add Units

### 0.0.6
* Bugfix start file
