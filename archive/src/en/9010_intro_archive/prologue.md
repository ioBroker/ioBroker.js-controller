# **Introduction**

ioBroker is an integration platform for the [Internet of Things](http://en.wikipedia.org/wiki/Internet_of_Things), focused on Building Automation, Smart Metering, Ambient Assisted Living, Process Automation, Visualization and Data Logging. It aims to be a possible replacement or extension for software like f.e. [fhem](http://fhem.de/), [OpenHAB](http://www.openhab.org/) or [the thing system](http://thethingsystem.com/) by the end of 2015\. ioBroker is the successor of [CCU.IO](http://ccu.io/), a project quite popular in the [german HomeMatic community](http://homematic-forum.de/forum/). ioBroker is not just an application, it's more of a a concept, a database schema, and offers a very easy way for systems to interoperate. ioBroker defines some common rules for a pair of databases used to exchange data and publish events between different systems.

## Operation Systems and Hardware

[ioBroker](https://github.com/iobroker/ioBroker.js-controller/) should run on any hardware and os that runs [Node.js](http://nodejs.org/) (ARM, x86, Windows, Linux, OSX). ioBroker spawns a new Node.js-Process for every adapter instance, so RAM becomes is a limiting factor. A single adapters memory fingerprint is roundabout 10-60MB. We recommend x86 based or ARM based systems like RaspberyPi2/3, [BananaPi](http://www.bananapi.org/p/product.html) or [Cubietruck](http://www.exp-tech.de/Mainboards/ARM/Cubietruck.html) using Debian based Linux as operating system.

## Adapters

Systems are attached to ioBroker via so called adapters, technically processes are running anywhere in the network and connecting all kinds of systems to ioBroker. A library module for fast and comfortable adapter development exists for Javascript/Node.js until now. Libraries for adapter development in other languages are planned (python, java, perl, ...).