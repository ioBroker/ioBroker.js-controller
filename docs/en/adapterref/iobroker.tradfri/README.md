---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.tradfri/README.md
title: Ikea tradfri adapter
hash: ej5aOPKAJf0ewg/X6ytf+TQlHjvMC80iVwHKlgx1ouo=
---
--- local: true --- ![logo](../../../de/adapterref/iobroker.tradfri/media/tradfri.png)

# Ikea tradfri adapter
## Tradfri
Tradfri is a SmartHome system from Ikea. At the present time, this system comprises various components:

- Lamps (lamps)
- LED panels / moldings for walls and cabinets / cabinet doors
- Motion detector
- Blinds for windows
- Remote Control
- central gateway

The Tradfri system is thus one of the most comprehensive SmartHome component system on the market.

## Requirements for using Tradfri with ioBroker
- RaspberryPi 3 Model B +
- Tradfri Gateway
- Tradfri components (eg bulbs or motion detectors etc.)
- Tradfri remote

## Administration and control of Tradfri with ioBroker
To optimally manage and control Tradfri with ioBroker you need the following adapter:

1. Ikea Tradfri

This adapter connects to the central Tradfri Gateway It synchronizes components (lamps, motion detectors, etc.), scenes, Tradfri Gateway and ioBroker system variables. Fig. 01 shows a simplified representation of the communication between ioBroker, gateway and components.

![communication process](../../../de/adapterref/iobroker.tradfri/media/TradfriOverview_002.PNG)

### Installing the adapter and configuring the instance
<b>Step 1.</b>

- Install the adapter by clicking! [Adapter] (media / Adapter.PNG) in the left navigation bar of the web interface
- search / filter in the appearing page, in the search for "Ikea Tradfri" (see Fig. 01)
- install the adapter via the icon! [Plus] (media / plus.PNG) (last column, far right). (auto will be a new instance here

  of the adapter under ![instances](../../../de/adapterref/iobroker.tradfri/media/instanzen.PNG))

![Add Ikea Tradfri Adapter](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_002.PNG)

<b>Step 2.</b>

- By changing the view in the left navigation bar! [Instances] (media / instanzen.PNG) become the currently existing ones

Instances displayed. After setting the filter to "Tradfri" all running "Tradfri" instances are displayed.
This should be the same as the figure below.

![Ikea Tradfri instance view](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_003optimiert.PNG)

- The following display / action options exist in the column of the respective instance Described from left to right.
- <b>Display activity</b> status (simple traffic light system)
    -! [Status Green] (media / status_green.PNG) -> Instance is running within the expected parameters, all ok
    -! [Status Yellow] (media / status_yellow.PNG) -> Instance is running, but there may be problems with the configuration of the Tradfri Gateway
    -! [Status Red] (media / status_red.PNG) -> Instance is started, but has problems to connect to the host.
- <b>Actions</b>
    -! [Start Instance] (media / starting.PNG) Start and! [Stop Instance] (media / stop.PNG) Stop the instance allow these buttons
    -! [Start Instance] (media / configuration.PNG) Access to the configuration area of the instance
    -! [Start Instance] (media / reload.PNG) instance will be restarted
    -! [Start Instance] (media / delete.PNG) Instance is irretrievably deleted