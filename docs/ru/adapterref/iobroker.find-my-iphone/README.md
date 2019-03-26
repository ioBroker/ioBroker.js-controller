---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.find-my-iphone/README.md
title: без названия
hash: daxyieolHhbAq9VrluwQm72qUxweTgb7gdFxgwRZXyk=
---
![логотип](../../../en/adapterref/iobroker.find-my-iphone/admin/find-my-iphone.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.find-my-iphone.svg)
![тесты](http://img.shields.io/travis/soef/ioBroker.find-my-iphone/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус сборки](https://ci.appveyor.com/api/projects/status/9n5s1wgam59b4fv9?svg=true)

### IoBroker.find-my-iphone
#### Описание
ioBroker Adapter для поиска устройств Apple

#### Информация
Адаптер пытается прочитать свое собственное местоположение из адаптера ioBroker.javascript. Если он недоступен, будет определено местоположение внешнего IP-адреса. В противном случае будет взято 0.0 + 0.0. Местоположение используется ZU рассчитать расстояние до устройства.

#### Двухэтапная проверка (2FA Authentisierung)
Если вы используете «новую» двухэтапную проверку / аутентификацию, выполните следующие действия:

- Шаг 1: подключите адаптер с вашим именем пользователя и паролем.
- Шаг 2. Подтвердите регистрацию на одном из ваших устройств.
- Шаг 3. Измените пароль в адаптере, просто добавив 6-значный код

<br><br> Спасибо Торстену Воссу за это [совет](https://github.com/soef/ioBroker.find-my-iphone/issues/3#issuecomment-289200613).

#### Состояния
- **обновить** <br>

root: обновить все устройства.
под устройством: принудительное перемещение и обновление устройства

- **предупреждение** <br>

Воспроизвести звук на устройстве. <br> Текст состояния предупреждения будет отображаться на устройстве. <br> Параметр: [Текст] <br> Текст не является обязательным. Если дано это будет отображаться на устройстве

- **потерял**: <br>

Переключите устройство на **Lost Mode** <br> *Параметр: usertext [; номер телефона для звонка [; код доступа]]* <br> Если задан параметр пароля, пароль устройства будет установлен, если он еще не был установлен. <br> Примечание: после разблокировки устройства его можно использовать как обычно. Если пароль не был указан, а устройство не имело пароля, достаточно использовать его. <br> Совет: может также использоваться для предотвращения игры детей с устройством

- **lostMode** <br>

  логическое значение. В режиме потери это может быть установлено в false, чтобы остановить режим потери.

- **место нахождения**: <br>

  Адрес места расположения устройства

- **карта-URL** <br>

  Google mapps url с указанием положения устройства

- **positionType** <br>

  Wi-Fi | GPS

- **Понятно** <br>

  уровень батареи, долгота, широта, время, время

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.find-my-iphone
```

<!--

## License
The MIT License (MIT)

Copyright (c) 2016-2017 soef <soef@gmx.net>

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
-->