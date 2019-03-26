---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/basic.md
title: basic
hash: XCWXJ0eZW+O2I60K2NU5XF58R2CdhtU2NY1S4AQfMY8=
---
# Basic
Widget | Image | Description --------------------- | ------- | ------------- |
[HTML](#Html-frame) | ! [001] | This widget represents arbitrary HTML code.
[Svg shape](#svg-shape) | ! [002] | Represents a form [iFrame](#iframe) | ! [003] | This widget includes an iFrame [image](#image) | ! [004] | This widget represents an image.
[link](#link) | ! [005] | This Widget corresponds to the widget "static - HTML" but is also a clickable link on its entire surface. Can be used for navigation between views or for external links. |
[Border](#border) | ! [006] |
[iFrame8](#iframe8) | ! [007] |
[View in widget](#view-in-widget) | ! [008] | This widget can represent views within views. for a navigation: You build a view with navigation elements and then integrate them in any number of other views. |
[view in widget 8](#view-in-widget-8)] | ! [009] | Displays one of 8 views depending on a state. |
Image 8 | ! [010] | Displays one of 8 pictures depending on a state. |||||
HTML navigation | ! [011] | This widget serves to build a navigation between the views. Corresponds to the widget "static - link", but is only usable for the navigation between the views and additionally offers the possibility to use animated effects when changing the views. |||||
filter - dropdown | ! [012] ||||||
Number | ! [013] | This widget represents a numeric value |||||
String | ! [014] | This widget represents a data point of type String. |||||
String (unescaped) | ! [015] | This widget represents a data point of the string type. In contrast to the "hm_val - String" widget, no special characters are "escaped" - i. the variable may also contain HTML code and this will be displayed. |||||
String img src | ! [016] | This widget can be assigned a variable of type string, a URL contained there is then displayed as a picture |||||
Timestamp | ! [017] ||||||
Last change Timestamp | ! [018] ||||||
ValueList Text | ! [019] | This widget represents a variable of the type list of values. |||||
ValueList HTML | ! [020] | This widget represents a variable of the type value list. Corresponds to the widget "hm_val - ValueList Text, but it is not" escaped ", that is, HTML code can be entered in valuelist. |||||
ValueList HTML Style | ! [021] | This widget represents a variable of the type list of values. Corresponds to the widget "hm_val - ValueList HTML, but offers the possibility to use 8 different CSS-values for 8 different values (0-7). |||| |
Bool HTML | ! [022] | This widget represents bool values. |||||
AckFlag HTML | ! [023] ||||||
Bool Checkbox | ! [024] | This widget displays bool values as a simple checkbox and also allows you to toggle the value. |||||
Bool Select | ! [025] | This widget displays bool values as a dropdown and also allows you to toggle the value. |||||
Bool HTML | ! [026] | This widget displays Boolean values and also allows you to toggle the value to click within the widget area. |||||
Bool SVG | ! [027] | This widget sets a value when clicked within the widget area. |||||
HTML State | ! [028] | This widget disappears if the value of the associated data point is 0 or false. Skilled, e.g. for the display of service messages |||||
Red Number | ! [029] | Display a numerical value in the style of the iOS notification icons. Disappears at the value 0. |||||
Bulb on / off | ! [030] | This widget displays a value as an off or glowing light bulb on a black background. Can be used for bool and float (dimmer) values. |||||
Bar | ! [031] | This widget represents a value of 0-100 as a horizontal bar. |||||
Note | ! [032] ||||||
json table | ! [033] ||||||
HTML logout | ! [034] ||||||
Gestures indicator | ! [035] ||||||
Speech to text | ! [036] ||||||
Full Screen | ! [037] ||||||
Screen Resolution | ! [038] ||||||

### Html frame
This widget represents arbitrary HTML code. It is also possible to use Javascript within the widget.

Attribute | Description |
---- | ---- |
ObjectId | Id of an object to be displayed that contains HTML |
Prefix html | HTML code to be displayed in front of the object |
Append html | HTML code to display after the object |

** Example: **! [039]

### SVG Shape
This widget simply represents a geometric shape, with some shapes predefined.

Attribute | Description |
---- | ---- |
Type | geometric shape |
Line color | Color of the shape border |
Fill color | Color of the fill |
Linewidth ||
Turn | Angle of rotation from initial position in degrees |
Width scale | Scales the width between 0 and 100% |
Height scale | Scales the height between 0 and 100% |

** Example: **! [040]

### Iframe
Represents an iframe

Attribute | Description |
---- | ---- |
Source | Path to Source (website, image); this can be defined locally or via URL |
No sandbox |: construction: |
construction: | update time |
Update on waking up |: construction: |
Update at view change |: construction: |
Do not add to URL |: construction: |
Scroll X |: construction: |
Scroll Y |: construction: |
No frame |: construction: |

** Example: **! [041]

### Image
This widget represents a picture.

Attribute | Description |
---- | ---- |
Source | path to the source in the local file system |
Stretch | Fit image to frame dimensions |
construction: | update time |
Update on waking up |: construction: |
Update at view change |: construction: |
Do not add to URL |: construction: |
Allow useer interactions |: construction: |

** Example: **! [042]

### Link
This Widget corresponds to the widget "HTML Frame", but is also a clickable link on its entire surface. Can be used for navigation between views or for external links.

Attribute | Description |
---- | ---- |
html | self-explanatory;) ... insert here the HTML code for the formatted representation of text.
link | The link URL. To use a link to another view, simply enter the view name preceded by a hash symbol (#) target | The target of the link. Leave empty to stay in the same browser window; would like to open a new window _blank. Other options: _self (same tab), _parent (), _top ()

** Example: **! [043]

### Border
This widget simply represents a frame - no further function, only text and color. This can be used to group widgets.

Attribute | Description |
---- | ---- |
Title | Self-explanatory upper caption font | Title font Upper caption color | Caption title Title background | Title caption title-top title | Heading distance from the top Title-to-track spacing | Heading distance from left margin Head height | Height of a bar from top margin on head color | color of bar

** Example: **! [044]

### View in widget 8
Displays one of 8 views depending on a state.

Attribute | Description |
---- | ---- |
Persistent | Views that were rendered once no longer remove from the DOM

### IFrame 8
Displays one of 8 iframes depending on a state.

### HTML navigation
This widget is used to build a navigation between the views. Corresponds to the widget "static - link", but is only usable for the navigation between the views and additionally offers the possibility to use animated effects when changing the views.

Attribute | Description |
---- | ---- |
html | Self-explanatory;) ... insert the HTML code here nav_view | Here you have to enter the name of the view you want to navigate to hide_effect | Here you can enter the name of a jQueryUI effect, which will be used when leaving the view. Available effects are: Blind, Bounce, Clip, Drop, Explode, Fade, Fold, Highlight, Puff, Pulsate, Scale, Shake, Size, Slide and Transfer.
hide_duration | Duration of the effect in ms show_effect | see above, the same - but this time for showing the new view show_duration | See above, time in ms for showing the new view

### Filter - dropdown
### Number
This widget represents a numeric value (usable for both integer and float)

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed before the numeric value html_append | Text or HTML code displayed behind the numeric digits | Number of decimal places factor | Factor used to multiply the numerical value

### String
This widget represents a data point of the string type.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code that appears before the string.
html_append | Text or HTML code displayed after the string.

### String (unescaped)
This Widget represents a data point of the type string. In contrast to the widget "hm_val - String" no special characters are "escaped" - i. the variable may also contain HTML code and this will then be displayed.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code that appears before the string.
html_append | Text or HTML code displayed after the string.

### String img src
This widget can be assigned a variable of type string, a URL contained there is then displayed as a picture.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.

### Last change timestamp
Displays the last timestamp of the connected state.

### ValueList text
This widget represents a variable of the type list of values.

Attribute | Description |
---- | ---- |
valuelist | A semicolon-delimited list of text for each value.
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.

### ValueList HTML
This widget represents a variable of the type list of values. Corresponds to the "hm_val - ValueList" widget, but it is not "escaped", so HTML code can be entered in valuelist.

Attribute | Description |
---- | ---- |
valuelist | A semicolon-delimited list of HTML code for each value.
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.

### ValueList HTML 8
This widget represents a value list variable. Corresponds to the ValueList HTML widget, but offers the ability to use 8 different CSS values for 8 different values (0-7).

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image |
value0 to value7 | Text or HTML code for the values 0 to 7 style0 to style7 | CSS values for the values 0 to 7

### Bool HTML
This widget represents bool values.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.
html_true | text or html that will be displayed in true case.
html_false | text or html-code that is displayed in the case of false.

### Bool Checkbox
This widget displays bool values as a simple checkbox and also allows you to toggle the value.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed before the checkbox.
html_append | Text or HTML code displayed behind the checkbox.

### Bool Select
This widget displays bool values as a drop-down and also allows you to toggle the value.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.
text_true | text for the true case text_false | text for the false case

### Bool HTML
This widget represents Boolean values and also allows you to toggle the value of clicking within the widget area.

Attribute | Description |
---- | ---- |
html_prepend | Text or HTML code displayed in front of the image.
html_append | Text or HTML code displayed behind the image.
text_true | text for the true case text_false | text for the false case

### Bool HTML
### Bool SVG
### HTML State
This widget sets a value when clicked within the widget area.

Attribute | Description |
---- | ---- |
html | text or html that displays value | value to be set

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

Attribute | Description |
---- | ---- |
factor | factor with which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
color | Bold CSS property background-color | Border CSS property | Bold CSS property | box-shadow | reverse bar property | If true, the bar is displayed from right to left instead of left to right.

### Bar Vertical
Corresponds to the widget "hm_val - Bar Horizontal, but vertical instead of horiziontal.

Attribute | Description |
---- | ---- |
factor | factor with which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
color | bar background CSS property background-color | bar's CSS property | shadow bar's CSS property box-shadow | If true, the bar is displayed from bottom to top instead of top to bottom

[001]: ../media/vis/widget_images/basic/Prev_HTML.png "Html" [002]: ../media/vis/widget_images/basic/Prev_Shape.png [003]: ../media/vis/ widget_images / basic / Prev_iFrame.png [004]: ../media/vis/widget_images/basic/Prev_Image.png [005]: ../media/vis/widget_images/basic/Prev_tplLink.png [006]: ../ media / vis / widget_images / basic / Prev_tplFrame.png [007]: ../media/vis/widget_images/basic/Prev_StatefulIFrame8.png [008]: ../media/vis/widget_images/basic/Prev_ContainerView.png [009] : ../media/vis/widget_images/basic/Prev_StatefulContainerView8.png [010]: ../media/vis/widget_images/basic/Prev_StatefulImage.png [011]: ../media/vis/widget_images/basic/Prev_HTMLnavigation. png [012]: ../media/vis/widget_images/basic/Prev_FilterDropdown.png [013]: ../media/vis/widget_images/basic/Prev_ValueFloat.png [014]: ../media/vis/widget_images/ basic / Prev_ValueString.png [015]: ../media/vis/widget_images/basic/Prev_ValueStringRaw.png [016]: ../media/vis/widget_images/basic/Prev_ValueStringImg.png [017]: ../media/ v is / widget_images / basic / Prev_ValueTimestamp.png [018]: ../media/vis/widget_images/basic/Prev_ValueLastchange.png [019]: ../media/vis/widget_images/basic/Prev_ValueList.png [020]:. ./media/vis/widget_images/basic/Prev_ValueListHtml.png [021]: ../media/vis/widget_images/basic/Prev_ValueListHtml8.png [022]: ../media/vis/widget_images/basic/Prev_ValueBool.png [ 023]: ../media/vis/widget_images/basic/Prev_AckBool.png [024]: ../media/vis/widget_images/basic/Prev_ValueBoolCheckbox.png [025]: ../media/vis/widget_images/basic/ Prev_ValueBoolSelect.png [026]: ../media/vis/widget_images/basic/Prev_ValueBoolCtrl.png [027]: ../media/vis/widget_images/basic/Prev_ValueBoolCtrlSvg.png [028]: ../media/vis/ widget_images / basic / Prev_BasicState.png [029]: ../media/vis/widget_images/basic/Prev_RedNumber.png [030]: ../media/vis/widget_images/basic/Prev_BulbOnOffCtrl.png [031]: ../ media / vis / widget_images / basic / Prev_ValueFloatBar.png [032]: ../media/vis/widget_images/basic/Prev_Note.png [033]: ../media/vis/widget _images / basic / Prev_TableBody.png [034]: ../media/vis/widget_images/basic/Prev_HtmlLogout.png [035]: ../media/vis/widget_images/basic/Prev_ValueGesture.png [036]: ../ media / vis / widget_images / basic / Prev_Speech2Text.png [037]: ../media/vis/widget_images/basic/Prev_FullScreen.png [038]: ../media/vis/widget_images/basic/Prev_ScreenResolution.png [039] : ../media/vis/widget_images/basic/Explanation/html.png [040]: ../media/vis/widget_images/basic/Explanation/svg.gif [041]: ../media/vis/widget_images/ basic / Explanation / iframe.gif [042]: ../media/vis/widget_images/basic/Explanation/image.gif [043]: ../media/vis/widget_images/basic/Explanation/link.gif [044] : ../media/vis/widget_images/basic/Explanation/border.gif