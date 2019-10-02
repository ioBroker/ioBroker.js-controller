---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/centos.md
title: 在CentOS上安装
hash: se2U2FhT82/g/VF79qgLX17rU0BBl3AysNdvpbxmDGs=
---
＃在CentOS上安装
##自动安装
确保已安装`curl`或使用以下方法安装它：

`sudo yum install -y curl`

然后使用安装脚本：

`curl -sL https://iobroker.net/install.sh | bash -`

如果自动安装不起作用，您仍然可以使用手动安装。

##手动安装
###安装node.js
如果未安装：

```
sudo yum install -y gcc-c++ make build-essential
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y nodejs
```

###安装ioBroker
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

###可选安装redis
```
sudo yum install -y epel-release nano
sudo yum update
sudo yum install -y redis
sudo systemctl start redis
sudo systemctl enable redis
sudo nano /etc/redis.conf
```

####将redis设置为状态数据库
```
./iobroker setup custom
```

输出：

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

####仅对Redis + Multihost可选
将绑定127.0.0.1更改为绑定0.0.0.0

```
sudo systemctl restart redis
```

###将用户更改为“ iobroker”
```
cd /opt/iobroker/
sudo chmod 744 * -R
sudo chown iobroker:iobroker * -R
```

＃＃＃ 自动开启
```
sudo nano /lib/systemd/system/iobroker.service
```

复制到文件中：

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

###启动iobroker
```
sudo chown root:root /lib/systemd/system/iobroker.service
sudo chmod 755 /lib/systemd/system/iobroker.service
sudo systemctl daemon-reload
sudo systemctl enable iobroker
sudo systemctl start iobroker
```