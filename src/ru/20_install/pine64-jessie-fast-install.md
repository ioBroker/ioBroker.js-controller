## Описание

Данная инструкция описывает установку ioBroker на Pine64 с версией образа Jessie. Часто появляются специфические ошибки обоснованные разнообразностью платформы. Если что то не получается, задавайте вопросы на форуме. Там помогут. Примечание: при каждом обновлении ядра также node.js будет обновляться автоматически.

## Необходимое оборудование

*   Pine64
*   Блок питания (необходимо брать хороший блок питания - 2А. Со слабыми блоками питания происходят частые зависания.)
*   SD карта

## Важные ссылки

*   Загрузить образ: [http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip](http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip) [отсюда](http://wiki.pine64.org/index.php/Pine_A64_Software_Release#Debian_Linux_Jessie_with_Mate_GUI_Image_.5B20160701.5D_by_lenny.raposo_with_Longsleep_kernel)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)

## Описание установки

### Установка Debian

1.  Загрузить образ
2.  Записать образ на SD карту (Win32Diskimager)
3.  Запустить Pine64
4.  Зайти на Pine64 через putty и залогинится: логин - debian, пароль - debian
5.  Расширить диск командой` resize_rootfs.sh`

### Установка Node.js

1.  Обновить ядро: `sudo apt-get update && sudo apt-get upgrade`
2.  Установить Node.js
1.  `sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get autoremove && sudo apt-get autoclean`
2.  `sudo apt-get remove libpcap0.8 -y`
3.  `sudo apt-get install -y build-essential libpcap-dev git -y`
4.  `cd /tmp`
5.  `wget https://nodejs.org/dist/v4.6.1/node-v4.6.1-linux-arm64.tar.xz`
6.  `cd /usr/local`
7.  `sudo tar --strip-components=1 -xvf /tmp/node-v4.6.1-linux-arm64.tar.xz`
8.  `sudo npm install node-gyp -g`
3.  После установки запрос "`node -v"` должен показывать версию node.js. Если это не так, то нужно создать ссылку командой: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Установка ioBroker

1.  установаить ioBroker
1.  `sudo mkdir /opt/iobroker`
2.  `sudo chmod 777 /opt/iobroker`
3.  `cd /opt/iobroker`
4.  `sudo npm install iobroker --unsafe-perm`
2.  Вызвать ioBroker по IP в броузере: `http://pineIP:8081`

## Удалить графическую среду(опционально)

Для того, что бы освободить память на SD карте и в RAM, можно удалить графическую среду: `sudo apt-get remove --purge x11-common` `sudo apt-get autoremove`

## Задать постоянный IP адрес (опционально)

`sudo nano /etc/dhcpcd.conf` Для каждого сетевого интерфейса (Пример): _interface eth0_ _static ip_address=192.168.0.10/24_ _static routers=192.168.0.1_ _static domain_name_servers=192.168.0.1_