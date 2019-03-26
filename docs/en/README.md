---
title: welcome
lastChanged: 14.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/README.md
hash: LCHCatkmoOyoNjrSPWLc0umuC5dR5s62Bl3UittK/QA=
---
# Welcome to ioBroker
ioBroker is a central service for the connection, evaluation and operation of systems that would remain without ioBroker island solutions.

ioBroker is *the* integration platform for the Internet of Things.

An ioBroker system has a modular structure. A variety of *adapters* allow communication with over 200 different platforms from A like Alexa to Z like time tracking. Be it the integration of commercial products from almost all areas of life or the integration of a self-created solution - ioBroker makes almost everything possible.

!> The documentation is under construction and is constantly being expanded. Therefore, it may happen that links do not work yet or content is missing. We are grateful for any help in creating new articles or for improvements. Information on this can be found in [in the forum](https://forum.iobroker.net). <br><br> **Until all contents have been taken over, the old documentation is still [to find here](http://www.iobroker.net). It will be successively replaced by the new documentation.**

## Visualization
The interface to the user is the visualization. ioBroker provides a powerful environment with `VIS`.
Current values of sensors can be displayed graphically as well as historical gradients. Live images of surveillance cameras, the implementation of an alarm system, heating systems and air conditioning - almost everything that can be imagined, can also be implemented.

![VIS](../de/media/vis2.png) *Example of a self-created VIS user interface*

The user has maximum freedom of design. The creation of automatisms and processes in the visualization is possible even without programming knowledge. Prefabricated building blocks for easy use help the user. But not only the display of information is possible. The control of devices is also quickly implemented via the visualization interface. The operation of the interface can be adapted to a wide variety of devices - from the smartphone via the wall tablet with touch function to the personal computer - everything can be realized by simple drag and drop.

Simple prefabricated user interfaces can be quickly realized with the material adapter or HabPanel adapter.

## Cross-platform
Anyone familiar with home automation will sooner or later discover that systems are often not perfect. Each system has its strengths and weaknesses. ioBroker is therefore cross-platform. Parallel operation with existing solutions is possible at any time. Synergy effects can be used and the best of all worlds brought together. IoBroker is at home on almost all platforms. ioBoker can be installed under Windows, Linux, OSX or as Dockerimage. Preconfigured installation images remove the installation work from the user.

An optional cloud-based interface allows the user or system integrator to remotely access a locally installed ioBroker 7x24h system. The access control can be freely configured by users and groups by the user.

## Scalable
If additional systems are to be connected over time, additional adapters can be added at any time during operation by the user. IoBroker itself is also scalable. Several ioBroker servers can be connected to a `Mutihost` system. It's even possible to mix operating system platforms and couple SoC single-board computers with large multicore servers.
For systems with the highest performance requirements, optional Redis, a particularly fast database, can be integrated.

## Expandable
The programming is done with JavaScript, a script language that has been continuously developed since 1995. This is easy to learn, so that new requirements can be quickly implemented. This makes it possible for everyone to contribute to ioBroker and also to implement individual requirements.

The variant 'Blockly' makes it possible for beginners without extensive programming skills to get to results quickly by 'drag and drop'.

## Community
Since 2014, ioBroker has been widely supported by thousands of users and developers due to its many benefits. Users and developers meet in the specially created [Forum](https://forum.iobroker.net) and exchange their experiences and suggestions. Since ioBroker is open source software, all source texts are freely available on the platform [GitHub](https://github.com/ioBroker).

?> What ioBroker is not: ioBroker is not commercial software. ioBroker is developed and maintained by volunteers. Therefore, the use of the software on their own liability, except the intent of willful harm.
There is no contracted support.

[Forum]: https://forum.iobroker.net [GitHub]: https://github.com/iobroker/iobroker [in the forum]: https://forum.iobroker.net/viewtopic.php?f=8&t = 16933 [to be found here]: http://www.iobroker.net/docu/?lang=en