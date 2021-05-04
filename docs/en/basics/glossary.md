---
Title: Begriffserklärungen
lastChanged: 02.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/glossary.md
title: no title
hash: pNXghnzEUIUGnqswpze2CJ8dmBmPOIWjCZiDbzPOvVA=
---
To make it easy to get started and to make further help easier to understand, the most important terms that appear in and around the ioBroker are explained here.

* **Adapter**

A module or driver for a device, service or to provide data. Thanks to the very modular structure of ioBroker, almost everything is an adapter: admin interface, visualization, scripting, ...

* **Admin**

The admin adapter provides the web interface for configuring ioBroker. This includes installing adapters, creating instances, creating and checking objects, states, editing scripts and much more.

* **List**

    English term: enum (eration)

An enumeration is a list of specific objects that have been grouped together.

* **Blockly**

With the help of linkable function blocks, Blockly allows simple controls and scripts to be graphically assembled. Programming knowledge is not necessary.

When a Blockly script is saved, JavaScript code is generated which is then executed.

* **CCU**

Is the Homematic Smarthome Central from the manufacturer eQ-3. There are 2 versions, the older CCU1 and the newer model CCU2, as well as the brand new CCU3.

    CCU stands for Central Control Unit

With the CCU2 and CCU3 all Homematic and HomematicIP devices can be controlled. The CCU1 can only handle Homematic devices.
Homematic devices are available in radio and wired versions (wired bus).

* **CSS**

Cascading style sheets. Using CSS, the presentation of websites can be described independently of the content. As a supplement to the page structure defined in HTML, CSS defines how the page is displayed.

* **Cubietruck / Cubieboard 3**

Single board computer similar to Raspberry PI / Odroid, but with SATA interface and 2GB RAM

* **Device**

    English term: Device

In ioBroker, a device is often the next level under an adapter and groups all channels and states of the device.

* **Homematic**

Homematic is a smart home system manufactured by eQ-3 and distributed by elv. See also CCU.

* **Host**

    The host is the computer / server on which ioBroker is running.

In multihost mode there are several hosts, one of which is the master and the others are the slaves

* **HTML**

Hypertext Markup Language. A page description language (basis of the WWW), which is used to display content (text, links, graphics, videos, etc.) in web browsers.

* **Instance**

Each adapter has at least one instance (but there can also be several).
There are different reasons why multiple instances are used.
For example, you can test with a second instance of the JavaScript adapter without the risk of important scripts failing, since only the test instance is affected in the event of an error.

Most adapters can start several instances in order to be able to address several devices of the same type or with the same protocol. An instance corresponds to a running process on the host.
Example: 2 Hue bridges are to be integrated into ioBroker. Since only one bridge can be configured per adapter, a 1st and a 2nd instance of the Hue adapter are simply created and each bridge is configured in the corresponding instance of the adapter. The instantiation also makes it easy to tell the data points apart, since the object structure is preceded by the instance name (e.g. hue.0 and hue.1).

* **Javascript**

Programming language with which everything is programmed at ioBroker and also own scripts are programmed.

* **js-controller**

The js-controller is the main process of ioBroker and provides the necessary central basic functionality for all other modules.
It also provides access to the central object and status databases, coordinates and monitors all running adapter instances and processes. If necessary, adapters are restarted by the js-controller.

* **Channel**

A channel groups thematically related states and is usually located under a device. There can be several channels per device.

* **Master**

The master is the host, which is centrally responsible for the administration of all instances (including the instances of the slaves!). When the master is terminated, the slave instances are also terminated. The master provides the central object and status databases for all slaves, to which all slaves connect.

* **Multihost mode**

The multihost mode of ioBroker can be used to distribute the control tasks to several computers if these require special interfaces (e.g. reading out electricity meters in the basement). Furthermore, several hosts can be used in order to distribute the load or the memory consumption evenly. In multihost mode, one host is defined as the master; all others are slaves. The master controls all slaves and also the distribution of the instances to the slaves.

* **Node-Red**

Graphic programming interface in which finished modules (nodes) can be linked to complex programs by simple chaining (flow).

* **Objects and states**

    Basic definitions can be found [here]

* **Objects**

Objects describe a state in more detail and provide meta information, configuration and description of this. An object has a type, e.g. host, adapter, instance, enumeration, device, channel or data point ...

The metadata also define the data type of the state, e.g. number, boolean, string and also how the state should be displayed in the visualization interfaces.

* **Odroid**

Single board computer similar to a Raspberry PI. There are several versions with different hardware equipment.

* **Parser adapter**

An adapter that is made up of texts regardless of their origin by specifying so-called.
Regular expressions, cuts out parts that can then be written into states. These values can then be used in scripts and the like. are further processed.

* **Raspberry PI**

Credit card-sized single-board computer (developed by the Raspberry PI Foundation). All the components required to operate a computer are located on the circuit board (CPU, GPU, RAM, etc.). The advantage over conventional computers is the minimal power consumption and the size. Disadvantage: CPU, RAM etc. cannot be exchanged or upgraded.

* **Redis**

A no-SQL database that holds your data in memory and can be used in ioBroker to store status data. Is used optionally to increase the performance, since no access to a hard drive, SSD or SD card is necessary for write and read actions. To use a Redis DB with ioBroker, this must be specified in the js-controller basic configuration.

* **State**

    see state or objects

* **vis**

The VIS adapter allows you to create your own operating and visualization interfaces for ioBroker and to display them on various devices. The surfaces are put together from customizable widgets and your own HTML code and their appearance can be changed using CSS.

* **Widget**

A control in Vis. Widgets are used to display or control states; For example, switching a lamp on and off using a button that changes its appearance depending on the switching status.

* **State or State**

A state contains the current value of a data point in ioBroker.
In addition, it describes the time stamp, the time of the last change and the confirmation by the sender or recipient.

    States can be saved in a JSON file or a Redis DB.

[hier]: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md