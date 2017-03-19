### Установка node.js 4.x:

<pre>
sudo apt-get update 
sudo apt-get upgrade 
sudo apt-get install curl build-essential 
sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo bash - 
sudo apt-get install -y nodejs
</pre>

Если команда `node -v` выдаёт ошибку, то выполнить: 

`sudo ln -s /usr/bin/nodejs /usr/bin/node`

### Установка ioBroker:

<pre>
sudo mkdir /opt/iobroker 
sudo cd /opt/iobroker 
sudo chmod 777 /opt/iobroker 
sudo npm install iobroker --unsafe-perm
</pre>