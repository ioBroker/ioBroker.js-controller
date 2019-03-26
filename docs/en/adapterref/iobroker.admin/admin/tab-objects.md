---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/admin/tab-objects.md
title: The tab objects
hash: GIc3qNC2ZnoKb8Y2zbYYsyTbWS+DWObdVmPTllsNDVk=
---
# The tab Objects
Under this tab are all managed objects. For each instance, a folder is created here in which the data points created by it are in a hierarchical structure. Objects can also be created and deleted manually here. Entire object structures can be uploaded or downloaded. Another button allows you to view the expert view.

<span style="line-height: 1.5; text-align: justify;"></span>

![iobroker_admin_objekte_inhalt00](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Inhalt00.jpg)

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon. Just keep the mouse on the icon for a while.

![iobroker_admin_objekte_headline_icons](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Headline_Icons.jpg)

### **The icons in detail:**
### **1.) Update view**
If objects that have just been created are not visible, clicking this icon will help to bring the state of the page up to date.

### **2.) Change sorting**
This button changes the sorting of objects on this page.

If the button is active, all objects are sorted alphabetically. If this button is not active, the objects are sorted hierarchically according to instances.

Then the next two icons are visible.

### **3.) Close all topics**
### **4.) Expand all topics**
### **5.) Administrator mode**
When this icon is selected, further objects are displayed (toggle function). These are the data points of the system.

### **6.) Add**
After selecting this icon further objects can be added.
If a folder is selected, it is taken over as _Parent_ in the object structure.
A configuration window opens:

![iobroker_admin_objekte_addobject](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_AddObject.jpg)

Here, the name for the new object must now be selected, whereby a device, a channel or a data point is available as a type according to the hierarchical structure.
Data point types include logic value, switch, string, number, value list, field, object and mixed.

As soon as you confirm the input window with ok another window opens:

![iobroker_admin_objekte_addobjec02t](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_AddObjec02t.jpg)

Here you can enter some more data. So you can add a role and an icon to the object.

Among the other tabs are other properties of the object.
Such information exists for every object.

### **7.) Upload**
With this button, a complete object structure is uploaded to the ioBroker server as a json file

### **8.) Download**
With this button, the selected object structure is downloaded as a json file from the ioBroker server and can be saved.

## The page content
![iobroker_admin_objekte_headline_columns](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Headline_Columns.jpg)

On the page, the existing objects are tabulated.

The table consists of the following columns (The fields under column headers 1 and 2 and the pulldown menus of the other columns serve as filter criteria).
The table in the picture is ordered by hierarchy and all sub-nodes have been expanded:

### **1.) ID**
These are the top levels of the object hierarchy. Here, as the top level, e.g.
the name of the instance, including the structure of the data created.

### **2.) Name**
This column specifies the name of the object. In addition, a preceding icon shows which hierarchical level it is (device, channel or data point)

The values of this column are editable.

![iobroker_admin_objekte_structure01](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Structure01.jpg)

### **3.) Type**
The type in the hierarchy level, which was already visible in the column _Name_ by the preceding icon, is again explicitly mentioned here. Via the pull-down menu in the column header you can filter according to these types. only show all data points.

### 4.) Role
The role indicates how user interfaces such as .vis and mobile should deal with this data point.
This is in principle the function of this object briefly described by a term.
After that you can filter again. The values of this column are editable.

### **5.) Room**
If this object has already been assigned to a room, this will be displayed here.
This also serves u.a. Filtering when searching for objects.
The values of this column are editable. This way, the objects can still be assigned to rooms later.
If you click on the field, a pop-up opens with the previously created rooms.

![iobroker_admin_objekte_rooms](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Rooms.jpg)

### **6.) Function**
This column contains the trade to which the corresponding object is assigned.

The values of this column are editable. Thus, the objects can be assigned later to trades. If you click on the field, a pop-up opens with the previously created trades.

### **7.) Value**
If the object is a data point, the current value of this data point is displayed here.

### **8.) Other**
Clicking on the pencil icon opens a window with the properties of this object.
It is the same window that appeared above when creating a new object.
Here properties of the object can be changed. This feature should be used with extreme caution and only if you know exactly what you are doing with it.

Clicking on the trashcan icon deletes this object and **all** underlying objects in the hierarchy as well. For safety, a window appears in which the deletion must be confirmed again.

![iobroker_admin_objekte_delete](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_delete.jpg)

The gear icon appears only if at least one history instance is installed (History, InfluxDB or SQL).
Here you can configure the data point for logging the historical data. Further information can be found in the description of [History adapter](http://www.iobroker.net/?page_id=144&lang=de).

Via the sprocket in the title bar, this action can be performed simultaneously for all data points that match the current filter criteria. It is therefore important to check whether the filter criteria of this page are selected so that only the desired data points are included.

The pull-down menu for filtering this column refers to data points with logged data.
_Mit_, _ohne_ and _alle_ and the installed history instances are available here.