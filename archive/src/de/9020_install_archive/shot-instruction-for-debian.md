### node.js 4.x Installation:

`sudo apt-get update sudo apt-get upgrade sudo apt-get install curl build-essential sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo bash - apt-get install -y nodejs` Falls danach `node -v` nichts gibt, dann noch `sudo ln -s /usr/bin/nodejs /usr/bin/node`

### ioBroker installation:

`sudo mkdir /opt/iobroker sudo chmod 777 /opt/iobroker cd /opt/iobroker sudo npm install iobroker --unsafe-perm`