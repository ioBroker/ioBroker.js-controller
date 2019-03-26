---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin-2/admin/tab-users.md
title: The tab user
hash: HKsMwIvpGIO+9hqNOzBFUsRM8OOTNgILqQ6z75xDXDY=
---
# The tab User
Here users can be created. Click on the (+) on the bottom left. The administrator is already created by default.

![iobroker_adapter_admin_user_01](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-user_01-1.jpg)

## The page content
On the page, the existing users are displayed in tabular form. The fields in the column headers are used to filter the table according to your own criteria.

The table consists of the following columns:

### **1.) ID**
This is the unique name of each user, according to the structure consisting of sytem.user.user_name.

### **2.) Name**
The name of the user. This name is freely selectable. This name must be unique.

### **3.) Activated**
With this checkbox the availability of a user can be activated or deactivated.

### **4.) Groups**
The groups created in the tab **_ Groups _** are displayed here. Here the users can be assigned to the corresponding groups via a checkbox.

![iobroker_adapter_admin_user_groups](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-user_Groups.jpg)

### **5.) Create new user**
This icon can be used to create a new user who then has to be assigned to an existing group.

### **6.) Edit existing user**
After selecting an existing user in the list, this user's data can be edited with this icon.

### **7.) Delete existing user**
With the trashcan icon an existing user can be deleted, the existing groups are retained.