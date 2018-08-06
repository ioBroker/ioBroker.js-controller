### node.js 4.x installation:

`sudo apt-get update sudo apt-get upgrade sudo apt-get install curl build-essential sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo bash - sudo apt-get install -y nodejs` If the command `node -v` get an error, additionally execute: `sudo ln -s /usr/bin/nodejs /usr/bin/node`

### ioBroker installation:

`sudo mkdir /opt/iobroker sudo cd /opt/iobroker` `sudo chmod 777 /opt/iobroker sudo npm install iobroker --unsafe-perm`