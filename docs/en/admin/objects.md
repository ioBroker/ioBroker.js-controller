---
title: objects
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/objects.md
hash: crQz2C0an5+VnwYmHQrJWtMqbf1zQHZMjswwVgfHbZE=
---
# The Objects window
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

# The tab Objects
Under this tab are all managed objects. For each instance, a folder is created here in which the data points created by it are in a hierarchical structure. Objects can also be created and deleted manually here. Entire object structures can be uploaded or downloaded. Another button allows you to view the expert view.

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon.
Just keep the mouse on the icon for a while.

![The icons of the objects tab](../../de/admin/media/ADMIN_Objekte_numbers.png)

### The icons in detail:
** 1.) Update view **

If objects that have just been created are not visible, clicking this icon will help to bring the state of the page up to date.

** 2.) Change presentation **

This button changes the display of the objects on this page.

If the button is active, all objects are sorted alphabetically by ID. If this button is not active, the objects are displayed hierarchically alphabetically by instances as a tree structure.

In both cases, self-created namespaces are shown at the top.

> Caution! The change of views can take a long time

The next two icons are then visible in the tree structure.

** 3.) Close all topics **

** 4.) Expand all topics **

With these two buttons, the entire tree structure can be opened or closed.

** 5.) Status view **

This button displays further information about the respective states of the data points. (Toggle Mode)

![status view](../../de/admin/media/ADMIN_Objekte_status_tree.png)

Here with folded menu bar

> Attention: Due to the immense flood of data, the use of this view in the list view may cause the display to hang.

** 6.) Administrator mode **

When this icon is selected, further objects are displayed (toggle function).

These objects (and their directories) are system objects and should not be used for normal usage, since a change / update of the admin can lead to a structural change and thus to a loss of personal data.

** 7.) Sort alphabetically **

This button is without function here

** 8.) Add **

After selecting this icon further objects can be added. If a folder is selected, it is adopted as parent in the object structure. A configuration window opens:

![New object](../../de/admin/media/ADMIN_Objekte_new_01.png)

Here, the name for the new object must now be selected, whereby a device, a channel or a data point is available as a type according to the hierarchical structure. Data point types include logic value, switch, string, number, value list, field, object and mixed.

As soon as you confirm the input window with ok another window opens:

![New object](../../de/admin/media/ADMIN_Objekte_new_02.png)

Here you can enter some more data. So you can add a role and an icon to the object.

Among the other tabs are other properties of the object. Such information exists for every object.

To create a complete new namespace, there are two things to keep in mind:

* No object may be selected. This is achieved by reopening the tab Objects.
* The topmost object must end with a period and a digit (for example, MyNamespace.0).

The next levels can then be created in it.

** 9.) Upload **

With this button, a complete object structure is uploaded to the ioBroker server as a json file

** 10.) Download **

With this button, the selected object structure is downloaded as a json file from the ioBroker server and can be saved.

## The page content
![Columns of the table](../../de/admin/media/ADMIN_Objekte_numbers02.png)

On the page, the existing objects are tabulated.

The table consists of the following columns (The fields under column headers 1 and 2 and the pulldown menus of the other columns serve as filter criteria). The table in the picture is sorted by hierarchy and some sub-nodes have been opened:

*** 1.) ID ***

These are the top levels of the object hierarchy. Here, as the top level, e.g. the name of the instance, including the structure of the data created.

** 2.) Name **

This column specifies the name of the object. In addition, a preceding icon shows which hierarchical level it is (device, channel or data point)

The values of this column are editable.

** 3.) Type **

The type in the hierarchy level, which was already visible in the name column by the preceding icon, is again explicitly mentioned here. Via the pull-down menu in the column header you can filter according to these types. only show all data points.

** 4.) Roll **

The role indicates how user interfaces such as .vis and material should deal with this data point.
This is in principle the function of this object briefly described by a term. After that you can filter again.

![Pulldown menu role](../../de/admin/media/ADMIN_Objekte_role.png)

The values of this column are editable. Clicking on the field brings down a pull-down menu with many entries, but free entries are also possible

** 5.) Room **

If this object has already been assigned to a room, this will be displayed here. This also serves u.a. Filtering when searching for objects.

![space assignments](../../de/admin/media/ADMIN_Objekte_rooms.png)

The values of this column are editable. This way, the objects can still be assigned to rooms later. If you click on the field, a pop-up opens with the previously created rooms.

** 6.) Function **

This column contains the trade to which the corresponding object is assigned.

![trades](../../de/admin/media/ADMIN_Objekte_functions.png)

The values of this column are editable. Thus, the objects can be assigned later to trades. If you click on the field, a pop-up opens with the previously created trades.

** 7.) Value **

If the object is a data point, the current value of this data point is displayed here.

** 8.) Settings **

![settings](../../de/admin/media/ADMIN_Objekte_numbers03.png)

1.) Clicking on the pencil icon opens a window with the properties of this object. It is the same window that appeared above when creating a new object. Here properties of the object can be changed. This feature should be used with extreme caution and only if you know exactly what you are doing with it.

2.) Clicking on the trashcan icon also deletes this object and all objects below it in the hierarchy. For safety, a window appears in which the deletion must be confirmed again.

3.) The wrench icon only appears if at least one history instance is installed (History, InfluxDB or SQL). Here you can configure the data point for logging the historical data. Further information can be found in the description of the history adapter.

Using the wrench in the title bar, this action can be performed simultaneously for all data points that match the current filter criteria. It is therefore important to check whether the filter criteria of this page are selected so that only the desired data points are included.

The pull-down menu for filtering this column refers to data points with logged data.
Here are available with, without and all and the installed history instances.