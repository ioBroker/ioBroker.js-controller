---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adddevice.md
title: Как добавить устройство в alexa или google home
hash: dxvpM1J/sLmVRalZa8zSzteNQrmTXTSsddxQhEG6CW0=
---
# Как добавить устройство в alexa или google home
Чтобы добавить устройство, у нас есть 4 шага:

- При необходимости расширите государственные роли необходимыми новыми ролями.
- Расширьте тип детектора новым устройством
- Добавьте устройство в iobroker.devices, чтобы можно было его смоделировать.
- Добавить устройство в alexa / google and co

## Новые роли
У нас есть 3 (или даже больше) источника, которые необходимо проверить перед добавлением нового устройства:

- API Alexa smarthome: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Яндекс API: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google API: https://developers.google.com/assistant/smarthome/guides

Кроме того, может быть полезно проверить существующее устройство в каком-либо адаптере.

Возьмем, к примеру, кондиционер. У нас есть:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Наиболее полная картина состояний у Яндекса, поэтому разумно взять ее за основу.
Мы видели, что для режима термостата и для положения качания в документации нет ролей.

Поэтому мы добавим его сюда: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

Все остальные состояния (мощность, заданная температура) пока существуют.

## Детектор типа
После добавления всех необходимых ролей найденного тип детектора необходимо расширить.
Добавьте новый тип устройства в глобальный список: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Возьмите какое-нибудь устройство за основу и скопируйте его в `patterns` в класс `ChannelDetector`.
Детектор типа должен каким-то образом различать устройства, поэтому у вашего устройства должен быть уникальный набор ролей.
Мы возьмем `level.temperature` и `level.mode.thermostat` в качестве особого шаблона для кондиционера и отметим эти два состояния как `required`.
Самые сложные устройства должны быть наверху в списке, поэтому они будут обнаружены первыми, а в конце будут появляться все больше и больше простых устройств.

Вы должны создать новую версию пакета npm `iobroker.type-detector`.

 ## iobroker.devices
 Перейдите на https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json и обновите там свою версию.