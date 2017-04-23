## Connection between ioBroker and Alexa

To connect ioBroker to Alexa (Amazon Echo or Echo Dot), the following prerequisites must be fulfilled:

*   IoBroker Cloud account
*   App ID inside the cloud account
*   Cloud adapter installed and configured
*   IoBroker skill enabled within Alexa
*   Connection between ioBroker-Skill and the ioBroker-Cloud
*   Installed web adapter (either installed by VIS, or installed separately)
*   But how does the whole thing actually work? Here we have summarized for you: Functionality

## IoBroker Cloud account and APP ID

On the website https://iobroker.net (Nicht http://www.iobroker.net !!!) create an account: Or, if an account already exists, log on using the "Login" button. Attention: It has been shown that the e-mail address can not contain uppercase letters, since it is not accepted otherwise (example "ioBroker@domain.de" does not go, but "iobroker@domain.de"). 
![](img/alexa-and-iobroker-fast-start_alexa_001_cloud_account.jpg)
 Clicking the "Create APP ID" button creates a unique APP ID. The API key (in this case "testuser_doku_165 ...") is needed later in the cloud adapter - so better record / copy !!! 
![](img/alexa-and-iobroker-fast-start_alexa_003_cloud_account.jpg)
 You can check the function by clicking the "Go to your applications" button 
![](img/alexa-and-iobroker-fast-start_alexa_004_cloud_account_connect.jpg)
 Should not a listing of the views come and instead the following message 
![](img/alexa-and-iobroker-fast-start_alexa_005_cloud_account_connect_fail.jpg)
 This indicates that A) The ioBroker cloud adapter is not (yet) installed, configured, or started B) a firewall, or similar. The connection is blocked

## Configure / configure Alexa

Go to the Alexa website (http://alexa.amazon.de) and add the iobroker skill.   When the "Activate" button is clicked, a window opens in which the logon data for the ioBroker Cloud are queried. 
![](img/alexa-and-iobroker-fast-start_alexa_010b_alexa_skill_login.png)
 After successfully connecting the iobroker skill to the ioBroker cloud, the following success message appears Now in Alexa in the "Smart Home" area can be searched for devices.

## Install and configure the Cloud Adapter in ioBroker

### Basic configuration

Like all other adapters, the Cloud adapter is also installed.

### Settings

In the APP-KEY field, enter the copied app ID from the ioBroker.net website For instance, select the valid / correct instance of the Web adapter (i.d.R. web.0) Cloud URL is prefilled and can be left as it is The choice of certificates and language is up to everyone The point "OFF level for switches" comes first with the (not yet released) version 0.4.1 of the cloud adapter and is ignored here The correct function can then be tested again by calling the https://iobroker.net website and, after logging in, by clicking the "Go to your applications" button (the listing must appear). If this listing does not come, something with the config, etc. does not.

## Integration of devices (from the CCU or other adapter)

### Automatic transfer from the CCU

If the controllable device spaces and trades are assigned in the CCU, they are automatically adopted according to the following scheme: The rooms of the CCU are listed in ioBroker under enum.rooms (in the tabs) The CCU's trades are listed in ioBroker under enum.functions (in the tabs) Only when a device fulfills both criteria, that is, it is located in a space of "enum.rooms" and a "enum.functions" trade, it is automatically added (and grouped) to Alexa.     _**Example:**_ Room = living room Light = light   If the living room has two lamps that can be controlled by HM (in this example, they are even dimmers) and these are also assigned to the "living room" and to the light "light", a device with the name "living room light" is created → "Smart Devices" tab. This device then contains all controllable data points (On, Off, Level, etc.) of the appropriate devices.   In Alexa is exactly this device with the name "living room light" (with a description "group living room light" created.) NO Alexa group is generated, although yes several devices are assigned - for Alexa it is exactly one device and the "group control "Takes place only within ioBroker.   If you now say "Alexa, turn on living room light", Alexa turns on this one device, passing this command over the skill to the ioBroker cloud and from there to the cloud adapter. This again switches all associated data points (in this example 4 data points = 2 dimmers) according to the command (On, Off, x%, etc.). The individual devices (dimmers in the example) can not be controlled in this way - they have been combined into one device, due to the affiliation to the room and to the workstation. In Alexa is exactly this device with the name "living room light" (with a description "group living room light" created.) NO Alexa group is generated, although yes several devices are assigned - for Alexa it is exactly one device and the "group control "Takes place only within ioBroker. If you now say "Alexa, turn on living room light", Alexa turns on this one device, passing this command over the skill to the ioBroker cloud and from there to the cloud adapter. This again switches all associated data points (in this example 4 data points = 2 dimmers) according to the command (On, Off, x%, etc.). The individual devices (dimmers in the example) can not be controlled in this way - they have been combined into one device, due to the affiliation to the room and to the workstation. This function makes sense if you only have one lamp, or always all on / off at the same time - then ioBroker makes everything automatically for one. If you want to be able to specifically control, this function brings nothing.

### Single devices, without group formation in ioBroker, control

To do this, remove all checkmarks in the "Smart enum" tab in the cloud adapter and place each device (for example, lamps) individually in the cloud adapter and group these "real" devices into Alexa. So you can control each lamp individually, but all at the same time (via the group in Alexa). Single devices (data points) in the cloud adapter: These devices then in Alexa: And the grouping in Alexa

## More tips & tricks

### Alexa - General functioning

How does ioBroker and Alexa actually work? This can be read here: How it works

### IoBroker, cloud adapter and Alexa - smartName

Sometimes it may be necessary to add an ioBroker data point to the cloud adapter (ie to Alexa), which can not be added via the admin page of the cloud adapter. This must be done manually. Click here for instructions.

### IoBroker, cloud adapter and Alexa space names

If the space names in ioBroker do not correspond to those in the CCU, you can fix this: Space names do not fit

### Control scenes from the scene adapter

How to control Alexa scenes created using the scene adapter. Control scenes