---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: g+bbSc5/i8dSqQwu4rvQiojAbcNnraQEUdfDWvWvpVo=
---
![Логотип](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.mytime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Количество установок (последнее)](http://iobroker.live/badges/mytime-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/mytime-stable.svg)
![Статус зависимости](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![Известные уязвимости](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![Трэвис-Си](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

# IoBroker.mytime
## Адаптер mytime для ioBroker
Этот адаптер обрабатывает время (например, обратный отсчет и т. Д.).
Функция обратного отсчета предоставляет точки данных, которые вы можете использовать для управления обратным отсчетом (например, в сценарии). Адаптер также включает несколько виджетов для визуализации этих обратных отсчетов.

### Конфигурация
#### Обратный отсчет
После установки создайте новый обратный отсчет, например, «тест», установите таймер на 10 секунд и импортируйте следующие виджеты.
Datapoints предварительно настроены для обратного отсчета с именем test.

##### Таймер поведения остановки
После того, как обратный отсчет остановится, обратный отсчет сбрасывается до времени, установленного таймером.

##### Нулевое поведение остановки После того, как обратный отсчет получает сигнал остановки, обратный отсчет остается на 0.
### Применение
#### Обратный отсчет
##### Доступные точки данных
После настройки нового обратного отсчета адаптер создает следующие точки данных:

| датапоинт | описание |
|-----------|---------------------------------------------------------------------------|
| действие | Актуальное состояние обратного отсчета. возможные значения: stop, run, pause, end |
| cmd | точка данных для команд. возможные команды описаны ниже |
| начало | дата-точка для времени начала в миллисекундах |
| конец | дата-точка для времени окончания в миллисекундах |
| таймер | дата-точка для общего времени в миллисекундах |

##### Доступные состояния действия
| действие | описание |
|-----------|-------------------------------------------------------------------------------------------------------|
| стоп | обратный отсчет остановлен, время начала и окончания установлено на 0 |
| запустить | обратный отсчет идет. если обратный отсчет дойдет до конца. действие переключается на конец |
| пауза | обратный отсчет находится в режиме паузы. время окончания было установлено на время паузы |
| конец | обратный отсчет окончен. это состояние вы можете использовать как триггер для дальнейших действий (звук, всплывающие окна и т. д.) | |

##### Доступные команды для точки данных cmd
| команда | пример | описание |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| + значение | +1: 10 | добавляет время к настройке обратного отсчета. настройка будет учтена при следующем запуске |
| -значение | -1: 2: 3 | вычитает время из обратного отсчета. настройка будет учтена при следующем запуске |
| = значение | = 5: 00 | установите таймер обратного отсчета на это время. |
| # ISO-Date | # 2020-01-01T10: 00: 00 | установите таймер обратного отсчета на целевое время. Время должно быть отформатировано как ISO-Datestring |
| $ Time | $ 20: 15 | установите таймер обратного отсчета на целевое время. Если время раньше текущего времени. установлен следующий день. |
| начало | начало | начинает обратный отсчет |
| стоп | стоп | останавливает обратный отсчет. время обратного отсчета сбрасывается на настройку |
| пауза | пауза | приостанавливает обратный отсчет |
| конец | конец | останавливает обратный отсчет. обратный отсчет установлен на 0 |
| setstop2timer | setstop2timer | установить конфигурацию поведения остановки на таймер |
| setstop2zero | setstop2zero | установить нулевую конфигурацию поведения остановки |
| сохранить | сохранить | сохранить конфигурацию, определенную в datapoints, в конфигурацию iobroker |

##### Формат значения для установки таймера обратного отсчета
вы можете установить обратный отсчет на неограниченное время.
запись значения [дни: [часы: [минуты: [секунды]]]] дни, часы и минуты необязательны.
если вы хотите установить таймер на один день, вам необходимо установить часы, минуты и секунды, а также вам не нужно соблюдать нормальные диапазоны значений (например, часы 0-24). вы также можете установить 48 часов.
при желании можно установить нерегулярные записи времени. время суммируется отдельно

**Примеры**

| установка | описание |
|-----------|---------------------------------------------|
| 1: 0: 0: 0 | устанавливает / добавляет / вычитает 1 день на таймере |
| 2: 0: 0 | установить / добавить / отнять 2 часа на таймере |
| 3: 0 | установить / добавить / отнять 3 минуты на таймере |
| 120 | устанавливает / добавляет / вычитает 120 секунд к таймеру |
| 48: 0: 0 | устанавливает / добавляет / вычитает 48 часов к таймеру |
| 48: 75: 120 | установить / добавить / вычесть таймер |

##### Формат шаблона для форматирования вывода обратного отсчета в виджете
Доступны следующие заполнители:

| заполнитель | описание |
|-------------|-----------------------------------------------------------------|
| d | дни без ведущих нулей |
| дд | дни с ведущими нулями |
| H | часы без ведущих нулей |
| HH | часы с ведущими нулями |
| м | минуты без ведущих нулей |
| мм | минуты с ведущими нулями |
| s | секунды без ведущих нулей |
| сс | секунды с ведущими нулями |
| \ | Escape-символ, если вы хотите использовать заполнитель в выводе |

**Примеры**

Все следующие примеры с таймером обратного отсчета 1: 2: 3: 4

| шаблон | пример | результат |
|-----------------------|-------------------|--------------------------------------------------|
| д \ д Чч м \ м с \ с | 1д 2ч 3м 4с | с escape-символами и без начальных нулей |
| дд \ д Ччч мм \ м сс \ с | 01д 02ч 03м 04с | с escape-символами и с ведущими нулями |
| сс \ с | 93784s | только секунды |
| дд \ д ЧЧ \ ч | 01д 02ч | только дни и часы |
| ЧЧ \ ч мм \ м | 26ч 03м | только часы и минуты |

### Виджеты
#### Виджет обратного отсчета простой
Виджет обратного отсчета для простого текстового вывода

##### Свойства виджета
###### Oid Точка данных таймера точки обратного отсчета.
###### Формат Форматирует вывод таймера. по умолчанию мм: сс. подробности см. в шаблоне формата главы
##### Пример кода виджета
виджеты предварительно настроены для обратного отсчета под названием test.

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Круг обратного отсчета виджета
Виджет обратного отсчета в виде кольца / круга.

##### Свойства виджета
###### Oid Точка данных таймера точки обратного отсчета.
###### Notimetext Отключает отображение времени по полярным часам.
###### Формат Форматирует вывод таймера. по умолчанию мм: сс. подробности см. в шаблоне формата главы
###### Обратная установка для увеличения или уменьшения кольца / круга
###### Ширина Ширина кольца или круга.
###### Кольцевой зазор Зазор в пикселях между кольцами
###### Колпачки Установка концов кольца / круга: круглые или прямые
###### Background Цвет фона кольца / круга
###### Передний план Цвет переднего плана кольца / круга
###### Showsec Показать кольцо секунд
###### Showmin Показать кольцо минут
###### Showhrs Показать кольцо минут
###### Showday Показать кольцо дней
##### Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### FlipClock обратного отсчета виджета
Виджет обратного отсчета в стиле флипборда аэропорта

##### Свойства виджета
###### Oid Точка данных таймера точки обратного отсчета.
###### Countdown_showsec Показывает часть секунды. между двумя блоками не должно быть промежутка.
###### Countdown_showmin Показывает минутную часть. между двумя блоками не должно быть промежутка.
###### Countdown_showhrs Показывает часть часов. между двумя блоками не должно быть промежутка.
###### Countdown_showday Показывает часть дня. между двумя блоками не должно быть промежутка.
###### Countdown_color Цвет таймера обратного отсчета
###### Countdown_background_color Цвет фона таймера обратного отсчета
###### Countdown_dot_color Цвет точек таймера обратного отсчета
##### Подсказки
Если вы хотите настроить размер флип-часов обратного отсчета, в настройках css в vis вы можете ввести половинный размер: Group CSS-Common / transform "scale (0.5)"

##### Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Обратный отсчет виджета NixieClock
Виджет обратного отсчета в стиле Nixie-Tube / LED

##### Свойства виджета
###### Oid Точка данных таймера точки обратного отсчета.
###### Countdown_showsec Показывает часть секунды. между двумя блоками не должно быть промежутка.
###### Countdown_showmin Показывает минутную часть. между двумя блоками не должно быть промежутка.
###### Countdown_showhrs Показывает часть часов. между двумя блоками не должно быть промежутка.
###### Countdown_showday Показывает часть дня. между двумя блоками не должно быть промежутка.
###### Countdown_color_active Цвет таймера обратного отсчета
###### Countdown_color_inactive Цвет неактивных цифр
###### Countdown_opacity_inactive Непрозрачность цвета неактивных цифр
###### Countdown_glowcolor Цвет свечения вокруг цифр Nixie
##### Подсказки
Если вы хотите настроить размер nixieclock обратного отсчета, в настройках css в vis вы можете ввести половинный размер: Group CSS-Common / transform "scale (0.5)"

##### Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

## Делать
* 7-сегментный дисплей
* скользящие числа
* настраиваемые шрифты
* таймер Wordclock?
* расписанный планировщик: планируйте единую дату / время и повторяющиеся события, такие как Outlook
* ~~ Стиль Никси ~~
* ~~ флип-дисплей (аэропорт-дисплей) ~~
* ~~ новая команда для установки только целевого времени без даты ~~
* ~~ круговой виджет обратного отсчета с возможностью отключения текста обратного отсчета
* ~~ Groupseperator '.'. ' во Имя ~~
* ~~ Полярные часы ~~
* ~~ круг в обратном направлении ~~
* ~~ круг с круглыми шапками ~~

## Changelog


### 0.5.2
* fix an issue and introduce a new command save to save the configuration defined in datapoints to the iobroker configuration data
### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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