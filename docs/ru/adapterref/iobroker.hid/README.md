---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hid/README.md
title: без названия
hash: ocorguClOBzHzBoeOx9POaHFhiuwEqU3Ppx/5S23HMo=
---
![логотип](../../../en/adapterref/iobroker.hid/admin/hid.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.hid.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

### IoBroker.hid
#### Описание
Адаптер для устройств HID, например Apple Remote

#### Информация
Полностью переработан

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.hid
```

#### Состояния
Есть две группы состояний: raw и key. группа ключей будет только запущена, если сопоставление найдено.

Только одно из состояний xxx.double, xxx.single и xxx.long изменится в случае события.
Состояние xxx.dsl получает результаты .double, single или long.
Действие указывает вниз, вверх или повторить.

#### Отображения
Добавьте или отредактируйте раздел сопоставления в файле io-package.json, чтобы увидеть названия кодов клавиш.
Это не обязательно, необработанные состояния данных будут созданы в любом случае.

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

#### Требования
Модуль node-hid не работает в Windows 10, пока вы не внесете небольшое изменение в проект node-hid.
После установки iobroker.hid отредактируйте:

```
<path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid/hidapi/windows/hid.c
```

Найти:

```
open_device
```

Измените 2-й и 3-й параметр вызова функции «CreateFileA»:

```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ...

	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...
}
```

Чтобы перестроить модуль node-hid, перейдите в каталог:

```
cd <path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid
```

выполнить:

```
npm install --build-from-source
```

Перезапустите модуль iobroker.hid ...
->