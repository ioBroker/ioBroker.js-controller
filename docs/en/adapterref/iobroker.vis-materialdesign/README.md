![Logo](admin/vis-materialdesign.png)
<!-- omit in toc -->
## ioBroker.vis-materialdesign

![stable version](http://iobroker.live/badges/vis-materialdesign.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)](https://www.npmjs.com/package/iobroker.vis-materialdesign)
[![Number of Installations](http://iobroker.live/badges/vis-materialdesign-installed.svg)](https://www.npmjs.com/package/ioBroker.vis-materialdesign)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)](https://www.npmjs.com/package/ioBroker.vis-materialdesign)

[![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)](https://nodei.co/npm/iobroker.vis-materialdesign/)

<!-- omit in toc -->
# Material Design Widgets for IoBroker VIS
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)


ioBroker Material Design Widgets are based on [Google's material design guidelines](https://material.io/design/)

<br>

<!-- omit in toc -->
## Table of Content
- [General](#general)
	- [Online Example Project](#online-example-project)
	- [Practical examples](#practical-examples)
	- [Questions and answers about the widgets](#questions-and-answers-about-the-widgets)
	- [Supported Browser](#supported-browser)
	- [Supported Browser for vibrate on mobil devices function](#supported-browser-for-vibrate-on-mobil-devices-function)
	- [ioBroker VIS App](#iobroker-vis-app)
- [Adapter settings](#adapter-settings)
	- [General](#general-1)
	- [Theme Editor](#theme-editor)
		- [Colors Theme](#colors-theme)
		- [Fonts Theme](#fonts-theme)
		- [Font Sizes Theme](#font-sizes-theme)
- [Widgets](#widgets)
	- [Material Design Icons and Images](#material-design-icons-and-images)
	- [Buttons](#buttons)
	- [Buttons Vertical](#buttons-vertical)
	- [Buttons Icon](#buttons-icon)
	- [Card](#card)
	- [List](#list)
	- [IconList](#iconlist)
	- [Progress](#progress)
	- [Progress Circular](#progress-circular)
	- [Slider](#slider)
	- [Slider Round](#slider-round)
	- [Checkbox](#checkbox)
	- [Switch](#switch)
	- [Input](#input)
		- [Text input](#text-input)
		- [Select](#select)
		- [Autocomplete](#autocomplete)
	- [Top App Bar with Navigation Drawer](#top-app-bar-with-navigation-drawer)
		- [Submenu](#submenu)
	- [Charts](#charts)
		- [Bar Chart](#bar-chart)
		- [Pie Chart](#pie-chart)
		- [Line History Chart:](#line-history-chart)
		- [JSON Chart](#json-chart)
			- [General](#general-2)
			- [graph](#graph)
			- [graph line chart spfeicifc](#graph-line-chart-spfeicifc)
			- [graph bar chart spfeicifc](#graph-bar-chart-spfeicifc)
			- [graph y-Axis](#graph-y-axis)
			- [gradientColor](#gradientcolor)
		- [Chart with time axis](#chart-with-time-axis)
			- [values with timestamp](#values-with-timestamp)
			- [x-axis settings for data with timestamp](#x-axis-settings-for-data-with-timestamp)
	- [Table](#table)
		- [Input Data](#input-data)
			- [Control Elements](#control-elements)
		- [Editor Settings](#editor-settings)
	- [Responsive Layout](#responsive-layout)
		- [Masonry Views](#masonry-views)
		- [Grid Views](#grid-views)
	- [Alerts](#alerts)
	- [Calendar](#calendar)
	- [HTML Elements](#html-elements)
- [used libraries](#used-libraries)
- [Changelog](#changelog)
- [License](#license)

# General

## Online Example Project
provided by [iobroker.click](https://iobroker.click/index.html), thanks to bluefox and iobroker.

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS Runtime</a> (<a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">alternativ</a>)
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">VIS Editor</a> (<a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">alternativ</a>)

## Practical examples
* [Weather View](https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view)
* [Skript Status](https://forum.iobroker.net/topic/30662/material-design-widgets-skript-status)
* [Adapter Status](https://forum.iobroker.net/topic/30661/material-design-widgets-adapter-status)
* [UniFi Netzwerk Status](https://github.com/Scrounger/ioBroker.vis-materialdesign/tree/master/examples/UnifiNetworkState)

## Questions and answers about the widgets
If you have questions about the individual widgets, then first look at the topics of the individual widgets

* [German threads](https://forum.iobroker.net/search?term=Material%20Design%20Widgets%3A&in=titles&matchWords=all&by%5B%5D=Scrounger&categories%5B%5D=7&sortBy=topic.title&sortDirection=desc&showAs=topics)

## Supported Browser
I officially support the last two versions of every major browser. Specifically, i test on the following browsers:
* Firefox on Windows and Linux
* Chrome on Android, Windows, and Linux

## Supported Browser for vibrate on mobil devices function
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

## ioBroker VIS App
latest version needs to be implemented by the app, see https://github.com/ioBroker/ioBroker.vis.cordova.
I do not use the app and do not test on it either

# Adapter settings

Starting with version 0.4.0 there is a settings page for the adapter. You can find it under Instances in the user interface of the admin adapter

## General
![Logo](doc/en/media/settings_general.png)

|setting|description|
|-------|-----------|
|Documentation|Links to documentation to help you configure the widgets|
|Generate global script|Create a global script for the [Javascript Script Engine](https://github.com/ioBroker/ioBroker.javascript) with all theme data points. This allows to use colors, fonts and font sizes comfortably in scripts.|
|Sentry|use Sentry libraries to automatically report exceptions and code errors anonymously to the developers. For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!|

## Theme Editor

With the help of the Theme Editor you can centrally set colors, fonts and font sizes for all widgets via the adapter settings. This is realized with the help of the [Bindings of the VIS adapter](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects). For each widget datapoints (see screenshot below) are created with the set values. This makes it possible to use these settings in other widgets (not Material Design Widgets) via bindings.

##### Datapoint structure

![Logo](doc/en/media/settings_datapoints.png)

##### VIS Editor (Restore / update old Widgets)

![Logo](doc/en/media/vis_editor_theme_restore.gif)

In the VIS Editor you will find a button `use theme` for each widget. With this button you can reset the widgets to the use of the themes. That means if you have changed colors, fonts or font sizes, you can reset them with this button.

With the help of this button it is also possible to update your widgets from versions before 0.4.0 to use the themes.

##### Use Binding for non Material Design Widgets

![Logo](doc/en/media/settings_binding.gif)

In the adapter settings you can copy the binding command to the clipboard by clicking on the default text or the id in the tables. This binding can then be used by copy and paste even for non Material Design Widgets.

### Colors Theme
For colors there are two themes - light theme and dark theme. With the datapoint `vis-materialdesign.0.colors.darkTheme` you can switch between the two themes.

![Logo](doc/en/media/settings_colors_light.png)

![Logo](doc/en/media/settings_colors_dark.png)

Standard colors can be defined in the upper area. These standard colors can then be assigned to the individual widgets using the buttons in the table. If you change the default color, it will also change for all widgets that use this color.
Additionally, it is possible to assign your own colors to the widgets, independent of the standard colors.

### Fonts Theme

![Logo](doc/en/media/settings_fonts.png)

Standard fonts can be defined in the upper area. These standard fonts can then be assigned to the individual widgets using the buttons in the table. If you change the default color, it will also change for all widgets that use this color.
Additionally, it is possible to assign your own fonts to the widgets, independent of the standard colors.

### Font Sizes Theme

![Logo](doc/en/media/settings_fontSizes.png)

Standard font sizes can be defined in the upper area. These standard font sizes can then be assigned to the individual widgets using the buttons in the table. If you change the default color, it will also change for all widgets that use this color.
Additionally, it is possible to assign your own font sizes to the widgets, independent of the standard colors.


# Widgets


## Material Design Icons and Images
<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/material-icons.png"></td>
            <td>Some of the widgets support <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a> library. You can pic up an icon from the list above or open the image picker by clicking the button on the right of the input field.<br><br><b>Image colors only applies to the material design icons, not to an image!</b></td>
        </tr>
    </tbody>
</table>


## Buttons

##### Button Link Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>link_default</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>href</td>
				<td>Link</td>
				<td>url</td>
				<td>
			</tr>
			<tr>
				<td>openNewWindow</td>
				<td>open in new window</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>labelWidth</td>
				<td>text width</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonColorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>left | right
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


##### Button State Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>state_default</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>value</td>
				<td>value</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>labelWidth</td>
				<td>text width</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonColorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>left | right
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


##### Button Toggle Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>toggle_default</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>toggleType</td>
				<td>type of toggle</td>
				<td>string</td>
				<td>boolean | value
			</tr>
			<tr>
				<td>pushButton</td>
				<td>push button</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueOff</td>
				<td>value for off</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueOn</td>
				<td>value for on</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>stateIfNotTrueValue</td>
				<td>state if value unequal to 'on' condition</td>
				<td>string</td>
				<td>on | off
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelTrue</td>
				<td>Label true</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelColorFalse</td>
				<td>label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorTrue</td>
				<td>active label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>labelWidth</td>
				<td>text width</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonColorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBgFalse</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBgTrue</td>
				<td>active background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>imageTrue</td>
				<td>active image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageTrueColor</td>
				<td>active image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>left | right
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Buttons Vertical

![Logo](doc/en/media/buttons.gif)

##### Button Vertical Link Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>link_vertical</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>href</td>
				<td>Link</td>
				<td>url</td>
				<td>
			</tr>
			<tr>
				<td>openNewWindow</td>
				<td>open in new window</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>alignment</td>
				<td>alignment</td>
				<td>string</td>
				<td>flex-start | center | flex-end
			</tr>
			<tr>
				<td>distanceBetweenTextAndImage</td>
				<td>distance between text and image</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonColorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>top | bottom
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


##### Button Vertical State Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>state_vertical</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>value</td>
				<td>value</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>alignment</td>
				<td>alignment</td>
				<td>string</td>
				<td>flex-start | center | flex-end
			</tr>
			<tr>
				<td>distanceBetweenTextAndImage</td>
				<td>distance between text and image</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonColorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>top | bottom
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


##### Button Vertical Toggle Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>toggle_vertical</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>buttonStyle</td>
				<td>button style</td>
				<td>string</td>
				<td>text | raised | unelevated | outlined
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>toggleType</td>
				<td>type of toggle</td>
				<td>string</td>
				<td>boolean | value
			</tr>
			<tr>
				<td>pushButton</td>
				<td>push button</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueOff</td>
				<td>value for off</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueOn</td>
				<td>value for on</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>stateIfNotTrueValue</td>
				<td>state if value unequal to 'on' condition</td>
				<td>string</td>
				<td>on | off
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>buttontext</td>
				<td>Button text</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelTrue</td>
				<td>Label true</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelColorFalse</td>
				<td>label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorTrue</td>
				<td>active label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>alignment</td>
				<td>alignment</td>
				<td>string</td>
				<td>flex-start | center | flex-end
			</tr>
			<tr>
				<td>distanceBetweenTextAndImage</td>
				<td>distance between text and image</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>mdwButtonPrimaryColor</td>
				<td>primary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>mdwButtonSecondaryColor</td>
				<td>secondary color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBgFalse</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBgTrue</td>
				<td>active background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>imageTrue</td>
				<td>active image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageTrueColor</td>
				<td>active image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconPosition</td>
				<td>image position</td>
				<td>string</td>
				<td>top | bottom
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Buttons Icon
![Logo](doc/en/media/icon-button.gif)

##### Button Icon Link Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>link_icon</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>href</td>
				<td>Link</td>
				<td>url</td>
				<td>
			</tr>
			<tr>
				<td>openNewWindow</td>
				<td>open in new window</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorBgFalse</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
		</tbody>
	</table>
</details>


##### Button Icon State Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>state_icon</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>value</td>
				<td>value</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorBgFalse</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockIconBackground</td>
				<td>lockIconBackground</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockBackgroundSizeFactor</td>
				<td>lockBackgroundSizeFactor</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


##### Button Icon Toggle Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		<thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>toggle_icon</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>toggleType</td>
				<td>type of toggle</td>
				<td>string</td>
				<td>boolean | value
			</tr>
			<tr>
				<td>pushButton</td>
				<td>push button</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueOff</td>
				<td>value for off</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueOn</td>
				<td>value for on</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>stateIfNotTrueValue</td>
				<td>state if value unequal to 'on' condition</td>
				<td>string</td>
				<td>on | off
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>icon</b></i></td>
			</tr>
			<tr>
				<td>image</td>
				<td>Image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageColor</td>
				<td>image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>imageTrue</td>
				<td>active image</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>imageTrueColor</td>
				<td>active image color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>iconHeight</td>
				<td>image height</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorBgFalse</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBgTrue</td>
				<td>active background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorPress</td>
				<td>color pressed</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockIconBackground</td>
				<td>lockIconBackground</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockBackgroundSizeFactor</td>
				<td>lockBackgroundSizeFactor</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>

## Card
![Logo](doc/en/media/cards.png)

## List
![Logo](doc/en/media/list.gif)

## IconList

![Logo](doc/en/media/iconList.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/iconList_settings_common.png"></td>
            <td>input method for the list data</td>
            <td>The data for the IconList can be entered via the editor or a JSON string can be used</td>
        </tr>
        <tr>
            <td>JSON-String: object id</td>
            <td>Object Id of datapoint with JSON string. The JSON string must have the following format:
            <pre><code>
[
	{
		"background": "red",
		"text": "text1",
		"subText": "number",
		"image": "harddisk",
		"imageColor": "#ec0909",
		"imageActive": "folder",
		"imageActiveColor": "#5ad902",
		"buttonBackgroundColor": "",
		"buttonBackgroundActiveColor": "",
		"listType": "buttonState",
		"objectId": "0_userdata.0.iconList.buttonState.number",
		"buttonStateValue": "60",
		"buttonNavView": "",
		"buttonLink": "",
		"buttonToggleValueTrue": "",
		"buttonToggleValueFalse": "",
		"valueAppendix": "",
		"showValueLabel": "true",
		"statusBarColor": "green",
		"lockEnabled": "false"        
	},
	{
		"background": "green",
		"text": "text0",
		"subText": "bool",
		"image": "home",
		"imageColor": "#44739e",
		"imageActive": "home",
		"imageActiveColor": "#44739e",
		"buttonBackgroundColor": "",
		"buttonBackgroundActiveColor": "#a0f628",
		"listType": "buttonToggle",
		"objectId": "0_userdata.0.iconList.buttonToggle.bool0",
		"buttonStateValue": "60",
		"buttonNavView": "",
		"buttonLink": "",
		"buttonToggleValueTrue": "",
		"buttonToggleValueFalse": "",
		"valueAppendix": "",
		"showValueLabel": "false",
		"statusBarColor": "",
		"lockEnabled": "false"
	}
]
            </code></pre>
            Property <code>listType</code> can have the following values:<br>
            <code>text, buttonState, buttonToggle, buttonToggleValueTrue, buttonToggleValueFalse, buttonNav, buttonLink</code>
            </td>
        </tr>        
    </tbody>
</table>

## Progress
![Logo](doc/en/media/progress.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/progress_settings.png"></td>
            <td>custom label</td>
            <td>For custom label you can use the property <code>[#value]</code> to show the real value of the datapoint. To show the current percent you can use <code>[#percent]</code></td>
        </tr>
    </tbody>
</table>

##### Progress Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>linear</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>progressIndeterminate</td>
				<td>indeterminate - continuously animates</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>min</td>
				<td>min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>max</td>
				<td>max</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>reverse</td>
				<td>Revers value</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>layout</b></i></td>
			</tr>
			<tr>
				<td>progressRounded</td>
				<td>rounded corners</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>progressStriped</td>
				<td>striped</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>progressStripedColor</td>
				<td>progressStripedColor</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorProgressBackground</td>
				<td>background color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorProgress</td>
				<td>color progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorOneCondition</td>
				<td>condition for color 1 progress [>]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>colorOne</td>
				<td>color 1 progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorTwoCondition</td>
				<td>condition for color 2 progress [>]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>colorTwo</td>
				<td>color 2 progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>showValueLabel</td>
				<td>show value</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueLabelStyle</td>
				<td>value caption style</td>
				<td>string</td>
				<td>progressPercent | progressValue | progressCustom
			</tr>
			<tr>
				<td>valueLabelUnit</td>
				<td>unit</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueMaxDecimals</td>
				<td>decimal points</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelCustom</td>
				<td>custom label</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textColor</td>
				<td>Minutes text color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textAlign</td>
				<td>textAlign</td>
				<td>string</td>
				<td>start | center | end
			</tr>
		</tbody>
	</table>
</details>


## Progress Circular
![Logo](doc/en/media/progress.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/progress_settings.png"></td>
            <td>custom label</td>
            <td>For custom label you can use the property <code>[#value]</code> to show the real value of the datapoint. To show the current percent you can use <code>[#percent]</code></td>
        </tr>
    </tbody>
</table>

##### Progress Circular Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>type</td>
				<td>Widget type</td>
				<td>string</td>
				<td>circular</td>
			</tr>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>min</td>
				<td>min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>max</td>
				<td>max</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>layout</b></i></td>
			</tr>
			<tr>
				<td>progressCircularSize</td>
				<td>size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>progressCircularWidth</td>
				<td>thickness</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>progressCircularRotate</td>
				<td>rotate start point</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorProgressBackground</td>
				<td>background color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorProgress</td>
				<td>color progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>innerColor</td>
				<td>circle background color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorOneCondition</td>
				<td>condition for color 1 progress [>]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>colorOne</td>
				<td>color 1 progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorTwoCondition</td>
				<td>condition for color 2 progress [>]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>colorTwo</td>
				<td>color 2 progress</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>showValueLabel</td>
				<td>show value</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueLabelStyle</td>
				<td>value caption style</td>
				<td>string</td>
				<td>progressPercent | progressValue | progressCustom
			</tr>
			<tr>
				<td>valueLabelUnit</td>
				<td>unit</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueMaxDecimals</td>
				<td>decimal points</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelCustom</td>
				<td>custom label</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>textColor</td>
				<td>Minutes text color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>textFontSize</td>
				<td>text size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Slider
![Logo](doc/en/media/slider.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/slider.png"></td>
            <td>initDelay</td>
            <td>If the slider is not visible or operable after loading the runtime, then this value must be increased. Entry is made in milliseconds.<br>For example, increase by 250 steps until the slider works.</td>
        </tr>
    </tbody>
</table>

##### Slider Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>oid-working</td>
				<td>Working Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>orientation</td>
				<td>Orientation</td>
				<td>string</td>
				<td>horizontal | vertical
			</tr>
			<tr>
				<td>reverseSlider</td>
				<td>invert slider</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>knobSize</td>
				<td>knob size</td>
				<td>string</td>
				<td>knobSmall | knobMedium | knobBig
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>min</td>
				<td>min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>max</td>
				<td>max</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>step</td>
				<td>steps</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>steps Layout</b></i></td>
			</tr>
			<tr>
				<td>showTicks</td>
				<td>show steps</td>
				<td>string</td>
				<td>no | yes | always
			</tr>
			<tr>
				<td>tickSize</td>
				<td>display size of steps</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>tickLabels</td>
				<td>text of steps (comma separated)</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>tickTextColor</td>
				<td>text color of steps</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>tickFontFamily</td>
				<td>font of steps</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>tickFontSize</td>
				<td>font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>tickColorBefore</td>
				<td>color before the regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>tickColorAfter</td>
				<td>color after the regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorBeforeThumb</td>
				<td>color before regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorThumb</td>
				<td>color of regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorAfterThumb</td>
				<td>color after regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>prepandText</td>
				<td>text prepanded</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>prepandTextWidth</td>
				<td>prepandTextWidth</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>prepandTextColor</td>
				<td>color of text prepanded</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>prepandTextFontSize</td>
				<td>size text prepanded</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>prepandTextFontFamily</td>
				<td>font of text prepanded</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>showValueLabel</td>
				<td>show value</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueLabelStyle</td>
				<td>value caption style</td>
				<td>string</td>
				<td>sliderPercent | sliderValue
			</tr>
			<tr>
				<td>valueLabelUnit</td>
				<td>unit</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontFamily</td>
				<td>valueFontFamily</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontSize</td>
				<td>value font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelColor</td>
				<td>text color of value</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>valueLabelMin</td>
				<td>text for value less than min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelMax</td>
				<td>text for value greater than min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueLessThan</td>
				<td>'smaller than' condition for the text of the value</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textForValueLessThan</td>
				<td>text for 'smaller than'</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueGreaterThan</td>
				<td>'greater than' condition for the text of the value</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textForValueGreaterThan</td>
				<td>text for 'greater than'</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelWidth</td>
				<td>distance label</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>layout of the controller label</b></i></td>
			</tr>
			<tr>
				<td>showThumbLabel</td>
				<td>show label</td>
				<td>string</td>
				<td>no | yes | always
			</tr>
			<tr>
				<td>thumbSize</td>
				<td>label size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>thumbBackgroundColor</td>
				<td>background color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>thumbFontColor</td>
				<td>font color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>thumbFontSize</td>
				<td>font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>thumbFontFamily</td>
				<td>font</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>useLabelRules</td>
				<td>use rules of the text</td>
				<td>boolean</td>
				<td>false | true
			</tr>
		</tbody>
	</table>
</details>


## Slider Round
![Logo](doc/en/media/round_slider.gif)

##### Slider Round Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>oid-working</td>
				<td>Working Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>min</td>
				<td>min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>max</td>
				<td>max</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>step</td>
				<td>steps</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>startAngle</td>
				<td>start angle</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>arcLength</td>
				<td>arc length</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>sliderWidth</td>
				<td>slider thikness</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>handleSize</td>
				<td>knob size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>handleZoom</td>
				<td>knob zoom at control</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>rtl</td>
				<td>slider movement from right to left</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorSliderBg</td>
				<td>background</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorBeforeThumb</td>
				<td>color before regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorThumb</td>
				<td>color of regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorAfterThumb</td>
				<td>color after regulator</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>valueLabelColor</td>
				<td>text color of value</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>showValueLabel</td>
				<td>show value</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueLabelVerticalPosition</td>
				<td>vertical text position of value </td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelStyle</td>
				<td>value caption style</td>
				<td>string</td>
				<td>sliderPercent | sliderValue
			</tr>
			<tr>
				<td>valueLabelUnit</td>
				<td>unit</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontFamily</td>
				<td>valueFontFamily</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontSize</td>
				<td>value font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelMin</td>
				<td>text for value less than min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueLabelMax</td>
				<td>text for value greater than min</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueLessThan</td>
				<td>'smaller than' condition for the text of the value</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textForValueLessThan</td>
				<td>text for 'smaller than'</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueGreaterThan</td>
				<td>'greater than' condition for the text of the value</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>textForValueGreaterThan</td>
				<td>text for 'greater than'</td>
				<td>string</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Checkbox
![Logo](doc/en/media/checkbox.gif)

##### Checkbox Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>toggleType</td>
				<td>type of toggle</td>
				<td>string</td>
				<td>boolean | value
			</tr>
			<tr>
				<td>valueOff</td>
				<td>value for off</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueOn</td>
				<td>value for on</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>stateIfNotTrueValue</td>
				<td>state if value unequal to 'on' condition</td>
				<td>string</td>
				<td>on | off
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>labelFalse</td>
				<td>Label false</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelTrue</td>
				<td>Label true</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelPosition</td>
				<td>labelPosition</td>
				<td>string</td>
				<td>left | right | off
			</tr>
			<tr>
				<td>labelClickActive</td>
				<td>activate label click</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueFontFamily</td>
				<td>valueFontFamily</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontSize</td>
				<td>value font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorCheckBox</td>
				<td>checkbox color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorCheckBoxBorder</td>
				<td>border color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorCheckBoxHover</td>
				<td>hover color of checkbox</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorFalse</td>
				<td>label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorTrue</td>
				<td>active label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Switch
![Logo](doc/en/media/switch.gif)

##### Switch Properties

The following properties can be used as [control element in a table](#control-elements) or as [HTML element](#html-elements)

<details>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				<th>Values</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>debug</td>
				<td>debug mode</td>
				<td>boolean</td>
				<td>false | true</td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Common</b></i></td>
			</tr>
			<tr>
				<td>oid</td>
				<td>Object ID</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>readOnly</td>
				<td>read only</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>toggleType</td>
				<td>type of toggle</td>
				<td>string</td>
				<td>boolean | value
			</tr>
			<tr>
				<td>valueOff</td>
				<td>value for off</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueOn</td>
				<td>value for on</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>stateIfNotTrueValue</td>
				<td>state if value unequal to 'on' condition</td>
				<td>string</td>
				<td>on | off
			</tr>
			<tr>
				<td>vibrateOnMobilDevices</td>
				<td>vibrate on mobil devices [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>generateHtmlControl</td>
				<td>generate Html Element</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>labeling</b></i></td>
			</tr>
			<tr>
				<td>labelFalse</td>
				<td>Label false</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelTrue</td>
				<td>Label true</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>labelPosition</td>
				<td>labelPosition</td>
				<td>string</td>
				<td>left | right | off
			</tr>
			<tr>
				<td>labelClickActive</td>
				<td>activate label click</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>valueFontFamily</td>
				<td>valueFontFamily</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>valueFontSize</td>
				<td>value font size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>colors</b></i></td>
			</tr>
			<tr>
				<td>colorSwitchThumb</td>
				<td>thumb color of switch</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorSwitchTrack</td>
				<td>track color of switch</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorSwitchTrue</td>
				<td>active switch color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorSwitchHover</td>
				<td>hover color of switch</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>colorSwitchHoverTrue</td>
				<td>active switch color selected / hover</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorFalse</td>
				<td>label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>labelColorTrue</td>
				<td>active label color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>Locking</b></i></td>
			</tr>
			<tr>
				<td>lockEnabled</td>
				<td>enable Locking</td>
				<td>boolean</td>
				<td>false | true
			</tr>
			<tr>
				<td>autoLockAfter</td>
				<td>auto Locking after [s]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIcon</td>
				<td>icon</td>
				<td>string</td>
				<td>
			</tr>
			<tr>
				<td>lockIconTop</td>
				<td>symbol distance from top [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconLeft</td>
				<td>symbol distance from left [%]</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconSize</td>
				<td>icon size</td>
				<td>number</td>
				<td>
			</tr>
			<tr>
				<td>lockIconColor</td>
				<td>icon color</td>
				<td>string</td>
				<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)
			</tr>
			<tr>
				<td>lockFilterGrayscale</td>
				<td>gray filter if locked</td>
				<td>number</td>
				<td>
			</tr>
		</tbody>
	</table>
</details>


## Input

### Text input
![Logo](doc/en/media/input.gif)

TODO

### Select
![Logo](doc/en/media/select.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td>
            <td>method of data of menu</td>
            <td>There are three methods to define the data of the menu. First is to define it via editor. Second is to define it via a json string. Third method is to define it by three list for values, labels and icons</td>
        </tr>
        <tr>
            <td>Editor: count of menu items</td>
            <td>Method of data of menu: via editor<br>Define the number of menu entries. The the individual menu entries can be defined under menu item[x]</td>
        </tr>
        <tr>
            <td>JSON string</td>
            <td>Method of data of menu: json string<br>Here you can add a JSON string to define the menu entries or use bindings to a datapoint that contains a JSON string.<br><br>JSON string must have the following format:<br>
<pre><code>
[
	{
		"text": "text 0",
		"subText": "sub 0",
		"value": "val0",
		"icon": "account-cancel"
	},
	{
		"text": "text 1",
		"subText": "sub 1",
		"value": "val1",
		"icon": "/vis/icon/info.png",
        "iconColor": "red",
        "iconColorSelectedTextField": "red"
	},
	{
		"text": "text 2",
		"subText": "sub 2",
		"value": "val2",
		"icon": "facebook-workplace",
        "iconColor": "green"
	}
]
</code></pre>
            </td>
        </tr>
        <tr>
            <td>value list</td>
            <td>Method of data of menu: value list<br>Define the number of menu entries by adding values that will be set to the datapoint. Entries must be separeted by semicolon</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related labels of the values. Entries must be separeted by semicolon</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related icons of the values. Entries must be separeted by semicolon. You can use image path or Material Design Icons name</td>
        </tr>                
    </tbody>
</table>

### Autocomplete
![Logo](doc/en/media/autocomplete.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td>
            <td>method of data of menu</td>
            <td>There are three methods to define the data of the menu. First is to define it via editor. Second is to define it via a json string. Third method is to define it by three list for values, labels and icons</td>
        </tr>
        <tr>
            <td>Editor: count of menu items</td>
            <td>Method of data of menu: via editor<br>Define the number of menu entries. The the individual menu entries can be defined under menu item[x]</td>
        </tr>
        <tr>
            <td>JSON string</td>
            <td>Method of data of menu: json string<br>Here you can add a JSON string to define the menu entries or use bindings to a datapoint that contains a JSON string.<br><br>JSON string must have the following format:<br>
<pre><code>
[
	{
		"text": "text 0",
		"subText": "sub 0",
		"value": "val0",
		"icon": "account-cancel"
	},
	{
		"text": "text 1",
		"subText": "sub 1",
		"value": "val1",
		"icon": "/vis/icon/info.png",
        "iconColor": "red"
	},
	{
		"text": "text 2",
		"subText": "sub 2",
		"value": "val2",
		"icon": "facebook-workplace",
        "iconColor": "green"
	}
]
</code></pre>
            </td>
        </tr>
        <tr>
            <td>value list</td>
            <td>Method of data of menu: value list<br>Define the number of menu entries by adding values that will be set to the datapoint. Entries must be separeted by semicolon</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related labels of the values. Entries must be separeted by semicolon</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related icons of the values. Entries must be separeted by semicolon. You can use image path or Material Design Icons name</td>
        </tr>                
    </tbody>
</table>

## Top App Bar with Navigation Drawer

Top App Bar with Navigation Drawer can be combined with the <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a>.

<b>Take a look at the [Material Design Widgets example project](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b> to understand how it works.

##### Layout modal:
![Logo](doc/en/media/topappbar_modal.gif)

##### Layout permanent:
![Logo](doc/en/media/topappbar_permanent.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=3><img src="doc/en/media/topappbar_settings.png"></td>
            <td>Object ID</td>
            <td>must be set to a datapoint from typ number. For example this datapoint can be used by <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a></td>
        </tr>
        <tr>
            <td>show index of navigation items</td>
            <td>shows the index of navigation before the item label. This number can be used in <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a> to define the view that should be shown if the item is selected</td>
        </tr>
        <tr>
            <td>count of navigation items</td>
            <td>Define the count of the navigations items</td>
        </tr>
    </tbody>
</table>

### Submenu 
![Logo](doc/en/media/drawer_subMenu.png)

##### since Version 0.4.0
Since version 0.4.0 the submenus must be defined by a JSON string:

```
[
	{
		"text": "subitem0",
		"icon": "account",
		"iconColor": "red"
	}, 
	{
		"text": "subitem1",
		"icon": "home",
		"iconColor": "green",
		"divider": "true"
	}, 
	{
		"text": "subitem1",
		"divider": "true",
		"icon": "/vis.0/myImages/devices/lxc_iobroker.png",
		"userGroups": ["administrator", "user"],
		"behaviorNotInUserGroup": "disabled"
	}
]
```

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>text</td>
            <td>text of entry</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>icon</td>
            <td>icon or image path of entry</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>iconColor</td>
            <td>icon color (works not if image is used)</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>divider</td>
            <td>show a divider</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>userGroups</td>
            <td>user groups that are allowed to view and control this entry.</td>
            <td>array[string]</td>
            <td>id of user groups</td>
        </tr>
        <tr>
            <td>behaviorNotInUserGroup</td>
            <td>hide or disable entry if user is not part of user group</td>
            <td>string</td>
            <td>hide, disabled</td>
        </tr>
    </tbody>
</table>

##### before Version 0.4.0

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td>
            <td>count of sub menus[x]</td>
            <td>Define if the navigation item has submenus and the count of submenus.</td>
        </tr>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td>
            <td>label[x]</td>
            <td>To change the text of the items, you have to put a json object into the label field with the index of the view field.<br>
                Example:<br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Result: see screenshot</td>
        </tr>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td>
            <td>icon[x]</td>
            <td>To change the icons of the items, you have to put a json object into the icons field with the index of the view field.<br>
                Example:<br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

Result: see screenshot</td>
        </tr>
    </tbody>
</table>

## Charts

### Bar Chart

![Logo](doc/en/media/barChart.png)

TODO

### Pie Chart

TODO

### Line History Chart:

> Required Adapter: [SQL](https://github.com/ioBroker/ioBroker.sql), [History](https://github.com/ioBroker/ioBroker.history) or [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![Logo](doc/en/media/line_history_chart.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=5><img src="doc/en/media/line_hostory_chart_general.png"></td>
            <td>adapter instance</td>
            <td>Instance for the sql or history adapter</td>
        </tr>
        <tr>
            <td>controlling time interval using object</td>
            <td>Id of a datapoint to change the time interval of the chart.<br><br>If the datapoint is from type 'string' it must contain <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">one of the linked values</a><br>If the datapoint is from type 'number', it must contain the starting timestamp of the graph.<br><br>For example, you can use a button here to change the display of the chart during runtime</td>
        </tr>
        <tr>
            <td>boolean object for update</td>
            <td>Id of adatapoint to trigger a manual refresh of the chart.<br>For example, you can use a button here to refresh the chart during runtime</td>
        </tr>
        <tr>
            <td>chart timeout</td>
            <td>timeout for loading the chart data. If you get a timeout error message, increase this value</td>
        </tr>
        <tr>
            <td>debug mode</td>
            <td>if you have problems or errors, activate the debug mode and attach the console log (F12) data to the issue</td>
        </tr>
        <tr>
            <td rowspan=5><img src="doc/en/media/line_hostory_chart_dataset.png"></td>
            <td>Object Id</td>
            <td>datapoint id with activated instance for the sql or history adapter</td>
        </tr>
        <tr>
            <td>display method</td>
            <td><a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">link</a></td>
        </tr>
        <tr>
            <td>max. number of data points to be displayed</td>
            <td>Number of maximum data points to display</td>
        </tr>
        <tr>
            <td>time interval between the data points in [s]</td>
            <td>Optional setting, overrides the 'count' setting.<br>Distance between the individual data points in seconds.<br>For example, if you want to display data points every minute, you have to enter 60 here</td>
        </tr>
        <tr>
            <td>data multiply with</td>
            <td>Optional setting, multiply every datapoint with the given value</td>
        </tr>
        <tr>
            <td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td>
            <td>time formats of x-axis</td>
            <td>Change the time format of the X-axis. Time formats must be entered for all time units, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">the following time units are permitted.</a><br>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
        <tr>
            <td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td>
            <td>tooltip time formats</td>
            <td>Change the time format of the tooltip. Time formats must be entered for all time units, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">the following time units are permitted.</a><br>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
    </tbody>
</table>

### JSON Chart

#### General

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>axisLabels</td>
            <td>axis label of graph</td>
            <td>Array</td>
            <td>numbers or string</td>
        </tr>
        <tr>
            <td>graphs</td>
            <td>data of graphs</td>
            <td>array[<a href="#graph">graph</a>]</td>
            <td>see graph</td>
        </tr>
    </tbody>
</table>

#### graph

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>data of graph or data with timestamp</td>
            <td>Array[numbers] | Array[<a href="#data-with-time-axis">values with timestamp</a>]</td>
            <td>number</td>
        </tr>
        <tr>
            <td>type</td>
            <td>type of graph</td>
            <td>string</td>
            <td>'line', 'bar'</td>
        </tr>
        <tr>
            <td>legendText</td>
            <td>text of legend</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>displayOrder</td>
            <td>overlay order of graph</td>
            <td>number</td>
            <td>1, 2, ...</td>
        </tr>
        <tr>
            <td>color</td>
            <td>color of graph</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>use_gradient_color</td>
            <td>use gradient color</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>gradient_color</td>
            <td>gradient color array</td>
            <td>array[<a href="#gradientcolor">gradientColor</a>]</td>
            <td>[ { value: -20, color: '#7d3c98' }, { value: 0, color: '#2874a6' } ]</td>
        </tr>
        <tr>
            <td>tooltip_title</td>
            <td>title of tooltip</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>tooltip_text</td>
            <td>ovveride text of tooltip</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>tooltip_MinDigits</td>
            <td>max decimals of tooltip value</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>tooltip_MaxDigits</td>
            <td>max decimals of tooltip value</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>tooltip_AppendText</td>
            <td>append text to tooltip value</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>datalabel_show</td>
            <td>show data labels for graph</td>
            <td>string | boolean</td>
            <td>false, true, auto</td>
        </tr>
        <tr>
            <td>datalabel_anchor</td>
            <td>anchor of data labels</td>
            <td>string</td>
            <td>center, start, end</td>
        </tr>
        <tr>
            <td>datalabel_align</td>
            <td>position of the data label relative to the anchor point</td>
            <td>string</td>
            <td>left, start, center, end, right, top, bottom</td>
        </tr>
        <tr>
            <td>datalabel_offset</td>
            <td>distance (in pixels) to pull the data label away from the anchor point</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>datalabel_text_align</td>
            <td>text aligment of the data label</td>
            <td>string</td>
            <td>left, start, center, end, right</td>
        </tr>
        <tr>
            <td>datalabel_rotation</td>
            <td>clockwise rotation angle (in degrees) of the data label</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>datalabel_steps</td>
            <td>show data label every x step</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>datalabel_minDigits</td>
            <td>minimum decimals of data labels</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>datalabel_maxDigits</td>
            <td>maximum decimals of data labels</td>
            <td>number</td>
            <td>0, 1, 2, ...</td>
        </tr>
        <tr>
            <td>datalabel_append</td>
            <td>append text to data label</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>datalabel_color</td>
            <td>data label color</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>datalabel_fontFamily</td>
            <td>data label font family</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>datalabel_fontSize</td>
            <td>data label font size</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>datalabel_backgroundColor</td>
            <td>data label background color</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>datalabel_borderColor</td>
            <td>data label border color</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>datalabel_borderWidth</td>
            <td>data label border width</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>datalabel_borderRadius</td>
            <td>data label border radius</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
    </tbody>
</table>
</details>


#### graph line chart spfeicifc

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>line_pointStyle</td>
            <td>point style of line</td>
            <td>string</td>
            <td>circle, cross, crossRot, dash, line, rect, rectRounded, rectRot, star, triangle</td>
        </tr>
        <tr>
            <td>line_pointSize</td>
            <td>point size of line</td>
            <td>number</td>
            <td>1, 2, 3, ...</td>
        </tr>
        <tr>
            <td>line_pointSizeHover</td>
            <td>point size of line</td>
            <td>number</td>
            <td>1, 2, 3, ...</td>
        </tr>
        <tr>
            <td>line_PointColor</td>
            <td>color of line point</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>line_PointColorBorder</td>
            <td>border color of line point</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>line_PointColorHover</td>
            <td>hover color of line point</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>line_PointColorBorderHover</td>
            <td>border hover color of line point</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>line_spanGaps</td>
            <td>draw lines if data has gaps</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>line_steppedLine</td>
            <td>enable stepped line</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>line_Tension</td>
            <td>smothness of line</td>
            <td>number</td>
            <td>0 - 1</td>
        </tr>
        <tr>
            <td>line_Thickness</td>
            <td>thikness of line</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>line_UseFillColor</td>
            <td>use fill color under line</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>line_FillColor</td>
            <td>fill color under line</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>use_line_gradient_fill_color</td>
            <td>use gradient fill color</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>line_gradient_fill_color</td>
            <td>gradient color array</td>
            <td>array[<a href="#gradientcolor">gradientColor</a>]</td>
            <td>[ { value: -20, color: '#7d3c98' }, { value: 0, color: '#2874a6' } ]</td>
        </tr>
        <tr>
            <td>line_FillBetweenLines</td>
            <td>fill color to next / previous line</td>
            <td>string</td>
            <td>'+1', '-1', '+2', ...</td>
        </tr>
    </tbody>
</table>
</details>


#### graph bar chart spfeicifc

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>barIsStacked</td>
            <td>stacked bar. If you have a comined chart (Line + stacked Bar), then you must also set this value for the line dataset!</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>barStackId</td>
            <td>id of stack. Bar that should combine to a stack must have the same id</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>barColorHover</td>
            <td>hover color of bar</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>barBorderColor</td>
            <td>border color of bar</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>barBorderWidth</td>
            <td>thikness of bar border</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>barBorderColorHover</td>
            <td>border hover color of bar</td>
            <td>color | array[colors]</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>barBorderWidthHover</td>
            <td>hover thikness of bar border</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
    </tbody>
</table>
</details>

#### graph y-Axis

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>yAxis_id</td>
            <td>id of y-axis. If you would like to use a common y-axis for multipl graph data, use the same id.</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_position</td>
            <td>position of y-axis</td>
            <td>string</td>
            <td>left, right</td>
        </tr>
        <tr>
            <td>yAxis_show</td>
            <td>show y-axis</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>yAxis_title_text</td>
            <td>y-axis title</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>yAxis_title_color</td>
            <td>override y-axis title color</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>yAxis_title_fontFamily</td>
            <td>override y-axis title font family</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>yAxis_title_fontSize</td>
            <td>override y-axis title font size</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_min</td>
            <td>minimum value of y-axis</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_max</td>
            <td>maximum value of y-axis</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_step</td>
            <td>steps of y-axis</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_minimumDigits</td>
            <td>y-axis minimum number of decimal places</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_maximumDigits</td>
            <td>y-axis maximum number of decimal places</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_maxSteps</td>
            <td>maximum steps of y-axis</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_distance</td>
            <td>override y-axis value distance to axis</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_appendix</td>
            <td>append text to y-axis value</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>yAxis_color</td>
            <td>override y-axis value color</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>yAxis_fontFamily</td>
            <td>override y-axis value font family</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>yAxis_fontSize</td>
            <td>override y-axis value font size</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>yAxis_zeroLineWidth</td>
            <td>width of y-axis zero line</td>
            <td>number</td>
            <td>0.3, 1.5, 4, ...</td>
        </tr>
        <tr>
            <td>yAxis_zeroLineColor</td>
            <td>y-axis zero line color</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_show</td>
            <td>show y-axis grid lines</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_color</td>
            <td>color of y-axis grid lines</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_lineWidth</td>
            <td>width of grid lines</td>
            <td>number</td>
            <td>0 - 1</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_border_show</td>
            <td>show border of y-axis grid lines</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_ticks_show</td>
            <td>show y-axis grid interval ticks</td>
            <td>boolean</td>
            <td>false, true</td>
        </tr>
        <tr>
            <td>yAxis_gridLines_ticks_length</td>
            <td>length of y-axis grid ticks</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
    </tbody>
</table>
</details>

#### gradientColor

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>value</td>
            <td>value where color should be applied</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>color</td>
            <td>color for value</td>
            <td>color</td>
            <td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
        </tr>
    </tbody>
</table>
</details>

### Chart with time axis
JSON Chart supports data that have a timestamp. To use this the data array must have values for timestamp (x-axis value) and value (y-axis value).

#### values with timestamp

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>t</td>
            <td>timestamp - xAxis value</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
        <tr>
            <td>y</td>
            <td>value for timestamp - yAxis value</td>
            <td>number</td>
            <td>1, 2, 5, ...</td>
        </tr>
    </tbody>
</table>
</details>

#### x-axis settings for data with timestamp

<details>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>xAxis_bounds</td>
            <td>scale boundary strategy<br><br>'data': makes sure data are fully visible, labels outside are removed<br>'ticks': makes sure ticks are fully visible, data outside are truncated</td>
            <td>String</td>
            <td>data, ticks</td>
        </tr>
        <tr>
            <td>xAxis_timeFormats</td>
            <td>time formats for the x-axis</td>
            <td>Object</td>
            <td>Time formats must be entered for all time units, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">the following time units are permitted.</a><br>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
        <tr>
            <td>xAxis_tooltip_timeFormats</td>
            <td>time formats for the x-axis</td>
            <td>String</td>
            <td>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
        <tr>
            <td>xAxis_time_unit</td>
            <td>force the time format for the x-axis</td>
            <td>String</td>
            <td>following units are allowed, <a href="https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units">see link</a></td>
        </tr>
    </tbody>
</table>
</details>

## Table
![Logo](doc/en/media/table.gif)


### Input Data
Input data must be a json array of objects, example:
```
[
	{
		"img": "/vis.0/myImages/erlebnis_50.png",
		"name": "Empire",
		"betriebszeit": "4h 06m",
		"funk": "5G",
		"ip": "10.0.0.1"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Handy",
		"betriebszeit": "13m",
		"funk": "5G",
		"ip": "10.0.0.2"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Harmony Hub - Wohnzimmer",
		"betriebszeit": "18T 07h 21m",
		"funk": "2G",
		"ip": "10.0.0.3"
	}
]
```

#### Control Elements

To generate a control element (button, checkbox, etc.) in cell of the table you must create an object instead of a string.

![Logo](doc/en/media/table_control_example.gif)

```
[
	{
		"control": {
			"type": "buttonToggle",
			"oid": "0_userdata.0.MDW.Buttons.bool",
			"buttonText": "&nbsp;off",
			"buttonTextTrue": "&nbsp;on",
			"image": "home",
			"imagePosition": "left",
			"colorBgTrue": "green",
			"lockEnabled": "true"
		},
		"img": "/vis.0/myImages/erlebnis_50.png",
		"name": "Empire",
		"betriebszeit": "4h 06m",
		"funk": "5G"
	}, {
		"img": "/vis.0/myImages/erlebnis_100.png",
		"control": {
			"type": "buttonToggle",
			"oid": "0_userdata.0.MDW.Buttons.bool",
			"buttonText": "off",
			"buttonTextTrue": "on",
			"image": "home",
			"colorBgTrue": "green"
		},
		"name": "Handy",
		"betriebszeit": "13m",
		"funk": "5G",
		"ip": "10.0.0.2"
	}, {
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Harmony Hub - Wohnzimmer",
		"betriebszeit": "18T 07h 21m",
		"funk": "2G",
		"ip": "10.0.0.3"
	}
]
```

##### Generate by Editor

You can very easy generate controls by using the editor. Just create a supported Widget, configure it over the editor and export the settings by copy and paste to the table wigdet.
Take a look at the animated screenshot below:

![Logo](doc/en/media/table_controls.gif)

##### General
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Properties</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>type of control element</td>
            <td>string</td>
            <td>
                <b>Buttons</b>
                <ul>
                    <li><a href="#button-link-properties">Button Link</a></li>
                    <li><a href="#button-state-properties">Button State</a></li>
                    <li><a href="#button-toggle-properties">Button Toggle</a></li>
                </ul>
                <b>Buttons Vertical</b>
                <ul>
                    <li><a href="#button-vertical-link-properties">Button Icon Link</a></li>
                    <li><a href="#button-vertical-state-properties">Button Icon State</a></li>
                    <li><a href="#button-vertical-toggle-properties">Button Icon Toggle</a></li>
                </ul>
                <b>Buttons Icons</b>
                <ul>
                    <li><a href="#button-icon-link-properties">Button Icon Link</a></li>
                    <li><a href="#button-icon-state-properties">Button Icon State</a></li>
                    <li><a href="#button-icon-toggle-properties">Button Icon Toggle</a></li>
                </ul>
                <ul>
                    <li><a href="#progress-1">progress</a></li>
                    <li><a href="#progress-circular">progress_circular</a></li>
                    <li><a href="#slider-1">slider</a></li>
                    <li><a href="#slider-round">slider_round</a></li>
                    <li><a href="#switch-1">switch</a></li>
                    <li><a href="#checkbox-1">checkbox</a></li>
					<li><a href="#textfield">textfield</a></li>
					<li><a href="#select-1">select</a></li>
					<li><a href="#autocomplete-1">autocomplete</a></li>
                    <li><a href="#material-design-icons">Material Design Icons</a></li>
                    <li><a href="#html">Html</a></li>
                </ul> 
            </td>
        </tr>
        <tr>
            <td>width</td>
            <td>width in % or px of control element</td>
            <td>string</td>
            <td>
                100% | 100px
            </td>
        </tr>
        <tr>
            <td>height</td>
            <td>height in % or px of control element</td>
            <td>string</td>
            <td>
                100% | 100px
            </td>
        </tr>
        <tr>
            <td>rowspan</td>
            <td>cell that spans x rows</td>
            <td>number</td>
            <td>
                1, 2, 3, ... 
            </td>
        </tr>
        <tr>
            <td>colspan</td>
            <td>cell that spans x columns</td>
            <td>number</td>
            <td>
                1, 2, 3, ... 
            </td>
        </tr>
        <tr>
            <td>verticalAlign</td>
            <td>vertical alignment</td>
            <td>string</td>
            <td>
                top | middle | bottom
            </td>
        </tr>
        <tr>
            <td>cellStyleAttrs</td>
            <td>css style attributes for cell</td>
            <td>string</td>
            <td>
                ...
            </td>
        </tr>
    </tbody>
</table>

##### Textfield

<details>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Description</th>
			<th>Type</th>
			<th>Values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>oid</td>
			<td>Object ID</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputType</td>
			<td>inputType</td>
			<td>string</td>
			<td>text | number | date | time | mask</td>
		</tr>
		<tr>
			<td>inputAlignment</td>
			<td>text alignment</td>
			<td>string</td>
			<td>left | center | right</td>
		</tr>
		<tr>
			<td>inputMask</td>
			<td>inputMask</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMaxLength</td>
			<td>inputMaxLength</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputLayout</td>
			<td>layout</td>
			<td>string</td>
			<td>regular | solo | solo-rounded | solo-shaped | filled | filled-rounded | filled-shaped | outlined | outlined-rounded | outlined-shaped</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColor</td>
			<td>background color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorHover</td>
			<td>background color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorSelected</td>
			<td>background color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColor</td>
			<td>border color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorHover</td>
			<td>border color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorSelected</td>
			<td>border color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputTextFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelText</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelColorSelected</td>
			<td>text color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateX</td>
			<td>offset x</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateY</td>
			<td>offset y</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputPrefix</td>
			<td>prepended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputSuffix</td>
			<td>appended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputAppendixFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>showInputMessageAlways</td>
			<td>always show</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputMessage</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showInputCounter</td>
			<td>show counter</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputCounterColor</td>
			<td>font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputCounterFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputCounterFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconShow</td>
			<td>show text delete icon </td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>clearIcon</td>
			<td>text delete icon </td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconSize</td>
			<td>size of text delete icon </td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconColor</td>
			<td>color of text delete icon </td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandIcon</td>
			<td>prefixed icon</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconSize</td>
			<td>size of prefixed icon</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconColor</td>
			<td>color of prefixed icon</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandInnerIcon</td>
			<td>inner prefixed symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconSize</td>
			<td>size of inner prefixed symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconColor</td>
			<td>color of inner prefixed symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>appendIcon</td>
			<td>appended symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>appendIconSize</td>
			<td>size of appended symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>appendIconColor</td>
			<td>color of appended symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>appendOuterIcon</td>
			<td>outer appended symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconSize</td>
			<td>size of outer appended symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconColor</td>
			<td>color of outer appended symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
	</tbody>
</table>
</details>


##### Select

<details>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Description</th>
			<th>Type</th>
			<th>Values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>oid</td>
			<td>Object ID</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputType</td>
			<td>inputType</td>
			<td>string</td>
			<td>text | date | time</td>
		</tr>
		<tr>
			<td>inputAlignment</td>
			<td>text alignment</td>
			<td>string</td>
			<td>left | center | right</td>
		</tr>
		<tr>
			<td>vibrateOnMobilDevices</td>
			<td>vibrate on mobil devices [s]</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputLayout</td>
			<td>layout</td>
			<td>string</td>
			<td>regular | solo | solo-rounded | solo-shaped | filled | filled-rounded | filled-shaped | outlined | outlined-rounded | outlined-shaped</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColor</td>
			<td>background color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorHover</td>
			<td>background color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorSelected</td>
			<td>background color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColor</td>
			<td>border color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorHover</td>
			<td>border color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorSelected</td>
			<td>border color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputTextFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelText</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelColorSelected</td>
			<td>text color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateX</td>
			<td>offset x</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateY</td>
			<td>offset y</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputPrefix</td>
			<td>prepended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputSuffix</td>
			<td>appended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputAppendixFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>showInputMessageAlways</td>
			<td>always show</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputMessage</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showInputCounter</td>
			<td>show counter</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputCounterColor</td>
			<td>font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputCounterFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputCounterFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconShow</td>
			<td>show text delete icon </td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>clearIcon</td>
			<td>text delete icon </td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconSize</td>
			<td>size of text delete icon </td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconColor</td>
			<td>color of text delete icon </td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>collapseIcon</td>
			<td>menu open symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>collapseIconSize</td>
			<td>size of menu open symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>collapseIconColor</td>
			<td>color of menu open symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandIcon</td>
			<td>prefixed icon</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconSize</td>
			<td>size of prefixed icon</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconColor</td>
			<td>color of prefixed icon</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandInnerIcon</td>
			<td>inner prefixed symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconSize</td>
			<td>size of inner prefixed symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconColor</td>
			<td>color of inner prefixed symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>appendOuterIcon</td>
			<td>outer appended symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconSize</td>
			<td>size of outer appended symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconColor</td>
			<td>color of outer appended symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listDataMethod</td>
			<td>input method for the menu data</td>
			<td>string</td>
			<td>inputPerEditor | jsonStringObject | multistatesObject | valueList</td>
		</tr>
		<tr>
			<td>countSelectItems</td>
			<td>Editor: count of menu items</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>jsonStringObject</td>
			<td>JSON string</td>
			<td>string</td>
			<td>bindings not working!</td>
		</tr>
		<tr>
			<td>valueList</td>
			<td>value list</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>valueListLabels</td>
			<td>value list: labels</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>valueListIcons</td>
			<td>value list: images</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listPosition</td>
			<td>position</td>
			<td>string</td>
			<td>auto | top | bottom</td>
		</tr>
		<tr>
			<td>listPositionOffset</td>
			<td>use position offset</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>listItemHeight</td>
			<td>height of menu item</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemBackgroundColor</td>
			<td>background color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemBackgroundHoverColor</td>
			<td>hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemBackgroundSelectedColor</td>
			<td>color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemRippleEffectColor</td>
			<td>effect color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showSelectedIcon</td>
			<td>show icon of selected item</td>
			<td>string</td>
			<td>no | prepend | prepend-inner | append-outer</td>
		</tr>
		<tr>
			<td>listIconSize</td>
			<td>icon size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listIconColor</td>
			<td>icon color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listIconHoverColor</td>
			<td>icon hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listIconSelectedColor</td>
			<td>icon color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemFont</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemFontColor</td>
			<td>font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontHoverColor</td>
			<td>font hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontSelectedColor</td>
			<td>font color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontSize</td>
			<td>second text font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemSubFont</td>
			<td>second text font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemSubFontColor</td>
			<td>second text font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontHoverColor</td>
			<td>hover color of second text</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontSelectedColor</td>
			<td>color of second selected text</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showValue</td>
			<td>show value</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>listItemValueFontSize</td>
			<td>font size of value</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemValueFont</td>
			<td>font of value</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemValueFontColor</td>
			<td>font color of value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemValueFontHoverColor</td>
			<td>hover font color of value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemValueFontSelectedColor</td>
			<td>font color of selected value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>value<b><i>X</b></i></td>
			<td>value of menu item X</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>label<b><i>X</b></i></td>
			<td>label of menu item X</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>subLabel<b><i>X</b></i></td>
			<td>subLabel of menu item X</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listIcon<b><i>X</b></i></td>
			<td>listIcon of menu item X</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>listIconColor<b><i>X</b></i></td>
			<td>listIconColor of menu item X</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
</table>
</details>


##### Autocomplete

<details>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Description</th>
			<th>Type</th>
			<th>Values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>oid</td>
			<td>Object ID</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMode</td>
			<td>inputMode</td>
			<td>string</td>
			<td>write | select</td>
		</tr>
		<tr>
			<td>inputType</td>
			<td>inputType</td>
			<td>string</td>
			<td>text | date | time</td>
		</tr>
		<tr>
			<td>inputAlignment</td>
			<td>text alignment</td>
			<td>string</td>
			<td>left | center | right</td>
		</tr>
		<tr>
			<td>vibrateOnMobilDevices</td>
			<td>vibrate on mobil devices [s]</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputLayout</td>
			<td>layout</td>
			<td>string</td>
			<td>regular | solo | solo-rounded | solo-shaped | filled | filled-rounded | filled-shaped | outlined | outlined-rounded | outlined-shaped</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColor</td>
			<td>background color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorHover</td>
			<td>background color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBackgroundColorSelected</td>
			<td>background color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColor</td>
			<td>border color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorHover</td>
			<td>border color hover</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLayoutBorderColorSelected</td>
			<td>border color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputTextFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTextColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelText</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelColorSelected</td>
			<td>text color selected</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputLabelFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputLabelFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateX</td>
			<td>offset x</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputTranslateY</td>
			<td>offset y</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputPrefix</td>
			<td>prepended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputSuffix</td>
			<td>appended text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputAppendixFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputAppendixFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>showInputMessageAlways</td>
			<td>always show</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputMessage</td>
			<td>text</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputMessageColor</td>
			<td>text color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showInputCounter</td>
			<td>show counter</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>inputCounterColor</td>
			<td>font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>inputCounterFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>inputCounterFontFamily</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconShow</td>
			<td>show text delete icon </td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>clearIcon</td>
			<td>text delete icon </td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconSize</td>
			<td>size of text delete icon </td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>clearIconColor</td>
			<td>color of text delete icon </td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>collapseIcon</td>
			<td>menu open symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>collapseIconSize</td>
			<td>size of menu open symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>collapseIconColor</td>
			<td>color of menu open symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandIcon</td>
			<td>prefixed icon</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconSize</td>
			<td>size of prefixed icon</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandIconColor</td>
			<td>color of prefixed icon</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>prepandInnerIcon</td>
			<td>inner prefixed symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconSize</td>
			<td>size of inner prefixed symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>prepandInnerIconColor</td>
			<td>color of inner prefixed symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>appendOuterIcon</td>
			<td>outer appended symbol</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconSize</td>
			<td>size of outer appended symbol</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>appendOuterIconColor</td>
			<td>color of outer appended symbol</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listDataMethod</td>
			<td>input method for the menu data</td>
			<td>string</td>
			<td>inputPerEditor | jsonStringObject | multistatesObject | valueList</td>
		</tr>
		<tr>
			<td>countSelectItems</td>
			<td>Editor: count of menu items</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>jsonStringObject</td>
			<td>JSON string</td>
			<td>string</td>
			<td>bindings not working!</td>
		</tr>
		<tr>
			<td>valueList</td>
			<td>value list</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>valueListLabels</td>
			<td>value list: labels</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>valueListIcons</td>
			<td>value list: images</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listPosition</td>
			<td>position</td>
			<td>string</td>
			<td>auto | top | bottom</td>
		</tr>
		<tr>
			<td>listPositionOffset</td>
			<td>use position offset</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>listItemHeight</td>
			<td>height of menu item</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemBackgroundColor</td>
			<td>background color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemBackgroundHoverColor</td>
			<td>hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemBackgroundSelectedColor</td>
			<td>color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemRippleEffectColor</td>
			<td>effect color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showSelectedIcon</td>
			<td>show icon of selected item</td>
			<td>string</td>
			<td>no | prepend | prepend-inner | append-outer</td>
		</tr>
		<tr>
			<td>listIconSize</td>
			<td>icon size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listIconColor</td>
			<td>icon color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listIconHoverColor</td>
			<td>icon hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listIconSelectedColor</td>
			<td>icon color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontSize</td>
			<td>font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemFont</td>
			<td>font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemFontColor</td>
			<td>font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontHoverColor</td>
			<td>font hover color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemFontSelectedColor</td>
			<td>font color of selected item</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontSize</td>
			<td>second text font size</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemSubFont</td>
			<td>second text font</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemSubFontColor</td>
			<td>second text font color</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontHoverColor</td>
			<td>hover color of second text</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemSubFontSelectedColor</td>
			<td>color of second selected text</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>showValue</td>
			<td>show value</td>
			<td>boolean</td>
			<td>false | true</td>
		</tr>
		<tr>
			<td>listItemValueFontSize</td>
			<td>font size of value</td>
			<td>number</td>
			<td/>
		</tr>
		<tr>
			<td>listItemValueFont</td>
			<td>font of value</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listItemValueFontColor</td>
			<td>font color of value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemValueFontHoverColor</td>
			<td>hover font color of value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>listItemValueFontSelectedColor</td>
			<td>font color of selected value</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>value0</td>
			<td>value0</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>label0</td>
			<td>label0</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>subLabel0</td>
			<td>subLabel0</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listIcon0</td>
			<td>listIcon0</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>listIconColor0</td>
			<td>listIconColor0</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
		<tr>
			<td>value1</td>
			<td>value1</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>label1</td>
			<td>label1</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>subLabel1</td>
			<td>subLabel1</td>
			<td>string</td>
			<td/>
		</tr>
		<tr>
			<td>listIcon1</td>
			<td>listIcon1</td>
			<td>custom</td>
			<td/>
		</tr>
		<tr>
			<td>listIconColor1</td>
			<td>listIconColor1</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
	</tbody>
</table>
</details>

##### Material Design Icons

<details>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Description</th>
			<th>Type</th>
			<th>Values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mdwIcon</td>
			<td><a href="https://materialdesignicons.com/">materialdesignicon name</a></td>
			<td>string</td>
			<td>home, place, ...</td>
		</tr>
		<tr>
			<td>mdwIconSize</td>
			<td>size of icon</td>
			<td>number</td>
			<td>0, 1, 2, ... </td>
		</tr>
		<tr>
			<td>mdwIconColor</td>
			<td>color of icon</td>
			<td>string</td>
			<td>hex(#44739e), rgb(20, 50, 200), rgba(20, 50, 200, 0.5)</td>
		</tr>
	</tbody>
</table>
</details>

##### Html

<details>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Description</th>
			<th>Type</th>
			<th>Values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>html</td>
			<td>any html element</td>
			<td>string</td>
			<td></td>
		</tr>
		<tr>
			<td>oid</td>
			<td>Object Id to use in html. In html use '[#value]' for the value</td>
			<td>string</td>
			<td></td>
		</tr>
	</tbody>
</table>
</details>

<br>

### Editor Settings

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2><img src="doc/en/media/table_general.png"></td>
            <td>switch</td>
            <td>Datapoint from type string with input data as shown above</td>
        </tr>
        <tr>
            <td>data as JSON</td>
            <td>Optional, input data as shown above if no oid datapoint is set</td>
        </tr>
        <tr>
            <td rowspan=4><img src="doc/en/media/table_column.png"></td>
            <td>colType[x]</td>
            <td>If image is selected, object property must have the path to the image (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">see above</a>)</td>
        </tr>
        <tr>
            <td>prefix[x]</td>
            <td>Prefix for object property, internal object binding (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">see below</a>) and html can be used</td>
        </tr>
        <tr>
            <td>suffix[x]</td>
            <td>Suffix for object property, internal object binding (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">see below</a>) and html can be used</td>
        </tr>
        <tr>
            <td>object name for sorting[x]</td>
            <td>Here you can define an other object property that should be used for sorting.</td>
        </tr>
    </tbody>
</table>

##### internal object binding
prefix & suffix supports table internal object binding -> you can access other properties of object by using
```
#[obj.'propertyName']
```

Example see <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">see above</a>.

Working Widget Example can be found 
* [here](https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)
* [ical Adapter](https://forum.iobroker.net/topic/29658/material-design-widgets-table-widget/2)

## Responsive Layout
There are two widgets - Masonry Views and Grid Views - with which it is possible to create a repsonsive layout (a layout for desktop, tablet and mobile). Both Widgets has multiple `view in widget` integrated.


### Masonry Views

Masonry Views has multiple `view in widget` integrated, that will be ordered automatically depending of the width of the widget. With this widget it is possible to create a responsive layout (one layout for desktop, tablet and mobil).
Masonry views are especially useful if the views included have different heights.


<b>Take a look at the [Material Design Widgets example project](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b> to understand how it works.

![Logo](doc/en/media/masnory.gif)


<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=1><img src="doc/en/media/masonry_resolution_settings.png"></td>
            <td colspan=2>Depending on the width of the widget, the number of columns and the distance between the views can be set. The settings can be set independently for portrait and landscape format.
            To find out the width of the resolution for the different devices, activate the Resolution Assistant under the common settings.</td>
        </tr>
        <tr>
            <td rowspan=2><img src="doc/en/media/masnory_settings_views.png"></td>
            <td>width of view[x]</td>
            <td>Define the width of the view. Allowed values are number, px, % or calc. Examples: <code>100</code>, <code>100px</code>, <code>55%</code>, <code>calc(60% - 12px)</code></td>
        </tr>
        <tr>
            <td>height of view[x]</td>
            <td>Here you can specify the height of the view used. 
                <br><br>If you want the height to adjust variably to the view, then this input must be empty and for the widget with the highest height in the view the position must be set to relative, see screenshot:
                <br><br>
                <img src="doc/en/media/masonry_grid_position_settings.png">
            </td>
        </tr>
    </tbody>
</table>

### Grid Views

Grid Views has multiple `view in widget` integrated, that will be ordered automatically depending of the width of the widget. With this widget it is possible to create a responsive layout (one layout for desktop, tablet and mobil).
Grid views are especially useful if the views included have the same heights.

<b>The Grid View widget has 12 columns in total. If you want a view to have a width of 4 columns, you have to set column span to 4 in the corresponding view[x]</b>

<b>Take a look at the [Material Design Widgets example project](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b> to understand how it works.

![Logo](doc/en/media/grid.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=1><img src="doc/en/media/grid_settings_resolution.png"></td>
            <td colspan=2>Depending on the width of the widget, defined from which width of the widget the rules for column span of the individual views[x] can be applied and the distance between the views. The settings can be set independently for portrait and landscape format.
            To find out the width of the resolution for the different devices, activate the Resolution Assistant under the common settings.</td>
        </tr>
        <tr>
            <td rowspan=2><img src="doc/en/media/grid_settings_view.png"></td>
            <td colspan=2>Define the column span of the view depending of the current width resolution rule.<br>You can also specify here whether a view should only be displayed at a resolution higher or lower than a defined value or whether it should be visible via a object id.</td>
        </tr>
        <tr>
            <td>height of view[x]</td>
            <td>Here you can specify the height of the view used. 
                <br><br>If you want the height to adjust variably to the view, then this input must be empty and for the widget with the highest height in the view the position must be set to relative, see screenshot:
                <br><br>
                <img src="doc/en/media/masonry_grid_position_settings.png">
            </td>
    </tbody>
</table>

## Alerts
Alerts widget can be used e.g. to display messages in the VIS, like it works with the pushover adapter, but directly in the VIS.

![Logo](doc/en/media/alerts.gif)

The Alerts widget requires a JSON string as object, which must be structured as follows:
```
[
       {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "darkred",
		"icon": "message-alert-outline",
		"iconColor": "darkred",
		"fontColor": "blue"
	}, {
		"text": "we have a new message",
		"backgroundColor": "#e6b0aa",
		"borderColor": "green",
		"icon": "/vis/img/bulb_on.png",
		"iconColor": "green",
		"fontColor": "gold"
	}, {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "gold",
		"icon": "alert-outline",
		"iconColor": "gold",
		"fontColor": ""
	}
]
```

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=3><img src="doc/en/media/alerts_settings.png"></td>
            <td>number of columns</td>
            <td>define number of columns</td>
        </tr>
        <tr>
            <td>Object ID</td>
            <td>Object must be a json string, which must be structured as described above</td>
        </tr>
        <tr>
            <td>max. Alerts</td>
            <td>max number of Alerts that should be shown.</td>
        </tr>
    </tbody>
</table>

With the following script you can send easy messages to datapoint that is used by the Alerts Widget.
The script must put into global scripts. Then it is possible to send message with the following command

`materialDesignWidgets.sendTo('datapoint_id', 'message', 'color');`

```


var materialDesignWidgets = {};
materialDesignWidgets.sendTo = function (id, text, backgroundColor = '', borderColor = '', icon = '', iconColor = '', fontColor = '') {
    let json = getState(id).val;
 
    if (json) {
        try {

            json = JSON.parse(json);

        } catch (e) {
            json = [];
            console.warn('Wert ist kein JSON string! Wert wird ersetzt!');
        }
    } else {
        json = [];
    }

    json.push(
        {
            text: text,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            icon: icon,
            iconColor: iconColor,
            fontColor: fontColor
        }
    )
    setState(id, JSON.stringify(json), true);
}
```

## Calendar

![Logo](doc/en/media/calendar.gif)

The Calendar widget requires a JSON string as object, which must be structured as follows:
```
[
	{
		"name": "Event",
		"color": "#e74c3c",
		"colorText": "#FFFFFF",
		"start": "2020-01-24",
		"end": "2020-01-26"
	},
	{
		"name": "Meeting",
		"color": "#717d7e",
		"colorText": "#FFFFFF",
		"start": "2020-03-23 16:00",
		"end": "2020-03-24 17:15"
	}
]
```
Only hex and rgba can be used as colors!

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2><img src="doc/en/media/calendar_layout.png"></td>
            <td>days of the week to be shown</td>
            <td>Specifies which days of the week to display. To display Monday through Friday only, a value of <code>1, 2, 3, 4, 5</code> can be used. To display a week starting on Monday a value of <code>1, 2, 3, 4, 5, 6, 0</code> can be used.</td>
        </tr>
        <tr>
            <td>Object ID</td>
            <td>Object must be a json string, which must be structured as described above</td>
        </tr>
        <tr>
            <td rowspan=2><img src="doc/en/media/calendar_timeaxis.png"></td>
            <td>start hour</td>
            <td>The hour from which appointments should be displayed in the week and day view.</td>
        </tr>
        <tr>
            <td>end hour</td>
            <td>The hour until which appointments should be displayed in the week and day view</td>
        </tr>        
    </tbody>
</table>

If you want to use the widget with the [ical adapter](https://github.com/iobroker-community-adapters/ioBroker.ical), you can use the following script to convert the ical object to work with the widget.

```
// momentjs is required as dependecies in javascript adapter
const moment = require("moment");

var instances = $(`[id=ical.*.data.table]`);
instances.on(ical2CalendarWidget);

// remove this, if you know to use your own datapoint
let datapointId = 'materialdesignwidgets.calendar.ical2calendar'
createState(datapointId, "[]", {
  read: true, 
  write: false, 
  desc: "JSON String for Calendar Widget", 
  type: "string", 
  def: "[]"
});

function ical2CalendarWidget() {
    try {
        let calList = [];

        for (var inst = 0; inst <= instances.length - 1; inst++) {
            let icalObj = getState(instances[inst]).val;

            if (icalObj) {
                for (var i = 0; i <= icalObj.length - 1; i++) {
                    let item = icalObj[i];

                    // extract calendar color
                    let calendarName = item._class.split(' ')[0].replace('ical_', '');

                    let startTime = moment(item._date);
                    let endTime = moment(item._end);
                    
                    let start = startTime.format("YYYY-MM-DD HH:mm");
                    let end = endTime.format("YYYY-MM-DD HH:mm");

                    if (startTime.format('HH:mm') === '00:00' && endTime.format('HH:mm') === '00:00') {
                        // is full-day event
                        if (endTime.diff(startTime, 'hours') === 24) {
                            // full-day event, one day
                            start = startTime.format("YYYY-MM-DD");
                            end = startTime.format("YYYY-MM-DD");
                        } else {
                            // full-day event, multiple days
                            start = startTime.format("YYYY-MM-DD");
                            end = endTime.format("YYYY-MM-DD");
                        }
                    }

                    // create object for calendar widget
                    calList.push({
                        name: item.event,
                        color: getMyCalendarColor(calendarName),
                        colorText: getMyCalendarTextColor(calendarName),
                        start: start,
                        end: end
                    })
                }

                function getMyCalendarColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FF0000';
                    } else if (calendarName === 'calendar2') {
                        return '#44739e'
                    } else if (calendarName === 'calendar3') {
                        return '#32a852'
                    }
                }

                function getMyCalendarTextColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FFFFFF';
                    } else if (calendarName === 'calendar2') {
                        return '#FFFFFF'
                    } else if (calendarName === 'calendar3') {
                        return '#FFFFFF'
                    }
                }
            }

            // Enter the destination data point that is to be used as object ID in the widget                
            setState(datapointId, JSON.stringify(calList), true);
        }
    } catch (e) {
        console.error(`ical2MaterialDesignCalendarWidget: message: ${e.message}, stack: ${e.stack}`);
    }
}

ical2CalendarWidget();
```


## HTML Elements

Create an html element from the supported Material Design widgets to use it in any other widget that supports html.
Just style your Material Design widget, press the `generate Html Element`, copy the data and paste it to any widget that supports html tags.
Or use it in scripts to generate dynamically Widgets.

![Logo](doc/en/media/html-elements.gif)

More information about the supported properties can be found at the individual widgets:
* [Buttons](#buttons)
* [Buttons Vertical](#buttons-vertical)
* [Buttons Icon](#buttons-icon)
* 
* [Slider](#slider)
*
* [Progress](#progress)
* [Progress Circular](#progress-circular)
*
* [Checkbox](#checkbox)
* [Switch](#switch)

# used libraries
The adapter uses the following libraries:
* [Google material components for the web](https://github.com/material-components/material-components-web)
* [Vuetify](https://github.com/vuetifyjs/vuetify)
* [chartjs](https://www.chartjs.org/)
* [round-slider from thomasloven](https://github.com/thomasloven/round-slider)
* [Material Design Icons](https://materialdesignicons.com/)


# Changelog

<!--
    Placeholder for the next version (at the beginning of the line):    
	### __WORK IN PROGRESS__
-->

<!-- omit in toc -->
### __WORK IN PROGRESS__
* (Scrounger) icon list: option for status bar text added
* (Scrounger) icon list: status bar position bug fix
* (Scrounger) progress circular: auto size option added
* (Scrounger) VIS editor: html previews bug fixes

<!-- omit in toc -->
### 0.4.2 (2020-12-29)
* (Scrounger) vis-google-fonts dependency removed

<!-- omit in toc -->
### 0.4.1 (2020-12-27)
* (Scrounger): Adapter settings: theme editor implementation completed
* (Scrounger): Progress Widget: condition binding bug fix
* (Scrounger): minimal VIS adapter dependency set to v1.3.6
* (Scrounger): VIS editor: image dialog bug fix
* (Scrounger): Color themes for buttons and dialogs widgets implemented
* (Scrounger): Calendar Widget: week number bug fix
* (Scrougner): icon list: scrollbar bug fix
* (Scrounger): bug fixes

<!-- omit in toc -->
### 0.4.0-beta (2020-12-09)
* (Scrounger): Line History Chart Widget: Breaking Changes !!! aggregate (display) method for every dataset configurable, [see documentation for detailed infos](#line-history-chart)!
* (Scrounger): TopAppBar Widget: Breaking Changes !!! Submenus must now be created using JSON string, [see documentation for detailed infos](#since-version-040)!
* (Scrounger): Adapter settings wiht theme editor added
* (Scrounger): bug fix for compatibility issues with other widget adapters
* (Scrounger): Chechbox Widget: option for border and hover color added
* (Scrounger): Chechbox Widget: ripple effect bug fix
* (Scrounger): Buttons Vertical: text alignment option added
* (Scrounger): added URL support as source for symbols / images
* (Scrounger): HTML Card Widget: option to hide title, subtitle and text added
* (Scrounger): HTML Card Widget: background image refresh options by datapoint added
* (Scrounger): Fixed some errors reported via Sentry
* (Scrounger): Select & Autocomplete Widget: overriding icon color bug fix
* (Scrounger): Select & Autocomplete Widget: overriding icon bug fix
* (Scrounger): Select & Autocomplete Widget: colors bug fixes
* (Scrounger): Select & Autocomplete Widget: option to override the icon color of textfield for selected menu icon
* (Scrounger): Select & Autocomplete Widget: text alignment option added
* (Scrounger): Input Widget: text alignment option added
* (Scrounger): JSON Chart Widget: option to force x-axis time unit added
* (Scrounger): JSON Chart Widget: gradient colors for multipe dataset bug fixes
* (Scrounger): JSON Chart: default tooltip title added
* (Scrounger): JSON Chart: option to use Today / Yesterday for x-axis labeling added
* (Scrounger): JSON Chart: option to use Today / Yesterday for tooltip added
* (Scrounger): JSON Chart: option to change x-axis label distance added
* (Scrounger): Line History Chart: option for point color added
* (Scrounger): Line History Chart: option to use Today / Yesterday for x-axis labeling added
* (Scrounger): Line History Chart: option to use Today / Yesterday for tooltip added
* (Scrounger): Line History Chart: tooption change x-axis label distance added
* (Scrounger): Charts Widget: x-Axis time axis bug fixes
* (Scrounger): Calendar Widget: option to show calendar week numbers in month view added
* (Scrounger): Calendar Widget: option for custom date format added
* (Scrounger): IconList Widget: bug fix for performance issue
* (Scrounger): TopAppBar Widget: options for user groups added
* (Scrounger): Table Widget: html element added
* (Scrounger): Masonry & Grid View Widget: default width for handy portrait and landscape view changed
* (Scrounger): Progress Widget: option for indeterminate style added
* (Scrounger): dependencies updated
* (Scrounger): bug fixes

<!-- omit in toc -->
### 0.3.19 (2020-07-18)
* (Scrounger): Icon Button Widget: background color option for lock icon added
* (Scrounger): possibility to deactivate sentry implemented -> see documentation
* (Scrounger): Fixed some bugs reported via Sentry
* (Scrounger): prevent set value in vis editor
* (Scrounger): Grid & Mansonry Widget: visibilty by resoltuin bug fix
* (Scrounger): IconList Widget: Card Background for whole icon list added
* (Scrounger): Table Wigdet: button link widget added
* (Scrounger): Table Wigdet: material design icon widget added
* (Scrounger): Table Wigdet: alignment option for controls added
* (Scrounger): materialdesignicons library updated to v5.3.45
* (Scrounger): Round Slider lib updated to v0.5.0
* (Scrounger): Round Slider Widget: readonly option added
* (Scrounger): Table Widget: background color hover option added
* (Scrounger): bug fixes


# License

MIT License

Copyright (c) 2021 Scrounger <scrounger@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.