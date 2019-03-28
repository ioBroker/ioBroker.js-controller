---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: 4PF8iWYeBdP1zNnMEqZ9mpBA5xjpHTgjGpENlqW246o=
---
# IoBroker.nibeuplink

![Количество установок](http://iobroker.live/badges/nibeuplink-installed.svg)
![Стабильная версия](http://iobroker.live/badges/nibeuplink-stable.svg)

Этот адаптер ioBroker получает данные от теплового насоса Nibe от Nibe Uplink.

## Использование этого адаптера
1. Вам нужен тепловой насос Nibe - пока, если у вас его нет ;-)
2. Вам нужна учетная запись на Nibe Uplink: https://www.nibeuplink.com/.
3. После входа у вас есть URL в этой форме: https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. Вместо XXXXX есть номер. Это ваш системный идентификатор. Нам нужен этот идентификатор.
5. Перейдите к Nibe Uplink Api: https://api.nibeuplink.com/Account/LogIn и войдите в систему.
6. Нажмите «МОИ ПРИЛОЖЕНИЯ», а затем «Создать приложение»
7. Заполните: имя и описание могут быть чем угодно, например ioBroker
8. URL обратного вызова важен. Вы можете использовать https://z0mt3c.github.io/nibe.html
9. Примите соглашение об услугах API NIBE Uplink и нажмите «Создать приложение».
10. Затем вы получаете Идентификатор и Секрет - они нам нужны
11. Установите этот адаптер в ioBroker
12. На странице настройки адаптера заполните Идентификатор и Секрет.
13. Нажмите на ссылку «Нажмите здесь, чтобы создать код авторизации на NIBE Uplink».
14. Следуйте инструкциям. В конце вы получите код nibe-fetcher
15. Скопируйте этот код и вставьте его в настройках адаптера в «Код авторизации».
16. Введите свой системный идентификатор с URL-адреса Nibe Uplink.
17. Выберите свой язык.
18. Нажмите Сохранить и закрыть

Если вы (позже) получили ошибку «400 неверных запросов» в журнале, вы должны получить новый код авторизации - так же, как номера 13 до 15 и 18.

## Changelog

### 0.2.2
* Internal clean-up

### 0.2.1
* Dependencies updated
* Fix problem with nodejs 6 and the spread operator and async

### 0.2.0
* Code change to new template
* Support for Compact mode (js-Controller 2.0 Feature) added (#1)
* Translations in settings page
* Type moved from general to climate control

### 0.1.1
* Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
* info.connection added

### 0.1.0
* Objects tree changed: New, more readable objects added

### 0.0.2
* Language support for objects tree

### 0.0.1
* Initial release

## License
MIT License

Copyright (c) 2019 Sebastian Häßelbarth <seb@sebmail.de>

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