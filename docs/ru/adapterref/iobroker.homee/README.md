---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homee/README.md
title: ioBroker Homee Адаптер
hash: FhOuxeUOxXI0VM55+mR5qD8k0SJ09JRQMcCp5MY++ds=
---
![логотип](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Количество установок](http://iobroker.live/badges/homee-stable.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.homee.svg)

# IoBroker homee Адаптер
** Этот адаптер использует библиотеки Sentry, чтобы автоматически сообщать разработчикам об исключениях и ошибках кода. ** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. В [Sentry-Plugin Документация](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry report используется начиная с js-controller 3.0.

## Описание
Этот адаптер соединяет ioBroker с homee и предоставляет следующие функции:

* позволяет подключение через IP или homee-ID и имя пользователя / пароль
* прочитать все устройства (узлы) и состояния (атрибуты) и показать их значения, включая обновления в ioBroker
* разрешить изменение значений в ioBroker и отправить их обратно на дом к устройствам управления
* выступает в качестве провайдера истории ioBroker для всех состояний устройств, где история включена в homee. Это означает, что вы можете использовать значения истории, хранящиеся в homee, для отображения в ioBroker с помощью flot, Admin или также JavaScript, включая все агрегаты на уровне данных, как известно, например, из. Адаптер истории

(пока) не поддерживается:

* группы, потому что они не предлагают никаких функций, таких как состояние на уровне группы или реальная запись на все устройства одновременно в homee
* планы отопления

Этот адаптер основан на выдающейся работе [stfnhmplr] (http://twitter.com/stfnhmplr) и его [homee-api](https://github.com/stfnhmplr/homee-api).

## Известные вопросы
* На js-controller <1.5.0 это может иметь странные последствия при включении других провайдеров истории для некоторых ролей (например, «switch»)

## Как сообщать о проблемах и пожеланиях
Пожалуйста, используйте проблемы GitHub для этого.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем, пожалуйста, получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не от Admin, потому что Admin обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале в какое время.

## Changelog

### 1.0.7 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.0.6 (2020-06-12)
* (Apollon77) Fix Admin

### 1.0.5 (2020.04.12)
* (Apollon77) update homee lib to prevent a crash case

### 1.0.4 (2020.04.12)
* (Apollon77) fixes and optimizations
* (Apollon77) use js-controller 3.0 features if available 

### 1.0.2 (2020.03.22)
* (Apollon77) fixes and optimizations 

### 1.0.1 (2020.03.18)
* (Apollon77) fixes and optimizations 

### 1.0.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Apollon77 <iobroker@fischer-ka.de>

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