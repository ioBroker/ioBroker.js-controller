---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-instances.md
title: The rider instances
hash: wBKP7K139TehQSv9mxy6iGcoIz/dj9X8D7lacF88tpw=
---
# The tab Instances
Here, the instances already installed via the Adapter tab are listed and can be configured accordingly.

<span style="line-height: 1.5;"></span>

![iobroker_admin_instanzen_inhalt00](../../../de/adapterref/iobroker.admin/img/tab-instances_Inhalt00.jpg)

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon.
Just keep the mouse on the icon for a while. There is also information about the load of the server

![iobroker_admin_instanzen_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-instances_Icons-e1476803621402.jpg)

### **The icons in detail:**
### **1.) Turn on administrator mode**
When this icon is selected, additional columns for configuring the instances are displayed (toggle function).
See page content for more information.

### **2.) Update view**
If just created instances are not visible, clicking this icon will help to bring the state of the page up to date.

### **3.) Server status information**
The right part of the title bar contains information about the activities of the instances as well as the utilization of the ioBroker server.

The first numbers indicate the memory used by the instances so far and the remaining free memory in MB. Behind it the free memory in%. The square brackets contain the name of the ioBroker server and the number of running processes.

## The page content
![iobroker_admin_instanzen_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-instances_Headline_Columns.jpg)

On the page, the installed instances of the adapters are tabulated.

The table consists of the following columns:

### **1.) Condition**
Here, the status of the instance is displayed by a traffic light. Further information is obtained by standing with the mouse on the signal.

![iobroker_admin_instanzen_status](../../../de/adapterref/iobroker.admin/img/tab-instances_Instanzen_Status.jpg)

Not all instances have this traffic light. This is no reason to panic. These are either timed instances that only connect to the controller for a short time and then shut off immediately or shut down, for example. continue running in the background.

### **2.) Icon**
This will show the icon used ioBroker-wide for this adapter

### **3.) Instance**
This column contains the name of the instance. it consists of the name of the adapter as well as a number, which is consecutively numbered in the order of installation of the instances. The first instance receives the 0.
This name is the basis for naming the data points in ioBroker.

### 4.) activated
Here the instance is started or stopped. The green pause sign indicates that the adapter is running and can be paused by clicking on it, the red play sign shows a stopped instance that can be started with a click.

### **5.) Configuration**
Clicking on this icon opens an adapter-specific configuration menu. The corresponding menus are described in the associated [adapters](http://www.iobroker.net/?page_id=2236&lang=de).

### **6.) Restart**
Click on this icon to restart the corresponding instance

### **7.) Trash can**
This icon deletes the corresponding instance. Other instances of the same adapter are retained.
Even the adapter itself remains.

### **8.) Weblink**
Behind this icon hides a link to the website of this instance. Either because this adapter has its own web interface (with a different port), or just another path. Partly this link also leads to help pages.

### **9.) Title**
Here the name of the instance is given. This name can be changed according to your own wishes or needs. This is particularly useful if there are several instances of an adapter (with otherwise the same Bezeischnung). This would be e.g. for hm-rpc, if there is one instance for RF, Wired, and CuxD.

### **10.) Scheduling**
For adapters, which are started on a scheduled basis, you will be entered here when this adapter should start.
This time schedule is in the format of [cronjobs](https://de.wikipedia.org/wiki/Cron#Beispiele).
To change click on the button with the three dots. It opens an input window with a lot of additional information and help.

![iobroker_admin_instanzen_cronjob](../../../de/adapterref/iobroker.admin/img/tab-instances_Cronjob.jpg)

### **11.) Restart**
If this checkbox is ticked, a schedule can also be created here when this instance should be restarted.

### **12.) Log Level**
In this column the respective loglevel for the instance can be adjusted. Available are debug, info, warn and error. By default, this value is set to info. If you have the impression that something is not going well you can put it on debug. then in the tab log to this instance also debug information is output, which can help to find an error. Conversely, you can set this value higher, so that the log is not so extensive.

### **13.) RAM Limit**
Here you can specify how much memory of the instance should be provided as a precautionary measure.
This amount of memory is then no longer available for other tasks and should not be too high especially for systems with low memory. If the instance temporarily requires more memory, it will of course be allocated by the system but will be immediately released back to the system. In the time in which an instance requires more memory than was reserved, the required memory is displayed in red.

### 14.) RAM usage
This shows the actual memory used by the instance. These values are updated regularly. After updating, these values appear briefly in green.