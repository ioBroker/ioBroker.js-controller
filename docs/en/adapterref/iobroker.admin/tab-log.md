---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-log.md
title: The tab Log
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
# The tab Log
Here the messages of the system are continuously output.
The latest message is at the top.

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

## The title bar
The title bar contains icons for the most important processes.
There is a context help for each icon. Just keep the mouse on the icon for a while.

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **The icons in detail:**
### **1.) Stop update**
By clicking on this button, the constant updating of the list is stopped.
Instead of the pause icon, the number of new messages that are not displayed now appears.

### **2.) Update log**
This button updates the list.

### **3.) Copy log**
After clicking this icon, the list will appear as text. With CTRL-A, the entire text is selected and inserted with CTRL-C into the clipboard for further processing.

### **4.) Clear list**
By clicking on this icon, only the list on the screen will be deleted

### **5.) Clear log**
Clicking on this icon permanently deletes the entire log on the host.

### The pull-down menus
### **instances filter**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

With this pull-down menu the messages can be filtered according to the logging instance.
In the menu, only the instances are displayed, to which there are also entries on the page.

### **displayed log level**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

This menu is used to set the severity of the message.
However, this is just a filter of the existing list. In order to set the logging in a certain level for an instance, this must be set in the _ **Instances** _ tab.