## Описание

Данная инструкция описывает установку ioBroker на Raspberry PI (1, 2 или 3) с версией образа Jessie. Часто появляются специфические ошибки обоснованные разнообразностью платформы. Если что то не получается, задавайте вопросы на форуме. Там помогут. Примечание: при каждом обновлении ядра также node.js будет обновляться автоматически.

## Необходимое оборудование

*   Raspberry PI
*   Блок питания (необходимо брать хороший блок питания - 2А. Со слабыми блоками питания происходят частые зависания.)
*   SD карта

## Важные ссылки

*   Загрузить образ: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)
*   Базовые настройки Raspberry PI: [http://geekelectronics.org/raspberry-pi/raspberry-pi-pervyj-zapusk.html](http://geekelectronics.org/raspberry-pi/raspberry-pi-pervyj-zapusk.html)

## Описание установки

### Установка Raspbian

1.  Загрузить образ (RASPBIAN JESSIE или RASPBIAN JESSIE LITE)
2.  Записать образ на SD карту (Win32Diskimager)
3.  Запустить Rasberry PI
4.  Зайти на Rapberry через putty и залогинится
5.  с помощью`sudo raspi-config` выполнить необходимую настройку Rapberry
6.  Включить root доступ 
	1. `sudo nano /etc/ssh/sshd_config`
	2.  Заменить: `PermitRootLogin without-password` на `PermitRootLogin yes` и сохранить
	3.  Перезапустить SSH: `sudo /etc/init.d/ssh restart`
4.  `sudo su` (теперь root режим активен)
5.  `ввести passwd` и поменять пароль на свой
7.  Выйти из putty и залогинится под пользователем root

### Установка Node.js

1.  Обновить ядро: `sudo apt-get update && sudo apt-get upgrade`
2.  Удалить старые версии node.js (не нужно, если образ Jessie Light)
	<pre>
	apt-get --purge remove node
	apt-get --purge remove nodejs
	apt-get autoremove
	reboot
	</pre>
3.  Зайти под root
4.  Установить Node.js заново для Raspbery 2/3
	<pre>
	curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
	sudo apt-get install -y build-essential python-rpi.gpio python nodejs
	reboot
	</pre>
5.  Установить Node.js заново для Raspbery 1
	<pre>
	wget http://node-arm.herokuapp.com/node_archive_armhf.deb
	sudo dpkg -i node_archive_armhf.deb
	sudo apt-get install build-essential python-rpi.gpio python
	reboot
	</pre>
6.  Зайти снова как root
7.  После установки запрос "`node -v"` должен показывать версию node.js. Если это не так, то нужно создать ссылку командой: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Установка ioBroker

1.  установаить ioBroker
	<pre>
	sudo mkdir /opt/iobroker
	sudo chmod 777 /opt/iobroker
	cd /opt/iobroker
	sudo npm install iobroker --unsafe-perm
	</pre>
2.  Вызвать ioBroker по IP в броузере: `http://raspiPI:8081`

## Задать постоянный IP адрес (опционально)

`sudo nano /etc/dhcpcd.conf` Для каждого сетевого интерфейса (Пример):

<pre>
interface eth0
static ip_address=192.168.0.10/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1
</pre>