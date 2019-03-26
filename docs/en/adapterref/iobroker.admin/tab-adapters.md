---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-adapters.md
title: The tab adapter
hash: QL+KH1rDLyLUu//lZEw1peBxkvCTrTkqq2Z4ohf+BKg=
---
# The tab adapter
Here the available and installed adapters are displayed and managed.

![iobroker_image_bpi_20160910](../../../de/adapterref/iobroker.admin/img/ioBroker_Image_BPi_20160910.jpg)

## The title bar
The title bar contains icons for the most important processes.
There is a context help for each icon. Just keep the mouse on the icon for a while.

![iobroker_adapter_admin_002aa](../../../de/adapterref/iobroker.admin/img/tab-adapters_002aa.jpg)

### **The icons in detail:**
![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons01_20170108-e1483882554815.jpg)

### **1.) Show only installed adapters**
When selecting this icon, only the already installed adapters will be displayed (toggle function)

### **2.) Show adapters with updates**
When selecting this icon, only adapters will be displayed for which there is an update (toggle function)

Behind the updatable adapters, there is an update icon in the column **_ installed _** Clicking on this button will bring the corresponding adapter to the latest version.

In addition, another icon appears in the title bar:

![iobroker_adapter_admin_002b](../../../de/adapterref/iobroker.admin/img/tab-adapters_002b.jpg)

Click this icon to update all available adapters.

### **3.) Install adapter from own URL**
Using the Octocat icon, adapters can be installed from their own paths (URL or file paths) or pre-release versions of GitHub.

After clicking this icon, a corresponding selection window opens:

![iobroker_adapter_admin_002c_github](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_GitHub.jpg)

Under the tab **_ From github _** the desired adapter is simply selected in the pull-down menu and the latest pre-release version is installed.

If the Anywhere tab is selected, a remaining file path or any URL (e.g., a URL to an external adapter developer) can be entered in the field and the appropriate adapter installed.

![iobroker_adapter_admin_002c_ownfile](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_ownFile.jpg)

### **4.) Turn on expert mode**
The expert mode also allows you to install older versions of an adapter.
If this button is selected, a pulldown menu (4) will appear on the far right side of each adapter to install earlier versions.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

### **5.) Check for updates**
Each time you restart, it automatically checks for updates. But you can start the search manually with this button.

If updates are available in the repository set under [system settings](#Systemeinstellungen), the font of the tab **_ Adapter _** is displayed in green.

### **5.) Change sort order**
This button changes the sorting of the adapters on this page.

If the button is active, all adapters are sorted alphabetically, with one block showing the adapters installed, then one with adapters that have not yet been installed. Each of these two blocks is sorted alphabetically.

If this button is not active, the adapters are sorted by topic.

Then the next two icons are visible.

### **6.) Collapse all topics**
### **7.) Expand all topics**
On the right side there are also two buttons

![iobroker_adapter_admin_003a](../../../de/adapterref/iobroker.admin/img/tab-adapters_003a.jpg)

### **8.) Edit tab**
With this button you can hide unused tabs and hide invisible ones.

### **<a id="Systemeinstellungen"></a> 9.) System Settings**
This sets basic parameters for ioBroker.

## The page content
![iobroker_admin_adapter_inhalt01](../../../de/adapterref/iobroker.admin/img/tab-adapters_Inhalt01.jpg) The adapters are tabulated on the page. The table consists of the following columns:

### **1.) Name**
This column lists the names of the adapters and associated icons.
If the grouping of adapters is selected via the icon (5) in the title bar, the group names also appear here.

### **2.) Description**
Here is a brief description of the function of the adapter

### **3.) Keywords**
Here are some search terms associated with the adapter.

### **4.) Version**
The available version is displayed here. For overview, the development status of an adapter is highlighted. (red = in planning, yellow = beta, orange = alpha, green = final).

### **5.) Installed**
This column gives various information about the installation status of this adapter.
First, there is the version number of the installed adapter. If this is in bold there is an update. Behind it is the number of instances installed by this adapter in square brackets, how many of them are activated and what their status is. Thus, [2/1] means that there are two instances of this adapter, one of which is activated and runs without problems (the latter can be recognized by the green color of the second number). Further to the right there is an update icon if there is an update adapter for this adapter. Clicking on this icon starts the update process.

### **6.) Platform**
Here is indicated on which software platform this adapter is based. Usually this is javascript under nodejs.

### **7.) License**
This is the license under which the adapter is provided. The license conditions are usually found in the readme. If the license requires that it must be accepted by the end user, a corresponding window will be displayed with the license conditions when creating an instance.

### **8.) Install**
In this column are several buttons for the installation and for help.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

1. (+) Add an instance of the adapter. This must still be configured and activated in the Instances tab. For most adapters, any number of instances can be installed, e.g. to address different hardware. If this is not possible, a window opens with a corresponding error message.
2. (?) If this button is active, it links to the help page for the adapter. This is usually located on GitHub, where the adapter is also maintained.
3. (Trashcan) This button deletes the adapter and all already installed instances
4. (pull-down menu) This menu can be used to install earlier versions of the respective adapter. This pulldown menu is only visible in expert mode.