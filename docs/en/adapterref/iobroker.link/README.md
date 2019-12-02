![Logo](admin/link.png)
# ioBroker.link

[![NPM version](http://img.shields.io/npm/v/iobroker.link.svg)](https://www.npmjs.com/package/iobroker.link)
[![Downloads](https://img.shields.io/npm/dm/iobroker.link.svg)](https://www.npmjs.com/package/iobroker.link)

[![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)](https://nodei.co/npm/iobroker.link/)

This adapter allows secure connection over [ioBroker.link](https://iobroker.link/) cloud.

## FAQ

### What can I do using this adapter?
This adapter allows to securely connect to a local ioBroker installation and other server/devices in your local network behind a DSL modem/router/firewall. The connection is made via publicly available ioBroker.link cloud (link-cloud). Even multiple local ioBroker installation can be set up and accessed via the link-cloud.

### What is the difference to a port forwarding that I could configure on my router?
While you can configure a port forwarding on your router and so access your local ioBroker installation from everywhere the link-cloud provides the following major advantages:
- no ports have to be opened on your router to the internet
- no public IP or (dynamic)DNS name required for your local ioBroker installation
- link-cloud takes care about authentication and authorization
- link-cloud secures a connection using SSL/TLS
- link-cloud provides an audit log 
- multiple local ioBroker installations can be accessed through the same UI of the link-cloud server
- ioBroker.link adapter acts as a reverse proxy and allows to access other server/devices in your local network that support HTTP/TCP/UDP protocols
- your can grant a temporary or permanent access to your local ioBroker installation to a 3<sup>rd</sup> person, e.g. to troubleshoot device outages, without a need to reveal your password or manage credentials

### How a connection to my local ioBroker installation can be established if there is no public IP and no ports opened?
The link-cloud never connects to your local installation, it's the ioBroker.link adapter which runs locally and initiates a connection to the link-cloud in case there is a connection request.

### What is a _connection request_?
A connection request is an intention to establish a connection to a local ioBroker installation made by an authenticated and authorized person via the link-cloud.

### How the ioBroker.link adapter recognizes that there is a connection request?
An ioBroker.link adapter periodically checks for pending connection requests by polling the link-cloud. You can set up the poll interval in the settings of the ioBroker.link adapter.

### How can I ensure that ioBroker.link adapter establishes a connection to the link-cloud and not to a man-in-the-middle?
ioBroker.link adapter can only connect to a server that presents a valid SSL certificate issued to ioBroker.link.

### How the link-cloud identifies and authorizes all the ioBroker.link adapters polling for pending connection requests or establishing a connection?
Every ioBroker.link adapter generates its own unique 2048 bit key-pair. Upon registration at link-cloud an adapter transmits its public key. On every subsequent request to the link-cloud (check for pending connection requests, accept or deny a pending connection, close an open connection, etc.) the adapter authorizes itself by providing a JSON Web Token (JWT) signed with the adapter's private key. The link-cloud verifies the signature of JWT using the stored public key and accepts or rejects the connection.

### Can one adapter connect to a link-cloud using another's adapter JWT?
No. An adapter signs a JWT using its own unique private key which never leaves the local installation. The link-cloud uses the corresponding public key to verify the signature.

### Can I increase the security by rotating the keys used to authorize my adapter?
Yes. The keys are stored in the /keys folder of your adapter installation. Delete all the files in this folder and restart the adapter. The adapter will create a new key-pair on startup and refresh the registration at link-cloud by sending the new public key.

### How an established connection itself is secured?
If there is a pending connection request, an ioBroker.link adapter first establishes an SSH tunnel to the link-cloud and accepts the incoming connection. The both sides authorize themselves by means of certificates. Once SSH tunnel is set up, the communication itself begins. As soon as the connection is closed, e.g., by a user via the link-cloud server UI, the SSH tunnel closes and no communication is possible any longer.

### Is it possible also to connect to my local devices via the link-cloud?
Yes. If your devices support HTTP protocol, then you can access them via the link-cloud. Every device you'd like to connect to via the link-cloud must be explicitly configured in the ioBroker.link adapter settings. No device can be connected to by default. Even the ioBroker.admin Web-UI has to be configured first in order to be able to connect to.

### What do I need to install to connect to my local devices via the link-cloud?
A connection to local devices supporting HTTP protocol is made via the browser of your choice. No additional software is required.

### My local device supports only TCP/UDP protocol. Is a connection to TCP/UDP devices also possible?
Yes. In order to connect to local TCP/UDP devices please use ioBroker.link-box: https://www.npmjs.com/package/iobroker.link-box

### How do I grant an access to my local ioBroker installation?
Anyone who should be granted access to a local ioBroker installation has to be explicitly configured in the ioBroker.link adapter settings. No one has access by default. That means that you also have to configure yourself in order to be able to connect to your own local ioBroker installation.

### How and where do I create the user that I'd like to grant the access to my local installation?
First you have to create a free account at https://iobroker.pro. Once created, you can configure the registered e-mail in the ioBroker.link adapter _Allowed users_ setting. No password has to be provided in the adapter cconfiguration.

### I have already an account on https://iobroker.pro. Can I use it for the link-cloud?
Yes. You can use already existing https://iobroker.pro account.

### Is it possible to use https://iobroker.pro and link-cloud services at the same time?
Yes. There are no dependencies between these two services. You can use them separately or in parallel.

### Why does the link-cloud use https://iobroker.pro accounts?
The link-cloud doesn't use the https://iobroker.pro accounts. No information associated with https://iobroker.pro accounts is transferred/available to the link-cloud. The link-cloud just federates the authentication to the https://iobroker.pro. The authorization, in their turn, is handled completely by the link-cloud.

### How can I revoke access to my local installation?
You can revoke the access permissions granted to individual persons by removing their e-mails from the _Allowed user_ setting of the ioBroker.link adapter. Alternatively you can totally prevent access to your local installation by leaving _Allowed users_ setting empty. Also stopping or removing the ioBroker.link adapter will prevent any access via the link-cloud.

### Do I have any charges while using the link-cloud?
At the moment there are no charges applied and the link-cloud is completely free to use. It's also independent whether you use your free or paid https://iobroker.pro account. Please be aware this might be changed in the future.

### Why do you plan to charge for this simple service?
Even this simple service requires infrastructure running around the clock and produces costs. Ensuring the high availability of this service, troubleshooting the outages and improving or adding new functionality consumes a significant amount of our time. To consecrate ourselves on further development we need chips. That would allow our wives to go shopping and give us more time to pay attention to this project.

### What are the limitations of the link-cloud?
At the moment only a single connection can be opened to a local ioBroker installation. That means if multiple users are granted access permissions to a local installation only one user at a time is able to connect to. Also the only connection per user is allowed. That means the same user, granted access permission to multiple local installations, can access only one installation at a time.

### How can I track who and when has accessed my local installation?
All requested connections' meta data is persisted and can be viewed under https://iobroker.link.

## Adapter configuration :: Main Settings

### Client Name
This is the name of your local ioBroker installation. You can choose it freely. It helps you to distinguish different ioBroker installations while making a connection request via the link-cloud.

### Server URI
This is the domain name of the link-cloud. This setting is preconfigured with https://iobroker.link and should be changed.

### Proxy URI
If your ioBroker installation is behind a proxy your can configure the proxy server here. Proxy can be defined here as: *http://proxy:8080* or via **HTTPS_PROXY** environment variable.

### Poll interval (sec)
Defines how often your adapter polls the link-cloud for pending connection requests. 
Recommended setting: 10

### Allowed users
Defines the existing https://iobroker.pro accounts that have to be granted access permissions to your local ioBroker installation.

In case you want to grant the access to yourself and your wife and assuming you have provided me@gmail.com and darling@gmail.com while creating the https://iobroker.pro accounts the _Allowed users_ setting will contain these both e-mail addresses.

## Adapter configuration :: Devices
Here you define a list of devices that will be accessible via the link-cloud.

### enabled
Defines whether the configured device should be accessible.

### Name
The freely chosen name of the device. It helps to distinguish between different devices while connecting via the link-cloud.

### IP
The IP address of a device to connect in your local network. Your can provide a hostname, e.g., _localhost_, instead of IP address, but be aware that this name has to be resolvable on the machine your ioBroker-link adapter is running on, as well as that hostnames cannot be used for UDP devices.

### Port
The port number your device is listening to incoming connections.

### Type
- TCP - for devices supporting TCP and/or HTTP protocol
- UDP - for devices supporting UDP protocol

## Adapter configuration :: Device Configuration Example
To make your ioBroker.admin Web-UI accessible via the link-cloud your would configure it under _Adapter configuration :: Devices_ as follows:
- enabled: checked
- name: ioBrokerAdminWebUI (or whatever name you like)
- IP: localhost (or 127.0.0.1)
- Port: 8081 (if you didn't change the ioBroker.admin's default port)
- Type: TCP

To access your router's Web-UI you might have a configuration as follows:
- enabled: checked
- name: Router
- IP: 192.168.0.1 (or whatever your router's local network IP is)
- Port: 80 (if you didn't change the router's Web UI default port)
- Type: TCP

## Changelog
### 0.5.5 (2019-12-02)
* (gh-got) multi-factor connection approval
* (gh-got) Implemented the acknowledgment via telegram

### 0.5.2 (2019-11-26)
* (bluefox) Added user enability

### 0.4.4 (2019-07-16)
* (gh-got) closing tunnels in case server considers an agent as offline
* (gh-got) fixed timeout to query active connection status

### 0.4.2 (2019-03-28)
* (gh-got) agents will report own version by registration

### 0.4.0 (2019-03-10)
* (bluefox) Made this adapter to be compatible with the new server

### 0.3.7 (2018-09-23)
* (bluefox) Do not connect to the cloud if no configuration defined

### 0.3.6 (2018-06-26)
* (bluefox) The download of SSF from github depending on platform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).