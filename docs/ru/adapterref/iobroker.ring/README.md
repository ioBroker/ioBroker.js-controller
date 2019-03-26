---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ring/README.md
title: Кольцевой адаптер
hash: o3ElFNuF53MNsHtyLEEpzVj1oCXP6yO9LfjM4Ri29+I=
---
![логотип](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI Статус сборки](https://travis-ci.org/schmupu/ioBroker.ring.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.ring?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/ring-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ring.svg)
![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Кольцевой адаптер
Требуется node.js 8.0 или выше и Admin v3!

Адаптер Ring работает с устройствами Ring, такими как Ring Video Doorbell и Ring Cam, и показывает, звонит ли somenone дверной звонок или обнаруживается движение. Дверной звонок или видеокамера звонка не отправляют видеопоток, если обнаружено движение или звонок. Вместо этого будет предоставлена информация SIP для видеоконференции SIP.
Вы можете использовать, например, Blink SIP-клиент на [http://icanblink.com/](http://icanblink.com/). Чтобы заставить работать видео, перейдите в «Настройки» Blink и в разделе «Учетные записи» переключите вкладку на «Медиа» и отмените выбор «Шифровать аудио и видео» в разделе «Параметры RTP». Будьте осторожны, срок действия информации SIP истекает через несколько секунд! Надеюсь, я скоро смогу поддерживать видеопоток. К сожалению, [ring.com](https://ring.com) не имеет официального API, поддерживающего эту функцию.
Если вы нажмете кнопку livestreamrequest, вы получите новую информацию SIP для создания сеанса видеовызова SIP. Если вы используете облако [ring.com](https://ring.com), в истории вы найдете ссылку http на ваше последнее видео с записью движения / дверного звонка.

## Установка и настройка
После установки адаптера вы должны ввести адрес электронной почты и пароль своей учетной записи [ring.com](https://ring.com).

Пример получения изменений при обнаружении движения или дверного звонка:

```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For this reason, a lot has to be redesigned.  

### 1.0.2 (01.02.2019)
* (Stübi) More debug information 

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode 

### 1.0.0 (04.01.2018)
* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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