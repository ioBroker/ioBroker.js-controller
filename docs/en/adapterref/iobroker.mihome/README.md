---
local: true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.mihome/README.md
title: ioBroker Mi Home Adapter
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
---
![logo](../../../de/adapterref/iobroker.mihome/media/mihome.png)

# IoBroker Mi Home Adapter With the Mi Home Adapter, a Mi Control Hub (gateway) is integrated into an ioBroker system and thus enables various Xiaomi sensors, switches, etc. to communicate with ioBroker.
Via ioBroker e.g. the lighting and the loudspeaker of the gateway are controlled.

## Requirements
* Mi Home app on Android or iOS device and unlocked local network function
* Connected Mi Home Gateway
* Ready ioBroker system

### Installation of the Mi Home app and activation of the local network function
#### Android
* Download, install, open and open the [Android app] (https://play.google.com/store/apps/details?id=com.xiaomi.smarthome) on an Android device

agree to the terms and conditions.

* Select *Mainland China* as the country
*Create an account via * Login*
* After successful registration, add a device using `+`
* Under *Household security* select the `MI Control Hub` and the instructions

consequences

* After successfully integrating the gateway, the 3 dots on the top right screen

and then press *About*

* Type the text *Plug-in version* below 10 times
* Now the developer mode is switched on and it should after a certain time

2 further menu items appear> If not, try again

* Select the menu item `Wireless communication protocol`
* Switch on the slide switch at the top, note the password and confirm with `OK`.

> The password will be needed later for the ioBroker installation.

Now further devices can be taught in using the `+` symbol.

#### IOS
* [iOS app] (https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8) download, install, open and the on an iOS device

I agree to the privacy policy

* Select the country *mainland* via Profile / Settings / Country Settings.
*Create an account via * Login*
* After successful registration, add a device using `+`
* Under *Household security* select the `MI Control Hub` and the instructions

consequences

* After successfully integrating the gateway, the 3 dots on the top right screen

press and press *About*

* Repeatedly tap in the empty lower area
* Now the developer mode is switched on and it should after a certain time

further menu items appear> If it doesn't work right away, repeat the steps

* Select the 4th menu item
* Switch on the slide switch at the top, note the password and confirm with `OK`.

> The password will be needed later for the ioBroker installation.

Now further devices can be taught in using the `+` symbol.

### Setting on the router
Under About / Hub info, the IP address of the gateway used by the gateway can be determined in the text after _localip_. This IP should be permanently assigned to the gateway in the router used.
If operation of the taught devices via the app is no longer wanted, the gateway's Internet access can also be switched off after all devices have been taught in the router.

### Supported devices
The following list does not claim to be complete:

- gateway - Xiaomi RGB gateway
- sensor_ht - Xiaomi Temperature / Humidity
- weather.v1 - Xiaomi Temperature / Humidity / Pressure
- switch - Xiaomi Wireless Switch
- sensor_switch.aq2 - Xiaomi Aqara Wireless Switch Sensor
- sensor_switch.aq3 - Xiaomi Aqara Wireless Switch Sensor
- plug - Xiaomi Smart Plug
- 86plug - Xiaomi Smart Wall Plug
- 86sw2 - Xiaomi Wireless Dual Wall Switch
- 86sw1 - Xiaomi Wireless Single Wall Switch
- natgas - Xiaomi Mijia Honeywell Gas Alarm Detector
- smoke - Xiaomi Mijia Honeywell Fire Alarm Detector
- ctrl_ln1 - Xiaomi Aqara 86 Fire Wall Switch One Button
- ctrl_ln1.aq1 - Xiaomi Aqara Wall Switch LN
- ctrl_ln2 - Xiaomi 86 zero fire wall switch double key
- ctrl_ln2.aq1 - Xiaomi Aqara Wall Switch LN double key
- ctrl_neutral2 - Xiaomi Wired Dual Wall Switch
- ctrl_neutral1 - Xiaomi Wired Single Wall Switch
- cube - Xiaomi Cube
- sensor_cube.aqgl01 - Xiaomi Cube
- magnet - Xiaomi Door Sensor
- sensor_magnet.aq2 - Xiaomi Aqara Door Sensor
- curtain - Xiaomi Aqara Smart Curtain
- motion - Xiaomi motion sensor
- sensor_motion.aq2 - Xiaomi Aqara motion sensor
- sensor_wleak.aq1 - Xiaomi Aqara water sensor
- ctrl_ln2.aq1 - Xiaomi Aqara Wall Switch LN (Double)
- remote.b286acn01 - Xiaomi Aqara Wireless Remote Switch (Double Rocker)
- remote.b1acn01 - Xiaomi Aqara Wireless Remote Switch
- vibration - Xiaomi vibration sensor
- wleak1 - Xiaomi Aqara Water Sensor
- lock_aq1 - Xiaomi Lock

## IoBroker Mi Home Adapter installation
Further settings are only made via the ioBroker admin interface.
Find the adapter in the *Adapter* area and install it using the `+` symbol.

![logo](../../../de/adapterref/iobroker.mihome/media/Adapter.png)

The following configuration window then opens:

![logo](../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

Enter the password determined above under `Default Gateway Key` and press * save * * and close * to close the window. The running adapter should then be displayed in green under * Instances *:

![logo](../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

The gateway and its learned devices are now displayed under *Objects*

![logo](../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

The instructions were created to the best of our knowledge and belief.

## Changelog

### 1.3.5 (2020-09-17)
* (Apollon77) Fix crash cases (Sentry IOBROKER-MIHOME-1..4)

### 1.3.4 (2020-08-31)
* (Alan) Fixed the crash for non existing attributes 

### 1.3.3 (2020-08-26)
* (bluefox) Sentry is activated

### 1.3.2 (2020-08-25)
* (VLGorskij) Added ac-partner.v3 support
* (bluefox) Added compact mode

### 1.3.1 (2020-08-19)
* (Diginix) Fixed calculation for sensor's battery percentage

### 1.3.0 (2020-01-16)
* (algar42) Ability to add devices with missing model by their SID ([e.g. for Aqara two-channel relay](https://github.com/algar42/ioBroker.mihome#usage))

### 1.2.9 (2019-11-15)
* (Diginix) Fixed pressure range and values of Aqara weather sensor

### 1.2.8 (2019-07-18)
* (SchumyHao) Change curtain and gateway light role that making them can be detected by type-detector

### 1.2.7 (2019-06-25)
* (SchumyHao) Add several devices support for protocol 2.0.x

### 1.2.6 (2019-03-04)
* (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
* (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
* (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
* (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
* (bluefox) refactoring

### 1.1.2 (2018-10-08)
* (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
* (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
* (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
* (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
* (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
* (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
* (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
* (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
* (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
* (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
* (bluefox) Do not overwrite the names
* (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
* (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
* (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
* (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
* (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
* (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
* (bluefox) fix battery level

### 0.1.4 (2017-06-09)
* (bluefox) add cube
* (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
* (bluefox) Initial commit

## License
MIT

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>