---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.telegram/README.md
title: ioBroker Telegram Adapter
hash: BuYkubzMLypshKqNbVufMZM5m/zjagIRqR6vJCVHuOQ=
---
![логотип](../../../en/adapterref/iobroker.telegram/admin/telegram.png)

![Количество установок](http://iobroker.live/badges/telegram-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.telegram.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.telegram.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)

# IoBroker Telegram Adapter
## Конфигурация
Попросите [@BotFather](https://telegram.me/botfather) создать нового бота ```/newbot```.

Вам будет предложено ввести имя бота, а затем имя пользователя.
После этого вы получите токен.

![Скриншот](../../../en/adapterref/iobroker.telegram/img/chat.png)

Вы должны установить пароль для связи в диалоге конфигурации. После этого запустите адаптер.

Чтобы начать разговор с вашим ботом, вам нужно авторизовать пользователя с помощью «/ фраза пароля», где **фраза** - ваш настроенный пароль. Так что откройте новый диалог с вашим сгенерированным ботом в Telegram, а затем вам нужно ввести пароль в качестве первой команды.

** Примечание: ** вы можете использовать краткую форму "/ p фразу".

Чтобы добавить красивую аватарку, введите `/setuserpic` в чате **BotFather** и загрузите ему нужную картинку (512x512 пикселей), например, эту [логотип](img/logo.png).

Вы можете отправить сообщение всем аутентифицированным пользователям через блок сообщений `sendTo('telegram', 'Test message')` или конкретному пользователю `sendTo('telegram', '@userName Test message')`.
Пользователь должен быть аутентифицирован ранее.

Вы также можете указать пользователя таким образом:

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Если вы используете приведенный выше пример, имейте в виду, что вы должны заменить «UserName» на имя или Public-Telegram-Username пользователя, которому вы хотите отправить сообщение. (Зависит от того, включен ли параметр «Хранить имя пользователя, а не имя» в настройках адаптера). Если этот параметр установлен, и пользователь не указал публичное имя пользователя в своей учетной записи телеграммы, то адаптер продолжит использовать первое имя пользователь. Имейте в виду, что если пользователь устанавливает публичное имя пользователя позже (после аутентификации для вашего бота), сохраненное имя будет заменено на имя пользователя в следующий раз, когда пользователь отправит сообщение боту.

Можно указать более одного получателя (просто разделите имена пользователей запятыми).
Например: Получатель: «Пользователь1, Пользователь4, Пользователь5»

Вы также можете отправлять сообщения поверх состояния, просто установите состояние *"telegram.INSTANCE.communicate.response"* со значением *"@ userName Test message"*

## Применение
Вы можете использовать телеграмму с [text2command](https://github.com/ioBroker/ioBroker.text2command) адаптером. Есть предопределенная схема связи, и вы можете дать команду домой в текстовом виде.

Чтобы отправить фотографию, просто отправьте путь к файлу вместо текста или URL: `sendTo('telegram', 'absolute/path/file.png')` или `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Пример отправки скриншота с веб-камеры на телеграмму:

```
var request = require('request');
var fs      = require('fs');

function sendImage() {
    request.get({url: 'http://login:pass@ipaddress/web/tmpfs/snap.jpg', encoding: 'binary'}, function (err, response, body) {
        fs.writeFile("/tmp/snap.jpg", body, 'binary', function(err) {

        if (err) {
            console.error(err);
        } else {
            console.log('Snapshot sent');
            sendTo('telegram.0', '/tmp/snap.jpg');
            //sendTo('telegram.0', {text: '/tmp/snap.jpg', caption: 'Snapshot'});
        }
      });
    });
}
on("someState", function (obj) {
    if (obj.state.val) {
        // send 4 images: immediately, in 5, 15 and 30 seconds
        sendImage();
        setTimeout(sendImage, 5000);
        setTimeout(sendImage, 15000);
        setTimeout(sendImage, 30000);
    }
});
```

Следующие сообщения зарезервированы для действий:

- *печатать* - для текстовых сообщений,
- *upload_photo* - для фотографий,
- *upload_video* - для видео,
- *record_video* - для видео,
- *record_audio* - для аудио,
- *upload_audio* - для аудио,
- *upload_document* - для документов,
- *find_location* - для данных о местоположении

В этом случае команда действия будет отправлена.

Описание API Telegram можно найти в [Вот](https://core.telegram.org/bots/api), и вы можете использовать все опции, определенные в этом API, просто включив их в объект отправки. Например.:

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

** Возможные варианты **:

- *disable_notification* отправляет сообщение без вывода сообщений. Пользователи iOS не получат уведомление, пользователи Android получат уведомление без звука. (все типы)
- *parse_mode* отправьте Markdown или HTML, если вы хотите, чтобы приложения Telegram показывали жирный текст, курсив, текст фиксированной ширины или встроенные URL в сообщении вашего бота. Возможные значения: «Уценка», «HTML» (сообщение)
- *disable_web_page_preview* отключает предварительный просмотр ссылок для ссылок в этом сообщении (сообщении)
- *заголовок* заголовок для документа, фото или видео, 0-200 символов (видео, аудио, фото, документ)
- *duration* длительность отправленного видео или аудио в секундах (аудио, видео)
- *Performer* Исполнитель аудио файла (аудио)
- *title* название дорожки аудиофайла (аудио)
- *ширина* ширина видео (видео)
- *высота* высота видео (видео)

Адаптер пытается определить тип сообщения (фото, видео, аудио, документ, наклейка, действие, местоположение), зависит от текста в сообщении, если текст является путем к существующему файлу, оно будет отправлено в соответствии с типом.

Местоположение будет обнаружено на атрибуте широты:

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Явные типы сообщений
У вас есть возможность определить дополнительный тип сообщения на случай, если вы хотите отправить данные в виде буфера.

Возможны следующие типы: *стикер* *видео* *документ* *аудио* *фото*

```
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Клавиатура
Вы можете показать клавиатуру **ReplyKeyboardMarkup** в клиенте:

```
sendTo('telegram.0', {
    text:   'Press button',
    reply_markup: {
        keyboard: [
            ['Line 1, Button 1', 'Line 1, Button 2'],
            ['Line 2, Button 3', 'Line 2, Button 4']
        ],
        resize_keyboard:   true,
        one_time_keyboard: true
    }
});
```

Вы можете прочитать больше [здесь] (https://core.telegram.org/bots/api#replykeyboardmarkup) и [здесь](https://core.telegram.org/bots#keyboards).

Вы можете показать клавиатуру **InlineKeyboardMarkup** в клиенте:

```
sendTo('telegram', {
    user: user,
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

Вы можете прочитать больше [здесь] (https://core.telegram.org/bots/api#inlinekeyboardmarkup) и [здесь](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

** ПРИМЕЧАНИЕ: ** *После того, как пользователь нажмет кнопку обратного вызова, клиенты Telegram будут отображать индикатор выполнения, пока вы не вызовете answerCallbackQuery. Следовательно, необходимо реагировать, вызывая answerCallbackQuery, даже если уведомление пользователю не требуется (например, без указания каких-либо необязательных параметров).*

### AnswerCallbackQuery
Используйте этот метод для отправки ответов на запросы обратного вызова, отправленные с встроенных клавиатур. Ответ будет отображаться пользователю в виде уведомления в верхней части экрана чата или в виде предупреждения. В случае успеха *True* возвращается.

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        answerCallbackQuery: {
            text: "Pressed!",
            showAlert: false // Optional parameter
        }
   });
}
```

Вы можете прочитать больше [Вот](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Вопрос
Вы можете отправить телеграмму сообщение, и следующий ответ будет возвращен в режиме обратного вызова.
Тайм-аут может быть установлен в конфигурации и по умолчанию составляет 60 секунд.

```
sendTo('telegram.0', 'ask', {
    user: user, // optional
    text: 'Aure you sure?',
    reply_markup: {
        inline_keyboard: [
            // two buttons could be on one line too, but here they are on different
            [{ text: 'Yes!',  callback_data: '1' }], // first line
            [{ text: 'No...', callback_data: '0' }]  // second line
        ]
    }
}, msg => {
    console.log('user says ' + msg.data);
});
```

## ID чата
Начиная с версии 0.4.0 вы можете использовать идентификатор чата для отправки сообщений в чат.

`sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');`

## Обновление сообщений
Следующие методы позволяют изменить существующее сообщение в истории сообщений вместо отправки нового с результатом действия. Это наиболее полезно для сообщений с *встроенными клавиатурами* использующими запросы обратного вызова, но также может помочь уменьшить беспорядок в разговорах с обычными чат-ботами.

### EditMessageText
Используйте этот метод для редактирования текста, отправленного ботом или через бот (для встроенных ботов). В случае успеха, если бот отправляет отредактированное сообщение, отредактированное сообщение возвращается, в противном случае возвращается *True*

```
if (command === "1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

*или новый текст для последнего сообщения:*

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text message',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
            }
        }
    });
}
```

Вы можете прочитать больше [Вот](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageReplyMarkup
Используйте этот метод для редактирования только разметки ответа сообщений, отправленных ботом или через бот (для встроенных ботов). В случае успеха, если бот отправляет отредактированное сообщение, отредактированное сообщение возвращается, в противном случае возвращается *True*

```
if (command === "1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageReplyMarkup: {
            options: {
                chat_id: getState("telegram.0.communicate.botSendChatId").val,
                message_id: getState("telegram.0.communicate.botSendMessageId").val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

Вы можете прочитать больше [Вот](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Удалить сообщение
Используйте этот метод для удаления сообщения, включая служебные сообщения, со следующими ограничениями:

- Сообщение может быть удалено, только если оно было отправлено менее 48 часов назад.

Возвращает *True* в случае успеха.

```
if (command === "delete") {
    sendTo('telegram', {
        user: user,
        deleteMessage: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val
            }
        }
    });
}
```

Вы можете прочитать больше [Вот](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Реакция на пользовательские ответы / сообщения
Предположим, вы используете только JavaScript без *text2command* Вы уже отправили сообщение / вопрос своему пользователю, используя *sendTo ()* как описано выше. Пользователь отвечает на это нажатием кнопки или написанием сообщения. Вы можете извлечь команду и оставить отзыв своему пользователю, выполнить команды или переключить состояния в iobroker.

 - telegram.0 - ваш экземпляр Telegram от iobroker, который вы хотите использовать
 - пользователь - это зарегистрированный вами пользователь TelegramBot, который отправил сообщение
 - команда - это команда, полученная вашим TelegramBot

```
on({id: 'telegram.0.communicate.request', change: 'any'}, function (obj) {
    var stateval = getState('telegram.0.communicate.request').val;              // save Statevalue received from your Bot
    var user = stateval.substring(1,stateval.indexOf("]"));                 // extract user from the message
    var command = stateval.substring(stateval.indexOf("]")+1,stateval.length);   // extract command/text from the message

    switch (command) {
        case "1_2":
            //... see example above ...
            break;
        case "delete":
            //... see example above
            break;
        //.... and so on ...
    }
});

```

## Специальные команды
### / state stateName - прочитать значение состояния
Вы можете запросить значение состояния, если у вас сейчас идентификатор:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### / state stateName value - установить значение состояния
Вы можете установить значение состояния, если у вас есть идентификатор:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Режим опроса или сервер
Если используется режим опроса, адаптер каждые пять месяцев опрашивает сервер Telegram на наличие обновлений. Он использует трафик и сообщения могут быть отложены до интервала опроса. Интервал опроса может быть определен в конфигурации адаптера.

Для использования режима сервера ваш экземпляр ioBroker должен быть доступен из Интернета (например, с помощью службы динамического DNS noip.com).

Telegram может работать только с HTTPS-серверами, но вы можете использовать **давайте зашифруем** сертификаты.

Для режима сервера должны быть предусмотрены следующие настройки:

- URL - в форме https://yourdomain.com:8443.
- IP - IP-адрес, с которого будет связан сервер. По умолчанию 0.0.0.0. Не меняйте его, если вы не уверены.
- Порт - фактически только 443, 80, 88, 8443 порта поддерживаются телеграммой, но вы можете перенаправить порты любому через ваш маршрутизатор.
- Публичный сертификат - требуется, если **шифрование** отключено.
- Закрытый ключ - требуется, если **шифрование** отключено.
- Цепной сертификат (необязательно)
- Давайте зашифруем опции - Очень легко настроить **давайте зашифруем** сертификаты. Пожалуйста, прочитайте [здесь] (https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) об этом.

## Звонки через телеграмму
Благодаря [callmebot](https://www.callmebot.com/) api вы можете позвонить на свою учетную запись телеграммы, и некоторый текст будет прочитан через механизм TTS.

Чтобы сделать это из адаптера JavaScript, просто позвоните:

```
sendTo('telegram.0', 'call', 'Some text');
```

или

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
    repeats: 0, // number of repeats
});
```

или

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

или

```
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

Возможные значения для языка:

- `ar-XA-Standard-A` - арабский (женский голос)
- `ar-XA-Standard-B` - арабский (мужской голос)
- `ar-XA-Standard-C` - арабский (мужской 2 голоса)
- `cs-CZ-Standard-A` - чешский (Чехия) (женский голос)
- `da-DK-Standard-A` - датский (Дания) (женский голос)
- `nl-NL-Standard-A` - голландский (Нидерланды) (женский голос - будет использоваться, если системный язык - NL, и язык не был указан)
- `nl-NL-Standard-B` - Голландский (Нидерланды) (мужской голос)
- `nl-NL-Standard-C` - Голландский (Нидерланды) (мужской 2 голоса)
- `nl-NL-Standard-D` - Голландский (Нидерланды) (женский голос 2)
- `nl-NL-Standard-E` - Голландский (Нидерланды) (женский 3 голоса)
- `en-AU-Standard-A` - английский (Австралия) (женский голос)
- `en-AU-Standard-B` - английский (Австралия) (мужской голос)
- `en-AU-Standard-C` - английский (Австралия) (женский голос 2)
- `en-AU-Standard-D` - английский (Австралия) (мужской 2 голоса)
- `en-IN-Standard-A` - английский (Индия) (женский голос)
- `en-IN-Standard-B` - английский (Индия) (мужской голос)
- `en-IN-Standard-C` - английский (Индия) (мужской 2 голоса)
- `en-GB-Standard-A` - английский (Великобритания) (женский голос - будет использоваться, если системным языком является EN, а язык не указан)
- `en-GB-Standard-B` - английский (Великобритания) (мужской голос)
- `en-GB-Standard-C` - английский (Великобритания) (женский голос 2)
- `en-GB-Standard-D` - английский (Великобритания) (мужской 2 голоса)
- `en-US-Standard-B` - английский (США) (мужской голос)
- `en-US-Standard-C` - английский (США) (женский голос)
- `en-US-Standard-D` - английский (США) (мужской 2 голоса)
- `en-US-Standard-E` - английский (США) (женский голос 2)
- `fil-PH-Standard-A` - филиппинский (Филиппины) (женский голос)
- `fi-FI-Standard-A` - финский (Финляндия) (женский голос)
- `fr-CA-Standard-A` - французский (Канада) (женский голос)
- `fr-CA-Standard-B` - французский (Канада) (мужской голос)
- `fr-CA-Standard-C` - французский (Канада) (женский голос 2)
- `fr-CA-Standard-D` - французский (Канада) (мужской 2 голоса)
- `fr-FR-Standard-A` - французский (Франция) (женский голос - будет использоваться, если системным языком является FR, а язык не указан)
- `fr-FR-Standard-B` - французский (Франция) (мужской голос)
- `fr-FR-Standard-C` - французский (Франция) (женский голос 2)
- `fr-FR-Standard-D` - французский (Франция) (мужской голос 2)
- `de-DE-Standard-A` - немецкий (Германия) (женский голос - будет использоваться, если системным языком является DE, а язык не указан)
- `de-DE-Standard-B` - немецкий (Германия) (мужской голос)
- `el-GR-Standard-A` - греческий (Греция) (женский голос)
- `hi-IN-Standard-A` - хинди (Индия) (женский голос)
- `hi-IN-Standard-B` - хинди (Индия) (мужской голос)
- `hi-IN-Standard-C` - хинди (Индия) (мужской голос 2)
- `hu-HU-Standard-A` - венгерский (Венгрия) (женский голос)
- `id-ID-Standard-A` - индонезийский (Индонезия) (женский голос)
- `id-ID-Standard-B` - индонезийский (Индонезия) (мужской голос)
- `id-ID-Standard-C` - индонезийский (Индонезия) (мужской голос 2)
- `it-IT-Standard-A` - итальянский (Италия) (женский голос - будет использоваться, если языком системы является IT, а язык не указан)
- `it-IT-Standard-B` - итальянский (Италия) (женский 2 голоса)
- `it-IT-Standard-C` - итальянский (Италия) (мужской голос)
- `it-IT-Standard-D` - итальянский (Италия) (мужской 2 голоса)
- `ja-JP-Standard-A` - японский (Япония) (женский голос)
- `ja-JP-Standard-B` - японский (Япония) (женский голос 2)
- `ja-JP-Standard-C` - японский (Япония) (мужской голос)
- `ja-JP-Standard-D` - японский (Япония) (мужской 2 голоса)
- `ko-KR-Standard-A` - корейский (Южная Корея) (женский голос)
- `ko-KR-Standard-B` - корейский (Южная Корея) (женский 2 голоса)
- `ko-KR-Standard-C` - корейский (Южная Корея) (мужской голос)
- `ko-KR-Standard-D` - корейский (Южная Корея) (мужской 2 голоса)
- `cmn-CN-Standard-A` - китайский (женский голос)
- `cmn-CN-Standard-B` - китайский (мужской голос)
- `cmn-CN-Standard-C` - китайский мандарин (мужской 2 голоса)
- `nb-NO-Standard-A` - норвежский (Норвегия) (женский голос)
- `nb-NO-Standard-B` - норвежский (Норвегия) (мужской голос)
- `nb-NO-Standard-C` - норвежский (Норвегия) (женский голос 2)
- `nb-NO-Standard-D` - норвежский (Норвегия) (мужской 2 голоса)
- `nb-no-Standard-E` - норвежский (Норвегия) (женский 3 голоса)
- `pl-PL-Standard-A` - польский (Польша) (женский голос - будет использоваться, если системным языком является PL, а язык не указан)
- `pl-PL-Standard-B` - польский (Польша) (мужской голос)
- `pl-PL-Standard-C` - Польский (Польша) (мужской 2 голоса)
- `pl-PL-Standard-D` - Польский (Польша) (женский 2 голоса)
- `pl-PL-Standard-E` - Польский (Польша) (женский 3 голоса)
- `pt-BR-Standard-A` - португальский (Бразилия) (женский голос - будет использоваться, если системным языком является PT, а язык не указан)
- `pt-PT-Standard-A` - португальский (Португалия) (женский голос)
- `pt-PT-Standard-B` - португальский (Португалия) (мужской голос)
- `pt-PT-Standard-C` - португальский (Португалия) (мужской 2 голоса)
- `pt-PT-Standard-D` - португальский (Португалия) (женский голос 2)
- `ru-RU-Standard-A` - русский (Россия) (женский голос - будет использоваться, если системным языком является RU, а язык не указан)
- `ru-RU-Standard-B` - русский (Россия) (мужской голос)
- `ru-RU-Standard-C` - русский (Россия) (женский 2 голоса)
- `ru-RU-Standard-D` - русский (Россия) (мужской 2 голоса)
- `sk-SK-Standard-A` - словацкий (Словакия) (женский голос)
- `es-ES-Standard-A` - испанский (Испания) (женский голос - будет использоваться, если системным языком является ES, а язык не указан)
- `sv-SE-Standard-A` - шведский (Швеция) (женский голос)
- `tr-TR-Standard-A` - турецкий (Турция) (женский голос)
- `tr-TR-Standard-B` - турецкий (Турция) (мужской голос)
- `tr-TR-Standard-C` - турецкий (Турция) (женский 2 голоса)
- `tr-TR-Standard-D` - турецкий (Турция) (женский 3 голоса)
- `tr-TR-Standard-E` - турецкий (Турция) (мужской голос)
- `uk-UA-Standard-A` - Украинский (Украина) (Женский голос)
- `vi-VN-Standard-A` - вьетнамский (Вьетнам) (женский голос)
- `vi-VN-Standard-B` - вьетнамский (Вьетнам) (мужской голос)
- `vi-VN-Standard-C` - вьетнамский (Вьетнам) (женский голос 2)
- `vi-VN-Standard-D` - вьетнамский (Вьетнам) (мужской 2 голоса)

ДЕЛАТЬ:

- место проведения

## Авто-встроенная клавиатура в зависимости от настроек администратора (Easy-Keyboard)
Для каждого состояния могут быть включены дополнительные настройки:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

При вводе "/ cmds" в телеграмме будет отображаться следующая клавиатура:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

«/ cmds» можно заменить любым текстом (например, «?») в диалоговом окне конфигурации адаптера телеграммы.

Если опция **Использовать комнаты в команде клавиатуры** включена в диалоговом окне конфигурации адаптера телеграммы, то на первом шаге будет показан список комнат. ***Еще не реализовано***

### Настройки в состоянии
Прежде всего, конфигурация должна быть включена.

#### Псевдоним
Название устройства. Если пустое имя будет взято из объекта.
При входе в «Дверная лампа» будет показано следующее меню для логического состояния.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Вы можете включить устройство, выключить устройство или запросить состояние.
Если вы нажмете `Door lamp ?`, вы получите `Door lamp  => switched off`.

### Только чтение
Если активировано, кнопки ВКЛ / ВЫКЛ не будут отображаться, только `Door lamp ?`.

### Сообщить об изменениях
Если статус устройства изменился (например, кто-то физически включил лампу), новый статус будет передан в Telegram.
Например. `Door lamp  => switched on`.

### Кнопки в строке
Сколько кнопок должно отображаться в строке для одного устройства.
Возможно, из-за длинного имени в строке лучше отображать только 2 (или даже одну) кнопку.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Только запись
Если эта функция активирована, кнопка запроса статуса (`Door lamp ?`) не будет отображаться.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### По команде
Какой текст будет отображаться на кнопке ON.
Как здесь: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Будет производить следующую клавиатуру: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### ON Текст
Какой текст будет показан в отчете о состоянии.
Например. `Door lamp => activated`, если состояние устройства изменилось на true и текст **ON** ** `activated`

Тексты ВКЛ / ВЫКЛ будут отображаться, только если активирован **Отчет об изменениях**

### Команда OFF
То же, что и команда **ON** но для OFF.

### OFF Текст
То же, что и **ON Text** но для OFF.
Например. `Door lamp => deactivated`, если состояние устройства изменилось на ложное и **** ВЫКЛ. Текст** равен `deactivated`

### Только правда
Например. для кнопок они не имеют состояния ВЫКЛ. В этом случае кнопка OFF не будет отображаться.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## Как получать сообщения в групповых чатах с помощью адаптера telegram
Если бот Telegram получает сообщения, отправленные пользователем боту в приватных чатах, но не получает сообщения, отправленные пользователями в групповых чатах.
В этом случае вы должны поговорить с @botfather и отключить режим конфиденциальности.

BotFather чат:

```
You: /setprivacy

BotFather: Choose a bot to change group messages settings.

You: @your_name_bot

BotFather: 'Enable' - your bot will only receive messages that either start with the '/' symbol or mention the bot by username.

'Disable' - your bot will receive all messages that people send to groups.

Current status is: ENABLED

You: Disable

BotFather: Success! The new status is: DISABLED. /help
```

## Changelog
### 1.5.6 (2020-04-04)
* (bluefox) Fixed missing languages for blockly
* (bluefox) Added description of easy-keyboard

### 1.5.5 (2020-04-04)
* (alutov) Fixed bug for telegram users with an empty user name
* (Mark Rohrbacher) Allowed JSON objects in telegram.*.communicate.response 

### 1.5.4 (2020-03-11)
* (bluefox) Improvement of callmebot

### 1.5.3 (2020-02-23)
* (foxriver76) removed usage of adapter.objects
* (Haba) Fix of the response for the "callback_query" event

### 1.5.1 (2020-02-09)
* (bluefox) Invalid parameters were checked

### 1.5.0 (2020-02-03)
* (bluefox) Added voice calls 

### 1.4.7 (2019-12-27)
* (Apollon77) Make compatible with js-controller 2.3

### 1.4.6 (2019-12-09)
* (bluefox) Allowed writeOnly states in telegram

### 1.4.4 (2019-11-27)
* (bluefox) New sendTo message "ask" was added (see [Question](#question) )

### 1.4.3 (2019-02-21)
* (BuZZy1337) Bugfix for not yet completely implemented feature

### 1.4.2 (2019-02-18)
* (BuZZy1337) fix for recipients containing withespaces
* (BuZZy1337) change loglevel of "getMe" info-messages to debug
* (bluefox) fix scroll in firefox

### 1.4.1 (2019-01-12)
* (simatec) Support for Compact mode

### 1.4.0 (2019-01-06)
* (bluefox) Custom settings for states were added

### 1.3.6 (2018-12-01)
* (Apollon77) fix #78

### 1.3.5 (2018-11-04)
* (BuZZy1337) Fix a small error caused by previous commit

### 1.3.4 (2018-11-04)
* (BuZZy1337) Ask if saved users should be wiped when password is changed.

### 1.3.3 (2018-11-03)
* (BuZZy1337) Show warning if no password is set.

### 1.3.2 (2018-10-28)
* (BuZZy1337) Just minor cosmetic fixes/changes

### 1.3.1 (2018-10-08)
* (bluefox) The ability of enable/disable of states controlling was added

### 1.3.0 (2018-09-19)
* (BuZZy1337) Added possibility to delete authenticated users in the Adapter-Config screen (via Messages tab)
* (BuZZy1337) fixed a problem "building" the Blockly sendto block when no adapter instance exists.

### 1.2.7 (2018-08-29)
* (BuZZy1337) Added "disable notification" checkbox to blockly block.
* (BuZZy1337) Added "parse_mode" selector to blockly block.

### 1.2.6 (2018-07-30)
* (BuZZy1337) Added support for sending Messages to Group-Chats via Blockly.

### 1.2.5 (2018-07-11)
* (BuZZy1337) Added possibility to specify more than one recipient. (separated by comma)

### 1.2.4 (2018-06-02)
* (BuZZy1337) remove HTML Tags from Logerror-Messages
* (Apollon77) fix misleading error when setting a value for a state

### 1.2.3 (2018-04-26)
* (Osrx) Added Socks5 settings to config dialog on machines running admin 2.

### 1.2.2 (2018-04-25)
* (kirovilya) Changed library for Proxy Socks5

### 1.2.1 (2018-04-17)
* (Haba) Added support for Proxy Socks5.

### 1.2.0 (2018-03-21)
* (AlGu) Possibility to define polling interval in configuration wizard. Default is 300ms.

### 1.1.4 (2018-03-20)
* (BasGo) Added checks before accessing non-existing options

### 1.1.3 (2018-03-19)
* (BasGo) Fixed issue preventing adapter to terminate correctly
* (BasGo) Fixed issue with wrong callback query id

### 1.1.2 (2018-03-16)
* (BasGo) Reworked configuration and translation

### 1.1.1 (2018-01-26)
* (Haba) New objects: botSendChatId, botSendMessageId

### 1.1.0 (2018-01-24)
* (bluefox) Possibility to send photo, video, document, audio as buffer.

### 1.0.11 (2018-01-23)
* (Haba) Sending an image without intermediate caching

### 1.0.10 (2018-01-18)
* (Haba) Updating for Admin3

### 1.0.9 (2017-11-27)
* (kirovilya) Allow send gif via sendDocument

### 1.0.8 (2017-10-03)
* (Haba1234) initPolling() this is deprecated. -> startPolling()
* (Haba1234) Add log polling_error and webhook_error.

### 1.0.7 (2017-09-27)
* (Haba) New function: deleteMessage. Update version lib node-telegram-bot-api

### 1.0.6 (2017-07-19)
* (Haba) Fix an incorrect order of writing variables

### 1.0.5 (2017-07-18)
* (Haba) inline keyboard and new functions: answerCallbackQuery, editMessageText, editMessageReplyMarkup

### 1.0.4 (2017-06-22)
* (dwm) Fix longitude and latitude

### 1.0.3 (2017-05-24)
* (bluefox) Fix position message

### 1.0.2 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.0.1 (2016-11-04)
* (bluefox) Show user name in error message

### 1.0.0 (2016-10-31)
* (bluefox) server mode with web hooks

### 0.4.4 (2016-10-12)
* (bluefox) support of blockly

### 0.4.3 (2016-08-28)
* (bluefox) filter out double messages

### 0.4.2 (2016-08-22)
* (bluefox) translations
* (bluefox) configurable restarting/started texts

### 0.4.1 (2016-07-29)
* (bluefox) response to chatId and not to userId
* (bluefox) cut messages with @
* (bluefox) add new states: requestChatId and requestUserId

### 0.4.0 (2016-07-21)
* (bluefox) allow send messages to chats via chat-ID
* (bluefox) support of video(mp4), audio, document, location, sticker, action

### 0.3.0 (2016-05-31)
* (bluefox) restart connection every hour

### 0.2.4 (2016-05-08)
* (bluefox) replace "_" with " " when sending to text2command

### 0.2.3 (2016-05-04)
* (bluefox) replace "/" with "#" when sending to text2command

### 0.2.2 (2016-04-14)
* (Jonas) fix unload

### 0.2.1 (2016-04-13)
* (Jonas) fix configuration and send to more than one user

### 0.2.0 (2016-04-12)
* (bluefox) add send photo possibility

### 0.1.0 (2016-02-20)
* (bluefox) fix double responses.
* (bluefox) inform about new start

### 0.0.2 (2016-02-15)
* (bluefox) fix error with sendTo

### 0.0.1 (2016-02-13)
* (bluefox) intial commit

## License

The MIT License (MIT)

Copyright (c) 2016-2020, bluefox <dogafox@gmail.com>

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