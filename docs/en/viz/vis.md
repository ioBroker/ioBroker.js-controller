---
title: visualization
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/vis.md
hash: 7UR+f+46PDLExWz3xC4KvD2295kwXCfbQOHLN5BFcak=
---
# Visualizations with VIS {docsify-ignore-all}
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

## As a general rule
@@@ VIS is a powerful application that deserves detailed instructions and tutorials. The form and location of this manual is not yet defined.
@@@

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-vis#konfiguration)
## Configuration
A configuration of the adapter is not necessary. There can only be one VIS instance.

* * *

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-vis#bedienung)Operation
The adapter is called via `<IPdesServers>:8082/vis/index.html` and the visualization is displayed.
There are several views in a project.
On each view, several widgets are again freely placeable, which serve for display or operation.
To create and configure a visualization you have to load the **editor** The editor is called via `<IPdesServers>:8082/vis/edit.html` or via the hyperlink in the Instances tab of the admin adapter.
After closing the editor via the Close-Window icon ((x) on the top right), the last edited view is displayed in the function view.
This can be called up at any time with `<IPdesServers>:8082/vis/index.html#ViewName` The editor is divided into different areas.
![](../../de/viz/../media/vis/vis_ioBroker_vis_Editor_002-300x165.jpg)

* * *

## The riders in the head area (1)
### Views
If this tab is selected, you can select the view to be edited from the existing pull-down menu in the pull-down menu below.
![iobroker_vis_Editor_Views_Header](../../de/viz/../media/vis/iobroker_vis_Editor_Views_Header.jpg) The four icons to the right are self-explanatory and refer to the views.
After clicking on the workspace, the view in the Properties sidebar on the right side changes to the Views tab and displays the settings for the view.

### Widgets
If the tab Widgets is activated, the underlying toolbar changes. ![iobroker_vis_Editor_Widgets_Header](../../de/viz/../media/vis/iobroker_vis_Editor_Widgets_Header.jpg) The tools for editing widgets are displayed.

#### Pulldown menu
Here you can select a widget for editing, or the selected widget will be displayed here.

#### Icon bar
The three icons for delete, copy and info become active when a widget is selected.

#### Align widgets
![](../../de/viz/../media/vis/iobroker_vis_Editor_Widgets_Ausrichten_Header.JPG) If one selects several widgets with pressed mouse button (or with Ctrl-click) one can then align with the help of these icons groups (left-justified, right-aligned, flush-topped, bottom flush, centered, center vertically aligned).
In addition, you can position multiple widgets with the same distance (horizontal and vertical), as well as adjust the size of several widgets with the last two icons.
If you select a widget, the view in the Properties sidebar on the right side changes to the Widget tab and displays the settings for this widget.
With the possibility of multiple selection you can change the properties of several widgets on the right sidebar at the same time.

#### All widgets
The two widgets are used for easier editing of views.
The first one ensures that the values of the widgets are not updated, the second prevents moving widgets.

#### Export Widget
If a widget is activated, you can use this button to export the CSS code of the widget.

#### Import Widget
Conversely, one can here for example Import widgets that are not in the scope of vis.
After clicking on a widget, the view in the Properties sidebar on the right side changes to the Widget tab and displays the settings for the selected widget.

### Tools
If the Tools tab is activated, the underlying toolbar changes. ![](../media/vis/iobroker_vis_Editor_Tools_Header.JPG) The tools for facilitating the editing of [Views](http://www.iobroker.net/?page_id=1193&lang=de) are displayed

#### Resolution
Here are many preset screen resolutions displayed by mobile devices, but also a point "user-defined" offers the possibility to make your own settings.
If you select something here, a frame will be drawn on the desktop that corresponds to the selected screen resolution.

#### Default
If _default_ is checked, the active [View](http://www.iobroker.net/?page_id=1193&lang=de) is made a default view and loaded if the VIS view (see [Project](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#Projekt)) is loaded with the resolution set above.
** Example: ** The display _iPad Portrait_ is selected and the _Default_ box is checked in the _Start_ view.
Assuming that the project now loads a view named _Weather_ in landscape format on an iPad.
If the iPad is now rotated to portrait orientation, the _Start_ view previously defined for this resolution (portrait) as default (_default_) will automatically be displayed.
For example, "moving back to the main menu" or _hoch_ showing a different view than _quer_ is possible with correspondingly movable devices.

#### Grid
here are the possibilities _inaktiv_, _Elemente_ and _Raster_. If you select elements, the widgets snap when moving with the mouse to an adjacent element. With Raster you can specify a grid size (in px), in which the widgets then snap into place.

#### Instance ID
Here, a unique ID is displayed, e.g. via VIS [Control Command](https://github.com/iobroker/ioBroker.vis/blob/master/README.md#control-interface) can be addressed with a script.

#### Browser ID
If you click this button, a new ID will be created in the previous field. This makes each browser individually identifiable on each device.

Export ####
Here you can export your view, for example to use in another installation. Clicking the button opens a window in which the view is offered in text form. This data can be put into the clipboard with Ctrl-C and loaded into an editor and then saved

Import ####
After clicking an empty window opens. Here you can copy a text file obtained via the function _export_. Then enter a name for the view in the lower left corner and click on the button _importieren_. From there, the new view is available. This feature is useful for importing examples from the forum.

### Set up
![](../../de/viz/../media/vis/iobroker_vis_Editor_Setup_Header.gif)

#### Theme
Here is a color scheme for the editor to choose from.

#### Language
The operating language for the editor can be specified

#### Projects
Projects are collections of [Views](http://www.iobroker.net/?page_id=1193&lang=de).
By default, the project _main_ is created and is called via `<IPdesServers>:8082/vis/index.html#ViewName`.
The files of the project are in the ioBroker installation in the order `_ioBroker-Ordner_/iobroker-data/files/vis.0/main`.

#### Project export / import
Projects can be exported as a whole (for example, to share with other users): A zip file is created containing the images used, the vis-user.css stylesheet, and the actual vis-views.json definitions.
In addition, there is the option to export the project anonymously. : construction: To import other projects, simply drag the zip file of an export described above onto the window and enter a name for the new project: ![](../../de/viz/../media/vis/iobroker_vis_Editor_Setup_Projekt_ImportHeader.gif)

#### New project...
Here you can create a new project.
A window will open asking you to enter a project name.
After confirming, the editor loads the new project at this address: `<IPdesServers>:8082/vis/_projektname_/index.html#ViewName.` The files of the new project can be found in the ioBroker installation under `_ioBroker-Ordner_/iobroker-data/files/vis.0/projektname`.
** Tip **: You can duplicate a project folder and edit the duplicate in the VIS Editor `<IPdesServers>:8082/vis/_projektname_duplikat_/index.html`.

#### Application
When loading a project, all [Views]: construction: (http://www.iobroker.net/?page_id=1193&lang=en) of this [project]: construction: (http://www.iobroker.net/?page_id = 188 & lang = DE & preview_id = 188 & preview_nonce = d845a20ee2 & preview = true # project).
Sometimes that does not make sense and slows down the system.
Therefore, one can summarize views that belong together in different projects.
It makes sense, for example, a separation of devices with different screen resolutions.
So you can create a project _Smartphone_ and create views optimized for touch operation and vertical alignment.
Due to the deliberate reduction of the widgets the project remains small in the data volume and therefore loads also on the way (for example over VPN and portable radio) fast.
Another project _Wandtablet_, which is only displayed on the tablet on the wall, does not need to load views from the _Smartphone _ project.
The main project _main_ to display all data is usually displayed and edited only from the desktop PC.
Here data volume and computing speed usually do not matter.
If views are to be used in several projects, they can be copied with the command [export](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#exportieren): construction: / [import](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#importieren): construction:.
Linking via navigation widgets from one project to another is not possible.
** Tip **: It may also be useful to create a test project when experimenting with CSS commands.

#### File Manager ... (6)
After selecting this menu item, files can be easily copied or copied to the ioBroker file system without the need for additional programs.
The file manager opens: ![align = "aligncenter" width = "799"](../media/vis/iobroker_vis_Editor_Setup_Dateimanager.JPG) [caption id = "attachment_6007" align = "aligncenter" width = "799"] [![] (Img / ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg)](../../de/viz/img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg) * The images are only the sample images and are copyrighted by respective companies. / caption]

The behavior is similar to any file manager.
Use the blue button "arrow left" to maneuver a hierarchy level higher, by clicking on a folder in it.
With the icon "Folder +" a new folder can be created.
Once you have reached the desired directory, you select a file, you can download it with the blue arrow on the calculator, click on the green arrow, then opens the "Dropbox".
![](../../de/viz/../media/vis/iobroker_vis_Editor_Setup_Dateimanager_Dropbox.JPG) Files can be simply dragged and dropped here and then loaded onto the ioBroker server by clicking on the _ **Upload** _ button.
Alternatively, you can also click somewhere in the area, then a file selection opens.
The file list empties itself and if no further files are to be uploaded, one leaves the Dropbox over the button **_ close _**

#### Settings ... (7)
![](../../de/viz/../media/vis/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

* _ **Reload if no connection is longer than:** _ The active view is reloaded completely,

if the connection between the front end (tablet) to the server was interrupted for longer than the preset time.
To prevent this this time can also be set to _ **never** _.

* _ **reconnect interval:** _ The time to try from the frontend

reach the server.

* _ **Dark Reconnect Screen:** _ Usually the page is white when trying to reload the view.

In order not to disturb this in dark rooms, the screen can be switched to dark with this checkbox.

* _ **Delete from RAM not active views:** _ To save the valuable memory at the frontend,

which is usually just 1GB for low-cost tablets, views that are no longer needed can be removed from the RAM.
When reloading the corresponding view, however, this takes longer.
This option sets the time that unused views should be kept in RAM.

#### Object Browser ... (8)
![](../../de/viz/../media/vis/iobroker-vis_ioBroker_Adapter_Vis_Editor_Setup_objectbrowser.jpg) Here you can search for an object.
This is put into the clipboard after clicking the button _ **Select** _.
For faster retrieval, the filter fields above the column headers can be used.

### Help (5)
Here you will find an overview of the key commands under _Shortcuts_ and a short info under _ about the project_.

### Undo Button (6)
With this button you can undo the last action (s) step by step.

* * *

## The Widget Sidebar (2)
It is used to select widgets.
The widgets are displayed as icons and can be dragged and dropped onto the desktop, or positioned with the button _Insert_ at position 0.0 of the desktop.
![iobroker_vis_Editor_Widgets_sidebar](../../de/viz/../media/vis/vis_iobroker_vis_Editor_Widgets_sidebar.jpg) The field under the button _Insert_ is a filter field.
Here you can enter a term to search the icons afterwards.
All icons that contain this term are displayed.
If you delete the last filter (or the \ *), you get a pulldown list with the possible search terms.
Below is the selection box for the widget sets.
The asterisk (*) stands for all widget sets.
When filtering for terms, all widget sets are automatically searched.
Otherwise, however, the pull-down menu also offers the various widget sets as filters.

* * *

## The work surface (3)
This is where the widgets for the view are positioned. This can be done with the mouse or the arrow keys.
If the tab Widgets is active, some help for alignment is also available.

* * *

## The Settings Sidebar (4)
Here all settings for the views and the widgets are entered via the corresponding tabs.
In addition, the CSS tab offers advanced users the opportunity to integrate their own developments.

* Data point assignment
* Widget size
* Font size and color
*   Background
* Frame, line color, style, thickness
* css parameter

To display data points or perform actions, the data point must be assigned to the widget.
This entry can be found in the _General_ section.