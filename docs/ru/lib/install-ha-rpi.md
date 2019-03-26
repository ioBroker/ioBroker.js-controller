---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/lib/install-ha-rpi.md
title: passwd hacluster
hash: MjjI23qSH6M8YRKL+JWxHZIbxco0oSiyyyai+mUP1wY=
---
#
##
### Источник
https://www.raspberrypi.org/downloads/raspbian/ https://downloads.raspberrypi.org/raspbian_lite_latest Raspbian Stretch Lite Минимальное изображение на основе Debian Stretch Версия: июнь 2018 г. Дата выпуска: 2018-06-27 Версия ядра: 4.14

2018-06-27-raspbian-стретч-lite.img

### Etcher
https://etcher.io/

Создайте файл `ssh` в разделе `boot`.

### Замазка
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

## Connect
Позвоните пользователю Putty: пи paswoort малина малина в замазке

sudo passwd root sudo nano / etc / ssh / sshd_config Поиск PermitRootLogin и измените его на yes, удалить # Вы можете отменить вход в систему как root с помощью этой команды sudo passwd -l root su

apt update apt update

Raspi-конфигурации

2 Параметры сети, имя хоста, страна wifi, установленная на DE. Введите SSID. Введите пароль.

4 I1 Изменить локаль en_GB.UTF-8 UTF-8 Пробел для выбора

7 Дополнительные параметры A1 Расширить файловую систему

перезагрузка Добро пожаловать на fdisk (util-linux 2.29.2).
Изменения останутся в памяти только до тех пор, пока вы не решите их записать.
Будьте осторожны перед использованием команды записи.

Команда (m для справки): Диск / dev / mmcblk0: 14,9 ГБ, 15931539456 байт, 31116288 секторов: секторы размером 1 * 512 = 512 байт. Размер сектора (логический / физический): 512 байт / 512 байт. Размер ввода / вывода (минимум). / оптимальный): 512 байт / 512 байт Тип метки диска: dos Идентификатор диска: 0x8e9e2675

Загрузка устройства Начало Конец Секторы Размер Id Тип / dev / mmcblk0p1 8192 96663 88472 43,2M c W95 FAT32 (LBA) / dev / mmcblk0p2 98304 31116287 31017984 14,8G 83 Linux

Команда (m для справки): Номер раздела (1,2, по умолчанию 2): Раздел 2 удален.

Команда (m для справки): тип раздела p основной (1 основной, 0 расширенный, 3 свободных) e расширенный (контейнер для логических разделов): номер раздела (2-4, по умолчанию 2): первый сектор (2048 -31116287, по умолчанию 2048): загрузка сектора, + секторов или + размер {K, M, G, T, P} (98304-31116287, по умолчанию 31116287): создан новый раздел 2 типа 'Linux' и размером 14,8 ГБ ,
Раздел № 2 содержит подпись ext4.

Команда (m для справки): Диск / dev / mmcblk0: 14,9 ГБ, 15931539456 байт, 31116288 секторов: секторы размером 1 * 512 = 512 байт. Размер сектора (логический / физический): 512 байт / 512 байт. Размер ввода / вывода (минимум). / оптимальный): 512 байт / 512 байт Тип метки диска: dos Идентификатор диска: 0x8e9e2675

Загрузка устройства Начало Конец Секторы Размер Id Тип / dev / mmcblk0p1 8192 96663 88472 43,2M c W95 FAT32 (LBA) / dev / mmcblk0p2 98304 31116287 31017984 14,8G 83 Linux

Команда (m для справки): Таблица разделов была изменена.
Вызов ioctl () для перечитывания таблицы разделов.
Перечитать таблицу разделов не удалось.: Устройство или ресурс занят

Ядро все еще использует старую таблицу. Новая таблица будет использоваться при следующей перезагрузке или после запуска репетиции части (8) или kpartx (8).

fdisk -l / dev / mmcblk0

nano /etc/dhcpcd.conf

интерфейс eth0 статический ip_address = 10.10.1.1 / 24

интерфейс wlan0 статический ip_address = 192.168.179.161 / 24 статические маршрутизаторы = 192.168.179.1 статический domain_name_servers = 192.168.179.10

интерфейс eth0 статический ip_address = 10.10.1.2 / 24

интерфейс wlan0 статический ip_address = 192.168.179.162 / 24 статические маршрутизаторы = 192.168.179.1 статический domain_name_servers = 192.168.179.10

nano / etc / hosts 192.168.179.161 iob1 192.168.179.162 iob2 10.10.1.1 iob1p 10.10.1.2 iob2p

apt установить policycoreutils-python-utils psmisc libssl-dev

https://www.server-world.info/en/note?os=Debian_9&p=ssh&f=4

https://www.debian.org/devel/passwordlessssh

#######################################
CentOS

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum установить NetworkManager-tui nmtui

localectl set-locale LANG = en_US.utf8 yum update -y / usr / bin / rootfs-expand

ssh -l root iob1

timedatectl set-timezone Европа / Берлин

setenforce 0 sed -i.bak "s / SELINUX = принудительное применение / SELINUX = разрешающее / g" / etc / selinux / config маска systemctl firewalld.service systemctl stop firewalld.service iptables --flush

# Passwd hacluster
Смена пароля для пользователя hacluster.
Новый пароль: Введите новый пароль еще раз: passwd: все токены аутентификации успешно обновлены.

[root @ iob1 ~] # шт. кластерная аутентификация iob1 iob2 Имя пользователя: hacluster Пароль: iob2: авторизован iob1: авторизован [root @ iob1 ~] # шт. настройка кластера-имя iobrokerc iob1 iob2 Уничтожение кластера на узлах: iob1, iob2 ...
iob2: остановка кластера (кардиостимулятор) ...
iob1: остановка кластера (кардиостимулятор) ...
iob2: успешно уничтожен кластер iob1: успешно уничтожен кластер

Передача authkey «pacemaker_remote» в «iob1», «iob2» iob1: успешное распространение файла «authkey« pacemaker_remote »iob2: успешное распространение файла« authkey «pacemaker_remote») Отправка файлов конфигурации кластера узлам
iob1: успешно iob2: успешно

Синхронизация сертификатов pcsd на узлах iob1, iob2 ...
iob2: успех iob1: успех Восстановление pcsd на узлах для перезагрузки сертификатов ...
iob2: успех iob1: успех

[root @ iob1 ~] # запуск кластера ПК - все iob1: запуск кластера ...
iob2: запуск кластера ...

[root @ iob1 ~] # corosync-cfgtool -s Печать статуса звонка.
Локальный идентификатор узла 1 RING ID 0 id = 192.168.179.54 status = ring 0 active без сбоев [root @ iob1 ~] # corosync-cmapctl | члены grep runtime.totem.pg.mrp.srp.members.1.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.1.ip (str) = r (0) ip (192.168.179.54) ) runtime.totem.pg.mrp.srp.members.1.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.1.status (str) = присоединился runtime.totem.pg.mrp.srp .members.2.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.2.ip (str) = r (0) ip (192.168.179.63) runtime.totem.pg.mrp.srp. members.2.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.2.status (str) = join [root @ iob1 ~] # шт. corosync статуса

Информация о членстве ---------------------- Nodeid Голоса Имя 1 1 iob1 (местный) 2 1 iob2

[root @ iob1 ~] # шт. состояние Имя кластера: iobrokerc ПРЕДУПРЕЖДЕНИЕ: нет устройств stonith и не поддерживается stonith-false. Стек: corosync Текущий DC: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) - раздел с кворумом Последнее обновление: пт 24 авг 12:18:14 2018 Последнее изменение: пт авг 24 12:15:30 2018 от hacluster через crmd на iob2

Настроено 2 узла 0 настроено ресурсов

Онлайн: [iob1 iob2]

Нет ресурсов

Статус демона: corosync: активен / отключен кардиостимулятор: активен / отключен ПКД: активен / включен

[root @ iob1 ~] # crm_verify -L -V ошибка: unpack_resources: запуск ресурсов отключен, поскольку не было определено ни одного ресурса STONITH: unpack_resources: либо сконфигурируйте некоторые, либо отключите STONITH с ошибкой опции с поддержкой stonith: unpack_resources: ПРИМЕЧАНИЕ: Кластерам с общими данными требуется STONITH для обеспечения целостности данных. Ошибки, обнаруженные во время проверки: конфигурация недействительна

[root @ iob1 ~] # шт. набор свойств stonith-enabled = false

[root @ iob1 ~] # crm_verify -L -V

ням установить который

[root @ iob1 ~] # шт. создание ресурса ClusterIP ocf: сердцебиение: IPaddr2 \> ip = 192.168.179.160 cidr_netmask = 32 интервала мониторинга op = 30 с

[root @ iob1 ~] # шт. состояние Имя кластера: iobrokerc Стек: corosync Текущий DC: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) - раздел с кворумом Последнее обновление: пт 24 авг 12:26:57 2018 Последнее изменение: пт 24 авг 12:23:51 2018 от root через cibadmin на iob1

Настроено 2 узла 1 настроен ресурс

Онлайн: [iob1 iob2]

Полный список ресурсов:

 ClusterIP (ocf :: heartbeat: IPaddr2): остановлен

Неудачные действия:

* ClusterIP_monitor_0 на iob2 «не установлен» (5): вызов = 5, статус = завершен, exitreason = «Проблема установки: не удалось найти команду: ip»,

    last-rc-change = 'Пт 24 августа 12:23:52 2018', в очереди = 0 мс, exec = 192 мс

* ClusterIP_monitor_0 на iob1 'не установлен' (5): вызов = 5, статус = завершен, exitreason = 'Проблема установки: не удалось найти команду: ip'

    last-rc-change = 'Пт 24 августа 12:23:52 2018', в очереди = 0 мс, exec = 194 мс

Статус демона: corosync: активен / отключен кардиостимулятор: активен / отключен ПКД: активен / включен

[root @ iob1 ~] # ПК по умолчанию для ресурса resource-stickiness = 100 Предупреждение: значения по умолчанию не применяются к ресурсам, которые переопределяют их со своими собственными заданными значениями [root @ iob1 ~] # pcs по умолчанию для ресурса resource-stickiness: 100

ням установить git python gcc-c ++ make

https://stackoverflow.com/questions/48320850/install-epel-repository-on-centos-7-breaks-yum-functionality cat> /etc/yum.repos.d/epel.repo << EOF [epel] name = Восстановление Epel для armhfp baseurl = https: //armv7.dev.centos.org/repodir/epel-pass-1/ enabled = 1 gpgcheck = 0

EOF

[root @ iob1 7] # yum install nodejs npm npm install -g npm @ 4

[root @ iob1 npm] # узел -v v6.14.3 [root @ iob1 npm] # npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root @ iob1 dev] # yum установить разделенные плагины Loaded: fasttestmirror Загрузка скорости зеркала из кэшированного Пакет hostfile parted-3.1-29.el7.armv7hl уже установлен в последней версии.
Ничего не делать [root @ iob1 dev] # parted -l | grep Ошибка [root @ iob1 dev] # parted / dev / sda mclabel gpt Предупреждение: существующая таблица разделов и все данные в / dev / sda будут удалены. Вы хотите продолжить? Да / Да / Нет / Нет? Да, информация: вам может потребоваться настроить / etc / fstab.

[root @ iob1 dev] # parted -a opt / dev / sda mkpart primary ext4 0% 100% Информация: вам может потребоваться настроить / etc / fstab.

[root @ iob1 dev] # lsblk ИМЯ МОЖЕТ: MIN RM РАЗМЕР RO ТИП MOUNTPOINT sda 8: 0 1 1,9G 0 диск └─sda1 8: 1 1 1,9G 0 часть mmcblk0 179: 0 0 14,8G 0 диск ├ ─mmcblk0p2 179: 2 0 488M 0 part [SWAP] ├─mmcblk0p3 179: 3 0 13,7G 0 part / └─mmcblk0p1 179: 1 0 668M 0 part / boot [root @ iob1 dev] # mkfs.ext4 -L iob1d / dev / sda1 mke2fs 1.42.9 (28 декабря 2013 г.) Метка файловой системы = iob1d Тип ОС: Размер блока Linux = 4096 (журнал = 2) Размер фрагмента = 4096 (журнал = 2) Страйд = 0 блоков, ширина полосы = 0 блоков 122400 inode, 488704 блока 24435 блоков (5,00%) зарезервированы для суперпользователя Первый блок данных = 0 Максимальное количество блоков файловой системы = 501219328 15 групп блоков 32768 блоков на группу, 32768 фрагментов на группу 8160 inode на группу Резервные копии суперблоков, хранящиеся в блоках: 32768, 98304, 163840, 229376, 294912

Запрошено место для групповых таблиц: выполнено создание таблиц узлов: выполнено создание журнала (8192 блока): выполнено запись суперблоков и учетная информация файловой системы: выполнено

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p / root / rpmbuild / {BUILD, BUILDROOT, RPMS, SOURCES, SPECS, SRPMS}

yum install -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar. GZ

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1 сделать км / мин

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

cd drbd-9.0.15-1

cd / root / rpmbuild / RPMS / armv7h1

rpm -Uvh drbd-xen *drbd-udev* drbd-pacemaker *drbd-bash-complete* drbd-utils - *об / мин drbd-km -*