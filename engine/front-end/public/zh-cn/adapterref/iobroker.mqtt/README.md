---
BADGE-Number of Installations: http://iobroker.live/badges/mqtt-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.mqtt.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.mqtt.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.mqtt.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.mqtt.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.mqtt/edit/master//README.md
title: MQTT Broker/Client
hash: PbGM2rozhJS0bXlZoofD+4U/t2XSm4gwwAoilEvHfAk=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: This adapter allows to send and receive MQTT messages from ioBroker and to be a broker
keywords: notification, MQTT, message
readme: https://github.com/ioBroker/ioBroker.mqtt/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2014-11-28T14:42:57.910Z
version: 2.0.4
---
![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/MQTT)

＃MQTT服务器和客户端
##说明
[MQTT](http://mqtt.org/)（消息队列遥测传输）是一种轻量级协议，用于设备之间的通信（M2M  - 机器到机器）。
它使用模型发布者 - 订阅者通过TCP / IP协议发送消息。
协议的核心部分是MQTT服务器或代理，可以访问发布者和订阅者。这个协议非常原始：一个简短的标题，没有完整性（这就是为什么传输是在TCP之上实现的），并没有对结构，编码或数据库模式施加任何限制。每个数据包中数据的唯一要求 - 它们必须伴随标识符信息通道。此标识符规范称为主题名称。

MQTT协议需要数据代理。这是该技术的核心理念。所有设备仅向代理发送数据，并仅从他那里接收数据。在收到数据包后，代理会根据订阅将其发送到网络上的所有设备。要使设备从代理获取内容，它必须订阅主题。主题在订阅时或在包含此主题的包裹到达时动态出现。通过订阅主题，您可以放弃。因此，主题是组织不同类型关系的便利机制：一对多，多对一和多对多。

**重点：**

*设备本身与代理建立通信，它们可能位于NAT后面，并且没有静态IP地址，
*您可以使用SSL加密流量，
* MQTT代理允许您通过端口80上的WebSocket协议连接到它们，
*可以通过订阅彼此的消息来互连不同的经纪人。

##安装
安装位于[管理系统](http://www.iobroker.net/?page_id=4179&lang=en)的** Driver **标签页上。
在驱动程序组** Network **中找到一行名为** MQTT Adapter **的行，然后按下该行右侧带有加号图标的按钮。

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_1.png)

您将看到一个弹出窗口驱动程序安装，安装后，它将自动关闭。

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_2.png)

如果一切顺利，在**设置驱动程序**选项卡上会出现** mqtt.0 **安装的驱动程序实例。

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_3.png)

＃＃ 设置
如上所述，MQTT协议意味着代理和客户端。 ioBroker服务器可以充当代理和客户端。
设置以指定操作模式 - 类型（服务器/代理或客户/订户）考虑每个选项。

### IoBroker作为MQTT-broker工作
如果您打算使用服务器/代理，则基本设置如下图所示：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_4.png)

* **用WebSockets** - 如果需要使用WEB套接字进行连接，则必须安装此选项，TCP-server将与WebSocket服务器并行运行，
* **端口**  -  TCP上连接的端口（默认为1883），WebSocket服务器（见上面的选项）在端口+1上运行（默认值：1884），
* **SSL** - 如果要加密所有流量（TCP或WebSocket），则使用此选项，因此必须指定证书 - 只需从预设列表中选择（在系统设置中指定，请参阅[系统管理驱动程序说明]（http://www.iobroker.net/?page_id=4179&lang=en）），
* **身份验证设置**（用户名和密码） - 如果需要，指示特定的用户身份验证，此设置始终与SSL加密选项一起使用（不通过不安全的连接以明文形式传输密码），
* **掩码私有值**  - 模板（或几个逗号分隔）来过滤变量ioBroker，它们将被发送到客户端，你可以使用特殊字符来指定一组消息（例如，`memRSS，mqtt .0`  - 可以传输所有驱动程序的所有变量内存状态和所有** mqtt.0驱动程序**实例变量），
* **仅发送更改**  - 只有在更改变量（如果状态只是更新 - 值未更改，客户消息将不会被发送）的情况下，才会向客户端发送数据将被接受任何消息，即使该值没有改变，
* **在启动时提供私有值**  - 对于每个成功的客户端连接将被转移到所有已知状态（由掩码状态定义） - 为了告诉客户端有关ioBroker的当前状态，
* **发布状态订阅**  - 在订阅之后立即将其发送到其签名变量的客户值（在第一次启动或重新启动时，客户端将收到其签名的变量值，可以用于初始化变量），
* **所有值的前缀**  - 如果指定的值，它将作为前缀添加到每个发送的主题，例如，如果指定iobroker /，则按以下行发送所有主题：`iobroker / mqtt / 0 / connected`，
* **每次更改的输出日志**  - 在日志文件中将显示每次更改的调试信息，
* **不仅要发送命令，还要发送状态（ack = true）**  - 如果此选项未激活，客户端将仅发送ack = false的变量/命令，如果设置了标志，则变量将无论ack的状态如何转移（false / true），
* **主题名称的最大长度**  - 主题描述的最大字符数，包括服务。

例如，考虑基于[arduino董事会](https://www.arduino.cc/)的客户端之间的数据交换，并且代理是mqtt.0驱动程序系统ioBroker的实例。

*  - 客户 - 开发[arduino UNO]的费用（https://www.arduino.cc/en/Main/ArduinoBoardUno）+ [以太网盾]（https://store.arduino.cc/product/A000072）基于W5100芯片，
*  - 使用以太网板使用标准[库]（https://www.arduino.cc/en/Reference/Ethernet）来处理MQTT库[Pubsubclient]（https://github.com/knolleary/ pubsubclient）
*  -  AM2302传感器（温度和湿度）连接到pin_8，用于调查使用的库，DHTlib和[DHTlib]（https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib）资源github.com，
* - led **led_green** 接到pin_9，控制离散模式开/关
*  -  broker  -  ioBroker系统驱动程序mqtt。

格式化数据交换主题：

*`example1 / send_interval`  - 客户端签名以更改温度读数和湿度的传输间隔（以秒为单位的int值），
*`example1 / temp`  - 客户端使用DHT22传感器（浮点型）发布指定的温度间隔，
*`example1 / hum`  - 客户端使用DHT22传感器（浮动型）发布指定的湿度值间隔，
*`example1 / led`  - 客户端订阅了led的状态更改（文本打开/关闭或0/1或true / false）。

驱动程序设置如下：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_5.png)

通过TCP连接（不需要WebSocket），默认端口1883 \。本地网络中的客户端，因此不需要加密流量和验证用户。我们将仅发送自客户端在发送间隔指示和指示状态上签名后的更改以获取有关更新的信息（不更改值）到变量没有意义。要发布订阅 - 请注意此选项，就像您首次连接（或断开连接后）客户端时一样，他必须知道签名的变量的状态（当前发送间隔以及LED是否为打开）。设置为发送变量ack = true或false也值得注意，因为变量（对客户端签名）可以更改任何驱动程序/脚本/ VIS，并且应该将任何更改发送到客户端。 arduino板的完整代码如下所示：

<pre> //连接库

＃包括
＃包括
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib //网络字节mac []的设置= {0xAB，0xBC，0xCD，0xDE，0xEF，0x31}; byte ip [] = {192,168,69,31}; // arduino board IP address byte mqttserver [] = {192,168,69,51}; // ioBroker服务器IP地址
EthernetClient ethClient; void callback（char *topic，byte* payload，unsigned int length）; PubSubClient客户端（mqttserver，1883，回调，ethClient）;

//全局变量

#define LED_pin 9 unsigned int send_interval = 10; //向服务器发送指示的间隔，默认为10秒无符号长，last_time = 0; //定时器dht DHT的当前时间;
#define DHT22_PIN 8 char buff [20];
//传入连接的处理函数 - 在订阅void回调上接收数据（char * topic，byte * payload，unsigned int length）{Serial.println（“”）; Serial.println（ “-------”）; Serial.println（“MQTT-broker的新回调”）; //让我们将主题（主题）和值（有效负载）转换为行有效负载[length] ='\ 0'; String strTopic = String（topic）; String strPayload = String（（char *）payload）; //在订阅时从服务器“到达”的研究:: //查询间隔的变化if（strTopic ==“example1 / send_interval”）{int tmp = strPayload.toInt（）; if（tmp == 0）{send_interval = 10; } else {send_interval = strPayload.toInt（）;控制LED如果（strTopic ==“example1 / led”）{if（strPayload ==“off”|| strPayload ==“0”|| strPayload ==“false”）digitalWrite（LED_pin，LOW） ）; if（strPayload ==“on”|| strPayload ==“1”|| strPayload ==“true”）digitalWrite（LED_pin，HIGH）; } Serial.print（strTopic）; Serial.print（“”）; Serial.println（strPayload）; Serial.println（ “-------”）; Serial.println（ “”）; }

void setup（）{Serial.begin（9600）; Serial.println（ “开始......”）; //启动网络连接Ethernet.begin（mac，ip）; Serial.print（“IP：”）; Serial.println（Ethernet.localIP（））; //初始化输入/输出端口，注册起始值pinMode（LED_pin，OUTPUT）; digitalWrite（LED_pin，LOW）; //当LED熄灭时}

void loop（）{//如果MQTT连接处于非活动状态，那么我们尝试设置它并发布/订阅if（！client.connected（））{Serial.print（“Connect to MQTT-boker ...”）; //连接并发布/订阅if（client.connect（“example1”））{Serial.println（“success”）; //来自传感器的值if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example1 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example1 / temp”，buff）; } //订阅查询间隔client.subscribe（“example1 / send_interval”）; //订阅LED控制变量client.subscribe（“example1 / led”）; } else {//如果没有连接，我们等待10秒再试一次Serial.print（“Failed，rc =”）; Serial.print（client.state（））; Serial.println（“再试10秒钟”）;延迟（10000）; } //如果连接处于活动状态，则以指定的时间间隔将数据发送到服务器} else {if（millis（）＆gt;（last_time + send_interval * 1000））{last_time = millis（）; if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example1 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example1 / temp”，buff）; //检查订阅client.loop（）上的传入连接; } </ pre>

经纪人部分的结果（温度和湿度数据以预设时间段更新）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_6.png)

客户端的结果（传入数据订阅输出到控制台进行调试）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_server4.jpg)

### IoBroker作为MQTT客户端工作
对于作为客户端/订户获得的MQTT驱动程序实例 - 您需要选择适当的配置类型。
在这组选项中会略有变化：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_4.png)

* **连接设置**  - 指定代理的URL和端口（如果要加密流量，表示SSL） - 连接到代理的设置，
* **身份验证设置**  - 用户名和密码，如果代理需要身份验证（使用SSL以避免以明文形式传输密码是合适的），
* **模式**  - 客户订阅的变量的掩码（变量代理），值以逗号分隔，＃（pound）用于表示集合，
* **屏蔽私有值**  - 应该发布的过滤变量（客户端变量），其值以逗号分隔，用于表示集合使用符号*（星号），
* **仅发送更改**  - 客户端将仅发布更改值的变量（根据掩码），
* **在启动时提供私有值**  - 如果选中此选项，则<span id="result_box" lang="en"><span title="在开始时发布所有状态 - 每次通过连接建立发布所有状态（由状态掩码定义）以宣布自己的可用状态及其值。">每次建立连接时</span></span>将<span id="result_box" lang="en"><span title="在开始时发布所有状态 - 每次通过连接建立发布所有状态（由状态掩码定义）以宣布自己的可用状态及其值。">发布所有状态（根据掩码），以声明可用变量及其值，</span></span>
* **所有值的前缀**  - 如果指定的值，它将作为前缀添加到每个已发布的主题中，例如，如果指定client1 /，则所有主题将发布为以下行：`client1 /的JavaScript / 0 / cubietruck`，
* **每次更改的输出日志**  - 在日志文件中将显示每次更改的调试信息，
* **不仅要发送团队，还要发送状态（ack = true）**  - 如果未选中此选项，则代理仅发送带有ack = false的变量/命令，如果要注意将发送的选项对所有数据，无论ack = true或ack = false，
* **主题的最大长度**  - 主题描述的最大字符数，包括服务。

设置订阅掩码变量（模式）的示例。考虑主题：

*“运动”
*“运动/网球”
*“运动/篮球”
*“运动/游泳”
*“体育/网球/决赛”
*“体育/篮球/总决赛”
*“运动/游泳/决赛”

如果要订阅某组主题，可以使用字符＃（井号）或+（加号）。

*“运动/网球/＃”（仅订阅“运动/网球”和“运动/网球/决赛”）
*“运动/网球/ +”（仅限订阅“体育/网球/总决赛”，但不包括“运动/网球”）

对于JMS主题，如果要订阅所有主题“总决赛”，可以使用字符＃（井号）或+（加号）

*“体育/＃/总决赛”
*“运动/ + /决赛”

对于MQTT主题，如果要订阅所有主题“Finals”，可以使用+（加号）

*“运动/ + /决赛”

例如，考虑两个系统ioBroker之间的数据交换。 BananaPi-Board有一个工作系统ioBroker（IP地址192.168.69.51），它从上面的例子中以服务器/代理模式启动了MQTT-驱动程序。
在上面的示例中，服务器连接从传感器DHT22发布数据的客户端 - 温度和湿度，以及间隔测量传输的签名变量和状态指示（启用/禁用）。
Board Cubietruck上的第二个操作系统ioBroker，它将以客户端/用户模式运行MQTT驱动程序。
他注册代理的温度和湿度变量（反过来，从另一个客户端接收）并将发布所有脚本变量 - [电池的状态](http://www.iobroker.net/?page_id=4268&lang=ru#_Li-polLi-ion)board（仅更改）。客户端配置将类似于以下内容：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_7.png)

连接类型 - 客户/订户指示代理和端口的IP地址（默认为1883）。
不需要流量加密和身份验证。

订阅掩码（模式） - `mqtt/0/example1/hum,mqtt/0/example1/temp` - 客户端仅在温度和湿度下订阅（由逗号分隔的值，不带空格）。

屏蔽数据以供发布 - `javascript.0.cubietruck.battery.*` - 发布组`battery`driver`javascript.0`中的所有脚本变量`cubietruck`。

仅发送更改 - 发送状态变量电池（如果值未更改则无意义发送）。要在启动时提供私有值 - 启动驱动程序时，客户端将立即根据掩码释放所有变量 - 即使它们为null或为在代理中创建变量为空。

要使用ack = false发送数据，变量可以使用电池更新的驱动程序javascript，因此它们始终为ack = false。客户端工作的结果（另一个客户的温度和湿度数据 - 见上面的例子）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_9.png)

经纪人的结果（电池客户端的状态数据）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_11.png)

##应用程序 -  MQTT网关协议 -  ModBus RTU
驱动程序MQTT可用作各种协议的网关，以将新设备连接到系统ioBroker或任何其他设备。 arduino板是开发此类解决方案的普遍基础。在网络中有许多示例，库和最佳实践。一个庞大的社区正在使用这些控制器，系统集成了各种设备/设备/设备。

例如，考虑常见的工业协议ModBus。在ioBroker系统中有一个驱动程序可以使用它 - 版本ModBus TCP（通过以太网）。一组传感器，控制器和执行器在RS-485 Network / 232和ModBus RTU协议上物理工作。
为了集成它们，可以应用MQTT网关 - 基于arduino平台的ModBus RTU。考虑一个例子。

<span style="text-decoration: underline;">**有一个温度和湿度传感器**</span> （用于基于arduino pro迷你板DHT22传感器的测试），通过ModBUS RTU输出数据：

*端口UART（可以使用MAX485芯片转换RS-485接口）运行在9600，带选项8E1（1个起始位，8个数据位，1个偶校验位，1个停止位），
* ModBus的地址 -  10，
*温度地址0值乘以10（读取器功能3），
*湿度 - 地址1值乘以10（读取功能3），
* PWM LED地址2值0 ... 1023检查记录功能（写入功能6）。

连接方案：

Fritzing的![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus1.jpg)

arduino pro mini控制器代码产生以下内容：

<pre>

#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
#include //https://code.google.com/archive/p/simple-modbus/
#include //https://github.com/PaulStoffregen/MsTimer2 // modbus寄存器枚举{TEMP，HUM，PWM，TEST，HOLDING_REGS_SIZE};
#define ID_MODBUS 10 //从设备的modbus地址unsigned int holdingRegs [HOLDING_REGS_SIZE]; // modbus寄存器阵列//温湿度传感器DHT22 dht DHT;
#define DHT22_PIN 2
#define LED 9 // LED连接到PWM引脚-9 void setup（）{//配置modbus modbus_configure（＆Serial，9600，SERIAL_8E1，ID_MODBUS，0，HOLDING_REGS_SIZE，holdingRegs）; holdingRegs [TEST] = -157; //用于测试负值//初始化定时器2秒钟更新温度和湿度寄存器中的数据MsTimer2 :: set（2000，read_sensors）; MsTimer2 ::开始（）; //运行定时器pinMode（LED，OUTPUT）; // LED端口初始化} //由定时器每2秒启动的函数void read_sensors（）{if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{如果传感器DHT22的数据设法被读取//我们写入整数值在湿度保持寄存器中[HUM] = 10 *DHT.humidity; //我们在温度寄存器中写入整数值holdRegs [TEMP] = 10* DHT.temperature; } else {//如果没有成功从传感器DHT22读取数据，我们在寄存器holdRegs [HUM] = 0中写入零; holdingRegs [TEMP] = 0; void loop（）{modbus_update（）; // modbus数据更新//来自LED控制寄存器的数据传输到PWM（位移2位）analogWrite（LED，holdingRegs [PWM] >> 2）; } </ pre>
要测试操作代码和架构，您可以连接到端口串行板（例如，使用USB-UART转换器）和一个特殊的程序来采访，只需使用ModBus RTU接口制作温度传感器和湿度。
因为调查可以使用，例如，[qmodbus](http://qmodbus.sourceforge.net/)或任何其他程序。

设置：

 - 端口（从列表中选择哪个端口连接到串行Arduino板）;
 - 速度和其他参数 -  9600 8E1;
 - 从站ID：10，读取：功能号3读取保持寄存器，起始地址：0，寄存器数量：3，
 -  slave id：10，记录：功能No.6写单个寄存器起始地址：2，

阅读时程序中的答案应大致如下：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus2.jpg)

记录时程序中的答案：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus3.jpg)

<span style="text-decoration: underline;">**现在配置网关本身并将其连接到iobroker **</span>

该网关将基于带有以太网屏蔽的平台arduino MEGA 2560  - 客户端MQTT，代理 - 一个实例mqtt.0 ioBroker系统驱动程序。
选择MEGA 2560是因为在该板上分别有多个UART端口为零串行0（pin_0（RX）和pin_1（TX））或简单串行 - 用于输出调试消息，串行1（pin_19（RX） ）和pin_18（TX）） - 通过ModBus从站。

*客户 - 基于W5100芯片开发arduino MEGA 2560 +以太网屏蔽的费用;
*使用以太网板使用[标准库]（https://www.arduino.cc/en/Reference/Ethernet）

  使用MQTT库[Pubsubclient](https://github.com/knolleary/pubsubclient);

*用于modbus使用库[SimpleModbus]（https://code.google.com/archive/p/simple-modbus/）版本大师的调查;
*调查UART端口（只需连接RX端口主机，TX端口从机和TX端口主机，RX端口从机），不使用传输控制端口（用于RS-485）;
*端口设置：速度9600,8.14;
*从设备10的地址，读取数字3的功能（读取保持寄存器），记录功能号。 6（写单寄存器）;
*经纪人 -  ioBroker系统驱动程序mqtt。

格式化数据交换主题：

*`modbusgateway / send_interval`  - 客户端签名以更改温度读数和湿度的传输间隔（以秒为单位的int值），
*`modbusgateway / temp`  - 客户端以给定的间隔发布温度传感器DHT22（float类型）的值，
*`modbusgateway / hum`  - 客户端以给定的间隔发布湿度传感器DHT22（float类型）的值，
*`modbusgateway / led`  - 客户端订阅了led的状态变化（PWM控制值0 ... 1024）。

С连接图看起来像这样：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus6.jpg)

对于从主设备通电的测试从设备。反过来，Master将从正在调试的USB端口（Serial0）工作。
驱动程序设置如下：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

通过TCP连接（不需要WebSocket），默认端口1883 \。本地网络中的客户端，因此不需要加密流量和验证用户。我们将仅发送自客户端在发送间隔指示和指示状态上签名后的更改以获取有关更新的信息（不更改值）到变量没有意义。要发布订阅 - 请注意此选项，就像您首次连接（或断开连接后）客户端时一样，他必须知道签名的变量的状态（当前发送间隔以及LED是否为打开）。设置为发送变量ack = true或false也值得注意，因为变量（对客户端签名）可以更改任何驱动程序/脚本/ VIS，并且应该将任何更改发送到客户端。 arduino板的完整代码如下所示：

<pre class=""> //连接库

＃包括
＃包括
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
//网络字节mac []的设置= {0xAB，0xBC，0xCD，0xDE，0xEF，0x31}; byte ip [] = {192,168,69,31}; // arduino board IP address byte mqttserver [] = {192,168,69,51}; // ioBroker服务器IP地址EthernetClient ethClient; void callback（char *topic，byte* payload，unsigned int length）; PubSubClient客户端（mqttserver，1884，回调，ethClient）; //全局变量unsigned int send_interval = 10; //向服务器发送指示的间隔，默认为10秒无符号长，last_time = 0; //定时器dht DHT的当前时间;

#define DHT22_PIN 8 char buff [20];
//传入连接的处理函数 - 在订阅void回调上接收数据（char * topic，byte * payload，unsigned int length）{Serial.println（“”）; Serial.println（ “-------”）; Serial.println（“MQTT-broker的新回调”）; //让我们将主题（主题）和值（有效负载）转换为行有效负载[length] ='\ 0'; String strTopic = String（topic）; String strPayload = String（（char *）payload）; //在订阅上从服务器“到达”的研究：//更改查询间隔if（strTopic ==“example2 / send_interval”）{int tmp = strPayload.toInt（）; if（tmp == 0）{send_interval = 10; } else {send_interval = strPayload.toInt（）; Serial.print（strTopic）; Serial.print（“”）; Serial.println（strPayload）; Serial.println（ “-------”）; Serial.println（ “”）; }

void setup（）{Serial.begin（9600）; Serial.println（ “开始......”）; //启动网络连接Ethernet.begin（mac，ip）; Serial.print（“IP：”）; Serial.println（Ethernet.localIP（））; //初始化输入/输出端口，注册起始值}

void loop（）{//如果MQTT连接处于非活动状态，那么我们尝试设置它并发布/订阅if（！client.connected（））{Serial.print（“Connect to MQTT-boker ...”）; //连接并发布/订阅if（client.connect（“example2”））{Serial.println（“success”）; //来自传感器的值if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example2 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example2 / temp”，buff）; } //订阅查询间隔client.subscribe（“example2 / send_interval”）; } else {//如果没有连接，我们等待10秒再试一次Serial.print（“Failed，rc =”）; Serial.print（client.state（））; Serial.println（“再试10秒钟”）;延迟（10000）; } //如果连接处于活动状态，则以指定的时间间隔将数据发送到服务器} else {if（millis（）＆gt;（last_time + send_interval * 1000））{last_time = millis（）; if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example2 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example2 / temp”，buff）; //检查订阅client.loop（）上的传入连接; } </ pre>

该解决方案可用作自动化系统中的原型（示例）ModBus网络。来自从站的数据在ioBroker中以所需的间距传输。

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_10.png)

MQTT客户端对ModBus网络上的从设备中所需的变量和重定向进行了签名。

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus5.jpg)

##应用程序 - 连接移动客户端
最近，由于流量的简单性，经济性以及针对不同平台的良好库的精心制作，MQTT协议变得非常普遍。
有许多程序可以在移动设备上使用MQTT，例如[物联网MQTT仪表板](https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=en)。
使用此程序，您可以连接到本地网络或Internet中的MQTT代理。

考虑一个例子，在代理的角色中将是ioBroker系统，使用MQTT连接客户端 - 应用程序IoT MQTT Dashboard。

在此示例中，我们控制光控制器[MegaD-328](http://www.ab-log.ru/smart-house/ethernet/megad-328)，它使用驱动程序[MegaD](http://www.iobroker.net/?page_id=4052&lang=en)连接到ioBroker。
控制大厅中的继电器（MegaD端口** P7 **）灯，一个特殊的脚本，由端口状态签名 - 按钮** P0 **和MQTT变量状态** mqtt.0.remotectrl.light .hall **，将发布移动客户端。
此脚本切换绑定到交换机（端口P7）的端口的状态，即反转它。

事实证明，每次按下按钮，电气连接到端口** P0 **捕获**真**状态）并且每次发布变量** mqtt.0.remotectrl.light.hall** 如** ****，端口** P7** 开或关闭灯。
脚本的文本如下：

<pre> //通过MegaD控制器的按钮p0端口控制大厅中的照明，驱动程序实例megad.0 on（{id：&#39;megad.0.p0_P0&#39;，更改：&#39;any&#39;}，函数（obj）{ if（obj.newState.val！= =&#39;&#39;|| typeof obj.newState.val！= =“undefined”）{if（obj.newState.val == = true）{if（getState（&#39;megad.0。 p7_P7&#39;）。val == = true）{setState（&#39;megad.0.p7_P7&#39;，false）;} else {setState（&#39;megad.0.p7_P7&#39;，true）;}}}}）; //在大厅中对照明的控制是远程的MQTT主题“mqtt.0.remotectrl.light.hall”on（{id：&#39;mqtt.0.remotectrl.light.hall&#39;，更改：&#39;any&#39;}，功能（obj）{if（obj.newState.val！= =&#39;&#39;|| typeof obj.newState.val！= =“undefined”）{if（obj.newState.val == = true）{if（getState（&#39; megad.0.p7_P7&#39;）。val == = true）{setState（&#39;megad.0.p7_P7&#39;，false）;} else {setState（&#39;megad.0.p7_P7&#39;，true）;}}}}）; </pre>

将按钮和灯泡连接到MegaD控制器：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_mobile1.jpg)

MQTT驱动程序设置：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

移动客户端可以将数据发布到变量mqtt.0.remotectrl.light.hall并注册实际端口状态MegaD  -  megad.0.p7_P7。

配置发布和订阅：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile3.png)

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile4.png)

总共一个通道灯控制转动控制窗口（发布）和订阅窗口是一个真实条件光继电器（用于反馈）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile5.png)

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile6.png)

##应用程序 - 使用云服务器
上述示例具有若干缺点。首先，并不总是移动客户端可能与服务器ioBroker位于同一本地网络上，其次，即使您在Internet中实现端口转发并保护连接，也不一定是服务器本身ioBroker可以接受传入连接（位于NAT后面，无法访问设置）。在全球网络中，支持MQTT的许多不同服务 - 付费和免费，例如发送天气数据，地理定位等。某些服务可以充当MQTT协议代理，并且可以用作网关（网桥）从全球ioBroker输出数据网络，或在ioBroker中获取数据。作为一个例子，考虑捆绑的工作：

*服务器/经纪人 - 服务[cloudmqtt.com]（https://www.cloudmqtt.com/）（有免费关税），
*客户/订户 - 可访问互联网的ioBroker系统，发布温度和湿度数据（参见[上例]（http://www.iobroker.net/?page_id=6435&lang=en#ioBroker_working_as_MQTT-broker）），发布端口的真实状态** P7-P13 **继电器驱动器MegaD** megad.0 **- 灯光控制），订阅远程灯光控制的属性（驱动程序的实例mqtt** mqtt.0 * *），
*客户/订户 - [物联网MQTT仪表板]（https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=en）远程工作的应用 - 订阅温度传感器数据和湿度，订阅端口的真实状态** P7-P13 **继电器驱动程序MegaD** megad.0 **，发布遥控灯的变量（驱动程序实例** mqtt.0** 。

结果是以下结构：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_cloud1.jpg)

捆绑驱动程序** mqtt.1 **（代理） - Arduino UNO +以太网+ DHT22（客户端），如[上面的例子](http://www.iobroker.net/?page_id=6435&lang=en#ioBroker_working_as_MQTT-broker)，稍作修改。
配置mqtt ** driver.1 **的实例：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

arduino平台的代码：

<pre class=""> //连接库

＃包括
＃包括
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
//网络字节mac []的设置= {0xAB，0xBC，0xCD，0xDE，0xEF，0x31}; byte ip [] = {192,168,69,31}; // arduino board IP address byte mqttserver [] = {192,168,69,51}; // ioBroker服务器IP地址EthernetClient ethClient; void callback（char *topic，byte* payload，unsigned int length）; PubSubClient客户端（mqttserver，1884，回调，ethClient）; //全局变量unsigned int send_interval = 10; //向服务器发送指示的间隔，默认为10秒无符号长，last_time = 0; //定时器dht DHT的当前时间;

#define DHT22_PIN 8 char buff [20]; //传入连接的处理函数 - 在订阅void回调上接收数据（char * topic，byte * payload，unsigned int length）{Serial.println（“”）; Serial.println（ “-------”）; Serial.println（“MQTT-broker的新回调”）; //让我们将主题（主题）和值（有效负载）转换为行有效负载[length] ='\ 0'; String strTopic = String（topic）; String strPayload = String（（char *）payload）; //在订阅上从服务器“到达”的研究：//更改查询间隔if（strTopic ==“example2 / send_interval”）{int tmp = strPayload.toInt（）; if（tmp == 0）{send_interval = 10; } else {send_interval = strPayload.toInt（）; Serial.print（strTopic）; Serial.print（“”）; Serial.println（strPayload）; Serial.println（ “-------”）; Serial.println（ “”）; }
void setup（）{Serial.begin（9600）; Serial.println（ “开始......”）; //启动网络连接Ethernet.begin（mac，ip）; Serial.print（“IP：”）; Serial.println（Ethernet.localIP（））; //初始化输入/输出端口，注册起始值}

void loop（）{//如果MQTT连接处于非活动状态，那么我们尝试设置它并发布/订阅if（！client.connected（））{Serial.print（“Connect to MQTT-boker ...”）; //连接并发布/订阅if（client.connect（“example2”））{Serial.println（“success”）; //来自传感器的值if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example2 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example2 / temp”，buff）; } //订阅查询间隔client.subscribe（“example2 / send_interval”）; } else {//如果没有连接，我们等待10秒再试一次Serial.print（“Failed，rc =”）; Serial.print（client.state（））; Serial.println（“再试10秒钟”）;延迟（10000）; } //如果连接处于活动状态，则以指定的时间间隔将数据发送到服务器} else {if（millis（）＆gt;（last_time + send_interval * 1000））{last_time = millis（）; if（DHT.read22（DHT22_PIN）== DHTLIB_OK）{dtostrf（DHT.humidity，5,2，buff）; client.publish（“example2 / hum”，buff）; dtostrf（DHT.temperature，5,2，buff）; client.publish（“example2 / temp”，buff）; //检查订阅client.loop（）上的传入连接; } </ PRE>

工作的结果 - **mqtt.1** 动对象：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_12.png)

现在让我们将发布/订阅数据设置到云端。首先，在网站上注册[cloudmqtt.com](https://www.cloudmqtt.com/)，选择所需的费率，创建实例，获取设置：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud4.jpg)

为了更高的安全性，最好创建一个单独的用户，假设它将是用户** iobroker **，密码为** 1234 **。
授予用户读取和写入任何主题的权限：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud5.jpg)

接下来将mqtt **driver.0** 实例设置为连接为客户端/订阅者云代理和发布/订阅列表：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_8.png)

*连接类型 - 客户/订户，
*连接设置 - 指定在控制面板[cloudmqtt.com]（https://www.cloudmqtt.com/）中发布的URL，端口将使用** 22809 **，与** SSL **一起使用，
*在身份验证选项中指定用户名和密码，
*模式 - 我们的客户端ioBroker将在云中的所有主题上签名，因此您在此处指定数字符号（**＃**），您可以使用掩码来有选择地订阅，
*特征值客户端的掩码将发布到服务器**温度/湿度**和所有端口megaD（具有中继P7-P13的端口）的状态，此字段用逗号分隔指定所需的变量：** mqtt.1 .example2.hum，mqtt.1.example2.temp，megad.0.p7_P7，megad.0.p8_P8，megad.0.p9_P9，megad.0.p10_P10，megad.0.p11_P11，megad.0.p12_P12，megad .0.p13_P13 **，
*只发送更改 - 打勾，只发布更改，
*在开始时提供自己的值 - 只需指定创建主题，
*不仅要发送命令，还要发送状态（ack = true） - 应该注意设置温度/湿度更新驱动程序mqtt（ack = true）。

保存设置，确保建立连接（在控制面板上[cloudmqtt.com](https://www.cloudmqtt.com/)观察日志服务器）。
一段时间后，将出现数据（在面板链接** WebsocketUI **）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud7.jpg)

最后，它仍然只是配置移动客户端，例如[物联网MQTT仪表板](https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=en)。
创建一个新连接：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud8.png)

创建出版主题（例如，大厅照明 - 端口** P7 ** MegaD）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud9.png)

然后创建主题订阅（温度，湿度，端口**灯P7 ** MegaD）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud10.png)

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud11.png)

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud12.png)

最后，您的仪表板可能如下所示：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud13.png)

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud14.png)

在移动设备上创建出版物之后，在驱动程序实例** mqtt.0 **系统中，ioBroker应该出现可变光控制，应该在脚本中用于照明控制（参见[上面的例子](http://www.iobroker.net/?page_id=6435&lang=en#Application_8211_connecting_mobile_clients)）：

![](zh-cn/adapterref/iobroker.mqtt/../../../en/adapterref/iobroker.mqtt/img/mqtt_13.png)

恭喜！现在您可以通过云服务控制系统ioBroker并接收数据！

## Changelog
### 2.0.6 (2019-01-16)
* (SchumyHao) Add Chinese support

### 2.0.5 (2019-01-12)
* (simatec) Support for Compact mode

### 2.0.4 (2018-12-01)
* (Apollon77) Subscribe to topics after connect

### 2.0.3 (2018-08-11)
* (bluefox) Prefix in server was corrected

### 2.0.2 (2018-08-09)
* (bluefox) Behaviour of "set" topics was changed

### 2.0.1 (2018-07-06)
* (bluefox) Double prefix by client was fixed

### 2.0.0 (2018-03-05)
* (bluefox) broke node.js 4 support
* (bluefox) remove mqtt-stream-server
* (bluefox) partial mqtt5 support

### 1.5.0 (2018-03-05)
* (bluefox) The patch for wifi-iot removed
* (bluefox) the mqtt library updated
* (bluefox) implement QoS>0

### 1.4.2 (2018-01-30)
* (bluefox) Admin3 settings are corrected

### 1.4.1 (2018-01-13)
* (bluefox) Convert error is caught
* (bluefox) Ready for admin3

### 1.3.3 (2017-10-15)
* (bluefox) Fix sending of QOS=2 if server

### 1.3.2 (2017-02-08)
* (bluefox) Fix convert of UTF8 payloads
* (bluefox) optional fix for chunking problem

### 1.3.1 (2017-02-02)
* (bluefox) Update mqtt packages
* (bluefox) add Interval before send topics by connection ans send interval settings
* (bluefox) reorganise configuration dialog

### 1.3.0 (2017-01-07)
* (bluefox) Update mqtt packages
* (bluefox) configurable client ID

### 1.2.5 (2016-11-24)
* (bluefox) Fix server publishing

### 1.2.4 (2016-11-13)
* (bluefox) additional debug output

### 1.2.1 (2016-11-06)
* (bluefox) fix publish on start

### 1.2.0 (2016-09-27)
* (bluefox) implementation of LWT for server
* (bluefox) update mqtt package version

### 1.1.2 (2016-09-13)
* (bluefox) fix authentication in server

### 1.1.1 (2016-09-12)
* (bluefox) do not parse JSON states, that do not have attribute "val" to support other systems

### 1.1.0 (2016-07-23)
* (bluefox) add new setting: Use different topic names for set and get

### 1.0.4 (2016-07-19)
* (bluefox) convert values like "+58,890" into numbers too

### 1.0.3 (2016-05-14)
* (cdjm) change client protocolID

### 1.0.2 (2016-04-26)
* (bluefox) update mqtt module

### 1.0.1 (2016-04-25)
* (bluefox) Fix translations in admin

### 1.0.0 (2016-04-22)
* (bluefox) Fix error with direct publish in server

### 0.5.0 (2016-03-15)
* (bluefox) fix web sockets
* (bluefox) fix SSL

### 0.4.2 (2016-02-10)
* (bluefox) create object "info.connection"
* (bluefox) add reconnection tests

### 0.4.1 (2016-02-04)
* (bluefox) fix error with states creation

### 0.4.0 (2016-01-27)
* (bluefox) add tests
* (bluefox) client and server run

### 0.3.1 (2016-01-14)
* (bluefox) change creation of states by client

### 0.3.0 (2016-01-13)
* (bluefox) try to fix event emitter

### 0.2.15 (2015-11-23)
* (Pmant) fix publish on subscribe

### 0.2.14 (2015-11-21)
* (bluefox) fix error with wrong variable names 

### 0.2.13 (2015-11-20)
* (Pmant) fix error with wrong variable name 

### 0.2.12 (2015-11-14)
* (Pmant) send last known value on subscription (server)

### 0.2.11 (2015-10-17)
* (bluefox) set maximal length of topic name
* (bluefox) convert "true" and "false" to boolean values

### 0.2.10 (2015-09-16)
* (bluefox) protect against empty topics

### 0.2.8 (2015-05-17)
* (bluefox) do not ty to parse JSON objects

### 0.2.7 (2015-05-16)
* (bluefox) fix test button

### 0.2.6 (2015-05-16)
* (bluefox) fix names if from mqtt adapter

### 0.2.5 (2015-05-15)
* (bluefox) subscribe to all states if no mask defined

### 0.2.4 (2015-05-14)
* (bluefox) add state "clients" to server with the list of clients

### 0.2.3 (2015-05-14)
* (bluefox) fix some errors

### 0.2.2 (2015-05-13)
* (bluefox) fix some errors with sendOnStart and fix flag sendAckToo

### 0.2.0 (2015-05-13)
* (bluefox) translations and rename config sendNoAck=>sendAckToo
* (bluefox) lets create server not only on localhost

### 0.1.8 (2015-05-13)
* (bluefox) fix topic names in server mode
* (bluefox) implement subscribe
* (bluefox) update mqtt package

### 0.1.7 (2015-03-24)
* (bluefox) create objects if new state received
* (bluefox) update mqtt library

### 0.1.6 (2015-03-04)
* (bluefox) just update index.html

### 0.1.5 (2015-01-02)
* (bluefox) fix error if state deleted

### 0.1.4 (2015-01-02)
* (bluefox) support of npm install

### 0.1.2 (2014-11-28)
* (bluefox) support of npm install

### 0.1.1 (2014-11-22)
* (bluefox) support of new naming concept

### 0.1.0 (2014-10-23)
* (bluefox) Update readme
* (bluefox) Support of authentication for server and client
* (bluefox) Support of prefix for own topics

### 0.0.2 (2014-10-19)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox<dogafox@gmail.com>

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