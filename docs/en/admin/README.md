---
title: Admin
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/README.md
hash: UHSSTzB4gc5y1Sz7l0gCXlSOUZcW+YagLLDWITPD+Ks=
---
# Introduction
!> **Because of the size of the documentation, this is just an overview, detailed information is stored in the pages that are linked by the headings of the sections to the tabs. Please click on the headings.**

The Adapter Admin is used to operate the entire ioBroker installation. He provides a web interface. This is called under ``<IP-Adresse des Servers>:8081``. This adapter is created directly during the installation of ioBroker.

![The admin in the tile view](../../de/admin/media/ADMIN_Adapter_Kachel.png)

The GUI provided by the adapter may include but is not limited to: following functions are retrieved:

* Installation of additional adapters
* Access to object overview
* Access to the status overview of the objects
* Access to users and groups administration
* Access to the logfile
* Administration of the hosts

## Installation
This adapter is created directly during the installation of ioBroker a manual installation is not necessary

## Configuration (in the Instances tab)
![main settings](../../de/admin/media/Admin_konfig_Haupteinstellungen.png)

### IP
Here the IP address under which the adapter can be reached is entered. Various Ipv4 and Ipv6 options are available. Default is 0.0.0.0. This must not be changed!

### Port
Here, the port under which the administrator can be called is set.
If several web servers are running on the server, this port must be adapted so that there are no problems with duplicate port assignment.

### Encryption
If you want to use the secure protocol https you have to check this box.

### Authentication
If an authentication is to take place here is a hook to put.

## Service
Call the following page via the web browser: ``<IP-Adresse des Servers>:8081``

## Equestrian
The main page of the administrator consists of several tabs. In the basic installation, the tabs are displayed as shown. The triangle icon on the top left (1) can be used to add additional tabs after installing additional adapters.
There also riders can be disabled to get a better overview.

The menu bar with the tabs can be hidden via the **X** (2) to make more space on mobile devices.

![Admin](../../de/admin/media/Adapter_admin_first_view_items.png)

Detailed information is provided in the pages linked by the headings.

### [Overview](overview.md)
All pages with their own web interface and information about the hosts are displayed here.

### [adapter](adapter.md)
Here the available and installed adapters are displayed and managed.

### [instances](instances.md)
Here, the instances already installed via the Adapter tab are listed and can be configured accordingly.

### [objects](objects.md)
The managed objects Structures and data points of the devices that are integrated via adapters. Here objects can be created and deleted. Using the "arrow up" and "arrow down" buttons, entire object structures can be uploaded or downloaded.

If values are displayed in red, they are not yet confirmed by the recipient (ack = false).

### [enumerations](enums.md)
Here the favorites, trades and rooms from the Homematic CCU are listed.

### [log](log.md)
Here the log is displayed

In the Instances tab, the log levels to be logged can be set for the individual instances. In the selection menu, the minimum log level to be displayed is selected. If an error occurs, the label of the tab appears in red.

### [Events](events.md)
A list of status updates.

### [user](users.md)
Here users can be created and added to the existing groups.

### [scripts](scripts.md)
On this page you can create your own scripts with javascript, Blocly or Typescript.

### [hosts](hosts.md)
Information about the computer where ioBroker is installed. If a new version is available, a note appears in this entry in the menu bar.

## [system settings](settings.md) (wrench icon)
In the menu that opens, settings such as language, time and date format and other system-wide settings are made.

The repositories and security settings can also be set here.