---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.googleauth/README.md
title: ioBroker.googleauth
hash: 1wMF7cNxCw6XrKvVD8nwrm18lNz4siJe1LV1GJJUBAc=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.googleauth.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.googleauth.svg)
![Значок Codacy](https://api.codacy.com/project/badge/Grade/9c7ca543cf1b48a8837cc14adb50a264)
![НПМ](https://nodei.co/npm/iobroker.googleauth.png?downloads=true)

<img src="admin/logo-google.svg" alt="Логотип" width="100" height="100">

# IoBroker.googleauth
Этот адаптер является расширением для [веб-адаптер](https://github.com/ioBroker/ioBroker.web). Это позволяет вам войти в систему с вашей учетной записью Google.
Чтобы расширить страницу входа с помощью соответствующей кнопки «Войти с помощью Google», используйте адаптер веб-расширения [веб-логин](https://github.com/Vertumnus/ioBroker.weblogin).

Конечно, расширение полезно только в том случае, если вы активировали аутентификацию на своем веб-сервере ioBroker.

## Конфигурация
### Google API
Прежде всего, вам необходимо создать приложение в [Консоль разработчика Google](https://console.developers.google.com/).
Таким образом вы получите *идентификатор клиента* и *секрет клиента* необходимые для работы входа в Google.
Вы можете найти [Гид](https://developers.google.com/identity/protocols/oauth2/web-server) на странице разработчиков Google.
Но здесь вы получите сокращенное руководство:

1. Откройте [Консоль разработчика Google] (https://console.developers.google.com/) (при необходимости войдите в свою учетную запись Google)
2. Выберите предпочтительный проект или создайте новый.
3. Перейдите на страницу учетных данных.
4. Нажмите **Создать учетные данные> Идентификатор клиента OAuth**
5. Выберите тип приложения **Веб-приложение**
6. Дайте своему приложению имя (например, ioBroker).
7. Укажите авторизованный URI перенаправления.

   * Вам нужен используемый протокол (http или https)
   * имя вашего хоста (например, iobroker.example.com)
   * используемый вами порт (например, 8090)
   * и фиксированный маршрут / логин / google / cb

     > Полный пример: _https://iobroker.example.com: 8090 / login / google / cb_

После создания приложения вы получите *идентификатор клиента* и *секрет клиента* которые вам понадобятся на следующем шаге.

> __Советы по авторизованному URI перенаправления__>> Вы можете использовать несколько URI перенаправления. Единственное, что всегда одно и то же, - это фиксированный маршрут / логин / google / cb.
> Локальный хост также разрешен. Вы можете использовать его для тестирования в своей локальной системе.
> Но в целом вам нужно имя хоста с доменом верхнего уровня (например, .com или .org), поэтому вам нужно настроить подходящее имя для вашего сервера ioBroker в вашей сети, например: iobroker.mynetwork.net.

### Адаптер
Вам необходимо заполнить три поля.

__Расширенный веб-адаптер__

Здесь вы можете выбрать экземпляр веб-адаптера, который вы хотите расширить с помощью аутентификации Google.
По умолчанию все экземпляры.

__ID клиента__

В этом поле вы должны указать *идентификатор клиента* из вашего приложения, которое вы создали на предыдущем шаге.

__Client Secret__

В этом поле вы должны указать *секрет клиента* из вашего приложения.

## Применение
Для полноценного использования этого расширения рекомендуется также использовать [адаптер weblogin](https://github.com/Vertumnus/ioBroker.weblogin).
Он предоставляет на странице входа в систему веб-сервера флажок с именем **Первый вход с помощью учетной записи** и кнопку **Войти с помощью Google** если настроены соответствующим образом.

> В противном случае вам придется управлять им самостоятельно, чтобы аутентификация Google работала.

Если вы входите в систему с помощью своей учетной записи Google в первый раз, вы должны установить флажок **Первый раз** и указать свое *имя пользователя* и *пароль* Это необходимо, чтобы связать вашу учетную запись Google с вашим профилем пользователя в ioBroker. Вместо кнопки **Войти** вы должны нажать кнопку **Войти с помощью Google**

После этого первого входа в систему при последующих входах вам нужно будет только нажать кнопку **Войти с помощью Google**

> Если вы в настоящее время не вошли в свою учетную запись Google, вы будете перенаправлены в Google для входа.

## License
MIT License

Copyright (c) 2021 [Armin Junge](mailto:armin.junge.81@gmail.com)

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