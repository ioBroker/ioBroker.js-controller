---
local: true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.fritzbox/README.md
title: AVM Fritz! Box®
hash: 06n8lqJfS16vyM7UWTux0cNEVIYcWNRv2KMVnS9ngnA=
---
![logo](../../../de/adapterref/iobroker.fritzbox/media/fritzbox.png)

# AVM Fritz! Box®
In the Fritz! Box (own spelling of the manufacturer AVM) are the most widely used routers on the market.

There are now models for all common types of Internet connection: DSL, cable, mobile and fiber access.

## Adapter Fritzbox
The adapter establishes a connection between Fritzbox (short FB) and ioBroker and provides data and lists of calls.

## Prerequisites before installation
The data exchange takes place via the *Callmonitor* integrated in the FB. To activate it, call the following number from a connected telephone:

* ```\#96\*5\*``` - Switch on call monitor
* ```\#96\*4\*``` - Switch off call monitor

## Configuration
### Settings
Here is only to activate, which data should be transmitted in which form. Lt. Developers are unnecessary data fields (see graphics and thread in the forum); There are no updates to this adapter, as it can be replaced with the more powerful "TR-064" adapter.

![Post from the forum](../../../de/adapterref/iobroker.fritzbox/media/konfig_fehler.png)

Further information in the forum [in this thread](https://forum.iobroker.net/viewtopic.php?f=20&t=3344&hilit=fritzbox).

### Autosetup
see [Settings](#settings)

## Instance
Under *Instances* of the ioBrokers you can find the installed instance of the adapter. On the left is visualized in the traffic light system, whether the adapter is activated and connected.

![instance](../../../de/adapterref/iobroker.fritzbox/media/instanz.png)

If you place the mouse pointer on a symbol, you will get detailed information.

## Objects of the adapter
In the Objects area, all values, lists and information transmitted by the FB to the adapter are displayed in a tree structure (see Settings).

Directly in the instance folder *fritzbox.x* you will find the data point *Message* with the date, time and type of the last action.

![folder hierarchy](../../../de/adapterref/iobroker.fritzbox/media/ordnerbaum.png)

The respective channels and the data points created therein are briefly described below.

### Channel callmonitor
Data points show the calls in real time

| **data point** | **Description** |
|----------------|-----------------------------------------------------------------------|
| all | Display of date, time and phone number; on and off |
| call | Display of date, time and phone number; starting |
| connect | Display of date, time and phone number of an existing connection |
| ring | Display of date, time and number of outgoing calls |

### Channel calls
Within this channel, 2 more channels and some data points are created:

![Channel Calls](../../../de/adapterref/iobroker.fritzbox/media/calls.png)

| **data point** | **Description** |
|----------------------|---------------------------------------------|
| callLastNumber | Last dialed phone number |
| connectNumber | Last ongoing conversation |
| connectNumbers | all currently connected calls |
| missedCount | Counter missed calls |
| missedDateReset | Date Last Counter Reset |
| ring | Signal incoming call |
| ringActualNumber | Phone number of a currently incoming call |
| RingActualNumbers | Numbers of all currently incoming calls |
| ringLastMissedNumber | Last call |
| ringLastNumber | Telephone number of the last incoming call |

#### CounterActualCalls
Here, the values of the various current call counters are listed in real time:

| **data point** | **Description** |
|----------------|------------------------------------------------------|
| allActiveCalls | Number of active calls (existing, incoming) |
| callCount | Number of outgoing calls |
| connectCount | Number of existing connections |
| ringCount | Number of incoming calls |

#### TelLinks
The data points listed below are formatted as a link so that the corresponding number can be selected via the link (for example via a widget in VIS):

| **data point** | **Description** |
|-------------------------|----------------------------------------------|
| callLastNumberTel | Last incoming call |
| ringLastMissedNumberTel | Last missed call |
| ringLastNumberTel | Redial, last dialed phone number |

### Channel cdr
These data points provide information in formatted form (s.
settings)

| **data point** | **Description** |
|----------------|--------------------------|
| html | Last call |
| json | |
| missedHTML | Last missed call |
| missedJSON | |
| txt | Last call |

### Channel history
These data points provide tables of formatted form. The information transmitted can be defined in the settings

| **data point** | **Description** |
|-----------------|------------------|
| allTableHTML | |
| allTableJSON | All calls |
| allTableTxt | |
| missedTableHTML | Missed Calls |
| missedTablejSON | |

### Channel system
| **data point** | **Description** |
|----------------|------------------------------------------------------------|
| deltaTime | Delta time between ioBroker system time and Fritzbox in sec |
| deltaTimeOK | Test result (true / false) |

## FAQ
Q: There is the Fritzbox and the TR-064 adapter, which also accesses FB call monitor. Where are the differences, do both adapters have to be installed?

A: The Fritzbox adapter comes from the initial phase and made of the possible information of the router only those available, the calls concerned.

TR-064 can be considered a further development as this adapter offers much more extensive information, e.g. about the devices registered at the FB.

In principle, it is sufficient if one of the two adapters is installed. However, since many long-standing users use the FB adapter and have built their visualization on it, it remains available but is no longer being developed.

Newcomers are recommended to install [TR-064 Adapter](https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.tr-064/de).

## Changelog
### 0.3.1 (2016-07-24)
* (BasGo) enhanced TR-064 configuration
* (BasGo) added rudimentary phonebook download into object store

### 0.3.0 (2015-06-26)
* (UncleSamSwiss) added support for wlan.enabled (using TR-064)

### 0.2.1 (2015-06-28)
* (ruhr) more configuration options

### 0.2.0 (2015-06-26)
* (ruhr)

## License

The MIT License (MIT)

Copyright (c) 2015, ruhr70

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.