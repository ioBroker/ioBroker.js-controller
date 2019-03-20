---
translatedFrom: de
editLink: https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/en/adapterref/iobroker.fritzbox/README.md
title: AVM Fritz! Box®
hash: UNYl6432B1pCnKDk0V2Z7edxI3hF9W+es5x6X5YupAo=
---
! [Logo] (media / fritzbox.png)

# AVM Fritz! Box®

In the Fritz! Box (own spelling of the manufacturer AVM) is the
most widely used router in the market.

There are now models for all common Internet connection types: DSL,
Cable, cellular and fiber access.

## Adapter Fritzbox

The adapter establishes a connection between Fritzbox (short FB) and ioBroker ago
and provides data and lists about calls.

## Prerequisites before installation

The data exchange takes place via the * Callmonitor * integrated in the FB. Around
To activate this one calls the following number from a connected telephone
on:

\ # 96 \ * 5 \ * - Turn on the Call Monitor

\ # 96 \ * 4 \ * - Turn off the call monitor

## configuration

### Settings

Here is only to activate, which data should be transmitted in which form. Lt. Developers are unnecessary data fields (see graphics and thread in the forum); There are no updates to this adapter, as it can be replaced with the more powerful "TR-064" adapter.

[Forum post] (media / konfig_fehler.png)

<p> More information in the forum <a href="https://forum.iobroker.net/viewtopic.php?f=20&t=3344&hilit=fritzbox" title="title">in this thread</a> </p>

### Autosetup

s. Settings

## instance

Under * Instances * of the ioBrokers you can find the installed instance of the
Adapter. On the left is visualized in the traffic light system, if the adapter is activated and
connected is.

! [Instance] (media / instanz.png)

If you place the mouse pointer on a symbol, you will get detailed information.

## Objects of the adapter

In the Objects area, all of the FBs are the adapter in a tree structure
transmitted values, lists and information (see settings).

Directly in the instance folder * fritzbox.x * you will find the data point * Message *
Date, time and type of last action.

! [Folder hierarchy] (media / ordnerbaum.png)

The following are the respective channels and the data points created therein
briefly described.

### channel callmonitor:

Data points show the calls in real time

| ** data point ** | ** Description ** |
| ---------------- | -------------------------------- --------------------------------------- |
| all | Display of date, time and phone number; on and off |
| call | Display of date, time and phone number; starting |
| connect | Display of date, time and phone number of an existing connection |
| ring | Display of date, time and number of outgoing calls |

### Channel calls

Within this channel are 2 more channels as well as some data points
created:

! [Channel Calls] (media / calls.png)

| ** data point ** | ** Description ** |
| ---------------------- | -------------------------- ------------------- |
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

#### counterActualCalls

Here are the values of the different counters of current calls in real time
listed:

| ** data point ** | ** Description ** |
| ---------------- | -------------------------------- ---------------------- |
| allActiveCalls | Number of active calls (existing, incoming) |
| callCount | Number of outgoing calls |
| connectCount | Number of existing connections |
| ringCount | Number of incoming calls |

#### telLinks

The data points listed below are formatted as a link, so that the
corresponding number can be dialed via the link (for example via a widget in VIS):

| ** data point ** | ** Description ** |
| ------------------------- | ----------------------- ----------------------- |
| callLastNumberTel | Last incoming call |
| ringLastMissedNumberTel | Last missed call |
| ringLastNumberTel | Redial, last dialed phone number |

### channel cdr

These data points provide information in formatted form (s.
settings)

| ** data point ** | ** Description ** |
| ---------------- | -------------------------- |
| html | Last call |
| json | |
| missedHTML | Last missed call |
| missedJSON | |
| txt | Last call |

### channel history

These data points provide tables of formatted form. Which
Information can be transmitted, can be specified in the settings

| ** data point ** | ** Description ** |
| ----------------- | ------------------ |
| allTableHTML | |
| allTableJSON | All calls |
| allTableTxt | |
| missedTableHTML | Missed Calls |
| missedTablejSON | |

### channel system

| ** data point ** | ** Description ** |
| ---------------- | -------------------------------- ---------------------------- |
| deltaTime | Delta time between ioBroker system time and Fritzbox in sec |
| deltaTimeOK | Test result (true / false) |

## FAQ

Q: There is the Fritzbox and the TR-064 adapter, which also on FB call monitor
accesses. Where are the differences, do both adapters have to be installed?

A: The Fritzbox adapter comes from the initial phase and provided by the
possible information of the router only those available, the calls
concerned.

TR-064 can be considered as a development, because this adapter a lot
provides more extensive information, e.g. on the filed at the FB
Equipment.

In principle, it is sufficient if one of the two adapters is installed. But there are many
long-standing users use the FB adapter and their on
Visualization, it remains available but will not
more evolved.

Newcomers are advised to install the [TR-064 Adapter] (https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.tr-064). </ p>