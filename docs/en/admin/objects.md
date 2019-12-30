---
title: objects
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/objects.md
hash: DMi79mNPHtAyFf9auD8/ZdAnTERJDdihivu3xwtzF2Y=
---
# The Objects window
?> ***This is a placeholder*** . <br><br> Help with ioBroker and expand this article. Please note the [ioBroker Style Guide](community/styleguidedoc) so that the changes can be accepted more easily.

# The Objects tab
All managed objects are located under this tab. For each instance, a folder is created here in which the data points you created are in a hierarchical structure. Objects can also be created and deleted here manually. Entire object structures can be uploaded or downloaded. Another button enables the expert view to be displayed.

## The title line
The title bar contains icons for the most important processes. There is context help for each icon.
Simply stay on the icon with the mouse for a while.

![The icons of the Objects tab](../../de/admin/media/ADMIN_Objekte_numbers.png)

### The icons in detail:
** 1.) Refresh view **

If objects that have just been created are not visible, clicking this icon helps to update the state of the page.

** 2.) Change display **

This button changes the display of the objects on this page.

If the button is active, all objects are listed alphabetically by ID. If this button is not activated, the objects are displayed hierarchically alphabetically according to instances as a tree structure.

In both cases, self-created namespaces are shown at the top.

> Caution! The change of views can take a long time

The next two icons are then visible in the tree structure.

** 3.) Collapse all subject areas **

** 4.) Expand all subject areas **

With these two buttons, the entire tree structure can be opened or closed.

** 5.) Status view **

This button displays further information on the respective status of the data points. (Toggle Mode)

![status view](../../de/admin/media/ADMIN_Objekte_status_tree.png)

Here with the menu bar folded

> Attention: Due to the immense flood of data, this view can hang in the list view when using this view.

** 6.) Administrator mode **

When this icon is selected, further objects are displayed (toggle function).

These objects (and their directories) are system objects and should not be used for normal use, since a change / update of the admin can lead to a structural change and thus to data loss of personal data.

** 7.) Sort alphabetically **

Sorts within the folder either by ID or by name.

![sort by](../../de/admin/media/ADMIN_Objekte_Sortieren.gif)

** 8.) Add **

After selecting this icon further objects can be added. If a folder is selected, it is adopted as a parent in the object structure. A configuration window opens:

![New object](../../de/admin/media/ADMIN_Objekte_new_01.png)

Now the name for the new object must be selected, whereby a device, a channel or a data point is available as type according to the hierarchical structure. Logic value, switch, character string, number, list of values, field, object and mixed are available as data point types.

As soon as you confirm the input window with ok, another window opens:

![New object](../../de/admin/media/ADMIN_Objekte_new_02.png)

Some data can still be entered here. So a role and an icon can be added to the object.

There are other properties of the object under the other tabs. There is such information for every object.

There are two things to consider when creating a completely new namespace:

* No object may be selected. This is achieved by reopening the Objects tab.
* The top object must end with a period and a number (e.g. MyNamespace.0).

The next levels can then be created in it.

** 9.) Upload **

With this button, a complete object structure is uploaded to the ioBroker server as a json file

** 10.) Download **

With this button the selected object structure is downloaded as a json file from the ioBroker server and can be saved.

## The page content
![Columns of the table](../../de/admin/media/ADMIN_Objekte_numbers02.png)

The existing objects are shown in tabular form on the page.

The table consists of the following columns (the fields under column headings 1 and 2 and the pulldown menus of the other columns serve as filter criteria). The table in the picture is arranged according to hierarchy and some sub-items (nodes) have been opened:

*** 1.) ID ***

These are the top levels of the object hierarchy. The top level here is e.g. the name of the instance, including the respective structure of the data.

** 2.) Name **

The name of the object is specified in this column. In addition, a preceding icon shows which hierarchy level it is (device, channel or data point)

The values in this column can be edited.

** 3.) Type **

The type at the hierarchy level that was already visible in the Name column by the preceding icon is explicitly mentioned here again. Using the pulldown menu in the column header, you can filter by these types and thus e.g. only display all data points.

** 4.) Role **

The role specifies how user interfaces such as .vis and material should deal with this data point.
In principle, the function of this object is briefly described using a term. Then you can filter again.

![Pulldown menu role](../../de/admin/media/ADMIN_Objekte_role.png)

The values in this column can be edited. Clicking the field brings up a pulldown menu with a large number of entries, but free entries are also possible

** 5.) Room **

If this object has already been assigned to a room, this is shown here. This also serves filtering when searching for objects.

![space assignments](../../de/admin/media/ADMIN_Objekte_rooms.png)

The values in this column can be edited. In this way, the objects can still be assigned to rooms. If you click on the field, a popup opens with the previously created rooms.

** 6.) Function **

This column contains the trade to which the corresponding object is assigned.

![trades](../../de/admin/media/ADMIN_Objekte_functions.png)

The values in this column can be edited. In this way, the objects can still be assigned to trades. If you click on the field, a popup opens with the trades created so far.

** 7.) Value **

If the object is a data point, the current value of this data point is displayed here.

** 8.) Settings **

![settings](../../de/admin/media/ADMIN_Objekte_numbers03.png)

1.) If you click on the pencil icon, a window opens with the properties of this object. It is the same window that appeared above when you created a new object. Properties of the object can be changed here. This function should be used with extreme caution and only if you know exactly what you are doing with it.

2.) Clicking the trash can icon deletes this object and all objects below it in the hierarchy as well. For security reasons, a window appears in which the deletion must be confirmed again.

3.) The wrench icon only appears if at least one history instance is installed (history, InfluxDB or SQL). The data point for logging the historical data can be configured here. Further information can be found in the description of the history adapter.

Using the wrench in the title bar, this action can be carried out simultaneously for all data points that meet the current filter criteria. It is therefore necessary to check carefully whether the filter criteria on this page are selected so that only the desired data points are included.

The pulldown menu for filtering this column relates to data points with logged data.
Here with, without and all as well as the installed history instances are available.