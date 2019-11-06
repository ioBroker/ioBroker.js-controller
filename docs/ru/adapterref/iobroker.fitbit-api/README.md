---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fitbit-api/README.md
title: ioBroker.fitbit
hash: sUMdAh3gtrwrv5Q5anEMOYW8avty7evQcSHyUvhfQOw=
---
![логотип](../../../en/adapterref/iobroker.fitbit-api/admin/fitbit-api.png)

# IoBroker.fitbit
Этот адаптер извлекает данные из API FitBit!

## Конфигурация
![шаг 1](../../../en/adapterref/iobroker.fitbit-api/img/step1.png)

Нажмите кнопку «Авторизоваться».

После этого вас могут попросить снова ввести свои учетные данные или, если кэш браузера все еще состоит из файлов cookie, это можно сделать автоматически.

![шаг 2](../../../en/adapterref/iobroker.fitbit-api/img/step2.png)

![шаг 3](../../../en/adapterref/iobroker.fitbit-api/img/step3.png)

![step4](../../../en/adapterref/iobroker.fitbit-api/img/step4.png)

Затем появятся `access token` и `refresh token`. Они только для чтения.

Если процесс не работает для вас, вы можете попытаться получить токен доступа вручную: https://dev.fitbit.com/apps/oauthinteractivetutorial

## Несколько пользователей
Чтобы прочитать данные для нескольких пользователей (например, членов семьи), вы должны очистить куки в браузере и создать дополнительный экземпляр этого адаптера.

Важно: Если вы не очистите куки браузера, вы войдете в систему с последним действительным пользователем.

## Разработка
API был реализован в соответствии с https://dev.fitbit.com/build/reference/web-api/basics/

## Changelog

### 0.1.1 (2019-11-06)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright 2019, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.