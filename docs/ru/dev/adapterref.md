---
title: Adapterrefenz
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: KcgRtQ6Bo8BtjAcGVTpKRfxKSrE1pBlIrkhgjrvtXfM=
---
# Адаптер рефлекс
?> ***Это подстановочный знак*** . <br><br> Помогите с ioBroker и расширьте эту статью. Пожалуйста, обратите внимание на [Руководство по стилю ioBroker](community/styleguidedoc), чтобы изменения могли быть приняты легче.

@@@ substructure: https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation и IDE, nodejs-версии, собственный тег, больше ROllen, разные типы ... @@@

## Структура данных - объекты и состояния
Адаптер в ioBroker - это независимый процесс, который читает и записывает объекты и состояния в центральном хранилище данных. Хранение данных может быть представлено в виде базы данных (redis / couchDB) или просто текстового файла, но способ подключения всегда один и тот же - через API. Это означает, что разработчик не должен заботиться об этом.

В хранилище есть два типа данных:

* Объекты
* Штаты

Объекты представляют собой статические описания некоторых точек данных. Состояния - это динамические значения точек данных. Поэтому обычно для каждого состояния есть объект с описанием. (Но не наоборот).

Объекты, таким образом, описывают:

* настройка хостов
* описание адаптеров
* настройка экземпляров адаптера
* содержимое конфигурационных файлов HTML
* содержание веб-файлов
* перечисления
* пользователи
* иерархии состояний (каналы и устройства)

Вы можете исследовать объекты и текущие значения состояния в адаптере администратора на вкладке «Объекты».

Наименование объекта из разных частей. Каждая часть делится на "." друг от друга. Есть системные объекты (имя начинается с _ или "system.") И объекты-адаптеры (имя начинается с имя-адаптера).

Примечание: здесь и далее имя адаптера - это имя адаптера, который разработчик хочет создать.

Состояния могут быть сгруппированы в каналы и каналы в устройствах. Вот пример групп и каналов Homematic:

* hm-rpc.0.IEQ1234567 - устройство
  * hm-rpc.0.IEQ1234567.0 - канал
    * hm-rpc.0.IEQ1234567.0.INFO - состояние
    * hm-rpc.0.IEQ1234567.0.RSSI - состояние
  * hm-rpc.0.IEQ1234567.0 - канал
    * hm-rpc.0.IEQ1234567.0.STATE - состояние
    * hm-rpc.0.IEQ1234567.0.BATTERY - состояние

Идентификатор состояния всегда должен начинаться с названия канала и названия канала с именем устройства. Например в названии состояния hm-rpc.0.IEQ1234567.0.INFO, указанном выше, часть hm-rpc.0.IEQ1234567.0 - это имя канала, а hm-rpc.0.IEQ1234567 - имя устройства.

Он используется для построения координации устройства, каналов и состояний в иерархии.

?> Примечание. Если адаптер не такой сложный, устройства и даже каналы можно опустить.

** Адаптер ** - это просто пакет файлов, который помещается в каталог node_modules. Для каждого адаптера описание этого адаптера можно найти в объекте "system.adapter.adapterName". Это просто поля «общие» и «нативные» из файла io-package.json. Эта запись автоматически создается при вызове iobroker install adapterName или iobroker add adapName. Iobroker.adapterName запись не будет создана до создания первого экземпляра. Но это не так важно. Необходимая для "обновлений" информация будет считываться непосредственно из io-package.json. Полный список общих параметров для адаптера можно найти [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter).

** Экземпляр ** является экземпляром адаптера. В зависимости от типа адаптера может быть создано более одного экземпляра, но для некоторых адаптеров нет смысла создавать более одного экземпляра. Например в случае vis или рикши может быть создан только один экземпляр. Это поведение контролируется флагами в io-package.json.

Для каждого экземпляра объект конфигурации находится в хранилище данных под идентификатором «system.adapter.adapterName.X», где X - номер экземпляра адаптера. Он содержит настройки для этого экземпляра адаптера. Обычно он состоит из «общих» и «родных» настроек. Общие настройки:

* `enabled`: true / false;
* `host`: имя хоста, на котором должен запускаться этот экземпляр;
* `mode`: нет, демон, подписка, расписание, один раз;

Описание можно найти [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#instance).

Настройки `Native` состоят из определенных конфигураций для этого адаптера, например: IP-адрес устройства, настройки устройства и т. Д.

?> Примечание. Экземпляры могут работать на разных хостах (в системах с несколькими хостами) и на адаптерах.

Все идентификаторы объекта экземпляра адаптера начинаются с adaptorName.X, где X - номер экземпляра адаптера.

Объекты имеют разные типы для разных целей.

Для каждого адаптера автоматически создаются следующие объекты:

* `system.adapter.adapterName`: описание адаптеров (например, имя, номер версии, ...)
* `adapterName`: Объект, содержащий файлы HTML / JS / CSS из каталога адаптеров" www ". Этот объект будет создан, только если в пакете адаптера найден каталог "www".
* adaptorName.admin. Объект, содержащий файлы HTML / JS / CSS из каталога «admin» пакета адаптера.

Для каждого экземпляра адаптера 'X' автоматически создается следующее:

* `system.adapter.adapterName.X`: настройка экземпляра адаптера
* `system.adapter.adapterName.X.alive`: указание, жив ли экземпляр (отправлять сообщения каждые 30 секунд)
* `system.adapter.adapterName.X.connected`: указание, подключен ли экземпляр к хранилищу данных, поскольку он не может быть подключен, но из-за тупика не может отправлять живые сообщения.
* `system.adapter.adapterName.X.memHeapTotal`: использование памяти
* `system.adapter.adapterName.X.memHeapUsed`: использование памяти
* `system.adapter.adapterName.X.memRss`: использование памяти
* `system.adapter.adapterName.X.uptime`: сколько секунд работает адаптер.

Объяснение памяти можно найти [здесь](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

Если в адаптере есть режим «нет» или «один раз», то живые, работоспособные, ... объекты не будут созданы.
Структура каталогов адаптеров

Пакет адаптера должен иметь несколько обязательных каталогов и файлов:

* admin (обязательный каталог)
  * index.html
  * xxx.png - необязательно, лучше, если оно имеет имя adapterName.png (поддерживаются любые форматы изображений: jpeg, jpg, svg, bmp, ...)
* www - (необязательный каталог)
* lib - (обязательный каталог, из-за utils.js)
  * utils.js
* package.json - обязательно
* io-package.json - обязательно
* main.js - обязательно (может быть adapterName.js)

Примечание: lib / utils.js - это общий файл для всех адаптеров, используемый для определения положения js-контроллера и, соответственно, пути к iobroker.js-controller / lib / adapter.js. Наиболее актуальный utils.js можно скачать здесь. Не меняйте этот файл.

## Наименование файлов
Адаптер должен следовать некоторому соглашению об именах, чтобы быть принятым и запущенным контроллером ioBroker.

* На github (или где-то еще) он должен иметь имя *io **B** roker.adapterName*
Iobroker.adapterName, поскольку npm допускает использование заглавных букв в именах пакетов. Это можно определить в файле package.json.
* HTML-файл графического интерфейса для настройки адаптеров должен иметь admin / index.html. В каталоге «admin» может быть больше файлов, но index.html должен существовать.
* Стартовый файл адаптера должен иметь имя main.js или adapterName.js.
* Имя адаптера должно быть уникальным, строчными, без специальных символов и без пробелов. «-», «_» разрешены в названии адаптера.

## Структура io-package.json
io-package.json используется js-controller, чтобы показать, как работает адаптер и как с ним обращаться. Полное описание всех полей в общей части можно найти здесь

io-package.json хочет, чтобы администратор прочитал его, чтобы узнать онлайн-версию адаптеров.
Общие поля

Наиболее важные общие области:

* название: обязательно. Имя адаптера без "ioBroker.", Как имя адаптера, а не "ioBroker.adapterName"
* версия: обязательна. Должно быть как в package.json.
* название: обязательно. Сокращенное название адаптера, например «Имя адаптера»
* desc: обязательно. Описание адаптера. Это может быть строка типа «Этот адаптер делает то и это»

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

Если для текущего языка нет записей, будет показано описание на английском языке.

* платформа: обязательно. На самом деле поддерживается только "Javascript / Node.js".
* режим: обязательный. Мода, как будет запущен адаптер.
* включено: необязательно. Когда установлено значение true, экземпляр будет активирован после добавления.
* лицензия ": название лицензии и то, на что лицензирован адаптер;
* loglevel ": начальный уровень журнала, который нужно установить после создания." Может "debug", "info", "warn" или "error"
* readme ": ссылка на страницу readme в Интернете. Используется адаптером администратора для отображения ссылки при нажатии кнопки"? ".
* icon ": имя иконки (не путь) значка адаптеров.
* extIcon: путь к значку в Интернете, чтобы показать значок для адаптеров.
* ключевые слова: ключевые слова в виде массива для поиска в адаптере администратора.
* localLink: ссылка на файлы адаптера "www" (или сервер адаптера). "Http://192.168.0.100"
* тип: возможны следующие типы: аппаратный, социальный, хранилище, визуальный, API, скриптинг, погода, другое, подключение.
* Окно сообщения: необязательно. Должно быть установлено значение true, если адаптер должен получать системные сообщения.

Примечание: localLink может иметь специальные ключи.

*% ip%: требуется заменить IP-адресом, определенным в первом экземпляре «web».
*% field%, где field это атрибут из «нативной» части конфигурации экземпляра адаптера.

Например «http://% ip%:% port%» хочет отображаться как «http://192.168.0.1:8080», где «192.168.0.1» - это IP-адрес от «веб-адаптера», а 8080 - это значение от «системы». .adapter.adapterName.X => native.port ".
Поля объекта

объекты - статические объекты для всех экземпляров адаптеров (xxx.object) не могут быть созданы автоматически. Эти объекты не должны зависеть от какого-либо конкретного экземпляра и являются общими для всех экземпляров этого адаптера. Например, адаптер hm-rpc имеет описание структуры всех устройств HomeMatic.

Кроме того, новые виды могут быть определены. В SQL они называются «хранимыми процедурами», а в couchDB - представлениями.

Примечание: не смешивайте с видами "vis".

Для определения представлений используется язык JavaScript. Вот образец:

```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

Вот два представления, определенные для адаптеров hm-rpc: «listDevices» и «paramsetDescription». Они возвращают набор отфильтрованных по виду объектов условий из хранилища данных. Он может эффективно (если используется CouchDB) запросить указанный список объектов.

Чтобы использовать вид:

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
    {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
    function (err, doc) {
	    if (doc && doc.rows) {
		    for (var i = 0; i < doc.rows.length; i++) {
			    var id  = doc.rows[i].id;
			    var obj = doc.rows[i].value;
			    console.log('Found ' + id + ': ' + JSON.stringify(obj));
		    }
            if (!doc.rows.length) console.log('No objects found.');
	    } else {
		    console.log('No objects found: ' + err);
	    }
    }
);
```

Использование startkey и endkey также можно найти на одной странице.

Примечание: использование представлений основано на базовом уровне знаний о CouchDB.

### Поля объекта экземпляра
Некоторые конкретные объекты или объекты могут быть определены в instanceObjects io-package.json.

Для каждого созданного экземпляра будут созданы все экземпляры из поля instanceObjects.

Например, адаптер hm-rpc создает состояние «обновлено» для каждого экземпляра, чтобы дать сигнал другим адаптерам, что они должны быть обработаны hm-rega.

```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```

Нет необходимости указывать полный путь к объекту, и это невозможно сделать, так как экземпляр адаптера неизвестен. Вы можете использовать специальное слово "% INSTANCE%" в common.name, чтобы показать его в имени объекта. Например:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Будет расширен до

```
"name": "Some new devices added in hm-rpc.0,
```

созданием первой инстанции.

### Package.json
package.json - это файл описания стандарта пакета npm, который можно найти по адресу https://docs.npmjs.com/files/package.json.

Краткая структура package.json:

```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
    "myPacket1": "~0.3.1",
    "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```

!> Все поля обязательны для заполнения. devDependencies должен уметь выполнять основные задачи.

### Развертывание
Предлагается иметь код на github. После установки адаптеров, чтобы следовать за вами:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

Если все в порядке и вы получили положительные отзывы от пользователей, вы можете опубликовать адаптеры на npm. Было бы хорошо, если вы хотите создать реализацию на github.

Публикация может быть выполнена с помощью следующей команды:

```
npm publish
```

Назовите это в каталоге адаптера. Убедитесь, что вы удалили все остальные файлы, кроме необходимых (например, .idea), или добавьте их в файл ".gitignore".

Конечно, вы должны сначала создать учетную запись на Npm

?> Примечание: нельзя публиковать дважды код с одной и той же версией. Увеличьте версию в package.json и io-package.json перед публикацией.

Его можно установить через адаптер «admin».

## Как создавать собственные адаптеры
Пожалуйста, проверьте https://github.com/ioBroker/ioBroker.template для шаблона вашего собственного адаптера.

Если вы хотите создать виджет или адаптер с виджетом, проверьте [ioBroker.vis-template] https://github.com/ioBroker/ioBroker.vis-template) шаблон вашего собственного адаптера.

### Структура main.js
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

Эта строка загружает модуль lib / utils.js. Он имеет общую для всех адаптеров функцию поиска корня контроллера iobroker.js. Поскольку адаптер может быть установлен в трех разных путях:

* ... / iobroker / node_modules / iobroker.adapterName - это стандартный путь и предлагается использовать
* ... / iobroker.js-controller / node_modules / iobroker.adapterName - используется для отладки
* ... / iobroker.js-controller / adapter / adapterName - старый стиль (не рекомендуется)

utils.js ничего не делает, кроме как ищет файл iobroker.js-controller / lib / adapter.js и загружает его.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

Эта строка создает объект «Adapter» с именем «adapterName». Он загружает всю конфигурацию для adapterName.X, где X - номер экземпляра адаптера.

js-контроллер запускает адаптер как ветвь собственного процесса с двумя параметрами: экземпляром и уровнем журнала; как:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

Все это будет обработано в файле adapter.js, и адаптер не должен заботиться об этом.

Адаптер поддерживает 3 других флага запуска:

* --install - запускает адаптер, даже если конфигурация не существует. Используется адаптерами для выполнения некоторой процедуры установки.
* --force - запускает адаптер, даже если он отключен в конфигурации
* --logs - Показывать журналы в консоли, если они отображаются только в таблице журналов.

var myPacket1 = require ('myPacket1'); // добавить собственный модуль

Затем вы можете загрузить все другие модули в адаптеры, такие как 'fs', 'require' и так далее. Только не забудьте объявить их в package.json.
Варианты адаптеров

Вы можете создать объект адаптера только по имени, например utils.adapter ('adapterName') или с дополнительными параметрами, например:

```
var adapter = utils.adapter({
    name: 'adapterName',    // mandatory - name of adapter
    dirname: '',            // optional - path to adapter (experts only)
    systemConfig: false,    // optional - if system global config must be included in object
                            // (content of iobroker-data/iobroker.json)
        config: null,       // optional - alternate global configuration for adapter (experts only)
    instance: null,         // optional - instance of the adapter
    useFormatDate: false,   // optional - if adapter wants format date according to global settings.
                            // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,  // optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,     // optional - handler for subscribed objects changes
    message: null,          // optional - handler for messages for this adapter
    stateChange: null,      // optional - handler for subscribed states changes
    ready: null,            // optional - will be called when adapter is initialized
    unload: null,           // optional - will be called by adapter termination
    noNamespace: false      // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```

Все обработчики могут быть смоделированы событиями (см. Ниже), например:

```
adapter.on('ready', function () {
    main();
});
```

### Атрибуты объекта адаптера
Как вы создали объект «Адаптер» с

var adapter = utils.adapter ('имя_адаптера');

в этом экземпляре объекта будут созданы следующие атрибуты:

* name - имя адаптера, например, "adapterName"
* host - имя хоста, на котором работает экземпляр адаптера
* instance - номер экземпляра этого экземпляра адаптера
* namespace - пространство имен объектов адаптеров, например, «adapterName.0»
* config - встроенная часть настроек адаптера
* common - общая часть настроек адаптера
* systemConfig - содержимое iobroker-data / iobroker.json (только если options.systemConfig = true)
* adapterDir - путь к папке адаптера
* ioPack - содержимое io-package.json
* pack - содержимое package.json
* log - объект логгера
* версия - версия адаптера
* штаты - (только для экспертов)
* объекты - (только для экспертов)
* подключен - если адаптер подключен к хосту

#### Самые важные события
```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
* adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

* // you can use the ack flag to detect if state is command(false) or status(true)
* if (!state.ack) {
* * adapter.log.info('ack is not set!');
* }
});
```

!> *Точка входа* Сделайте все инициализации в main, потому что до «ready» нет конфигурации.

```
adapter.on('ready', function () {
* main();
});
```

#### Ведение журнала
Очень важно иметь возможность проверять события для целей отладки и контроля. Следующие функции могут быть использованы для регистрации событий:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

Нет необходимости указывать источник или время сообщения. Эти атрибуты будут добавлены автоматически, например:

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Конечно, можно использовать console.log, console.debug или console.error, но эти сообщения будут видны только в том случае, если адаптер запускается вручную в консоли или в среде IDE программирования.

#### Конфигурация экземпляра
Существует адаптер для конфигурации экземпляра: "adapter.config". Этот объект является «нативной» частью объекта «system.adapter.adapterName.X». Например если io-package.json выглядит так:

{

* "обычный": {
* * "имя": "имя_адаптера"
* },
* "родной": {
* * «местоположение»: «Штутгарт»,
* * "язык": ""
* }

}

Таким образом, файл adapter.config равен:

{

* "местоположение": "Штутгарт",
* "язык": ""

}

и имеет данные, введенные пользователем в диалоговом окне конфигурации. Вы можете получить доступ к **общей** части конфигурации экземпляра с атрибутом «common» объекта «adapter». Например для показанного io-package.json "adapter.common" хочет быть:

{"name": "adapterName"}

Для доступа к конфигурации ioBroker (хранящейся в файле iobroker-data / iobroker.json) установите для параметра адаптера systemConfig значение true.

var adapter = utils.adapter ({

* name: * * 'имя_адаптера', // имя адаптера
* systemConfig: true *** // загрузка конфигурации ioBroker в systemConfig

});

Чтобы получить глобальный формат даты, для параметра «useFormatDate» должно быть установлено значение true:

var adapter = utils.adapter ({

* name: * * 'имя_адаптера', // имя адаптера
* useFormatDate: true * * // загрузить из system.config глобальный формат даты

});

Формат даты будет доступен в файле adapter.dateFormat.

Все остальные конфигурации можно прочитать вручную с помощью функции getForeignObject.
Как читать состояние

Существует два режима чтения состояний в адаптере ioBroker:

* подписка на мероприятие (предлагается)
* Опрос

Чтобы подписаться на собственные события, необходимо сказать следующее:

adapter.subscribeStates ( '*'); // подписаться на этот экземпляр адаптера с шаблоном "adapterName.X. *" adapter.subscribeStates ('memory *'); // подписаться на этот экземпляр адаптера с шаблоном "adapterName.X.memory *"

Чтобы подписаться на другие события:

adapter.subscribeForeignStates (. * год forecast.html. '); // подписаться на переменную «Forecast.html» всех экземпляров адаптера «YR».

Подстановочный знак "*" может использоваться в обеих функциях.

После этого вы хотите получить событие «stateChange» и можете что-то сделать с этим значением. После подписки вы не получите фактическое состояние, потому что события будут происходить только при изменении. Чтобы получить начальное состояние, вы должны выполнить «опрос» один раз при запуске (обычно в «готовом» событии).

Опрос Чтобы прочитать собственные состояния при запуске или прочитать значения с интервалом, используйте функцию adapter.getState, как здесь:

adaptor.getState ('myState', function (err, state) {*

* adapter.log.info (
* * 'State' + adapter.namespace + '.myState -' +
* *'Значение:'* * + state.val +
* *', ack:'* * + state.ack +
* * ', отметка времени:' + state.ts +
* * ', последнее изменение:' + state.lc
* );

});

Обратите внимание, что будет возвращено асинхронно.

Чтобы прочитать состояния других адаптеров, вы должны использовать функцию adapter.getForeignState. Подстановочные знаки не поддерживаются.

#### Команды и статусы
Мы должны различать команды и состояния, когда речь идет о состояниях. «Команда» помечена как ложная и будет отправлена пользователем (через vis, javascript adapter, admin) для управления устройством или конкретным адаптером. Обычно адаптеры (например, homematic) подписываются на все свои собственные изменения, и если какое-либо состояние изменяется с помощью ack = false, они пытаются выполнить эту команду (например, включить свет).

«Status» имеет флаг «ack» как истинный и указывает, что это от устройства или сервиса. Например если погодный адаптер получил новый прогноз погоды, он будет опубликован с помощью ack = true, или если термометр homematic измеряет новую температуру, он также будет опубликован с помощью ack = true. Даже если пользователь хочет включить свет, новое состояние будет опубликовано с ack = true.

Ack = false хочет быть перезаписано выполнением после ответа от устройства.

Например если пользователь в «vis» нажал кнопку и отправил команду «hm-rpc.0.kitchen.light» = ON. Адаптер Socketio хочет отправить экземпляру hm-rpc.0 новое состояние с параметром «kitchen.light» = {val: 1, ack: false}.

Адаптер Homematic подписан на все состояния hm-rpc.0 и, если новое состояние хочет получить с помощью ack = false, он отправляет новое значение физическому коммутатору.

Физический коммутатор выполняет команду и отправляет адаптеру hm-rpc новое собственное состояние ON. Адаптер hm-rpc.0 публикует новый статус состояния "hm-rpc.0.kitchen.light" = {val: 1, ack: true} (с отметками времени).

Это изменение не будет выполнено адаптером hm-rpc, поскольку ack имеет значение true. И это подтверждение от физического устройства.

#### Как написать состояние
Состояния могут быть записаны в виде команд или статусов. Для этого необходимо использовать adapter.setState и adapter.setForeignState:

adapter.setForeignState ('otherAdapter.X.someState', 1); // Управляем другим адаптером adapter.setState ('myState', 1, true); // указываем новое состояние собственного состояния adapter.setState ('myState', {val: 1, ack: true}); // то же, что и выше

adapter.setState ('myState', 1, true, function (err) {

* // анализ, если состояние может быть установлено (из-за разрешений)
* if (err) adapter.log.error (err);

});

Примечание: следующие команды идентичны

adapter.setState ('myState', 1, false); adapter.setState ('myState', 1);

#### Структура государства
State - это объект javascript со следующими атрибутами:

* val: значение состояния (желаемое значение или фактическое значение)
* ack: флаг направления. false для желаемого значения и true для фактического значения. По умолчанию: false (команда)
* ts: отметка времени в виде количества миллисекунд между полуночью 1 января 1970 года и указанной датой. Результат метода getTime () объекта Javascript Date. По умолчанию: фактическое время.
* lc: отметка времени последнего изменения. Тот же формат, что и ts, но отметка времени изменения значения. Может быть обновлено, но значение останется прежним. В этом случае lc не будет изменен.
* from: имя экземпляра адаптера, который устанавливает значение, например "system.adapter.web.0" (в случае виз)
* expire: (необязательно), есть возможность установить тайм-аут истечения в секундах. По истечении этого периода времени переменная хочет быть установлена на «ноль». Он хочет быть использован, например "активными" состояниями экземпляров адаптера. Если экземпляр адаптера не активирует «активное» состояние в течение 30 секунд, он будет помечен как выключенный. Чтобы установить состояние с истечением срока действия, используйте следующий код setState ('variable', {val: true, expire: 30})
* q: (необязательно) Качество. Смотрите здесь описание

Режимы работы адаптера

Адаптер может работать в разных режимах. Режим для адаптеров позволяет мне определять общие атрибуты.

* none - этот адаптер не будет запущен.
* daemon - всегда запущенный процесс (будет перезапущен, если процесс завершится)
* подписка - запускается, когда состояние system.adapter ... alive меняется на true. Удаляется, когда .alive изменяется на false и устанавливает .alive на false, если процесс завершается (не будет перезапущен при выходе из процесса)
* schedule - запускается по расписанию, найденному в system.adapter ... common.schedule - реагирует на изменения .schedule путем перепланирования с новым состоянием
* один раз - этот адаптер будет запускаться каждый раз, когда объект system.adapter .. изменяется. Он не будет перезапущен после завершения.

Обычно адаптеры должны использовать режим daemon.

Если адаптер просто проверяет что-то каждые X минут, он должен использовать режим «schedule» и определять расписание cron в common.schedule (например, «1 *** *» - каждый час)

#### Как читать объект
Объекты можно прочитать с помощью команды getObject или getForeignObject:

adaptor.getForeignObject ('otherAdapter.X.someState', function (err, obj) {

* if (err) {
* * adapter.log.error (err);
*} еще {
* * adapter.log.info (JSON.stringify (obj));
* }

});

adaptor.getObject ('myObject', function (err, obj) {

});

Функции всегда асинхронные.

Объекты адаптера должны быть организованы в устройства, каналы и состояния.

Смотрите: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### Как написать объект
Для записи объектов обычно можно использовать две функции: setObject, setForeignObject. Но есть много справочных функций для изменения объектов:

* exteObject, exteForeignObject,
* delObject, delForeignObject,
* setObjectNotExists, setForeignObjectNotExists
* createDevice, deleteDevice
* createChannel, deleteChannel,
* createState, deleteState
* addStateToEnum, deleteStateFromEnum

extendObject просто читает объект, сливается с данным и записывает объект обратно.

Разница между xxxObject и xxxForeignObject заключается в том, что xxxObject автоматически расширяет идентификатор объекта с помощью «adapter.instance». текст.

Функции всегда асинхронные.

adaptor.getForeignObject ('otherAdapter.X.someState', function (err, obj) {

* if (err) {
* * adapter.log.error (err);
*} еще {
* * adapter.log.info (JSON.stringify (obj));
* * obj.native = {}; // изменить объект
* * adapter.setForeignObject (obj._id, obj, function (err) {
* * * if (err) adapter.log.error (err);
* * });
* }

});

#### Info.connection
Если адаптер устанавливает и контролирует некоторое соединение, он должен создать и поддерживать переменную info.connection.

Если это произойдет, состояние соединения появится в списке экземпляра в «admin», и при желании качество состояний будет зависеть от состояния соединения.

## Функции
* setObject = функция setObject (id, obj, callback)
* exteObject = функция exteObject (id, obj, callback)
* setForeignObject = функция setForeignObject (id, obj, callback)
* exteForeignObject = функция exteForeignObject (id, obj, callback)
* getEnum = функция getEnum (_enum, обратный вызов)
* getEnums = функция getEnums (_enumList, обратный вызов)
* getForeignObjects = функция getForeignObjects (шаблон, тип, перечисления, обратный вызов)
* findForeignObject = функция findForeignState (идентификатор, тип, обратный вызов)
* getForeignObject = функция getForeignObject (идентификатор, обратный вызов)
* delObject = функция delObject (идентификатор, обратный вызов)
* delForeignObject = функция delForeignObject (идентификатор, обратный вызов)
* subscribeObjects = функция subscribeObjects (шаблон)
* subscribeForeignObjects = функция subscribeObjects (шаблон)
* setObjectNotExists = функция setObjectNotExists (идентификатор, объект, обратный вызов)
* setForeignObjectNotExists = функция setForeignObjectNotExists (id, obj, callback)
* createDevice = функция createDevice (deviceName, common, _native, callback)
* createChannel = функция createChannel (parentDevice, channelName, roleOrCommon, _native, callback)
* createState = функция createState (parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
* deleteDevice = функция deleteDevice (имя_устройства, обратный вызов)
* addChannelToEnum = функция addChannelToEnum (enumName, addTo, parentDevice, channelName, обратный вызов)
* deleteChannelFromEnum = функция deleteChannelFromEnum (enumName, parentDevice, channelName, обратный вызов)
* deleteChannel = функция deleteChannel (parentDevice, channelName, callback)
* deleteState = функция deleteState (parentDevice, parentChannel, stateName, обратный вызов)
* deleteStateFromEnum ('', parentDevice, parentChannel, stateName);
* getDevices = функция getDevices (обратный вызов)
* getChannelsOf = function getChannelsOf (parentDevice, callback)
* getStatesOf = function getStatesOf (parentDevice, parentChannel, callback)
* addStateToEnum = функция addStateToEnum (enumName, addTo, parentDevice, parentChannel, stateName, обратный вызов)
* deleteStateFromEnum = функция deleteStateFromEnum (enumName, parentDevice, parentChannel, stateName, обратный вызов)
* rmDir = функция rmDir (путь, обратный вызов)
* mkDir = функция mkDir (путь, режим, обратный вызов)
* readDir = функция readDir (адаптер, путь, обратный вызов)
* unlink = функция unlink (адаптер, имя, обратный вызов)
переименовать = переименовать функцию (адаптер, oldName, newName, обратный вызов)
* mkdir = функция mkdir (адаптер, dirname, обратный вызов)
* readFile = функция readFile (адаптер, имя файла, параметры, обратный вызов)
* writeFile = функция writeFile (адаптер, имя файла, данные, mimeType, обратный вызов)
* formatDate = функция formatDate (dateObj, isSeconds, _format)
* sendTo = функция sendTo (objName, команда, сообщение, обратный вызов)
* sendToHost = функция sendToHost (objName, команда, сообщение, обратный вызов)
* setState = функция setState (идентификатор, состояние, обратный вызов)
* setForeignState = функция setForeignState (идентификатор, состояние, обратный вызов)
* getState = функция getState (идентификатор, обратный вызов)
* getStateHistory = функция getStateHistory (идентификатор, начало, конец, обратный вызов)
* getForeignStateHistory = функция getStateHistory (идентификатор, начало, конец, обратный вызов)
* idToDCS = функция idToDCS (id)
* getForeignState = function getForeignState (id, callback)
* delForeignState = функция delForeignState (идентификатор, обратный вызов)
* delState = функция delState (идентификатор, обратный вызов)
* getStates = функция getStates (шаблон, обратный вызов)
* getForeignStates = функция getForeignStates (шаблон, обратный вызов)
* subscribeForeignStates = функция subscribeForeignStates (шаблон)
* unsubscribeForeignStates = функция unsubscribeForeignStates (шаблон)
* subscribeStates = функция subscribeStates (шаблон)
* pushFifo = функция pushFifo (идентификатор, состояние, обратный вызов)
* trimFifo = функция trimFifo (идентификатор, начало, конец, обратный вызов)
* getFifoRange = функция getFifoRange (идентификатор, начало, конец, обратный вызов)
* getFifo = функция getFifo (идентификатор, обратный вызов)
* lenFifo = функция lenFifo (идентификатор, обратный вызов)
* subscribeFifo = функция subscribeFifo (шаблон)
* getSession = функция getSession (идентификатор, обратный вызов)
* setSession = функция setSession (id, ttl, data, callback)
* destroySession = функция destroySession (идентификатор, обратный вызов)
* getMessage = функция getMessage (обратный вызов)
* lenMessage = функция lenMessage (обратный вызов)
* setBinaryState = функция setBinaryState (идентификатор, двоичный файл, обратный вызов)
* getBinaryState = функция getBinaryState (идентификатор, обратный вызов)
* getPort = функция adapterGetPort (порт, обратный вызов)
* checkPassword = функция checkPassword (пользователь, pw, обратный вызов)
* setPassword = функция setPassword (пользователь, pw, обратный вызов)
* checkGroup = функция checkGroup (пользователь, группа, обратный вызов)
* stop (common.mode: подписаться, запланировать, один раз)
* log.debug (msg)
* log.info (сообщение)
* log.warn (сообщение)
* log.error (msg)

## События
* готов
* objectChange (id, obj) (предупреждение obj может быть нулевым, если удалено)
* сообщение (объект)
* stateChange (id, state) (состояние предупреждения может быть нулевым, если оно удалено)
* разгрузить

### Как создать экземпляр
Перед публикацией в npm: скопируйте в ioBroker / node_modules, перейдите в «admin» и добавьте экземпляр. После публикации в npm: перейдите в ioBroker / и напишите `npm install iobroker.xxx --production --no-optional --logevel=error`, перейдите к `admin` и добавьте экземпляр Как отлаживать

* Запустите ioBroker
* Добавить экземпляр адаптера
* Отключить экземпляр адаптера
* Запустите WebStorm
* Создать конфигурацию для отладки с помощью node.js
* Флаги для приложения: `--force, экземпляр, уровень журнала` (вы можете запустить адаптер как` узел xxx.js 1 отладка --force`, 1 - индекс экземпляра (по умолчанию 0, отладка - уровень журнала и `- -force` означает игнорировать настройки «enabled: false»)

## Admin.html
* функция showMessage (сообщение, заголовок, значок)
* функция getObject (идентификатор, обратный вызов)
* функция getState (идентификатор, обратный вызов)
* функция getEnums (_enum, обратный вызов)
* Функция getIPs (хост, обратный вызов)
* функция fillSelectIPs (id, actualAddr, noIPv4, noIPv6)
* функция sendTo (_adapter_instance, команда, сообщение, обратный вызов)
* функция sendToHost (хост, команда, сообщение, обратный вызов)
* функция fillSelectCertificates (id, type, actualValued)
* функция getAdapterInstances (_adapter, обратный вызов)
* функция getIsAdapterAlive (_adapter, обратный вызов)
* функция addToTable (tabId, значение, $ grid, _isInitial)
* функция enumName2Id (перечисления, имя)
* функция editTable (tabId, cols, values, top, onChange)
* функция getTableResult (tabId, cols)

## Лучшая практика