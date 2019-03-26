---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/admin/tab-hosts.md
title: The tab Hosts
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
---
# The tab Hosts
The available hosts are displayed here.

In a standard system, there is only one host. For a [Multi-host system](http://www.iobroker.net/?page_id=3068&lang=de) several.

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon. Just keep the mouse on the icon for a while.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-hosts_Hosts_icons.jpg)

### **The icons in detail:**
### **1.) Get updates**
To check if there is an update for the js-controller you can click on this button. If there is an update, the label of the tab appears in green text and in the column _ **available** _ the new version is displayed.

### **2.) Filter**
With this fled you can filter the list of hosts according to your own wishes

## The page content
On the page, the existing hosts are tabulated.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-hosts_Hosts_01.jpg)

The table consists of the following columns:

### **3.) Name**
This is the unique name of the host specified in the operating system of the host. This name must be unique.

### **4.) Restart Host**
With this button, the corresponding host can be restarted. The click on it corresponds to the command **_ reboot _**

### **5.) Type**
Specifying on which engine the host is running.

### **6.) Title**
full name of the engine, usually ioBroker.js controller

### **7.) Platform**
Specification of the software base on which the engine is based.

### **8.) Operating System**
Specification of the operating system running on the host.

### **9 available**
Specify the latest available version of the engine

If a newer version of the engine is available, it can be updated via the console.
This should always be done first, if available, before starting the update of the adapters.

### **9.) Installed**
Specification of the installed version of the engine