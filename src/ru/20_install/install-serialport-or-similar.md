Часто при установке драйверов, работающих с последовательным портом, возникают проблемы. Проблема происходит из за того, что NPM пакет serialport на вашей системе должен быть заново скомпилирован. Для этого необходимо установить нужные пакеты и инструменты. Linux:

<pre>sudo apt-get update
sudo apt-get install build-essential git
</pre>

Windows:

<pre>npm install --global --production windows-build-tools
</pre>

Также можно обновить пакет node-gyp, т.к. если версия node.js была обновлена, то может быть что установленная версия node-gyp не подходит.

<pre>npm install node-gyp -g
</pre>

После этого нужно установить драйвер заново:

<pre>cd /opt/iobroker
npm install iobroker.ДРАЙВЕР --production
</pre>

Если установка всё ещё не работает, то может быть не хватает прав на некоторые папки. На некоторых системах надо написать:

<pre>chmod 700 /root
chmod 777 /root/.node-gyp
chmod 777 /root/.node-gyp/* -R
</pre>

На некоторых:

<pre>chmod 777 /opt/iobroker
chmod 777 /opt/iobroker/* -R
</pre>

Эта инструкция подходит для всех драйверов, которые используют NPM пакеты, которые должны быть скомпилированы (binary). Например: homekit или dash button. Так же для некоторых NPM пакетов необходимы специальные linux пакеты, но эта информация обычно находится на github для соответствующего драйвера.