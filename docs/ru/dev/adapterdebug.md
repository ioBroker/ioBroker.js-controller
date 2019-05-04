---
title: отладка
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterdebug.md
hash: BOKT0EbFe/3HwmnwWGpZ+5EgAHDyRw7VtK6+4awC7D0=
---
# Отладка адаптеров
## Адаптеры отлаживаются с помощью Chrome
Node.JS поддерживает отладку с помощью Chrome.

Если вы остановите адаптер в ioBroker, а затем запустите его из консоли:

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --force --logs
```

Важным является `–inspect`

Тогда что-то вроде этого выводится:

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

После этого Chrome можно отлаживать, введя ссылку в Chrome:

! (Хром) [СМИ / adapterdebug1.png]

*Протестировано: Windows, Chrome 55, node.js 6.9.2*

### Удаленная отладка с помощью Chrome
Если iobroker не работает на той же машине, что и Chrome, то команда основана на примере выше:

```
node --inspect-brk=<ip-adresse iobroker>:9229 node_modules/iobroker.sayit/main.js --force --logs
```

параметр `--inspect-brk` обеспечивает в сравнении с вышеупомянутым,

что точка останова устанавливается прямо в начале отладчика в первой строке вашего адаптера.

Если вы не всегда хотите скопировать ссылку на начало отладки, вы также можете вызвать следующую страницу в Chrome:

```
chrome://inspect
```

затем один раз через настройку ip и порта ваших remotrechners так же, как введите команду inspect.

Там сеанс отладки будет отображаться после запуска команды и может быть запущен одним щелчком мыши.

Варианты отладки Chrome просто фантастические.
У вас есть все возможности, которые вы также знаете из **веб-отладки** (точки останова, также с условиями, наблюдением, вызовом стека, проверкой области действия, проблемой консоли и т. Д.).

Изображения и английское описание [здесь](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)

Если компьютер iobroker еще не установлен, по-прежнему требуется инспектор узлов:

```
npm install -g node-inspector
```

## Отладка с помощью WebStorm
## Отладка с помощью кода Visual Sturio