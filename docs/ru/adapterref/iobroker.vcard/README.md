---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vcard/README.md
title: Адаптер vCard для ioBroker
hash: rUHMx/sduIGMe3JSK2JEegk6Z/mN1Wdwbdw1sMIrHBg=
---
![логотип](../../../en/adapterref/iobroker.vcard/admin/vcard.png)

# Адаптер vCard для ioBroker
## Описание
Основной задачей адаптера vCard является замена телефонных номеров выходов адаптера ioBroker.fritzBox.

Этот адаптер читает файл vCard и предлагает возможность:

а) вывод имен (полных имен) на Outputs.FilteredFullNames.
б) вывод адресов электронной почты на Outputs.FilteredEmailAddresses.
в) вывод почтовых адресов на Outputs.FilteredPostalAddresses.
г) вывод адресов электронной почты на Outputs.FilteredEmailAddresses.
e) выходные данные a) b) c) и d) могут быть активированы путем установки шаблона поиска (который выполняется для полного имени) в Inputs.Filter. Этот фильтр работает с учетом регистра.
f) если для значения установлено значение Inputs.ReplacePhoneNumbersChX (X: номер канала), все телефонные номера внутри этого значения заменяются соответствующим полным именем. Вывод записывается в Outputs.ReplacedPhoneNumbersChX. Замена игнорирует начальные «0» и «+49» в немецких телефонных номерах. Inputs.ReplacePhoneNumbersChX может быть установлен вручную, через скрипт или по прямой ссылке.
Для прямой ссылки введите соответствующий объект в настройках.
g) Outputs.TodaysBirthdays показывает полное имя любого человека, у которого сегодня день рождения.
h) если на одном выходе несколько результатов, различные результаты разделяются разрывом строки HTML.

_По настоящему времени адаптер был протестирован с экспортом "Mac контакты" и "Outlook" (vCard файл версии 3.0) ._

### VCF Path
* Windows: c: /data/vcard.vcf
* Linux: /tmp/vcard.vcf
* http: http://192.168.1.1/data/vcard.vcf
* http (FritzBox Nas): http://192.168.1.1/nas/filelink.lua?id=164fe89123456789

### Пример CSS (для фиксированной ширины столбца)
** Стиль заголовка: **

```
<style type="text/css">
spanVcard1 {
display: inline-block;
width: 300px;
}
</style>
```

** Префикс стиля: ** `<spanVcard1>`

** Стиль Postfix: ** `</spanVcard1>`

** Примечание. Каждому каналу необходим собственный тег (например, spanVcard1, spanVcard2, spanVcard3, spanVcard4, spanVcard5)! **

## Предварительно требования:
- [ioBroker] (http://www.ioBroker.net "Домашняя страница ioBroker")

## LOP
* Чтение контактов через CardDav

## Changelog

### 0.0.9 (2016-11-12)
* Addapter category changed 

### 0.0.8 (2016-05-27)
* Bugfixing new Channels  

### 0.0.7 (2016-05-21)
* Typos  
* Readme updated  

### 0.0.6 (2015-01-16)
* Typos  
* Readme updated  

### 0.0.5 (2015-11-15)
* Reading contacts via http updated  
* Multiple channels subscribed to one output fixed  
* CSS Example updated

### 0.0.4 (2015-11-6)  
* Missing dependency  

### 0.0.3 (2015-10-25)
* Three channels for replacing numbers
* Channels can be connected to outputs of other adapters (no script needed)
* Replaced names can be formated by CSS  
* VCF files can be read via http

### 0.0.2 (2015-10-02)
* Documentation updates
* Missing icon
* vcard-json issue with white spaces (inside Outlook files)

### 0.0.1 (2015-09-18)
* Initial version

## License
![Number of Installations](http://iobroker.live/badges/vcard-installed.svg) ![Number of Installations](http://iobroker.live/badges/vcard-stable.svg) The MIT License (MIT)

Copyright (c) 2016-2019 hometm 

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