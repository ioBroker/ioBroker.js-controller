---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: xzZVlDtk22Z4Kw1IgAamK9ZXv0kF/zXPdanW5sUdSN4=
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

## Практические примеры
* [Просмотр погоды] (https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view)
* [Состояние скрипта] (https://forum.iobroker.net/topic/30662/material-design-widgets-skript-status)
* [Статус адаптера] (https://forum.iobroker.net/topic/30661/material-design-widgets-adapter-status)
* [Статус UniFi Netzwerk] (https://forum.iobroker.net/topic/30875/material-design-widgets-unifi-netzwerk-status)

## Вопросы и ответы о виджетах
Если у вас есть вопросы по отдельным виджетам, то сначала посмотрите на темы отдельных виджетов.

* [Немецкие темы] (https://forum.iobroker.net/search?term=Material%20Design%20Widgets%3A&in=titles&matchWords=all&by%5B%5D=Scrounger&categories%5B%5D=7&sortBy=topic.title=sortDirection тем)

### Поддерживаемый браузер
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

### Поддерживается браузер для функции вибрации на мобильных устройствах
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

### IoBroker VIS App
не работает в данный момент, необходимо реализовать приложением, см. https://github.com/ioBroker/ioBroker.vis.cordova

## Материал Дизайн Иконки и Изображения
<table><thead><tr><th> Скриншот </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/material-icons.png"></td><td> Некоторые виджеты поддерживают библиотеку <a href="https://materialdesignicons.com/" target="_blank">значков материалов</a> . Вы можете выбрать значок из списка выше или открыть средство выбора изображений, нажав кнопку справа от поля ввода. <br><br> <b>Цвета изображения применяются только к значкам дизайна материалов, а не к изображению!</b> </td></tr></tbody></table>

## Кнопки
### Кнопка Toggle
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

### Кнопка со значком
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

## Открытка
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

## Список
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

## IconList
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/iconList.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/iconList_settings_common.png"></td><td> метод ввода данных списка </td><td> Данные для IconList можно вводить через редактор или использовать строку JSON. </td></tr><tr><td> JSON-String: идентификатор объекта </td><td> Идентификатор объекта datapoint со строкой JSON. Строка JSON должна иметь следующий формат: <pre> <code> [ { &quot;background&quot;: &quot;red&quot;, &quot;text&quot;: &quot;text1&quot;, &quot;subText&quot;: &quot;number&quot;, &quot;image&quot;: &quot;harddisk&quot;, &quot;imageColor&quot;: &quot;#ec0909&quot;, &quot;imageActive&quot;: &quot;folder&quot;, &quot;imageActiveColor&quot;: &quot;#5ad902&quot;, &quot;buttonBackgroundColor&quot;: &quot;&quot;, &quot;buttonBackgroundActiveColor&quot;: &quot;&quot;, &quot;listType&quot;: &quot;buttonState&quot;, &quot;objectId&quot;: &quot;0_userdata.0.iconList.buttonState.number&quot;, &quot;buttonStateValue&quot;: &quot;60&quot;, &quot;buttonNavView&quot;: &quot;&quot;, &quot;buttonLink&quot;: &quot;&quot;, &quot;buttonToggleValueTrue&quot;: &quot;&quot;, &quot;buttonToggleValueFalse&quot;: &quot;&quot;, &quot;valueAppendix&quot;: &quot;&quot;, &quot;showValueLabel&quot;: &quot;true&quot;, &quot;statusBarColor&quot;: &quot;green&quot;, &quot;lockEnabled&quot;: &quot;false&quot; }, { &quot;background&quot;: &quot;green&quot;, &quot;text&quot;: &quot;text0&quot;, &quot;subText&quot;: &quot;bool&quot;, &quot;image&quot;: &quot;home&quot;, &quot;imageColor&quot;: &quot;#44739e&quot;, &quot;imageActive&quot;: &quot;home&quot;, &quot;imageActiveColor&quot;: &quot;#44739e&quot;, &quot;buttonBackgroundColor&quot;: &quot;&quot;, &quot;buttonBackgroundActiveColor&quot;: &quot;#a0f628&quot;, &quot;listType&quot;: &quot;buttonToggle&quot;, &quot;objectId&quot;: &quot;0_userdata.0.iconList.buttonToggle.bool0&quot;, &quot;buttonStateValue&quot;: &quot;60&quot;, &quot;buttonNavView&quot;: &quot;&quot;, &quot;buttonLink&quot;: &quot;&quot;, &quot;buttonToggleValueTrue&quot;: &quot;&quot;, &quot;buttonToggleValueFalse&quot;: &quot;&quot;, &quot;valueAppendix&quot;: &quot;&quot;, &quot;showValueLabel&quot;: &quot;false&quot;, &quot;statusBarColor&quot;: &quot;&quot;, &quot;lockEnabled&quot;: &quot;false&quot; } ]</code> </pre> Свойство <code>listType</code> может иметь следующие значения: <br> <code>text, buttonState, buttonToggle, buttonToggleValueTrue, buttonToggleValueFalse, buttonNav, buttonLink</code> </td> </tr></tbody></table>

## Прогресс
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

## Слайдер
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td> initDelay </td><td> Если ползунок не отображается или не работает после загрузки среды выполнения, то это значение необходимо увеличить. Запись производится в миллисекундах. <br> Например, увеличивайте на 250 шагов, пока слайдер не заработает. </td></tr></tbody></table>

## Round Slider
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

## Флажок
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/checkbox.gif)

## Переключатель
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

## Ввод
### Ввод текста
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/input.gif)

### Выбрать
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/select.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Существует три способа определения данных меню. Во-первых, определить это с помощью редактора. Во-вторых, определить его с помощью строки JSON. Третий способ - определить его тремя списками значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Метод данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x] </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON для определения пунктов меню или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br><pre> <code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code> </pre> </td></tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены в точке данных. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные значки значений. Записи должны быть разделены запятой. Вы можете использовать путь к изображению или название дизайна материалов. </td></tr></tbody></table>

### Автозаполнение
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/autocomplete.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Существует три способа определения данных меню. Во-первых, определить это с помощью редактора. Во-вторых, определить его с помощью строки JSON. Третий способ - определить его тремя списками значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Метод данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x] </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON для определения пунктов меню или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br><pre> <code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code> </pre> </td></tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены в точке данных. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны быть разделены запятой </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные значки значений. Записи должны быть разделены запятой. Вы можете использовать путь к изображению или название дизайна материалов. </td></tr></tbody></table>

## Верхняя панель приложения с ящиком навигации
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
### Гистограмма
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/barChart.png)

ДЕЛАТЬ

### Круговая диаграмма
ДЕЛАТЬ

### Диаграмма истории линий:
> Требуемый адаптер: [SQL] (https://github.com/ioBroker/ioBroker.sql), [History] (https://github.com/ioBroker/ioBroker.history) или [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/line_hostory_chart_general.png"></td><td> экземпляр адаптера </td><td> Экземпляр для адаптера sql или history </td></tr><tr><td> агрегирование </td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">ссылка на сайт</a> </td></tr><tr><td> Максимум. количество отображаемых точек данных </td><td> Количество максимальных точек данных для отображения </td></tr><tr><td> интервал времени между точками данных в [с] </td><td> Необязательный параметр, переопределяет параметр «количество». <br> Расстояние между отдельными точками данных в секундах. <br> Например, если вы хотите отображать точки данных каждую минуту, вам нужно ввести 60 здесь </td></tr><tr><td> управление временным интервалом с использованием объекта </td><td> Идентификатор точки данных для изменения временного интервала графика. <br><br> Если точка данных имеет тип &#39;string&#39;, она должна содержать <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">одно из связанных значений</a> <br> Если точка данных имеет тип «число», она должна содержать начальную временную метку графа. <br><br> Например, вы можете использовать кнопку здесь, чтобы изменить отображение графика во время выполнения </td></tr><tr><td> логический объект для обновления </td><td> Идентификатор adatapoint запускает обновление графика вручную. <br> Например, вы можете использовать кнопку здесь, чтобы обновить диаграмму во время выполнения </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> форматы времени по оси X </td><td> Измените формат времени оси X. Форматы времени должны быть введены для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a> <br> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td> форматы времени всплывающей подсказки </td><td> Изменить формат времени всплывающей подсказки. Форматы времени должны быть введены для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a> <br> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr></tbody></table>

### JSON Chart
#### Генеральный
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> axisLabels </td><td> метка оси графика </td><td> массив </td><td> числа или строка </td></tr><tr><td> диаграммы </td><td> данные графиков </td><td> массив [ <a href="#graph">график</a> ] </td><td> см график </td></tr></tbody></table>

#### График
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> данные </td><td> данные графика или данные с отметкой времени </td><td> Массив [числа] | Массив [ <a href="#data-with-time-axis">значения с отметкой времени</a> ] </td><td> число </td></tr><tr><td> тип </td><td> тип графика </td><td> строка </td><td> &#39;линия&#39;, &#39;бар&#39; </td></tr><tr><td> legendText </td><td> текст легенды </td><td> строка </td><td></td></tr><tr><td> Отобразить заказ </td><td> порядок наложения графика </td><td> число </td><td> 1, 2, ... </td></tr><tr><td> цвет </td><td> цвет графика </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> use_gradient_color </td><td> использовать цвет градиента </td><td> логический </td><td> ложь Правда </td></tr><tr><td> gradient_color </td><td> градиент цвета </td><td> массив [ <a href="#gradientcolor">градиентКолор</a> ] </td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}] </td></tr><tr><td> tooltip_MinDigits </td><td> максимальные десятичные значения значения всплывающей подсказки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> tooltip_MaxDigits </td><td> максимальные десятичные значения значения всплывающей подсказки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> tooltip_AppendText </td><td> добавить текст к значению всплывающей подсказки </td><td> строка </td><td></td></tr><tr><td> datalabel_show </td><td> показать метки данных для графика </td><td> строка | логический </td><td> ложь, правда, авто </td></tr><tr><td> datalabel_anchor </td><td> привязка меток данных </td><td> строка </td><td> центр, начало, конец </td></tr><tr><td> datalabel_align </td><td> положение метки данных относительно точки привязки </td><td> строка </td><td> слева, начало, центр, конец, справа, сверху, снизу </td></tr><tr><td> datalabel_offset </td><td> расстояние (в пикселях), чтобы вытащить метку данных от точки привязки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_text_align </td><td> текстовое обозначение метки данных </td><td> строка </td><td> влево, начало, центр, конец, вправо </td></tr><tr><td> datalabel_rotation </td><td> угол поворота по часовой стрелке (в градусах) метки данных </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_steps </td><td> показывать метку данных каждый х шаг </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_minDigits </td><td> минимальные десятичные знаки меток данных </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_maxDigits </td><td> максимальные десятичные знаки меток данных </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_append </td><td> добавить текст к метке данных </td><td> строка </td><td></td></tr><tr><td> datalabel_color </td><td> цвет метки данных </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> datalabel_fontFamily </td><td> семейство шрифтов меток данных </td><td> строка </td><td></td></tr><tr><td> datalabel_fontSize </td><td> размер шрифта метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> datalabel_backgroundColor </td><td> цвет фона метки данных </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> datalabel_borderColor </td><td> цвет границы метки данных </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> datalabel_borderWidth </td><td> ширина границы метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> datalabel_borderRadius </td><td> радиус границы метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table>

#### График линейного графика spfeicifc
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> line_pointStyle </td><td> стиль точки </td><td> строка </td><td> круг, крест, крестик, тире, линия, прямоугольник, прямоугольник, прямоугольник, звезда, треугольник </td></tr><tr><td> line_pointSize </td><td> размер точки линии </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> line_pointSizeHover </td><td> размер точки линии </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> line_PointColor </td><td> цвет линии </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> line_PointColorBorder </td><td> цвет границы точки линии </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> line_PointColorHover </td><td> цвет наведения линии </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> line_PointColorBorderHover </td><td> цвет наведения границы на точку </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> line_spanGaps </td><td> рисовать линии, если в данных есть пробелы </td><td> логический </td><td> ложь Правда </td></tr><tr><td> line_Tension </td><td> гладкость линии </td><td> число </td><td> 0 - 1 </td></tr><tr><td> line_Thickness </td><td> толщина линии </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> line_UseFillColor </td><td> использовать цвет заливки под линией </td><td> логический </td><td> ложь Правда </td></tr><tr><td> line_FillColor </td><td> цвет заливки под линией </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> use_line_gradient_fill_color </td><td> использовать градиентный цвет заливки </td><td> логический </td><td> ложь Правда </td></tr><tr><td> line_gradient_fill_color </td><td> градиент цвета </td><td> массив [ <a href="#gradientcolor">градиентКолор</a> ] </td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}] </td></tr><tr><td> line_FillBetweenLines </td><td> заливка цвета до следующей / предыдущей строки </td><td> строка </td><td> «+1», «-1», «+2», ... </td></tr></tbody></table>

#### Графическая диаграмма spfeicifc
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> barIsStacked </td><td> сложенный бар </td><td> логический </td><td> ложь Правда </td></tr><tr><td> barStackId </td><td> идентификатор стека. Бар, который должен объединяться в стек, должен иметь одинаковый идентификатор </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> barColorHover </td><td> цвет при наведении </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> barBorderColor </td><td> цвет границы бара </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> barBorderWidth </td><td> толщина барной границы </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> barBorderColorHover </td><td> цвет рамки при наведении курсора </td><td> цвет | массив [цвет] </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> barBorderWidthHover </td><td> колебание границы бара </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table>

#### График у-оси
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> yAxis_id </td><td> идентификатор оси Y. Если вы хотите использовать общую ось Y для данных графика умножения, используйте тот же идентификатор. </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_position </td><td> положение оси Y </td><td> строка </td><td> лево право </td></tr><tr><td> yAxis_show </td><td> показать ось Y </td><td> логический </td><td> ложь Правда </td></tr><tr><td> yAxis_title_text </td><td> название оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_title_color </td><td> переопределить цвет заголовка оси Y </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> yAxis_title_fontFamily </td><td> переопределить семейство шрифтов заголовка оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_title_fontSize </td><td> переопределить размер шрифта заголовка оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_min </td><td> минимальное значение оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_max </td><td> максимальное значение оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_step </td><td> шаги по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_minimumDigits </td><td> минимальное количество десятичных знаков по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_maximumDigits </td><td> максимальное количество десятичных знаков по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_maxSteps </td><td> максимальные шаги оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_distance </td><td> переопределить значение оси Y расстояние до оси </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_appendix </td><td> добавить текст к значению оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_color </td><td> переопределить цвет значения оси Y </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> yAxis_fontFamily </td><td> переопределить семейство шрифтов значения оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_fontSize </td><td> переопределить размер шрифта значения оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_zeroLineWidth </td><td> ширина нулевой линии оси Y </td><td> число </td><td> 0,3, 1,5, 4, ... </td></tr><tr><td> yAxis_zeroLineColor </td><td> Цвет нулевой линии оси Y </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> yAxis_gridLines_show </td><td> показать линии сетки по оси Y </td><td> логический </td><td> ложь Правда </td></tr><tr><td> yAxis_gridLines_color </td><td> цвет линий сетки по оси Y </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr><tr><td> yAxis_gridLines_lineWidth </td><td> ширина линий сетки </td><td> число </td><td> 0 - 1 </td></tr><tr><td> yAxis_gridLines_border_show </td><td> показать границу линий сетки по оси Y </td><td> логический </td><td> ложь Правда </td></tr><tr><td> yAxis_gridLines_ticks_show </td><td> показывать отметки интервала сетки по оси Y </td><td> логический </td><td> ложь Правда </td></tr><tr><td> yAxis_gridLines_ticks_length </td><td> длина тиков сетки по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table>

#### Градиент цвета
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> ценность </td><td> значение, где должен применяться цвет </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> цвет </td><td> цвет для значения </td><td> цвет </td><td> hex (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0.5) </td></tr></tbody></table>

### Диаграмма с осью времени
Диаграмма JSON поддерживает данные с меткой времени. Чтобы использовать это, массив данных должен иметь значения для отметки времени (значение по оси X) и значения (значение по оси Y).

#### Значения с отметкой времени
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> T </td><td> отметка времени - значение xAxis </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> Y </td><td> значение для отметки времени - значение yAxis </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table>

#### Настройки оси x для данных с отметкой времени
<table><thead><tr><th> Имущество </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> xAxis_bounds </td><td> масштабная граничная стратегия <br><br> «данные»: убедитесь, что данные полностью видны, внешние метки удалены <br> &#39;галочки&#39;: убедитесь, что галочки полностью видны, данные снаружи усечены </td><td> строка </td><td> данные, галочки </td></tr><tr><td> xAxis_timeFormats </td><td> форматы времени для оси X </td><td> объект </td><td> Форматы времени должны быть введены для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a> <br> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td> xAxis_tooltip_timeFormats </td><td> форматы времени для оси X </td><td> строка </td><td> Утвержденные форматы времени должны быть введены в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr></tbody></table>

## Таблица
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

##### Входные данные
Входные данные должны быть массивом json объектов, например:

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
	},
	{
		"img": "/vis.0/myImages/erlebnis_25.png",
		"name": "MusicCast - Esszimmer (WX-030)",
		"betriebszeit": "1h 57m",
		"funk": "2G",
		"ip": "10.0.0.4"
	},
	{
		"img": "/vis.0/myImages/erlebnis_75.png",
		"name": "MusicCast - K�che (ISX-18D)",
		"betriebszeit": "4h 10m",
		"funk": "2G",
		"ip": "10.0.0.5"
	}
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
* [ical адаптер] (https://forum.iobroker.net/topic/29658/material-design-widgets-table-widget/2)

## Отзывчивый макет
Есть два виджета - Masonry Views и Grid Views - с помощью которых можно создать отзывчивый макет (макет для настольного компьютера, планшета и мобильного устройства). В оба виджета встроено несколько `view in widget`.

### Masonry Views
В Masonry Views встроено несколько `view in widget`, которые будут упорядочены автоматически в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Масонские виды особенно полезны, если представленные виды имеют разную высоту.

<b>Взгляните на [Пример проекта Виджетов Материалов](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/masnory.gif)

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/masonry_resolution_settings.png"></td><td colspan=2> В зависимости от ширины виджета, количество столбцов и расстояние между представлениями могут быть установлены. Настройки могут быть установлены независимо для портретного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках. </td></tr><tr><td><img src="doc/en/media/masnory_settings_views.png"></td><td> ширина обзора [х] </td><td> Определите ширину вида. Допустимые значения: число, px,% или calc. Примеры: <code>100</code> , <code>100px</code> , <code>55%</code> , <code>calc(60% - 12px)</code> </td></tr></tbody></table>

### Виды сетки
Виды сетки имеют несколько `view in widget` интегрированных, которые будут упорядочены автоматически в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Виды сетки особенно полезны, если включенные виды имеют одинаковую высоту.

<b>Виджет Grid View имеет в общей сложности 12 столбцов. Если вы хотите, чтобы представление имело ширину 4 столбца, вы должны установить для диапазона столбцов значение 4 в соответствующем представлении [x]</b>

<b>Взгляните на [Пример проекта Виджетов Материалов](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/grid.gif)

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/grid_settings_resolution.png"></td><td colspan=2> В зависимости от ширины виджета определяется, из какой ширины виджета могут применяться правила для диапазона столбцов отдельных представлений [x] и расстояния между представлениями. Настройки могут быть установлены независимо для портретного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках. </td></tr><tr><td><img src="doc/en/media/grid_settings_view.png"></td><td colspan=2> Определите диапазон столбцов вида в зависимости от текущего правила разрешения ширины. <br> Здесь вы также можете указать, должно ли представление отображаться только с разрешением выше или ниже определенного значения или оно должно отображаться через идентификатор объекта. </td></tr></tbody></table>

## Оповещения
Виджет оповещений можно использовать, например, для отображения сообщений в VIS, как это работает с адаптером pushover, но непосредственно в VIS.

![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/alerts.gif)

Для виджета «Оповещения» в качестве объекта требуется строка JSON, которая должна иметь следующую структуру:

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

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/alerts_settings.png"></td><td> Число столбцов </td><td> определить количество столбцов </td></tr><tr><td> Идентификатор объекта </td><td> Объект должен быть строкой json, структура которой должна быть описана выше </td></tr><tr><td> Максимум. Оповещения </td><td> максимальное количество предупреждений, которые должны быть показаны. </td></tr></tbody></table>

С помощью следующего скрипта вы можете отправлять простые сообщения в точку данных, которая используется виджетом Alerts.
Скрипт должен быть включен в глобальные скрипты. Тогда можно отправить сообщение следующей командой

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

## Календарь
![логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/calendar.gif)

Для виджета Календарь в качестве объекта требуется строка JSON, которая должна быть структурирована следующим образом:

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

Только hex и rgba могут использоваться как цвета!

Настройки, которые не перечислены в таблице ниже, говорят сами за себя.

<table><thead><tr><th> Скриншот </th><th> настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/calendar_layout.png"></td><td> дни недели, которые будут показаны </td><td> Указывает, какие дни недели отображать. Для отображения только с понедельника по пятницу можно использовать значения <code>1, 2, 3, 4, 5</code> . Для отображения недели, начинающейся в понедельник, можно использовать значения <code>1, 2, 3, 4, 5, 6, 0</code> . </td></tr><tr><td> Идентификатор объекта </td><td> Объект должен быть строкой json, структура которой должна быть описана выше </td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_timeaxis.png"></td><td> час начала </td><td> Час, с которого встречи должны отображаться в представлении недели и дня. </td></tr><tr><td> последний час </td><td> Час, до которого встречи должны отображаться в представлении недели и дня </td></tr></tbody></table>

Если вы хотите использовать виджет с [ical адаптер](https://github.com/iobroker-community-adapters/ioBroker.ical), вы можете использовать следующий скрипт для преобразования объекта ical в работу с виджетом.

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

## Changelog

### __WORK IN PROGRESS__
* table: option for fixed table headline added

### 0.3.6 (2020-04-29)
* Input, Select, Autocomplete: default input controll buttons removed
* vuetify library updated to v2.2.26 
* JSON Chart: auto mode to show values added
* Line History Chart: auto mode to show values added
* Bar Chart: auto mode to show values added
* Pie Chart: auto mode to show values added
* Button State: lock icon input field bug fix

### 0.3.4 (2020-04-27)
* Select / AutoComplete Widget: Breaking Changes !!! separator for valuelist changed from comma to semicolon
* Pie Chart Widget: support for json string implemented
* Browser Edge: gradient color bug fix

### 0.3.3
* (Scrounger): css file bug fixes
* (Scrounger): Material Design Icons library updated to v5.1.45

### 0.3.2
* (Scrounger): Select & Autocomplete Widget: color option for menu items added
* (Scrounger): setState type bug fixes
* (Scrounger): small bug fixes

### 0.3.0
* (Scrounger): JSON Chart: error handling added
* (Scrounger): IconList: error handling added
* (Scrounger): Line History chart: debug mode & error handling added
* (Scrounger): Select Widget: handling for object with mulitstate added
* (Scrounger): Autocomplete Widget: handling for object with mulitstate added
* (Scrounger): bug fixes

### 0.2.76
* (Scrounger): deprecated Widgets Slider, TopAppBar, Select, Column View removed
* (Scrounger): JSON Chart Widget added
* (Scrounger): Line Chart Widget: starttime by object added
* (Scrounger): Bar Chart Widget: support for json string oid added
* (Scrounger): Chart Widget: min / max decimals for axis, labels and tooltip added
* (Scrounger): Masonry View Widget: sort order added
* (Scrounger): Grid View Widget: sort order added
* (Scrounger): new Dialog Widget added
* (Scrounger): bug fixes

### 0.2.66
* (Scrounger): IconListWidget: button layout options added
* (Scrounger): IconListWidget: lock option for toggle and state function added
* (Scrounger): Alert Widget: visibility depending on resoltuion added
* (Scrounger): Button Widgets: lock option for toggle and state button added
* (Scrounger): Material Design Icon Widget added
* (Scrounger): bug fixes

### 0.2.62
* (Scrounger): List Widget: binding bug fix
* (Scrounger): Select Widget: number bug fix
* (Scrounger): IconList Widget: object id for json string added, html input field removed from editor
* (Scrounger): Input Widget: clear & null bug fix
* (Scrounger): bug fixes

### 0.2.59
* (Scrounger): Buttons Toggle: option for push function added
* (Scrounger): IconList Widget added
* (Scrounger): Alerts Widget: show dummy message in Editor
* (Scrounger): Grid Views Widget added
* (Scrounger): List Widget: color option for switch added
* (Scrounger): List Widget: dynamic generate item using json string
* (Scrounger): Masonry Views Widget: visible condition added
* (Scrounger): Calendar Widget added
* (Scrounger): translation added
* (Scrounger): VIS Editor: Link to Forum widget threads added
* (Scrounger): bug fixes

### 0.2.49
* (Scrounger): new Select Widget added
* (Scrounger): Autocomplete Widget added
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

Copyright (c) 2020 Scrounger <scrounger@gmx.net>

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