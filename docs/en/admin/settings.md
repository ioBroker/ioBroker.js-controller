---
title: system settings
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/settings.md
hash: HYarezHAWRhXZbF1hN5OhZczzLtpbYD7YG/A8Z6cEF4=
---
# The system settings
The system settings can be accessed from any menu item of the Admins via the wrench icon in the title bar of the screen.

![The system settings](../../de/admin/media/ADMIN_Settings_main.png)

The system settings are distributed over several subpages:

## Main settings
The main settings set basic parameters for ioBroker, which are also used by the adapters in ioBroker.

Some parameters are already taken from the settings of the host.

** ** System Language

This allows you to choose between different system languages. It may be that not all languages are fully supported yet.

** Temperature unit **

this value is used by some adapters. Possible is °C or °F.

**Currency**

Currently, this does not use an adapter

** Date format **

choose how the date should be displayed in admin and vis.

** decimal **

Comma or dot for float values

** Standard History Instance **

By default, the data is logged into this instance and used in the charts of flot and rickshaw.

If only one history adapter (SQL / History / InfluxDB) is installed, it will be used. If there are several, you can choose one.

** Active repository **

Here the desired repository is selected from the pulldown menu from which the version of the adapter is to be installed. The pull-down menu provides the repositories listed on the "Repositories" subpage

## Repositories
![The repositories](../../de/admin/media/ADMIN_Settings_repos.png)

ioBroker can get the adapter list from different sources. The following sources are listed during installation:

* default (= stable): http://download.iobroker.net/sources-dist.json
* latest (latest versions): http://download.iobroker.net/sources-dist-latest.json

If other repositories are entered here from an older installation, they should be deleted as they are no longer maintained.

## Certificates
![Certificates](../../de/admin/media/ADMIN_Settings_certificates.png)

Here is the central place for the certificates used for the SSL / HTTPS communication. The certificates are used by admin, web, simple-api, socketio. By default, standard certificates are installed. You can not verify anything with that. They are only for SSL communication. Because the certificates are open you should use your own (self-signed) certificates, buy the right certificates or switch to Let's Encrypt. The communication with default certificates is not secure and if someone has the goal to read the traffic, this could be done. Be sure to install your own certificates.
For example under linux.

Certificates can either be specified as a path or uploaded completely via drag and drop

## Let's Encrypt
![Let's Encrypt](../../de/admin/media/ADMIN_Settings_letsencrypt.png)

Let's Encrypt is a free, automated and open source certificate authority of the independent Internet Security Research Group (ISRG).

For more information about Let's Encrypt, see [here](https://letsencrypt.org/).

Some installations use Dynamic DNS or similar. to reach your own domain via an address assigned from there. IoBroker supports the automatic request and renewal of certificates at Let's Encrypt Organization.

The option to use the free allowances from Let's Encrypt exists in almost every adapter that can launch a web server and support HTTPS.

If you enable the option to use certificates, but not the automatic update, the corresponding instance will try to work with stored certificates.

When automatic updates are enabled, the instance will try to request certificates from Let's Encrypt and update them automatically.

The certificates are requested the first time the corresponding address is called for the first time. That if you e.g. Configuring "sub.domain.com" as the address and then calling https://sub.domain.com will request the certificates for the first time, which may take a while before the response comes.

Issuing the certificates is a complex procedure, but if you follow the explanation below it should be easy to get the free certificates.

**Method:**

A new account with the entered email address must be created (Setup in the system settings)

A random key is generated as a password for the account.

When the account is created, the system opens a small website on port 80 to confirm the address.

Let's encrypt always uses port 80 to check the address.

If port 80 is already being used by another service, point 4 will come to fruition - so assign another port to the other service!

When the small web server is started, the request for the certificates for the specified addresses in the system settings is sent to the Let's encrypt server.

The Let's Encrypt server sends back a challenge phrase in response to the request and after a while tries to read the challenge phrase at http:// yourdomain: 80 / .well-known / acme-challenge /.

When the server gets this challenge phrase back from our site, the Let's Encrypt server sends the certificates. These are stored in the directory that is entered in the system settings.

This sounds complex, but all you have to do is activate a few checkboxes and enter the email address and the web address in the system settings.

The certificates received are valid for approximately 90 days. After these certificates have been issued for the first time, another task is started which automatically extends the validity.

This topic is quite complex and thousands of things can go wrong. If this does not work, it is recommended to use the IoT adapter for on-the-go access.

Let's Encrypt works only with a node.js version> = 4.5

## Access rights
![access rights](../../de/admin/media/ADMIN_Settings_zugriffsrechte.png)

In this subpage, the access rights for different areas can be defined for all users / groups

## Statistics
![statistics](../../de/admin/media/ADMIN_Settings_statistics.png)

So that we have a little overview of the installations (adapters used) and the geographical distribution, we would be very happy if we get this information.

You can send different types of information. This scope can be selected on the left.

On the right side will be displayed, in which form these data will be sent.
These data are evaluated absolutely anonymously.