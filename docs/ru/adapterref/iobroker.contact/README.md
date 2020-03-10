---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.contact/README.md
title: ioBroker.contact
hash: l0fM56buVj7TYn/lsPSdNY8WP6oW0ioT1XvE9pTydQ4=
---
![логотип](../../../en/adapterref/iobroker.contact/admin/contact.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.contact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.contact.svg)
![Количество установок (последняя)](http://iobroker.live/badges/contact-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/contact-stable.svg)
![Статус зависимости](https://img.shields.io/david/WLAN-Kabel/ioBroker.contact.svg)
![Известные уязвимости](https://snyk.io/test/github/WLAN-Kabel/ioBroker.contact/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contact.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.contact/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/WLAN-Kabel/ioBroker.contact?branch=master&svg=true)

# IoBroker.contact
## Контактный адаптер для ioBroker
Читайте ваши контакты в Google и Nextcloud.

## Сделать
*

## Аутентификация Google (только для учетных записей Google, а не для учетных записей nextcloud)
Следующий шаг необходим, только если ваш ioBroker установлен на другом компьютере / сервере и вы не можете получить доступ к веб-интерфейсу через localhost.

### Windows:
Запустите ```nodepad.exe``` с правами администратора и откройте файл ```C:\Windows\System32\drivers\etc\hosts```.
Добавьте запись, например, ```192.168.0.10    example.com //<IP-Adress ioBroker>     <FQDN>``` Сохраните файл и откройте веб-интерфейс через <FQDN>, который вы записали в файле hosts. Пример: http://example.com:8081

### Linux:
    Скоро ...

### Mac
    Скоро ...

### Ключ API Google
#### !!! Примечание. Если вы уже установили и настроили адаптер iobroker.contact, вам нужно всего лишь добавить API в ваш проект (3.).
1. Вам нужен ключ API. Перейдите на страницу https://console.cloud.google.com/apis/dashboard и войдите в свою учетную запись Google.

2. Откройте список в шапке и создайте новый проект. Введите имя проекта, например, «ioBroker», и нажмите «Создать».

3. Убедитесь, что вы выбрали правильный проект из списка. Откройте вкладку библиотеки. Найдите «контакт» и нажмите «Google People API».

4. Нажмите «Активировать», а затем «API и сервисы». Откройте вкладку «Экран согласия OAuth» и введите имя приложения, например «ioBroker». Вы также можете загрузить логотип, но это не обязательно.

5. Откройте вкладку «Учетные данные», нажмите на выпадающий список «Создать учетные данные» и выберите «Идентификатор клиента OAuth». На следующем шаге выберите «Веб-приложение». Введите имя типа «ioBroker» или «Webclient». Добавьте `` `http:// <FQDN>: <Порт из конфигурации адаптера>` `` к авторизованным источникам JavaScript. Добавьте `` `http: // <FQDN>: <Порт из конфигурации адаптера> / google``` и` `` http: // <FQDN>: <Порт из конфигурации адаптера> / google / `` `к авторизованному перенаправлению URIs.

6. Создайте идентификатор клиента и скопируйте отображаемый идентификатор клиента и секрет клиента.

Перейдите в конфигурацию адаптера и добавьте идентификатор клиента и секрет клиента.

### Contact.0
| Государственное название | смысл |
| - | - |
| запрос | Запросить контакт для номера телефона |
| фамилия | Фамилия запрашиваемого контакта |
| данное имя | Имя запрашиваемого контакта |
| полное имя | Полное имя запрашиваемого контакта |
| фото | Фото запрошенного контакта |
| id | ID запрошенного контакта |

### Contact.0. *.
| Государственное название | смысл |
| - | - |
| фамилия | Фамилия контакта |
| данное имя | Имя имени контакта |
| полное имя | Полное имя контакта |
| фото | Фото контакта |
| адреса. * | Адреса контактов |
| адреса электронной почты. * | Адреса электронной почты контакта |
| номера телефонов. * | Номера телефонов контактов |

## Javascript
Запрос может быть отправлен адаптеру через ```sendTo()```, как и точка данных запроса, но вы получаете объект JSON, который может быть обработан в сценарии (уже использовался: https://forum.iobroker.net / тема / 28294 / асинхронный обратный вызов-обещание-Await-Hilfe.

```js
sendTo('contact.0', 'query', {phonenumberr: '+49 1234 567890'}, (obj) => {

    if(obj.error) {

        log(obj.error);

    } else {

        log(JSON.stringify(obj.contact));

    }

});
```

## Changelog

### 1.1.3 (2020-01-23)
* (WLAN-Kabel) The roles have been changed to official once
* (WLAN-Kabel) Fixed deprecation of Buffer
* (WLAN-Kabel) Added error handler for http server

### 1.1.2 (2020-01-07)
* (WLAN-Kabel) Server will stopped on unload
* (WLAN-Kabel) Removed adapter from state settings

### 1.1.1 (2020-01-06)
* (WLAN-Kabel) Cron job will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages

### 1.1.0 (2020-01-05)
* (WLAN-Kabel) sendTo() is now supported
* (WLAN-Kabel) Fixed issue where roads are being written into the roll
* (WLAN-Kabel) Fixed issue where contacts are deleted when refreshed

### 1.0.1 (2019-12-29)
* (WLAN-Kabel) Fixed problem with companies in google contacts
* (WLAN-Kabel) Removed 'undefined' from fullName if one name is missing
* (WLAN-Kabel) Adapter no longer hangs on the schedule
* (WLAN-Kabel) Nextcloud default password changed because the old password caused messages

### 1.0.0 (2019-12-23)
* (WLAN-Kabel) Added Nextcloud contacts
* (WLAN-Kabel) Added state fullName to query and each contact
* (WLAN-Kabel) FQDN and interval moved to main tab
* (WLAN-Kabel) Changed channel name for addresses, emailAddresses and phoneNumbers
* (WLAN-Kabel) Added type state for emailAddresses and phoneNumbers

### 0.0.3 (2019-12-21)
* (WLAN-Kabel) Standard country code can now be selected yourself

### 0.0.2 (2019-12-21)
* (WLAN-Kabel) Fixed an issue that restricted the search
* (WLAN-Kabel) Limit of 100 contacts has been removed

### 0.0.1 (2019-12-17)
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

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