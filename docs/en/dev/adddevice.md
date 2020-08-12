# How to add the device to alexa or google home
To add the device we have 4 steps:
- Extend the state roles with required new roles if needed.
- Extend the type detector with new device
- Add device to iobroker.devices to make it possible to simulate it.
- Add device to alexa/google and co

## New roles
We have 3 (or even more) sources, that must be checked before new device will be added:
- Alexa smarthome API: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex API: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google API: https://developers.google.com/assistant/smarthome/guides

Additionally it could be useful to check the existing device in some adapter.

Let's take air conditioning as example. We have:
- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex has most full picture of the states so it would be reasonable to take it as basis. 
We could see that for thermostat mode and for swing position there are no roles in the documentation.

So we will add it here: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

All other states (power, set temperature) are exist yet.

## Type detector
After the all required roles are added of found the type detector must be extended.
Add new device type to the global list: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29
Take some device as basis and copy that in the `patterns` of the `ChannelDetector` class.
The type detector must somehow distinguish between devices, so your device must have unique set of roles.
We will take `level.temperature` and `level.mode.thermostat` as a specific pattern for air conditioner and mark these two states as `required`.
Most complex devices must be on the top in the list, so they will be detected first and at the end will come more and more simple devices.

You must create a new version of `iobroker.type-detector` npm package.

 ## iobroker.devices
 Go to https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json and update your version there.
 After that extend the icon's list: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js
 
 And create a new version too.