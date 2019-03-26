---
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
title: Basics
hash: 46Emgb6RhhtKOmznvzllM65gAhQS1y+ya+CTcZGe9ME=
---
# Basics
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Primarily, in this section of the documentation, the "WHAT it is", not "HOW

After reading the basics, the user should be able to rudimentarily understand and assign the various ioBroker-specific terms.

Goal is short and crisp explain, 2-4 lines, if necessary, the whole is later rebuilt as a long-scroller page.

The basic articles should refer to the respective detailed descriptions.
@@@

## Definition of terms
To make it easier to get started and to understand the further help, here are the most important terms that are explained in and around the ioBroker.

* `Host`: the device on which ioBroker is installed
* `Adapter`: a module or plug-in for the ioBroker, for example to communicate with hardware
    - cant be started
    - There can be only one adapter per host
* `Instanz`: executable copy of an adapter
    - Executes the code provided by the adapter
    - can be started and stopped
    - can have settings
    - Adapter must be installed to have instances of the adapter
* `Objekt`: Field in which data can be stored
    - Most instances create a `channel`
    - a `channel` is an object that acts as a folder
* `Aufzählung`: contains for example a list of rooms
* `Log`: Protocol of which errors have accumulated
    - filterable by severity of the event, instance and more
* `Ereignisse`: List of all changes to objects