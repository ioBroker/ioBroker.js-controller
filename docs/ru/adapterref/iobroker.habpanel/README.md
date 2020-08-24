---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: C89ICo0mYfQ8N2nXtMcdkM+wbs5ZDI8WBQuJ1t3kcdk=
---
![Логотип](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![Количество установок](http://iobroker.live/badges/habpanel-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![НПМ](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# IoBroker.habpanel
HABPanel - это легкий интерфейс приборной панели для ioBroker, основанный на OpenHAB HABpanel.

Он, в частности, имеет встроенный конструктор приборной панели, позволяющий легко создавать интерфейсы прямо на целевом устройстве.

## Монтаж
** Важно! ** Этот адаптер нельзя установить напрямую с github. Только из npm.

## Начиная
- При первом доступе к HABPanel в новом браузере или на новом устройстве вы должны увидеть довольно пустой экран - следуйте инструкциям и начните с нажатия (или касания) значка в правом верхнем углу.
- Теперь вы находитесь в режиме редактирования, появилась ссылка (_ "Добавить новую панель управления" _), а также ссылка _ "Дополнительные настройки" _.
- Если вы ранее использовали HABPanel и сохранили некоторые конфигурации панели на сервере, перейдите в _ "Дополнительные настройки" _ и щелкните предыдущую конфигурацию - она будет немедленно восстановлена. Или создайте свою первую информационную панель: нажмите / коснитесь ссылки _ "Добавить новую панель" _ и дайте ей имя.
- Щелкните / коснитесь плитки панели инструментов, чтобы войти в редактор панели инструментов.
- Добавьте свой первый виджет: выберите меню _ "Добавить виджет" _ и выберите тип виджета (скажем, пустышка - простой виджет, отображающий состояние элемента)
- Переместите виджет перетаскиванием и измените его размер с помощью белого шеврона - он появляется, когда вы нажимаете на виджет
- Нажмите на три точки в правом верхнем углу виджета, чтобы открыть его контекстное меню, и выберите _ "Изменить ..." _
- Настройте некоторые параметры (имя, элемент openHAB и т. Д.) И подтвердите свои изменения
- Сохраните конфигурацию, нажав / нажав кнопку _Сохранить_.
- Щелкните / коснитесь _Run_, чтобы увидеть свою панель управления в действии - используйте кнопку браузера «Назад» или стрелку, чтобы вернуться к доске для рисования.
- Когда вы будете довольны набором панелей мониторинга, вернитесь к _ «Дополнительные настройки» _, затем нажмите / коснитесь _ «Сохранить текущую конфигурацию в новую конфигурацию панели» _; это сохранит его на сервере openHAB 2, как описано выше, и сделает его доступным для повторного использования.

## Скриншоты
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog
### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided 

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

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

## License
Copyright 2017-2020 bluefox <dogafox@gmail.com>

Eclipse Public License