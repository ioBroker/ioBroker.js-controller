---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/states.md
title: States and data points
hash: Xf+KPTFAdFGOqP7KlNWG4FdGE/AHc3NgDv9W5uKB/2M=
---
# States and data points
A **data point** consists of a static object of type "state" and of a dynamic state.

Properties of a state are

 * val - current value
 * ack - Flag indicating the confirmation of the value by the target system
 * ts - Unix Timestamp of the last update of the state
 * lc - Unix Timestamp of the last value change
 * from - Source (adapter instance) of the last update
 * q - quality

?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.