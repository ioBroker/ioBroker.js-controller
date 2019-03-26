---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-enums.md
title: The tab Enumerations
hash: rqPVvVeC50Hm4dxcQ7zBoNm0VTUa7zS5Txki6arYBmc=
---
# The tab Enumerations
Here the favorites, trades and rooms from the Homematic CCU are listed.
You can also create your own lists, which then can be used in scripts.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## The title bar
The title bar contains icons for the most important processes.
There is a context help for each icon. Just keep the mouse on the icon for a while.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **The icons in detail:**
### **1.) Update view**
If newly created lists are not visible, clicking this icon will help to update the state of the page.

### **2.) Change sorting**
This button changes the sorting of objects on this page.

If the button is active, all objects are sorted alphabetically.
If this button is not active, the objects are displayed hierarchically according to enumerations in tree structure.

Then the next two icons are visible.

### **3.) Close all subfolders**
### **4.) Expand all subfolders**
### **5.) Add**
After selecting this icon further enumerations in the basic structure can be added.
Elements within the folder structure are created via the (+) icon on the right (# 10).
A configuration window opens:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

Now you have to select the name for the new enumeration, the generated id will be adjusted automatically.

### The page content
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

On the page, the existing lists and their members are tabulated.

The table consists of the following columns (The fields under column headers 6, 7 and 8 serve as filter criteria). The table in the picture is ordered by hierarchy and all sub-nodes have been expanded:

### **6.) ID**
Here all members of the enumerations are listed with their IDs. This designation can be changed by double-clicking or clicking on the associated pencil icon (# 9).
The full ID of Subordinate Structures also includes the parent levels in each case.

### **7.) Name**
This column displays the name of the member. This name can be changed by double-clicking or clicking on the associated pencil icon (# 9).

### **8.) Members**
In this column, the members of a list, in too many only the number is displayed.
If you move the mouse over the field, all members will be displayed in a bubble info.
For more information, see the info icon on the far right (# 12)

### **9.) Edit names**
After clicking on this icon you can edit the names in the column ID and name.
An ok button in the form of a check mark and a cancel icon in the form of a (x) appear at this point.

### **10.) Add structure element**
After clicking on this icon, a dialog box opens in which a new member can be created within the respective structure.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Again, the name can be chosen individually. The associated ID is generated automatically according to the structure and the selected name.

### **11.) Delete item**
The trashcan icon deletes the element in this line

### **12.) Information**
After clicking this icon, another window with extended information about the selected element is displayed.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)