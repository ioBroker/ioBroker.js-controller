---
title: Admin
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/README.md
hash: 9kaGmV0wXLOfnt01imNBd0v8p3T4QA2mVvYX/dtIzJY=
---
# The admin interface
!> **Because of the size of the documentation, this is just an overview, detailed information is stored in the pages that are linked by the headings of the sections to the tabs. Please click on the headings.**

The Adapter Admin is used to operate the entire ioBroker installation.
He provides a web interface. This is called under ``<IP-Adresse des Servers>:8081``.

This adapter is created directly during the installation of ioBroker a manual installation is not necessary

![The admin in the tile view](../../de/admin/media/ADMIN_Adapter_Kachel.png)

The GUI provided by the adapter may include but is not limited to: the following functions are retrieved:

* Enter system-wide settings
* Installation of further adapters and instances
* Access to the configuration of the instances
* Access to object overview
* Access to the status overview of the objects
* Access to the administration of users and groups
* Access to the logfile
* Administration of the hosts

The adapter view is divided into three sections:

![The structure of the admin](../../de/admin/media/ADMIN_Screen_numbers.png)

1. [Menu Sidebar] (# menu items)
2. [main window] (# the main window)
3. [System Settings] (# System Settings)

## Menu items
The menu bar contains several menu items. In the basic installation, these points are displayed as shown in the figure. Via the triangle icon in the top left corner (1), additional points can be added or deactivated after installing additional adapters for a better overview.

![menu items](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

The menu bar with the tabs can be hidden via the **X** (2) to make more space on mobile devices.

![Menu collapsed](../../de/admin/media/ADMIN_Screen01_menucollapsed.png)

The menu bar can be displayed again via the "Burger icon"

## The main window
The main window displays the contents of the selected menu item.

Detailed information on this content is available in the pages linked by the headings.

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

## [system settings](settings.md)
In the menu that opens, settings such as language, time and date format and other system-wide settings are made.

The repositories and security settings can also be set here.