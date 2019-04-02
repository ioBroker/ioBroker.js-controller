---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/basic.md
title: basic
hash: gB8ktCn/gT568jcCHvrOANTjVM37RqxBs3Q5NUc0SIg=
---
# Basic
| Widget | Image | description

| [HTML](#Html-frame) | ![001](../../de/viz/media/widget_images/basic/Prev_HTML.png) | This widget represents arbitrary HTML code. |
| [Svg shape](#svg-shape) | ![002](../../de/viz/media/widget_images/basic/Prev_Shape.png) | Represents a form |
| [iFrame](#iframe) | ![003](../../de/viz/media/widget_images/basic/Prev_iFrame.png) | This widget includes an iframe |
| [image](#image) | ![004](../../de/viz/media/widget_images/basic/Prev_Image.png) | This widget displays a picture. |
| [link](#link) | ![005](../../de/viz/media/widget_images/basic/Prev_tplLink.png) | This widget corresponds to the widget "static - HTML" but is also a clickable link on its entire surface. Can be used for navigation between views or for external links. |
| [Border](#border) | ![006](../../de/viz/media/widget_images/basic/Prev_tplFrame.png) ||
| [iFrame8](#iframe8) | ![007](../../de/viz/media/widget_images/basic/Prev_StatefulIFrame8.png) ||
| [View in widget](#view-in-widget) | ![008](../../de/viz/media/widget_images/basic/Prev_ContainerView.png) | This widget can display views within views. for a navigation: You build a view with navigation elements and then integrate them in any number of other views. |
| [view in widget 8](#view-in-widget-8)] | ![009](../../de/viz/media/widget_images/basic/Prev_StatefulContainerView8.png) | Displays one of 8 views depending on a state. |
| `Image 8` | ![010](../../de/viz/media/widget_images/basic/Prev_StatefulImage.png) | Displays one of 8 pictures depending on a condition. |
| `HTML navigation` | ![011](../../de/viz/media/widget_images/basic/Prev_HTMLnavigation.png) | This widget serves to build a navigation between the views. Corresponds to the widget "static - link", but is only usable for the navigation between the views and additionally offers the possibility to use animated effects when changing the views. |
| `filter - dropdown` | ![012](../../de/viz/media/widget_images/basic/Prev_FilterDropdown.png) ||
| `Number` | ![013](../../de/viz/media/widget_images/basic/Prev_ValueFloat.png) | This widget represents a numeric value |
| `String ` | ![014](../../de/viz/media/widget_images/basic/Prev_ValueString.png) | This widget represents a data point of type String. |
| `String (unescaped)` | ![015](../../de/viz/media/widget_images/basic/Prev_ValueStringRaw.png) | This widget represents a data point of the type string. In contrast to the widget "hm_val - String" no special characters are "escaped" - i. the variable may also contain HTML code and this will be displayed. |
| `String img src` | ![016](../../de/viz/media/widget_images/basic/Prev_ValueStringImg.png) | This widget can be assigned a variable of the type string, a URL contained there is then displayed as a picture |
| `Timestamp` | ![017](../../de/viz/media/widget_images/basic/Prev_ValueTimestamp.png) ||
| `Last change Timestamp` | ![018](../../de/viz/media/widget_images/basic/Prev_ValueLastchange.png) ||
| `ValueList Text` | ![019](../../de/viz/media/widget_images/basic/Prev_ValueList.png) | This widget represents a variable of the type list of values. |
| `ValueList HTML` | ![020](../../de/viz/media/widget_images/basic/Prev_ValueListHtml.png) | This widget represents a variable of the type value list. Corresponds to the widget "hm_val - ValueList Text, but it is not" escaped ", that is, HTML code can be entered in valuelist. |
| `ValueList HTML Style` | ![021](../../de/viz/media/widget_images/basic/Prev_ValueListHtml8.png) | This widget represents a variable of the type list of values. Corresponds to the widm "hm_val - ValueList HTML, but offers the possibility to use 8 different CSS-values for 8 different values (0-7). |
| `Bool HTML` | ![022](../../de/viz/media/widget_images/basic/Prev_ValueBool.png) | This widget represents Bool values. |
| `AckFlag HTML` | ![023](../../de/viz/media/widget_images/basic/Prev_AckBool.png) ||
| `Bool Checkbox` | ![024](../../de/viz/media/widget_images/basic/Prev_ValueBoolCheckbox.png) | This widget displays Bool values as a simple checkbox and also allows you to toggle the value. |
| `Bool Select` | ![025](../../de/viz/media/widget_images/basic/Prev_ValueBoolSelect.png) | This widget displays Bool values as a dropdown and also allows you to toggle the value. |
| `Bool HTML` | ![026](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrl.png) | This widget displays bool values and also allows you to toggle the value to click within the widget area. |
| `Bool SVG` | ![027](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrlSvg.png) | This widget sets a value when clicked within the widget area. |
| `HTML State` | ![028](../../de/viz/media/widget_images/basic/Prev_BasicState.png) | This widget disappears if the value of the associated data point is 0 or false. Skilled, e.g. for displaying service messages |
| `Red Number` | ![029](../../de/viz/media/widget_images/basic/Prev_RedNumber.png) | Display a numerical value in the style of the iOS notification icons. Disappears at the value 0. |
| `Bulb on/off` | ![030](../../de/viz/media/widget_images/basic/Prev_BulbOnOffCtrl.png) | This Widget displays a value as a switched off or glowing light bulb on a black background. Can be used for Bool and Float values (dimmer). |
| `Bar` | ![031](../../de/viz/media/widget_images/basic/Prev_ValueFloatBar.png) | This widget displays a value of 0-100 as a horizontal bar. |
| `Note` | ![032](../../de/viz/media/widget_images/basic/Prev_Note.png) ||
| `json Table` | ![033](../../de/viz/media/widget_images/basic/Prev_TableBody.png) ||
| `HTML logout` | ![034](../../de/viz/media/widget_images/basic/Prev_HtmlLogout.png) ||
| `Gesture indicator` | ![035](../../de/viz/media/widget_images/basic/Prev_ValueGesture.png) ||
| `Speech to text` | ![036](../../de/viz/media/widget_images/basic/Prev_Speech2Text.png) ||
| `Full Screen` | ![037](../../de/viz/media/widget_images/basic/Prev_FullScreen.png) ||
| `Screen Resolution` | ![038](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png) ||
| `Screen Resolution` | ! [038] (media / widget_images / basic / Prev_ScreenResolution.png) ||

### Html frame
This widget represents arbitrary HTML code. It is also possible to use Javascript within the widget.

| Attribute | Description |
|-----|----|
| `ObjectId` | Id of an object to be displayed that contains HTML |
| Prefix html | HTML code to be displayed in front of the object |
| Append html | HTML code to display after the object |

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/html.png)

### SVG Shape
This widget simply represents a geometric shape, with some shapes predefined.

| Attribute | Description |
|-----|----|
| Type | geometric shape |
| Line color | Color of the shape border |
| Fill color | Color of the fill |
| Linewidth ||
| Turn | Angle of rotation from initial position in degrees |
| Width scale | Scales the width between 0 and 100% |
| Height scale | Scales the height between 0 and 100% |

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/svg.gif)

### Iframe
Represents an iframe

| Attribute | Description |
|-----|----|
| Source | Path to Source (website, image); this can be defined locally or via URL |
| No sandbox |: construction: |
| construction: | update time |
| Update on waking up |: construction: |
| Update at view change |: construction: |
| Do not add to URL |: construction: |
| Scroll X |: construction: |
| Scroll Y |: construction: |
| No frame |: construction: |

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/iframe.gif)

### Image
This widget represents a picture.

| Attribute | Description |
|-----|----|
| Source | path to the source in the local file system |
| Stretch | Fit image to frame dimensions |
| construction: | update time |
| Update on waking up |: construction: |
| Update at view change |: construction: |
| Do not add to URL |: construction: |
| Allow useer interactions |: construction: |

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/image.gif)

### Link
This Widget corresponds to the widget "HTML Frame", but is also a clickable link on its entire surface. Can be used for navigation between views or for external links.

| Attribute | Description |
|-----|----|

| `html` | self-explanatory;) ... insert here the HTML code for the formatted representation of text.
| `link` | The link URL. To use a link to another view, simply enter the view name preceded by the hash symbol (#) | `target` | The goal of the link. Leave empty to stay in the same browser window; would like to open a new window _blank. Other options: _self (same tab), _parent (), _top ()

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/link.gif)

### Border
This widget simply represents a frame - no further function, only text and color. This can be used to group widgets.

| Attribute | Description |
|-----|----|

| Title | Self explanatory | upper label font | font of the title | Upper label color | Title color | Title background | Background color of title text | Title Up Distance | Distance of title from top edge | Title-Left-Distance | Distance of title from left margin | Head height | Height of a beam from the top edge | Head color | Color of the bar

** Example: ** ![](../../de/viz/media/widget_images/basic/Explanation/border.gif)

### View in widget 8
Displays one of 8 views depending on a state.

| Attribute | Description |
|-----|----|

| `persistent` | Views that were once rendered are no longer removed from the DOM

### IFrame 8
Displays one of 8 iframes depending on a state.

### HTML navigation
This widget is used to build a navigation between the views. Corresponds to the widget "static - link", but is only usable for the navigation between the views and additionally offers the possibility to use animated effects when changing the views.

| Attribute | Description |
|-----|----|

| `html` | Self-explanatory;) ... insert the HTML code here | `nav_view` | Here the name of the view to be navigated to must be entered | `hide_effect` | Here the name of a jQueryUI effect can be entered, which is used when leaving the view. Available effects are: Blind, Bounce, Clip, Drop, Explode, Fade, Fold, Highlight, Puff, Pulsate, Scale, Shake, Size, Slide and Transfer.
| `hide_duration` | Duration of the effect in ms | `show_effect` | see above, the same - but this time for the new view | `show_duration` | See above, time in ms for showing the new view

### Filter - dropdown
### Number
This widget represents a numeric value (usable for both integer and float)

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed before the numeric value | `html_append` | Text or HTML code displayed behind the numeric value | `digits` | Number of displayed decimal places | `factor` | factor with which the numerical value is multiplied

### String
This widget represents a data point of the string type.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed before the string.
| `html_append` | Text or HTML code displayed behind the string.

### String (unescaped)
This Widget represents a data point of the type string. In contrast to the widget "hm_val - String" no special characters are "escaped" - i. the variable may also contain HTML code and this will then be displayed.

| Attribute | Description |
|-----|----|

| html_prepend | Text or HTML code that appears before the string.
| html_append | Text or HTML code displayed after the string.

### String img src
This widget can be assigned a variable of type string, a URL contained there is then displayed as a picture.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.

### Last change timestamp
Displays the last timestamp of the connected state.

### ValueList text
This widget represents a variable of the type list of values.

| Attribute | Description |
|-----|----|

| `valuelist` | A semicolon-separated list of texts for the respective values.
| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.

### ValueList HTML
This widget represents a variable of the type list of values. Corresponds to the "hm_val - ValueList" widget, but it is not "escaped", so HTML code can be entered in valuelist.

| Attribute | Description |
|-----|----|

| `valuelist` | A semicolon-separated list of HTML code for the respective values.
| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.

### ValueList HTML 8
This widget represents a value list variable. Corresponds to the ValueList HTML widget, but offers the ability to use 8 different CSS values for 8 different values (0-7).

| Attribute | Description |
|-----|----|

| `html_append` | Text or HTML code displayed behind the image |

| `html_append` | Text or HTML code displayed behind the image |
| value0 to value7 | Text or HTML code for the values 0 to 7 | style0 to style7 | CSS values for values 0 to 7 |

### Bool HTML
This widget represents bool values.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.
| `html_true` | Text or HTML code that is displayed in the true case.
| `html_false` | Text or HTML code that is displayed in the case of false.

### Bool Checkbox
This widget displays bool values as a simple checkbox and also allows you to toggle the value.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed before the checkbox.
| `html_append` | Text or HTML code displayed behind the checkbox.

### Bool Select
This widget displays bool values as a drop-down and also allows you to toggle the value.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.
| `text_true` | Text for the true case | `text_false` | Text for the false case

### Bool HTML
This widget represents Boolean values and also allows you to toggle the value to click within the widget area.

| Attribute | Description |
|-----|----|

| `html_prepend` | Text or HTML code displayed in front of the image.
| `html_append` | Text or HTML code displayed behind the image.
| `text_true` | Text for the true case | `text_false` | Text for the false case

### Bool HTML
### Bool SVG
### HTML State
This widget sets a value when clicked within the widget area.

| Attribute | Description |
|-----|----|

| `html` | Text or HTML code displayed | `value` | Value to be set

### Hide on 0 / false
This widget disappears if the value of the associated data point is 0 or false. Skilled, e.g. for the display of service messages

### Red Number
Display a numeric value in the style of the iOS notification icons. Disappears at value 0.

### Bulb on / off
This widget displays a value as an off or glowing light bulb on a black background. Can be used for bool and float (dimmer) values.

### Bulb on / off
This widget displays a value as an off or glowing light bulb on a black background. Clicking on the widget will toggle the value.

### Twist grip
This widget represents a rotary handle sensor with the original Homematic icons.

### TFK
This widget represents a door / window contact with the original Homematic icons.

### Bar Horizontal
This widget represents a value of 0-100 as a horizontal bar.

| Attribute | Description |
|-----|----|

| `factor` | factor with which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
| `color` | CSS property background-color of the bar | `border` | CSS property border of the bar | `shadow` | CSS property box-shadow of the bar | `reverse` | If true is entered, the bar is displayed from right to left instead of from left to right.

### Bar Vertical
Corresponds to the widget "hm_val - Bar Horizontal, but vertical instead of horiziontal.

| Attribute | Description |
|-----|----|

| `factor` | factor with which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
| `color` | CSS property background-color of the bar | `border` | CSS property border of the bar | `shadow` | CSS property box-shadow of the bar | `reverse` | If true is entered, the bar will be displayed from bottom to top instead of top to bottom