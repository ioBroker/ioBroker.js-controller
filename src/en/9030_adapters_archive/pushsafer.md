
# Adapter - Pushsafer

Pushsafer make it easy and safe to get push-notifications in real time on your Android or Windows mobile device, iPhone, iPad and Desktop! Offers solutions for many case studies, for example: home automation alerts, ip camera motion detection, server monitoring, sheduled reminder and everything else you want to be reminded. Send notifications to single devices or to device groups. You can set up your push notification by changing title, message, icon, sound & vibration! We also provide a eMail and URL generator to make the setup fast and easy! Visit [https://www.pushsafer.com](https://www.pushsafer.com) for more information! Test Pushsafer for free! <span style="line-height: 1.5;"></span>

<table>

<tbody>

<tr>

<td style="width: 50%;">

## <span id="_Information">Information</span>

</td>

<td style="width: 50%;"></td>

</tr>

<tr>

<td style="width: 50%;">**actual Version**</td>

<td style="width: 50%;">![Admin Version](http://download.iobroker.net/img/pushsafer.svg)</td>

</tr>

<tr>

<td style="width: 50%;">**Prerequisites**</td>

<td style="width: 50%;"> -/-</td>

</tr>

<tr>

<td style="width: 50%;">**Developer**</td>

<td style="width: 50%;"> Bluefox</td>

</tr>

<tr>

<td style="width: 50%;">**Keywords**</td>

<td style="width: 50%;"> Messaging</td>

</tr>

<tr>

<td style="width: 50%;">**Github**</td>

<td style="width: 50%;">![icon_link](http://www.iobroker.net/wp-content/uploads/icon_link.png) [Link](https://github.com/ioBroker/ioBroker.pushsafer)</td>

</tr>

<tr>

<td style="width: 50%;">**Platform**</td>

<td style="width: 50%;"></td>

</tr>

<tr>

<td style="width: 50%;">**License**</td>

<td style="width: 50%;">MIT</td>

</tr>

</tbody>

</table>

Configuration First of all it is required an account on pushsafer with a [private key](https://www.pushsafer.com/). ![Pushsafer configuration](https://github.com/ioBroker/ioBroker.pushsafer/raw/master/img/Screen0.png)

## Usage

To send notification from ScriptEngine just write:

<pre>// send notification to all instances of pushsafer adapter
sendTo("pushsafer", "message body");

// send notification to specific instance of pushsafer adapter
sendTo("pushsafer.1", "message body");

// To specify subject or other options
sendTo("pushsafer", {
m:  'Test text',   // mandatory - your text message
t:    'SweetHome', // optional  - your message's title, otherwise your app's name is used
d:    '12',        // optional  - a device id or device group id (empty or a = all devices)
s:    '2',         // optional  - a number betwenn 0-28 (see pushsafers API description)
i:    '2',         // optional  - a number betwenn 1-98 (see pushsafers API description)
v:    '0'          // optional  - a number betwenn 0-3 (see pushsafers API description)
});
</pre>

You can find API description [here](https://www.pushsafer.com/en/pushapi)