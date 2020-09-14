---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: 9eTag9/axNzvo0pHgTg0FbP0TuCXUz70Ao2qOphxskE=
---
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png)

![стабильная версия](http://iobroker.live/badges/vis-materialdesign.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![Количество установок](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.vis-materialdesign.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Scrounger/ioBroker.vis-materialdesign/master.svg)

# IoBroker.vis-materialdesign
## Виджеты Material Design для ioBroker VIS
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Виджеты ioBroker Material Design основаны на [Рекомендации Google по материальному дизайну](https://material.io/design/). Адаптер использует следующие библиотеки:

* [Материальные компоненты Google для Интернета] (https://github.com/material-components/material-components-web)
* [Vuetify] (https://github.com/vuetifyjs/vuetify)
* [chartjs] (https://www.chartjs.org/)
* [круглый слайдер от thomasloven] (https://github.com/thomasloven/round-slider)
* [Значки дизайна материалов] (https://materialdesignicons.com/)

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях времени выполнения и ошибках кода, вызванных виджетами.

При первой загрузке среды выполнения vis создается файл `./iobroker-data/files/vis.0/materialdesign.sentry`. Этот файл содержит анонимный идентификатор (так называемый uuid), который позволяет разработчику определить, возникает ли ошибка только у одного или нескольких пользователей.

<b>Чтобы отключить</b> охрану, в файле `/iobroker-data/files/vis.0/materialdesign.sentry` необходимо ввести слово «отключено». <br> Чтобы проверить, отключен ли часовой, откройте консоль браузера и найдите `sentry is deactivated for vis-materialdesign`.

## Интернет-пример проекта
предоставлено [iobroker.click](https://iobroker.click/index.html), спасибо bluefox и iobroker.

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS Runtime</a> ( <a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">Редактор VIS</a> ( <a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )

## Практические примеры
* [Просмотр погоды] (https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view)
* [Статус сценария] (https://forum.iobroker.net/topic/30662/material-design-widgets-skript-status)
* [Статус адаптера] (https://forum.iobroker.net/topic/30661/material-design-widgets-adapter-status)
* [Статус UniFi Netzwerk] (https://forum.iobroker.net/topic/30875/material-design-widgets-unifi-netzwerk-status)

## Вопросы и ответы о виджетах
Если у вас есть вопросы по отдельным виджетам, сначала просмотрите темы отдельных виджетов.

* [Немецкие темы] (https://forum.iobroker.net/search?term=Material%20Design%20Widgets%3A&in=titles&matchWords=all&by%5B%5D=Scrounger&categories%5B%5D=7&sortBy=topic.title&sortDshoirection=desc темы)

### Поддерживаемый браузер
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

### Поддерживаемый браузер для функции вибрации на мобильных устройствах
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

### Приложение ioBroker VIS
не работает в данный момент, необходимо реализовать в приложении, см. https://github.com/ioBroker/ioBroker.vis.cordova

## Значки и изображения Material Design
<table><thead><tr><th> Скриншот </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/material-icons.png"></td><td> Некоторые виджеты поддерживают библиотеку <a href="https://materialdesignicons.com/" target="_blank">иконок Material Design</a> . Вы можете нарисовать значок из списка выше или открыть средство выбора изображений, нажав кнопку справа от поля ввода. <br><br> <b>Цвета изображения применимы только к значкам материального дизайна, а не к изображению!</b> </td></tr></tbody></table>

## Кнопки
### Кнопка переключения
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

### Значок кнопки
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

## Открытка
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

## Список
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

## IconList
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/iconList.gif)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/iconList_settings_common.png"></td><td> метод ввода данных списка </td><td> Данные для IconList можно ввести через редактор или использовать строку JSON. </td></tr><tr><td> JSON-String: идентификатор объекта </td><td> Идентификатор объекта точки данных со строкой JSON. Строка JSON должна иметь следующий формат: <pre> <code> [ { &quot;background&quot;: &quot;red&quot;, &quot;text&quot;: &quot;text1&quot;, &quot;subText&quot;: &quot;number&quot;, &quot;image&quot;: &quot;harddisk&quot;, &quot;imageColor&quot;: &quot;#ec0909&quot;, &quot;imageActive&quot;: &quot;folder&quot;, &quot;imageActiveColor&quot;: &quot;#5ad902&quot;, &quot;buttonBackgroundColor&quot;: &quot;&quot;, &quot;buttonBackgroundActiveColor&quot;: &quot;&quot;, &quot;listType&quot;: &quot;buttonState&quot;, &quot;objectId&quot;: &quot;0_userdata.0.iconList.buttonState.number&quot;, &quot;buttonStateValue&quot;: &quot;60&quot;, &quot;buttonNavView&quot;: &quot;&quot;, &quot;buttonLink&quot;: &quot;&quot;, &quot;buttonToggleValueTrue&quot;: &quot;&quot;, &quot;buttonToggleValueFalse&quot;: &quot;&quot;, &quot;valueAppendix&quot;: &quot;&quot;, &quot;showValueLabel&quot;: &quot;true&quot;, &quot;statusBarColor&quot;: &quot;green&quot;, &quot;lockEnabled&quot;: &quot;false&quot; }, { &quot;background&quot;: &quot;green&quot;, &quot;text&quot;: &quot;text0&quot;, &quot;subText&quot;: &quot;bool&quot;, &quot;image&quot;: &quot;home&quot;, &quot;imageColor&quot;: &quot;#44739e&quot;, &quot;imageActive&quot;: &quot;home&quot;, &quot;imageActiveColor&quot;: &quot;#44739e&quot;, &quot;buttonBackgroundColor&quot;: &quot;&quot;, &quot;buttonBackgroundActiveColor&quot;: &quot;#a0f628&quot;, &quot;listType&quot;: &quot;buttonToggle&quot;, &quot;objectId&quot;: &quot;0_userdata.0.iconList.buttonToggle.bool0&quot;, &quot;buttonStateValue&quot;: &quot;60&quot;, &quot;buttonNavView&quot;: &quot;&quot;, &quot;buttonLink&quot;: &quot;&quot;, &quot;buttonToggleValueTrue&quot;: &quot;&quot;, &quot;buttonToggleValueFalse&quot;: &quot;&quot;, &quot;valueAppendix&quot;: &quot;&quot;, &quot;showValueLabel&quot;: &quot;false&quot;, &quot;statusBarColor&quot;: &quot;&quot;, &quot;lockEnabled&quot;: &quot;false&quot; } ]</code> </pre> Свойство <code>listType</code> может иметь следующие значения: <br> <code>text, buttonState, buttonToggle, buttonToggleValueTrue, buttonToggleValueFalse, buttonNav, buttonLink</code> </td> </tr></tbody></table>

## Прогресс
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/progress_settings.png"></td><td> специальный ярлык </td><td> Для пользовательской метки вы можете использовать свойство <code>[#value]</code> чтобы показать реальное значение точки данных. Чтобы показать текущий процент, вы можете использовать <code>[#percent]</code> </td></tr></tbody></table>

## Слайдер
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td> initDelay </td><td> Если ползунок не отображается или не работает после загрузки среды выполнения, то это значение необходимо увеличить. Ввод осуществляется за миллисекунды. <br> Например, увеличивайте на 250 шагов, пока ползунок не заработает. </td></tr></tbody></table>

## Круглый слайдер
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

## Флажок
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/checkbox.gif)

## Переключатель
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

## Ввод
### Ввод текста
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/input.gif)

### Выбрать
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/select.gif)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Есть три метода определения данных меню. Во-первых, нужно определить его через редактор. Во-вторых, определить его через строку json. Третий метод - определить его тремя списками для значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Способ ввода данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню можно определить в пункте меню [x]. </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON для определения записей меню или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br><pre> <code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot;, &quot;iconColorSelectedTextField&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code> </pre> </td></tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены для точки данных. Записи должны разделяться запятыми. </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны разделяться запятыми. </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите соответствующие значки значений. Записи должны разделяться запятыми. Вы можете использовать путь к изображению или название значков дизайна материалов </td></tr></tbody></table>

### Автозаполнение
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/autocomplete.gif)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню </td><td> Есть три метода определения данных меню. Во-первых, нужно определить его через редактор. Во-вторых, определить его через строку json. Третий метод - определить его тремя списками для значений, меток и значков. </td></tr><tr><td> Редактор: количество пунктов меню </td><td> Способ ввода данных меню: через редактор <br> Определите количество пунктов меню. Отдельные пункты меню можно определить в пункте меню [x]. </td></tr><tr><td> Строка JSON </td><td> Метод данных меню: строка json <br> Здесь вы можете добавить строку JSON для определения записей меню или использовать привязки к точке данных, содержащей строку JSON. <br><br> Строка JSON должна иметь следующий формат: <br><pre> <code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code> </pre> </td></tr><tr><td> список значений </td><td> Метод данных меню: список значений <br> Определите количество пунктов меню, добавив значения, которые будут установлены для точки данных. Записи должны разделяться запятыми. </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите связанные метки значений. Записи должны разделяться запятыми. </td></tr><tr><td> список значений: метки </td><td> Метод данных меню: список значений <br> Определите соответствующие значки значений. Записи должны разделяться запятыми. Вы можете использовать путь к изображению или название значков дизайна материалов </td></tr></tbody></table>

## Верхняя панель приложения с навигационным ящиком
Верхнюю панель приложения с навигационным ящиком можно объединить с <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">представлением в виджете 8</a> .

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

##### Макет модальный:
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

##### Макет постоянный:
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/topappbar_settings.png"></td><td> ID объекта </td><td> должен быть установлен на точку данных от типового номера. Например, эта точка данных может использоваться <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">представлением в виджете 8.</a> </td></tr><tr><td> показать индекс элементов навигации </td><td> показывает индекс навигации перед меткой элемента. Этот номер можно использовать в <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">представлении в виджете 8</a> для определения представления, которое должно отображаться, если элемент выбран. </td></tr><tr><td> количество элементов навигации </td><td> Определите количество элементов навигации </td></tr></tbody></table>

### Подменю
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td><td> количество подменю [x] </td><td> Определите, есть ли у элемента навигации подменю и количество подменю. </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td><td> ярлык [x] </td><td> Чтобы изменить текст элементов, вы должны поместить объект json в поле метки с индексом поля просмотра. <br> Пример: <br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Результат: см. Скриншот </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td><td> значок [x] </td><td> Чтобы изменить значки элементов, вы должны поместить объект json в поле значков с индексом поля просмотра. <br> Пример: <br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

Результат: см. Снимок экрана </td> </tr> </tbody> </table>

## Графики
### Гистограмма
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/barChart.png)

ДЕЛАТЬ

### Круговая диаграмма
ДЕЛАТЬ

### График истории линий:
> Требуемый адаптер: [SQL] (https://github.com/ioBroker/ioBroker.sql), [История] (https://github.com/ioBroker/ioBroker.history) или [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_general.png"></td><td> экземпляр адаптера </td><td> Экземпляр для адаптера sql или истории </td></tr><tr><td> управление временным интервалом с помощью объекта </td><td> Идентификатор точки данных для изменения временного интервала графика. <br><br> Если точка данных относится к типу &#39;строка&#39;, она должна содержать <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">одно из связанных значений.</a> <br> Если точка данных относится к типу «число», она должна содержать начальную временную метку графика. <br><br> Например, вы можете использовать кнопку здесь, чтобы изменить отображение диаграммы во время выполнения. </td></tr><tr><td> логический объект для обновления </td><td> Идентификатор adatapoint для запуска обновления диаграммы вручную. <br> Например, вы можете использовать кнопку здесь, чтобы обновить диаграмму во время выполнения. </td></tr><tr><td> тайм-аут графика </td><td> тайм-аут загрузки данных диаграммы. Если вы получили сообщение об ошибке тайм-аута, увеличьте это значение </td></tr><tr><td> режим отладки </td><td> если у вас есть проблемы или ошибки, активируйте режим отладки и прикрепите данные журнала консоли (F12) к проблеме </td></tr><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_dataset.png"></td><td> Идентификатор объекта </td><td> идентификатор точки данных с активированным экземпляром для адаптера sql или истории </td></tr><tr><td> способ отображения </td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">ссылка на сайт</a> </td></tr><tr><td> Максимум. количество отображаемых точек данных </td><td> Максимальное количество точек данных для отображения </td></tr><tr><td> временной интервал между точками данных в [с] </td><td> Необязательная настройка, отменяет настройку «счетчик». <br> Расстояние между отдельными точками данных в секундах. <br> Например, если вы хотите отображать точки данных каждую минуту, вы должны ввести здесь 60 </td></tr><tr><td> данные умножаются на </td><td> Необязательная настройка, умножьте каждую точку данных на заданное значение </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> форматы времени оси x </td><td> Измените формат времени оси X. Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, допустимы следующие единицы времени.</a> <br> Утвержденные форматы времени необходимо вводить в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td> форматы времени всплывающей подсказки </td><td> Измените формат времени всплывающей подсказки. Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, допустимы следующие единицы времени.</a> <br> Утвержденные форматы времени необходимо вводить в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr></tbody></table>

### Диаграмма JSON
#### Общее
<table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> axisLabels </td><td> метка оси графика </td><td> Массив </td><td> числа или строка </td></tr><tr><td> графики </td><td> данные графиков </td><td> массив [ <a href="#graph">график</a> ] </td><td> см. график </td></tr></tbody></table>

#### График
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> данные </td><td> данные графика или данные с отметкой времени </td><td> Массив [числа] | Массив [ <a href="#data-with-time-axis">значения с отметкой времени</a> ] </td><td> число </td></tr><tr><td> тип </td><td> тип графика </td><td> строка </td><td> &#39;линия&#39;, &#39;полоса&#39; </td></tr><tr><td> legendText </td><td> текст легенды </td><td> строка </td><td></td></tr><tr><td> Отобразить заказ </td><td> порядок наложения графика </td><td> число </td><td> 1, 2, ... </td></tr><tr><td> цвет </td><td> цвет графика </td><td> цвет </td><td> шестнадцатеричный (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0,5) </td></tr><tr><td> use_gradient_color </td><td> использовать цвет градиента </td><td> логический </td><td> false true </td></tr><tr><td> gradient_color </td><td> массив цветов градиента </td><td> массив [ <a href="#gradientcolor">gradientColor</a> ] </td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}] </td></tr><tr><td> tooltip_title </td><td> заголовок всплывающей подсказки </td><td> строка </td><td></td></tr><tr><td> tooltip_text </td><td> ovveride текст всплывающей подсказки </td><td> строка </td><td></td></tr><tr><td> tooltip_MinDigits </td><td> максимальное количество знаков после запятой в значении подсказки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> tooltip_MaxDigits </td><td> максимальное количество знаков после запятой в значении подсказки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> tooltip_AppendText </td><td> добавить текст к значению всплывающей подсказки </td><td> строка </td><td></td></tr><tr><td> datalabel_show </td><td> показать метки данных для графика </td><td> строка | логический </td><td> ложь, истина, авто </td></tr><tr><td> datalabel_anchor </td><td> привязка меток данных </td><td> строка </td><td> центр, начало, конец </td></tr><tr><td> datalabel_align </td><td> положение метки данных относительно точки привязки </td><td> строка </td><td> влево, начало, центр, конец, вправо, вверх, вниз </td></tr><tr><td> datalabel_offset </td><td> расстояние (в пикселях), чтобы отвести метку данных от точки привязки </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_text_align </td><td> текстовое соответствие метки данных </td><td> строка </td><td> влево, начало, центр, конец, вправо </td></tr><tr><td> datalabel_rotation </td><td> угол поворота (в градусах) метки данных по часовой стрелке </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_steps </td><td> показывать метку данных каждые x шаг </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_minDigits </td><td> минимальное количество знаков после запятой в метках данных </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_maxDigits </td><td> максимальное количество знаков после запятой в метках данных </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> datalabel_append </td><td> добавить текст к метке данных </td><td> строка </td><td></td></tr><tr><td> datalabel_color </td><td> цвет метки данных </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0,5) </td></tr><tr><td> datalabel_fontFamily </td><td> семейство шрифтов метки данных </td><td> строка </td><td></td></tr><tr><td> datalabel_fontSize </td><td> размер шрифта метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> datalabel_backgroundColor </td><td> цвет фона метки данных </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), rgb (20, 50, 200), rgba (20, 50, 200, 0,5) </td></tr><tr><td> datalabel_borderColor </td><td> цвет границы метки данных </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> datalabel_borderWidth </td><td> ширина границы метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> datalabel_borderRadius </td><td> радиус границы метки данных </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table></details>

#### График график spfeicifc
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> line_pointStyle </td><td> точечный стиль линии </td><td> строка </td><td> круг, крест, crossRot, тире, линия, rect, rectRounded, rectRot, звезда, треугольник </td></tr><tr><td> line_pointSize </td><td> размер строки </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> line_pointSizeHover </td><td> размер строки </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> line_PointColor </td><td> цвет точки линии </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> line_PointColorBorder </td><td> цвет границы точки линии </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> line_PointColorHover </td><td> цвет наведения линии </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> line_PointColorBorderHover </td><td> цвет границы при наведении курсора на точку линии </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> line_spanGaps </td><td> рисовать линии, если в данных есть пробелы </td><td> логический </td><td> false true </td></tr><tr><td> line_steppedLine </td><td> включить ступенчатую линию </td><td> логический </td><td> false true </td></tr><tr><td> line_Tension </td><td> плавность линии </td><td> число </td><td> 0 - 1 </td></tr><tr><td> line_Thickness </td><td> толщина линии </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> line_UseFillColor </td><td> использовать цвет заливки под линией </td><td> логический </td><td> false true </td></tr><tr><td> line_FillColor </td><td> цвет заливки под линией </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> use_line_gradient_fill_color </td><td> использовать цвет градиентной заливки </td><td> логический </td><td> false true </td></tr><tr><td> line_gradient_fill_color </td><td> массив цветов градиента </td><td> массив [ <a href="#gradientcolor">gradientColor</a> ] </td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}] </td></tr><tr><td> line_FillBetweenLines </td><td> цвет заливки до следующей / предыдущей строки </td><td> строка </td><td> &#39;+1&#39;, &#39;-1&#39;, &#39;+2&#39;, ... </td></tr></tbody></table></details>

#### График гистограмма spfeicifc
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> barIsStacked </td><td> сложенный бар. Если у вас есть составная диаграмма (линия + столбик с накоплением), вы также должны установить это значение для линейного набора данных! </td><td> логический </td><td> false true </td></tr><tr><td> barStackId </td><td> идентификатор стека. Бар, который должен объединиться в стек, должен иметь одинаковый идентификатор </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> barColorHover </td><td> цвет панели при наведении </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> barBorderColor </td><td> цвет границы полосы </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> barBorderWidth </td><td> толщина бордюра </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> barBorderColorHover </td><td> цвет границы при наведении курсора </td><td> цвет | массив [цвета] </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> barBorderWidthHover </td><td> толщина границы бара </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table></details>

#### График оси Y
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> yAxis_id </td><td> id оси y. Если вы хотите использовать общую ось Y для данных графика умножения, используйте тот же идентификатор. </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_position </td><td> положение оси Y </td><td> строка </td><td> лево право </td></tr><tr><td> yAxis_show </td><td> показать ось Y </td><td> логический </td><td> false true </td></tr><tr><td> yAxis_title_text </td><td> заголовок оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_title_color </td><td> переопределить цвет заголовка оси Y </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> yAxis_title_fontFamily </td><td> переопределить семейство шрифтов заголовка оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_title_fontSize </td><td> переопределить размер шрифта заголовка оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_min </td><td> минимальное значение оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_max </td><td> максимальное значение оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_step </td><td> шаги оси y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_minimumDigits </td><td> Минимальное количество десятичных знаков по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_maximumDigits </td><td> Максимальное количество десятичных знаков по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_maxSteps </td><td> максимальные шаги по оси y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_distance </td><td> переопределить значение оси Y расстояние до оси </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_appendix </td><td> добавить текст к значению оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_color </td><td> переопределить цвет значения оси Y </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> yAxis_fontFamily </td><td> переопределить семейство шрифтов значения оси Y </td><td> строка </td><td></td></tr><tr><td> yAxis_fontSize </td><td> переопределить размер шрифта значения оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> yAxis_zeroLineWidth </td><td> ширина нулевой линии по оси Y </td><td> число </td><td> 0,3, 1,5, 4, ... </td></tr><tr><td> yAxis_zeroLineColor </td><td> цвет нулевой линии оси Y </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> yAxis_gridLines_show </td><td> показать линии сетки по оси Y </td><td> логический </td><td> false true </td></tr><tr><td> yAxis_gridLines_color </td><td> цвет линий сетки по оси Y </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> yAxis_gridLines_lineWidth </td><td> ширина линий сетки </td><td> число </td><td> 0 - 1 </td></tr><tr><td> yAxis_gridLines_border_show </td><td> показать границу линий сетки по оси Y </td><td> логический </td><td> false true </td></tr><tr><td> yAxis_gridLines_ticks_show </td><td> показать отметки интервала сетки по оси Y </td><td> логический </td><td> false true </td></tr><tr><td> yAxis_gridLines_ticks_length </td><td> длина штрихов сетки по оси Y </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table></details>

#### GradientColor
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> стоимость </td><td> значение, в котором следует применить цвет </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> цвет </td><td> цвет для значения </td><td> цвет </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></tbody></table></details>

### Диаграмма с временной осью
JSON Chart поддерживает данные с отметкой времени. Чтобы использовать это, массив данных должен иметь значения для отметки времени (значение оси X) и значения (значение оси Y).

#### Значения с отметкой времени
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> т </td><td> timestamp - значение xAxis </td><td> число </td><td> 1, 2, 5, ... </td></tr><tr><td> y </td><td> значение для отметки времени - значение yAxis </td><td> число </td><td> 1, 2, 5, ... </td></tr></tbody></table></details>

#### Настройки оси X для данных с отметкой времени
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> xAxis_bounds </td><td> стратегия границы масштаба <br><br> &#39;data&#39;: обеспечивает полную видимость данных, внешние ярлыки удаляются <br> &#39;ticks&#39;: проверяет, что галочки полностью видны, данные за пределами усекаются </td><td> Строка </td><td> данные, тики </td></tr><tr><td> xAxis_timeFormats </td><td> форматы времени для оси x </td><td> Объект </td><td> Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, допустимы следующие единицы времени.</a> <br> Утвержденные форматы времени необходимо вводить в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td> xAxis_tooltip_timeFormats </td><td> форматы времени для оси x </td><td> Строка </td><td> Утвержденные форматы времени необходимо вводить в соответствии с библиотекой moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a> </td></tr><tr><td> xAxis_time_unit </td><td> установить формат времени для оси x </td><td> Строка </td><td> допустимы следующие единицы, <a href="https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units">см. ссылку</a> </td></tr></tbody></table></details>

## Стол
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

### Входные данные
Входные данные должны быть массивом объектов json, например:

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

#### Элементы управления
Для создания элемента управления (кнопки, флажка и т. Д.) В ячейке таблицы необходимо создать объект вместо строки.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_control_example.gif)

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

##### Создать редактором
Вы можете легко создавать элементы управления с помощью редактора. Просто создайте поддерживаемый виджет, настройте его в редакторе и экспортируйте настройки, скопировав и вставив его в таблицу.
Взгляните на анимированный снимок экрана ниже:

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_controls.gif)

##### Общее
<table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> тип </td><td> тип элемента управления </td><td> строка </td><td><ul><li> <a href="#button-toggle-1">buttonToggle</a> </li><li> <a href="#button-toggle-vertical">buttonToggle_vertical</a> </li><li> <a href="#button-toggle-icon">buttonToggle_icon</a> </li><li> <a href="#button-state">buttonState</a> </li><li> <a href="#button-state-vertical">buttonState_vertical</a> </li><li> <a href="#button-state-icon">buttonState_icon</a> </li><li> <a href="#button-link">buttonLink</a> </li><li> <a href="#button-link-vertical">buttonLink_vertical</a> </li><li> <a href="#button-link-icon">buttonLink_icon</a> </li><li> <a href="#progress-1">прогресс</a> </li><li> <a href="#progress-circular">progress_circular</a> </li><li> <a href="#slider-1">слайдер</a> </li><li> <a href="#slider-round">slider_round</a> </li><li> <a href="#switch-1">переключатель</a> </li><li> <a href="#checkbox-1">флажок</a> </li><li> <a href="#textfield">текстовое поле</a> </li><li> <a href="#select-1">Выбрать</a> </li><li> <a href="#autocomplete-1">автозаполнение</a> </li></ul></td></tr><tr><td> ширина </td><td> ширина элемента управления в% или пикселях </td><td> строка </td><td> 100% | 100 пикселей </td></tr><tr><td> рост </td><td> высота элемента управления в% или пикселях </td><td> строка </td><td> 100% | 100 пикселей </td></tr><tr><td> гребень </td><td> ячейка, занимающая x строк </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> Colspan </td><td> ячейка, охватывающая x столбцов </td><td> число </td><td> 1, 2, 3, ... </td></tr><tr><td> verticalAlign </td><td> вертикальное выравнивание </td><td> строка </td><td> наверх | средний | низ </td></tr><tr><td> cellStyleAttrs </td><td> Атрибуты стиля css для ячейки </td><td> строка </td><td> ... </td></tr></tbody></table>

##### Кнопка переключения
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> только для чтения </td><td> только чтение </td><td> логический </td><td> ложь | правда </td></tr><tr><td> toggleType </td><td> тип переключения </td><td> строка </td><td> логическое | стоимость </td></tr><tr><td> нажать кнопку </td><td> нажать кнопку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueOff </td><td> значение для выкл. </td><td> строка </td><td/></tr><tr><td> valueOn </td><td> значение для </td><td> строка </td><td/></tr><tr><td> stateIfNotTrueValue </td><td> указать, если значение не равно условию &quot;включено&quot; </td><td> строка </td><td> на | выключен </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> labelTrue </td><td> Ярлык верно </td><td> строка </td><td/></tr><tr><td> labelColorFalse </td><td> цвет этикетки </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorTrue </td><td> цвет активной метки </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelWidth </td><td> ширина текста </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> imageTrue </td><td> активное изображение </td><td> обычай </td><td/></tr><tr><td> imageTrueColor </td><td> цвет активного изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> слева | право </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> colorBgFalse </td><td> задний план </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorBgTrue </td><td> активный фон </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Кнопка переключения по вертикали
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> только для чтения </td><td> только чтение </td><td> логический </td><td> ложь | правда </td></tr><tr><td> toggleType </td><td> тип переключения </td><td> строка </td><td> логическое | стоимость </td></tr><tr><td> нажать кнопку </td><td> нажать кнопку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueOff </td><td> значение для выкл. </td><td> строка </td><td/></tr><tr><td> valueOn </td><td> значение для </td><td> строка </td><td/></tr><tr><td> stateIfNotTrueValue </td><td> указать, если значение не равно условию &quot;включено&quot; </td><td> строка </td><td> на | выключен </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> labelTrue </td><td> Ярлык верно </td><td> строка </td><td/></tr><tr><td> labelColorFalse </td><td> цвет этикетки </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorTrue </td><td> цвет активной метки </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> imageTrue </td><td> активное изображение </td><td> обычай </td><td/></tr><tr><td> imageTrueColor </td><td> цвет активного изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> наверх | низ </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> colorBgFalse </td><td> задний план </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorBgTrue </td><td> активный фон </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> расстояние символа сверху [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> расстояние символа слева [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Значок кнопки переключения
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> только для чтения </td><td> только чтение </td><td> логический </td><td> ложь | правда </td></tr><tr><td> toggleType </td><td> тип переключения </td><td> строка </td><td> логическое | стоимость </td></tr><tr><td> нажать кнопку </td><td> нажать кнопку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueOff </td><td> значение для выкл. </td><td> строка </td><td/></tr><tr><td> valueOn </td><td> значение для </td><td> строка </td><td/></tr><tr><td> stateIfNotTrueValue </td><td> указать, если значение не равно условию &quot;включено&quot; </td><td> строка </td><td> на | выключен </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> imageTrue </td><td> активное изображение </td><td> обычай </td><td/></tr><tr><td> imageTrueColor </td><td> цвет активного изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> colorBgFalse </td><td> задний план </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorBgTrue </td><td> активный фон </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> расстояние символа сверху [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> расстояние символа слева [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockIconBackground </td><td> цвет фона значка замка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockBackgroundSizeFactor </td><td> коэффициент роста размера фона </td><td> число </td><td/></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Состояние кнопки
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> стоимость </td><td> стоимость </td><td> строка </td><td/></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelWidth </td><td> ширина текста </td><td> число </td><td/></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> слева | право </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Состояние кнопки Вертикальное
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> стоимость </td><td> стоимость </td><td> строка </td><td/></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> наверх | низ </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> расстояние символа сверху [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> расстояние символа слева [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Значок состояния кнопки
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> стоимость </td><td> стоимость </td><td> строка </td><td/></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> включить блокировку </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> автоматическая блокировка через [с] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> значок </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> расстояние символа сверху [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> расстояние символа слева [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockIconBackground </td><td> цвет фона значка замка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockBackgroundSizeFactor </td><td> коэффициент роста размера фона </td><td> число </td><td/></tr><tr><td> lockFilterGrayscale </td><td> серый фильтр, если заблокирован </td><td> число </td><td/></tr></tbody></table></details>

##### Кнопка Ссылка
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> href </td><td> Ссылка на сайт </td><td> url </td><td/></tr><tr><td> openNewWindow </td><td> открыть в новом окне </td><td> логический </td><td> ложь | правда </td></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelWidth </td><td> ширина текста </td><td> число </td><td/></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> слева | право </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr></tbody></table></details>

##### Кнопка ссылки по вертикали
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> buttonStyle </td><td> стиль кнопки </td><td> строка </td><td> текст | поднял | не повышенный | очерченный </td></tr><tr><td> href </td><td> Ссылка на сайт </td><td> url </td><td/></tr><tr><td> openNewWindow </td><td> открыть в новом окне </td><td> логический </td><td> ложь | правда </td></tr><tr><td> текст кнопки </td><td> Текст кнопки </td><td> строка </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconPosition </td><td> положение изображения </td><td> строка </td><td> наверх | низ </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr></tbody></table></details>

##### Значок кнопки ссылки
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> href </td><td> Ссылка на сайт </td><td> url </td><td/></tr><tr><td> openNewWindow </td><td> открыть в новом окне </td><td> логический </td><td> ложь | правда </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> образ </td><td> Образ </td><td> обычай </td><td/></tr><tr><td> imageColor </td><td> цвет изображения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> iconHeight </td><td> высота изображения </td><td> число </td><td/></tr><tr><td> colorPress </td><td> цвет нажат </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></tbody></table></details>

##### Прогресс
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td></td></tr><tr><td> мин </td><td> мин </td><td> строка </td><td></td></tr><tr><td> Максимум </td><td> Максимум </td><td> строка </td><td></td></tr><tr><td> обеспечить регресс </td><td> Обратное значение </td><td> логический </td><td> ложь | правда </td></tr><tr><td> прогресс </td><td> закругленные углы </td><td> логический </td><td> ложь | правда </td></tr><tr><td> прогрессПолосатый </td><td> в полоску </td><td> логический </td><td> ложь | правда </td></tr><tr><td> progressStripedColor </td><td> progressStripedColor </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorProgressBackground </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorProgress </td><td> цвет прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorOneCondition </td><td> условие для прогресса цвета 1 [&gt;] </td><td> строка </td><td></td></tr><tr><td> colorOne </td><td> цвет 1 прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorTwoCondition </td><td> условие прохождения цвета 2 [&gt;] </td><td> строка </td><td></td></tr><tr><td> цвет: два </td><td> цвет 2 прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showValueLabel </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueLabelStyle </td><td> значение стиля подписи </td><td> строка </td><td> progressPercent | progressValue | прогресс </td></tr><tr><td> valueLabelUnit </td><td> Ед. изм </td><td> строка </td><td></td></tr><tr><td> valueMaxDecimals </td><td> десятичные точки </td><td> число </td><td></td></tr><tr><td> valueLabelCustom </td><td> valueLabelCustom </td><td> строка </td><td></td></tr><tr><td> цвет текста </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> textFontSize </td><td> размер текста </td><td> число </td><td></td></tr><tr><td> textFontFamily </td><td> textFontFamily </td><td> строка </td><td></td></tr><tr><td> textAlign </td><td> textAlign </td><td> строка </td><td> начало | центр | конец </td></tr></tbody></table></details>

##### Информационный бюллетень
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> мин </td><td> мин </td><td> строка </td><td/></tr><tr><td> Максимум </td><td> Максимум </td><td> строка </td><td/></tr><tr><td> progressCircularSize </td><td> размер </td><td> число </td><td/></tr><tr><td> progressCircularWidth </td><td> толщина </td><td> число </td><td/></tr><tr><td> прогрессЦиркулярныйПоворот </td><td> повернуть начальную точку </td><td> число </td><td/></tr><tr><td> colorProgressBackground </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorProgress </td><td> цвет прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> innerColor </td><td> цвет фона круга </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorOneCondition </td><td> условие для прогресса цвета 1 [&gt;] </td><td> число </td><td/></tr><tr><td> colorOne </td><td> цвет 1 прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorTwoCondition </td><td> условие прохождения цвета 2 [&gt;] </td><td> число </td><td/></tr><tr><td> цвет: два </td><td> цвет 2 прогресс </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showValueLabel </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueLabelStyle </td><td> значение стиля подписи </td><td> строка </td><td> progressPercent | progressValue | прогресс </td></tr><tr><td> valueLabelUnit </td><td> Ед. изм </td><td> строка </td><td/></tr><tr><td> valueMaxDecimals </td><td> десятичные точки </td><td> число </td><td/></tr><tr><td> valueLabelCustom </td><td> valueLabelCustom </td><td> строка </td><td/></tr><tr><td> цвет текста </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> textFontSize </td><td> размер текста </td><td> число </td><td/></tr><tr><td> textFontFamily </td><td> textFontFamily </td><td> строка </td><td/></tr></tbody></table></details>

##### Слайдер
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td></td></tr><tr><td> рабочий </td><td> ID рабочего объекта </td><td> строка </td><td></td></tr><tr><td> ориентация </td><td> Ориентация </td><td> строка </td><td> горизонтальный | вертикальный </td></tr><tr><td> reverseSlider </td><td> инвертировать слайдер </td><td> логический </td><td> ложь | правда </td></tr><tr><td> knobSize </td><td> размер ручки </td><td> строка </td><td> knobSmall | knobMedium | ручкаБольшая </td></tr><tr><td> только для чтения </td><td> только чтение </td><td> логический </td><td> ложь | правда </td></tr><tr><td> мин </td><td> мин </td><td> строка </td><td></td></tr><tr><td> Максимум </td><td> Максимум </td><td> строка </td><td></td></tr><tr><td> шаг </td><td> шаги </td><td> строка </td><td></td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td></td></tr><tr><td> showTicks </td><td> показать шаги </td><td> строка </td><td> нет | да | всегда </td></tr><tr><td> tickSize </td><td> отображать размер шагов </td><td> число </td><td></td></tr><tr><td> tickLabels </td><td> текст шагов (через запятую) </td><td> строка </td><td></td></tr><tr><td> tickColorBefore </td><td> цвет перед регулятором </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> tickColorAfter </td><td> цвет после регулятора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorBeforeThumb </td><td> цвет перед регулятором </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorThumb </td><td> цвет регулятора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorAfterThumb </td><td> цвет после регулятора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandText </td><td> текст добавлен </td><td> строка </td><td></td></tr><tr><td> PrepandTextWidth </td><td> PrepandTextWidth </td><td> число </td><td></td></tr><tr><td> PrepandTextColor </td><td> цвет добавленного текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandTextFontSize </td><td> размер текста добавлен </td><td> число </td><td></td></tr><tr><td> PrepandTextFontFamily </td><td> шрифт текста добавлен </td><td> строка </td><td></td></tr><tr><td> showValueLabel </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueLabelStyle </td><td> значение стиля подписи </td><td> строка </td><td> sliderPercent | sliderValue </td></tr><tr><td> valueLabelUnit </td><td> Ед. изм </td><td> строка </td><td></td></tr><tr><td> valueLabelMin </td><td> текст для значения меньше min </td><td> строка </td><td></td></tr><tr><td> valueLabelMax </td><td> текст для значения больше min </td><td> строка </td><td></td></tr><tr><td> valueLessThan </td><td> условие &quot;меньше чем&quot; для текста значения </td><td> число </td><td></td></tr><tr><td> textForValueLessThan </td><td> текст для &quot;меньше чем&quot; </td><td> строка </td><td></td></tr><tr><td> valueGreaterThan </td><td> условие &#39;больше чем&#39; для текста значения </td><td> число </td><td></td></tr><tr><td> textForValueGreaterThan </td><td> текст для &quot;больше чем&quot; </td><td> строка </td><td></td></tr><tr><td> valueLabelWidth </td><td> метка расстояния </td><td> число </td><td></td></tr><tr><td> showThumbLabel </td><td> показать этикетку </td><td> строка </td><td> нет | да | всегда </td></tr><tr><td> thumbSize </td><td> размер этикетки </td><td> число </td><td></td></tr><tr><td> большой палецФонЦвет </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> thumbFontColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> thumbFontSize </td><td> размер шрифта </td><td> число </td><td></td></tr><tr><td> thumbFontFamily </td><td> шрифт </td><td> строка </td><td></td></tr><tr><td> useLabelRules </td><td> использовать правила текста </td><td> логический </td><td> ложь | правда </td></tr></tbody></table></details>

##### Ползунок Круглый
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> рабочий </td><td> ID рабочего объекта </td><td> строка </td><td/></tr><tr><td> мин </td><td> мин </td><td> строка </td><td/></tr><tr><td> Максимум </td><td> Максимум </td><td> строка </td><td/></tr><tr><td> шаг </td><td> шаги </td><td> строка </td><td/></tr><tr><td> только для чтения </td><td> Нур Лесенд </td><td> логический </td><td> ложь | правда </td></tr><tr><td> startAngle </td><td> начальный угол </td><td> число </td><td/></tr><tr><td> длина дуги </td><td> длина дуги </td><td> число </td><td/></tr><tr><td> sliderWidth </td><td> толщина слайдера </td><td> число </td><td/></tr><tr><td> handleSize </td><td> размер ручки </td><td> число </td><td/></tr><tr><td> handleZoom </td><td> ручка увеличения на контроле </td><td> число </td><td/></tr><tr><td> RTL </td><td> движение ползунка справа налево </td><td> логический </td><td> ложь | правда </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> colorSliderBg </td><td> задний план </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorBeforeThumb </td><td> цвет перед регулятором </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorThumb </td><td> цвет регулятора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorAfterThumb </td><td> цвет после регулятора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> valueLabelColor </td><td> цвет текста значения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showValueLabel </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> valueLabelVerticalPosition </td><td> положение значения по вертикали </td><td> число </td><td/></tr><tr><td> valueLabelStyle </td><td> значение стиля подписи </td><td> строка </td><td> sliderPercent | sliderValue </td></tr><tr><td> valueLabelUnit </td><td> Ед. изм </td><td> строка </td><td/></tr><tr><td> valueLabelMin </td><td> текст для значения меньше min </td><td> строка </td><td/></tr><tr><td> valueLabelMax </td><td> текст для значения больше min </td><td> строка </td><td/></tr><tr><td> valueLessThan </td><td> условие &quot;меньше чем&quot; для текста значения </td><td> число </td><td/></tr><tr><td> textForValueLessThan </td><td> текст для &quot;меньше чем&quot; </td><td> строка </td><td/></tr><tr><td> valueGreaterThan </td><td> условие &#39;больше чем&#39; для текста значения </td><td> число </td><td/></tr><tr><td> textForValueGreaterThan </td><td> текст для &quot;больше чем&quot; </td><td> строка </td><td/></tr></tbody></table></details>

##### Переключатель
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> только для чтения </td><td> Нур Лесенд </td><td> логический </td><td> ложь | правда </td></tr><tr><td> toggleType </td><td> Art der Umschaltung </td><td> строка </td><td> логическое | стоимость </td></tr><tr><td> valueOff </td><td> Wert für aus </td><td> строка </td><td/></tr><tr><td> valueOn </td><td> Wert für ein </td><td> строка </td><td/></tr><tr><td> stateIfNotTrueValue </td><td> Zustand, wenn der Wert nicht der Bedingung &#39;Ein&#39; entspricht </td><td> строка </td><td> на | выключен </td></tr><tr><td> vibrateOnMobilDevices </td><td> auf mobilen Ger�ten vibrieren [s] </td><td> число </td><td/></tr><tr><td> labelFalse </td><td> Beschriftung False </td><td> строка </td><td/></tr><tr><td> labelTrue </td><td> Beschriftung True </td><td> строка </td><td/></tr><tr><td> labelPosition </td><td> labelPosition </td><td> строка </td><td> слева | право </td></tr><tr><td> labelClickActive </td><td> Beschriftungs-Klick aktivieren </td><td> логический </td><td> ложь | правда </td></tr><tr><td> colorSwitchThumb </td><td> Knopffarbe des Schalters </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorSwitchTrack </td><td> Schieberfarbe des Schalters </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorSwitchTrue </td><td> активный Шальтерфарбе </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> colorSwitchHover </td><td> Schalterfarbe selektiert / hover </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorFalse </td><td> Beschriftungsfarbe </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorTrue </td><td> Beschriftungsfarbe für true </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> Verriegeln aktivieren </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> automatisch Verriegeln nach [s] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> Условное обозначение </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> Symbolabstand von oben [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> Символы стандартных ссылок [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> Символgr��e </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> Symbolfarbe </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> Graufilter, венн верригельт </td><td> число </td><td/></tr></tbody></table></details>

##### Флажок
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> только для чтения </td><td> Нур Лесенд </td><td> логический </td><td> ложь | правда </td></tr><tr><td> toggleType </td><td> Art der Umschaltung </td><td> строка </td><td> логическое | стоимость </td></tr><tr><td> valueOff </td><td> Wert für aus </td><td> строка </td><td/></tr><tr><td> valueOn </td><td> Wert für ein </td><td> строка </td><td/></tr><tr><td> stateIfNotTrueValue </td><td> Zustand, wenn der Wert nicht der Bedingung &#39;Ein&#39; entspricht </td><td> строка </td><td> на | выключен </td></tr><tr><td> vibrateOnMobilDevices </td><td> auf mobilen Ger�ten vibrieren [s] </td><td> число </td><td/></tr><tr><td> labelFalse </td><td> Beschriftung False </td><td> строка </td><td/></tr><tr><td> labelTrue </td><td> Beschriftung True </td><td> строка </td><td/></tr><tr><td> labelPosition </td><td> labelPosition </td><td> строка </td><td> слева | право </td></tr><tr><td> labelClickActive </td><td> Beschriftungs-Klick aktivieren </td><td> логический </td><td> ложь | правда </td></tr><tr><td> colorCheckBox </td><td> Kontrollk�stchen Farbe </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorFalse </td><td> Beschriftungsfarbe </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> labelColorTrue </td><td> Beschriftungsfarbe für true </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockEnabled </td><td> Verriegeln aktivieren </td><td> логический </td><td> ложь | правда </td></tr><tr><td> autoLockAfter </td><td> automatisch Verriegeln nach [s] </td><td> число </td><td/></tr><tr><td> lockIcon </td><td> Условное обозначение </td><td> обычай </td><td/></tr><tr><td> lockIconTop </td><td> Symbolabstand von oben [%] </td><td> число </td><td/></tr><tr><td> lockIconLeft </td><td> Символы стандартных ссылок [%] </td><td> число </td><td/></tr><tr><td> lockIconSize </td><td> Символgr��e </td><td> число </td><td/></tr><tr><td> lockIconColor </td><td> Symbolfarbe </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> lockFilterGrayscale </td><td> Graufilter, венн верригельт </td><td> число </td><td/></tr></tbody></table></details>

##### Текстовое поле
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> тип ввода </td><td> тип ввода </td><td> строка </td><td> текст | номер | дата | время | маска </td></tr><tr><td> Маска ввода </td><td> Маска ввода </td><td> строка </td><td/></tr><tr><td> inputMaxLength </td><td> inputMaxLength </td><td> число </td><td/></tr><tr><td> inputLayout </td><td> макет </td><td> строка </td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполненные-округлые | заполненная форма | изложил | очерченный-округлый | очерченный </td></tr><tr><td> inputLayoutBackgroundColor </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorHover </td><td> цвет фона при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorSelected </td><td> выбран цвет фона </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColor </td><td> цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorHover </td><td> цвет границы при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorSelected </td><td> выбран цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputTextFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputTextFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTextColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelText </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputLabelColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelColorSelected </td><td> цвет текста выбран </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputLabelFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTranslateX </td><td> смещение x </td><td> число </td><td/></tr><tr><td> inputTranslateY </td><td> смещение y </td><td> число </td><td/></tr><tr><td> inputPrefix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputSuffix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputAppendixColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputAppendixFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputAppendixFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> showInputMessageAlways </td><td> показывайте всегда </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputMessage </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputMessageFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputMessageFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputMessageColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showInputCounter </td><td> показать счетчик </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputCounterColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputCounterFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputCounterFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> clearIconShow </td><td> показать значок удаления текста </td><td> логический </td><td> ложь | правда </td></tr><tr><td> clearIcon </td><td> значок удаления текста </td><td> обычай </td><td/></tr><tr><td> clearIconSize </td><td> размер значка удаления текста </td><td> число </td><td/></tr><tr><td> clearIconColor </td><td> цвет значка удаления текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandIcon </td><td> значок с префиксом </td><td> обычай </td><td/></tr><tr><td> PrepandIconSize </td><td> размер значка с префиксом </td><td> число </td><td/></tr><tr><td> PrepandIconColor </td><td> цвет значка префикса </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandInnerIcon </td><td> внутренний префиксный символ </td><td> обычай </td><td/></tr><tr><td> PrepandInnerIconSize </td><td> размер внутреннего префиксного символа </td><td> число </td><td/></tr><tr><td> PrepandInnerIconColor </td><td> цвет внутреннего префикса символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> appendIcon </td><td> добавленный символ </td><td> обычай </td><td/></tr><tr><td> appendIconSize </td><td> размер добавляемого символа </td><td> число </td><td/></tr><tr><td> appendIconColor </td><td> цвет добавленного символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> appendOuterIcon </td><td> внешний добавленный символ </td><td> обычай </td><td/></tr><tr><td> appendOuterIconSize </td><td> размер внешнего добавленного символа </td><td> число </td><td/></tr><tr><td> appendOuterIconColor </td><td> цвет внешнего добавленного символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></tbody></table></details>

##### Выбрать
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> тип ввода </td><td> тип ввода </td><td> строка </td><td> текст | дата | время </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> inputLayout </td><td> макет </td><td> строка </td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполненные-округлые | заполненная форма | изложил | очерченный-округлый | очерченный </td></tr><tr><td> inputLayoutBackgroundColor </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorHover </td><td> цвет фона при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorSelected </td><td> выбран цвет фона </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColor </td><td> цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorHover </td><td> цвет границы при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorSelected </td><td> выбран цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputTextFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputTextFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTextColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelText </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputLabelColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelColorSelected </td><td> цвет текста выбран </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputLabelFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTranslateX </td><td> смещение x </td><td> число </td><td/></tr><tr><td> inputTranslateY </td><td> смещение y </td><td> число </td><td/></tr><tr><td> inputPrefix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputSuffix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputAppendixColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputAppendixFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputAppendixFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> showInputMessageAlways </td><td> показывайте всегда </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputMessage </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputMessageFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputMessageFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputMessageColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showInputCounter </td><td> показать счетчик </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputCounterColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputCounterFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputCounterFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> clearIconShow </td><td> показать значок удаления текста </td><td> логический </td><td> ложь | правда </td></tr><tr><td> clearIcon </td><td> значок удаления текста </td><td> обычай </td><td/></tr><tr><td> clearIconSize </td><td> размер значка удаления текста </td><td> число </td><td/></tr><tr><td> clearIconColor </td><td> цвет значка удаления текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> collapseIcon </td><td> символ открытия меню </td><td> обычай </td><td/></tr><tr><td> collapseIconSize </td><td> размер символа открытия меню </td><td> число </td><td/></tr><tr><td> collapseIconColor </td><td> цвет символа открытия меню </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandIcon </td><td> значок с префиксом </td><td> обычай </td><td/></tr><tr><td> PrepandIconSize </td><td> размер значка с префиксом </td><td> число </td><td/></tr><tr><td> PrepandIconColor </td><td> цвет значка префикса </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandInnerIcon </td><td> внутренний префиксный символ </td><td> обычай </td><td/></tr><tr><td> PrepandInnerIconSize </td><td> размер внутреннего префиксного символа </td><td> число </td><td/></tr><tr><td> PrepandInnerIconColor </td><td> цвет внутреннего префикса символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> appendOuterIcon </td><td> внешний добавленный символ </td><td> обычай </td><td/></tr><tr><td> appendOuterIconSize </td><td> размер внешнего добавленного символа </td><td> число </td><td/></tr><tr><td> appendOuterIconColor </td><td> цвет внешнего добавленного символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listDataMethod </td><td> метод ввода данных меню </td><td> строка </td><td> inputPerEditor | jsonStringObject | multistatesObject | valueList </td></tr><tr><td> countSelectItems </td><td> Редактор: количество пунктов меню </td><td> число </td><td/></tr><tr><td> jsonStringObject </td><td> Строка JSON </td><td> строка </td><td> привязки не работают! </td></tr><tr><td> valueList </td><td> список значений </td><td> строка </td><td/></tr><tr><td> valueListLabels </td><td> список значений: метки </td><td> строка </td><td/></tr><tr><td> valueListIcons </td><td> список значений: изображения </td><td> строка </td><td/></tr><tr><td> listPosition </td><td> позиция </td><td> строка </td><td> авто | наверх | низ </td></tr><tr><td> listPositionOffset </td><td> использовать смещение позиции </td><td> логический </td><td> ложь | правда </td></tr><tr><td> listItemHeight </td><td> высота пункта меню </td><td> число </td><td/></tr><tr><td> listItemBackgroundColor </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemBackgroundHoverColor </td><td> цвет наведения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemBackgroundSelectedColor </td><td> цвет выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemRippleEffectColor </td><td> цвет эффекта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showSelectedIcon </td><td> показать значок выбранного элемента </td><td> строка </td><td> нет | добавить | prepend-inner | добавление-внешний </td></tr><tr><td> listIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> listIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listIconHoverColor </td><td> цвет значка при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listIconSelectedColor </td><td> цвет значка выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> listItemFont </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> listItemFontColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontHoverColor </td><td> цвет шрифта при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontSelectedColor </td><td> цвет шрифта выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontSize </td><td> второй размер шрифта текста </td><td> число </td><td/></tr><tr><td> listItemSubFont </td><td> второй шрифт текста </td><td> строка </td><td/></tr><tr><td> listItemSubFontColor </td><td> второй цвет шрифта текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontHoverColor </td><td> цвет наведения второго текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontSelectedColor </td><td> цвет второго выделенного текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showValue </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> listItemValueFontSize </td><td> размер шрифта значения </td><td> число </td><td/></tr><tr><td> listItemValueFont </td><td> шрифт значения </td><td> строка </td><td/></tr><tr><td> listItemValueFontColor </td><td> цвет шрифта значения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemValueFontHoverColor </td><td> цвет шрифта при наведении курсора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemValueFontSelectedColor </td><td> цвет шрифта выбранного значения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> значение <b><i>X</i></b> </td><td> значение пункта меню X </td><td> строка </td><td/></tr><tr><td> метка <b><i>X</i></b> </td><td> метка пункта меню X </td><td> строка </td><td/></tr><tr><td> вложенная метка <b><i>X</i></b> </td><td> вложенная метка пункта меню X </td><td> строка </td><td/></tr><tr><td> listIcon <b><i>X</i></b> </td><td> listIcon пункта меню X </td><td> обычай </td><td/></tr><tr><td> listIconColor <b><i>X</i></b> </td><td> listIconColor пункта меню X </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></table></details>

##### Автозаполнение
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> Oid </td><td> ID объекта </td><td> строка </td><td/></tr><tr><td> режим ввода </td><td> режим ввода </td><td> строка </td><td> написать | Выбрать </td></tr><tr><td> тип ввода </td><td> тип ввода </td><td> строка </td><td> текст | дата | время </td></tr><tr><td> vibrateOnMobilDevices </td><td> вибрировать на мобильных устройствах [ах] </td><td> число </td><td/></tr><tr><td> inputLayout </td><td> макет </td><td> строка </td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполненные-округлые | заполненная форма | изложил | очерченный-округлый | очерченный </td></tr><tr><td> inputLayoutBackgroundColor </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorHover </td><td> цвет фона при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBackgroundColorSelected </td><td> выбран цвет фона </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColor </td><td> цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorHover </td><td> цвет границы при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLayoutBorderColorSelected </td><td> выбран цвет границы </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputTextFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputTextFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTextColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelText </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputLabelColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelColorSelected </td><td> цвет текста выбран </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputLabelFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputLabelFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputTranslateX </td><td> смещение x </td><td> число </td><td/></tr><tr><td> inputTranslateY </td><td> смещение y </td><td> число </td><td/></tr><tr><td> inputPrefix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputSuffix </td><td> добавленный текст </td><td> строка </td><td/></tr><tr><td> inputAppendixColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputAppendixFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputAppendixFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> showInputMessageAlways </td><td> показывайте всегда </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputMessage </td><td> текст </td><td> строка </td><td/></tr><tr><td> inputMessageFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> inputMessageFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputMessageColor </td><td> цвет текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showInputCounter </td><td> показать счетчик </td><td> логический </td><td> ложь | правда </td></tr><tr><td> inputCounterColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> inputCounterFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> inputCounterFontFamily </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> clearIconShow </td><td> показать значок удаления текста </td><td> логический </td><td> ложь | правда </td></tr><tr><td> clearIcon </td><td> значок удаления текста </td><td> обычай </td><td/></tr><tr><td> clearIconSize </td><td> размер значка удаления текста </td><td> число </td><td/></tr><tr><td> clearIconColor </td><td> цвет значка удаления текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> collapseIcon </td><td> символ открытия меню </td><td> обычай </td><td/></tr><tr><td> collapseIconSize </td><td> размер символа открытия меню </td><td> число </td><td/></tr><tr><td> collapseIconColor </td><td> цвет символа открытия меню </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandIcon </td><td> значок с префиксом </td><td> обычай </td><td/></tr><tr><td> PrepandIconSize </td><td> размер значка с префиксом </td><td> число </td><td/></tr><tr><td> PrepandIconColor </td><td> цвет значка префикса </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> PrepandInnerIcon </td><td> внутренний префиксный символ </td><td> обычай </td><td/></tr><tr><td> PrepandInnerIconSize </td><td> размер внутреннего префиксного символа </td><td> число </td><td/></tr><tr><td> PrepandInnerIconColor </td><td> цвет внутреннего префикса символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> appendOuterIcon </td><td> внешний добавленный символ </td><td> обычай </td><td/></tr><tr><td> appendOuterIconSize </td><td> размер внешнего добавленного символа </td><td> число </td><td/></tr><tr><td> appendOuterIconColor </td><td> цвет внешнего добавленного символа </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listDataMethod </td><td> метод ввода данных меню </td><td> строка </td><td> inputPerEditor | jsonStringObject | multistatesObject | valueList </td></tr><tr><td> countSelectItems </td><td> Редактор: количество пунктов меню </td><td> число </td><td/></tr><tr><td> jsonStringObject </td><td> Строка JSON </td><td> строка </td><td> привязки не работают! </td></tr><tr><td> valueList </td><td> список значений </td><td> строка </td><td/></tr><tr><td> valueListLabels </td><td> список значений: метки </td><td> строка </td><td/></tr><tr><td> valueListIcons </td><td> список значений: изображения </td><td> строка </td><td/></tr><tr><td> listPosition </td><td> позиция </td><td> строка </td><td> авто | наверх | низ </td></tr><tr><td> listPositionOffset </td><td> использовать смещение позиции </td><td> логический </td><td> ложь | правда </td></tr><tr><td> listItemHeight </td><td> высота пункта меню </td><td> число </td><td/></tr><tr><td> listItemBackgroundColor </td><td> фоновый цвет </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemBackgroundHoverColor </td><td> цвет наведения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemBackgroundSelectedColor </td><td> цвет выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemRippleEffectColor </td><td> цвет эффекта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showSelectedIcon </td><td> показать значок выбранного элемента </td><td> строка </td><td> нет | добавить | prepend-inner | добавление-внешний </td></tr><tr><td> listIconSize </td><td> размер значка </td><td> число </td><td/></tr><tr><td> listIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listIconHoverColor </td><td> цвет значка при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listIconSelectedColor </td><td> цвет значка выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontSize </td><td> размер шрифта </td><td> число </td><td/></tr><tr><td> listItemFont </td><td> шрифт </td><td> строка </td><td/></tr><tr><td> listItemFontColor </td><td> Цвет шрифта </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontHoverColor </td><td> цвет шрифта при наведении </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemFontSelectedColor </td><td> цвет шрифта выбранного элемента </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontSize </td><td> второй размер шрифта текста </td><td> число </td><td/></tr><tr><td> listItemSubFont </td><td> второй шрифт текста </td><td> строка </td><td/></tr><tr><td> listItemSubFontColor </td><td> второй цвет шрифта текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontHoverColor </td><td> цвет наведения второго текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemSubFontSelectedColor </td><td> цвет второго выделенного текста </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> showValue </td><td> показать ценность </td><td> логический </td><td> ложь | правда </td></tr><tr><td> listItemValueFontSize </td><td> размер шрифта значения </td><td> число </td><td/></tr><tr><td> listItemValueFont </td><td> шрифт значения </td><td> строка </td><td/></tr><tr><td> listItemValueFontColor </td><td> цвет шрифта значения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemValueFontHoverColor </td><td> цвет шрифта при наведении курсора </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> listItemValueFontSelectedColor </td><td> цвет шрифта выбранного значения </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> значение0 </td><td> значение0 </td><td> строка </td><td/></tr><tr><td> label0 </td><td> label0 </td><td> строка </td><td/></tr><tr><td> subLabel0 </td><td> subLabel0 </td><td> строка </td><td/></tr><tr><td> listIcon0 </td><td> listIcon0 </td><td> обычай </td><td/></tr><tr><td> listIconColor0 </td><td> listIconColor0 </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr><tr><td> значение1 </td><td> значение1 </td><td> строка </td><td/></tr><tr><td> label1 </td><td> label1 </td><td> строка </td><td/></tr><tr><td> subLabel1 </td><td> subLabel1 </td><td> строка </td><td/></tr><tr><td> listIcon1 </td><td> listIcon1 </td><td> обычай </td><td/></tr><tr><td> listIconColor1 </td><td> listIconColor1 </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></tbody></table></details>

##### Значки дизайна материалов
<details><table><thead><tr><th> Свойство </th><th> Описание </th><th> Тип </th><th> Ценности </th></tr></thead><tbody><tr><td> mdwIcon </td><td> <a href="https://materialdesignicons.com/">название материала</a> </td><td> строка </td><td> дом, ... </td></tr><tr><td> mdwIconSize </td><td> размер значка </td><td> число </td><td> 0, 1, 2, ... </td></tr><tr><td> mdwIconColor </td><td> цвет значка </td><td> строка </td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5) </td></tr></tbody></table></details>

<br>

### Настройки редактора
<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td> переключатель </td><td> Datapoint из строки типа с входными данными, как показано выше </td></tr><tr><td> данные как JSON </td><td> Необязательно, введите данные, как показано выше, если точка данных oid не установлена </td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td> colType [x] </td><td> Если изображение выбрано, свойство объекта должно иметь путь к изображению ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">см. Выше</a> ) </td></tr><tr><td> префикс [x] </td><td> Можно использовать префикс для свойства объекта, внутренней привязки объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и html </td></tr><tr><td> суффикс [x] </td><td> Можно использовать суффикс для свойства объекта, внутренней привязки объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и html. </td></tr><tr><td> имя объекта для сортировки [x] </td><td> Здесь вы можете определить другое свойство объекта, которое следует использовать для сортировки. </td></tr></tbody></table>

##### Привязка внутреннего объекта
префикс и суффикс поддерживают привязку внутреннего объекта таблицы -> вы можете получить доступ к другим свойствам объекта, используя

```
#[obj.'propertyName']
```

Пример см <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">. Выше</a> .

Пример рабочего виджета можно найти

* [здесь] (https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)
* [ical Adapter] (https://forum.iobroker.net/topic/29658/material-design-widgets-table-widget/2)

## Адаптивный макет
Есть два виджета - Masonry Views и Grid Views - с помощью которых можно создать ответный макет (макет для настольного компьютера, планшета и мобильного устройства). Оба виджета имеют несколько интегрированных `view in widget`.

### Виды кладки
Masonry Views имеет несколько интегрированных `view in widget`, которые будут автоматически упорядочены в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Виды кладки особенно полезны, если они имеют разную высоту.

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/masnory.gif)

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/masonry_resolution_settings.png"></td><td colspan=2> В зависимости от ширины виджета можно установить количество столбцов и расстояние между представлениями. Настройки можно установить независимо для книжного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках. </td></tr><tr><td rowspan=2><img src="doc/en/media/masnory_settings_views.png"></td><td> ширина обзора [x] </td><td> Определите ширину представления. Допустимые значения: число, пиксели,% или вычисление. Примеры: <code>100</code> , <code>100</code> <code>100px</code> , <code>55%</code> , <code>calc(60% - 12px)</code> </td></tr><tr><td> высота обзора [x] </td><td> Здесь вы можете указать высоту используемого вида. <br><br> Если вы хотите, чтобы высота изменялась в зависимости от вида, то этот ввод должен быть пустым, а для виджета с наибольшей высотой в представлении положение должно быть установлено относительным, см. Снимок экрана: <br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tr></tbody></table>

### Виды сетки
Grid Views имеет несколько интегрированных `view in widget`, которые будут автоматически упорядочены в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Виды сетки особенно полезны, если включенные виды имеют одинаковую высоту.

<b>В виджете Grid View всего 12 столбцов. Если вы хотите, чтобы представление имело ширину 4 столбца, вы должны установить для диапазона столбцов значение 4 в соответствующем представлении [x]</b>

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/grid.gif)

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/grid_settings_resolution.png"></td><td colspan=2> В зависимости от ширины виджета определяется, от какой ширины виджета могут применяться правила для диапазона столбцов отдельных представлений [x], а также расстояние между представлениями. Настройки можно установить независимо для книжного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках. </td></tr><tr><td rowspan=2><img src="doc/en/media/grid_settings_view.png"></td><td colspan=2> Определите диапазон столбцов представления в зависимости от текущего правила разрешения ширины. <br> Вы также можете указать здесь, должно ли представление отображаться только с разрешением выше или ниже заданного значения или оно должно быть видимым через идентификатор объекта. </td></tr><tr><td> высота обзора [x] </td><td> Здесь вы можете указать высоту используемого вида. <br><br> Если вы хотите, чтобы высота изменялась в зависимости от вида, то этот ввод должен быть пустым, а для виджета с наибольшей высотой в представлении положение должно быть установлено относительным, см. Снимок экрана: <br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tbody></table>

## Оповещения
Виджет предупреждений можно использовать, например, для отображения сообщений в VIS, как это работает с адаптером pushover, но непосредственно в VIS.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/alerts.gif)

Для виджета предупреждений требуется строка JSON в качестве объекта, которая должна иметь следующую структуру:

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

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/alerts_settings.png"></td><td> Число столбцов </td><td> определить количество столбцов </td></tr><tr><td> ID объекта </td><td> Объект должен быть строкой json, которая должна быть структурирована, как описано выше. </td></tr><tr><td> Максимум. Оповещения </td><td> максимальное количество предупреждений, которые должны отображаться. </td></tr></tbody></table>

С помощью следующего сценария вы можете отправлять простые сообщения в точку данных, которая используется виджетом предупреждений.
Скрипт необходимо поместить в глобальные скрипты. Затем можно отправить сообщение с помощью следующей команды

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
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/calendar.gif)

Для виджета Calendar требуется строка JSON как объект, который должен иметь следующую структуру:

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

В качестве цветов можно использовать только hex и rgba!

Настройки, не перечисленные в таблице ниже, не требуют пояснений.

<table><thead><tr><th> Скриншот </th><th> Настройка </th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/calendar_layout.png"></td><td> дни недели, которые будут показаны </td><td> Указывает, какие дни недели отображать. Для отображения только с понедельника по пятницу можно использовать значения <code>1, 2, 3, 4, 5</code> . Для отображения недели, начинающейся с понедельника, можно использовать значение <code>1, 2, 3, 4, 5, 6, 0</code> . </td></tr><tr><td> ID объекта </td><td> Объект должен быть строкой json, которая должна быть структурирована, как описано выше. </td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_timeaxis.png"></td><td> час начала </td><td> Час, с которого встречи должны отображаться в режиме просмотра недели и дня. </td></tr><tr><td> конец часа </td><td> Час, до которого встречи должны отображаться в режиме просмотра недели и дня </td></tr></tbody></table>

Если вы хотите использовать виджет с [ical адаптер](https://github.com/iobroker-community-adapters/ioBroker.ical), вы можете использовать следующий сценарий для преобразования объекта ical для работы с виджетом.

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
* (Scrounger): Line History Chart Widget: Breaking Changes !!! aggregate (display) method for every dataset configurable, see documentation for detailed infos!
* (Scrounger): bug fix for compatibility issues with other widget adapters
* (Scrounger): Chechbox Widget: option for border and hover color added
* (Scrounger): Chechbox Widget: ripple effect bug fix
* (Scrounger): Buttons Vertical: text alignment option added
* (Scrounger): added URL support as source for symbols / images
* (Scrounger): HTML Card Widget: option to hide title, subtitle and text added
* (Scrounger): HTML Card Widget: background image refresh options added
* (Scrounger): Fixed some errors reported via Sentry
* (Scrounger): Select & Autocomplete Widget: overriding icon color bug fix
* (Scrounger): Select & Autocomplete Widget: overriding icon bug fix
* (Scrounger): Select & Autocomplete Widget: colors bug fixes
* (Scrounger): Select & Autocomplete Widget: option to override the icon color of textfield for selected menu icon
* (Scrounger): JSON Chart Widget: option to force x-axis time unit added
* (Scrounger): JSON Chart Widget: gradient colors for multipe dataset bug fixes
* (Scrounger): JSON Chart: default tooltip title added
* (Scrounger): Charts Widget: x-Axis time axis bug fixes

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

### 0.3.14 (2020-06-01)
* (Scrounger): Table Widget: bug fixes

### 0.3.13 (2020-05-29)
* (Scrounger): Multi State Button Widgets: delay option added
* (Scrounger): Table Widget: option to add ohter Widgets to table added
* (Scrounger): Slider & Round Slider Widget: option to show value in percent added
* (Scrounger): Sentry error handling improved
* (scrounger): Buttons: click bug fix
* (scrounger): MaterialDesingIcons: extension bug fix
* (Scrounger): small bug fixes

### 0.3.11 (2020-05-24)
* (Scrounger): Sentry added
* (Scrounger): Select & Autocomplete Widget: vibrate on mobil devices added
* (Scrounger): List Widget: vibrate on mobil devices added
* (Scrounger): Masonry & Grid Widget: height changed to optional to support widgets using relative position
* (Scrounger): Progress Widget revised
* (Scrounger): Progress Circular Widget added
* (Scrounger): bug fixes

### 0.3.9 (2020-05-20)
* (Scrounger): List Widget: subscribe for nested oids and bindings bug fix
* (Scrounger): Multi State Button Widgets added
* (Scrounger): checkbox: lock option added
* (Scrounger): switch: lock option added
* (Scrounger): bar & pie chart: option for distance between legends points added
* (Scrounger): bar, pie & json chart: tooltip title and value override options added
* (Scrounger): pie chart: orientation change bug fix
* (Scrounger): json & line history chart: stepped line option added
* (Scrounger): table: option for fixed table headline added
* (Scrounger): charts: newline bug fixed
* (Scrounger): charts: tooltip decimal places bug fix


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