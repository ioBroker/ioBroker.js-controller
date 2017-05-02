# Glossary

### Adapter
A module or driver for a device, service, or data provision.
The ioBroker ioBroker ioBroker has a very modular design: it is basically an adapter: admin interface, visualization, scripting, ...

### Admin
The admin adapter provides the web interface for configuring ioBroker This includes installing adapters, creating instances, creating and verifying objects, states, editing scripts, and much more.

### Enumeration
An enumeration is a list of certain objects that have been grouped together into a group.

### Blockly
Blockly makes it possible to graphically assemble simple controls and scripts by means of linkable function blocks. Programming skills are not necessary.

If a blockly script is stored, JavaScript code is generated, which is then executed.

### CCU
Is the homematic Smarthome head unit of the manufacturer eQ-3. There are 2 versions, the older CCU1 and the current model CCU2.

With the CCU2, all Homematic and HomematicIP devices can be controlled. The CCU1 can handle only Homematic devices.
Homematic devices are available in wireless and wired versions (wire-bound bus).

### CSS
Cascading Style Sheets. CSS can be used to describe the display of web pages, regardless of content. As a complement to the page structure defined in HTML CSS defines how the page is displayed.

### Cubietruck / Cubieboard 3
Single board computer similar to Raspberry PI / Odroid, but with SATA interface and 2GB RAM

### Device
In ioBroker, a device is frequently the next level under an adapter and groups all channels and states of the device.

### Homematic
Homematic is a Smart Home System manufactured by eQ-3 and marketed by elv. See also CCU.

### Host
The host is the computer / server running ioBroker.

In multihost mode, there are several hosts, one of which is the master, the others are the slaves

### HTML
Hypertext Markup Language. A site description language (the basis of the WWW) that is used to display content (text, links, graphics, videos, etc.) in web browsers.

### Instance
Each adapter has at least one instance, but it can be multiple. There are different reasons why multiple instances are used. For example, you can test with a second instance of the JavaScript adapter without the risk of a failure of important scripts, since in the event of an error only the test instance is affected.

Multiple instances can be started from most adapters in order to have the possibility to address 
several devices of the same type or with the same protocol. An instance corresponds to a running process on the host.
Example: 2 Hue bridges should be integrated into ioBroker. Because only one bridge can be configured for each adapter, a 1st and 2nd instance of the Hue adapter is created, and each bridge is configured in the corresponding instance of the adapter.
By the instantiation, the data points can also be easily separated because the object structure precedes the instance name (e.g., hue.0 and hue.1).

### Javascript
Programming language with ioBroker everything is programmed and also own scripts are programmed.

### js-controller
The js-controller is the main process of ioBroker and provides the necessary central basic 
functionality for all other modules. It also provides access to the central object and state databases, 
coordinates all ongoing adapter instances and processes, and monitors them. If necessary, adapters are 
restarted by the js-controller.

### Channel
A channel groups thematically together states and is usually located under one device. 
There may be several channels per device.

### Master
The master is the host, which is centrally responsible for the administration of all instances 
(also the instances of the slaves!).
When the master is terminated, the slave instances are also terminated.
The master provides the central object and state databases, to which all slaves connect, 
for all slaves.

For more information, see Multihost Mode

### Multihost mode
The multihost mode of ioBroker can be used to distribute the control tasks to several computers, 
if they require special interfaces (for example, reading of electricity meters in the basement). 
Furthermore, multiple hosts can be used to evenly distribute the load or memory consumption.
In multihost mode, a host is defined as master; All others are slaves. The master controls all 
slaves and also the distribution of the instances to the slaves.

### Node-Red
Graphical programming interface in which finished modules (nodes) can be linked to complex programs by simple chaining (flow).

### Objects and states
Basic definitions can be found at https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md

#### State or State
A state contains the current value of a data point in ioBroker.
In addition, it describes the time stamp, the time of the last change and the confirmation by the 
sender or receiver.

States can be stored in a JSON file or a Redis DB.

#### Objects
Objects describe a state in more detail and provide meta information, configuration, and description to it.
An object has a type, e.g. Host, adapter, instance, enum, device, channel or datapoint ...

The meta data also defines the data type of the state, e.g. Number, boolean, string and also how the state should be displayed in visualization surfaces.

### Odroid
Single board computer similar to a Raspberry PI. There are several versions with different hardware.

### Parser adapter
An adapter that cuts out parts from texts of whatever origin by specifying so-called regular expressions, 
which can then be written into states. These values ​​can then be stored in scripts and the like. 
Further processing.

### Raspberry PI
Credit card reader single board computer (developed by the Raspberry PI Foundation). 
The board contains all the components required for the operation of a computer (CPU, GPU, RAM, etc.). 
Advantage over conventional computers, is the minimum power consumption and the size. Disadvantage: CPU, RAM, etc. can not be exchanged or upgraded.

### Redis
A No-SQL database that holds your data in memory and can be used in ioBroker to store state data. 
It is used as an option to improve the performance, since write and read actions do not require 
access to a hard drive, SSD or SD card.
To use a Redis DB with ioBroker, this must be specified in the js-controller basic configuration.

### State
See state or objects

### vis
The VIS adapter allows you to create your own operating and visualization surfaces for ioBroker 
and display them on different devices. The surfaces are composed of customizable widgets and 
their own HTML-code and can be changed by CSS in the appearance.

### Widget
A control in Vis. Widgets are used to display or control states; For example, a lamp can 
be switched on and off via a button, which changes its appearance depending on the switching state.
