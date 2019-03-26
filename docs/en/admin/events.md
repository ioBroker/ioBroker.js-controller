---
title: Events
lastChanged: 26.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/events.md
hash: 4kDExpUZKC8PTd5MvmCtNV09qByeQl3bT117RjVwvZg=
---
# The events window
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

# The Events tab
In this tab, the current states of all data points are displayed.
The values can not be changed here.

![The event page](../../de/admin/media/ADMIN_Ereignisse_numbers.png)

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon. Just keep the mouse on the icon for a while.

### The icons in detail:
** 1.) Pause view **

With this button you can stop the current display of the latest events. The button then changes to a yellow background where the number of "missed" events is counted up.

!> Since the events are partially updated in the millisecond range, there may be delays or even the freezing of the display

Clicking the button again restarts the live presentation.

** 2.) Delete ad **

This button clears the screen

## The page content
On the page, the existing events are displayed in tabular form. The most recent event is at the top.

![The event page](../../de/admin/media/ADMIN_Ereignisse_numbers02.png)

By clicking on the column headers you can filter according to certain criteria.

### The table consists of the following columns:
** 1.) Type **

Here either ***stateChange*** is an update of a value, or ***objectChange*** These are also the two filter options.

** 2.) ID **

This is the unique name of the corresponding data point, according to the structure consisting of e.g. Name of the adapter.Number of the instance.User name.Channel name.Data point name.

Here you can filter for complete IDs, but also for parts thereof, e.g. after all TEMPERATURE data points.

** 3.) Value **

This is the current value of the respective data point.

** 4.) Confirmed **

If this value has been changed and adopted by the system, the value is true, otherwise false.

These are also the filter options

** 5.) Source **

Here it is specified, which instance has carried out the last change of the data point.

After these can be filtered in this column.

** 6.) Time **

This is the timestamp to which the data point was last updated.

** 7.) Changed **

This is the timestamp to which the value of the datapoint last changed.