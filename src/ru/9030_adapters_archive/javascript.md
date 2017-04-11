
## Описание

Драйвер JavaScript является главным местом для автоматизации. Он позволяет совершать различные действия при реакции на события.

## Информация


## Установка

Установка осуществляется на вкладке **Драйвера** странички [администрирования](http://www.iobroker.net/?page_id=3800&lang=ru) системы. В группе драйверов **Скрипты и логика** находим строчку с названием **Javascript/Coffescript Script Engine** и нажимаем кнопку со значком плюса в этой строке справа. На экране появится всплывающее окно установки драйвера, в конце установки оно автоматически закроется. Если все прошло удачно, на вкладке **Настройка драйверов** появится строка **javascript.0** с установленным экземпляром драйвера.

## ![Изображение](http://forum.iobroker.net/download/file.php?mode=view&id=7026&sid=97469b4e6e04d7bc5209850123b55ddc)

## Создание скриптов

Переходим на вкладку **Скрипты:** ![Изображение](http://forum.iobroker.net/download/file.php?mode=view&id=7027&sid=97469b4e6e04d7bc5209850123b55ddc) Нажимаем на значок добавления нового скрипта: ![Изображение](http://forum.iobroker.net/download/file.php?mode=view&id=7028&sid=97469b4e6e04d7bc5209850123b55ddc) Даём название скрипту и пишем код скрипта нажимаем "Сохранить" и запустить. ![javascript5](http://www.iobroker.net/wp-content/uploads//javascript5.png)

## [](https://github.com/ioBroker/ioBroker.javascript#global-functions)Глобальные функции

Вы можете определить глобальные сценарии в "глобальной"(global)  папке. Все глобальные сценарии являются доступными во всех скриптах. Если глобальный сценарий отключен, он не будет использоваться. Глобальный сценарий будет просто вставлен в обычный сценарий и скомпилирован, поэтому вы не сможете обмениваться данными между сценариями c помощью глобального сценария. Используйте для этого состояния (статусы).

#### Рекомендации:

Создайте два экземпляра адаптера javascript: один "тестовый" и один "рабочий". После тестирования сценария в экземпляре "тестовый", он может быть перемещен в "рабочий". Таким образом вы можете перезапустить "тестовый" экземпляр так, как вы хотите.

## В сценарии могут быть использованы следующие функции

### require - загрузить какой-либо модуль

    var mod = require('module_name');

Предварительно загружены следующие модули: fs, crypto, wake_on_lan, request, suncalc, util, path, os, net, events, dns. Для использования других модулей, перейдите в настройки драйвера javascript в админ и введите в поле "Дополнительные NPM Модули" названия пакетов через запятую. После успешного окончания установки, он может быть использован в обработчике сценариев.

### [](https://github.com/ioBroker/ioBroker.javascript#buffer)Буфер

Буфер - Buffer в Node.js, читайте здесь [http://nodejs.org/api/buffer.html](http://nodejs.org/api/buffer.html)

### log - Выводит сообщение в журнал

    log(msg, sev)

Сообщение является строкой, а параметр критичности одним из: 'debug', 'info', 'warn', 'error'. По умолчанию критичность - **_'info'_**

### exec - выполнить некоторые команды ОС как например "cp file1 file2"

    exec (cmd, callback)

Выполняет вызов системной команды и возвращает результат.

    // перезапустить систему linux :)
    exec('reboot');

    // Получить список файлов и директорий в /var/log
    exec('ls /var/log', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
    });

### on - Подписаться на изменения или обновления какого-либо состояния

    on(pattern, callbackOrId, value)

Функция обратного вызова вернет объект как параметр со следующим содержанием:

        {
            '_id' : 'javascript.0.myplayer',
            'type' : 'state',
            'common' : {
                'def' :    '0',
                'min'  :   '0',
                'max'  :   '6',
                'type' :   'number',
                'read' :   'true',
                'write' :  'true',
                'states' : '0:stop;1:play;2:pause;3:next;4:previous;5:mute;6:unmute',
                'role' :   'media.state',
                'desc' :   'Player handling',
                'name' :   'MyPlayer'
            },
            'native' : {},
            'channelId' :   'channelID',
            'channelName' : 'channelName',
            'deviceId' :    'deviceID',
            'deviceName' :  'deviceName',
            'enumIds' : [],
            'enumNames' : [],
            'state' : {
                'val' :  'new state',
                'ts' :   1416149118,
                'ack' :  true,
                'lc' :   1416149118,
                'from' : 'system.adapter.sonos.0'
            },
            'oldState' : {
                'val' :  'old state',
                'ts' :   1416148233,
                'ack' :  true,
                'lc' :   1416145154,
                'from' : 'system.adapter.sonos.0'
            }
        }

**Примечание:** ранее вместо _state_ был _newState_. Данная функция еще работает. Пример:

    var timer;

    // Создать состояние "javascript.0.counter"
    createState('counter', 0);

    // При изменении
    on('adapter.0.device.channel.sensor', function (obj) {
        // Но не позднее, чем через 30 секунд
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
            }, 30000);

            // Установить заданное значение
            setState('counter', 1 + getState('counter'), true/*ack*/);

            // Или установить незаданную команду
            setState('adapter.0.device.channel.actor', true);
        }
    });

Вы можете использовать следующие параметры для указания триггера:

<table style="width: 825px;">

<thead>

<tr style="height: 24px;">

<th style="height: 24px; width: 96px;">параметр</th>

<th style="height: 24px; width: 150px;">тип/значение</th>

<th style="height: 24px; width: 557px;">описание</th>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">logic</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">логика "and" или "or" для комбинирования условий (по умолчанию: "and")</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">id</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">имя равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">имя соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">name</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">имя равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">имя соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">change</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">"eq", "ne", "gt", "ge", "lt", "le", "any"</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;"></td>

<td style="height: 48px; width: 150px;">"eq"</td>

<td style="height: 48px; width: 557px;">(равнозначно) Новое значение должно быть равнозначно старому (state.val == oldState.val)</td>

</tr>

<tr style="height: 72px;">

<td style="height: 72px; width: 96px;"></td>

<td style="height: 72px; width: 150px;">"ne"</td>

<td style="height: 72px; width: 557px;">(неравнозначно) Новое значение должно быть неравнозначно старому (state.val != oldState.val) **Если шаблоном является строка id, тогда это значение используется по умолчанию**</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;"></td>

<td style="height: 48px; width: 150px;">"gt"</td>

<td style="height: 48px; width: 557px;">(больше) Новое значение должно быть больше, чем старое (state.val > oldState.val)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;"></td>

<td style="height: 48px; width: 150px;">"ge"</td>

<td style="height: 48px; width: 557px;">(больше или равнозначно) Новое значение должно быть больше или равнозначно старому (state.val >= oldState.val)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;"></td>

<td style="height: 48px; width: 150px;">"lt"</td>

<td style="height: 48px; width: 557px;">(меньше) Новое значение должно быть меньше старого (state.val < oldState.val)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;"></td>

<td style="height: 48px; width: 150px;">"le"</td>

<td style="height: 48px; width: 557px;">(меньше или равнозначно) Новое значение должно быть меньше или равнозначно старому (state.val <= oldState.val)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">"any"</td>

<td style="height: 24px; width: 557px;">Триггер будет поднят в случае появления любого нового значения</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">val</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">valNe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение не должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">valGt</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение должно быть больше указанного</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">valGe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение должно быть больше или равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">valLt</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение должно быть меньше указанного</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">valLe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Новое значение должно быть меньше или равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">ack</td>

<td style="height: 24px; width: 150px;">boolean(логический)</td>

<td style="height: 24px; width: 557px;">Подтвержденное состояние нового значения равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldVal</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldValNe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение не должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldValGt</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение должно быть больше указанного</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldValGe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение должно быть больше или равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldValLt</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение должно быть меньше указанного</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldValLe</td>

<td style="height: 24px; width: 150px;">mixed(оба типа)</td>

<td style="height: 24px; width: 557px;">Предыдущее значение должно быть меньше или равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldAck</td>

<td style="height: 24px; width: 150px;">bool(логический)</td>

<td style="height: 24px; width: 557px;">Подтвержденное состояние предыдущего значения равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">ts</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новая метка времени значения должна быть равнозначна указанной (state.ts == ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">tsGt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новая метка времени значения не должна быть равнозначна указанной (state.ts != ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">tsGe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новая метка времени значения должна быть больше указанного значения (state.ts > ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">tsLt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новая метка времени значения должна быть больше или равнозначна указанной (state.ts >= ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">tsLe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новая метка времени значения должна быть меньше указанной (state.ts < ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldTs</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени должна быть равнозначна указанной (oldState.ts == ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldTsGt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени не должна быть равнозначна указанной (oldState.ts != ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldTsGe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени должна быть больше указанной (oldState.ts > ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldTsLt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени должна быть больше или равнозначна указанной (oldState.ts >= ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldTsLe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени должна быть меньше указанной (oldState.ts < ts)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">lc</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Метка времени последнего изменения должна быть равнозначна указанной (state.lc == lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">lcGt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Метка времени последнего изменения не должна быть равнозначна указанной (state.lc != lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">lcGe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Метка времени последнего изменения должна быть больше указанного значения (state.lc > lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">lcLt</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Метка времени последнего изменения должна быть больше или равнозначна указанной (state.lc >= lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">lcLe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Метка времени последнего изменения должна быть меньше указанной (state.lc < lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldLc</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Предыдущая метка времени последнего изменения должна быть равнозначна указанной (oldState.lc == lc)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;">oldLcGt</td>

<td style="height: 48px; width: 150px;">string (строка)</td>

<td style="height: 48px; width: 557px;">Предыдущая метка времени последнего изменения не должна быть равнозначна указанной (oldState.lc != lc)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;">oldLcGe</td>

<td style="height: 48px; width: 150px;">string (строка)</td>

<td style="height: 48px; width: 557px;">Предыдущая метка времени последнего изменения должна быть больше указанного значения (oldState.lc > lc)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;">oldLcLt</td>

<td style="height: 48px; width: 150px;">string (строка)</td>

<td style="height: 48px; width: 557px;">Предыдущая метка времени последнего изменения должна быть больше или равнозначна указанной (oldState.lc >= lc)</td>

</tr>

<tr style="height: 48px;">

<td style="height: 48px; width: 96px;">oldLcLe</td>

<td style="height: 48px; width: 150px;">string (строка)</td>

<td style="height: 48px; width: 557px;">Предыдущая метка времени последнего изменения должна быть меньше указанной (oldState.lc < lc)</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">channelId</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Код канала должен быть равнозначен указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Код канала соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">channelName</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Имя канала должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Имя канала соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">deviceId</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Код устройства должен быть равнозначен указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Код устройства соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">deviceName</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Имя устройства должно быть равнозначно указанному</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Имя устройства соответствует регулярному выражению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">enumId</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Состояние принадлежит указанному перечислению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Код одного перечисления состояния удовлетворяет указанное регулярное выражение</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;"></td>

<td style="height: 24px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">enumName</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Состояние принадлежит указанному перечислению</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;"></td>

<td style="height: 24px; width: 150px;">RegExp</td>

<td style="height: 24px; width: 557px;">Имя одного перечисления состояния удовлетворяет указанное регулярное выражение</td>

</tr>

<tr style="height: 35.0498px;">

<td style="height: 35.0498px; width: 96px;"></td>

<td style="height: 35.0498px; width: 150px;"></td>

<td style="height: 35.0498px; width: 557px;"></td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">from</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новое значение из определенного адаптера</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">fromNe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Новое значение не из определенного адаптера</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldFrom</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Старое значение из определенного адаптера</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 96px;">oldFromNe</td>

<td style="height: 24px; width: 150px;">string (строка)</td>

<td style="height: 24px; width: 557px;">Старое значение не из определенного адаптера</td>

</tr>

</tbody>

</table>

Примеры: Триггеры по всем состояниям с именем '*.STATE' если они подтверждены(ack=true) и имеют новое значение "true".

    {
        id: /.STATE$/,
        val: true,
        ack: true,
        logic: "and"
    }

**Примечание:** вы можете непосредственно использовать RegExp:

    on(/^system.adapter..*.d+.memRss$/, function (obj) {
    });

    // также как и
    on({id: /^system.adapter..*.d+.memRss$/, change: "ne"}, function (obj) {
    });

Для того, чтобы просто соединить два состояния друг с другом, напишите:

    on('stateId1', 'stateId2');

Все изменения _stateId1_ будут прописаны в _stateId2_. Пожалуйста, обратите внимание, что по умолчанию, "change" равняется "any" за исключением случаев, когда код задан как строка (наподобие `on("id", function (){});`). В последнем случае "change" будет равняться "ne". Функция "on" возвращает указатель на обработчик. Этот указатель может быть использован при отмене подписки.

### subscribe (подписаться) - то же, что и **[on](https://github.com/ioBroker/ioBroker.javascript#on---subscribe-on-changes-or-updates-of-some-state)**

### [](https://github.com/ioBroker/ioBroker.javascript#unsubscribe)unsubscribe (отменить подписку)

    unsubscribe(id or handler)

Удалить все подписки для указанного ID объекта или для указанного указателя.

    // Через обработчик
    var mySubscription = on({id: "javascript.0.myState", change: 'any'}, function (data) {
        // отказаться от подписки после первого запуска
        if (unsubscribe(mySubscription)) {
            log('Subscription deleted');
        }
    });

    // через объект ID
    on({id: "javascript.0.myState1", change: 'ne'}, function (data) {
        log('Some event');
    });

    on({id: "javascript.0.myState1", change: 'any'}, function (data) {
        // отказаться от подписки
        if (unsubscribe("javascript.0.myState1")) {
            log('All subscriptions deleted');
        }
    });

### [](https://github.com/ioBroker/ioBroker.javascript#getsubscriptions)getSubscriptions

Получить список подписок Пример результата:

    {
        "megad.0.dataPointName" : [
            {
                "name" : "script.js.NameOfScript",
                "pattern" : {
                    "id" : "megad.0.dataPointName",
                    "change" : "ne"
                }
            }
        ]
    }

### schedule (расписание)

    schedule (pattern, callback)

Планировщик времени с астро-функцией.

#### [](https://github.com/ioBroker/ioBroker.javascript#time-schedule)Time schedule (Расписание)

Шаблон может быть строкой с [Cron-Syntax](http://en.wikipedia.org/wiki/Cron), например:

     # *  *  * *  *  выполнить команду
     # │ │ │ │ │
     # │ │ │ │ │
     # │ │ │ │ └───── день недели (0 - 6) (от 0 до 6 это с воскресенья по субботу. Можно использовать английские имена; 7 это воскресенье, то же что и 0)
     # │ │ │ └────────── месяц (1 - 12)
     # │ │ └─────────────── день месяца (1 - 31)
     # │ └──────────────────── часы (0 - 23)
     # └───────────────────────── минуты (0 - 59)

    schedule("*/2 * * * *", function () {
        log("Будет исполняться каждые 2 минуты!");
    });

Шаблон может быть объектом, он используется преимущественно в тех случаях, когда требуется указать секунды:

    schedule({second: [20, 25]}, function () {
        log("Будет запускаться в xx:xx:20 и xx:xx:25 каждой минуты!");
    });

    schedule({hour: 12, minute: 30}, function () {
        log("Будет запускаться в 12:30!");
    });

Шаблон может быть объектом данных Javascript (какой-то определенный момент времени) - только в этом случае он может быть активирован/инициирован только один раз. **Примечание:** функция расписания поддерживает также и секунды, таким образом вы можете указать:

    schedule("*/2 * * * * *", function () {
        log("Будет запускаться каждые 2 секунды!");
    });

для активации его каждые две секунды.

#### [](https://github.com/ioBroker/ioBroker.javascript#astro--function)Astro- function (Астро-функция)

Астро-функция может быть использована посредством использования аттрибута "astro":

    schedule({astro: "sunrise"}, function () {
        log("Рассвет!");
    });

    schedule({astro: "sunset", shift: 10}, function () {
        log("10 минут после заката!");
    });

Атрибут "shift" является смещением в минутах. Он также может быть отрицательным, для определения момента времени перед астро событием. Следующие значения могут использоваться в качестве атрибута в астро-функции:

*   **sunrise**: рассвет (верхняя граница солнца появляется на горизонте)
*   **sunriseEnd**: рассвет заканчивается (нижняя часть солнца касается горизонта)
*   **goldenHourEnd**: золотой час утра (мягкий свет, лучшее время для фотографии) заканчивается
*   **solarNoon**: солнечный полдень (солнце находится в своей самой высокой позиции)
*   **goldenHour**: начинается золотой час вечера
*   **sunsetStart**: начинается закат (нижняя граница солнца касается горизонта)
*   **sunset**: закат (солнце скрывается за горизонтом, начинаются вечерние гражданские сумерки)
*   **dusk**: сумрак (начинаются вечерние навигационные сумерки)
*   **nauticalDusk**: навигационный сумрак (начинаются вечерние астрономические сумерки)
*   **night**: начинается ночь (достаточно темно для астрономических наблюдений)
*   **nightEnd**: ночь заканчивается (начинаются утренние астрономические сумерки)
*   **nauticalDawn**: навигационная заря (начинаются утренние навигационные сумерки)
*   **dawn**: заря (заканчиваются утренние навигационные сумерки, начинаются утренние гражданские сумерки)
*   **nadir**: надир (самый темный момент ночи, когда солнце расположено в своей самой низкой позиции)

**Примечание:** для использования функции "astro", в настройках адаптера javascript должны быть определены "latitude"(широта) и "longitude" (долгота). **Примечание:** вы можете использовать функцию "on" для расписания с небольшой модификацией:

    on({time: "*/2 * * * *"}, function () {
        log((new Date()).toString() + " - Будет запущен каждые две минуты!");
    });

    on({time: {hour: 12, minute: 30}}, function () {
        log((new Date()).toString() + " - Будет запущен в 12:30!");
    });

    on({astro: "sunset", shift: 10}, function () {
        log((new Date()).toString() + " - 10 минут после заката!");
    });

### [](https://github.com/ioBroker/ioBroker.javascript#clearschedule)clearSchedule

Если **не** используется функция "astro", вы можете позже отменить расписание. Чтобы это сделать, необходимо сохранить как-нибудь возвращаемый объект:

    var sch = schedule("*/2 * * * *", function () {...});

    clearSchedule(sch);

### [](https://github.com/ioBroker/ioBroker.javascript#getastrodate)getAstroDate

    getAstroDate (pattern, date)

Возвращает объект данных javascript к указанному шаблону. Для просмотра допустимых значений шаблонов, пройдите в раздел [Astro](https://github.com/ioBroker/ioBroker.javascript#astro--function) в функции _расписание_. Возвращенный объект данных вычисляется для заданной _даты_. Если не предоставлено никакой даты, тогда используется текущий день.

    var sunriseEnd = getAstroDate("sunriseEnd");
    log("Sunrise ends today at " + sunriseEnd.toLocaleTimeString());

    var today = new Date();
    var tomorrow = today.setDate(today.getDate() + 1);
    var tomorrowNigh = getAstroDate("night", tomorrow);

### [](https://github.com/ioBroker/ioBroker.javascript#isastroday)isAstroDay

    isAstroDay ()

Возвращает значение "истина", если текущее время находится между астрономическими рассветом и закатом.

### [](https://github.com/ioBroker/ioBroker.javascript#comparetime)compareTime

    compareTime (startTime, endTime, operation, timeToCompare)

Сравнивает указанное время с границами. Если не указано время для сравнения, тогда будет использовано фактическое время. Возможны следующие операции:

*   **>** - если указанное время больше значения startTime
*   **>=** - если указанное время больше или равнозначно startTime
*   **<** - если указанное время меньше startTime
*   **<=** - если указанное время меньше или равнозначно startTime
*   **==** - если указанное время равнозначно startTime
*   **<>** - если указанное время неравнозначно startTime
*   **between** - если указанное время между startTime и endTime
*   **not between** - если указанное время не между startTime и endTime

Время может быть объектом даты или датой со временем, или просто временем.

### [](https://github.com/ioBroker/ioBroker.javascript#setstate)setState

    setState (id, state, ack, callback)

Пожалуйста, перейдите по ссылке [https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses) для объяснения использования "ack". Вкратце:

*   **ack = false** : Сценарий хочет отправить команду для того, чтобы её выполнило целевое устройство/адаптер
*   **ack = true** : Команда была успешно выполнена и состояние обновлено в качестве положительного результата

### [](https://github.com/ioBroker/ioBroker.javascript#setstatedelayed)setStateDelayed

    setStateDelayed (id, state, isAck, delay, clearRunning, callback)

То же, что и setState, но с задержкой в миллисекундах. Вы можете отменить задержку выполнения для данного ID (по умолчанию). Пример:

        setStateDelayed('Kitchen.Light.Lamp', true,  1000); // Включить свет на кухне через секунду
        setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, function () { // Выключить свет на кухне и запустить первый timeout.
            log('Lamp is OFF');
        });

Эта функция возвращает обработчик таймера и данный таймер может быть остановлен в индивидуальном порядке посредством clearStateDelayed

### [](https://github.com/ioBroker/ioBroker.javascript#clearstatedelayed)clearStateDelayed

    clearStateDelayed (id)

Удаляет все отложенные задания для заданного ID или некоего заданного отложенного задания.

        setStateDelayed('Kitchen.Light.Lamp', false,  10000); // Выключить свет на кухне через 10 секунд
        var timer = setStateDelayed('Kitchen.Light.Lamp', true,  5000, false); // Включить свет на кухне через 5 секунд
        clearStateDelayed('Kitchen.Light.Lamp', timer); // Ничего не будет включено
        clearStateDelayed('Kitchen.Light.Lamp'); // Стереть все ранее отложенные запущенные задания для этого ID

### [](https://github.com/ioBroker/ioBroker.javascript#getstate)getState

    getState (id)

Вовзращает состояние кода в форме `{val: value, ack: true/false, ts: timestamp, lc: lastchanged, from: origin}` . Если состояние не существует, последует возврат следующего объекта: `{val: null, notExist: true}`

### [](https://github.com/ioBroker/ioBroker.javascript#getobject)getObject

    getObject (id, enumName)

Получите описание объекта в том виде, как он хранится в системе. Вы можете задать имя перечисления (enum): Если оно задано, тогда два дополнительных атрибута будут добавлены к результату: enumIds и enumNames. Эти массивы имеют все перечисления, членом которых является этот ID. Пример: `getObject ('adapter.N.objectName', 'rooms')` возвращает в enumIds все комнаты, в которых числится запрошенный объект. Вы можете задать enumName как true, чтобы получить обратно _все_ перечисления в которые входит этот ID.

### [](https://github.com/ioBroker/ioBroker.javascript#setobject)setObject

    setObject(id, obj, callback)

Записать объект в базу данных. Эта команда может быть отключена в настройках адаптера. Используйте данную функцию осторожно, поскольку могут быть повреждены глобальные настройки. Используйте их подобным образом:

    var obj = getObject ('adapter.N.objectName');
    obj.native.settings = 1;
    setObject('adapter.N.objectName', obj, function (err) {
        if (err) log('Cannot write object: ' + err);
    });

### [](https://github.com/ioBroker/ioBroker.javascript#extendobject)extendObject

    extendObject(id, obj, callback)

Это практически то же самое, что и setObject, но вначале он читает объект и пытается объединить вместе все настройки. Используйте подобным образом:

    // Остановить экземпляр
    extendObject('system.adapter.sayit.0', {common: {enabled: false}});

### [](https://github.com/ioBroker/ioBroker.javascript#getidbyname)getIdByName

    getIdByName(name, alwaysArray)

возвращает код объекта с указанным именем. При существовании более, чем одного объекта с этим именем, результатом будет массив. Если установлен флажок _alwaysArray_, результатом всегда будет массив при нахождении ID.

### [](https://github.com/ioBroker/ioBroker.javascript#getenums)getEnums

    getEnums(enumName)

Получить список существующих перечислений с такими элементами, как:

    getEnums('rooms') =>
    [
        {
            "id":"enum.rooms.LivingRoom",
            "members":["hm-rpc.0.JEQ0024123.1","hm-rpc.0.BidCoS-RF.4"],
            "name": "Зал"
        },
        {
            "id":"enum.rooms.Bath",
            "members":["hm-rpc.0.JEQ0024124.1","hm-rpc.0.BidCoS-RF.5"],
            "name": "Ванная"
        }
    ]

### [](https://github.com/ioBroker/ioBroker.javascript#createstate)createState

    createState(name, initialValue, forceCreation, common, native, callback)

Создает состояние и объект в пространстве имён javascript, но только если он не существует, пример "javascript.0.mystate".

#### Параметры:

*   **name**: имя состояния без пространства имен, пример "mystate"
*   **initialValue**: после создания переменная может быть инициализирована. Значение "undefined" означает, что инициализации значения не проводится.
*   **forceCreation**: создайте состояние независимо от того, существует ли уже оно или нет.
*   **common**: общее описание объекта, смотрите описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
*   **native**: личное описание объекта. Любая конкретная информация.
*   **callback**: вызов происходит после того, как состояние создано и инициализировано.

Возможно короткое написание createState:

*   _createState('myVariable')_ - просто создается переменная, если она не существует
*   _createState('myVariable', 1)_ - создается переменная, если она не существует, и инициализируется со значением 1
*   _createState('myVariable', {name: 'My own variable', unit: '°C'}, function () {log('created');});_
*   _createState('myVariable', 1, {name: 'My own variable', unit: '°C'})_ - создается переменная, если она не существует, с заданным именем и единицами

### [](https://github.com/ioBroker/ioBroker.javascript#deletestate)deleteState

    deleteState(name, callback)
    Delete state and object in javascript space, e.g. "javascript.0.mystate".

`deleteState('myVariable')_ - просто удаляется переменная, если она существует`

### [](https://github.com/ioBroker/ioBroker.javascript#sendto)sendTo:

    sendTo (adapter, cmd, msg, callback)

### [](https://github.com/ioBroker/ioBroker.javascript#setinterval)setInterval

    setInterval (callback, ms, arg1, arg2, arg3, arg4)

То же, что и **_setInterval_**  в javascript.

### [](https://github.com/ioBroker/ioBroker.javascript#clearinterval)clearInterval

    clearInterval (id)

То же, что и **_clearInterval_** в javascript.

### [](https://github.com/ioBroker/ioBroker.javascript#settimeout)setTimeout

    setTimeout (callback, ms, arg1, arg2, arg3, arg4)

То же, что и **_setTimeout_** в javascript.

### [](https://github.com/ioBroker/ioBroker.javascript#cleartimeout)clearTimeout

    clearTimeout (id)

То же, что и **_clearTimeout_** в javascript.

### [](https://github.com/ioBroker/ioBroker.javascript#formatdate)formatDate

    formatDate (millisecondsOrDate, format)

#### [](https://github.com/ioBroker/ioBroker.javascript#parameters-1)Параметры:

*   **date**: количество миллисекунд из state.ts или state.lc (Количество миллисекунд от 1970.01.01 00:00:00) или объект _new Date()_ в javascript или количество миллисекунд от _(new Date().getTime())_
*   **format**: Может быть "null", таким образом будет использован временной формат системы:
    *   YYYY, JJJJ, ГГГГ - год полностью, например 2015
    *   YY, JJ, ГГ - год сокращенно, например 15
    *   MM, ММ(кириллицей) - месяц полностью, например 01
    *   M, М(кириллицей) - месяц сокращенно, например 1
    *   DD, TT, ДД - день полностью, например 02
    *   D, T, Д - день сокращенно, например 2
    *   hh, SS, чч - часы полностью, например 03
    *   h, S, ч - часы сокращенно, например 3
    *   mm, мм(кириллицей) - минуты полностью, например 04
    *   m, м(кириллицей) - минуты сокращенно, например 4
    *   ss, сс(кириллицей) - секунды полностью, например 05
    *   s, с(кириллицей) - секунды сокращенно, например 5
    *   sss, ссс(кириллицей) - миллисекунды
    *   WW, НН(кириллицей) - день недели полностью текстом
    *   W, Н(кириллицей) - день недели сокращенно текстом
    *   OO, ОО(кириллицей) - месяц полностью текстом
    *   O, О(кириллицей) - месяц сокращенно текстом

#### [](https://github.com/ioBroker/ioBroker.javascript#example)Примеры

`formatDate(new Date(), "YYYY-MM-DD") => Дата "2015-02-24"` `formatDate(new Date(), "hh:mm") => Часы и минуты "17:41"` `formatDate(state.ts) => "24.02.2015"` `formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss) => "2015.02.15 17:41:98.123"` `formatDate(new Date(), "WW") => День недели "Вторник"` `formatDate(new Date(), "W") => День недели "Вт"`  

### [](https://github.com/ioBroker/ioBroker.javascript#getdateobject)getDateObject

    getDateObject (stringOrNumber)

Конвертирует строку или число в объект даты. Если указаны только часы, тогда будет добавлена текущая дата и будет совершена попытка конвертации. getDateObject("20:00") => "Вт Авг 09 2016 20:00:00 GMT+0200"

### [](https://github.com/ioBroker/ioBroker.javascript#formatvalue)formatValue

    formatValue (value, decimals, format)

Форматирует любое значение (в том числе и строки) в числа. Заменяет точку запятой, если установлено в системных настройках. Decimals означают количество цифр после запятой. Заданное значение по умолчанию 2\. Формат по выбору:

*   '.,': 1234.567 => 1.234,56
*   ',.': 1234.567 => 1,234.56
*   ' .': 1234.567 => 1 234.56

### [](https://github.com/ioBroker/ioBroker.javascript#adaptersubscribe)adapterSubscribe

    adapterSubscribe(id)

Отправляет сообщение "subscribe" адаптеру для информирования адаптера. Если на адаптере установлен общий флажок "subscribable" в случае функции "subscribe", данная функция будет вызыватся автоматически.

### [](https://github.com/ioBroker/ioBroker.javascript#adapterunsubscribe)adapterUnsubscribe

    adapterUnsubscribe(id)

Отправляет сообщение "unsubscribe" адаптеру, чтобы сообщить даптеру не проводить опрос значений.

### [](https://github.com/ioBroker/ioBroker.javascript#---selector)$ - Selector (селектор)

    $(selector).on(function(obj) {});
    $(selector).each(function(id, i) {});
    $(selector).setState(value, ack);
    $(selector).getState();

Формат селектора: '''name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]''' имя может быть: состояние, канал или устройство "idfilter" могут иметь знаки подстановки '*' Префиксы **_(не внедрено - требует обсуждения)_** : # - принимаются по имени, а не по коду. - фильтруются по роли § - фильтруются по комнате **_Пример_**:

*   $('state[id=_.STATE]') или $('state[state.id=_.STATE]') or $('*.STATE') - выберите все состояния, в которых код заканчивается на ".STATE".
*   $('state[id='hm-rpc.0._]') или $('hm-rpc.0._') - вовзращает все состояния экзмепляра адаптера hm-rpc.0
*   $('channel(rooms=Зал)') - все состояния в комнате "Living room(зал)"
*   $('channel{TYPE=BLIND}[state.id=*.LEVEL]') - Получите все границы Homematic
*   $('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false) - Переключите все состояния каналов с .STATE с ролью "переключить" в "Зал" к неправильной позиции
*   $('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);}); - напечатайте все состояния перечисления "windows (окна)" в журнале
*   $('.switch §"Living room") - Примите состояния со всеми переключателями в 'Зал' **_(не внедрено - требует обсуждения)_**
*   $('channel .switch §"Living room") - Примите состояния со всеми переключателями в 'Зал' **_(не внедрено - требует обсуждения)_**

**Объяснение** Давайте взглянем на:

    $('channel[role=switch][state.id=*.STATE](rooms=Зал)').on(function (obj) {
       log('New state ' + obj.id + ' = ' + obj.state.val);
    }

Этот код ищет в каналах. Найти все каналы с common.role="switch" и принадлежащие к enum.rooms.Зал. Найти все состояния, где код заканчивается на ".STATE и подписаться на все эти состояния. Если некоторые из этих состояний изменяются, то обратный вызов будет осуществлятся как для функции "on". Возможны следующие функции, setValue, getValue (only from first), on, each

    // Включить все переключатели в "Зале"
    $('channel[role=switch][state.id=*.STATE](rooms=Living room)').setValue(true);

Вы можете прервать цикл "each" путем возвращения false, например:

    // напечатать два первых ID всех переключателей в "Зале"
    $('channel[role=switch][state.id=*.STATE](rooms=Living room)').each(function (id, i) {
        console.log(id);
        if (i == 1) return false;
    });

### [](https://github.com/ioBroker/ioBroker.javascript#readfile)readFile

    readFile (adapter, fileName, function (error, bytes) {})

Читает файл из папки "javascript". Результат будет предоставлен в функции обратного вызова.

### [](https://github.com/ioBroker/ioBroker.javascript#writefile)writeFile

    writeFile (adapter, fileName, bytes, function (error) {})

Выборочный код ошибки будет указан в обратном вызове. fileName является именем файла. Все файлы хранятся в папке "javascript". Если вы хотите записать в другие папки, например в "/vis.0/", используйте для этого setFile. Файл, выглядящий как '/subfolder/file.txt' будет храниться под именем "/javascript/subfolder/file.txt" и будет доступен через веб-сервер `http://ip:8082/javascript/subfolder/file.txt`

    // сохранить скриншот в базе данных
    var fs = require('fs');
    var data = fs.readFileSync('/tmp/screenshot.png');
    writeFile(null, '/screenshots/1.png', data, function (error) {
        console.log('file written');
    });

    // сохранить файл в '/vis.0' в базе данных
    var fs = require('fs');
    var data = fs.readFileSync('/tmp/screenshot.png');
    writeFile('vis.0', '/screenshots/1.png', data, function (error) {
        console.log('file written');
    });

### [](https://github.com/ioBroker/ioBroker.javascript#delfile)delFile

    delFile (adapter, fileName, function (error) {})

Удалить файл или директорию.  fileName это имя файла или директории в базе данных. Эта функция является псевдонимом для _unlink_.

### [](https://github.com/ioBroker/ioBroker.javascript#onstop)onStop

    onStop (function(){}, timeout);

Установите обратный вызов, который будет выполнятся в случае остановки сценария. Используйте его например для остановки опросов или для закрытия соединения.

    // установить соединение
    var conn = require('net')....;

    // прервать соединение, если сценарий остановлен
    onStop(function (callback) {
        if (conn) {
            // close connection
            conn.destory();
        }
        callback();
    }, 2000 /*ms*/);

_timeout_ по умолчанию составляет 1000 миллисекунд.

### [](https://github.com/ioBroker/ioBroker.javascript#gethistory)getHistory

    getHistory (instance, options, function (error, result, options, instance) {});

Прочитать историю записей из указанного экземпляра. Если не указан ни один экземпляр драйвера, тогда будет взят по умолчанию установленный в системе экземпляр.

    // Прочитать историю 'system.adapter.admin.0.memRss' из sql driver
    var end = new Date().getTime();
    getHistory('sql.0', {
            id:         'system.adapter.admin.0.memRss',
            start:      end - 3600000,
            end:        end,
            aggregate:  'm4',
            timeout:    2000
        }, function (err, result) {
            if (err) console.error(err);
            if (result) {
                for (var i = 0; i < result.length; i++) {
                console.log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
                }
            }
        });

Возможные параметры вы можете найти [здесь](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter). Дополнительно к этим параметрам вы должны указать "ID" и вы должны указать время ожидания (по умолчанию: 20000 миллисекунд). Еще один пример:

    // Получить информацию по 50 последним посещениям из указанного участка истории без комплексирования:
    getHistory({
            id:         'system.adapter.admin.0.alive',
            aggregate:  'none',
            count:      50
        }, function (err, result) {
            if (err) console.error(err);
            if (result) {
                for (var i = 0; i < result.length; i++) {
                console.log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
                }
            }
        });

_Примечание: _ разумеется, история должна быть сначала включена для выбранного ID в admin.

### [](https://github.com/ioBroker/ioBroker.javascript#runscript)runScript

    runScript('scriptName')

Запускает или останавливает другие сценарии (и себя тоже) по имени. Есть также второй параметр

    // остановить сценарий
    runScript('groupName.scriptName1', false);

    // запустить сценарий
    runScript('scriptName2')

### [](https://github.com/ioBroker/ioBroker.javascript#startscript)startScript

    startScript('scriptName')

То же, что и

    runScript('scriptName', true);

### [](https://github.com/ioBroker/ioBroker.javascript#stopscript)stopScript

    stopScript('scriptName')

То же, что и `runScript('scriptName', false);` Если stopScript вызывается без аргументов, тогда он сам себя остановит:

    stopScript();

### [](https://github.com/ioBroker/ioBroker.javascript#isscriptactive)isScriptActive

    isScriptActive('scriptName')

Возвращает активен сценарий или нет. Пожалуйста, обратите внимание, что он не передает информацию о том, выполняется сейчас сценарий или нет. Сценарий может быть закончен, но все еще активен.

### [](https://github.com/ioBroker/ioBroker.javascript#name)name

    log('Script ' + name + ' started!')

Это не функция. Это переменная с именем сценария, которая является видимой в области сценария.

### [](https://github.com/ioBroker/ioBroker.javascript#instance)instance

    log('Script ' + name + ' started by ' + instance + '!')

Это не функция. Это переменная с экземпляром javascript, которая является видимой в области сценария.

## Опция - "Не подписываться на все состояния в начале"

Существует два режима подписки на состояния:

*   Адаптер подписывается на все изменения в начале и получает все изменения всех состояний (легче использовать getStates(id), но требуется больше CPU и RAM):

    console.log(getState('someID').val);

*   Адаптер подписывается каждый раз на указанный ID, если происходит вызов "on/subscribe".  В этом режиме адаптер получает только обновления для желаемых состояний. Это более продуктивно и эффективно для RAM, но вы не сможете получить доступ к состояниям напрямую через getState. Вы должны будете использовать функцию обратного вызова для получения результата состояния:

    getState('someID', function (error, state) {
        console.log(state.val);
    });

Это происходит из-за того, что адаптер не имеет значения состояния в RAM и должен посылать запрос значения в центральную базу данных.

## [](https://github.com/ioBroker/ioBroker.javascript#scripts-activity)Scripts activity / Активность сценариев

Существует возможность включать и отключать сценарии посредством состояний. Для каждого сценария состояние будет создано с именем **javascript.INSTANCE.scriptEnabled.SCRIPT_NAME**. Сценарии могут быть активированы и деактивированы посредством контроля этого состояния с помощью ack=false.

## Примечание

Если в сценарии некоторые модули или функции используются совместно с функциями обратного вызова или циклическими вызовами, за исключением setTimeout/setInterval, тогда они будут вызываться снова и снова даже при условии, что существует новая версия сценария или же он был удален. К примеру, следующий сценарий:

        var http = require('http');
        // Read www.google.com page
        http.request('www.google.com', function(res) {
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                log('BODY: ' + chunk);
              });
        }).on('error', function(e) {
              log('problem with request: ' + e.message, 'error');
        });

был удален пользователем до того, как вернулся результат. Обратный вызов в любом случае будет выполнен. Для исправления данного свойства, **перезапустите** драйвер javascript. Вы можете использовать функцию "cb" для переноса вашего результата, как указано ниже

    http.request('www.google.com', cb(function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            log('BODY: ' + chunk);
          }));
    }).on('error', cb(function(e) {
          log('problem with request: ' + e.message, 'error');
    }));

чтобы убедиться, что не последует никакого обратного вызова  в случае, если сценарий удален или изменен.