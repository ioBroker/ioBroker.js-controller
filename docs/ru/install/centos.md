---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/centos.md
title: Установить на CentOS
hash: se2U2FhT82/g/VF79qgLX17rU0BBl3AysNdvpbxmDGs=
---
# Установить на CentOS
## Автоматическая установка
Убедитесь, что `curl` установлен или установите его с помощью:

`sudo yum install -y curl`

А затем используйте скрипт установки:

`curl -sL https://iobroker.net/install.sh | bash -`

Если автоматическая установка не работает, вы все равно можете использовать ручную установку.

## Ручная установка
### Установить node.js
Если не установлено:

```
sudo yum install -y gcc-c++ make build-essential
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y nodejs
```

### Установить ioBroker
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

### Необязательно установить Redis
```
sudo yum install -y epel-release nano
sudo yum update
sudo yum install -y redis
sudo systemctl start redis
sudo systemctl enable redis
sudo nano /etc/redis.conf
```

#### Установить redis как состояния БД
```
./iobroker setup custom
```

Выходы:

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

#### Необязательно только для Redis + Multihost
Изменить привязку 127.0.0.1 на привязку 0.0.0.0

```
sudo systemctl restart redis
```

### Изменить пользователя на "iobroker"
```
cd /opt/iobroker/
sudo chmod 744 * -R
sudo chown iobroker:iobroker * -R
```

### Автоматический старт
```
sudo nano /lib/systemd/system/iobroker.service
```

Скопируйте это в файл:

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

### Запустить iobroker
```
sudo chown root:root /lib/systemd/system/iobroker.service
sudo chmod 755 /lib/systemd/system/iobroker.service
sudo systemctl daemon-reload
sudo systemctl enable iobroker
sudo systemctl start iobroker
```