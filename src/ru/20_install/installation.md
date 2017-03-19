## Установка на Windows

Для начала нужно установить node.js: [http://nodejs.org/download/](http://nodejs.org/download/). (нужно брать 4.x.x (LTS)) 
Очень просто можно установить с помощью инсталлятора: [http://download.iobroker.org/ioBrokerInstaller.latest.exe](http://download.iobroker.org/ioBrokerInstaller.latest.exe) 

При установке необходимо подключение к интернету, так как инсталлятор скачивает самые актуальные файлы из интернета. 
Если по каким либо причинам файл инсталлятора не работает (например, не хватает прав) то можно установить следующими командами. 
Правда в этом случае автозапуск при старте компьютера работать не будет: 
<pre>
c:\>mkdir iobroker 
c:\>cd iobroker 
c:\iobroker>npm install iobroker --unsafe-perm
</pre>

Папку для создания необходимо выбрать ту, на которую есть права. В данном примере папка находится в корневой директории диска С. 
Если же и эта команда провалилась (опять из-за прав доступа), то можно установить только контроллер: 
<pre>c:\>mkdir iobroker 
c:\>cd iobroker 
c:\iobroker>npm install iobroker.js-controller 
c:\iobroker>node iobroker setup first 
c:\iobroker>node iobroker start
</pre>

Некоторые драйвера требуют программы для компиляции. Для них нужно прописать: 
<pre>
c:\>cd iobroker 
c:\>npm install --global --production windows-build-tools
</pre> 

После этого можно открыть браузер (лучше не IE) и пойти по адресу `http://localhost:8081`. 
Должно появиться окно настроек. Список консольных команд ioBroker можно посмотреть [здесь - english](Console-commands)

## Установка на Linux/Debian (не Cubieboard2)

Cubieboard2 смотри [дальше](#cubieboard).

### Установка node.js

Для очень многих версий процессоров и linux версий существует уже пред-компилированные пакеты node.js: 

<pre>sudo apt-get update 
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 
sudo apt-get install -y build-essential python-rpi.gpio python nodejs
</pre> 

Если же это не ваш случай, то можно собрать node.js из исходников.

### node.js для x86/ARM (не кубик) - офицальная версия

<pre>
sudo apt-get install python g++ make checkinstall 
mkdir ~/node_js_src && cd $_ 
wget -N http://nodejs.org/dist/node-latest.tar.gz 
tar xzvf node-latest.tar.gz && cd node-v* 
./configure 
checkinstall 
sudo dpkg -i node_*
</pre>

### Установка ioBroker

Установим ioBroker: 
<pre>
$ cd /opt 
$ mkdir iobroker 
$ cd iobroker 
$ sudo npm install iobroker --unsafe-perm 
$ sudo unit 6
</pre> 

После перезагрузки в браузере наберем адрес: `http://localhost:8081` Вы должны будете увидеть окно приветствия.

## Установка на Cubieboard2

(Взято с форума [ioBroker](http://forum.iobroker.net/viewtopic.php?f=25&t=477#p3156))

### Установка Debian

- Скачиваем образ cubieboard2 debian: [http://dl.cubieboard.org/model/cubieboard2/Image/debian-server/](http://dl.cubieboard.org/model/cubieboard2/Image/debian-server/) 
- Скачиваем программу для записи образа под Windows: [http://dl.cubieboard.org/model/cubieboard2/Tools/](http://dl.cubieboard.org/model/cubieboard2/Tools/) 
- Записываем образ на карту microSD 
- Подключаем монитор/телевизор по hdmi и usb клавиатуру 
- После полной загрузки мы увидим поля для ввода логина и пароля 
- По умолчанию `Login: root Password: cubieboard`

### Сетевые настройки

Теперь нужно подключить наш miniPC к интеренту. Если вы подключили к роутеру у которого есть DHCP сервер,
то компьютер сам получит адрес и вам только остается зайти на роутер и посмотреть его IP. 
Если нет DHCP сервера, то в командной строке вводим: 

`$ sudo nano /etc/network/interfaces` 

Закоментируем строку (в начеле поставим символ #) `# iface eth0 inet dhcp` 
И допишем свои настройки сети: 

<pre>iface eth0 inet static 
address 192.168.0.200 
netmask 255.255.255.0 
gateway 192.168.0.1</pre>

Сохраните файл и закройте редактор (нажмите Ctrl+X, затем Y и Enter). 

Настроим DNS: 

`$ sudo nano /etc/resolv.conf` 

и впишите туда (тут нужно указать ваши DNS сервера от вашего провайдера интернета, 
можно оставить IP адреса по умолчанию которые указаны ниже, это dns google и yandex): 

<pre>nameserver 8.8.8.8 
nameserver 77.88.8.8</pre>

Сохраните файл и закройте редактор (нажмите Ctrl+X, затем Y и Enter). 

Для вступления изменений в силу нужно перезагрузиться: 

`$ sudo init 6`

### Настройки языка и звука Debian

Обновим систему: 
<pre>sudo apt-get update 
sudo apt-get upgrade</pre> 

Локаль: 

<pre>
$ sudo localedef -c -i ru_RU -f UTF-8 ru_RU.UTF-8
$ sudo update-locale LANG=ru_RU.UTF-8
$ sudo dpkg-reconfigure locales (добавить если нет галочки ru_RU.UTF-8)
$ sudo dpkg-reconfigure tzdata (выбрать свой часовой пояс)
</pre>

### Установка звука

Звук через наушники: 

<pre>
$ sudo nano /etc/asound.conf

pcm.!default {
	type hw
	card 0 //If you want to set HDMI as output ,turn 0 to 1.
	device 0
}
ctl.!default {
	type hw
	card 0 //If you want to set HDMI as output ,turn 0 to 1.
}
</pre>

Проверка звука: `$ aplay /usr/share/sounds/alsa/Front_Center.wav`

### Репозитории Debian

Чтобы можно было работать с другими репозиториями нужно установить пакеты: 
`$ sudo apt-get install python-software-properties -y && sudo dpkg-reconfigure python-software-properties`

### Установка node.js

Устанавливаем пакеты для установки node.js: 

<pre>curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 
sudo apt-get install -y build-essential python-rpi.gpio python nodejs</pre> 

Создадим ссылку на "node" с помощью команды `sudo ln -s /usr/bin/nodejs /usr/bin/node`, если ссылка ещё не 
существует. Протестируем наш node.js: 

`$ node > 1+1` 

Результат должен отобразиться на экране (для выхода нажать два раза crtl+c)

### Установка ioBroker

Установим ioBroker: 

<pre>
$ cd /opt 
$ mkdir iobroker 
$ cd iobroker 
$ sudo npm install iobroker --unsafe-perm 
$ sudo unit 6</pre> 

После перезагрузки в браузере наберем адрес: `http://localhost:8081` 

Вы должны будете увидеть окно приветствия.