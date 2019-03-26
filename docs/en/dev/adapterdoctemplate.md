---
title: development
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdoctemplate.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: rrrjyCfMyLCz6GbkLq/cltXrIL8D5wQPGBmpWRj2Bsk=
---
# Template for creating an adapter documentation
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

~~~ markdown --- title: "{page title}" lastChanged: "{modification date of the article}" editLink: "{link to this file on GitHub}" ---

!> Warning! This template is far from final! Example implementation is [harmony adapter](adapterref/docs/iobroker.harmony/de/README).

# <img src="media/{Adaptericon}" width=150 hight=150/> {Name} adapter adapter
This section provides an end-user friendly summary of the adapter's intended use. This summary should be kept short (maximum 1-3 small paragraphs). It should just contain so much information that the user's interest is aroused and he can decide if the adapter is relevant to him.

Technical background information on the adapter and any devices is available in the section "Overview".

<!-- Einführungsbild--> ![{old picture name}](../../de/dev/media/{Bild} "{Image Description") <span style="color:grey">* {image description} *</span>

<details open><summary> contents </summary><p>

| Navigation |
| 1 §§LLLL_0§§ |
| 2 §§LLLL_0§§ |
| 3 §§LLLL_0§§ |
| 4 §§LLLL_0§§ |
| 5 §§LLLL_0§§ |
| 6 §§LLLL_0§§ |
| 7 §§LLLL_0§§ |
| 8 §§LLLL_0§§ |
| 9 §§LLLL_0§§ |
| 10 §§LLLL_0§§ |
| 11 §§LLLL_0§§ |
| 12 §§LLLL_0§§ |
| 12 [History] (# history) |

</ P> </ details>

<a name="steckbrief"/>

## Characteristics
> Attention! The following table is only an example. It is generated dynamically by the document generator and inserted at this point.
Depending on the selected fields, the data sources are e.g. `frontmatter`, `io-package.json` and `package.json` of the respective adapter.

|                         |                              |
|-------------------------|:----------------------------:|
| Status of the documentary | {date:} |
| current version stable | ! [stable] [logo] |
| current version latest | ! [latest] [logo] |
| OS | supported OS |
| node version | supported node versions |
| Developer | Name / alias of the developer |
| Github | LINK |
| License | WITH | |
| Keywords | `Suchworte` |
| Dependencies | `dependencies` |
| Dependencies | `dependencies` |

<a name="überblick"/>

## Overview
### {Tailored System}
This section explains the basics of any connected system or procedure. What is it good for? What can you do with it? How is the communication done? What is the system structure? Which framework conditions exist?

### {adapter name} adapter
Here are background information about the adapter. This can be information about the device in the context of a device adapter, or, in the case of an adapter for a communication protocol, basics for the protocol.
Nevertheless, this text should be universally understandable for beginners.

<a name="voraussetzungen"/>

## Prerequisites before installation
The user receives information here, which steps, if necessary, before the installation of the adapter u.a. on external systems. These include e.g. the registration of API keys or the configuration of connected system according to manufacturer documentation.

<a name="installation"/>

## Installation
Here special features for the installation are described, which exceed the scope of the **here** documented standard installation. This can e.g.
manual installation of software before the actual adapter installation or the activation of ports on the server.

> An instance of the adapter is installed via the ioBroker Admin interface.
The detailed instructions for the necessary installation steps are described **here**

<a name="konfiguration"/>

## Configuration
Short introduction to the configuration. For each admin window, a separter section is provided.

<a name="{Eindeutiger Fensterbezeichner}"/>

### Window "{Window title}"
![{Alt-name}](../../de/dev/media/{Formularfelderbild} "{Image} Description") <span style="color:grey">* {image description} *</span>

| Field | Description |
|:-------------------|:-------------|
| **{Form field 1}** | {Description} |
| **{Form field 2}** | {Description} |
| **{form field}** | {description} |

Space for special notes.

<a name="{Eindeutiger Fensterbezeichner}"/>

### Window "{Window title}"
![{Alt-name}](../../de/dev/media/{Formularfelderbild} "{Image} Description") <span style="color:grey">* {image description} *</span>

| Field | Description |
|:-------------------|:-------------|
| **{Form field 1}** | {Description} |
| **{Form field 2}** | {Description} |
| **{form field}** | {description} |

Space for special notes.

Final text for configuration

> After completing the configuration, the configuration dialog is quit with `SPEICHERN UND SCHLIEßEN`. This will result in a subsequent restart of the adapter.

<a name="instanz"/>

## Instances
> The installation of the adapter has created an active instance of the {adapter name} adapter in the section `Objekte`.

![instance](../../de/dev/media/a_harmony_instanz.png "instance") <span style="color:grey">* First instance *</span>

Space for more information about instances of the adapter. For example, whether multiple instances can be installed on a server or how instances behave on multihost systems.

> Whether the adapter is enabled or connected to the {device} is indicated by the color of the status field of the instance. If the mouse pointer points to the symbol, further detailed information is displayed.

<a name="objekte"/>

## Objects of the adapter
> In the section `Objekte` all devices and activities detected by the adapter in the hub are listed in a tree structure. In addition, information is also provided as to whether the communication with the hub takes place smoothly.

![old objects Name](../../de/dev/media/{Bildname} ""{Image} Description") <span style="color:grey">* {image description} *</span>

> The created objects and their meanings are defined as follows:

Object | Access | Description: ------------------------- |: -------: |: ----------- **{instance}** | R | Name of the first *instance* of the adapter &emsp; **{subobject}** | R | Name of *{...}* list, meaning ...
&emsp; **** {sub-object}** | R | Name of *{...}* list, meaning ...
&emsp; &emsp; ***{Datapoint}*** | R / W | Description of the data point with function &emsp; & nbsp; ***{data point}*** | R / W | Description of the data point with function

The table attempts to simplify the presentation of the object tree and to illustrate the meaning and application of the individual objects to the user. It provides the reference documentation for the user for e.g. the accesses to the object hierarchy using JavaScript.

### {More in-depth explanation of object groupings}
Here excerpts of the object tree can be highlighted and specially considered.

#### {For more in-depth explanations of individual objects or features}
Since the space for descriptions in the object table is usually not sufficient here, e.g. individual data points are documented in more detail.

Example of writable data points:

#### Starting an activity Activities are started when you enter a number greater than 0 for an activity `{Instanz}.{Hub Name}.activities.{Aktivität}`.
During the execution of the activity, this value first changes to 1 (= starting) and then to 2 (= active).
### {More in-depth explanation of object groupings}
According to the structure of the object tree and the function of the adapter given here individual design options.

Example for the description of individual data points:

#### Status values `{Instanz}.{Hub Name}.activities.currentActivity` returns the currently running activity as a string.
`{Instanz}.{Hub Name}.activities.currentStatus` indicates the status of the Harmony Hub. The values mean

- 0 = inactive
- 1 = starting
- 2 = active

## Deinstallation
If the instance is to be removed again, it will be removed via the assigned trashcan icon in the Instances column

<img src="media/adapter_AdapterName_delete_01.png">

A confirmation prompt appears, which must be confirmed with ***OK***

<img src="media/adapter_AdapterName_delete_02.png">

Then, a window will appear again showing the processing of the uninstall commands

<img src="media/adapter_AdapterName_delete_03.png">

This uninstall removes all objects belonging to the instance completely.

If the installation files are completely deleted from the host, this must be done via the trashcan icon in the AdapterName adapter's tile in the Adapters section.

## Examples / demo
Lorem ipsum

## Particularities
Backup Multihost History Performance

## Known problems
* What ever

  Solution:

* and a very bad bug

  Solution:

* the devil knows

  Solution:

## Integration of States
### Blockly
Lorem ipsum

### Node-Red
Lorem ipsum

### Vis
Lorem ipsum

### History
Lorem ipsum

## Left
There are also links to GitHub (developer area?) And external resources? But please not at the beginning of the documentary, rather at the end.
First the light food.

## Developer area
~~~