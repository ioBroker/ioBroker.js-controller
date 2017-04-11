
## Desctiption

[Flot](http://www.flotcharts.org/) is JavaScript JQuery library for plotting, with a focus on the simple use, attractive appearance and interactive opportunities. ioBroker driver with the same name allows you to plot archived data (for access to historical data in the system should be installed driver History, SQL History or History with InfluxDB). It can be used as a standalone application for simultaneous display of several charts to analyze the different states of the system in time.

## Information


## Installation

Installation is on the **Driver** tab page of the [administration](http://www.iobroker.net/?page_id=4179&lang=en) system. In the driver group Visualization find a line called **Flot Charts**, and press the button with the plus icon in the right side of the line. You will see a pop-up window driver installation, after installation, it will automatically close. If all goes well, on the Setup driver tab appears **flot.0** installed instance of the driver. Please note that **Flot** driver must have access to historical data (DB), so the system must be installed and configured at least one driver from the **Storage** groups (History, SQL History or History with InfluxDB). For Flot also required driver Web, but it is usually installed automatically. [![](http://www.iobroker.net/wp-content/uploads//Adapter-Flot-EN-Pic1-1-1024x696.png)](http://www.iobroker.net/wp-content/uploads//Adapter-Flot-EN-Pic1-1.png)

## Setting

The driver does not require special settings. It runs as a separate WEB-service on the web ioBroker system driver port (usually 8082). To get started with the driver, you must click on the button **Open the application** on the **Settings driver** tab in the line of the selected instance.

## Using

Flot charts window you can open the **Open app** button or type the link into your browser: `http://IP-адрес:8082/flot/edit.html` The window can be divided into three zones (top to bottom): Settings, URL page to display graphics and preview charts. [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic2-1024x408.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic2.png) In order to display the graph in another application, or simply call again in a browser, you need to copy the generated URL, and it will again plot a graph with the specified parameters. If you want to change the graphics settings, insert the resulting URL in the browser string path, replacing `index.html` on `edit.html`: http://IP:8082/flot/**index**.html?params.... => http://IP:8082/flot/**edit**.html?params.... **Input data.** Setting the source data to draw a graph/graphs. [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic3-1024x124.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic3.png)

*   You can add / delete the data series,
*   The checkmark **Update once** allows you to apply the setting changes immediately after it (if not set, lower the Refresh button **updates** the preview charts in accordance with the settings),
*   **ID** - you must use the buttons to select the variable to construct a time series (graphics) in the window only those variables that are configured to keep a history,
*   **Driver** - You can choose from the list of driver instances, which is tied to a particular database, consequently data for construction will be requested from that database,
*   **The shift in the X-axis** (shift on the Y axis) - You can specify a time period for which you need to move the chart to the right (deeper in the archive) or the absolute value of the shift on the Y axis,
*   **Type** - points output mode on the chart (in the time group has a **Data Merge** (by time or number)setting - is taken a segment of the data and only rendered maximum, minimum, average, all values or special algorithms MinMax),
*   **The type of graph** – drawing mode (Line, Area, Line with points,etc.),
*   **Min**, **Max**, **Unit** - the interval on the Y axis (values) and units of measurements if not specified, the interval is automatically selected, units are taken from the ioBroker system,
*   **Y Axis, X Axis** - position of the axes X and Y,
*   **ØL**, **ØS** - the thickness of lines and size of the shadow graph,
*   **Name** – value to show the name of the time series in the legend (if enabled), if not specified, take the value from the ioBroker (object name),
*   **Coaxis Y** – the union of the Y-axis (values) for two or more time series,
*   **NULL** as – interpretation of empty records the values of a variable (do not use, use a value of 0 or to take the previous),
*   Settings **Smoothing and after the decimal point** – smoothing peaks graph and rounding values of the time series.

**Time.** Setting time interval graph display data. [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic4.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic4.png)

*   Time interval **type** - relative (starting point is tied to the current time slot, and the ability to update automatically) and permanent (precise indication of the time frame),
*   **Data Merge** - combine the values of time (in seconds), or a certain amount.

**Options.** Here you can customize the appearance of the graphs, grids, axes and legends and captions. All settings are intuitive. [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic5-1024x203.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic5.png)   For example, you can add a few variables to records in the database (host variables work ioBroker - CPU load, memory and so on.). To do this, **objects** in the upper left corner of the tab, click the **Show system objects**, the table looking for a group **system.host.host’s_name,** drop-down list and insist to keep a history of selected variables (extreme right button at the prompt):

*   put a check **active** in the group **sql.o** (pre-configure an instance of the driver to work with the database),
*   <span lang="EN" style="margin: 0px; line-height: 115%; font-family: 'Arial',sans-serif; font-size: 12pt;"><span style="color: #000000;">other settings can be left default</span></span>,
*   click the **Save** button.

[![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic6-1024x390.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic6.png)     [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic7.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic7.png) After a while, when the database will accumulate records to display on the chart, you can try to build a time series: [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic8-1024x474.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic8.png)  

## **System integration**

For example, consider the integration of graphics in the driver VIS visualization system ioBroker. There are several options you can place on the desktop object static-iFrame iframe group. In the settings you can specify the update interval (in ms), and then the graph will update and display the current data (if the timeline is set to the current time). [![](http://www.iobroker.net/wp-content/uploads//Flot_en_pic9.png)](http://www.iobroker.net/wp-content/uploads//Flot_en_pic9.png)