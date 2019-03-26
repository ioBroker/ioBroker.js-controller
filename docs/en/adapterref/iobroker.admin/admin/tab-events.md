---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/admin/tab-events.md
title: The events tab
hash: Yi2E6W9RHhmNwuCEDkiJSk2tvvns8JKWVvLyrnyoMmo=
---
# The Events tab
In this tab, the current states of all data points are displayed. The values can also be changed.

![iobroker_admin_states_columns](../../../../de/adapterref/iobroker.admin/admin/img/tab-events_States_columns.jpg)

## The page content
On the page, the existing objects are tabulated. The columns can be sorted alphabetically in ascending or descending order by clicking on the column headers according to the contents of the corresponding columns (toggle function). The fields underneath are used to filter the data points according to their own criteria.

The table consists of the following columns:

### **1.) ID**
This is the unique name of the corresponding data point, according to the structure consisting of e.g. Name of the adapter.Number of the instance.User name.Channel name.Data point name.

### **2.) Parents name**
The same content as in column 3 name.

### **3.) Name**
The name of the data point. This can be an automatically generated or manually assigned name that is more understandable. This name does not have to be unique.

### **4.) Value**
Here, the current value of the data point is specified.

This value is editable

### **5.) Confirmed**
If this value has been changed and this is taken from the system, the value _true_, otherwise _false._

### **6.) Source**
Here it is specified, which instance has carried out the last change of the data point.

### **7.) Time**
This is the timestamp to which the data point was last updated.

### **8.) Changed**
This is the timestamp to which the value of the datapoint last changed.

## The page footer
In the page footer, there is still a little information

![iobroker_admin_states_footer](../../../../de/adapterref/iobroker.admin/admin/img/tab-events_States_footer.jpg)

### **1.) Reload**
This icon can be clicked to bring the table up to date.

### **2.) Page information**
The info block in the middle of the page foot gives the possibility to adjust the lines per page with the pulldown menu. Available are 20, 100, 200, 500 and 1000 lines per page. Furthermore, there is the information how many pages there are in total, as well as the possibility with the arrow icons the pages forward or back to scroll.

### **3.) Data Point Information**
This information indicates the total number of existing data points and the range displayed on the current page.