---
title: Widgets
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets.md
hash: TxhNPmBC2abg80GhW8v2M7m6PomjfeOCj2SJAYiI5/g=
---
# Widgets
## As a general rule
In this context, widgets ('device, thing') are display elements that display numbers, text, images or diagrams in various ways and offer opportunities for interaction.

## IoBroker.vis widgets
There are different widget sets for visualization in ioBroker with vis.

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

### The basic settings of widgets
#### As a general rule
![001_Widget_General](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

| Attribute | Description |
|-----|----|

| Name | A unique name for this widget can be entered here | Comment | A short description can be entered here | CSS class |: construction: | Filter word |: construction: | Show in views | Here you can select whether this widget should only appear in the current view or in several.
| Inactive (locked) |: construction:

#### **Visibility**
The visibility of a widget can be made dependent on the status of a data point.
![002_Widget_visibility](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

| Attribute | Description |
|----|----|

| `Object ID` | Enter the ID of the data point that is to control the visibility of the selected widget. The data point can be searched for using the button.
| Condition | The widget is visible if the condition entered here for the above data point ...
| The value for the condition | ... corresponds to the value entered here.

#### **Generally**
![](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg) The 'General' section is specific to each widget and is described in more detail for the individual widgets.
In this section, the desired data point is assigned to the widget in the Object ID field.

*** The **CSS settings** of the widget can be found in the following menu items and can be adapted to your own requirements:

#### **CSS in general**
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

| Attribute | Description |
|-----|----|

| `left` | Distance from the left edge of the view | `top` | Distance from the top of the view | `width` | Width of the widget | `height` | Height of the widget | `z-index` | Specify the level in which the widget is located (0 = on the background, positive values = the higher the value, the further ahead) | `overflow-y` |

| `overflow-y` |
| `opacity` | Transparency (0 = opaque -> image invisible .. 1 = transparent -> image visible) |

#### CSS Font & Text
![005_CSS_Font_Text](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

| Attribute | Description |
|-----|----|

| `color` | Font color (via selection dialog or via color code) | `text-align` | Alignment of the text (left, right, centered) | `text-shadow` | Color of the text shadow | `font-family` | Font | `font-style` | Character set type (normal, italic, oblique, initial, inherit) | `font-variant` | Character set variant (normal, small caps, ...) | `font-weight` | Character set strength | `font-size` | Font size | `line-height` | Line spacing | `letter-spacing` | Character spacing | `word-spacing` | Word spacing

#### **CSS background**
![006_CSS_Background](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

| Attribute | Description |
|-----|-----|

| `background` | Several of the following properties can be specified here together | `-color` | Color of the background | `-image` | Background image | `-repeat` | Specifies whether a background is repeated over the entire width and / or height of an element.
| `-attachement` | Specifies whether a background image is fixed or whether it is moved when scrolling | `-position` | Alignment of the background image (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` | Size of the background image | `-clip` | Controls the overlap with the border | `-origin` | Coordinate system origin for image coordinates

#### **CSS Border**
![007_CSS_Border](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

| Attribute | Description |
|----|----|
| `-width` | Thickness of the border | |
| `-color` | Color of the border |
| `-radius` | Corner radius of the border; can be at most half the shorter distance of the widget |
| `-radius` | corner radius of the border; can be at most half the shorter distance of the widget |

| Attribute | Description |
|-----|----|

| `-width` | Thickness of the border | `-style` | Line type of the border | `-color` | Color of the border | `-radius` | Corner radius of the border; can be at most half the shorter distance of the widget

#### CSS shadow and space
![008_CSS_Schatten_Abstand](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

| Attribute | Description |
|----|----|
| `padding` | Offset from the edge of the widget box |
| `padding-top` | Offset on the upper side |
| `padding-right` | Offset on the right side |
| `padding-bottom` | Offset on the lower side |
| `box-shadow` | Color of the shadow of the widget box |
| `margin-top` | Upper margin around the widget (auto,%, px, pt, cm) |
| `margin-right` | Right border around the widget |
| `margin-bottom` | Lower border around the widget |
| `margin-left` | Left margin around the widget |
| `margin-left` | Left margin around the widget |

| Attribute | Description |
|-----|----|

| `padding` | Offset from the edge of the widget box | `padding-left` | offset on the left | `padding-top` | Offset on the upper side | `padding-right` | Offset on the right side | `padding-bottom` | Offset on the lower side | `box-shadow` | Color of the shadow of the widget box | `margin-top` | Upper margin around the widget (auto,%, px, pt, cm) | `margin-right` | Right border around the widget | `margin-bottom` | Lower border around the widget | `margin-left` | Left margin around the widget