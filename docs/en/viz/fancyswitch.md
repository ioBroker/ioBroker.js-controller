---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/fancyswitch.md
title: Fancyswitch
hash: DFXagUdr/ZV0Iv1rR8AXrE035qtjVkn9+FGKRExwK0M=
---
# Fancyswitch
This set represents some switches that work mostly the same.
They represent Boolean states and can also switch them.

| Widget | Image | Description |
|------------------------|-------|--------------|
| Switch light off / on | ![switch](../../de/viz/media/fancyswitch-1.png) | Light gray rocker switch |
| Slide dark on / off | ![switch](../../de/viz/media/fancyswitch-3.png) | Slider with 'on' / 'off' label |
| Slider dark off / on | ![switch](../../de/viz/media/fancyswitch-4.png) | Slider with 'off' / 'on' label |
| Rocker dark off / on | ![switch] (media / fancyswitch-5.png)! [switch](../../de/viz/media/fancyswitch-6.png) | Dark rocker switch with 'off' / 'on' label; optional also in the light style |
| Giva Labs iButton | ![switch](../../de/viz/media/fancyswitch_givalabsibutton.png) | White slider with 'on' / 'off' label |
| Taitem jqui Toggleswitch | ![switch](../../de/viz/media/fancyswitch_taitem.png) | White slider with 'on' / 'off' label outside the slider |
| Taitem jqui Toggleswitch | ! [Switch] (media / fancyswitch_taitem.png) | White slider with 'on' / 'off' label outside the slider |

## Description of the properties
| Attribute | Description | Subject |
|----|----|---|
| ObjectId | Id of an object to be displayed containing HTML | Switch, Slider, Slider, Rocker |
| Invert | Invert switching state | Switch, Slider, Slider, Rocker |
| False-value | value to which the state is false / off / off | switch, slider, slider, rocker |
| True-value | value to which the state is false / off / off | switch, slider, slider, rocker |
| Auto-Off | Represents push-button function: after a set time, the switch returns to its original state | Switch, Slider, Slider, Rocker |
| Light style | Lighter display of the switch | Rocker dark off / on |
| Lever size || Giva Labs iButton |
| Container Size || Giva Labs iButton |
| Drag Allowed | Switch can be dragged (not just pressed) | Giva Labs iButton |
| Animation | Switching is animated | Giva Labs iButton |
| Switch-over | data point delayed | Giva Labs iButton |
| Highlight switch | Sliding area of the switch is also shown in color | Taitem jqui Toggleswitch |
| Widget width | width of the switch, regardless of caption | Taitem jqui Toggleswitch |
| Prepend html | HTML code to be displayed in front of the object | Taitem jqui Toggleswitch |
| Append HTML | HTML code to display after the object | Taitem jqui Toggleswitch |

** Example: ** ![009](../../de/viz/media/fancyswitch_all.gif)