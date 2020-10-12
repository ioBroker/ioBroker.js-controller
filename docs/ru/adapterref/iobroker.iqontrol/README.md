---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: Ay2RQh7lfazCKbYvUZDwexffhHec/t/lvj6dsFDX46k=
---
![Логотип](../../../en/adapterref/iobroker.iqontrol/admin/iqontrol.png)

![Количество установок](http://iobroker.live/badges/iqontrol-installed.svg)
![Стабильная версия](http://iobroker.live/badges/iqontrol-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![Статус зависимости](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

# IoBroker.iqontrol
** Тесты: **

| Linux / Mac / Windows: | Кроссбраузерная проверка: |
| --- | --- |

\ **Если вам это нравится, рассмотрите возможность пожертвования:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

## Адаптер iqontrol для ioBroker
Быстрое веб-приложение для визуализации.

![Скриншот](../../../en/adapterref/iobroker.iqontrol/img/screenshot_kueche.png)

\
![Скриншот](../../../en/adapterref/iobroker.iqontrol/img/screenshot_licht.png)

\
![Скриншот](../../../en/adapterref/iobroker.iqontrol/img/screenshot_heizung.png)

\
![Скриншот](../../../en/adapterref/iobroker.iqontrol/img/screenshot_rauchmelder.png)

\
![Скриншот](../../../en/adapterref/iobroker.iqontrol/img/screenshot_flot.png)

Работает в любом браузере.
Он полностью настраиваемый и отзывчивый.

> **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Добавить на домашний экран
Вы можете сохранить его как веб-приложение на главном экране, и оно будет выглядеть как родное приложение: ![Добавить в Homescreeen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

## Тебе нужно...
* Nodejs 10 или выше
* Web-адаптер с одним экземпляром, работающим по тому же протоколу (http или https), что и админ-адаптер, socket.IO установлен на 'интегрированный' и 'Force Web-Sockets' отключен
    * Если это противоречит другим адаптерам, просто добавьте еще один экземпляр с указанными выше настройками - iQontrol будет искать наиболее подходящий экземпляр веб-адаптера и использовать его для связи.
* Для подключения через *iobroker.pro-Cloud* как админ-, так и веб-адаптер должны быть настроены на http (не https)

* Если у вас возникнут какие-либо проблемы, ознакомьтесь с разделом [устранение неполадок] (# устранение неполадок) в конце этого файла ознакомительных сведений.

## Форум
Посетите [форум iobroker](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Как пользоваться
** Не бойтесь множества вариантов, которые у вас есть. ** Большинство из них работает сразу после установки. Вы *можете* но вам не обязательно использовать все возможности конфигурации, которые предлагает iQontrol! Просто начните так:

* Начните создавать представления.

Вы можете рассматривать просмотры как что-то вроде страницы.

* Затем создайте устройства на этих представлениях.

У устройств есть роль, которая определяет функцию устройства, какие значки используются и так далее.
В зависимости от этой роли вы можете связать несколько состояний с устройством. Это придаст устройству его функциональность.
Если в качестве роли вы выберете «Связать с другим представлением», вы сможете создавать ссылки на другие представления. Я предлагаю снимать скин с ссылок на другие представления с тем же фоном, что и у связанного представления.
Вы также можете попробовать использовать Autocreate-Function, чтобы выбрать существующее устройство из дерева объектов iobroker. Autocreate пытается определить роль и сопоставить как можно больше состояний.

* После этого вы можете создать панель инструментов, которая будет отображаться как нижний колонтитул.

Панели инструментов - это ссылки на представления.
Первым элементом панели инструментов будет ваш «Домашний вид», который будет загружен при запуске.

* Чтобы придать всему необычный стиль, вы можете загружать свои собственные изображения.

Вы можете использовать свои изображения в качестве фоновых изображений для представлений или для устройств.
Изображения в папке / usericons можно использовать в качестве иконок для устройств.
Бесплатные встроенные демонстрационные обои взяты с сайта www.pexels.com.

## Параметры URL
* Интерфейс вызывается через http [s]: // <url или ip of iobroker>: <порт веб-адаптера> / iqontrol / index.html`
    * `` <порт веб-адаптера> '' обычно 8082
* Чтобы открыть указанный экземпляр, вы можете добавить `` namespace = iqontrol. <instance-number> '' в качестве параметра URL
* Чтобы открыть указанное представление, вы можете добавить renderView = <viewID> в качестве параметра URL.
    * «<viewID>« должен быть отформатирован как «iqontrol. <instance-number> .Views. <view-name>«
* Примечание: это чувствительно к регистру!
* Чтобы открыть указанное представление в качестве домашней страницы, вы можете добавить `` home = <viewID> '' в качестве параметра URL. Это также изменит связанный вид первой записи на панели инструментов!
    * «<viewID>« должен быть отформатирован как «iqontrol. <instance-number> .Views. <view-name>«
* Примечание: это чувствительно к регистру!
* Чтобы открыть указанный диалог при загрузке страницы, вы можете добавить `ʻopenDialog = <deviceID>` в качестве параметра URL
    * `` <deviceID> `должен быть отформатирован как` ʻiqontrol. <instance-number> .Views. <view-name> .devices. <device-number> `` где `` <device-number> `` начинается с 0 (поэтому первое устройство в представлении - это устройство с номером 0)
* Примечание: это чувствительно к регистру!
* Чтобы установить или отменить возврат после настроек времени, используйте следующие параметры:
* `` returnAfterTimeTreshold =<time in seconds> `` для установки времени, по истечении которого вызывается целевой вид. Используйте `` 0 &#39;&#39;, чтобы отключить функцию возврата через время.
* `` returnAfterTimeDestiationView = <viewID> '', чтобы установить представление, которое вызывается после порога. Если не указано, будет использоваться домашний вид.
* Эти параметры полезны, если вы вызываете iQontrol с настенного планшета, который должен автоматически вернуться к домашнему виду после использования.

**Пример:**

* `` https://192.168.1.1: 8082 / iqontrol / index.html? namespace = iqontrol.1 & home = iqontrol.1.Views.Living-Room``
    * Обратите внимание на верхний и нижний регистр

## Иконки и фоновые изображения
* Вы можете использовать встроенные изображения или изображения, загруженные на вкладке изображений, или любой бесплатный URL-адрес, который вам нравится
* Вы также можете использовать переменную внутри URL-адреса изображения. Это может быть полезно, например, для прогнозов погоды. Используйте этот шаблон:
    * `` путь / к / firstloaded.png | другой путь / к / {iobrokerstate | fallback} .png``
    * Пример: `` ./../ iqontrol.meta / userimages / demo / bottle.jpg | ./../ iqontrol.meta / userimages / demo / {javascript.0.myimage | whitestone} .jpg``
* Это загружает `` ./../ iqontrol.meta / userimages / demo / bottle.jpg '', когда вы открываете представление
* Как только состояние javascript.0.myimage будет получено с сервера, изображение будет заменено на ./../ iqontrol.meta / userimages / demo / XXX.jpg, где XXX - это значение javascript.0.myimage.
* Если javascript.0.myimage не имеет значения, будет использоваться резервный вариант whitestone (использование отката необязательно)

### Индикаторы прогресса
* Для отображения индикаторов выполнения можно использовать SVG-определения в сочетании с переменными вместо файлов изображений.
* Есть интегрированные шаблоны vew на выбор, но вы также можете создавать свои собственные SVG

![Площадь Прогрессбара](img/progressbar_square.png) ![Круг индикатора выполнения](../../../en/adapterref/iobroker.iqontrol/img/progressbar_circle.png)

* См. [Wiki] (https://github.com/sbormann/ioBroker.iqontrol/wiki/Progress-Bars) для получения дополнительной информации.

## Имена устройств
* Так же, как переменные в URL-адресах изображений, вы можете использовать переменные в именах устройств. Синтаксис почти такой же:
    * `` Текст при загрузке | Текст после загрузки {iobrokerstate | fallback} `
* Дополнительно можно поместить iobrokerstate в квадратные скобки, тогда будет использоваться простое значение без его единицы измерения: «Текст при загрузке | Текст после загрузки {[iobrokerstate] | fallback}«
    * Пример: `` Погода загружается | Погода: {javascript.0.weather | Данные о погоде не найдены} ''
* Это показывает, что `` Погода загружается '', когда вы открываете представление
* Как только состояние javascript.0.weather будет получено с сервера, текст будет заменен на Weather: XXX, где XXX - это значение javascript.0. .weather
* Если javascript.0.weather не имеет значения, будет использоваться запасной вариант «Данные о погоде не найдены» (использование запасного варианта необязательно)

## Всплывающие сообщения
* Каждый экземпляр создает состояние iqontrol.x.Popup.Message.
* При передаче значений в это состояние будет отображаться всплывающее сообщение (или тост)
* Вы можете использовать html-теги для форматирования текста сообщения
* Существуют некоторые дополнительные состояния для дальнейшей настройки отображаемого всплывающего окна (они должны быть установлены до установки точки данных сообщения):
    * `` Продолжительность '': это время в мс, в течение которого отображается сообщение; если установлено значение 0, сообщение должно быть подтверждено
    * ClickedValue и ClickedDestinationState: если пользователь щелкнет всплывающее окно, значение из ClickedValue будет отправлено в iqontrol.x.Popup.POPUP_CLICKED и, если указано, дополнительные к точке данных в ClickedDestinationState
        * Если значение не указано, будет использовано значение true.
    * «ButtonNames»: здесь вы можете указать список кнопок, разделенных запятыми, которые будут отображаться в нижней части всплывающего окна (например, «OK, Abort»)
        * «ButtonValues» и «ButtonDestinationStates»: это списки значений, разделенных запятыми, которые будут отправлены в «iqontrol.x.Popup.BUTTON_CLICKED» и, если указано, дополнительно к точке данных в «ButtonDestinationStates». `, если пользователь нажимает соответствующую кнопку
* Вместо точки данных вы можете использовать команды COMMAND: renderView и COMMAND: openDialog в качестве ButtonDestinationState для визуализации представления или открытия диалогового окна.
* ButtonValue затем определяет представление соотв. диалоговое окно и должно иметь формат «iqontrol. <номер-экземпляра> .Views. <имя-просмотра>« соответственно. Iqontrol. <instance-number> .Views. <view-name> .devices. <device-number> `` где `` <device-number> `начинается с 0 (таким образом, первое устройство в представлении - это устройство номер 0)
* Если вы используете только одно значение (вместо списка, разделенного запятыми), это значение будет использоваться для всех кнопок
* Если вы оставите `` ButtonValues '' пустым, будет использовано имя кнопки.
* Если вы используете только одно состояние назначения (вместо списка, разделенного запятыми), это состояние будет использоваться для всех кнопок
        * `` ButtonCloses '': это список логических значений, разделенных запятыми (`` истина '' / `` ложь ''), которые указывают, следует ли закрывать всплывающее окно при нажатии соответствующей кнопки
* В качестве альтернативы вы можете установить эти значения с помощью команды sendTo с параметрами PopupMessage, PopupDuration, PopupClickedValue и т. Д.
    * Пример: `sendTo (" iqontrol "," send ", {PopupMessage: 'Это мое сообщение', PopupDuration: 2500, PopupClickedValue: 'messageConfirmed'});` `
* Вы также можете использовать блочно для отправки сообщений в iQontrol

![Всплывающий снимок экрана](img/popup_screenshot.png) ![Всплывающее окно Blockly](../../../en/adapterref/iobroker.iqontrol/img/popup_blockly.png)

## Виджеты
* Каждая плитка имеет BACKGROUND_URL и точку данных BACKGROUND_HTML.
* Здесь вы можете определить ссылку (через BACKGROUND_URL) на веб-сайт или разместить прямой HTML-код (через BACKGROUND_HTML), который будет отображаться в качестве фона плитки
* Это дает вам возможность размещать (интерактивный) контент внутри плитки (например, часы, FLOT-диаграммы, таблицы, прогнозы погоды и т. Д.)
* По умолчанию события мыши будут направлены на это содержимое (таким образом, вы больше не можете щелкнуть саму плитку), но вы можете отключить это с помощью параметра «Направлять события мыши на плитку вместо содержимого BACKGROUND_URL / HTML»
* iQontrol предлагает роль устройства «Виджет», который имеет несколько предопределенных параметров, которые будут в основном использоваться при отображении веб-сайта как виджета. Но вы можете добиться того же результата с любой другой ролью, правильно изменив параметры устройств.

![Всплывающий снимок экрана](../../../en/adapterref/iobroker.iqontrol/img/widget_screenshot.png)

### PostMessage-Communication (только для экспертов)
* Технически содержимое BACKGROUND_URL / HTML размещается внутри HTML-элемента, называемого iframe, который представляет собой веб-сайт внутри веб-сайта.
* Включив опцию «Разрешить postMessage-Communication для BACKGROUND_URL / HTML», вы можете включить postMessage-Communication между веб-сайтом внутри этого iframe и самим iQontrol.
* Для отправки команд в iQontrol вы можете использовать следующую javascript-команду: `` window.parent.postMessage (message, "*"); ``
    * «message» - это объект javascript формата «{command: command, stateId: stateId, value: value}«
    * Поддерживаются следующие команды сообщений:
        * `` {command: "setWidgetState", stateId: <widgetStateId>, value: <value>} `` - это установит состояние ioBroker `ʻiqontrol. <instance> .Widgets. <widgetStateId>` `на значение` `<value>` `(` `<value>` может быть строкой, числом или логическим значением или объектом вроде `` {val: <value>, ack: true | false} ``)
        * `` {command: "getWidgetState", stateId: <widgetStateId>} `- это заставит iQontrol отправить значение состояния ioBroker` ʻiqontrol. <instance> .Widgets. <widgetStateId> `` (см. ниже, как получить ответ-сообщение)
        * `` {command: "getWidgetStateSubscribed", stateId: <widgetStateId>} `` - это заставит iQontrol отправлять значение состояния ioBroker `ʻiqontrol. <instance> .Widgets. <widgetStateId>` `сейчас и каждый раз его значение меняется (см. ниже, как получать ответные сообщения)
        * `` {command: "setState", stateId: <stateId>, value: <value>} `` - это установит для состояния ioBroker `` <stateId> `` значение `` <value> `` (` `<значение>` может быть строкой, числом или логическим значением или объектом типа `` {val: <value>, ack: true | false} ``)
        * `` {command: "getState", stateId: <stateId>} `- это заставит iQontrol отправить значение состояния ioBroker` <stateId> `(см. ниже, как получить ответное сообщение)
        * `` {command: "getStateSubscribed", stateId: <stateId>} `` - это заставит iQontrol отправлять значение состояния ioBroker `` <stateId> `сейчас и каждый раз, когда его значение изменяется (см. ниже, как получать ответные сообщения)
        * `` {command: "renderView", value: <viewID>} `` - это проинструктирует iQontrol визуализировать представление, где <viewID> `должен быть отформатирован как ʻiqontrol. <instance-number> .Views. <view-name> `` (с учетом регистра)
        * `` {command: "openDialog", значение: <deviceID>} `- это проинструктирует iQontrol открыть диалоговое окно, в котором <deviceID>` должен быть отформатирован как ʻiqontrol. <instance-number> .Views. <view-name> .devices. <device-number>, где `` <device-number> '' начинается с 0 (так что первое устройство в представлении - это устройство с номером 0)
* Чтобы получать сообщения от iQontrol, вам необходимо зарегистрировать прослушиватель событий для события «message» с помощью javascript-команды `window.addEventListener (« message », receivePostMessage, false);` `
    * Функция «receivePostMessage» получает объект «событие».
* ʻEvent.data` содержит сообщение от iqontrol, которое будет таким объектом, как:
* event.data = `` {command: "getState", stateId: <stateId>, value: <stateObject>} `` - это будет ответ на команду getState или команду getStateSubsribed и даст вам фактический ` `<значение>` -объект состояния ioBroker` <stateId> `
* `` <stateObject> '' сам по себе является объектом вроде

			````javascript
			event.data.value = {
				val: <value>,
				unit: "<unit>",
				plainText: "<clear text of val, for example taken from valuelist>",
				ack: <true|false>,
				readonly: <true|false>,
				custom: {<object with custom settings>},
				from: "<source of state>",
				lc: <timestamp of last change>,
				ts: <timestamp of last actualization>,
				q: <quality of signal>,
				role: "<role of state>",
				type: "<string|number|boolean>"
			}
			````

* Чтобы указать iQontrol сгенерировать widgetState в «iqontrol. <instance> .Widgets», вы можете использовать метатег внутри раздела заголовка веб-сайта виджетов:
* Синтаксис: ``<meta name="widget-datapoint" content="WidgetName.StateName" data-type="string" data-role="text" /> ``
* Вы можете дополнительно настроить точку данных, используя атрибуты data-type (который может быть установлен как строка, число или логическое значение), data-role, data-name, data-min, data-max, data-def и data-unit.
    * Соответствующая точка данных создается только тогда, если сайт-виджет добавлен на устройство как URL или BACKGROUND_URL
* Та же концепция может использоваться для URL / HTML-State, который используется для отображения веб-сайта в диалоговом окне устройства.
* См. Ниже пример сайта-виджета:

<details><summary>Показать пример сайта-виджета, который будет отображаться как виджет с сообщением postMessage:</summary>

* Вы можете использовать следующий HTML-код и скопировать его в BACKGROUND_HTML-State виджета (который затем необходимо настроить как «Константа»)
* В качестве альтернативы вы можете загрузить этот код в виде html-файла в подкаталог / userwidgets и указать его на BACKGROUND_URL-State (которое затем также необходимо настроить как «Константа»).
* Активируйте опцию «Разрешить postMessage-Communication для BACKGROUND_URL / HTML»
* Он продемонстрирует, как осуществляется двусторонняя связь между веб-сайтом и iQontrol.

````html
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="widget-datapoint" content="postMessageTest.test" data-type="string" data-role="text" />
 	<title>iQontrol postMessageTest</title>
</head>
<body>
	<br><br>
	<button onclick="getWidgetState('postMessageTest.test')">getWidgetState postMessageTest.test</button><br>
	<button onclick="getWidgetStateSubscribed('postMessageTest.test')">getWidgetStateSubscribed postMessageTest.test</button><br>
	<button onclick="setWidgetState('postMessageTest.test', 'Hello world')">setWidgetState postMessageTest.test to 'Hello world'</button><br>
  	<br><br>
	<button onclick="getState('system.adapter.admin.0.cpu')">getState system.adapter.admin.0.cpu</button><br>
	<button onclick="getStateSubscribed('system.adapter.admin.0.uptime')">getStateSubscribed system.adapter.admin.0.uptime</button><br>
	<button onclick="setState('iqontrol.0.Popup.Message', 'Hey, this is a test Message')">setState popup message</button><br>
  	<br><br>
	<button onclick="renderView('iqontrol.0.Views.Home')">renderView 'Home'</button><br>
	<button onclick="openDialog('iqontrol.0.Views.Home.devices.0')">openDialog 1st device on 'Home'</button><br>
	<br>
	message sent: <span id="messageSent">-</span><br>
	<br>
	message received: <span id="messageReceived">-</span><br>
	<br>
	this means: <span id="thisMeans">-</span><br>
	<br>
    <script type="text/javascript">
		var countSend = 0;
		var countReceived = 0;

		//getWidgetState
		function getWidgetState(stateId){
			sendPostMessage("getWidgetState", stateId);
		}

		//getWidgetStateSubscribed (this means, everytime the state changes, an update will be received)
		function getWidgetStateSubscribed(stateId){
			sendPostMessage("getWidgetStateSubscribed", stateId);
		}

		//setWidgetState
		function setWidgetState(stateId, value){
			sendPostMessage("setWidgetState", stateId, value);
		}


		//getState
		function getState(stateId){
			sendPostMessage("getState", stateId);
		}

      //getStateSubscribed (this means, everytime the state changes, an update will be received)
		function getStateSubscribed(stateId){
			sendPostMessage("getStateSubscribed", stateId);
		}

		//setState
		function setState(stateId, value){
			sendPostMessage("setState", stateId, value);
		}


		//renderView
		function renderView(viewId){
			sendPostMessage("renderView", null, viewId);
		}

		//openDialog
		function openDialog(deviceId){
			sendPostMessage("openDialog", null, deviceId);
		}


		//send postMessages
		function sendPostMessage(command, stateId, value){
			countSend++;
			message = { command: command, stateId: stateId, value: value };
			document.getElementById('messageSent').innerHTML = countSend + " - " + JSON.stringify(message);
			window.parent.postMessage(message, "*");
		}

		//receive postMessages
		window.addEventListener("message", receivePostMessage, false);
		function receivePostMessage(event) { //event = {data: message data, origin: url of origin, source: id of sending element}
			countReceived++;
			if(event.data) document.getElementById('messageReceived').innerHTML = countReceived + " - " + JSON.stringify(event.data);
			if(event.data && event.data.command) switch(event.data.command){
				case "getState":
				if(event.data.stateId && event.data.value){
					document.getElementById('thisMeans').innerHTML = "Got State " + event.data.stateId + ": " + JSON.stringify(event.data.value);
				}
				break;
			}
		}
	</script>
</body>
</html>
````

</details>

### Дальнейшая настройка виджетов
* Существуют дополнительные мета-теги, которые вы можете использовать в разделе заголовка вашего сайта-виджета, чтобы настроить поведение виджета:
* 'описание-виджета'
* синтаксис: &#39;&#39;<meta name="widget-description" content="Please see www.mywebsite.com for further informations. (C) by me"/> ``
* Это будет отображаться при выборе виджета как URL или BACKGROUND_URL
* 'параметры-виджета'
* синтаксис: &#39;&#39;<meta name="widget-options" content="{'noZoomOnHover': 'true', 'hideDeviceName': 'true'}"/> ``
* См. Расширяемый раздел ниже, чтобы узнать о возможных параметрах, которые можно настроить с помощью этого метатега.

<details><summary>Показать возможные параметры, которые можно настроить с помощью метатега widget-options:</summary>

* Иконки:
* ʻIcon_on` (значок включен):
* По умолчанию: ""
* `ʻIcon_off`` (значок выключен):
* По умолчанию: ""
* Параметры для конкретных устройств:
* `noVirtualState` (не использовать виртуальную точку данных для STATE (скрыть переключатель, если STATE пуст)):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* Общее:
* `` readonly`` (только чтение):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* ʻInvertUnreach` (Инвертировать UNREACH (использовать connected вместо unreach)):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* ʻAdditionalControlsSectionType` (Внешний вид ADDITIONAL_CONTROLS):
* Возможные значения: "none" | "collapsible" | "collapsible open"
* По умолчанию: «разборный».
* ʻAdditionalControlsCaption` (подпись для ADDITIONAL_CONTROLS):
* По умолчанию: «Дополнительные элементы управления».
* ʻAdditionalInfoSectionType` (Внешний вид ADDITIONAL_INFO):
* Возможные значения: "none" | "collapsible" | "collapsible open"
* По умолчанию: «разборный».
* ʻAdditionalInfoCaption` (подпись для ADDITIONAL_INFO):
* По умолчанию: «Дополнительная информация»
* БАТАРЕЯ Пустой значок:
* `` batteryActiveCondition '' (Условие):
* Возможные значения: "" | "at" | "af" | "eqt" | "eqf" | "eq" | "ne" | "gt" | "ge" | "lt" | "le"
* По умолчанию: ""
* `` batteryActiveConditionValue`` (значение условия):
* По умолчанию: ""
* Поведение плитки (общее):
* `` clickOnIconOpensDialog`` (щелчок по значку открывает диалоговое окно (вместо переключения)):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` noZoomOnHover`` (Отключить эффект масштабирования при наведении):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `hideDeviceName` (Скрыть имя устройства):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* Tile-Behavior, если устройство неактивно:
* `` sizeInactive`` (Размер плитки, если устройство неактивно):
* Возможные значения: "" | "thinIfInactive shortIfInactive" | "thinIfInactive" | "thinIfInactive highIfInactive" | "thinIfInactive xhighIfInactive" | "shortIfInactive" | "shortIfInactive wideIfInactive" | "shortIfInactive xwideIfInactive" | "wideIfInactive" xwideIfInactive "|" wideIfInactive " "|" xhighIfInactive "|" wideIfInactive highIfInactive "|" xwideIfInactive highIfInactive "|" wideIfInactive xhighIfInactive "|" xwideIfInactive xhighIfInactive "|" fullWidthIfInactive аспект-1-1IfidthInactive "|" fullWidthIfIfIfInactive "|" fullWidthIfIfInactive 2IfInactive "|" fullWidthIfInactive аспект-16-9IfInactive "|" fullWidthIfInactive аспект-21-9IfInactive "|" fullWidthIfInactive fullHeightIfInactive "|"
* По умолчанию: «xwideIfInactive highIfInactive»
* bigIconInactive (показывать большой значок, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* ʻIconNoPointerEventsInactive` (игнорировать события мыши для значка, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` noOverlayInactive`` (убрать наложение плитки, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `hideBackgroundURLInactive` (Скрыть фон из BACKGROUND_URL / HTML, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `hideDeviceNameIfInactive` (Скрыть имя устройства, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `hideStateIfInactive` (Скрыть состояние, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: "true" * ``
* `hideDeviceIfInactive` (Скрыть устройство, если оно неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: "false" * ``
* Tile-Behavior, если устройство активно:
* `` sizeActive`` (Размер плитки, если устройство активно):
* Возможные значения: «» | «thinIfActive shortIfActive» | «thinIfActive» | «thinIfActive highIfActive» | «УзкийIfActive xhighIfActive» | «shortIfActive» | «shortIfActive wideIfActive» | «shortIfActive xwideIfActive» | «wideIfActive» xwideIfActive | «wideIfActive» | "|" xhighIfActive "|" wideIfActive highIfActive "|" xwideIfActive highIfActive "|" wideIfActive xhighIfActive "|" xwideIfActive xhighIfActive "|" fullWidthIfActive аспект-1-1IfActive "|" fullWidth- 4IfActive "|" fullWidth- 4IfActive " 2IfActive "|" fullWidthIfActive аспект-16-9IfActive "|" fullWidthIfActive аспект-21-9IfActive "|" fullWidthIfActive fullHeightIfActive "|"
* bigIconActive (показывать большой значок, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* ʻIconNoPointerEventsActive` (игнорировать события мыши для значка, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* noOverlayActive (убрать наложение плитки, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `hideBackgroundURLActive` (Скрыть фон из BACKGROUND_URL / HTML, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `hideDeviceNameIfActive` (Скрыть имя устройства, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `hideStateIfActive` (Скрыть состояние, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `hideDeviceIfActive` (Скрыть устройство, если оно активно):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* Поведение плитки при увеличении устройства:
* `` sizeEnlarged`` (размер плитки, если устройство увеличено):
* Возможные значения: "" | "узкийIfEnlarged shortIfEnlarged" | "узкийIfEnlarged" | "узкийIfEnlarged highIfEnlarged" | "slimIfEnlarged xhighIfEnlarged" | "shortIfEnlarged" | "shortIfEnlarged расширенный "IfEnlarged" xlarged wide "IfEnlarged " "|" xhighIfEnlarged "|" wideIfEnlarged highIfEnlarged "|" xwideIfEnlarged highIfEnlarged "|" wideIfEnlarged xhighIfEnlarged "|" xwideIfEnlarged xhighIfEnlarged "|" xwideIfEnlarged xhighIfEnlarged "|" fullWiredIfEnlarged "| 2IfEnlarged "|" fullWidthIfEnlarged аспект-16-9IfEnlarged "|" fullWidthIfEnlarged аспект-21-9IfEnlarged "|" fullWidthIfEnlarged fullHeightIfEnlarged "|"
* `` bigIconEnlarged`` (показывать большой значок, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* ʻIconNoPointerEventsEnlarged` (игнорировать события мыши для значка, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` noOverlayEnlarged`` (убрать наложение плитки, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` tileEnlargeStartEnlarged`` (плитка увеличивается при запуске):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` tileEnlargeShowButtonInactive` (Показать кнопку увеличения, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `` tileEnlargeShowButtonActive`` (Показать кнопку увеличения, если устройство активно):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `` tileEnlargeShowInPressureMenuInactive`` (Показать увеличение в меню, если устройство неактивно):
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `` tileEnlargeShowInPressureMenuActive`` (Показать увеличение в меню, если устройство активно)
* Возможные значения: «true» | «false»
* По умолчанию: "true"
* `` visibilityBackgroundURLEnlarged`` (Видимость фона из BACKGROUND_URL / HTML, если устройство увеличено):
* Возможные значения: "" | "visibleIfEnlarged" | "hideIfEnlarged"
* По умолчанию: ""
* `hideDeviceNameIfEnlarged` (Скрыть имя устройства, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* hideStateIfEnlarged (Скрыть состояние, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* hideIconEnlarged (скрыть значок, если устройство увеличено):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* Условия для активной плитки:
* `` tileActiveStateId` (идентификатор состояния (будет использоваться пустой = СОСТОЯНИЕ / УРОВЕНЬ)):
* По умолчанию: ""
* tileActiveCondition (Условие):
* Возможные значения: "" | "at" | "af" | "eqt" | "eqf" | "eq" | "ne" | "gt" | "ge" | "lt" | "le"
* По умолчанию: ""
* tileActiveConditionValue (значение условия):
* По умолчанию: ""
* Отметка времени:
* ʻAddTimestampToState` (добавить метку времени в состояние):
* Возможные значения: "" | "SA" | "ST" | "STA" | "SE" | "SEA" | "SE." | "SE.A" | "Se" | "SeA" | "STE" | "СТЭ" | "СТЭ." | "СТЕ.А" | "СТЕ" | "СТЕА" | "Т" | "ТА" | "ТЕ" | "ЧАЙ" | "ТЕ." | "ТЕ.А" | «Te» | «TeA» | «E» | «EA» | «E.» | «EA» | «e» | «eA» | «N»
* По умолчанию: «N»
* showTimestamp (Показать отметку времени в диалоге):
* Возможные значения: "" | "да" | "нет" | "всегда" | "никогда"
* По умолчанию: ""
* URL / HTML:
* `popupWidth` (Ширина [пикселей] для URL / HTML-блока):
* По умолчанию: ""
* `popupHeight` (Высота [пикс] для URL / HTML-блока):
* По умолчанию: ""
* `` popupFixed`` (исправлено (размер нельзя изменить)):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* ʻOpenURLExternal` (Открыть URL-адрес в новом окне (вместо отображения окна в диалоговом окне)):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` popupAllowPostMessage`` (Разрешить сообщение postMessage для URL / HTML):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` backgroundURLAllowPostMessage`` (Разрешить postMessage-Communication для BACKGROUND_URL / HTML):
* Возможные значения: «true» | «false»
* По умолчанию: «false»
* `` backgroundURLNoPointerEvents`` (прямые события мыши на плитку, а не на содержимое BACKGROUND_URL / HTML):
* Возможные значения: «true» | «false»
* По умолчанию: «false»

</details>

<details><summary>Покажите пример сайта-виджета, который создает карту с указанными выше настройками:</summary>

* Вы можете загрузить следующий HTML-код в виде html-файла в подкаталог / userwidgets и указать его на BACKGROUND_URL-State (который затем необходимо настроить как «Константа»)
* При добавлении виджета отображается описание
* Затем вас спросят, хотите ли вы применить содержащиеся параметры
* Для управления положением карты создаются три точки данных: iqontrol.x.Widgets.Map.Posision.latitude, .altitude и .zoom.

````html
<!doctype html>
<html style="width: 100%; height: 100%; margin: 0px;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="widget-description" content="This is a map widget, please provide coordinates at iqontrol.x.Widgets.Map.Posision. (C) by Sebastian Bormann"/>
	<meta name="widget-options" content="{'noZoomOnHover': 'true', 'hideDeviceName': 'true', 'sizeInactive': 'xwideIfInactive highIfInactive', 'iconNoPointerEventsInactive': 'true', 'hideDeviceNameIfInactive': 'true', 'hideStateIfInactive': 'true', 'sizeActive': 'fullWidthIfActive fullHeightIfActive', 'bigIconActive': 'true', 'iconNoPointerEventsActive': 'true', 'hideDeviceNameIfActive': 'true', 'hideStateIfActive': 'true', 'sizeEnlarged': 'fullWidthIfEnlarged fullHeightIfEnlarged', 'bigIconEnlarged': 'true', 'iconNoPointerEventsEnlarged': 'false', 'noOverlayEnlarged': 'true', 'hideDeviceNameIfEnlarged': 'true', 'hideStateIfEnlarged': 'true', 'popupAllowPostMessage': 'true', 'backgroundURLAllowPostMessage': 'true', 'backgroundURLNoPointerEvents': 'false'}"/>
	<meta name="widget-datapoint" content="Map.Position.latitude" data-type="number" data-role="value.gps.latitude" />
	<meta name="widget-datapoint" content="Map.Position.longitude" data-type="number" data-role="value.gps.longitude" />
	<meta name="widget-datapoint" content="Map.Position.zoom" data-type="number" data-role="value.zoom" />
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
	<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
	<title>iQontrol Map Widget</title>
</head>
<body style="width: 100%; height: 100%; margin: 0px;">
	<div id="mapid" style="width: 100%; height: 100%; margin: 0px;"></div>
	<script type="text/javascript">
		//Declarations
		var mapPositionLatitude = 0;
		var mapPositionLongitude = 0;
		var mapPositionZoom = 10;
		var mymap = false;

		//Subscribe to WidgetDatapoints now
		sendPostMessage("getWidgetStateSubscribed", "Map.Position.latitude");
		sendPostMessage("getWidgetStateSubscribed", "Map.Position.longitude");
		sendPostMessage("getWidgetStateSubscribed", "Map.Position.zoom");

		//Initialize map (with timeout to give script the time go get the initial position values)
		setTimeout(function(){
			console.log("Init map: " + mapPositionLatitude + "|" + mapPositionLongitude + "|" + mapPositionZoom);
			mymap = L.map('mapid').setView([mapPositionLatitude, mapPositionLongitude], mapPositionZoom);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				'attribution':  'Kartendaten &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
				'useCache': true
			}).addTo(mymap);
		}, 250);

		//Reposition map
		function repositionMap(){
			console.log("Reposition map: " + mapPositionLatitude + "|" + mapPositionLongitude + "|" + mapPositionZoom);
			if(mymap) mymap.setView([mapPositionLatitude, mapPositionLongitude], mapPositionZoom); else console.log("   Abort, map not initialized yet");
		}

		//send postMessages
		function sendPostMessage(command, stateId, value){
			message = { command: command, stateId: stateId, value: value };
			window.parent.postMessage(message, "*");
		}

		//receive postMessages
		window.addEventListener("message", receivePostMessage, false);
		function receivePostMessage(event){ //event = {data: message data, origin: url of origin, source: id of sending element}
			if(event.data && event.data.command) switch(event.data.command){
				case "getState":
				if(event.data.stateId && event.data.value) switch(event.data.stateId){
					case "Map.Position.latitude":
					console.log("Set latitude to " + event.data.value.val);
					mapPositionLatitude = parseFloat(event.data.value.val) || 0;
					if(mymap) repositionMap();
					break;

					case "Map.Position.longitude":
					console.log("Set longitude to " + event.data.value.val);
					mapPositionLongitude = parseFloat(event.data.value.val) || 0;
					if(mymap) repositionMap();
					break;

					case "Map.Position.zoom":
					console.log("Set zoom to " + event.data.value.val);
					mapPositionZoom = parseFloat(event.data.value.val) || 0;
					if(mymap) repositionMap();
					break;
				}
				break;
			}
		}
	</script>
</body>
</html>
````

</details>

## Описание ролей и связанных состояний
У каждого устройства есть роль, которая определяет функцию устройства. Каждая роль генерирует набор состояний, которые можно связать с соответствующим состоянием iobroker.
Если вы используете функцию автоматического создания, вы можете выбрать существующее устройство из дерева объектов iobroker. Autocreate пытается определить роль и сопоставить как можно больше состояний.
Это будет работать только для известных устройств. Для неизвестных устройств и для предоставления устройствам расширенных функций вы можете добавить их вручную с помощью кнопки (+) - или отредактировать устройства, созданные с помощью автосоздания.
Чтобы изменить роль и состояния устройства, нажмите на карандаш позади устройства. Ниже вы найдете краткое описание ролей и используемых состояний:

### Изменение конфигурации точки данных
Вы можете изменить конфигурацию точек данных с помощью значка гаечного ключа за точкой данных в диалоговом окне конфигурации устройства или на вкладке объектов iobroker. Здесь вы можете:

* Установить флаг только для чтения
* Установить инвертировать-флаг
* Установить Confirm-Flag (заставляет пользователя подтверждать перед записью изменения в точку данных)
* Установить ПИН-код (заставляет пользователя вводить этот ПИН-код до того, как изменение будет записано в точку данных, но будьте осторожны: это только с низким уровнем безопасности, потому что ПИН-код проверяется во внешнем интерфейсе! Используйте номер для отображения в полноэкранном режиме -pin-pad при запросе кода)
* Измените единицу измерения точки данных, отдельно для нуля, единственного и множественного числа
* Измените минимальное и максимальное значение точки данных
* Установите шаги, которые выполняет ползунок уровня, когда он увеличивается / уменьшается
* Изменить тип точки данных
* Изменить роль точки данных
* Установите идентификатор целевого значения, который является идентификатором точки данных, куда записываются целевые значения (если у вас разные точки данных для фактического и целевого значения)
* Установить или изменить список значений
    * При желании добавьте возможность в список значений для ввода произвольного текста
* Установите список целевых значений:
    * В дополнение к идентификатору целевого значения вы можете определить разные идентификаторы точек данных и целевые значения для разных ключей (ключи - это возможные значения исходной точки данных)
  *Вы также можете использовать подстановочный знак ``* '' в ключах и в целевых значениях
* Пример:
* Ключ: `` TuneIn-Playlist: * '', Target-Datapoint ID: `ʻalexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist '', целевое значение:` `*` `
* Если пользователь вводит TuneIn-Playlist: Ambient, значение ʻAmbient` будет записано в `ʻalexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist`

![Вызов CustomDialog](img/custom_call.png) ![Пример CustomDialog](img/custom_dialog.png) ![Понятие списка целевых значений](../../../en/adapterref/iobroker.iqontrol/img/target-value-list_concept.png)

### Общие положения:
#### СОСТОЯНИЕ и УРОВЕНЬ
Почти все роли имеют состояние **СОСТОЯНИЕ** и / или **УРОВЕНЬ** В большинстве случаев это основная функция устройства. Ему можно присвоить iobroker-состояния следующих типов:

* *boolean* - если возможно, он будет переведен в осмысленный текст, например, «включено / выключено», «открыто / закрыто» или аналогичный. Если вы щелкните значок плитки, она попытается переключить логическое значение (например, включить или выключить свет). Если он не доступен только для чтения, в диалоговом окне будет сгенерирован переключатель.
* *число* - будет отображаться с соответствующей единицей измерения и генерировать ползунок в диалоге
* *строка* - текст для отображения
* *список-значений* - будет отображаться выбранное значение. Если он не защищен от записи, он будет генерировать раскрывающееся меню в диалоговом окне.
    * Технически * список-значений * - это значение с соответствующим списком трансляций, определенным в объекте 'common.custom.iqontrol. <instance> .states', 'native.states' или 'common.states' точки данных :

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    * Вы можете создать свой собственный список значений, изменив точку данных (значок гаечного ключа за точкой данных на вкладке объектов iobroker, см. Выше)
* iQontrol отобразит определенный список значений в виде раскрывающегося поля в диалоговом окне в следующих случаях:
* если типом является 'числа' и в valueList точно столько записей, сколько шагов между min- и max точки данных или
* если тип 'логический', но роль не 'переключатель' или
* если тип 'строка' или
* если активирована опция «Добавить возможность ввода произвольного текста»
* Если устройство-плитка будет отображаться как активная или неактивная, также определяется из STATE или LEVEL-Datapoint. Кроме того, вы можете свободно настроить поведение в разделе параметров «Условия для активной плитки». Вы даже можете установить другую внешнюю точку данных, которая определяет состояние плитки.

Однако не каждый тип подходит для каждой роли. Таким образом, СОСТОЯНИЕ переключателя, например, в большинстве случаев будет логическим, чтобы иметь возможность переключаться между включением и выключением. Может отображаться строка, но переключатель не будет работать.

#### Дальнейшие общие положения:
* **INFO_A** и **INFO_B** *array* - массив точек данных и значков, которые будут циклически отображаться в верхнем правом углу плитки
* **ADDITIONAL_CONTROLS** *array* - массив точек данных, определяющих дополнительные элементы управления, которые будут отображаться внутри информационного диалога
* **ADDITIONAL_INFO** *array* - массив точек данных, который будет отображаться в нижней части информационного диалога
* **URL** CONSTANT или DATAPOINT *string* - этот URL будет открыт как iframe внутри диалога
* **HTML** CONSTANT или DATAPOINT *string* - эта разметка будет отображаться внутри iframe, если не указан URL-Datapoint
* **BACKGROUND_URL** CONSTANT или DATAPOINT *string* - этот URL будет отображаться как фон плитки устройства. Он размещается над фоновыми изображениями, но вы можете настроить его скрытие, если плитка активна или неактивна. Пожалуйста, просмотрите раздел виджетов в этом руководстве.
* **BACKGROUND_HTML** CONSTANT или DATAPOINT *string* - эта разметка будет отображаться как фон устройства-тайла, если не указан BACKGROUND_URL
* **БАТАРЕЯ** *логическое* - если истина или *число* - когда меньше 10%, будет отображаться маленький значок разряда батареи
    * Вы можете дополнительно настроить поведение значка батареи в разделе параметров «Значок батареи пустой».
* **ОШИБКА** *boolean* - если true, будет отображаться маленький значок восклицательного знака
* **UNREACH** *boolean* - если true, будет отображаться маленький значок беспроводной связи
    * Поведение можно инвертировать в разделе опций «Общие» (использовать подключенный вместо недоступного)

### Ссылка на другое представление:
* Не имеет других состояний
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/switch_on.png" width="32"> Переключатель:
* **STATE** *boolean* - отображение и установка состояния включения / выключения
* **POWER** *число* - потребляемая мощность, которая будет отображаться мелким шрифтом в правом верхнем углу

###<img src="img/icons/button.png" width="32"> Кнопка:
* **STATE** *any* - любой желаемый тип состояния
* **SET_VALUE** CONSTANT *string* - это константа (не связанное состояние iobroker!), Которая будет присвоена СОСТОЯНИЮ при нажатии кнопки
* **OFF_SET_VALUE** CONSTANT *string* - это константа (не связанное состояние iobroker!). Если определено, СОСТОЯНИЕ будет сброшено на это значение после времени, указанного в параметрах, или 100 мс.

###<img src="img/icons/light_on.png" width="32"> Свет:
Каждый свет может иметь одно или оба следующих состояния:

* **STATE** *boolean* - показать и установить состояние включения / выключения
* **УРОВЕНЬ** *число* - показать и установить уровень света

По желанию вы можете определить следующие состояния:

* Для цветных светодиодов (цветовое пространство HSB):
  * **ОТТЕНОК** * число * - цвет света от 0 до 360 ° (формат оттенка)
  * **НАСЫЩЕННОСТЬ** * число * - насыщенность света (от белого до чистого цвета)
  * **COLOR_BRIGHTNESS** * number * - яркость цветных светодиодов (если у вас есть состояние LEVEL и нет белых светодиодов, это игнорируется, потому что яркость полностью контролируется LEVEL)
* Для белых светодиодов:
  * **CT** * number * - цветовая температура света, если он имеет два оттенка белого
  * **WHITE_BRIGHTNESS** * number * - яркость белых светодиодов (если у вас есть состояние LEVEL и нет цветных светодиодов, это игнорируется, потому что яркость полностью контролируется LEVEL)
* Альтернативные цветовые пространства:
  * **ALTERNATIVE_COLORSPACE_VALUE** * строка * или * число * (в зависимости от выбранного цветового пространства) - значение альтернативного цветового пространства

    Если ваше устройство не поддерживает использование HUE, SATURATION и COLOR_BRIGHTNESS (HSB / HSV-цветовое пространство), вы можете использовать множество альтернативных цветовых пространств. В параметрах устройства вы можете выбрать одно из следующих цветовых пространств:

    * **RGB** / **# RGB** вместо использования HUE, SATURATION и COLOR_BRIGHTNESS вы можете использовать RGB-формат (шестнадцатеричный), необязательно с ведущим '#'
    * **RGBW** / **# RGBW** вместо использования HUE, SATURATION, COLOR_BRIGHTNESS и WHITE_BRIGHTNESS вы можете использовать формат RGBW (шестнадцатеричный), необязательно с ведущим '#'
    * **RGBWWCW** / **# RGBWWCW** / **RGBCWWW** / **# RGBCWWW** вместо HUE, SATURATION, COLOR_BRIGHTNESS, CT и WHITE_BRIGHTNESS вы можете использовать формат RGBWWCW или RGBCWWW (шестнадцатеричный , WW = теплый белый, CW = холодный белый), необязательно с ведущим '#'
    * **RGB (только оттенок)** / **# RGB (только оттенок)** вместо использования HUE вы можете использовать формат RGB (только оттенок) (шестнадцатеричный), необязательно с ведущим '#'. В этом особом случае формат RGB будет принимать только чистые насыщенные цвета круга оттенок-цвет. Смешанный белый не допускается
    * **Hue for Milight** это значение оттенка для устройств Milight с использованием другой отправной точки в цветовом круге оттенка:

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

Имейте в виду: преобразование в альтернативное цветовое пространство выполняется веб-интерфейсом, поэтому он активен только в том случае, если где-то открыт iQontrol. Поэтому вы не можете использовать его в качестве преобразователя пространств цветов. Чтобы избежать зацикливания, рекомендуется использовать либо исходные точки данных цветового пространства (HUE, SATURATION, COLOR_BRIGHTNESS, CT, WHITE_BRIGHTNESS) *либо* альтернативную точку данных цветового пространства для *замены* этих точек данных.

* Эффект-режим:
  * **EFFECT** * value-list * - эффект для воспроизведения
* **EFFECT_NEXT** *boolean* - если установлено значение true, будет воспроизводиться следующий эффект (как альтернатива для устройств, которые не поддерживают список значений EFFECT)
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *boolean* - если установлено значение true, эффект будет увеличиваться / уменьшаться
* Разнообразный:
  * **POWER** * число * - потребляемая мощность, которая будет отображаться мелким шрифтом в правом верхнем углу

###<img src="img/icons/fan_on.png" width="32"> Поклонник:
* **STATE** *boolean* - отображение и установка состояния включения / выключения
* **УРОВЕНЬ** *число* или *список значений* - скорость вентилятора
* **POWER** *число* - потребляемая мощность, которая будет отображаться мелким шрифтом в правом верхнем углу

###<img src="img/icons/radiator.png" width="32"> Термостат:
* **SET_TEMPERATURE** *number* - заданная температура
* **ТЕМПЕРАТУРА** *число* - фактическая температура отображается маленьким шрифтом в правом верхнем углу
* **ВЛАЖНОСТЬ** *число* - фактическая влажность отображается мелким шрифтом в правом верхнем углу
* **CONTROL_MODE** *список значений* - отображение и установка режима термостата
* **WINDOW_OPENING_REPORTING** *boolean* - если true, отображается небольшое открытое окно
* **VALVE_STATES** массив имен и номеров - отображает открытие клапанов, связанных с термостатом

###<img src="img/icons/radiator.png" width="32"> Homematic-термостат:
Помимо обычного термостата вы можете определить:

* **PARTY_TEMPERATURE** *string* - строка в специальном формате для определения праздничного или праздничного режима домашних термостатов.
* **BOOST_STATE** *число* - отображает оставшееся время разгона термостатов homematic

###<img src="img/icons/temperature.png" width="32"> Датчик температуры,<img src="img/icons/humidity.png" width="32"> Датчик влажности:
* **СОСТОЯНИЕ** *число* - температура или влажность, которая будет отображаться в нижней части устройства
* **ТЕМПЕРАТУРА** *число* - температура, которая будет отображаться маленьким шрифтом в правом верхнем углу
* **ВЛАЖНОСТЬ** *число* - влажность, которая будет отображаться маленьким шрифтом в правом верхнем углу
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/brightness_light.png" width="32"> Датчик яркости:
* **СОСТОЯНИЕ** *число* - яркость, которая будет отображаться в нижней части устройства
* **ЯРКОСТЬ** *число* - яркость, которая будет отображаться маленьким шрифтом в правом верхнем углу
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/motion_on.png" width="32"> Датчик движения:
* **STATE** *boolean* - отображать, обнаружено движение или нет
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/door_closed.png" width="32"> Дверь,<img src="img/icons/window_closed.png" width="32"> Окно:
* **STATE** *boolean* - отображать, если дверь или окно открыты или закрыты
    * В качестве альтернативы вы можете назначить * список значений *, чтобы отображать дополнительные состояния, такие как 'наклонено' (в параметрах окон вы можете определить, какой текст обозначает открытый, закрытый или наклоненный, чтобы отображать правильный значок)
  *ы также можете назначить* строку *для отображения любого текста, такого как «3 окна открыты» или «все закрыты», или* число*
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/garagedoor_closed.png" width="32"> Гаражная дверь:
* **STATE** *boolean* - отображать, открыта или закрыта дверь
    * В качестве альтернативы вы можете назначить * список значений * для отображения дополнительных состояний, таких как 'наклонено'
    * Вы также можете назначить * строку * для отображения любого текста, например «3 двери открыты» или «все закрыты»
* **TOGGLE** *boolean* - отображает кнопку «Toggle» и имеет значение true при нажатии

###<img src="img/icons/door_locked.png" width="32"> Дверь с замком:
* **СОСТОЯНИЕ** *логическое* - отображать, если дверь открыта или закрыта (дверь / оконный контакт)
* **LOCK_STATE** *boolean* - отображение и контроль, если дверь заблокирована или разблокирована (управление отключено, если STATE истинно - потому что вы не можете заблокировать дверь, которая открыта)
* **LOCK_STATE_UNCERTAIN** *boolean* - если true, СОСТОЯНИЕ будет отображаться курсивным шрифтом, чтобы обозначить, что точное положение замка неизвестно
* **LOCK_OPEN** *boolean* - если установлено значение true, дверь откроется полностью

###<img src="img/icons/blind_middle.png" width="32"> Слепой:
* **УРОВЕНЬ** *число* - высота жалюзи в процентах
* **НАПРАВЛЕНИЕ** *список значений* - может быть Stop, Up и Down. Можно настроить значения, которые представляют Стоп, Вверх, Вниз и Неизвестно.
* **STOP** *boolean* - устанавливается в true, если кнопка остановки нажата
* **UP** / **DOWN** *boolean* - устанавливается в true, если нажата кнопка вверх / вниз (для устройств, которые используют точки данных UP и DOWN вместо или в дополнение к LEVEL). Дополнительно вы можете определить значение с помощью точек данных **UP_SET_VALUE** / **DOWN_SET_VALUE** Если определено, это значение будет отправлено вместо истины при нажатии кнопки вверх / вниз.
* **FAVORITE_POSITION** *boolean* - может использоваться для вызова любимой позиции. Если нажать кнопку «Избранное» (название кнопки можно настроить в настройках устройства), в эту точку данных будет отправлено значение true. Дополнительно вы можете определить значение через **FAVORITE_POSITION_SET_VALUE** Datapoint. Если определено, это значение будет отправлено вместо истины при нажатии кнопки избранного.
* **SLATS_LEVEL** *number* - положение планок в процентах

###<img src="img/icons/fire_on.png" width="32"> Датчик огня:
* **STATE** *boolean* - если true, датчик будет отображаться как сработавший
    * В качестве альтернативы вы можете назначить * список значений *, чтобы отображать дополнительные состояния, такие как 'tamolated'
    * Вы также можете назначить * строку * для отображения любого текста, например «пожар на верхнем этаже»
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/flood_on.png" width="32"> Датчик наводнения:
* **STATE** *boolean* - если true, датчик будет отображаться как сработавший
    * В качестве альтернативы вы можете назначить * список значений *, чтобы отображать дополнительные состояния, такие как 'tamolated'
    * Вы также можете назначить * строку * для отображения любого текста, например «наводнение на верхнем этаже»
* **свойство связанного просмотра** открывается напрямую

###<img src="img/icons/alarm_on.png" width="32"> Тревога:
* **STATE** *boolean* - если true, датчик будет отображаться как сработавший
    * В качестве альтернативы вы можете назначить * список значений *, чтобы отображать дополнительные состояния, такие как 'tamolated'
    * Вы также можете назначить * строку * для отображения любого текста, например «пожар на верхнем этаже»
* **CONTROL_MODE** *список-значений* - выбрать режим работы, например «Включен» или «Снят»
    * В параметрах устройства вы можете определить значение, которое означает снятие с охраны, чтобы можно было отобразить соответствующий значок

###<img src="img/icons/battery_full.png" width="32"> Аккумулятор:
* **СОСТОЯНИЕ** *число* - уровень заряда батареи в процентах
* **ЗАРЯДКА** *логическое* - если true, отображается значок зарядки
* **POWER** *число* - потребляемая мощность, которая будет отображаться мелким шрифтом в правом верхнем углу
* **НАПРЯЖЕНИЕ** *число* - напряжение, которое будет отображаться маленьким шрифтом в правом верхнем углу

###<img src="img/icons/value_on.png" width="32"> Ценность:
* **СОСТОЯНИЕ** *любое* - любое допустимое состояние для отображения (см. Раздел «Общие состояния»)
* **УРОВЕНЬ** *число* - создаст слайдер в диалоге

###<img src="img/icons/play_on.png" width="32"> Программа:
* **STATE** *boolean* - если установлено значение true, программа будет запущена

###<img src="img/icons/play.png" width="32"> Место действия:
* **STATE** *boolean* - отображается, если сцена активна. В зависимости от конфигурации сцены (виртуальная группа, установленные значения для false включены или отключены), команда toggle отправит true, false, min, 0, max или 100. Существует возможность всегда отправлять true (отключение переключения) .

###<img src="img/icons/media_on.png" width="32"> Медиа-плеер / пульт дистанционного управления:
* **СОСТОЯНИЕ** *строка* - «воспроизведение», «пауза» или «стоп» или *логическое* - true для воспроизведения, false для остановки
    * В параметрах устройства вы можете определить значение, которое представляет воспроизведение, паузу и остановку
* **COVER_URL** *строка* - URL-адрес обложки
* **ИСПОЛНИТЕЛЬ, АЛЬБОМ, НАЗВАНИЕ** *строка* - самоочевидно
* **TRACK_NUMBER** *номер* - самоочевидно
* **PREV, REWIND, PLAY, PAUSE, STOP, FORWARD, NEXT** *boolean* - будет установлено значение true, если соответствующая кнопка будет нажата
* **SHUFFLE, MUTE, PLAY_EVERYWHERE, EJECT, POWER_SWITCH** *boolean* - состояние соответствующей функции
* **REPEAT** *логическое* - состояние для функции повтора или *строка* - 3 состояния могут быть определены с помощью соответствующих опций: значение для выкл., Повтор-все и повтор-один
* **DURATION, ELAPSED** *number* - продолжительность и истекшее время фактического заголовка - используется для отображения строки поиска
* **VOLUME** *число* - для слайдера громкости
* **SOURCE, PLAYLIST** *value-list* - показать меню выбора для выбора источника или заголовка из списка воспроизведения

##### Для отображения *универсального пульта дистанционного управления* вы можете определить следующие состояния:
* **REMOTE_NUMBER** *строка* - показывает цифровую клавиатуру и возвращает соответствующее число, если щелкнуть номер
* **REMOTE_VOLUME_UP, REMOTE_VOLUME_UP, REMOTE_CH_UP, REMOTE_CH_DOWN** *строка* - показывает кнопки увеличения / уменьшения громкости и канала вверх / вниз и возвращает 'volumeUp', 'volumeDown', 'chUp' или 'chDown', если соответствующие кнопка нажата
* **REMOTE_PAD_DIRECTION, REMOTE_PAD_BACK, REMOTE_PAD_HOME, REMOTE_PAD_MENU** *строка* - показывает трекпад для навигации и возвращает
    * 'ok', если щелкнуть по середине пэда,
* «влево», «вправо», «вверх» или «вниз», если щелкнули края площадки или смахнули площадку в соответствующем направлении, или
* 'назад', 'домой' или 'меню *, если нажаты соответствующие кнопки
* Имейте в виду: вы можете использовать список целевых значений (доступный через значок гаечного ключа на каждой точке данных), чтобы связать одну точку данных с несколькими точками данных, в зависимости от возвращаемого значения (см. Раздел «Изменение точек данных» выше)
* **REMOTE_COLOR** *строка* - показывает цветные кнопки и возвращает соответствующий цвет («красный», «зеленый», «желтый» или «синий») при нажатии на цвет
* **REMOTE_ADDITIONAL_BUTTONS** *array* - массив кнопок. Имя кнопки отправляется в соответствующий идентификатор состояния, если кнопка нажата
* **REMOTE_HIDE_REMOTE** *boolean* - если true, весь раздел удаленного управления будет скрыт (например, чтобы показать только его, если выбран действительный источник)

###<img src="img/icons/popup.png" width="32"> Неожиданно возникнуть:
* **СОСТОЯНИЕ** *любое* - может использоваться для отображения дополнительной информации

###<img src="img/icons/link.png" width="32"> Внешняя ссылка:
* **СОСТОЯНИЕ** *любое* - может использоваться для отображения дополнительной информации
* **URL** CONSTANT *string* - этот URL будет открыт

###<img src="img/icons/widget_on.png" width="32"> Виджет:
Это устройство имеет некоторые специальные предопределенные настройки размера и отображения для отображения веб-сайта, которые можно определить с помощью **BACKGROUND_URL** в качестве виджета. С параметрами по умолчанию в правом верхнем углу будет отображаться небольшая кнопка увеличения.

* **СОСТОЯНИЕ** *любое* - СПЕЦИАЛЬНОЕ: если пусто, будет создана виртуальная точка данных, поэтому вы можете щелкнуть значок, чтобы активировать и, следовательно, увеличить размер виджета.

****

## Исправление проблем
* Убедитесь, что вы выполнили требования раздела "Вам нужно ..." вверху этой страницы.
* Если после обновления что-то не работает должным образом, попробуйте выполнить следующие действия:
    * Начать загрузку адаптера:

    \
        ![Загрузить](../../../en/adapterref/iobroker.iqontrol/img/adapter_upload.png)

* Очистить кеш браузера
* Перезапустите ioBroker

### Если у вас возникнут другие проблемы, предоставьте журнал из консоли отладки вашего браузера и скриншоты неисправной строки:
* Запустите iQonrol с открытой отладочной консолью вашего браузера (в большинстве случаев вам нужно нажать <kbd>F12,</kbd> чтобы открыть ее)
* Переключитесь в консоль-окно и воспроизведите ошибку
* Ищите сообщения в окне консоли
* При появлении ошибок указывается номер строки, вызвавшей ошибку.
* Нажмите на этот номер строки и сделайте снимок экрана с неисправной строкой:

![Окно консоли устранения неполадок](img/troubleshooting_consolewindow.png) ![Устранение неисправностей неисправной линии](../../../en/adapterref/iobroker.iqontrol/img/troubleshooting_faultyline.png)

****

## Changelog

### dev
* (sbormann) Fixed applying of widget-options for newly devices that havn't been saved before.
* (sbormann) Enhanced postMessage-Communication to deliver the complete stateObject if a state is requested.

### 1.3.2 (2020-10-12)
* (sbormann) Added icons to REMOTE_ADDITIONAL_BUTTONS of remote control.
* (sbormann) Added REMOTE_CHANNELS to display channel buttons inside remote control.
* (sbormann) Enhanced positioning of dialog if URL/HTML is set.
* (sbormann) When writing data to an iframe replace encoded cr chars.
* (sbormann) Added option to remove overlay of tile, if device is enlarged.
* (sbormann) Added possibility to add and edit html/css/js files to folder /userwidgets.
* (sbormann) Withdrawn changes to blank icons (now they catch mouse events again) - but for that added an option to optionally ignore mouse events for icons.
* (sbormann) Added option which sections of remote are opened at start.
* (sbormann) Added new postMessage-communication options for widgets and allow widgets to create datapoints unter iqontrol.x.Widgets by using a meta-tag inside html-code.

### 1.3.1 (2020-10-04)
* (sbormann) Breaking change: completely removed presssure detection and replaced it by long clicks to open context menu.
* (sbormann) Blank icons don't catch mouse and touch-events any more.
* (sbormann) Added option to disable virtual datapoint (switch) for widgetes.
* (sbormann) Fixed url-parameter home.
* (sbormann) Added collapsible sections to device options.
* (sbormann) Enhanced channel detector for autocreate devices function.
* (sbormann) Enhanced dropdown-menus on admin-page to work better on mobile devices.

### 1.2.7 (2020-09-30)
* (sbormann) Added ADDITIONAL_CONTROLS as universal datapoint to define an array of additional control items that will be displayed inside dialog.
* (sbormann) Added possibility to renderViews and openDialogs via popup-buttons and postMessage-commands for iframes.
* (sbormann) Changed behaviour of url-parameter home (this will now also change the link of the first toolbar entry) and added new url-parameter renderView.

### 1.2.6 (2020-09-27)
* (sbormann) Scroll to element when deactivating fullScreen.
* (sbormann) Enhanced picture selection drop down and rearranged some images - maybe you need to clear cache to get this working.
* (sbormann) Added INFO_A and INFO_B to display additional informations in the tile.
* (sbormann) Added possibility to hide views name.
* (sbormann) Added possibility to upload html, css and js files and added drop down menu for these files for URL- and BACKGROUND_URL-State.
* (sbormann) Added option to hide icon, if device is enlarged.
* (sbormann) Added option set visibility of BACKGROUND_URL/HTML, if device is enlarged.

### 1.2.5 (2020-09-19)
* (sbormann) Fix for iOS 14 touch callout.
* (sbormann) Added option to show big icons if device is inactive, active or enlarged.
* (sbormann) Added forced reload to cover images.
* (sbormann) Added more tile sizes.
* (sbormann) Added options to hide device, name or state if inactive, active or enlarged.
* (sbormann) Added option direct mouse events to the tile instead to the content of BACKGROUND_URL/HTML.
* (sbormann) Added postMessage-Communication to allow widget-websites to send commands to iQontrol and receive messages from iQontrol.
* (sbormann) Added option to disable swiping.

### 1.2.4 (2020-09-14)
* (sbormann) Ignore readonly for enlarge.
* (sbormann) Always show enlarge button, if tile is enlarged.
* (sbormann) Enhanced some styles and marquee detection.
* (sbormann) Added url-parameter to open a specified dialog on loading the page.
* (sbormann) Changed the way cover images are loaded.
* (sbormann) Added option to start with new line for devices.
* (sbormann) Tiles with no link to other view now open dialog by default.
* (sbormann) Added mouse cursor styles depending on tile actions (open dialog, toggle, link to view, external link, ...).
* (sbormann) You can now chose caption and appearance (always visible, collapsible closed, collapsible opened) of ADDITIONAL_INFO.

### 1.2.3 (2020-09-07)
* (sbormann) Now it will be automatically scrolled to tile that is switched to Screen Size.
* (sbormann) New options to set tile size for an enlarged state, which can be toggled via a new enlarge-button and via the pressure menu (both needs to be turned on in options).
* (sbormann) Modified the widget-device to use the new enlarge-button and use a blank icon by default.

### 1.2.2 (2020-09-05)
* (sbormann) Enhanced TileActiveConditions to even work, if STATE is not defined.
* (sbormann) Added option to rename section 'Additional Buttons' for remote.
* (sbormann) Arrays like REMOTE_ADDITIONAL_BUTTONS are now sortable.
* (sbormann) Enhanced handling of BACKGROUND_URL/HTML.
* (sbormann) Added options to change caption of UP, STOP and DOWN for blinds.
* (sbormann) Disabled scrolling to top by reconnection.
* (sbormann) Added more tile size options (full width with different aspects and full screen).
* (sbormann) Fixed a bug where frontend could crash in endless loop.
* (sbormann) Added Widget to devices.

### 1.2.1 (2020-28-30)
* (sbormann) If STATE in Dialog contains (valid) HTML-Code, it is now rendered as HTML and - if state is not readonly - a HTML-Editor is shown.
* (sbormann) Added option to disable zoom-effect on mouse-over (for HTML-Widgets the zoom-effect may be disturbing).
* (sbormann) Remote is only shown, if one of the remote datapoints are defined.
* (sbormann) Added polyfil for older browsers for Array.from in shuffle.js.

### 1.2.0 (2020-28-29)
* (sbormann) Introducing different tile sizes, they can be configured in options for active and inactive state.
* (sbormann) Added BACKGROUND_URL and BACKGROUND_HTML as universal states to all devices, to display webpages as background of tiles (for FLOT, weather, security-cameras,...).
* (sbormann) Again better animations for shuffle.js.
* (sbormann) Reordered remote control sections.

### 1.1.15 (2020-08-27)
* (sbormann) Bugfixed shuffle.js (better animations, fixed hideIfInactive-Option).

### 1.1.14 (2020-08-24)
* (sbormann) Made HTML/URL-iFrame resizable (can be turned off by option).
* (sbormann) Bugfixing remote control.
* (sbormann) Added option to configure conditions for active battery-empty-icon.
* (sbormann) Dialog is now repositioned and bigger when phone is rotated to horizontal view.
* (sbormann) Breaking Change: Using now shuffle.js to reposition the tiles after resizing or orientation change. For now its only a nice effect, but this opens possibilities for future development with different tile-sizes.

### 1.1.13 (2020-08-23)
* (sbormann) Added option to remote to show vol and ch +/- inside pad.
* (sbormann) Fixed calculation of blind level.
* (sbormann) Fixed opening of external links.

### 1.1.12 (2020-08-21)
* (sbormann) Prevented selection of elements on long click for actual iOS version.
* (sbormann) Bugfixed tile active conditions for media.
* (sbormann) Renamed Media-Player to Media-Player / Remote-Control.
* (bluefox) The compatibility to socket.io 3.0.13 provided
* (sbormann) Prevented accidentally sorting of tables when clicking buttons.

### 1.1.11 (2020-08-21)
* (sbormann) Added option to define explicit conditions for a tile to be active.
* (sbormann) Added wrench icon to edit array dialog.

### 1.1.10 (2020-08-20)
* (sbormann) Added universal remote control including a track-pad to media-device.
* (sbormann) Device-Options are now sorted in categories.
* (sbormann) Collapsibles like additional informations are animated now.
* (sbormann) Added option for the device button to change the caption of the button in the dialog.
* (sbormann) Added option to open URL in new window instead of box inside dialog.
* (sbormann) Made toggeling of a state more fault tolerant if the type is not set correctly (iQontrol presumes now, it is a switch).

### 1.1.9 (2020-08-14)
* (sbormann) Enhanced popup with the ability to add buttons and confirmation messages.
* (sbormann) Fixed crash on some toolbar specifications.

### 1.1.8 (2020-08-02)
* (sbormann) Enhanced rendering of color-lights with alternative colorspace.
* (sbormann) Added rounded corners to iframe.
* (sbormann) Added sans-serif as standard font-family to iframe (may overwrite your settings - you can overwrite this by marking your own font-family css with '!important').
* (sbormann) Added sentry plugin.

### 1.1.7 (2020-07-28)
* (sbormann) Improved long press and forced touch handling.
* (sbormann) Added URL-Parameters returnAfterTimeDestiationView and returnAfterTimeTreshold.

### 1.1.6 (2020-07-24)
* (sbormann) Added some roles to recognize water and fire sensors more reliable.
* (sbormann) Added a block to blockly to send popup messages to iQontrol.
* (sbormann) Set option "Always use time instead of pressure" as standard - if you want to use ForcedTouch, disable this option.
* (sbormann) Updated some dependencies.

### 1.1.5 (2020-07-05)
* (sbormann) Made dialog movable by dragging title.
* (sbormann) Added LEVEL to fan.
* (sbormann) Fixed flickering of SVG-Background change on some devices.

### 1.1.4 (2020-07-03)
* (sbormann) Changed the way popup-iframes are created to allow execution of code inside them.
* (sbormann) Added the possibility to chose progressbars as icons and background-images for devices.
* (sbormann) Added progress-circle of remaining display-time to popup.

### 1.1.3 (2020-06-28)
* (sbormann) Added popup messagen (toast-messagen).
* (sbormann) Enhanced scenes to be able to toggle (added option to always send true, if you need the old behaviour).

### 1.1.2 (2020-06-21)
* (sbormann) Compatibility enhancements for repeat function of Media-Player.
* (sbormann) Made value-list and target-value-list sortable.
* (sbormann) Made sortable lists only draggable in y-axis.
* (sbormann) Added option to enter own value for value-lists.
* (sbormann) Added PLAY_EVERYWHERE to Media-Player.

### 1.1.1 (2020-06-16)
* (sbormann) Some fixes, styling and enhancements for Media-Player.
* (sbormann) Added option to hide play, pause and stop icon for Media-Player.
* (sbormann) Added function repeat one to Media-Player.
* (sbormann) Maquee is only restarting, if the value of a state has really changed.
* (sbormann) Fixed crash when some ids of linked views were missing.
* (sbormann) Added targetValues to custom configuration, which allows to send changes of a state to different target-datapoints.

### 1.1.0 (2020-06-13)
* (sbormann) Added Media-Player.

### 1.0.1 (2020-06-10)
* (sbormann) Fixed month for timestamps.
* (sbormann) You can now chose if values are linked states or constants.
* (sbormann) Added the ability to use variables in device-names.

### 1.0.0 (2020-06-01)
* (sbormann) Added a few captions to admin.
* (sbormann) Prevent pressure menu when scrolling and after opening menu.
* (sbormann) Corrected a few translations.

<details>
<summary>Older Changelog:</summary>

### 0.4.1 (2020-05-15)
* (sbormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (sbormann) Fixed crash when using some thermostats.
* (sbormann) New gulpfile and fixed translations.
* (sbormann) Further improvement of connection speed.
* (sbormann) Disabled context-menu on long/right-click.
* (sbormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (sbormann) Major change using socket.io without conn.js which leads to a much faster initial connection.
* (sbormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (sbormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (sbormann) Added failback to variables
* (sbormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (sbormann) Added variables to icons and backgroundimages (see readme)
* (sbormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (sbormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (sbormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (sbormann) Fixed loading toolbar with no entries on linked view.
* (sbormann) Fixed views with quotes in name.
* (sbormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (sbormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (sbormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (sbormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (sbormann) Added invert UNREACH to device options.
* (sbormann) Added Flood-Sensor.
* (sbormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (sbormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (sbormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (sbormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (sbormann) Bugfixed invert-function with custom min and max.
* (sbormann) Added reload-link to loading page.
* (sbormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (sbormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (sbormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (sbormann) Fixed custom step for heating control.
* (sbormann) Fixed universal popup which was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (sbormann) Added svg as possible image to upload.
* (sbormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (sbormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (sbormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (sbormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (sbormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (sbormann) Rewritten pincode-section to work with older browsers.
* (sbormann) Pincode now works for buttons as well.
* (sbormann) Modified the return after time function to work with older browsers.
* (sbormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (sbormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (sbormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (sbormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (sbormann) Fixed popup_width and popup_height.
* (sbormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (sbormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (sbormann) Processing the plain text of values is now done after rounding a number value.
* (sbormann) Removed Icon_on for Button.
* (sbormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (sbormann) Adjusted handling of pressure menu for iOS 13.
* (sbormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (sbormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (sbormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (sbormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (sbormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (sbormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (sbormann) Added step to custom dialog, which allowes to define the resolution of value-sliders.
* (sbormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (sbormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (sbormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (sbormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (sbormann) Fixed crash of frontend.
* (sbormann) Security updates.

### 0.1.12 (2019-08-28)
* (sbormann) Added width and height to options for popup.
* (sbormann) Added option to define free CSS-code to modify frontend.
* (sbormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (sbormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (sbormann) Bugfix for chrome opacity transition bug.
* (sbormann) Added placeholder for default values for text inputs on options page.
* (sbormann) Added placeholder for default icon and blank icon to device options.
* (sbormann) Extended thermostat CONTROL_MODE by type switch.
* (sbormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (sbormann) Added min and max to custom dialog.
* (sbormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (sbormann) You can now define different units if value is zero or if value is one in custom dialog.
* (sbormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (sbormann) Enhanced conversion function when converting booelan to number.
* (sbormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (sbormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (sbormann) Modified cache manifest to remove EISDIR-errors from log.
* (sbormann) Fixed toggle-entry in pressure menu.
* (sbormann) Added multiple file upload to images tab.
* (sbormann) Added check for dead links to other views when saving settings.
* (sbormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (sbormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (sbormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (sbormann) Further improvements on connecting over iobroker.pro.
* (sbormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (sbormann) Added thumbnail-previews of fonts.
* (sbormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (sbormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (sbormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (sbormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (sbormann) Added validation to options.
* (sbormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (sbormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (sbormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (sbormann) Optimized fading of tiles.
* (sbormann) Added toggle-button to blind, if no up/down button is defined.
* (sbormann) Added detection of protocol for socket in admin.
* (sbormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (sbormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (sbormann) Added seperate background image for active devices.
* (sbormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (sbormann) Added more space to views bottom.
* (sbormann) Fixed invert level for blinds.
* (sbormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (sbormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (sbormann) Added 'No Icon' as option to icon configuration.
* (sbormann) Addes icon to 'Link to other view'.
* (sbormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (sbormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (sbormann) First stable release.
* (sbormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (sbormann) Fixed readonly handling of control mode for Homematic Thermostats.

### 0.0.49 (2019-07-27)
* (sbormann) Added common type and common role to custom dialog.
* (sbormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (sbormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (sbormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (sbormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (sbormann) Added targetValueId inside custom datapoint configuration dialog which allowes to have different datapoints vor actual value and for target value.
* (sbormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (sbormann) Added options to device configuration dialog.
* (sbormann) Added readonly-flag to device options.
* (sbormann) Added invert color temperature flag to device options for lights.
* (sbormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (sbormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (sbormann) Fixed incomplete loading of admin page with some settings.
* (sbormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (sbormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (sbormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (sbormann) Fixed value list type conflict.

### 0.0.42
* (sbormann) Adjusted pathes of demo-files.

### 0.0.41
* (sbormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (sbormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (sbormann) When creating a directory it will be entered.
* (sbormann) Added Effect-Section to Light
* (sbormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (sbormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (sbormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (sbormann) Added Image-Popup in admin.
* (sbormann) Renamed demo-images.

### 0.0.38
* (sbormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (sbormann) Some more little changes to forced touch.
* (sbormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (sbormann) Added compatibility for some android devices to forced touch.
* (sbormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (sbormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (sbormann) Removed filtering of states in select-id-dialog for autocreate.
* (sbormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (sbormann) Added forced touch menu (press hard or press long on unsupported devices), which will give more room for extended features in future.
* (sbormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (sbormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (sbormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (sbormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (sbormann) Fixed marquee not always starting correctly.

### 0.0.32
* (sbormann) Added Battery.
* (sbormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (sbormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (sbormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (sbormann) Fixed some typos.
* (sbormann) Enhanced color-mixing of light with seperate brightness-datapoints for color and white.
* (sbormann) Rewritten rendering of view as praparation for further enhancements.
* (sbormann) Rewritten rendering of dialog as praparation for further enhancements.
* (sbormann) Added option to colorize Device-Texts.

### 0.0.30
* (sbormann) Fixed io-package.json

### 0.0.29
* (sbormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (sbormann) Now its possible to define a value list for a data point under .native.states which will have a greater priority than a value list under .common.states. 
* (sbormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

### 0.0.28
* (sbormann) Added datapoint POWER to switch, fan and light.
* (sbormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (sbormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (sbormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (sbormann) Added more toolbar-options. 
* (sbormann) Enhanced handling of value lists. 
* (sbormann) Disabled swiping when dialog is opened.

### 0.0.26
* (sbormann) Added brightness to motion-sensor.
* (sbormann) Added options tab. You can now configure colors of toolbar.
* (sbormann) Fixed rendering of constants.
* (sbormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (sbormann) Added motion-sensor.
* (sbormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (sbormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (sbormann) Changed the way arrays are stored.
* (sbormann) Added submit-button for values of type string.
* (sbormann) Added saturation to hue-lights.
* (sbormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (sbormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (sbormann) System language of iobroker will be loaded and used.

### 0.0.23
* (sbormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (sbormann) Fixed Pull2Refresh on android devices / chrome.
* (sbormann) Added external links
* (sbormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (sbormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (sbormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (sbormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (sbormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (sbormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (sbormann) Improved fetching of VALVE_STATES.
* (sbormann) Changed Button Icon.
* (sbormann) Added Loading-Spinner if disconnected.
* (sbormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (sbormann) Added role-icons to role-selectbox in edit device dialog.
* (sbormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (sbormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (sbormann) Role of device is displayed in devices-table.
* (sbormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (sbormann) Added Role 'Button': You can define a constant SET_VALUE which will be written to the ID that is linked with STATE if the button is pressed.
* (sbormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (sbormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (sbormann) Added dessription of roles and corresponding states.
* (sbormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (sbormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (sbormann) German translation: 'geöffnet' lower case.
* (sbormann) Zigbee humidity and temperature added to auto-creation.
* (sbormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (sbormann) Improved check for value type of states.
* (sbormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (sbormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (sbormann) Doors and Windows now force true/false to be translated to opened/closed.
* (sbormann) Double Entrys on WelcomeScreen/Overview removed.
* (sbormann) States are now set with the correct value type.
* (sbormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (sbormann) Check for unallowed chars in object names.
* (sbormann) Check for duplicates in view names.
* (sbormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (sbormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (sbormann) Added compatibility for edge and firefox. 
* (sbormann) Again Hue bugfixes.
* (sbormann) Removed Tooltip from Toolbar.

### 0.0.10
* (sbormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (sbormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (sbormann) LinkedView now also works on windows, doors and fire-sensor.
* (sbormann) Added translation (thanks ldittmar!).

### 0.0.8
* (sbormann) Added icons to image selectboxes.

### 0.0.7
* (sbormann) Changed order of tabs
* (sbormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (sbormann) Improved speed of select id and autocreate
* (sbormann) Set filter to channel on autocreate

### 0.0.5
* (sbormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (sbormann) Bugfix: copy device created just a reference to old object
* (sbormann) Addes Toolbar-Icons

### 0.0.3
* (sbormann) various bugfixes

### 0.0.2
* (sbormann) first partly running version

### 0.0.1
* (sbormann) initial release

</details>

## License
MIT License

Copyright (c) 2020 Sebastian Bormann

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