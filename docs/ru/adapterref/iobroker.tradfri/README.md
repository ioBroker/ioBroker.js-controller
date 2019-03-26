---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tradfri/README.md
title: Ikea tradfri адаптер
hash: ej5aOPKAJf0ewg/X6ytf+TQlHjvMC80iVwHKlgx1ouo=
---
--- местный: правда --- ![логотип](../../../de/adapterref/iobroker.tradfri/media/tradfri.png)

# Ikea tradfri адаптер
## Трафдри
Tradfri - это система SmartHome от Ikea. В настоящее время эта система состоит из различных компонентов:

- Лампы (лампы)
- светодиодные панели / молдинги для стен и шкафов / дверей шкафа
- детектор движения
- Жалюзи для окон
- дистанционное управление
- центральный шлюз

Таким образом, система Tradfri является одной из наиболее полных систем компонентов SmartHome на рынке.

## Требования для использования Tradfri с ioBroker
- RaspberryPi 3 модель B +
- Трафдри Гейтвэй
- компоненты Tradfri (например, лампы или датчики движения и т. Д.)
- Tradfri пульт

## Администрирование и контроль Tradfri с ioBroker
Для оптимального управления и контроля Tradfri с ioBroker вам понадобится следующий адаптер:

1. Икеа Трафдри

Этот адаптер подключается к центральному шлюзу Tradfri. Он синхронизирует компоненты (лампы, детекторы движения и т. Д.), Сцены, системные переменные Tradfri Gateway и ioBroker. На рис. 01 показано упрощенное представление связи между ioBroker, шлюзом и компонентами.

![процесс коммуникации](../../../de/adapterref/iobroker.tradfri/media/TradfriOverview_002.PNG)

### Установка адаптера и настройка экземпляра
<b>Шаг 1</b>

- Установите адаптер, нажав кнопку ![адаптер](../../../de/adapterref/iobroker.tradfri/media/Adapter.PNG) в левой панели навигации веб-интерфейса.
- поиск / фильтр на появившейся странице, в поиске «Ikea Tradfri» (см. рис. 01)
- установите адаптер с помощью значка ![плюс](../../../de/adapterref/iobroker.tradfri/media/plus.PNG) (последний столбец, крайний справа). (авто будет новым экземпляром здесь

  адаптера согласно ![экземпляры](../../../de/adapterref/iobroker.tradfri/media/instanzen.PNG))

![Добавить адаптер Ikea Tradfri](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_002.PNG)

<b>Шаг 2</b>

- Изменяя вид в левой навигационной панели ![экземпляры](../../../de/adapterref/iobroker.tradfri/media/instanzen.PNG) в настоящее время доступны

Экземпляры отображаются. После установки фильтра на «Tradfri» отображаются все запущенные экземпляры «Tradfri».
Это должно быть так же, как на рисунке ниже.

![Ikea Tradfri просмотр экземпляра](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_003optimiert.PNG)

- Следующие параметры отображения / действия существуют в столбце соответствующего экземпляра, описанного слева направо.
- <b>Отображение</b> статуса <b>активности</b> (простая система светофора)
    - ![Зеленый статус](../../../de/adapterref/iobroker.tradfri/media/status_green.PNG) -> экземпляр работает в ожидаемых параметрах, все в порядке
    - ![Статус желтый](../../../de/adapterref/iobroker.tradfri/media/status_yellow.PNG) -> экземпляр работает, но могут быть проблемы с конфигурацией шлюза Tradfri
    - ![Красный цвет](../../../de/adapterref/iobroker.tradfri/media/status_red.PNG) -> Экземпляр запущен, но есть проблемы с подключением к хосту.
- <b>Действия</b>
    - ![Start instance] (media / launch.PNG) start и! [Stop instance](../../../de/adapterref/iobroker.tradfri/media/stop.PNG) Остановите экземпляр, включите эти кнопки
    - ![Начать экземпляр](../../../de/adapterref/iobroker.tradfri/media/konfiguration.PNG) Доступ к области конфигурации экземпляра
    - ![Начать экземпляр](../../../de/adapterref/iobroker.tradfri/media/reload.PNG) Экземпляр перезапускается
    - ![Начать экземпляр](../../../de/adapterref/iobroker.tradfri/media/delete.PNG) Экземпляр безвозвратно удален