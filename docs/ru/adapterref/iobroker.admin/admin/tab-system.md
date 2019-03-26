---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-system.md
title: Системные настройки
hash: Dn5CtO5okGfvvxL112X2km8W/OB3HqarZ13QntOJiLU=
---
# Системные настройки
Это устанавливает основные параметры для ioBroker.

![Настройки системы администратора](../../../../de/adapterref/iobroker.admin/admin/img/tab-system_Systemeinstellungen.jpg)

## Основные настройки
### Системный язык
так что вы можете выбирать между системными языками: немецкий, английский, русский

### Единичная температура
это значение используется некоторыми адаптерами. Возможно это °C или °F.

### Валюта
В настоящее время для этого не используется адаптер

### Формат даты
выберите способ отображения даты в admin и vis.

### Разделитель
Запятая или точка для значений с плавающей точкой

### Экземпляр истории по умолчанию
Этот экземпляр адаптера SQL / History / InfluxDB по умолчанию используется для flot и рикши (диаграммы)

## Репозитории или репозитории
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-system_Verwahrungsorte2.jpg)

ioBroker может получить список адаптеров из разных источников. Следующие источники перечислены во время установки:

* **по умолчанию** - http://download.iobroker.net/sources-dist.json - генерируется ежедневно в 01:00 на сервере.

Доступ очень быстрый, но информация о версии может быть до 24 часов.

* **онлайн** - https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json - хранилище

генерируется онлайн источником. Доступ может занять много времени, это самый последний источник

* **sources - conf / sources-dist.json** - также генерируется автоматически и занимает много времени, но ссылки могут быть устаревшими (некоторые адаптеры могут отсутствовать)

## Сертификаты
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-system_2017-01-19-09_33_54-ioBroker.jpg)

Вот центральное место для сертификатов, используемых для связи SSL / HTTPS. Сертификаты используются admin, web, simple-api, socketio. По умолчанию стандартные сертификаты установлены. Вы не можете ничего проверить с этим. Они только для связи SSL. Поскольку сертификаты открыты, вы должны использовать свои собственные (самозаверяющие) сертификаты, купить нужные сертификаты или переключиться на Let's Encrypt. Связь с сертификатами по умолчанию не защищена, и если кто-то хочет прочитать трафик, это можно сделать. Обязательно установите свои собственные сертификаты. например согласно [линукс](http://guides.intertech.de/ssl_certificate_self.html).

## Давайте зашифруем
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-system_2017-01-19-09_40_07-ioBroker.jpg)

Let's Encrypt - это бесплатный, автоматизированный и открытый исходный сертификат для независимой исследовательской группы по безопасности в Интернете (ISRG).

Для получения дополнительной информации о Let's Encrypt см. [здесь](https://letsencrypt.org/).

Некоторые установки используют динамический DNS или аналогичный. чтобы получить доступ к собственному домену через адрес, назначенный оттуда. IoBroker поддерживает автоматический запрос и обновление сертификатов в организации Let's Encrypt Organization.

Возможность использовать бесплатные разрешения Let's Encrypt существует практически во всех адаптерах, которые могут запускать веб-сервер и поддерживать HTTPS.

Если вы включите опцию для использования сертификатов, но не для автоматического обновления, соответствующий экземпляр попытается работать с сохраненными сертификатами.

Когда автоматические обновления включены, экземпляр будет пытаться запрашивать сертификаты у Let's Encrypt и обновлять их автоматически.

Сертификаты запрашиваются при первом вызове соответствующего адреса. что если вы, например, «sub.domain.com», настроенный в качестве адреса, а затем вызовы [https://sub.domain.com](https://sub.domain.com/) в сертификатах запрашиваются впервые, что может занять некоторое время, прежде чем будет получен ответ.

Выдача сертификатов является сложной процедурой, но если вы будете следовать приведенному ниже объяснению, получить бесплатные сертификаты будет легко.

** Процедура: **

1. Необходимо создать новую учетную запись с введенным адресом электронной почты (настройка в настройках системы)
2. Случайный ключ генерируется как пароль для учетной записи.
3. После создания учетной записи система открывает небольшой веб-сайт на порту 80 для подтверждения адреса.
4. Зашифруем **всегда** порт **80** чтобы проверить адрес.
5. Если порт 80 уже используется другим сервисом, пункт 4 будет реализован, поэтому назначьте другой порт другому сервису!
6. При запуске небольшого веб-сервера запрос на сертификаты для указанных адресов в настройках системы отправляется на сервер Let's encrypt.
7. Сервер Let's Encrypt отправляет обратно фразу запроса в ответ на запрос и через некоторое время пытается прочитать эту фразу запроса по адресу "http:// yourdomain: 80 / .well-known / acme-challenge /".
8. Когда сервер получает эту проблему с нашего сайта, сервер Let's Encrypt отправляет сертификаты. Они хранятся в каталоге, который вводится в системных настройках.

Это звучит сложно, но все, что вам нужно сделать, это активировать несколько флажков и ввести адрес электронной почты и веб-адрес в настройках системы.

Полученные сертификаты действительны в течение примерно 90 дней. После того, как эти сертификаты были выпущены в первый раз, запускается другая задача, которая автоматически продлевает срок действия.

Эта тема довольно сложна, и тысячи вещей могут пойти не так. Если это не работает, рекомендуется использовать облачный адаптер для доступа в дороге.

** Let's Encrypt работает только с версией node.js> = 4.5 **

## Статистика
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-system_2017-01-19-09_48_46-ioBroker.jpg)

Администратор ioBroker отправляет следующую информацию на download.iobroker.net:

<pre> {&quot;uuid&quot;: &quot;56cf0d20-XXXX-YYYY-BBBB-66eec47ZZZZZ&quot;, &quot;language&quot;: &quot;de&quot;, &quot;hosts&quot;: [{&quot;version&quot;: &quot;0.15.1&quot;, &quot;platform&quot;: &quot;Javascript / Node. js &quot;,&quot; type &quot;:&quot; win32 &quot;}],&quot; adapters &quot;: {&quot; admin &quot;: {&quot; version &quot;:&quot; 1.0.2 &quot;,&quot; platform &quot;:&quot; Javascript / Node.js &quot;},&quot; hm-rpc &quot;: {&quot; version &quot;:&quot; 1.1.2 &quot;,&quot; platform &quot;:&quot; Javascript / Node.js &quot;}}} </pre>

Это можно отключить, установив для статистики значение «** none **».

Однако разработчики просят эту информацию:

<pre> Мы упорно трудились, чтобы сделать этот проект с мертвой точки.
В ответ мы просим вас прислать нам статистику использования.
Никакая личная информация не будет отправлена на ioBroker.org.
Каждый раз, когда список адаптеров обновляется, анонимная статистика также отправляется.
Большое спасибо! </pre>