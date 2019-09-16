# Install on CentOS

## Install node.js
If not installed:

```
sudo yum install -y gcc-c++ make build-essential
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install nodejs
```

## Install ioBroker

```
sudo groupadd iobroker
sudo adduser -g iobroker iobroker
sudo usermod -G iobroker iobroker
sudo usermod -a -G redis iobroker
sudo usermod iobroker --shell /sbin/nologin
sudo mkdir /opt/iobroker  
sudo chmod 777 /opt/iobroker
cd /opt/iobroker
npm i iobroker.admin --production
npm i iobroker.js-controller@stable --production
```

## Optional install redis
```
sudo yum install epel-release nano
sudo yum update
sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
sudo nano /etc/redis.conf
```

### Set redis as states DB

```
./iobroker setup custom
```

Outputs:

```
# Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: <ENTER>
# Host / Unix Socket of objects DB(file), default[127.0.0.1]: <ENTER>
# Port of objects DB(file), default[9001]: <ENTER>
# Type of states DB [(f)file, (r)edis], default [file]: r   <============= This is important
# Host / Unix Socket of states DB (redis), default[127.0.0.1]: <ENTER>
# Port of states DB (redis), default[6379]: <ENTER>
# Data directory (file), default[../../../iobroker-data/]: <ENTER>
# Host name of this machine [ip-172-31-5-42.eu-west-1.compute.internal]: <ENTER>
# creating conf/iobroker.json
```

### Optional only for Redis+Multihost
Change bind 127.0.0.1 to bind 0.0.0.0

```
sudo systemctl restart redis
```

## Change user to "iobroker"

```
cd /opt/iobroker/
sudo chmod 744 * -R
sudo chown iobroker:iobroker * -R
```

## Autostart

```
sudo nano /lib/systemd/system/iobroker.service
```

Copy this into file:

```
[Unit]
Description=ioBroker Server
Documentation=https://iobroker.net
After=network.target redis.service
Wants=redis.service

[Service]
Type=simple
User=iobroker
ExecStart=/bin/sh -c '/usr/bin/node /opt/iobroker/node_modules/iobroker.js-controller/controller.js'
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Start iobroker

```
sudo chown root:root /lib/systemd/system/iobroker.service
sudo chmod 755 /lib/systemd/system/iobroker.service
sudo systemctl daemon-reload
sudo systemctl enable iobroker
sudo systemctl start iobroker
```
