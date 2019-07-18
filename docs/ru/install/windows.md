---
title: установка
lastChanged: 18.07.2019
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/windows.md
hash: XFdcrokNPGtTri8RFE+c4m/7TgKEDdKqtTLfO7BRt1s=
---
# Установка ioBroker в Windows
?> ***Этот предмет в настоящее время расширяется*** . <br><br> Помоги мне с ioBroker. Пожалуйста, обратите внимание на [Руководство по стилю ioBroker](community/styleguidedoc), чтобы изменения могли быть приняты легче.

Следующие инструкции проведут вас шаг за шагом по установке. Пожалуйста, не пропускайте шаги, так как некоторые команды строятся друг на друге.

## Проверьте требования
!> Сначала проверьте, выполняет ли система все необходимые [требования к установке](install/requirements).

Node.js требуется для запуска ioBroker. Далее предполагается, что ни Node.js, ни ioBroker не установлены на ПК. Если ioBroker уже установлен, перейдите к разделу [Обновление] ().

Чтобы определить, установлен ли Node.js, открывается диалоговое окно `Ausführen` с комбинацией клавиш <kbd>⊞ Windows</kbd> + <kbd>r,</kbd> а затем с командой

```
cmd.exe /C node -v & pause
```

вошел. После подтверждения команды появится окно.

![Node.js версия](../../de/install/media/w02nodecheck.png) *Node.js экзамен*

Отображается либо сообщение об ошибке, либо установленная версия Node.js.

При выводе номера версии Node.js сначала убедитесь, что он по-прежнему соответствует [Требования к установке] ().

Если сообщение об ошибке - `Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`, то node.js не установлен, а установка - [можно начать сразу](#nodeinst).

## Быстрый старт
?> Это краткое изложение шагов установки предназначено для опытных пользователей ioBroker, которые уже установили ioBroker несколько раз.

Начинающие должны следовать [подробные инструкции](#nodeinst).

* Node.js 8.x LTS версия [скачать и установить] (установить / nodejs).
* Командная строка `cmd.exe` открыта от имени администратора и следующие команды по очереди

  бежать:

```
npm install --global windows-build-tools
md C:\iobroker
cd /d C:\iobroker
npm install iobroker
npm install --production --no-optional --logevel=error
iobroker status
```

<div id="nodeinst"></div>

## Установка Node.js и npm
Установка Node.js происходит в соответствии с [это руководство](install/nodejs).

## Установка ioBroker
?> ioBroker можно установить в свободно выбираемую папку на локальном жестком диске. Если путь установки содержит пробелы, полный путь должен быть заключен во все команды в кавычках.
Пример команды: `dir "C:\ioBroker Testsystem"`.

?> Папка установки по умолчанию для ioBroker - это `C:\iobroker`.

1. Откройте окно командной строки от имени администратора. Чтобы сделать это с помощью комбинации клавиш

<kbd>⊞ Windows</kbd> + <kbd>r</kbd> откройте диалоговое окно `Ausführen`, а затем команду

```
cmd
```

   Enter.

Так как окно командной строки должно быть открыто как администратор, пожалуйста, не вводите ** ** с `OK`, но с комбинацией клавиш `Strg` + `Umschalt` + `Eingabetaste`. Появится запрос подтверждения, который должен быть подтвержден с помощью `Ja` или введением пароля администратора.

!> Строка заголовка в черном командном окне, которое теперь открылось, должна начинаться со слова `Administrator:`.

?> Некоторые адаптеры ioBroker содержат компоненты, которые необходимо скомпилировать для Windows. Поэтому так называемые `windows-build-tools` устанавливаются перед установкой ioBroker. Более подробная информация о `windows-build-tools` - [найти здесь](https://github.com/felixrieseberg/windows-build-tools).

1. Windows-build-tools устанавливаются с помощью следующей команды:

```
npm install --global windows-build-tools
```

1. Затем в окне командной строки введите команду для создания установочной папки

   бежать:

```
md C:\iobroker
```

1. Теперь можно установить актуальный установочный пакет ioBroker:

```
cd /d C:\iobroker
npm install iobroker
```

   Результат должен выглядеть так:

```
[...]
╭───────────────────────────────────────────────────────╮
│ The iobroker files have been downloaded successfully. │
│ To complete the installation, you need to run         │
│                                                       │
│   npm i --production --no-optional --logevel=error    │
│                                                       │
╰───────────────────────────────────────────────────────╯

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\iobroker\package.json'
npm WARN iobroker No description
npm WARN iobroker No repository field.
npm WARN iobroker No README data
npm WARN iobroker No license field.

+ iobroker@1.3.0
added 51 packages from 28 contributors and audited 83 packages in 6.937s
found 0 vulnerabilities
```

1. Установка ioBroker завершается следующими командами:

```
cd /d C:\iobroker
npm install --production --no-optional --logevel=error
```

Процесс установки может занять некоторое время. Если выполняется npm, красные сообщения об ошибках (gyp! ERR) могут появляться в связи с модулем `unix-dgram`. Эти сообщения об ошибках можно игнорировать.

   Последние строки установки должны заканчиваться примерно так:

```
[...]
Write "iobroker start" to start the ioBroker
npm install node-windows@0.1.14 --production --no-optional --logevel=error --save --prefix "C:/iobroker"
ioBroker service installed. Write "serviceIoBroker start" to start the service and go to http://localhost:8081 to open the admin UI.
To see the outputs do not start the service, but write "node node_modules/iobroker.js-controller/controller"
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 (node_modules\unix-dgram):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 install: `node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

added 514 packages from 300 contributors and audited 1808 packages in 61.874s
found 23 vulnerabilities (17 low, 6 high)
run `npm audit fix` to fix them, or `npm audit` for details
```

1. Затем вы можете использовать команду

```
iobroker status
```

Проверка, был ли ioBroker запущен автоматически как служба Windows.
Ответ должен либо

```
iobroker is running
```

   или

```
iobroker is not running
```

   громко.

   Если ioBroker не запустился автоматически, введите следующие команды:

```
net start iobroker.exe
iobroker status
```

   Ответ должен быть сейчас

```
iobroker is running
```

   громко.

?> В будущем ioBroker будет автоматически запускаться в фоновом режиме при каждом перезапуске системы.

1. Наконец, окно командной строки можно выполнить, выполнив команду

```
exit
```

   быть закрытым

?> Дальнейшая настройка выполняется с помощью адаптера `Admin`. Он вызывается через веб-браузер и адресом [http:// локальный: 8081](http://localhost:8081). О сети Конфигурация ioBroker подробно описана в главе [Конфигурация] ().

?> Для начинающих теперь рекомендуется запустить [Tutorial] (). Здесь постепенно представлен интерфейс администрирования и сделаны основные базовые настройки.

## Обновление
@@@ tbd @@@

## Устранение неисправностей
@@@ tbd @@@