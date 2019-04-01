---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adaptervis.md
title: Как отлаживать виджеты VIS
hash: KIzieMx/A0IHa34738atYrTR1bLyDI4IzfnpJXXujh8=
---
# Как отлаживать виджеты VIS
Для начала отладки ioBroker.vis необходимо сделать следующее:

- отключить кеш в ioBroker.js-контроллере

 откройте файл /opt/iobroker/iobroker-data/iobroker.json и измените атрибут **noFileCache** на _true_.

```
{
  "network": {
    "IPv4": true,
    "IPv6": true,
    "bindAddress": null,
    "useSystemNpm": true
  },
  "objects": {
    "type": "file",
    "typeComment": "Possible values: 'file' - [port 9001], redis - [port 6379], couch - [port 5984].",
    "host": "127.0.0.1",
    "port": 9001,
    "user": "",
    "pass": "",
    "noFileCache": true
  },
...
```

- отключить кеш в ioBroker.web

  Откройте конфигурацию экземпляра адаптера «web» и убедитесь, что «Cache» отключен. Это отключено по умолчанию.

- перезапустите ioBroker с помощью «перезапуска iobroker»

- заменить index.html и edit.html

замените файлы в _ / opt / iobroker / iobroker-data / files / vis / index.html_ и _edit.html_ на файлы из _ / opt / iobroker / node_modules / iobroker.vis / www / index.html.original_ и _edit.html .original_.
Измените файл /opt/iobroker/iobroker-data/files/vis/cache.manifest. Независимо от того, только один символ, чтобы вызвать браузер для загрузки файлов заново. Файлы должны быть меньше, чем 200 КБ. Если у вас есть неправильные файлы, значит, они больше, чем 400 КБ.

- Теперь, если вы измените файлы (например, /opt/iobroker/iobroker-data/files/vis/widgets/metro.html), вы увидите изменения после перезагрузки vis.

- Проблема в том, что все виджеты динамически связаны, и вы не можете перейти к файлу metro.html в источниках браузера и сделать точку останова.

  Но есть хитрость: если вы сделаете какой-нибудь вывод console.log (или [отладчик;](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/debugger)), вы сможете обнаружить этот вывод в консоли Browser JS и перейти к нему, нажав на него (работа в Chrome).