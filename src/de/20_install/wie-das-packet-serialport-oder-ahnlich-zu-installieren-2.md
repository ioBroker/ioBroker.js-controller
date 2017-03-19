Oft kommt man bei der Installation von Adaptern, die mit dem seriellen Port arbeiten, zu Problemen. Das Problem kommt davon, dass das NPM Paket "serialport" auf der Maschine neu übersetzt werden muss. Dafür braucht man passende linux und Windows Pakete vorinsallieren. Linux:

<pre>sudo apt-get update
sudo apt-get install build-essential git
</pre>

Windows:

<pre>npm install --global --production windows-build-tools
</pre>

Auch vorsichtshalber konnte man noch node-gyp installieren. Normalerweise hat man schon die richtige Version, aber falls node.js Version upgedatet wurde, kann es sein, dass node-gyp nicht passt.

<pre>npm install node-gyp -g
</pre>

Danach muss man den Adapter neu installieren:

<pre>cd /opt/iobroker
npm install iobroker.ADAPTER
</pre>

Und wenn immer noch nicht geht, dann fehlen vielleicht die Rechte für verschiedene Verzeichnisse. An manchen Systemen muss man

<pre>chmod 700 /root
chmod 777 /root/.node-gyp
chmod 777 /root/.node-gyp/* -R
</pre>

schreiben. An manchen:

<pre>chmod 777 /opt/iobroker
chmod 777 /opt/iobroker/* -R
</pre>

Diese Anleitung passt für alle Adapter, die die NPM Pakete benutzen, die übersetzt werden müssen. Z.B.: homekit, dash button, ... Ab und zu für die Pakete müssen zusätzliche linux Pakete installiert werden, es steht aber in der Beschreibung auf dem github.