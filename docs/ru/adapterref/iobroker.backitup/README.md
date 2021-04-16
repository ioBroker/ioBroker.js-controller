---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-Dependency Status: https://img.shields.io/david/simatec/iobroker.backitup.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg
BADGE-Travis-CI: http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.backitup/README.md
title: ioBroker.backitup
hash: 6lTimXcn7K/rQM1vfH7j9aPrezOBL0E/ejH6adlrdT0=
---
![логотип](../../../de/adapterref/iobroker.backitup/img/backitup.png)

![Количество установок](http://iobroker.live/badges/backitup-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.backitup.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.backitup.svg)
![Статус зависимости](https://img.shields.io/david/simatec/iobroker.backitup.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg)
![Трэвис-Си](http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg)
![НПМ](https://nodei.co/npm/iobroker.backitup.png?downloads=true)

# IoBroker.backitup
# Содержание
* [Базовый] (# базовый)
* [Зависимости] (# зависимостей)
* [Типы резервных копий] (# типов резервных копий)
* [Резервное копирование ioBroker] (# Резервное копирование ioBroker)
* [CCU Backup (Homematic)] (# CCU-Backup- (Homematic))
* [Mysql-Backup] (# Mysql-Backup)
    * [Redis backup] (# Redis backup)
* [InfluxDB-Backup] (# InfluxDB-Backup)
    * [Резервная копия PostgreSQL] (# резервная копия PostgreSQL)
    * [Javascript-Backup] (# Javascript-Backup)
    * [Резервная копия Джарвиса] (# резервная копия Джарвиса)
    * [Zigbee backup] (# Zigbee backup)
    * [Grafana backup] (# Grafana backup)
* [Параметры хранения] (# Параметры хранения)
    * [CIFS] (# CIFS)
    * [NFS] (# NFS)
    * [FTP] (# FTP)
    * [Копия] (# Копия)
    * [Dropbox] (# Dropbox)
    * [Google Диск] (# Google-Диск)
    * [WebDAV] (# WebDAV)
* [Использование] (# использование)
* [Уведомления] (# уведомления)
* [Восстановить] (# Восстановить)
* [Устранение неполадок] (# устранение неполадок)
* [Возникающие ошибки / решения] (# Возникающие ошибки / решения)

---

# Основы
Резервное копирование - это решение для резервного копирования, с помощью которого возможно циклическое резервное копирование установки ioBroker и Homematic CCU.

Адаптер подходит для работы с несколькими платформами и может использоваться в установках Windows и Mac в дополнение к установкам Linux.

### [назад](#Inhalt)
---

# Зависимости
* Cifs-utils должен быть установлен для монтирования CIFS.
    - `sudo apt-get install cifs-utils`

* Для монтирования NFS необходимо установить NFS-common.
    - `sudo apt-get install nfs-common`

* Чтобы использовать резервную копию MySql, в системе должен быть установлен mysqldump.
    - `sudo apt-get install mysql-client` или в Debian` sudo apt-get install default-mysql-client`

* Чтобы использовать резервную копию PostgreSQL, в системе должен быть установлен mysqldump.
    - [Инструкции по установке PostgreSQL] (https://www.postgresql.org/download/linux/debian/)

* Чтобы использовать резервную копию InfluxDB, необходимо установить Influxd
    - [Инструкция по установке InfluxDB] (https://docs.influxdata.com/influxdb/v1.8/introduction/install/)

### [назад](#Inhalt)
---

# Типы резервных копий
Резервное копирование предлагает множество возможностей для выполнения различных типов резервного копирования циклически или одним нажатием кнопки. По умолчанию каждая резервная копия хранится в каталоге / opt / iobroker / backups /. При желании можно настроить загрузку по FTP или использовать монтирование CIFS / NFS.

## IoBroker Резервное копирование
Эта резервная копия соответствует резервной копии, содержащейся в ioBroker, которую можно запустить в консоли, вызвав `iobroker backup`. Только здесь это осуществляется через указанные настройки в конфигурации адаптера или в виджете OneClick Backup без использования консоли.

## Резервное копирование CCU (Homematic)
Эта резервная копия предлагает возможность сохранить 3 различных варианта установки Homematic (CCU-Original / pivCCU / Raspberrymatic). Это резервное копирование также можно выполнить с помощью настроек, указанных в конфигурации адаптера или в виджете OneClick Backup.

## Резервное копирование MySQL
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> Важно, что даже если сервер mysql работает в удаленной системе, mysqldump должен работать в системе ioBroker.<br> Для систем Linux команда установки будет следующей: `sudo apt-get install mysql-client` или в Debian `sudo apt-get install default-mysql-client`

## Redis резервное копирование
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br> Чтобы использовать Redis с Backitup, необходимо настроить права пользователя iobroker:<br>

```
sudo usermod -a -G redis iobroker
sudo reboot
```

## Резервное копирование исторических данных
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.

## Резервное копирование InfluxDB
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> **Чтобы иметь возможность выполнять резервное копирование InfluxDB, Influxd должен быть установлен в системе iobroker.** br> **Не имеет значения, управляется ли база данных локально или на другом сервере.** br><br> Если необходимо создать резервную копию InfluxDB с удаленного сервера, удаленные права для службы RPC должны быть настроены в Influxdb.conf на удаленном сервере.

```
bind-address = "<InfluxDB-IP>:8088"
```

или же

```
bind-address = "0.0.0.0:8088"
```

** После изменения конфигурации необходимо перезапустить службу InfluxDB. **

Дополнительную информацию о резервном копировании данных InfluxDB можно найти в [здесь](https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#online-backup-and-restore-for-influxdb-oss).

## Резервное копирование PostgreSQL
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> Здесь важно, что даже если сервер PostgreSQL работает в удаленной системе, PostgreSQL должен работать в системе ioBroker.<br> Для систем Linux есть инструкции по установке [здесь](https://www.postgresql.org/download/linux/debian/).

## Резервное копирование Javascript
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> Чтобы иметь возможность создать резервную копию Javascript, в конфигурации адаптера Javascript необходимо заранее указать пункты меню «Зеркальное отображение сценариев в пути к файлу» и «Экземпляр, выполняющий зеркальное отображение».<br> После этого резервное копирование может перенять настройки в меню конфигурации.

## Резервное копирование Джарвиса
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> ***Резервное копирование конфигурации Jarvis возможно из Jarvis версии 2.2.0-beta.7.***

## Резервное копирование Zigbee
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.

## Бэкап Grafana
Если эта функция активирована, эта отдельно настраиваемая резервная копия создается для каждой резервной копии ioBroker и также удаляется по истечении указанного срока хранения. FTP или CIFS также действительны для этого резервного копирования при условии, что установлены другие типы резервного копирования ioBroker.<br><br> **Для создания резервной копии Grafana требуются имя пользователя и пароль Grafana.** br><br> **Кроме того, ключ API должен быть сгенерирован в веб-интерфейсе Grafana, чтобы получить доступ к информационным панелям.** br> Ключ API можно создать в ***«Конфигурация → Ключи API»*** .

### [назад](#Inhalt)
---

# Варианты хранения
## CIFS
Монтирование CIFS не является проблемой под Linux.<br> Следует отметить, что cifs-utils установлен

Информация о пути должна выглядеть следующим образом (пример: «/ share name / path information»).<br> Вы можете дополнительно активировать / деактивировать, следует ли удалять резервные копии с NAS.

  ## NFS
Монтирование NFS не является проблемой под Linux.<br> Следует отметить, что установлен nfs-common<br><br> Спецификация пути должна выглядеть так (пример: «/ share имя / спецификация пути»).<br> Вы можете дополнительно активировать / деактивировать, следует ли удалять резервные копии с NAS.

## FTP
FTP возможен на всех ОС и служит альтернативой монтированию CIFS.<br> Спецификация пути в FTP всегда должна начинаться с «/» (пример: «/ спецификация пути»).<br> Вы можете дополнительно активировать / деактивировать, следует ли удалять резервные копии с NAS.

## Копировать
Если монтирование CIFS невозможно, есть еще одна возможность функции копирования<br> Здесь в настройках CIFS необходимо указать путь, куда нужно делать копию.<br> Для функции копирования спецификация IP-адреса должна оставаться пустой.

## Dropbox
Чтобы использовать резервную копию в Dropbox, необходимо создать токен доступа и приложение по адресу https://www.dropbox.com/developers/apps.<br><br>

* Шаг 1. Используйте кнопку «Создать резервную копию».
* Шаг 2. Выберите «Доступ с ограниченным доступом».
* Шаг 3: выберите «Папка приложения»
* Шаг 4. Введите «Назовите свое приложение» и нажмите кнопку «Создать приложение».
* Шаг 5. На вкладке «Разрешения» установите все 4 галочки в области «Файлы и папки».
* Шаг 6. На вкладке «Настройки» установите для параметра «Срок действия токена доступа» значение «Без срока действия».
* Шаг 7: Нажмите кнопку «Сгенерированный токен доступа» (этот сгенерированный токен вводится в настройках резервного копирования)<br><br>

В вашем Dropbox появилась новая папка под названием «Приложения».

## Гугл Диск
Чтобы использовать резервную копию на Google Диске, необходимо получить токен доступа. Вы можете сделать это на странице конфигурации.<br> ioBroker атакует только определенные области. Код для oAuth можно увидеть в [здесь](https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js).<br><br> В облаке не хранятся токены или пользовательские данные.

## WebDAV
С помощью WebDAV Backitup предлагает возможность адресовать несколько облачных систем.<br> Самый известный из них - это NextCloud. Чтобы установить соединение WebDAV, требуются имя пользователя и пароль облачной учетной записи.<br> Подключение к облаку осуществляется через зашифрованное соединение.<br><br> Чтобы установить соединение, имя хоста облака должно соответствовать всем сертификатам безопасности. Соединение с локальным IP-адресом невозможно, поскольку оно не содержит сертификатов Lets Encrypt.<br><br> &gt; Пример URL: &quot;https://example.com/remote.php/dav/files/username/&quot;

### [назад](#Inhalt)
---

# Использовать
1. Адаптер создает несколько точек данных для использования в Vis<br>
* oneClick.ccu -> служит триггером для резервного копирования CCU (для Vis можно установить значение true с помощью кнопки)
* oneClick.iobroker -&gt; служит триггером для стандартного резервного копирования (может быть установлено значение true в Vis с помощью кнопки)<br><br>
* history.html -> служит журналом истории, который можно адаптировать из дизайна в Vis через CCS.
    * history.json -> служит журналом истории, который можно адаптировать из дизайна в Vis через CCS.
* history.ccuLastTime -> сохраняет дату и время создания последней резервной копии CCU
* history.minimalLastTime -> сохраняет дату и время создания последней стандартной резервной копии
    * history.ccuSuccess -> показывает состояние "истина", если резервное копирование прошло успешно
    * history.minimalSuccess -> показывает состояние "истина", если резервное копирование прошло успешно
    * history.iobrokerLastTime -> показывает последнюю резервную копию ioBroker
    * history.ccuLastTime -> показывает последнюю резервную копию CCU
    * info.ccuNextTime -> показывает время следующего выполнения резервной копии CCU
    * info.iobrokerNextTime -> показывает время следующего выполнения бэкапа ioBroker
    * info.latestBackup -> показывает как json последнюю резервную копию, определенную при запуске

2. Показать журнал в Vis
   - Можно отобразить журнал истории, например, в виджете HTML, введя следующую строку в HTML:

```
{backitup.0.history.html}
```

Синтаксис: {BackitupInstanz.history.html}

3.CCS форматирование журнала истории:

```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-iobroker
       {
           float:left;
           color:white;
           font-size:20px;
       }
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```

4. Кнопка OneClick с текстом статуса.
   - Если для точки данных OneClick установлено значение true, соответствующее резервное копирование запускается, и по истечении заданного времени для этой точки данных снова устанавливается значение false, поэтому можно создать кнопку со статусом, настроить следующую строку и ввести ее в Vis как текст кнопки:

```
{wert: backitup.0.oneClick.iobroker; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

Синтаксис: {значение: <BackitupInstanz> .oneClick. <Триггер триггера>; значение === "истина" || стоит === правда? «Текст при создании резервной копии»: «Стандартный текст»}

### [назад](#Inhalt)
---

# Уведомления
Резервное копирование поддерживает следующие мессенджеры для уведомления после успешного резервного копирования.
Соответствующие адаптеры должны быть установлены и настроены для использования.

   * Telegram
   * Пушовер
   * Электронное письмо
   * WhatsApp

### [назад](#Inhalt)
---

# Восстановить
С помощью Backitup можно восстановить все типы резервных копий, созданные через меню конфигурации в ioBroker.<br><br> Восстановление можно выполнить со всех носителей.<br><br> **В основном, однако, самый безопасный способ - выполнить восстановление локально.** br><br> Если вы выбрали самый безопасный способ и хотите выполнить восстановление локально, вам необходимо сохранить файл резервной копии в папке резервных копий iobroker. В системах Linux эта папка находится по следующему пути: `/opt/iobroker/backups`

С типами резервного копирования «iobroker» и «redis» iobroker останавливается во время восстановления, а затем автоматически перезапускается.<br> После остановки iobroker открывается новая вкладка браузера, в которой можно увидеть ход восстановления.<br><br> ***Если эта вкладка не открывается, необходимо проверить настройки браузера для блокировки всплывающих окон.*** <br><br>

** iobroker не останавливается со всеми другими типами резервного копирования. Здесь только затронутые адаптеры останавливаются на короткое время. **<br><br>

Если вы предпочитаете восстанавливать резервные копии вручную, вам следует сделать следующее:

*** Восстановить резервную копию ioBroker: ***

    - Как обычно, резервная копия должна находиться в каталоге `opt / iobroker / backups`
    - Его можно восстановить через консоль с помощью команды: `iobroker restore <имя файла резервной копии>`.
    - После восстановления необходимо загрузить все в iobroker.

Подробные инструкции по восстановлению из резервной копии, а также по восстановлению вручную можно найти в [здесь](https://forum.iobroker.net/topic/27271/howto-iobroker-restore-unter-linux-durchf%C3%BChren).

** Резервную копию CCU по-прежнему необходимо восстанавливать через веб-интерфейс CCU. **

*** Восстановить резервную копию Raspberrymatic / CCU: ***

    - Скопируйте файл * .sbk через SCP в каталог "/ usr / local / tmp directory" на Raspberrymatic.
    - Войдите в Raspberrymatic как пользователь root через консоль.
    - Выполните команду: «/bin/restoreBackup.sh / user / local / tmp / EuerBackupDateiname» на Raspberrymatic.
    - Выполните команду: «перезагрузка» на Raspberrymatic, чтобы перезапустить PI.
    - В качестве альтернативы резервную копию, конечно, также можно восстановить обычным образом через веб-интерфейс.

### [назад](#Inhalt)
---

# Поиск проблемы
    Чтобы регистрировать ошибки, для резервного копирования должно быть установлено значение «отладка» на вкладке «Экземпляры ioBroker».

### [назад](#Inhalt)
---

# Обнаруженные ошибки / решения:
Вот список проблем, которые возникли до сих пор, и их решения, если таковые имеются.

1.Olifall (с форума) имел проблему, заключающуюся в том, что веб-интерфейс ioBroker больше не был доступен после восстановления, он смог исправить это, выполнив следующие шаги через консоль:
    - статус sudo iobroker
    - Сообщение = "Нет связи с состояниями 127.0.0.0:6379[redis]"
    - sudo apt-get install redis-server

2. Если монтирование CIFS с IP-адресом невозможно, следует использовать имя хоста NAS.
3. Если вы используете пароль со специальными символами для cifs-mount, пользователи обнаружили, что пароль должен быть сохранен в конфигурации в кавычках.
4. По мнению некоторых пользователей, cifs-mount не может обрабатывать очень длинные пароли. Если монтирование не работает, немного сократите пароль (у меня работают 12 символов).
5. Если адаптер не может быть установлен, проверьте свои версии node и nodejs. Адаптер не поддерживает версии <Node 8.
6. Если ваша система iobroker была установлена с новым сценарием установки, может случиться так, что у вас нет всех прав для нового пользователя iobroker.

    К сожалению, это также относится к резервному копированию, поскольку для резервного копирования используются некоторые системные команды.

Чтобы решить проблему с отсутствующими правами, теперь есть исправление для скрипта установщика iobroker.
Пожалуйста, выполните следующие команды в своей среде Iobroker в консоли:

```
iobroker stop
iobroker fix
sudo reboot
```

8. Если вы получаете сообщение об ошибке при создании базы данных Redis, проверьте, есть ли у вашего пользователя iobroker права и входит ли он в группу пользователей Redis.

    Если это не так, вы можете исправить это с помощью следующей команды в консоли.

```
sudo usermod -a -G redis iobroker
sudo reboot
```

    Если вы не настроили установку Iobroker с помощью сценария установщика и у вашего пользователя другое имя, замените «iobroker» на своего пользователя в команде.

### [назад](#Inhalt)
---

## Changelog

### 2.1.2 (13.04.2021)
* (simatec) Creation of temporary folders changed
* (simatec) Filter for redis rdb files changed
* (simatec) automatic deletion of old influx databases added
* (simatec) noserverino option for CIFS mount added
* (simatec) dependencies updated

### 2.1.1 (11.04.2021)
* (simatec) Bugfix redis
* (simatec) debug Log for Restore request added
* (simatec) Bugfix influxdb
* (simatec) ignore Filenames for javascript-Backup added

### 2.1.0 (24.03.2021)
* (simatec) Admin-Tab added
* (simatec) dependencies targz removed
* (simatec) dependencies tar-fs added
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 2.0.5 (14.03.2021)
* (simatec) error handling for redis backup added
* (simatec) error handling for history backup added
* (simatec) BugFix Grafana backup

### 2.0.4 (10.03.2021)
* (simatec) Bugfix history json
* (simatec) BugFix Redis backup
* (simatec) chmod for backup directory added
* (simatec) error handling for Grafana backup added

### 2.0.3 (04.03.2021)
* (simatec) Promise for redis aof added
* (simatec) BugFix Grafana restore
* (simatec) small BugFix umount

### 2.0.2 (03.03.2021)
* (simatec) BugFix redis backup
* (simatec) aof for redis added

### 2.0.1 (23.02.2021)
* (simatec) BugFix redis backup/restore
* (simatec) dependencies node-tar added
* (simatec) BugFix Notification
* (simatec) BugFix Grafana backup

### 2.0.0 (31.01.2021)
* (simatec) BugFix detect last backup
* (simatec) WebDAV added
* (simatec) BugFix Zigbee
* (simatec) stop/start Instances on restore
* (simatec) Download Icon for Cloud Restore added
* (simatec) javscript Backup added
* (simatec) Grafana Backup added
* (simatec) Restore added for some types without restart
* (simatec) timestamp for history-json added
* (simatec) Source code rewritten
* (simatec) Restore revised
* (simatec) fixed many small bugs
* (simatec) Added warning messages
* (simatec) Fixed cloud restore

### 1.8.5 (11.01.2021)
* (simatec) Bugfix Jarvis Backup
* (simatec) Bugfix GUI

### 1.8.4 (09.01.2021)
* (simatec) Bugfix influxDB Backup
* (simatec) Bugfix influxDB Restore
* (simatec) Jarvis Backup added
* (simatec) Jarvis Restore added
* (simatec) Bugfix mysql Backup
* (simatec) Bugfix pgsql Backup
* (simatec) small Bugfixes
* (simatec) Info-Message for storage added

### 1.8.3 (22.12.2020)
* (simatec) Bugfix iobroker start after restore on Windows
* (simatec) changed webui-port for restore
* (simatec) Bugfix influxDB Restore
* (simatec) dependencies updated

### 1.8.2 (09.12.2020)
* (simatec) code cleaned
* (simatec) code for history.html object revised
* (simatec) code for history.json object revised

### 1.8.1 (07.12.2020)
* (simatec) influxDB Backup added
* (simatec) influxDB Restore added
* (simatec) Postgresql Backup added
* (simatec) Postgresql Restore added
* (simatec) translation added
* (simatec) new zigbee Restore added
* (simatec) dependencies updated
* (simatec) many small bugfixes
* (simatec) new redis Restore added
* (simatec) enable/disable option for Sentry Plugin
* (simatec) smb 3.02 support added
* (simatec) smb 3.1.1 support added

### 1.7.0 (26.10.2020)
* (simatec) small Bugfix for umount on cifs/nfs mount
* (simatec) Dev-Dependencies updated
* (simatec) Dependencies updated

### 1.6.9 (30.09.2020)
* (simatec) Timeout fix for backup process

### 1.6.8 (24.09.2020)
* (simatec) Translations update for Weblate
* (simatec) dependencies updated
* (simatec) devdependencies updated
* (weblate) translation updated

### 1.6.7 (09.09.2020)
* (simatec) Bugfix error on GoogleDrive

### 1.6.6 (08.09.2020)
* (simatec) Bugfix clean local backups
* (simatec) Bugfix mount and umount for sentry.io

### 1.6.5 (07.09.2020)
* (simatec) Bugfix GoogleDrive Rate Limit errors 
* (simatec) small fixes on zigbee backup

### 1.6.4 (04.09.2020)
* (simatec) small fixes for sentry.io
* (simatec) small fixes on zigbee backup


### 1.6.3 (01.09.2020)
* (simatec) dependencies for googleapis updated
* (simatec) dependencies for dropbox-v2-api updated
* (simatec) devdependencies updated

### 1.6.2 (31.08.2020)
* (simatec) added whatsapp-cmb support for notifications

### 1.6.1 (24.08.2020)
* (Apollon77) several fixes and optimizations

### 1.6.0 (03.08.2020)
* (Jey-Cee/simatec) adapter configuration revised

### 1.5.9 (21.07.2020)
* (simatec) small fixes on mysql backup
* (simatec) next bugfixs errorhandling sentry.io
* (simatec) updated dependencies

### 1.5.8 (20.05.2020)
* (simatec) small fixes on zigbee backup
* (simatec) added log for zigbee Instances
* (simatec) next bugfix errorhandling sentry.io

### 1.5.7 (11.05.2020)
* (simatec) bugfix errorhandling sentry.io
* (simatec) updated dependencies
* (simatec) added node14 support

### 1.5.6 (02.05.2020)
* (simatec) Bugfix reading restore list

### 1.5.5 (01.05.2020)
* (simatec) bugfix errorhandling sentry.io

### 1.5.4 (29.04.2020)
* (simatec) added osDependencies for nfs and cifs
* (simatec) Bugfixes for errorhandling telegram, pushover, e-mail, ftp list and create backup folder


### 1.5.3 (28.04.2020)
* (simatec) many smal Bugfixes for errorhandling sentry.io

### 1.5.2 (24.04.2020)
* (simatec) errorhandling sentry.io
* (AlCalzone) docu updated

### 1.5.1 (23.04.2020)
* (simatec) Bugfix list from nas
* (simatec) Bugfix sentry errors

### 1.5.0 (21.04.2020)
* (simatec) revised error handling
* (simatec) revised mount process
* (simatec) revised umount process
* (simatec) added log for last backup file
* (simatec) updated dependencies
* (simatec) added sentry.io support

### 1.4.5 (23.03.2020)
* (simatec) Bugfix CIFS Domain

### 1.4.4 (23.03.2020)
* (simatec) Fix history error

### 1.4.3 (21.03.2020)
* (simatec) Fix for autochecker

### 1.4.2 (21.03.2020)
* (simatec) Fix start after restore
* (simatec) update dependencies

### 1.4.1 (02.03.2020)
* (simatec) json historystate with more options

### 1.4.0 (27.02.2020)
* (simatec) added next Backup Time
* (simatec) added Name Suffix for mysql Backup
* (simatec) added more Options for mysql
* (simatec) added domain support for cifs
* (simatec) added json historystate

### 1.3.6 (18.12.2019)
* (simatec) Fix historyList for compact-mode
* (simatec) Added ack for history states

### 1.3.5 (17.12.2019)
* (simatec) Fix compact-mode for history

### 1.3.4 (15.12.2019)
* (simatec) Fix hide passwords

### 1.3.3 (14.12.2019)
* (simatec) Fix Webinterface for Restore
* (simatec) Fix MySql Backup
* (simatec) Added some debug logs for Restore
* (simatec) some Bug Fix
* (simatec) Messagebox for restore list
* (simatec) hide password on log
* (simatec) Added password hiding
* (simatec) Clean Code
* (simatec) detected history path
* (simatec) Fix deteced

### 1.3.2 (04.12.2019)
* (simatec) Add Webinterface for Restore
* (simatec) Bug fix

### 1.3.1 (02.12.2019)
* (bluefox) Added information about latest backup
* (simatec) some Bug fix
* (simatec) add new translation
* (simatec) Fix translation
* (simatec) Default backup renamed to ioBroker backup
* (simatec) delete old objects

### 1.3.0 (22.11.2019)
* (simatec) support end for the total backup
* (simatec) Added backup of history data path
* (simatec) Added startup of all adapters after restore
* (simatec) Revision of the restoration for Redis
* (simatec) revision of log issues
* (simatec) Rebuild the start / stop processes under Unix
* (simatec) Rebuilding the start / stop processes under Windows
* (simatec) new translations
* (simatec) adjustments to the new Windows Installer
* (simatec) adjustments to the new Linux installer
* (simatec) fixed some small bugs

### 1.2.2 (20.10.2019)
* (simatec) Fix update process

### 1.2.1 (19.10.2019)
* (simatec) Fix CIFS password with special characters

### 1.2.0 (02.07.2019)
* (bluefox) Google Drive was added
* (simatec) Support for node 6 ended

### 1.1.4 (08.04.2019)
* (simatec) Support for SMB3
* (simatec) Backup for Zigbee Database
* (simatec) Restore for Zigbee Database

### 1.1.3 (12.03.2019)
* (simatec) Timeout for email sending
* (simatec) Timeout for pushover sending
* (simatec) Timeout for telegram sending
* (simatec) Code cleaned up

### 1.1.2 (21.02.2019)
* (simatec) exec Start for iobroker
* (simatec) Fix umount before Restore

### 1.1.1 (12.02.2019)
* (simatec) Fix iobroker-stop for total backup

### 1.1.0 (10.02.2019)
* (simatec) stable Release

### 1.0.9 (02.02.2019)
* (simatec) Add New umount query
* (simatec) Add Umount wait by device busy
* (simatec) Add Timeout for History settings
* (simatec) Add Notification only on error

### 1.0.8 (26.01.2019)
* (simatec) modification for new installer
* (simatec) WOL-waittime adjustable
* (simatec) Fix History settings

### 1.0.7 (17.01.2019)
* (simatec) better start/stop Handling for backup and restore

### 1.0.6 (16.01.2019)
* (simatec) Fix Start/Stop for new iobroker-installer

### 1.0.5 (14.01.2019)
* (simatec) Fix compact mode
* (simatec) Fix total backup
* (simatec) better history handling for html
* (simatec) better history handling
* (simatec) error Message for telegram
* (simatec) error Message for E-Mail
* (simatec) error Message for pushover

### 1.0.4 (08.01.2019)
* (simatec) support for compact mode

### 1.0.3 (06.01.2019)
* (simatec) Bugfix

### 1.0.2 (05.01.2019)
* (simatec) Fix start/stop for new iobroker-Installer

### 1.0.1 (30.12.2018)
* (simatec) Fix delete old Files
* (simatec) Add wake on LAN for CIFS and NFS

### 1.0.0 (24.12.2018)
* (simatec) Stable Release

### 0.4.4 (19.12.2018)
* (simatec) Fix cifs-mount User

### 0.4.3 (17.12.2018)
* (simatec) Add device ID for pushover

### 0.4.2 (10.12.2018)
* (simatec) Fix mount / umount
* (simatec) Fix Readme

### 0.4.1 (07.12.2018)
* (simatec) Added boolean for backup Success
* (simatec) Added Selection menu SMB type (CIFS)
* (simatec) Added Checkbox for mount as root (sudo)

### 0.4.0 (04.12.2018)
* (simatec) Added Pushover Notification

### 0.3.9 (03.12.2018)
* (simatec) Fix cifs/nfs mount and umount

### 0.3.8 (08.11.2018)
* (simatec) Fix notifications format
* (simatec) Fix Telegram User

### 0.3.7 (07.11.2018)
* (simatec) Added e-mail notification
* (simatec) Create backup directory on first boot
* (simatec) many small changes
* (peoples) Fix Telegram SilentNotice
* (peoples) Added Possibility to select a Telegram Receiver
* (peoples) Added Possibility to select a Telegram Notification length
* (peoples) Some Translations

### 0.3.6 (16.10.2018)
* (simatec) Fix Dropbox Backup
* (simatec) Fix Restore path for ownDir
* (simatec) Fix FTP and NAS path
* (simatec) Fix Access Token for dropbox

### 0.3.5 (03.10.2018)
* (simatec) Fix Translation
* (simatec) Fix Filename Suffix for Restore
* (peoples) Bugfix Title for Backup deletion

### 0.3.4 (01.10.2018)
* (simatec) Fix Restart after total-backup

### 0.3.3 (27.09.2018)
* (simatec) Fix Backup-Directoy for dropbox
* (simatec) Fix Restart after total-backup
* (simatec) Fix error Log on cifs

### 0.3.2 (25.09.2018)
* (simatec) Fix Filename for ccu backup

### 0.3.1 (25.09.2018)
* (simatec) Fix FTP Directory
* (simatec) delete old Files

### 0.3.0 (24.09.2018)
* (bluefox/simatec) Add Multiplatform (Windows/Linux/Mac)
* (bluefox/simatec) Backitup switched to Javascript
* (bluefox/simatec) shell support removed
* (bluefox/simatec) Deleting old backups up to the last X backups added
* (bluefox/simatec) restore feature added (beta)
* (bluefox/simatec) Restore added via NAS/FTP/Local/Dropbox (Beta)
* (simatec) NFS support added
* (bluefox) Dropbox Support added
* (bluefox) Fix History
* (peoples) Added silent mode for telegram
* (simatec) Redis/mysql added with standard backup
* (simatec) translations added
* (simatec) Docs adapted

### 0.2.7 (29.07.2018)
* (simatec) Fix Delete old Files

### 0.2.6 (27.07.2018)
* (bluefox) Configurable redis path was added
* (simatec) Translations Script
* (simatec) Fix FTP Upload

### 0.2.5 (26.07.2018)
* (simatec) Check for dependencies
* (simatec) Delete older files if number of files greater than X
* (simatec) Check for Backup Dir
* (simatec) Translations added

### 0.2.4 (23.07.2018)
 * (peoples) Some Bugfixes
 * (peoples) Added translations in words.js


### 0.2.3 (19.07.2018)
 * (bluefox) The backup buttons in configuration dialog were added
 * (bluefox) Show bash output text
 * (peoples) Bug Fix Mysql-Login Error

### 0.2.2 (17.07.2018)
 * (peoples/simatec/bluefox) Bug Fix Code

### 0.2.1 (15.07.2018)
 * (peoples/simatec) Bug Fix

### 0.2.0 (14.07.2018)
 * (blufox) Code formatting

### 0.1.8 (11.07.2018)
 * (darkiop) MySQL-Sicherung um Host- und Portabfrage erweitert
 * (peoples) Versendende Telegram-Instanz wählbar
 * (peoples) Telegram-Nachrichten angepasst an Verbindungstyp
 * (peoples) History-Log angepasst an Verbindungstyp
 * (simatec) Komprimierung der MySQL-Datenbank-Sicherung eingebaut
 * (simatec) Anpassung der Konfigoberfläche an Telegram-Instanz Auswahl

### 0.1.7 (05.07.2018)
 * (peoples) Datenpunkte in io-package definiert

### 0.1.6 (04.07.2018)
 * (simatec/peoples) Beta Version

### 0.1.5 (03.07.2018)
 * (peoples) Log Einträge neu formatiert

### 0.1.4 (02.07.2018)
 * (simatec/peoples) diverse Anpassungen

### 0.1.3 (01.07.2018)
 * (simatec/peoples) Sprachen hinzugefügt

### 0.1.2 (30.06.2018)
 * (simatec/peoples) Erste Beta-Version

### 0.1.0 (25.06.2018)
 * (simatec/peoples) Erste Git-Adapter-Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.