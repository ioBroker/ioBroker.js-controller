---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/vscode.md
title: Код VS
hash: TXXU7i+WiRe1zmhlQuotwhVoN2pG5nBo/BtK1Ue6Jto=
---
# VS код
Разработка адаптера ioBroker с использованием кода Microsoft Visual Studio (VSCode) на основе адаптера ioBroker.template

!> Исправления, дополнения и изменения приветствуются!

Документальный фильм создан без какого-либо опыта с VSCode в сочетании с node.js / ioBroker. Если процедура нуждается в улучшении, я благодарен за любую подсказку.

Камни преткновения: если кто-то остался «застрявшим» и нуждается в более подробной информации, пожалуйста, откройте вопрос, чтобы документальный фильм можно было дополнять и уточнять.

Имя адаптера в примерах: **iobroker.template-master-mhe**

## Шаблон
Шаблонный адаптер ioBroker: [https://github.com/ioBroker/ioBroker.template](https://github.com/ioBroker/ioBroker.template)

## Проверено в следующей среде
- ioBroker, установленный локально
- ioBroker.js-controller: 1.0.0
- node.js: v6.10.2
- нпм: 3.10.10
- Windows 10 Prof.
- VSCode 1.12.1

## Сопутствующая информация о разработке адаптера в целом и с VSCode
- [Форум ioBroker: адаптер отладки с VSCode] (http://forum.iobroker.net/viewtopic.php?f=20&t=4564&p=61310&hilit=visual+studio+code#p44156)
- [Шаблон адаптера ioBroker на Github] (https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- Общая информация о разработке адаптеров на немецком языке: [ioBroker AdapterDev User Meeting 2017.pdf] [http://forum.iobroker.net/download/file.php?id=11259] от [Apollon77] (http://forum.iobroker. сеть / memberlist.php? режим = вид профиля & и = 378).
- [Документация по разработке адаптера ioBroker] (https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation)
- [Начало работы с разработкой адаптера на примере среды разработки Webstrom] (https://github.com/ioBroker/ioBroker/wiki/Installation,-setup-and-first-steps-with-an-ioBroker-Development-Environment)

## Общая процедура - использование шаблона для адаптера
### 1. Скачать шаблон
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate]](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - там пункт 1.) запустить, например: распаковать шаблон в папку и сохранить

### 2. Запустите "npm install" в папке
- устанавливает необходимый модуль npm в копию шаблона
- Папка node-modules вновь создается в папке с шаблонами
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate]](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - там пункт 2.) беги

### 3. grunt execute // изменяет настройки в шаблоне в существующем проекте
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate]](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - там пункт 3.) беги
- установить grunt глобально, если он еще не существует
- выполнить в терминале:

```
grunt rename --name=template-master-mhe --email=iobroker@digheim.de --author="Michael Herwig"
```

- Имя адаптера, имя автора и адрес электронной почты будут изменены через grunt в необходимых местах в коде

### 4. Загрузить папку адаптера в VSCode
- Настройте имя папки. Вот в примере ioBroker.template-master в iobroker.template-master-mhe
- VSCode: открыть файл / папку // или **CTRL + K, CTRL + O**

### 5. В VSCode скорректирована версия шаблона (от 0.5.0 до 0.0.2)
- изменено с 0.5.0 до 0.0.2 в io-package.json // используется ioBroker
- изменено с 0.5.0 до 0.0.2 в package.json // используется npm

### 6. скопировал в ioBroker и адаптировал путь / имя
- **Путь:** ... / iobroker / node_modules
- **Имя:** ioBroker.template-master-mhe
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate]](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- там пункт 5.)

### 7. Закрыть папку в VSCode
- VSCode: закрытие файла / папки // или **CTRL + K F**

### 8. ioBroker / Admin -> Обновить
- Нажмите «Обновить» в графическом интерфейсе администратора ioBroker.

### 9. Адаптер выбрал и добавил экземпляр
- Нажмите в ioBroker Admin GUI на плюс на адаптере

![СКРИНШОТ: экземпляр вашего собственного адаптера](../../de/dev/media/Instanz-installieren.png)

- Экземпляр адаптера установлен и отображается

![СКРИНШОТ: экземпляр вашего собственного адаптера](../../de/dev/media/Adapterinstanz.png)

- прекратить отладку установленного адаптера

### 10. Откройте установленную папку ioBroker в VSCode
- VSCode: открыть файл / папку // или **CTRL + K, CTRL + O**
- **.. / node_modules / iobroker.template-master-mhe** select
- Здесь вы можете теперь разработать и отладить адаптер

---

## Debug
### 1.) VSCode launch.json настроить
Один раз для всех адаптеров, настройки

- **SHIFT + CTRL + P** и затем введите:> debug launch.json
- или через графический редактор: на жуке, а затем на верхней части шестерни

![СКРИНШОТ: Конфигурация VSCode файла launch.json](../../de/dev/media/VSCode_launch.json.png)

Параметры launch.json для отладки адаптеров ioBroker:

```javascript
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Programm starten",             // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "program": "${workspaceRoot}/main.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "An den Prozess anfügen",       // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "address": "127.0.0.1",                 // Adresse, an dem der node.js Prozess läuft (bei Remote Debug, der Remote-Rechner)
            "port": 5858                            // Port, auf dem der node.js Debugger lauscht, der mit node --debug-brk ... gestartet wird
        }
    ]
}
```

- **Удаленная отладка** на удаленном ioBroker также возможна. IP-адрес должен быть отрегулирован с 127.0.0.1.

### 2.) Откройте терминал и запустите отладчик
- **CTRL + ö** // открывает встроенный терминал (комбинация клавиш зависит от операционной системы и версии VSCode)

- Остановить вновь установленный адаптер в терминале

cd / opt / iobroker остановка iobroker template-master-mhe

- запустить отладчик в терминале (поскольку сначала необходимо установить удаленную отладку в терминале через SSH):

        узел --debug - brk узел_модули / iobroker.template - мастер - mhe / main.js --force - логи

  Где **iobroker.template-master-mhe** - это имя адаптера.

Дисплей во встроенном терминале (Примечание: можно использовать и внешнюю терминальную программу):

``` cmd
PS C:\ioBroker> node --debug-brk node_modules/iobroker.template-master-mhe/main.js --force --logs
Debugger listening on [::]:5858
```

![SCREENSHOT: запуск отладчика VSCode](../../de/dev/media/VSCode_Debugger_starten.png)

Вывод в терминал после запуска отладчика:

``` cmd
starting. Version 0.0.2 in C:/ioBroker/node_modules/iobroker.template-master-mhe, node: v6.10.2
config test1: true
config test1: 42
stateChange template-master-mhe.0.testVariable {"val":true,"ack":false,"ts":1494753342714,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
ack is not set!
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
check group user admin group admin: false
check user admin pw ioboker: true
stateChange template-master-mhe.0.testVariable {"val":null,"ack":true,"ts":1494753367809,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753367809}
```

- отменить с помощью **CTRL + C** в терминале

Вывод в терминал после остановки отладчика:

``` cmd
cleaned everything up...
terminating
cleaned everything up...
PS C:\ioBroker>
```

- Перейти к отладке в VSCode и в разделе «Отладка» выбрать «Добавить к процессу» и запустить
- Вывод осуществляется на вкладке «Терминал» встроенного терминала.
- отменить с помощью CTRL + C в терминале

---

## Опыт
- Иконка адаптера шаблона была адаптирована (переименована) к Grunt, но не отображается в ioBroker / Admin
- правильный значок будет отображаться после публикации адаптера

---

### Todo
- Используйте VSCode с Github
- Пример на отдельном адаптере
- уточнить: отладка только с node.js> 6.x или 4.x также возможна?

---

### Документация в сети
#### В код Visual Studio
- [Основы VSCode] (https://www.microsoft.com/technet/know-how/visual-studio-code-01-the-basics.aspx)

#### To node.js
#### Git & Github
- [Git Book - Git Free Basic Guide] (https://git-scm.com/book/en/v1)
- [Git for Windwos - Страница загрузки] (https://git-scm.com/download/win)

---

## Общие советы и хитрости
### SSH с Windows
- [Git for Windwos - Страница загрузки] (https://git-scm.com/download/win) устанавливает bash, с помощью которого вы можете использовать ssh с помощью openSSH.

---

## Разное
- мои настройки в settings.json для VSCode:

```
// Platzieren Sie Ihre Einstellungen in dieser Datei, um die Standardeinstellungen zu überschreiben.
{
    "window.zoomLevel": 0,
    "editor.minimap.enabled": true,                 // zeigt die kleine Codeübersichtskarte rechts neben dem Code an
    "editor.dragAndDrop": true,                     // ermöglicht markierte Codeteile per Drag und Drop zu verschieben0
    "workbench.editor.closeOnFileDelete": false,
    "files.autoSave": "afterDelay",                 // Auotmatisches Speichern der Dateien einstellen
    "files.autoSaveDelay": 1000,                    // Autosave nach 1000 ms
    "[javascript]": {},                             // Einstellungen für die SPrache "Javascript"
    "telemetry.enableCrashReporter": false,         //
    "workbench.colorTheme": "Quiet Light",          // Farbschema des Editors
    "telemetry.enableTelemetry": false,
    "workbench.iconTheme": "vs-seti",               // Icons für bekannte Dateieendungen. Wenn ja, welches Icon-Set soll verwendet werden
    "javascript.implicitProjectConfig.checkJs": true
}
```