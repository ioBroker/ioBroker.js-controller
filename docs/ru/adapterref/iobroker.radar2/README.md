---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.radar2/README.md
title: сеть radar2 и доступность bloutooth
hash: TK3OepY8x8TFIMLfQhAqG+RCIVnShj01teU7JE3K9TU=
---
# Radar2 сеть и доступность bloutooth
![логотип](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Установлены](http://iobroker.live/badges/radar2-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)

[Немецкое руководство - Deutsche Anleitung](README_de.md)

## Тестирование видимости ioBroker radar2 для сетевых устройств и устройств Bluetooth, принтеров HP, UWZ-warnungs и ECB-валют
Этот адаптер пытается найти устройства, указанные в сети или с Bluetooth. Он также показывает текущий внешний IP-адрес сети, может считывать состояние чернил принтеров HP, а также предупреждения о погоде от UWZ для нескольких европейских стран. Он также может читать ежедневные курсы валют ЕЦБ.

Работает:

* Использование arp-scan и ping для поиска устройств в сети с IPv4 и IPv6!
* Прослушивание сообщений dhcp, в которых объявляются новые устройства, поступающие в сеть.
* Он работает на нескольких интерфейсах, что означает, что если в вашей системе есть Wlan и lan в разных сетях, он может видеть обе линии.
* Поддерживается нормальный Bluetooth и Bluetooth LE
* Состояние чернил принтера HP
* Обмен валюты Европейского центрального банка на Euero
* UWZ Предупреждения о погоде в районе, где ioBroker установлен
* Использует arp-scan и ping в сети как только экспериментальные программы, все остальное является внутренним для nodejs.
* Адаптер также работает без прав root, но перед установкой требуются некоторые действия по настройке.

Если вы поставите `-` в конце имени, устройство не будет засчитано в _notHere или _isHere.

Если IP-адрес начинается с 'http', radar2 интерпретирует его как URL-адрес / веб-адрес и пытается прочитать страницу с сервера, это можно использовать для проверки доступности веб-серверов (например, http://iobroker.net). ). В случае https может случиться так, что сервер недоступен, если у него нет обновленных ключей безопасности!

Чтобы использовать UWZ, вам нужно настроить ваше местоположение в ioBroker.Admin! Если значение max сообщений> 0, каждое предупреждение будет записано в отдельном состоянии, в противном случае они будут объединены.
Вы также можете установить, хотите ли вы использовать длинный текст предупреждения, но вся информация также доступна в кратком виде.

Валюты Европейского центрального банка можно посмотреть здесь: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Использование Bluetooth
Существует два типа BT-устройств: BT-LE (V 4.x +) и обычный BT (V <= 3.x). Адаптер имеет две разные функции сканирования для каждого из типов устройств.

1) для BT-LE: Noble (Nodejs modile) и команда 'hcitool lescan' 2) для обычного BT: BT scan (модуль Nodejs) и команда 'l2ping'

Каждое устройство BT может использовать только один из двух методов одновременно.

Noble и BT scan - это модули, которые скомпилированы при установке адаптера с помощью npm и должны работать на Linux, а также на большинстве установок Windows.
Hcitool и l2ping устанавливаются с помощью инструментов bluetooth в скрипте установки и доступны только для linux.

В конфигурации адаптера BT-LE macs должен быть идентифицирован как '!' перед mac-адресом, чтобы не сканировать их при обычном сканировании BT, например, l2ping.
Обычно Noble немного лучше, чем устройства идентификации hcitool lescan, но он также генерирует больше ошибок и может не устанавливаться во всех системах.
Аналогично, l2ping лучше находит обычные устройства BT, но не доступен на других платформах, кроме linux.
Поэтому вы можете настроить использование отдельно в конфигурации адаптера.

Если вы используете несколько устройств BT, вы можете указать номер устройства в конфигурации, по умолчанию используется значение «-1», которое использует первое доступное. Список всех доступных устройств можно увидеть на Linux с `lescan dev`.
В одном и том же адаптере вы можете использовать только одно устройство, если вы хотите сканировать несколько устройств, вам нужно использовать другой адаптер (ы или экземпляры).

## Отличия от радара-адаптера
Radar2 устанавливает устройства, которые видны сразу же, когда они становятся видимыми, для новых ip еще до того, как сканирование начинается снова.
Radar2 использует nodejs-библиотеки для поиска устройств Bluetooth, но теперь он может работать и в пользовательском пространстве от iobroker и не нуждается в получении root-доступа (см. Ниже требования к установке).
Вы можете настроить более одного IP-адреса (теперь IPv4 И IPv6) или адреса хоста (не URL-адреса) в одной строке, что позволяет пинговать различные пути к устройствам.
`arp-scan` используется для поиска MAC-адресов, он будет работать (если не указано иначе в его командной строке) на всех сетевых интерфейсах, имеющих внешний IPv4, поэтому он не будет обнаруживать устройства на основе MAC-адресов в IPv6, но теперь будет обнаруживать устройства в беспроводных и фиксированных сетях одновременно!

Доступность устройств обрабатывается по-разному. Каждое устройство будет получать состояние `_lasthere`, обновляемое с текущей датой и временем, когда бы оно ни просматривалось. В конце каждого сканирования адаптер проверяет все записи lastherehere, если они старше, чем текущее время - настроенные минуты отсутствия. Устройства, которые никогда не были здесь, также не будут иметь состояния `_lasthere`!

Веб-URL теперь могут лучше управлять серверами https.
Разрешение поставщика MAC-адресов теперь выполняется внутри, а не через Интернет. Только при запуске адаптера файл lib / vendor.json загружается, если этот файл старше 31 дня, то новая версия загружается из Интернета - ТОЛЬКО при запуске адаптера!

Часть Bluetooth была обновлена таким образом, что вы можете определить устройство Bluetooth, которое будет использоваться (0,1, ... по умолчанию: -1 = первый). Таким образом, вы можете использовать несколько BT-брелков для запуска нескольких адаптеров, таких как BLE и radar2, на одном устройстве (драйверы Bluetooth LE для одного устройства не могут быть доступны для нескольких программ одновременно).

Если найдены IP-адреса или устройства Bluetooth, которые вы не указали в списке устройств, они будут показаны в неизвестных списках IP и BT, и для каждого из них будет создано состояние. Таким образом, вы можете идентифицировать людей, подключающихся к вашей сети или ned устройств, которые могут быть интегрированы.
Если вы не хотите, чтобы они отображались как неизвестные, внесите их в соответствующие списки известных IP / BT в конфигурации адаптера.

Также новшеством является то, что интервалы для сканирования HP-Printer, ECB-, UWZ- и обычного сканирования можно определять отдельно.

## Установка
Перед установкой адаптера в ioBroker вам необходимо установить в Linux `arp-scan` и `libcap2-bin` и некоторые драйверы, которые вы можете сделать, выполнив следующие команды.
На Debian (Raspi-Stretch, Ubuntu, ...) это выглядит так:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
# and below need to be run whenever you update nodejs!
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Если первая строка устанавливает все, но `readlink` или `hcitools` не может быть найден, скорее всего, отсутствует путь, попробуйте найти путь с помощью `sudo find / -name readlink` (в моем случае это был `/usr/bin` ) который не был включен в $ PATH! Затем отредактируйте `.bashrc` и добавьте строку с `export PATH=$PATH:/usr/bin`!

Если вы обновляете узел или некоторые системные инструменты, вышеописанное должно быть выполнено снова!

В Windows (и, возможно, osx) нет arp-scan, что означает, что будет использоваться только ping, но никакие IP-mac адреса не могут быть отсканированы!

На Osx тоже блютуз может вообще не работать!

После установки конфигурации адаптера конфигурации вы можете удалить демонстрационные позиции.

### Специальная информация для arp-scan:
Определена стандартная командная строка `-lgq --retry=5 --timeout=400`, которая будет сканировать на всех интерфейсах IPv4 все 254 адреса, если он не ответит в течение 400 мс, он попытается 5 раз! Если вам нужно сканировать только определенный интерфейс, вы можете добавить, например, ` --interface=br0`, но обычно мостовые интерфейсы используются теперь по праву, но все же в докерских средах iot может быть необходимо. Повтор = 5 можно изменить на 6 или 7 для лучше обнаружения, выше 7 я не нашел улучшения! То же самое с тайм-аутом, выше 500 я не смог найти никакого улучшения.

### Совет для тех, кто переходит с радара на радар2-адаптер или с одного компьютера на другой.
* Если вы перемещаете радарные адаптеры, вы можете легко скопировать весь список устройств или настройки с помощью
* - Зайдите в админку к объектам и включите экспертный режим
* - Найдите дерево объектов, которое называется `system.adapter.radar.0` (где` 0` - это экземпляр, если у вас было несколько экземпляров, выберите правильный)
* - Справа от этой линии находится кнопка с карандашом, нажмите на нее
* - В появившемся окне выберите NATIVE
* - вы должны увидеть поля конфигурации, выбрать содержимое поля «устройства» и скопировать его в буфер обмена
* - сделать то же самое на целевом компьютере, выбрав `system.adapter.radar2.0` в Admin / objects и перейти также к NATIVE.
* - Удалить текст из поля «Устройства» и прошлое в старых из буфера обмена.
* - сохранить изменения

Эта методология перемещения настроек работает также между системами, но может не работать, если другой адаптер имеет другую структуру. Список устройств одинаков для радаров и радаров2, единственное отличие состоит в том, что в радар2 вы можете иметь несколько IP-адресов / вход, разделенных символом «,».

## Важно / Wichtig
* Адаптеру нужен узел> = v6. *!
* Адаптер может быть недоступен для использования bluetooth и arp-scan на osx, только ping ror ip, который не может обнаружить IP-адреса Mac!
* У адаптера также могут быть проблемы с Bluetooth в Windows, также arp-scan недоступен в Windows, будет использоваться только ping, который не может обнаружить IP-адреса Mac !.

## Changelog

### 1.2.5

* Updated to use the adapter for js-controller 3.0 
* Updated HP printer routine to understand some newer inkjet printers

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2019, frankjoke <frankjoke@hotmail.com>

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