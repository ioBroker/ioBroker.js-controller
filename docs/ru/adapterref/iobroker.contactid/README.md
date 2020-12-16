---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: oBxuLRhlt78n2XXNk74mEFQfg20OY49N3c+cguw4iq4=
---
![Логотип](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![Количество установок (последнее)](http://iobroker.live/badges/contactid-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/contactid-stable.svg)
![Статус зависимости](https://img.shields.io/david/schmupu/iobroker.contactid.svg)
![Известные уязвимости](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
** Тесты: ** ![Тестирование и выпуск](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

Протокол Contact ID, используемый системами охранной сигнализации для связи с центральными станциями.

Этот адаптер является сервером Contact ID. При срабатывании тревожного события система охранной сигнализации отправляет по IP сообщение Contact ID на центральную станцию.
Вы можете использовать ioBroker с этим адаптером в качестве центральной станции. Например. вы можете отправить сообщение о тревоге по Conntact ID в телеграмме.

Сообщение Contact-ID

  SSSS 18QEEEGGZZZC

  * SSSS - подписчик. Эти четыре цифры идентифицируют конкретную систему охранной сигнализации или клиента центральной станции. ioBroker позволяет использовать более длинные имена подписчиков.

  * 18 - Тип сообщения. Обычно в этом поле всегда должно быть «18».
  * Q - квалификатор события.
  * EEE - Код события.
  * GG - Номер группы / раздела.
  * ZZZ - номер зоны (001-999). Это номер зоны, вызвавшей тревогу.
  * C - Контрольная сумма.

[Протокол Contact ID](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Установка и настройка
1. Установите адаптер
2. Конфигурация адаптера:

Выберите IP-адрес и порт для прослушивания запросов Conctact-ID.
Зарегистрируйте свое имя подписчика, чтобы идентифицировать ваши сообщения о охранной сигнализации и выбрать тип охранной сигнализации.

3. Настройте систему защиты от взлома для отправки сообщений Contact ID.

    Lupusec XT1:

Einstellungen -> Contact ID: rptn: // subcriber @ ip-address-iobroker: port Пример: rptn: //test@192.168.20.1: 50000

    Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> Contact ID: ip: // subcriber @ ip-address-iobroker: port / CID Пример: ip: //test@192.168.20.1: 50000 / CID

4. Тестирование Adpater

  Откройте командную оболочку и введите

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Теперь вы можете отправить сообщение Conntact ID. Для систем охранной сигнализации Lupsec сообщение начинается и заканчивается [и]. Введите свой сеанс Telnet:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  Теперь вы можете увидеть сообщение в объектах ioBroker.

## Changelog

### 1.0.2 (2020.12.13)
* (Stübi) Bugfixing, ACK-invalid Format - Issue #14 

### 1.0.1 (2019.10.14)
* (Stübi) Bugfixing, Issue #9

## License
MIT License

Copyright (c) 2020 Thorsten Stueben <thorsten@stueben.de>

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