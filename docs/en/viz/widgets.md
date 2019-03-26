---
title: visualization
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets.md
hash: Ma/ZdawKE4JUnzvNSVsgZhrua+/xTjhAPGc3ThcEbfM=
---
# Widgets
## As a general rule
Widgets ('device, thing') in this context are display elements that in various ways represent numbers, texts, pictures or diagrams and offer interaction possibilities.

# **ioBroker.vis Widgets**
For the visualization in ioBroker with vis there are different widget sets.

-------------------------------------------------------------------------------  
-------------------------------------------------------------------------------

# The basic settings of widgets
## **As a general rule**
![001_Widget_Generell](../../de/viz/../media/vis/vis_widgets_001_Widget_Generell.jpg)

Attribute | Description |
---- | ---- |
Name | Here you can enter a unique name for this widget Comment | Here you can enter a short description CSS Class |: construction: Filterword |: construction: Show in Views | Here you can choose if this widget is only in the current view or should appear in several.
Inactive (locked) |: construction:

## **Visibility**
The visibility of a widget can be made dependent on the state of a data point.
![002_Widget_Sichtbarkeit](../../de/viz/../media/vis/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

Attribute | Description |
---- | ---- |
Object ID | Enter the ID of the data point to control the visibility of the selected widget. The data point can be searched via the button.
Condition | The widget will be visible if the condition entered here for the o.a. Data point ...
Value for the condition | ... corresponds to the value entered here.

## **General**
![](../../de/viz/../media/vis/vis_widgets_003_Widget_Allgemein.jpg) The 'General' section is specific to each widget and is described in detail for each widget.
In this section, the desired data point in the Object ID field is mapped to the widget.

*** The **CSS settings** of the widget can be found in the following menu items and can be adapted to your own wishes:

## **CSS in general**
![](../../de/viz/../media/vis/vis_widgets_004_CSS_allgemein.jpg)

Attribute | Description |
---- | ---- |
left | distance from the left edge of the view top | distance from the top of the view width | width of the widget height | height of the widget z-index | indicate the plane in which the widget lies (0 = on the background, positive values = each higher the value, the further up) overflow-x | The overflow property specifies what should happen if content overflows at element's box. This property provides whether or not to add content to scrollbars when an element's content is too big to fit in a specified area.
overflow-y |
opacity | transparency (0 = opaque -> image invisible .. 1 = transparent -> image visible)

## **CSS Font & Text**
![005_CSS_Font_Text](../../de/viz/../media/vis/vis_widgets_005_CSS_Font_Text.jpg)

Attribute | Description |
---- | ---- |
color | font color (via selection dialog or by color code) text-align | flush of the text (left, right, centered) text-shadow | color of the font font-family | font font-style | font type (normal, italic, oblique, initial, inherit) font-variant | Character set variant (normal, small capitals, ...) font-weight | font-strength font-size | font size line-height | line spacing letter-spacing | pitch word-spacing | word spacing

## **CSS background**
![006_CSS_Hintergrund](../../de/viz/../media/vis/vis_widgets_006_CSS_Hintergrund.jpg)

Attribute | Description |
---- | ---- |
background | Here you can specify more than one of the following properties -color | background color -image | background image -repeat | Specifies whether a background is repeated over the entire width or / and height of an element.
-attachement | Specifies whether a background image is fixed or is scrolled when moved -position | Orientation of the background image (https://www.w3schools.com/cssref/pr_background-position.asp) -size | size of the background image -clip | Controls the overlap with the edge -origin | coordinate coordinate origin for image coordinates

(see https://www.w3schools.com/cssref/css3_pr_background.asp)

## **CSS Border**
![007_CSS_Border](../../de/viz/../media/vis/vis_widgets_007_CSS_Border.jpg)

Attribute | Description |
---- | ---- |
-width | border thickness -style | line style of the border -color | border color -radius | corner radius of the border; can be at most half of the shorter range of the widget

## **CSS shadow and distance**
![008_CSS_Schatten_Abstand](../../de/viz/../media/vis/vis_widgets_008_CSS_Schatten_Abstand.jpg)

Attribute | Description |
---- | ---- |
padding | offset from the edge of the widget box padding-left | offset on the left side padding-top | offset on the top side padding-right | offset on the right side padding-bottom | offset on the bottom side box-shadow | color widget-box shadow margin-top | top margin around the widget (auto,%, px, pt, cm) margin-right | right margin around widget margin-bottom | bottom margin around widget margin-left | left margin around the widget

[185]: ../media/vis/widget_images/swipe/Prev_Carousel.png [186]: ../media/vis/widget_images/swipe/Prev_Swipe.png