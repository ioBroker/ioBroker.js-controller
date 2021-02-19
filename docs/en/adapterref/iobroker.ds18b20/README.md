---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ds18b20.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ds18b20.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/ds18b20-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/ds18b20-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.ds18b20.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ds18b20.png?downloads=true
---
![Logo](../../admin/ds18b20.png)

# ioBroker.ds18b20

The adapter `ds18b20` enables the direct integration of 1-wire temperature sensors of the type DS18B20 into ioBroker.

An appropriate hardware with support for the 1-wire bus is required (e.g. Raspberry Pi). Also the 1-wire bus must be properly functional on the system (sensors listed in `/sys/bus/w1/devices/`).


An example of the connection of DS18B20 sensors to a Raspberry Pi can be found below.


## Features

* Read the current temperature value
* Auto detect of the connected sensors
* Detection of errors while reading a sensor (checksum, communication error, device disconnected)
* Query interval customizable per sensor
* Rundung und Umrechnung des gemessenen Wertes pro Sensor anpassbar
* Rounding and conversion of the measured value customizable per sensor

## Installation

The adapter is currently available in the latest repository.

Alternatively, it be installed using the URL `https://github.com/crycode-de/ioBroker.ds18b20.git`.


## Configuration

In the adapter configuration, a **Default query interval** can be specified in milliseconds for all sensors. Minimum is 500.

The sensors can be added to a table manually or by **Search Sensors**.

![Konfiguration](./img/config.png)

The **Address** is the 1-wire address/ID of the sensor and determines the object ID.
As an example, a sensor with the address `28-0000077ba131` gets the object ID `ds18b20.0.sensors.28-0000077ba131`.

The **Name** is used to identity the sensor. It's freely selectable by you.

For each sensor a custom **Query interval** may be specified in milliseconds.
If this field is left blank, the default query interval will be used.
Minimum is 500.

The **Unit** defines the stored unit in the ioBroker object for the value.
Default is `°C`.

Via **Factor** and **Offset** it is possible to adjust the value read by the sensor according to the formula `value = (value * factor) + offset`.

The **Decimals** indicate how many places after the decimal point the value is rounded.
The rounding takes place after the calculation with factor and offset.

**Null on error** defines how sensor read errors are handled.
If this option is set, a `null` value be written to the sensor state on error.
If unset, the state will not be updated on errors.


### Conversion from `°C` to `°F`

To get the temperatures from the adapter in `°F` you need to use `1.8` as factor and `32` as offset.


## Actions

It is possible to trigger the instant reading of one or all sensors by writing to the state `ds18b20.0.actions.readNow`.

To trigger the reading of all sensors, write `all` to the state.

To tirgger the reading of a single sensor, write the address or ioBroker object ID of the sensor to the state.


## Using in scripts

It is possible to send commands to the adapter to read from the sensors or search for sensors.

### `readNow`

Using the commans `readNow` you can trigger the instant reading of one or all sensors.
To read all sensors, the message part can be empty or set to the string `all`.
To read a single sensor, the message part must be set to the address or ioBroker object ID of the sensor.

The commant `readNow` returns no data. It will only trigger the reading of the sensors.

```js
sendTo('ds18b20.0', 'readNow');
sendTo('ds18b20.0', 'readNow', '28-0000077ba131');
```

### `read`

Via the command `read`, a single sensor can be read.
The message part must be set to the address or ioBroker object ID of the sensor.
The value can be processed by a callback function.

```js
sendTo('ds18b20.0', 'read', '28-0000077ba131', (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    }
});
```

### `search`

The `search` command will run a search for all currently connected 1-wire sensors.
The found addresses of sensors will be provided to a callback function.

```js
sendTo('ds18b20.0', 'search', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    } else {
        for (let s of ret.sensors) {
            log('Sensor: ' + s);
        }
    }
});
```


## Adapter information
Via the `ds18b20.*.info.connection` State, each adapter instance provides information on whether all configured sensors provide data.
If the last reading of all sensors was successful, this state is `true`.
As soon as one of the sensors has an error, this state is `false`.


## DS18B20 connected to a Raspberry Pi

The connection of DS18B20 temperature sensors to a Raspberry Pi is done as shown in the following figure.
Note that the pullup resistor must be connected to +3.3V instead of +5V, as this would damage the GPIO.
In this example the GPIO.04 (BCM) is used.

![DS18B20 Raspberry Pi](./img/raspi-ds18b20.png)

To activate the 1-Wire bus on the Raspberry Pi, add the following line in the file `/boot/config.txt` and then restart the Raspberry Pi.
```
dtoverlay=w1-gpio,gpiopin=4
```

If everything works, the connected sensors will be visible under `/sys/bus/w1/devices/`.
```
$ ls -l /sys/bus/w1/devices/
total 0
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b4592 -> ../../../devices/w1_bus_master1/28-0000077b4592
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b9fea -> ../../../devices/w1_bus_master1/28-0000077b9fea
lrwxrwxrwx 1 root root 0 Nov  2 10:49 w1_bus_master1 -> ../../../devices/w1_bus_master1
```

### Kernel bug at negative temperatures

There was a bug in the 5.10.y kernel of the Raspberry Pi since november 2020 which lead to negative temperatures be read as e.g. 4092 °C. (see [GitHub Issue](https://github.com/raspberrypi/linux/issues/4124))  
This bug was fixed in kernel 5.10.14 at 2021-02-08. (see [GitHub Commit](https://github.com/Hexxeh/rpi-firmware/commit/115e3a5f77488d9ee30a33bcb5ac31eb587f60a8))  
So a `rpi-update` should fix the problem.

Adapter versions until v1.2.2 these obviously wrong values are transferred to the ioBroker State.  
Since v1.2.3 the adapter checks if the read values are plausible (between -80 and +150 °C) and discards unplausible values.

## Integration of sensors from a remote raspberry pi

It's also possible to integrate sensors which are connected a remote raspberry pi.
For this purpose, the corresponding directory is shared on the remote Raspberry Pi using *samba* and then mounted on the ioBorker system.

### Configuration on the remote raspberry pi

Installation of samba:
```sh
sudo apt install samba
```

Configuration in `/etc/samba/smb.conf`:
```ini
[ds1820]
path = /sys/devices/w1_bus_master1
comment = DS1820 Temperature sensors.
available = yes
browseable = yes
guest ok = yes
writeable = no
force user = root
force group = root
```

Restart samba to apply the changes:
```sh
sudo systemctl restart smbd
```

### Configuration on the ioBroker system

Installation of samba client:
```sh
sudo apt install smbclient
```

Add an entry for the mount in `/etc/fstab`:
```
//<IP-ADRESS-REMOTE-RPI>/ds1820 /mnt/remote-ds1820 cifs defaults,vers=1.0 0 0
```

Create directory for the mount point:
```sh
sudo mkdir -p /mnt/remote-ds1820
```

Mount it:
```sh
sudo mount /mnt/remote-ds1820
```

### Adapter configuration
In the adapter configuration you have to set the system path for the 1-wire devices to the mountpoint `/mnt/remote-ds1820`.

If there are also sensors directly connected to the ioBroker system, you should add an extra instance of the adapter for the remote sensors.

## Changelog

### 1.4.0 (??)
* (crycode-de) [WIP] Support for remote sensors using an own tiny daemon and encryped TCP sockets
* (crycode-de) Set `q` flag to `0x81` (general problem by sensor) if a sensor reported a `null` value

### 1.3.0 (2021-02-11)
* (crycode-de) Searching for sensors now works for multiple 1-wire masters

### 1.2.3 (2021-02-11)
* (crycode-de) Added check of temperatures higher/lower than possible sensor values

### 1.2.2 (2021-02-06)
* (crycode-de) Fixed crash if settings are malformed (IOBROKER-DS18B20-3)

### 1.2.1 (2021-01-09)
* (crycode-de) Small fixes
* (crycode-de) Updated dependencies

### 1.2.0 (2020-12-21)
* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies
* (crycode-de) Optimized npm package

### 1.1.5 (2020-10-14)
* (crycode-de) Fixed incorrect data type of object
* (crycode-de) Updated dependencies

### 1.1.4 (2020-02-03)
* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.1.3 (2020-01-23)
* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.1.2 (2020-01-22)
* (crycode-de) Better handling of changed objects in admin.

### 1.1.1 (2020-01-09)
* (crycode-de) Fixed wrong communication errror detection on some sensors.

### 1.1.0 (2019-11-11)
* (crycode-de) Own implementation of reading the sensor data.
* (crycode-de) Fixed bug on decimals rounding.
* (crycode-de) 1-wire devices path is now configurable.

### 1.0.3 (2019-11-03)
* (crycode-de) Added documentation about DS18B20 at a Raspberry Pi; Dependencies updated

### 1.0.2 (2019-10-07)
* (crycode-de) Display error message when tried to search for sensors without adapter running.

### 1.0.1 (2019-10-01)
* (crycode-de) Type changed to hardware, Renamed command, Added missing documentation

### 1.0.0 (2019-09-09)
* (crycode-de) initial release

## License

Copyright (c) 2019-2021 Peter Müller <peter@crycode.de>

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.