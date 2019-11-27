---
title: widgets
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets.md
hash: PluUjl+xw1lq5O8JDBHv5XTAJU9SlDzZC9hZ5z1o38A=
---
# Widgets
## As a general rule
Widgets ('device, thing') in this context are display elements that in various ways represent numbers, texts, images or diagrams and offer interaction possibilities.

## **ioBroker.vis Widgets**
For the visualization in ioBroker with vis there are different widget sets.

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

### The basic settings of widgets
#### As a general rule
![001_Widget_Generell](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

| Attribute | Description |
|-----|----|

| Name | Here you can enter a unique name for this widget | Comment | Here you can enter a short description | CSS class |: construction: | Filter word |: construction: | Show in Views | Here you can choose if this widget should only appear in the current view or in several.
| Inactive (locked) |: construction:

#### **Visibility**
The visibility of a widget can be made dependent on the state of a data point.
![002_Widget_Sichtbarkeit](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

| Attribute | Description |
|----|----|

| `Object ID` | Enter the ID of the data point that should control the visibility of the selected widget. The data point can be searched via the button.
| Condition | The widget will be visible if the condition entered here for the o.a. Data point ...
| Value for the condition | ... corresponds to the value entered here.

#### **Generally**
![](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg) The 'General' section is specific to each widget and is described in detail for each widget.
In this section, the desired data point in the Object ID field is mapped to the widget.

*** The **CSS settings** of the widget can be found in the following menu items and can be adapted to your own wishes:

#### **CSS in general**
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

| Attribute | Description |
|-----|----|

| `left` | Distance from the left edge of the view | `top` | Distance from the top of the view | `width` | width of the widget | `height` | Height of the widget | `z-index` | Indicate the plane in which the widget is located (0 = on the background, positive values = the higher the value, the further forward) | `overflow-y` |

| `Overflow-y` |
| `opacity` | Transparency (0 = opaque -> image invisible .. 1 = transparent -> image visible) |

#### CSS Font & Text
![005_CSS_Font_Text](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

| Attribute | Description |
|-----|----|

| `color` | Font color (via selection dialog or by color code) | `text-align` | Agreement of the text (left, right, centered) | `text-shadow` | Color of the text shadow | `font-family` | Font | `font-style` | Character set type (normal, italic, oblique, initial, inherit) | `font-variant` | Character set variant (normal, small capitals, ...) | `font-weight` | Character set strength | `font-size` | Font size | `line-height` | Line spacing | `letter-spacing` | Character space | `word-spacing` | word spacing

#### **CSS background**
![006_CSS_Hintergrund](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

| Attribute | Description |
|-----|-----|

| `background` | Here you can specify more than one of the following properties | `-color` | Color of the background | `-image` | Wallpaper | `-repeat` | Determines whether a background is repeated across the entire width and / or height of an element.
| `-attachement` | Specifies whether a background image is fixed or is moved when scrolling | `-position` | Orientation of the background image (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` | Size of the wallpaper | `-clip` | Controls the overlap with the border | `-origin` | Coordinate system origin for image coordinates

#### **CSS Border**
![007_CSS_Border](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

| Attribute | Description |
|----|----|
| `-width` | Thickness of the border | |
| `-color` | Color of the border |
| `-radius` | corner radius of the border; can be at most half of the shorter range of the widget |
| `-radius` | corner radius of the border; can be at most half of the shorter range of the widget |

| Attribute | Description |
|-----|----|

| `-width` | Thickness of the border | `-style` | Line style of the border | `-color` | Color of the border | `-radius` | corner radius of the border; can be at most half of the shorter range of the widget

#### CSS shadow and distance
![008_CSS_Schatten_Abstand](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

| Attribute | Description |
|----|----|
| `padding` | offset from the edge of the widget box |
| `padding-top` | offset on the upper side |
| `padding-right` | offset on the right side |
| `padding-bottom` | offset on the lower side |
| `box-shadow` | Shadow color of the widget box |
| `margin-top` | Top border around the widget (auto,%, px, pt, cm) |
| `margin-right` | Right margin around the widget |
| `margin-bottom` | Bottom of the widget |
| `margin-left` | Left margin around the widget |
| `margin-left` | Left margin around the widget |

| Attribute | Description |
|-----|----|

| `padding` | Offset from the edge of the widget box | `padding-left` | offset on the left side | `padding-top` | offset on the upper side | `padding-right` | offset on the right side | `padding-bottom` | Offset on the lower side | `box-shadow` | Color of the shadow of the widget box | `margin-top` | Top border around the widget (auto,%, px, pt, cm) | `margin-right` | Right margin around the widget | `margin-bottom` | Bottom of the widget | `margin-left` | Left margin around the widget