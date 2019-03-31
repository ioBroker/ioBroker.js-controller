---
Title: ioBroker Grundlagen
lastChanged: 29.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
title: modularity
hash: FytBmaiv4NpTHt2T+Wgnbozj+XBc5qr7hLloB/Elo9k=
---
ioBroker is a pure software solution to connect different IoT systems to a complete system. Accordingly, a central office (gateway / interface) is also required for each system in order to be able to integrate its devices.

In special cases, such a control panel can be simulated by software, or as hardware (USB stick or similar) infected to the ioBroker server.

# Modularity
ioBroker has a modular structure. These modules are called ioBroker ***Adapter*** .
There are [over 250 adapters](http://download.iobroker.net/list.html) for connecting various hardware or integration of various information such as weather, calendar, etc.

Therefore, only the adapters that are needed for your individual needs need to be installed in an installation. This saves storage space and computing power.

For each adapter, so-called ***instances*** are created. These are the "working versions" of the adapters. Depending on the adapter, any number of instances can be created to differentiate different subsystems or different task areas from each other.

The corresponding configuration takes place in these instances.

# Architecture
## Server
A special feature of ioBroker is that the tasks can also be distributed to multiple servers ** **. In such a case one speaks of a ***multi-host system*** . Reasons for the division may be spatial or power distribution.

### Hardware requirements
An ioBroker server can be installed on almost any hardware. The only condition is that there is a current version of [NodeJS](https://nodejs.org) for the corresponding operating system.

For a larger installation, a RAM of at least 2GB is also recommended. For testing, a Raspberry Pi 2/3 with 1GB of RAM is sufficient, as a slave for individual adapters in a multi-host environment sometimes even smaller minicomputers are sufficient.

## Software
ioBroker manages the data in a database. Accordingly, the structure of the data is organized.

Each adapter has a so-called namespace that contains all the data about an instance of the adapter. Accordingly, the name of the namespace is, for example: ***AdapterName.0***

Within this range, ioBroker creates the devices, their channels and their data points with their values (states).

![object structure](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

This example is a self-created namespace for your own metrics