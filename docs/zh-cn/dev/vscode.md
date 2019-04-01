---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/vscode.md
title: VS代码
hash: TXXU7i+WiRe1zmhlQuotwhVoN2pG5nBo/BtK1Ue6Jto=
---
#VS代码
使用基于ioBroker.template适配器的Microsoft Visual Studio代码（VSCode）进行ioBroker Adapter开发

！>欢迎更正，添加和更改！

创建纪录片时没有任何VSCode与node.js / ioBroker一起使用的经验。如果程序需要改进，我很感激任何提示。

绊脚石：如果某人仍然“卡住”并需要更深入的信息，请打开一个问题，以便补充和完善纪录片。

示例中的适配器名称是** iobroker.template-master-mhe **。

##模板
ioBroker模板适配器：[https://github.com/ioBroker/ioBroker.template](https://github.com/ioBroker/ioBroker.template)

##在以下环境中测试
 -  ioBroker，在本地安装
 -  ioBroker.js-controller：1.0.0
 -  node.js：v6.10.2
 -  npm：3.10.10
 -  Windows 10教授
 -  VSCode 1.12.1

##包含有关适配器开发的一般信息和VSCode的相关信息
 -  [ioBroker论坛：使用VSCode调试适配器]（http://forum.iobroker.net/viewtopic.php?f=20&t=4564&p=61310&hilit=visual+studio+code#p44156）
 -  [Github上的ioBroker适配器模板]（https://github.com/ioBroker/ioBroker.template#iobrokertemplate）
 - 关于德语适配器开发的一般信息：[Apoon77]的[ioBroker AdapterDev用户会议2017.pdf] [http://forum.iobroker.net/download/file.php?id=11259]（http：//forum.iobroker。净/ memberlist.php？模式=视图轮廓＆U = 378）。
 -  [ioBroker适配器开发文档]（https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation）
 -  [使用Webstrom IDE作为示例开始使用适配器开发]（https://github.com/ioBroker/ioBroker/wiki/Installation,-setup-and-first-steps-with-an-ioBroker-Development-Environment）

##一般过程 - 为适配器使用模板
### 1.下载模板
 -  [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate）
     - 有点1.）运行，例如：解压缩文件夹中的模板并保存

### 2.在文件夹中运行“npm install”
 - 在模板的副本中安装所需的npm mopdule
 - 在模板文件夹中新创建文件夹节点模块
 -  [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate）
     - 有点2.）运行

### 3.执行grunt //更改现有项目中模板中的设置
 -  [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate）
     - 有点3.）运行
 - 如果grunt尚不存在，请全局安装
 - 在终端执行：

```
grunt rename --name=template-master-mhe --email=iobroker@digheim.de --author="Michael Herwig"
```

 -  Adaptername，作者和电子邮件地址将通过代码中必要位置的grunt进行更改

### 4.在VSCode中加载适配器文件夹
 - 自定义文件夹名称。在iobroker.template-master-mhe中的ioBroker.template-master示例中
 -  VSCode：打开文件/文件夹//或** CTRL + K，CTRL + O **

### 5.在VSCode中调整了模板的版本（从0.5.0到0.0.2）
 - 在io-package.json中由0.5.0更改为0.0.2 //由ioBroker使用
 - 在npm使用的package.json //中从0.5.0更改为0.0.2

### 6.复制到ioBroker并调整路径/名称
 -  **路径：** ... / iobroker / node_modules
 -  **姓名：** ioBroker.template-master-mhe
 -  [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate）
 - 有点5.）

### 7.在VSCode中关闭文件夹
 -  VSCode：文件/文件夹关闭//或** CTRL + K F **

### 8. ioBroker / Admin  - >更新
 - 单击ioBroker Admin GUI中的“更新”

### 9.适配器挑出并添加实例
 - 按下适配器上的plus上的ioBroker Admin GUI

![SCREENSHOT：您自己的适配器的实例](../../de/dev/media/Instanz-installieren.png)

 - 安装并显示适配器的实例

![SCREENSHOT：您自己的适配器的实例](../../de/dev/media/Adapterinstanz.png)

 - 停止调试已安装的适配器

### 10.在VSCode中打开ioBroker的已安装文件夹
 -  VSCode：打开文件/文件夹//或** CTRL + K，CTRL + O **
 - **.. / node_modules / iobroker.template-master-mhe** 择
 - 现在，您可以在此处开发和调试适配器

---

##调试
### 1.）VSCode launch.json自定义
适用于所有适配器，设置

 - **SHIFT + CTRL + P** 然后输入：> debug launch.json
 - 或通过编辑器GUI：在甲虫上，然后在齿轮顶部

![SCREENSHOT：launch.json的VSCode配置](../../de/dev/media/VSCode_launch.json.png)

launch.json调试ioBroker适配器的设置：

```javascript
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Programm starten",             // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "program": "${workspaceRoot}/main.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "An den Prozess anfügen",       // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "address": "127.0.0.1",                 // Adresse, an dem der node.js Prozess läuft (bei Remote Debug, der Remote-Rechner)
            "port": 5858                            // Port, auf dem der node.js Debugger lauscht, der mit node --debug-brk ... gestartet wird
        }
    ]
}
```

 -  **也可以在远程ioBroker上进行远程调试**。然后必须从127.0.0.1调整IP地址。

### 2.）打开终端并启动调试器
 - ** CTRL +ö** //打开集成终端（组合键取决于操作系统和VSCode版本）

 - 停止终端中新安装的适配器

cd / opt / iobroker iobroker stop template-master-mhe

 - 在终端中启动调试器（因为必须首先通过SSH在终端中建立远程调试）：

        node --debug  -  brk node_modules / iobroker.template  -  master  -  mhe / main.js --force  -  logs

    其中** iobroker.template-master-mhe **是适配器的名称。

在集成终端中显示（注意：也可以使用外部终端程序）：

``` cmd
PS C:\ioBroker> node --debug-brk node_modules/iobroker.template-master-mhe/main.js --force --logs
Debugger listening on [::]:5858
```

![SCREENSHOT：启动VSCode调试器](../../de/dev/media/VSCode_Debugger_starten.png)

启动调试器后在终端中输出：

``` cmd
starting. Version 0.0.2 in C:/ioBroker/node_modules/iobroker.template-master-mhe, node: v6.10.2
config test1: true
config test1: 42
stateChange template-master-mhe.0.testVariable {"val":true,"ack":false,"ts":1494753342714,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
ack is not set!
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
check group user admin group admin: false
check user admin pw ioboker: true
stateChange template-master-mhe.0.testVariable {"val":null,"ack":true,"ts":1494753367809,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753367809}
```

 - 在终端中使用** CTRL + C **取消

停止调试器后终端输出：

``` cmd
cleaned everything up...
terminating
cleaned everything up...
PS C:\ioBroker>
```

 - 转到VSCode中的Debug，在Debugging下选择“Append to process”并启动
 - 输出在集成终端的终端选项卡中执行
 - 在终端中使用CTRL + C取消

---

##体验
 - 模板的适配器图标已调整（重命名）为Grunt，但未在ioBroker / Admin中显示
 - 适配器发布后将显示正确的图标

---

### Todo
 - 将VSCode与Github一起使用
 - 单独适配器上的示例
 - 澄清：只能使用node.js> 6.x或4.x进行调试吗？

---

###网络中的文档
####到Visual Studio代码
 -  [VSCode基础知识]（https://www.microsoft.com/technet/know-how/visual-studio-code-01-the-basics.aspx）

####到node.js
####到Git＆Github
 -  [Git Book  -  Git Free Basic Guide]（https://git-scm.com/book/en/v1）
 -  [Git for Windwos  - 下载页面]（https://git-scm.com/download/win）

---

##一般提示和技巧
### SSH与Windows
 -  [Git for Windwos  - 下载页面]（https://git-scm.com/download/win）安装bash，你可以在openSSH的帮助下使用ssh。

---

##杂项
 - 我在VSCode的settings.json中的设置：

```
// Platzieren Sie Ihre Einstellungen in dieser Datei, um die Standardeinstellungen zu überschreiben.
{
    "window.zoomLevel": 0,
    "editor.minimap.enabled": true,                 // zeigt die kleine Codeübersichtskarte rechts neben dem Code an
    "editor.dragAndDrop": true,                     // ermöglicht markierte Codeteile per Drag und Drop zu verschieben0
    "workbench.editor.closeOnFileDelete": false,
    "files.autoSave": "afterDelay",                 // Auotmatisches Speichern der Dateien einstellen
    "files.autoSaveDelay": 1000,                    // Autosave nach 1000 ms
    "[javascript]": {},                             // Einstellungen für die SPrache "Javascript"
    "telemetry.enableCrashReporter": false,         //
    "workbench.colorTheme": "Quiet Light",          // Farbschema des Editors
    "telemetry.enableTelemetry": false,
    "workbench.iconTheme": "vs-seti",               // Icons für bekannte Dateieendungen. Wenn ja, welches Icon-Set soll verwendet werden
    "javascript.implicitProjectConfig.checkJs": true
}
```