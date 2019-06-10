---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/states.md
title: States and data points
hash: x/QuY94TT/pzS/xmrB0cz48nq3lzLiiE8agZlTlcnfo=
---
# States and data points
A **data point** consists of a static object of type "state" and of a dynamic state.

Properties of a state are

 * val - current value
 * ack - Flag indicating the confirmation of the value by the target system
 * ts - Unix timestamp of last state update (in milliseconds)
 * lc - Unix timestamp of the last value change (in milliseconds)
 * q - [quality] (../ dev / objectsschema # states)
 * from - (optional) source (adapter instance) of the last update
 * user - (optional) user name, who last wrote the value.
 * c - (optional) comment
 * expire - (optional) Time in seconds when the value will reset to `null`.

?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.