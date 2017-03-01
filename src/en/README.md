# ioBroker

ioBroker is an integration platform for the Internet of Things, focused on Building Automation, Smart Metering, Ambient Assisted Living, Process Automation, Visualization and Data Logging.

![Schema](img/marketing-buzz.png)

## Introduction
ioBroker is an integration platform for the Internet of Things, 
focused on Building Automation, Smart Metering, Ambient Assisted Living, Process Automation, Visualization and Data Logging. It aims to be a possible replacement or extension for software like f.e. fhem, OpenHAB or the thing system by the end of 2015. ioBroker is the successor of CCU.IO, a project quite popular in the german HomeMatic community.

ioBroker is not just an application, it's more of a a concept, a database schema, 
and offers a very easy way for systems to interoperate. ioBroker defines some common 
rules for a pair of databases used to exchange data and publish events between different systems.

## Operation Systems and Hardware
ioBroker should run on any hardware and os that runs Node.js (ARM, x86, Windows, Linux, OSX).

ioBroker spawns a new Node.js-Process for every adapter instance, so RAM becomes is a limiting factor. 
A single adapters memory fingerprint is roundabout 10-60MB.

We recommend x86 based or ARM based systems like RaspberyPi2/3, BananaPi or Cubietruck using 
Debian based Linux as operating system.

## Adapters
Systems are attached to ioBroker via so called adapters, technically processes are running 
anywhere in the network and connecting all kinds of systems to ioBroker.

A library module for fast and comfortable adapter development exists for Javascript/Node.js until now.