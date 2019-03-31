---
Title: Bergriffserklärungen
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/glossary.md
title: no title
hash: g+ntya8MVqcnPittLbU2KQ/e2V8zws9bV2vgTN4H3dw=
---
To make it easier to get started and to understand the further help, here are the most important terms that are explained in and around the ioBroker.

* **adapter**

    A module or driver for a device, service or to provide data. Due to the very modular structure of ioBroker, everything is an adapter: Admin interface, visualization, scripting, ...

* **Admin**

    The admin adapter provides the web interface for configuring ioBroker. This includes installing adapters, creating instances, creating and checking objects, states, editing scripts, and more.

* **Listed**

    English term: enum (eration)

    An enumeration is a list of specific objects that have been merged into a group.

* **Blockly**

    Using Blockly it is possible to construct simple controls and scripts graphically with the aid of linkable function blocks. Programming skills are not necessary.

    When a blockly script is saved, JavaScript code is generated which is then executed.

* **CCU**

    Is the Homematic smart home center of the manufacturer eQ-3. There are 2 versions, the older CCU1 and the more recent model CCU2. Brand new is the CCU3

    CCU stands for Central Control Unit

    With the CCU2 all Homematic and HomematicIP devices can be controlled. The CCU1 can only handle homematic devices. Homematic devices are available in both wireless and wired versions (wired bus). The latest version is the CCU3.

* **CSS**

    Cascading Style Sheets. Using CSS, the presentation of web pages can be described independently of the content. As a supplement to the page structure defined in HTML, CSS defines how the page is displayed.

* **Cubietruck / Cubieboard 3**

    Single board computer similar to Raspberry PI / Odroid, but with SATA interface and 2GB of RAM

* **Device**

    English term: Device

    In ioBroker, a device is often the next level under an adapter, grouping all the channels and states of the device.

* **Homematic**

    Homematic is a smart home system manufactured by eQ-3 and distributed by elv. See also CCU.

* **Host**

    The host is the computer / server running ioBroker.

    In multihost mode, there are several hosts, one of which is the master, the others are the slaves

* **HTML**

    Hypertext Markup Language. A page description language (basis of the WWW), which is used in web browsers to display content (text, links, graphics, videos, etc.).

* **instance**

    Each adapter has at least one instance, but it can be several. There are different reasons why multiple instances are used. For example, you can test with a second instance of the JavaScript adapter without the risk of failure of important scripts, as only the test instance is affected in the event of an error.

    Most adapters allow multiple instances to be started in order to have the ability to address multiple devices of the same type or protocol. An instance corresponds to a running process on the host. Example: 2 Hue bridges are to be integrated into ioBroker. However, since only one bridge can be configured per adapter, a first and a second instance of the hue adapter are simply created and each bridge is configured in the appropriate instance of the adapter. Instantiation also makes it easy to distinguish the data points because the object structure is preceded by the instance name (for example, hue.0 and hue.1).

* **Javascript**

    Programming language with which everything is programmed at ioBroker and also own scripts are programmed.

* **js-controller**

    The js-controller is the main process of ioBroker and provides the necessary central basic functionality for all other modules. It also provides access to the central object and state databases, coordinates all running adapter instances and processes, and monitors them. If necessary, adapters are restarted by the js-controller.

* **Channel**

    A channel groups together thematically related states and is usually located under one device. There can be several channels per device.

* **Master**

    The master is the host which is centrally responsible for the administration of all instances (including the instances of the slaves!). When the master is terminated, the slave instances are also terminated. The master provides the central object and status databases for all slaves to which all slaves connect.

    For more information, see Multihost Mode

* **Multihost mode**

    ioBroker's multi-host mode can be used to distribute the control tasks to multiple computers, if they need special interfaces (for example, reading electricity meters in the basement). Furthermore, multiple hosts can be used to evenly distribute load or memory usage. In multi-host mode, a host is defined as master; all others are slaves. The master controls all slaves and also the distribution of the instances to the slaves.

* **Node-Red**

    Graphical programming interface in which finished modules (nodes) can be linked to complex programs by simple linking (flow).

* **objects and states**

    Basic definitions can be found at https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md

* **objects**

    Objects describe a state in more detail and provide meta-information, configuration, and description about it. An object has a type, e.g. Host, adapter, instance, enumeration, device, channel or data point ...

The metadata also defines the data type of the state, e.g. number, boolean, string and also how the state is to be displayed in visualization interfaces.

* Odroid **

    Single board computer similar to a Raspberry PI. There are several versions with different hardware.

* **parser adapter**

    An adapter that cuts out texts of whatever origin by specifying so-called regular expressions, parts that can then be written in states. These values can then be stored in scripts and the like. be further processed.

* **Raspberry PI**

    Credit card sized single board computer (developed by the Raspberry PI Foundation). On the board are all components that are required for the operation of a computer (CPU, GPU, RAM, etc.). Advantage over conventional computers, is the minimal Leistungsaufname and the size. Disadvantage: CPU, RAM etc. can not be exchanged or upgraded.

* Redis **

    A No-SQL database that keeps your data in memory and can be used in ioBroker to store state data. It is optionally used to increase performance, as write and read actions do not require access to a hard disk, SSD or SD card. To use a Redis DB with ioBroker, this must be specified in the js-controller basic configuration.

* **State**

    see condition or objects

* **vis**

    The VIS adapter makes it possible to create your own operating and visualization interfaces for ioBroker and display them on different devices. The interfaces are composed of customizable widgets and custom HTML code and can be changed in appearance by CSS.

* **Widget**

    A control in Vis. Widgets are used to display or control states; For example, switch a lamp on and off with a button that changes its appearance depending on the switching state.

* ** state or state

A state contains the current value of a data point in ioBroker. In addition, it describes the time stamp, the time of the last change and the confirmation by the sender or receiver.

    States can be stored in a JSON file or a Redis DB.