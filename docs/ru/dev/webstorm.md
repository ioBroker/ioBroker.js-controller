---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/webstorm.md
title: WebStorm
hash: 6XXAKFYtzFKrNxvp9WAx9BNY5RT24ZKXH9/SJBTKVJ0=
---
# WebStorm
На этой странице мы покажем, как установить и настроить среду разработки ioBroker.
WebStorm используется для основной разработки, возможно, Nodeclipse является альтернативной IDE.
Эта документация похожа на «кулинарную книгу», но без объяснения Javascript, NodeJS, HTML5 и т. Д.

Не стесняйтесь расширять следующую информацию.

## Скачайте и установите WebStorm в Ubuntu 14.04
Перейдите на веб-страницу из [JetBrains](https://www.jetbrains.com/webstorm/download/) и загрузите WebStorm для вашей ОС. Мы сосредоточимся на Ubuntu 14.04.
Перейдите в каталог загрузки и переместите файл в каталог / opt с помощью «mv WebStorm-9.0.3.tar.gz / opt /». Разархивируйте / распакуйте его "tar xvzf WebStorm-9.0.3.tar.gz. Откройте" WebStorm-139.1112 / bin "и введите" ./webstorm.sh ". Возможно, вам нужно установить Java JDK ...

### Установить Java JDK
** Этот шаг не требуется в Windows **

```
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

### Установить NodeJS
1. `sudo apt-get install nodejs` (не делайте` `` sudo apt-get install node```, потому что узел не является nodejs)
2. Создайте псевдоним "узел" с помощью `` `sudo ln -s / usr / bin / nodejs / usr / bin / node```

## Загрузка новейших исходников ioBroker и импорт в проект WebStorm
1. Откройте терминал и перейдите в каталог / opt.
2. Создайте новый каталог с помощью «mkdir iobroker» и затем выполните «cd iobroker»
3. Установите iobroker с помощью «npm install iobroker»
4. Протестируйте его с помощью «cd node_modules / iobroker.js-controller /» и введите «chmod + x iobroker», а затем «node controller.js»
5. Откройте браузер с помощью «http:// localhost: 8081», вы должны увидеть экран приветствия ioBroker.

  ![](../../en/dev/media/WelcomeScreen.png)

6. Перейдите в окно терминала и введите `ctrl + c`, чтобы прервать ioBroker.

## Настройте WebStorm для запуска и отладки ioBroker
1. Откройте WebStorm с помощью `. / Webstorm.sh`
2. Нажмите «Файл ->« Новый проект из существующих файлов ... »
3. Выберите следующее ...

  ![](../../en/dev/media/CreateNewProject01.png)

4. Выберите каталог ioBroker ... (щелкните правой кнопкой мыши каталог, чтобы установить корневой каталог проекта)

   ![](../../en/dev/media/CNP03.png)

5. Ваш новый WebStorm-проект должен выглядеть так ...

  ![тестовое задание](../../en/dev/media/NewProject01.png)

### Создать "Run Configuration" ioBroker
1. Перейдите в «Выполнить» -> «Изменить конфигурацию ...»

![](../../en/dev/media/RC01.png)

2. Выберите «+» и добавьте NodeJS Config, как на картинке ниже ...

![](../../en/dev/media/RunConfigIoBroker.png)

## Как запустить ioBroker из WebStorm
1. Запустите ioBroker, выбрав ...

    ![](../../en/dev/media/RunIobroker01.png)

2. Вы можете спросить себя, как остановить ioBroker? Откройте Терминал внутри WebStorm и введите ...

    ![](../../en/dev/media/TerminalRun01.png)

## Как отладить адаптер ioBroker
В этой главе мы увидим, как отлаживать адаптер ioBroker, например, «iobroker.hmm».
Сначала запустите ioBroker, как упоминалось ранее, пожалуйста, не используйте «режим отладки». Используйте для ioBroker только «режим запуска».
Установите адаптер, например, ioBroker.hmm, из командной строки, например, ![](../../en/dev/media/CLIinstallHMM01.png)

Настройте WebStorm «Настройки отладки» ...
![](../../en/dev/media/DebugSettingsHMM01.png)

Перейдите на веб-страницу ioBroker http:// localhost: 8081 и установите адаптер iobroker.hmm: ![](../../en/dev/media/InstallHMMfromWeb01.png)

После установки адаптера мы должны отключить экземпляр адаптера ...
![](../../en/dev/media/DisableHMMWeb011.png)

... далее ![](../../en/dev/media/DisableHMMWeb01.png)

... в конце вы должны увидеть этот результат: ![](../../en/dev/media/DisableHMMWeb02.png)

Теперь вернемся к WebStorm. Давайте откроем файл hmm.js и установим точку останова, подобную этой: ![](../../en/dev/media/WebstormBreakpointsHMM01.png)

Начните обманывать адаптер iobroker.hmm: ![](../../en/dev/media/WebstormDebugHMM01.png)

Когда вы останавливаетесь на первой точке останова, вы можете управлять следующими шагами: 1) возобновить программу 2) перейти: ![](../../en/dev/media/DebugHMM02.png)