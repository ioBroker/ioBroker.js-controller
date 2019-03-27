---
title: hosts
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/hosts.md
hash: d3PABjsuRtz+kpLVyvABYXMrXPSerSkOVGM0IStX7no=
---
# The page hosts
The available hosts are displayed here.

![The page hosts](../../de/admin/media/ADMIN_Hosts_numbers.png)

In a standard system, there is only one host. In a multi-host system according to several.

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon. Just keep the mouse on the icon for a while.

### The icons in detail:
** 1.) Switch view **

With this button you can toggle between the tile view and the list view (toggle function)

** 2.) Get updates **

To check if there is an update for the js-controller you can click on this button. If there is an update, in the item ***Hosts*** of the menu bar, a number corresponding to the hosts to be updated appears and in the tile under available the new version is displayed.

** 3.) Filter **

In this field you can filter the list of hosts according to your own wishes

## The page content
On the page the existing hosts are enumerated.

For each host there is a tile (a row in the list view) in which the data of the respective host are displayed.

The following icons are for managing the hosts:

** 4.) Edit **

Here the name of the host can be changed. This name must be unique.

** 5.) Restart Host *

With this button, the corresponding host can be restarted. The click on it corresponds to the reboot command.

** 6.) Remove host **

This button is only available for slaves. If a slave has been removed from the multi-host environment, all objects belonging to this host can be removed as well.

** 7.) Controller update **

If there is an update of the js-controller for the set repository, another icon appears:

![Controller Update](../../de/admin/media/ADMIN_Hosts_update.png)

If you click on this icon, however, unlike this icon for the adapters, the update will not start because ioBroker has to quit. Instead, an attachment to the further procedure appears .:

![Instructions for the controller update](../../de/admin/media/ADMIN_Hosts_update02.png)