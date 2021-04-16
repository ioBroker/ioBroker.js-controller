---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weblogin/README.md
title: ioBroker.weblogin
hash: I98oTzc18MVOyi5a4EIXQVplwWgB9HoaxPgmU/KEY9E=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.weblogin.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weblogin.svg)
![Значок Codacy](https://app.codacy.com/project/badge/Grade/d2ff17f2787d4ad4ba0b5d8ad29504ba)
![НПМ](https://nodei.co/npm/iobroker.weblogin.png?downloads=true)

<img src="admin/logo-login.png" alt="Логотип" width="100" height="100">

# IoBroker.weblogin
Этот адаптер является расширением для [веб-адаптер](https://github.com/ioBroker/ioBroker.web).
Он дополняет страницу входа альтернативными возможностями входа в систему (вход в социальные сети).
В настоящее время он поддерживает только [Google аутентификация](https://github.com/Vertumnus/ioBroker.googleauth).

Конечно, расширение полезно только в том случае, если вы активировали аутентификацию на своем веб-сервере ioBroker.

## Конфигурация
### Расширенный веб-адаптер
Здесь вы можете выбрать экземпляр веб-адаптера, который вы хотите расширить этим адаптером.
По умолчанию все экземпляры.

### Показать флажок при первом входе в систему
Установите этот флажок, если вам нужен флажок для первого входа на странице входа.
Обычно это необходимо, чтобы связать выбранную вами учетную запись в социальной сети с вашим профилем пользователя в ioBroker.
По умолчанию это отмечено.

### Google
В настоящее время поддерживается только альтернативная возможность входа в систему. Если этот флажок установлен, на странице входа отображается кнопка «Войти через Google».
Эта возможность требует установки флажка при первом входе в систему. По умолчанию он отмечен в связи с его уникальностью.

## Применение
Если этот адаптер установлен и настроен, на странице входа в Интернет отображаются дополнительные элементы.
В зависимости от конфигурации отображается флажок при первом входе в систему и кнопки входа для выбранных вами учетных записей в социальных сетях.

![страница авторизации](../../../en/adapterref/iobroker.weblogin/doc/login-page.jpg)

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