---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: +hvha07fvSMhMIlRBRNxtzTIxMS5bvD0J/FKiUdUXNA=
---
![логотип](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![Количество установок](http://iobroker.live/badges/habpanel-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# IoBroker.habpanel =================
HABPanel - это легкий интерфейс панели инструментов для ioBroker, основанный на OpenHAB HABpanel.

В частности, он имеет встроенный дизайнер панели мониторинга, позволяющий легко создавать интерфейсы прямо на целевом устройстве.

## Монтаж
** Важно! ** Этот адаптер не может быть установлен непосредственно с GitHub. Только с нпм.

## Начиная
- При первом доступе к HABPanel в новом браузере или устройстве у вас должен появиться довольно пустой экран - следуйте инструкциям и начните с нажатия (или нажатия) на значок в правом верхнем углу.
- Теперь вы находитесь в режиме редактирования, появилась ссылка (_ «Добавить новую панель инструментов» _), а также ссылка «Дополнительные настройки» _.
- Если вы ранее использовали HABPanel и сохранили некоторые конфигурации панелей на сервере, перейдите к _ «Расширенные настройки» _ и нажмите на предыдущую конфигурацию - она будет немедленно возвращена. Или создайте свою первую панель: нажмите на ссылку _ «Добавить новую панель» и дайте ей имя.
- Нажмите / нажмите на плитке приборной панели, чтобы войти в редактор приборной панели.
- Добавьте свой первый виджет: выберите меню _ «Добавить виджет» _ и выберите тип виджета (скажем, Dummy - простой виджет, отображающий состояние элемента)
- Переместите виджет с помощью перетаскивания и измените его размер с помощью белого шеврона - он появляется при нажатии на виджет
- Нажмите три точки в правом верхнем углу виджета, чтобы открыть его контекстное меню, и выберите «Редактировать ...».
- Настройте некоторые параметры (имя, элемент openHAB и т. Д.) И подтвердите изменения.
- Сохраните свою конфигурацию, нажав / нажав кнопку _Save_
- Нажмите / коснитесь _Run_, чтобы увидеть панель инструментов в действии. - Используйте кнопку «Назад» в браузере или стрелку, чтобы вернуться на чертежную доску.
- Если вы довольны набором панелей мониторинга, вернитесь к _ «Расширенные настройки» _, затем нажмите / коснитесь _ «Сохранить текущую конфигурацию в новой конфигурации панели» _; это сохранит его на сервере openHAB 2, как описано выше, и сделает его доступным для повторного использования.

## Скриншоты
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog

### 0.3.4 (2019-02-04)
* (janfromberlin) button widget did not handle primitive boolean commands
* (matthiasgasser) fix time series query start date, adapted end date

### 0.3.3 (2019-02-02)
* (janfromberlin) fix button toggle functionality for true/false

### 0.3.2 (2019-01-30)
* (foxthefox) chart and timeline functionality fixed

### 0.3.1 (2019-01-27)
* (foxthefox) chart and timeline functionality added

### 0.2.6 (2019-01-14)
* (jogibear9988) bugfix selection element

### 0.2.5 (2019-01-14)
* (jogibear9988) bugfix format strings

### 0.2.4 (2019-01-13)
* (jogibear9988) bugfix template widget

### 0.2.3 (2019-01-11)
* (jogibear9988) upgrade to current openhab version

### 0.1.7 (2017-05-20)
* (bluefox) add to welcome screen

### 0.1.6 (2017-05-15)
* (bluefox) initial commit