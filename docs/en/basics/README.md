---
Title: ioBroker Grundlagen
lastChanged: 02.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
title: no title
hash: vjFz8hLiuUe0GNoRANP+qAb+Alc7Pw1/JZ/rvJYCrHg=
---
ioBroker is a pure software solution to connect different IoT systems to one overall system. Accordingly, a control center (gateway / interface) is still required for each system in order to be able to integrate its devices.

In special cases, a control center can be simulated using software or plugged into the ioBroker server as hardware (USB stick or similar).

## Modularity
ioBroker has a modular structure. These modules are called ***adapters*** at ioBroker.
There are over 400 [adapters] for connecting various hardware or integrating various information such as weather, calendar, etc.

Therefore, only those adapters that are required for the individual needs have to be installed in an installation. This saves storage space and computing power.

So-called ***instances*** are created for each adapter. These are the "working versions" of the adapters. Depending on the adapter, any number of instances can be created in order to separate different subsystems or different task areas from one another.

The corresponding configuration takes place in these instances.

## Architecture
### Server
A special feature of ioBroker is that the tasks can be distributed over several servers **. In such a case one speaks of a ***multihost system*** . Reasons for the division can be spatial or a power distribution.

### Hardware requirements
An ioBroker server can be installed on almost any hardware. The only condition is that there is a current version of [nodejs] for the corresponding operating system.

For a larger installation, a working memory (RAM) of at least 2GB is also recommended. A Raspberry Pi 2/3 with 1GB RAM is sufficient for testing; as a slave for individual adapters in a multihost environment, even smaller microcomputers are sometimes sufficient.

### Software
ioBroker manages the data in a database. The structure of the data is organized accordingly.

For each adapter there is a so-called namespace that contains all data on an instance of the adapter. Accordingly, the name of the namespace is e.g .: ***AdapterName.0***

Within this area, ioBroker creates the devices, their channels and, in turn, their data points with their values (states).

![Object structure](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

In this example, it is a self-created namespace for your own measured values.

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org