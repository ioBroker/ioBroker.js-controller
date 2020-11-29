---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/iot.md
title: IoT cloud
hash: jjfKTNpzV3FT6m8vQakk62RuZ5Zk3cSskAvM9JhcujQ=
---
# IoT cloud
Origin: https://forum.iobroker.net/topic/17834/ank%C3%BCndigung-weihnachtsaktion-assistenten-service-iobroker-iot-reloaded-alexa-und-services

In order to be able to currently control your devices via Alexa, there is the cloud adapter, which is connected to the free or pro cloud, and the corresponding Alexa skill.
It is currently evident that the structure with dedicated (expensive!) Cloud servers does not really grow with the number of users, and free cloud users in particular are already suffering from having to repeat voice commands. But we also know how important assistants like Alexa are now, that they are often indispensable in everyday life and nobody wants to miss out on comfort.

Therefore a scalable and future-proof way was devised with a lot of effort and that is the IoT service.

The future belongs to the IoT service and the assistant functions (Alexa, Google Home and so on) will probably only be available at ioBroker.pro by the end of 2020 via the IoT service.
ioBroker.net Cloud no longer has support for Alexa and Co services since January 2020.

To ensure that the setup of the IoT instance and the connection to it work, the new wizard license package can only be purchased if a connection has been successfully created, the link is successful and the control of at least one device has also worked.
So don't be surprised that nothing is available in the Pro Cloud account.

Therefore, please follow the updated instructions first:

1. If a pro account does not yet exist, first register an account at https://iobroker.pro/intro.

Otherwise just use the existing pro account.

Newly created accounts have a 7 day "trial version" of the assistant license with a limit of 20,000 requests per month.
A purchased assistant license starts immediately, so no remaining days are taken into account! After the 7 days without purchasing an assistant license, up to 20 requests per day will be transferred free of charge.
Then it's locked for the day.

Existing pro accounts without a license can also test the wizard package for 7 days at the start of the campaign - these 7 days start from the creation of the IoT service user by entering the login data in the IoT adapter.

Pro accounts with an existing assistant or remote access license also have 20,000 requests per month.

2. Then install the ioBroker.IoT adapter (Cloud-IoT connection) from the normal repository - simply filter for "IoT".

In the configuration of the adapter, please enter the login data from https://iobroker.pro (e-mail in lower case and password! No app key or anything!).
The buttons "Receive new connection certificates" or "Create new IoT login information" are only required in the event of errors.

If the IoT adapter is already installed, please check whether updates are available and update to 0.2.2.

![Configuration](../../de/cloud/media/iot_settings.png)

Make all the necessary settings here and check smart devices.
Normally, the same devices should be listed in the IoT adapter as in the previous cloud adapter.
If this is not the case, then you may have defined the devices with the option "Own settings (only per)" for the earlier cloud adapter instance.
Then the devices have to be stored again in IoT! It is also recommended to create groups in the ioBroker IoT adapter rather than on Amazon, since groups on Amazon cause unnecessary traffic because Amazon sends a separate control command for each device!

3. The adapter should now connect to the IoT service and turn green.

If that doesn't work and the adapter e.g. is yellow, then please check the log file and look at the FAQ below.
Restarting the instance can also help.
Mostly it is simple things like wrong login data (Attention: Watch out for upper and lower case letters!)! The error messages in the log have been improved and should now better indicate what the problem is.

If the cloud adapter has been used up to now and only the Alexa control is required, then it is best to deactivate the cloud adapter, as it is no longer needed!

4. After the first connection, an Alexa account with the same password is automatically created.

The iobroker.iot instance must be "green".
(Change: There is no more email with the initial password).
It can happen that the passwords that contain the `#` symbol do not work yet.
The problem is being investigated, so please do not use `#` in the password.

5. It is best to delete the old skill ("ioBroker SmartHome" or "ioBroker.pro") in the Alexa app together with all devices.

Possibly. if the devices are not deleted automatically, this must be done manually!

6. Then install the new "ioBroker.iot" [Skill] (https://www.amazon.de/ioBroker-ioBroker-iot/dp/B07L66BFF9) and click on "Activate".

Then the login mask of the IoT service should appear.
Use the e-mail address of the Pro Cloud account and the initial password here.

** Please write the login in lower case: `MyEmail@gmx.de` is wrong; `myemail@gmx.de` is correct! **

You will then be asked to change the password. From then on, the initial PW is no longer valid, only the new one.
A recommendation is to use the same password as with Pro, as the login to the Pro-Cloud may later be changed to this password (don't worry, we will inform you in advance if this is planned!)

Anyone who already uses IoT services (earlier or with the custom skill) simply logs in directly with their IoT access data when activating the skill.

![Log in](../../de/cloud/media/iot_login.png)

After a successful login, a success message appears and the skill is activated.
If not, please check your login details (especially initial password vs. changed password and so on) and try again.

7. Amazon should now offer you the device search.

After this has run, all devices stored in the IoT adapter should also be found in Amazon.

8. Please check now whether your devices can be switched by voice or the Alexa app.

This step is important and at least one switching action must have been successful before you can continue with the next step!

9. Now go to Amazon and give the skill (because everything worked) 5 stars right away :)

Good reviews (real, of course, this is not a call to fake reviews!) And thus the skill placement also have a certain influence on the costs of the Amazon services that are used by the IoT service!

10. If you have successfully connected the IoT adapter, activated the skill and can successfully control your devices,

You now have to decide whether you want to buy the assistant package as part of the Christmas campaign or whether the 20 inquiries per day might even be enough for you.
If you want to buy the package, please go to https://iobroker.pro in your browser, and log in there with your Pro-Cloud access data.
If you don't see a menu, click on the avatar icon in the upper right corner and select the item "Remote Access" in the menu.

Remote access to admin and the editors does not work with this license!

It is also not possible to update remotely later. That would then be a new purchase of the remote license.

If you need full remote access (including editors) to ioBroker, you can also buy the remote license (at a price of € 4.95 / month or e.g. € 39.95 / year (= € 3.33 / month)), Smart assistant support (Alexa, Google Home) is automatically included there.

You can find an overview of the licenses and functions in the following picture:

![Log in](../../de/cloud/media/iot_compare.png)

The Smart Assistant license costs € 13.80 for 6 months (€ 2.30 per month) and € 21 (€ 1.75 per month) for one year.

It is possible that the prices will still be changed (in both directions), depending on how the more precise operating costs for the necessary infrastructure develop!

So now, have fun trying out the IoT service and of course using it with Alexa.