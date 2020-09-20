---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter.
hash: kfEgeJieyITeTDJH7RePBpBzCH0jn96NceNQjCQ46x8=
---
![Логотип](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![Количество установок](http://iobroker.live/badges/daswetter-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.daswetter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![Тесты](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)

# IoBroker.DasWetter.
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Этот адаптер считывает данные прогноза погоды с DasWetter.com.

Вам нужен аккаунт на DasWetter.com. Зарегистрируйтесь на https://www.daswetter.com/api/#/login. Учетная запись предоставляется бесплатно при определенных условиях.

В своем аккаунте вы найдете три URL для четырех разных моделей данных:

* Прогноз на следующие 7 дней и общая информация на день: максимум и минимум, ветер (символ и описание), символ дня и погодные условия
* подробная информация за 5 дней и каждые 3 часа: Общая ежедневная информация следующая: пик, минимумы, ветер, порывы, осадки, относительная влажность,

атмосферное давление на уровне моря, линия снега, восход и закат, даты, связанные с луной, местное время

* Предварительный просмотр с подробными данными каждый час (только первые 2 дня, затем каждые 3 часа)
* Прогноз на 5 дней и каждые 3 часа (в формате JSON)

Реализованы все четыре модели, нужно использовать хотя бы одну.
В настройках должен использоваться URL типа http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx. Просто скопируйте полный URL из своей учетной записи.

## Подсказки
### Значки, используемые в vis
* Доступ к таким иконкам, как `http:// ip: 8082 / adapter / daswetter / icons / tiempo-weather / galeria1 / 1.png`.
* в galerie6 оригинальные иконки имеют формат svg. В приложении Vis могут возникнуть проблемы с визуализацией. Так что конвертированные png доступны. Просто используйте опцию «использовать png»
* в galerie5 оригинальные иконки имеют формат svg и png. Также доступны цветная и белая версии.

### "текущий" в NextHours_Day1:
* DasWetter.com не предоставляет реальные текущие значения погоды
* но иногда полезно иметь прогноз на текущий час
* поэтому мы добавили «текущий», который является просто копией связанных значений часов прогноза
* убедитесь, что вы звоните адаптеру хотя бы один раз в час, чтобы убедиться, что "текущий" обновлен правильно
* см. также запрос функции github [issue24] (https://github.com/rg-engineering/ioBroker.daswetter/issues/24)

### Путь 4
* на данный момент DasWetter.com отправляет данные, которые отличаются от их собственной спецификации.

Теперь мы реализовали «автоматический ремонт», который меняет структуру до задокументированной формы.

## Известные проблемы
* пожалуйста, создавайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.daswetter/issues), если вы обнаружите ошибки или захотите новые функции

## Changelog

### 3.0.3 (2020-09-19)
* (René) see issue #66: parse numbers added 


### 3.0.1 (2020-05-01)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"
* (René) "xml2js" replaced by "xml2json"
* (René) manual from DasWetter updated in folder \docs
* (René) see issue #39: create copy of data in hourly data path for next 1, 2, 3 or 6 hours (as an option)
* (René) copy for current can be disabled now

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory



### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License
Copyright (C) <2017 - 2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.