---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: dzY37+riP6rPphWwGWaCzfhEZsZC5f5YzBagjXeQysI=
---
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png)

![стабильная версия](http://iobroker.live/badges/vis-materialdesign.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![Количество установок](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.vis-materialdesign.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Scrounger/ioBroker.vis-materialdesign/master.svg)

# IoBroker.vis-materialdesign
## Виджеты дизайна материалов для ioBroker VIS
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Виджеты дизайна материалов на основе [Веб-библиотека компонентов материалов Google](https://github.com/material-components/material-components-web).

### Поддерживаемый браузер
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

## Кнопка Toggle
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/buttons.gif)

## Карта
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/cards.png)

## Кнопка со значком
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/icon-button.gif)

## Список
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/list.gif)

## Прогресс
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/progress.gif)

## Слайдер
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/slider.gif)

## Переключатель
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/switch.gif)

## Верхняя панель приложений с навигационным ящиком
Информация:

* Позиция App Bar жестко закодирована и всегда отображается в верхнем левом углу. Только ширина и высота регулируются. В редакторе вы можете переместить виджет, но эти настройки не будут применены!
* В редакторе такие эффекты, как прокрутка и т. Д., Отображаются неправильно или ведут себя иначе!
* Флажок "постоянный" должен быть активирован!

##### Макет модальный:
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_modal.gif)

##### Макет запрещен:
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_dismissible.gif)

##### Макет постоянного:
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_permanent.gif)

##### Подменю
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/drawer_subMenu.png)

Чтобы активировать подменю, вы должны добавить несколько представлений, разделенных '|' в поле зрения, например: ![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/drawer_subMenu_views.png)

Чтобы изменить текст элементов, вы должны поместить объект json в поле метки с индексом поля представления, например:

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Чтобы изменить изображение элементов, вы должны поместить объект json в изображение, поданное с индексом поля просмотра, например:

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

## Changelog

### 0.1.5
* (Scrounger): bar chart added
* (Scrounger): pie chart added
* (Scrounger): bug fixes

### 0.1.2
* (Scrounger): list: right label option added
* (Scrounger): slider: value text option for lees or greather than added
* (Scrounger): switch: support for non boolean values added
* (Scrounger): checkbox: support for non boolean values added
* (Scrounger): buttons: image position option added
* (Scrounger): toggle buttons: support for non boolean values added
* (Scrounger): topAppBar: z-Index added
* (Scrounger): haptic feedback (vibration) option for mobil browser added
* (Scrounger): editor text fields changed to html
* (Scrounger): mdc-typography font styles added
* (Scrounger): bug fixes

### 0.1.1
* (Scrounger): bug fixes

### 0.1.0
* (Scrounger): Top App Bar Submenu added
* (Scrounger): List added
* (Scrounger): Button vertical State, Link, Nav added
* (Scrounger): Icon Button State, Link, Nav added
* (Scrounger): initialize slider bug fixes
* (Scrounger): moved hard coded styling options to css
* (Scrounger): styling options extended
* (Scrounger): bug fixes

### 0.0.7
* (Scrounger): Top App Bar Layouts added
* (Scrounger): Top App Bar customizing options added
* (Scrounger): Top App Bar Navigation Drawer backdrop layout added
* (Scrounger): Button State added
* (Scrounger): Button Link added

### 0.0.6
* (Scrounger): Top App Bar with Navigation Drawer added
* (Scrounger): Checkbox added
* (Scrounger): bug fixes
 
### 0.0.5
* (Scrounger): icon button Toggle added
* (Scrounger): color pressed for buttons added
* (Scrounger): Slider bug fix & label for value <= min / >= max added
* (Scrounger): translation added

### 0.0.4
* (Scrounger): cards added

### 0.0.3
* (Scrounger): progress added
 
### 0.0.2
* (Scrounger): slider vertical added
* (Scrounger): switch added
* (Scrounger): button toggle added

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger <scrounger@gmx.net>

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