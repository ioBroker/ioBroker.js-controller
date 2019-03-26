---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: Перемещено на https://github.com/iobroker-community-adapters/ioBroker.email
hash: 5isKTT65TITgheokl/6APmqn+i1mcxGGKaBU8VI2Q2A=
---
# Перемещено на https://github.com/iobroker-community-adapters/ioBroker.email
![логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](http://iobroker.live/badges/email-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.email.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)
![NPM](https://nodei.co/npm/iobroker.email.png?downloads=true)

# IoBroker email ==============
Отправляйте электронные письма от ioBroker.

Вся работа заставляет [nodemailer](https://github.com/nodemailer/nodemailer), а ioBroker просто использует ее.

** Для этого адаптера требуется nodejs 6.x или выше !! **

Чтобы использовать Gmail, вам может потребоваться настроить «Разрешить менее безопасные приложения» в своей учетной записи Gmail, если только вы не используете 2FA, в этом случае вам потребуется создать пароль для конкретного приложения. Вам также может понадобиться разблокировать вашу учетную запись с помощью «Разрешить доступ к вашей учетной записи Google», чтобы использовать SMTP.

## Использование
Чтобы отправить письмо от ScriptEngine, просто напишите:

```javascript
// send email to all instances of email adapter
sendTo("email", "Email body");

// send email to specific instance of email adapter
sendTo("email.1", "Email body");

// To specify subject or other options
sendTo("email", {
    from:    "iobroker@mydomain.com",
    to:      "aabbcc@gmail.com",
    subject: "Message from ioBroker",
    text:    "This is test email to you!"
});

// To send attachments
sendTo("email", {
    attachments: [
       // use file on disk as attachment
       {path: "/pathToImage/picture1.jpg"},
       {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
       }
    ]
});

// To send in html format
sendTo("email", {
    html: "<p>Embedded image: <img src='cid:image1'/></p>",
    attachments:[
        {path: "path/to/file/image1.jpg", cid: "image1"}
    ]
});

```

Для отправки электронной почты с другого адаптера используйте функцию **adapter.sendTo**

## Поддерживаемые сервисы
- 1und1
- AOL
- DebugMail.io
- DynectEmail
- FastMail
- GandiMail
- Gmail
- Годадди
- GodaddyAsia
- GodaddyEurope
- hot.ee
- Hotmail
- iCloud
- ит
- mail.ee
- Mail.ru
- Mailgun
- Mailjet
- Мандрил
- Naver
- Office365
- OpenMailBox
- Почтовый штемпель
- QQ
- QQex
- SendCloud
- SendGrid
- SES
- SES-US-EAST-1
- SES-US-WEST-2
- SES-EU-WEST-1
- Спаркпост
- Yahoo
- Яндекс
- Зохо
- Специфично для пользователя (сервер, порт и безопасность определяются вручную)

Для других услуг см. Документацию **Nodemailer** `§§LLLLL_0§§`

## Changelog
### 1.0.4 (2018-03-26)
* (skraw.iobroker) Add ith

### 1.0.3 (2018-03-04)
* (bluefox) fix blockly
* (bluefox) Admin3 ready

### 1.0.2 (2017-01-31)
* (instalator) fix translations

### 1.0.1 (2016-12-20)
* (bluefox) add Office365

### 1.0.0 (2016-10-12)
* (bluefox) support of blockly

### 0.2.1 (2016-09-03)
* (bluefox) fix sending emails after first one

### 0.2.0 (2016-08-29)
* (bluefox) filter out double messages
* (bluefox) use new nodemailer packet

### 0.1.2 (2015-04-30)
* (bluefox) fix settings if "user defined" was selected

### 0.1.1 (2015-04-28)
* (bluefox) update configuration page and decode errors

### 0.1.0 (2015-01-02)
* (bluefox) prepare npm

### 0.0.4 (2014-11-2)
(bluefox) support of new naming concept

### 0.0.3 (2014-10-09)
* (bluefox) support of daemon mode
* (bluefox) add Gruntfile.js

## License

The MIT License (MIT)

Copyright (c) 2014-2018 bluefox

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