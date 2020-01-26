---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: eLX6p+Qi7beSULDJmUAseJkYgh9WE96AjNvyLMfQK1g=
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
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Виджеты дизайна материалов ioBroker основаны на [Руководство Google по дизайну материалов](https://material.io/design/). Адаптер использует следующие библиотеки:

* [Компоненты материалов Google для Интернета] (https://github.com/material-components/material-components-web)
* [Vuetify] (https://github.com/vuetifyjs/vuetify)
* [chartjs] (https://www.chartjs.org/)
* [круглый слайдер из томасловена] (https://github.com/thomasloven/round-slider)
* [Значки материалов дизайна] (https://materialdesignicons.com/)

## Онлайн пример проекта
предоставлено [iobroker.click](https://iobroker.click/index.html), благодаря Bluefox и iobroker.

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS Runtime</a> ( <a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">VIS Editor</a> ( <a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )

### Поддерживаемый браузер
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

### Поддерживается браузер для функции вибрации на мобильных устройствах
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

### IoBroker VIS App
не работает в данный момент, необходимо реализовать приложением, см. https://github.com/ioBroker/ioBroker.vis.cordova

## Материал Дизайн Иконки и Изображения
<table><thead><tr><th> Скриншот </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/material-icons.png"></td><td> Некоторые виджеты поддерживают библиотеку <a href="https://materialdesignicons.com/" target="_blank">значков материалов</a> . Вы можете выбрать значок из списка выше или открыть средство выбора изображений, нажав кнопку справа от поля ввода. <br><br> <b>Цвета изображения применяются только к значкам дизайна материалов, а не к изображению!</b> </td></tr></tbody></table>

## Кнопка Toggle
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

## Открытка
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

## Кнопка со значком
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

## Список
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

## Прогресс
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

## Слайдер
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td> initDelay </td><td> Если ползунок не отображается или не работает после загрузки среды выполнения, то это значение необходимо увеличить. Запись производится в миллисекундах. <br> Например, увеличивайте на 250 шагов, пока слайдер не заработает. </td></tr></tbody></table>

## Round Slider
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

## Переключатель
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

## Выбрать
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/select.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Существует три способа определения данных меню. Во-первых, определить это с помощью редактора. Во-вторых, определить его с помощью строки JSON. Третий способ - определить его тремя списками значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Метод данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x] </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON, чтобы определить пункты меню, или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br> <code>[ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot; } ]</code> </td> </tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены в точке данных. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные значки значений. Записи должны быть разделены запятой. Вы можете использовать путь к изображению или название дизайна материалов. </td></tr></tbody></table>

## Автозаполнение
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/autocomplete.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Существует три способа определения данных меню. Во-первых, определить это с помощью редактора. Во-вторых, определить его с помощью строки JSON. Третий способ - определить его тремя списками значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Метод данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x] </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON, чтобы определить пункты меню, или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br> <code>[ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot; } ]</code> </td> </tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены в точке данных. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные значки значений. Записи должны быть разделены запятой. Вы можете использовать путь к изображению или название дизайна материалов. </td></tr></tbody></table>

## Верхняя панель приложений с навигационным ящиком
Верхнюю панель приложения с навигационным ящиком можно комбинировать с <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">видом в виджете 8</a> .

<b>Взгляните на [Пример проекта Виджетов Материалов](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

##### Макет модальный:
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

##### Макет постоянного:
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/topappbar_settings.png"></td><td> Идентификатор объекта </td><td> должен быть установлен на точку данных из номера типа. Например, эта точка данных может использоваться <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">представлением в виджете 8</a> </td></tr><tr><td> показать индекс элементов навигации </td><td> показывает индекс навигации перед меткой элемента. Этот номер можно использовать в <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">представлении в виджете 8</a> для определения представления, которое должно отображаться, если выбран элемент </td></tr><tr><td> количество элементов навигации </td><td> Определить количество элементов навигации </td></tr></tbody></table>

### Подменю
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td><td> количество подменю [x] </td><td> Определите, есть ли у элемента навигации подменю и количество подменю. </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td><td> метка [х] </td><td> Чтобы изменить текст элементов, вы должны поместить объект json в поле метки с индексом поля представления. <br> Пример: <br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Результат: см. Скриншот </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td><td> значок [х] </td><td> Чтобы изменить значки элементов, необходимо поместить объект json в поле значков с индексом поля просмотра. <br> Пример: <br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

Результат: см. Скриншот </ td> </ tr> </ tbody> </ table>

## Графики
### Диаграмма истории линий:
> Требуемый адаптер: [SQL] (https://github.com/ioBroker/ioBroker.sql), [History] (https://github.com/ioBroker/ioBroker.history) или [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/line_hostory_chart_general.png"></td><td> экземпляр адаптера </td><td> Экземпляр для адаптера sql или history </td></tr><tr><td> агрегирование </td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">ссылка на сайт</a> </td></tr><tr><td> Максимум. количество отображаемых точек данных </td><td> Количество максимальных точек данных для отображения </td></tr><tr><td> интервал времени между точками данных в [с] </td><td> Необязательный параметр, переопределяет параметр «количество». <br> Расстояние между отдельными точками данных в секундах. <br> Например, если вы хотите отображать точки данных каждую минуту, вам нужно ввести 60 здесь </td></tr><tr><td> управление временным интервалом с использованием объекта </td><td> Идентификатор точки данных для изменения временного интервала графика. Точка данных должна быть строкой и может содержать <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">связанные значения</a> <br> Например, вы можете использовать кнопку здесь, чтобы изменить отображение графика во время выполнения </td></tr><tr><td> логический объект для обновления </td><td> Идентификатор adatapoint запускает обновление графика вручную. <br> Например, вы можете использовать кнопку здесь, чтобы обновить диаграмму во время выполнения </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> форматы времени по оси X </td><td> Измените формат времени оси X. Форматы времени должны быть введены для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a> <br> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td> форматы времени всплывающей подсказки </td><td> Изменить формат времени всплывающей подсказки. Форматы времени должны быть введены для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a> <br> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr></tbody></table>

## Стол
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

##### Входные данные
Входные данные должны быть массивом json объектов, например:

```
[
{"img":"/vis.0/myImages/erlebnis_50.png","name":"Empire","betriebszeit":"4h 06m","funk":"5G","ip":"10.0.0.1"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Handy","betriebszeit":"13m","funk":"5G","ip":"10.0.0.2"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Harmony Hub - Wohnzimmer","betriebszeit":"18T 07h 21m","funk":"2G","ip":"10.0.0.3"},
{"img":"/vis.0/myImages/erlebnis_25.png","name":"MusicCast - Esszimmer (WX-030)","betriebszeit":"1h 57m","funk":"2G","ip":"10.0.0.4"},
{"img":"/vis.0/myImages/erlebnis_75.png","name":"MusicCast - K�che (ISX-18D)","betriebszeit":"4h 10m","funk":"2G","ip":"10.0.0.5"}
]
```

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td> переключатель </td><td> Datapoint из строки типа с входными данными, как показано выше </td></tr><tr><td> данные в формате JSON </td><td> Необязательно, введите данные, как показано выше, если не установлена точка oid </td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td> colType [х] </td><td> Если изображение выбрано, свойство объекта должно иметь путь к изображению ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">см. Выше</a> ) </td></tr><tr><td> Префикс [х] </td><td> Можно использовать префикс для свойства объекта, привязки внутреннего объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и HTML </td></tr><tr><td> Суффикс [х] </td><td> Можно использовать суффикс для свойства объекта, привязки внутреннего объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и HTML </td></tr><tr><td> имя объекта для сортировки [x] </td><td> Здесь вы можете определить другое свойство объекта, которое должно использоваться для сортировки. </td></tr></tbody></table>

##### Привязка внутреннего объекта
префикс и суффикс поддерживает привязку внутреннего объекта таблицы -> вы можете получить доступ к другим свойствам объекта, используя

```
#[obj.'propertyName']
```

Пример см <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">. Выше</a> .

Пример рабочего виджета можно найти

* [здесь] (https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)
* [ical адаптер] (https://forum.iobroker.net/topic/26925/test-adapter-material-design-widgets-v0-2-x/581)

## Колонка просмотров - убог !!!
Представления столбцов имеют несколько `view in widget` интегрированных, которые будут упорядочены автоматически в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона)

<b>Взгляните на [Пример проекта Виджетов Материалов](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/column_views.gif)

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/column_views_common.png"></td><td> Число столбцов </td><td> определить количество столбцов </td></tr><tr><td> минимальная ширина </td><td> минимальная ширина каждого столбца. Например, используйте ширину разрешения мобильного устройства </td></tr><tr><td rowspan=2><img src="doc/en/media/column_views_col_settings.png"></td><td> просмотры в столбце [x] </td><td> Определите представления, которые должны быть показаны в этом столбце. Несколько представлений должны быть разделены &#39;|&#39; </td></tr><tr><td> высота просмотров в столбце [x] </td><td> Определите высоту каждого вида в столбце. Несколько высот должны быть разделены &#39;|&#39; </td></tr></tbody></table>

## Оповещения
Виджет оповещений можно использовать, например, для отображения сообщений в VIS, как это работает с адаптером pushover, но непосредственно в VIS.

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/alerts.gif)

Виджет Оповещения требует JSON-строки в качестве объекта, который должен быть структурирован следующим образом:

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

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/alerts_settings.png"></td><td> Число столбцов </td><td> определить количество столбцов </td></tr><tr><td> Идентификатор объекта </td><td> Объект должен быть строкой json, структура которой должна быть описана выше </td></tr><tr><td> Максимум. Оповещения </td><td> максимальное количество предупреждений, которые должны быть показаны. </td></tr></tbody></table>

## Changelog

### 0.2.xx
* (Scrounger): Alerts Widget added
* (Scrounger): use of Material Design Icons as images added
* (Scrounger): Perfomrance optimized
* (Scrounger): Input Widget added
* (Scrounger): Masonry Views Widget: settings options for mobile phone and tablet added
* (Scrounger): Masonry Views Widget: another chrome bug fix, option for distance between views added
* (Scrounger): Round Slider: vibrate on mobil devices added
* (Scrounger): bug fixes

### 0.2.32
* (Scrounger): Editor translation bug fix
* (Scrounger): Masonry Views Widget: alignment bug fix for chrome
* (Scrounger): Line History Chart Widget: layout option for line values added
* (Bluefox): Russian translation revised

### 0.2.30
* (Scrounger): Masonry Views Widget added
* (Scrounger): Select Widget: background color bug fix
* (Scrounger): Column Views Widget added
* (Scrounger): Button Widgets: icon height bug fix
* (Scrounger): Vuetify API bug fix
* (Scrounger): Chart Widgets: localization added
* (Scrounger): Line History Chart Widget: color options for each y-axis added
* (Scrounger): Line History Chart Widget: x-axis boundary options added
* (Scrounger): Line History Chart Widget: x-axis scaling bug fix
* (Scrounger): TopAppBar Widget: `view in widget 8` removed -> old TopAppBar Widget will be removed in version 0.3.x
* (Scrounger): bug fixes

### 0.2.22
* (Scrounger): library material-components-web updated to v4.0.0
* (Scrounger): Table: support for objects added
* (Scrounger): List: layout checkbox disabled added
* (Scrounger): vuetify slider added -> old slider will be removed in version 0.3.x
* (Scrounger): vuetify library v2.1.15 added
* (Scrounger): bug fixes

### 0.2.9
* (Scrounger): translations added
* (Scrounger): select Widget: color options added
* (Scrounger): slider Widget: color options added
* (Scrounger): bug fixes

### 0.2.7
* (Scrounger): List Widget: types switch readonly, checkbox readonly & button toggle readonly added
* (Scrounger): Line History Chart Widget: bug fix for hide yaxis by legend click if common axis is set
* (Scrounger): Line History Chart Widget: option to append text to yAxis values added
* (Scrounger): Switch Widget: color options added
* (Scrounger): chartjs lib updated to v2.9.3
* (Scrounger): round-slider: lib updated to v0.3.7
* (Scrounger): Table Widget: wordwrap & width option added
* (Scrounger): Chart Widgets: option for background color of diagram area added

### 0.2.4
* (Scrounger): Round Slider Widget bug fixes
* (Scrounger): Line History Chart Widget: null value bug fix
* (Scrounger): Line History Chart Widget: tooltip bug fix
* (Scrounger): Line History Chart Widget: editor translation improved
 
### 0.2.0
* (Scrounger): Round Slider Widget added
* (Scrounger): Icon Button Adition Widget added
* (Scrounger): Button Adition Widget added
* (Scrounger): Line History Chart Widget added
* (Scrounger): Table Widget added
* (Scrounger): Dialog iFrame Widget added
* (Scrounger): Dialog View Widget added
* (Scrounger): Select Widget added
* (Scrounger): colorSchemes for Charts added
* (Scrounger): bug fixes

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