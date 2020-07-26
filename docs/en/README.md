---
title: welcome
lastChanged: 29.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/README.md
hash: px6bpErZjO66gEuP+0JuB0e6LukKiwa1dCs0CLvZZpk=
---
# Welcome to ioBroker
!> **Note for beginners** If too many unknown terms have already been used when reading these first words, they are explained again in detail on [next page](./basics/README.md).

ioBroker is a software solution to integrate various smart home systems that would remain without ioBroker stand-alone solutions in one overall system.

ioBroker is therefore ***the*** integration platform for the Internet of Things.

An ioBroker system has a modular structure. A variety of ***adapters*** enable communication with over 200 different platforms from A for Alexa to Z for time recording.

Be it the integration of commercial products from almost all areas of life or the integration of a self-created solution - ioBroker makes almost everything possible.

!> The documentation is under construction and is constantly being expanded. As a result, links may not yet work or content may be missing. We are grateful for any help in creating new articles or for improvements. Information on this is available in [in the forum](https://forum.iobroker.net). <br><br> **Until all content has been transferred, the old documentation is still [can be found here](https://www.iobroker.net/docu/). It will be gradually replaced by the new documentation.**

## Cross-platform
Anyone dealing with home automation will sooner or later find that systems are often not perfect. Every system has its strengths and weaknesses. ioBroker is therefore cross-platform. Parallel operation with existing solutions is possible at any time. Synergy effects can be used and the best of all worlds can be brought together.

ioBroker itself IS at home on almost all platforms. ioBroker can be installed on Windows, Linux, OSX or as a Docker image.
Preconfigured installation images relieve the user of the installation work.

Remote administration to a locally installed ioBroker system 24/7 is possible for users or system integrators via optional cloud-based access. Access control can be freely configured by the user using users and groups.

## Scalable
If additional smart home systems are to be connected over time, the user can implement them at any time using additional adapters while the system is running. ioBroker itself is also scalable.
Several ioBroker servers can be connected to a `Mutihost` system.
It is even possible to mix operating system platforms and couple SoC single-board computers with large multicore servers.
For systems with the highest performance requirements, Redis, a particularly fast database, can optionally be integrated.

Programmable
Optional programming is done with JavaScript, a scripting language that has been continuously developed since 1995. This is easy to learn, so that new requirements can be implemented quickly. This makes it possible for everyone to contribute to ioBroker and for individual requirements to be implemented.

For beginners in programming, the 'Blockly' variant is available, which makes it possible to quickly get results yourself using 'drag and drop' without extensive programming knowledge.

## Visualization
With `VIS` ioBroker provides a powerful tool for creating an individual visualization. Current values from sensors can be displayed graphically, just like historical trends. Live images from surveillance cameras, the implementation of an alarm system, heating systems and air conditioning technology - almost everything that can be imagined can also be implemented.

![VIS](../de/media/vis2.png) *Example of a self-created VIS user interface*

The user has maximum design freedom. Pre-built blocks for easy use help the user. However, it is not only possible to display information. The control of devices is also quickly implemented via the visualization interface. The user interface can be adapted to a wide variety of end devices - from smartphones to wall tablets with touch functions to personal computers - everything can be done with simple drag and drop.

Simple prefabricated user interfaces can be quickly implemented with the material or HabPanel adapter.

## Community
Since 2014, ioBroker has secured broad support from thousands of users and developers due to its many advantages. In the specially created [Forum](https://forum.iobroker.net) users and developers meet and share their experiences and suggestions with each other. Since ioBroker is open source software, all source texts are freely available on the [GitHub](https://github.com/ioBroker) platform.

?> What ioBroker is not: ioBroker is not commercial software. ioBroker is developed and maintained by volunteers. For this reason, the software is used at your own liability, except in the case of willful damage.
There is no contractually agreed support.

[im Forum]: https://forum.iobroker.net/viewtopic.php?f=8&t=16933