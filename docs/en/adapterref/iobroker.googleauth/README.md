<img src="admin/logo-google.svg" alt="Logo" width="100" height="100">

# ioBroker.googleauth

[![NPM version](http://img.shields.io/npm/v/iobroker.googleauth.svg)](https://www.npmjs.com/package/iobroker.googleauth)
[![Downloads](https://img.shields.io/npm/dm/iobroker.googleauth.svg)](https://www.npmjs.com/package/iobroker.googleauth)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9c7ca543cf1b48a8837cc14adb50a264)](https://www.codacy.com/manual/armin.junge.81/ioBroker.googleauth?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Vertumnus/ioBroker.googleauth&amp;utm_campaign=Badge_Grade)

[![NPM](https://nodei.co/npm/iobroker.googleauth.png?downloads=true)](https://nodei.co/npm/iobroker.googleauth/)

This adapter is an extension on the [web adapter](https://github.com/ioBroker/ioBroker.web). It enables you to login with your Google account. 
To extend the login page with an appropriate "Sign in with Google" Button, use the web extension adapter [weblogin](https://github.com/Vertumnus/ioBroker.weblogin).

Of course the extension is only useful, if you have activated the authentication at your ioBroker web server.

## Configuration

### Google API

First of all, you need to create an application in the [Google Developers Console](https://console.developers.google.com/).
This way you get a *client id* and a *client secret*, which you need to make the Google Sign In work.
You can find a [Guide](https://developers.google.com/identity/protocols/oauth2/web-server) at Google Developers Page.
But, here you get a shortened guidance:

1. Open [Google Developers Console](https://console.developers.google.com/) (if needed, login with your Google Account)
2. Select your prefered project or create a new one
3. Go to the Credentials page
4. Click **Create credentials > OAuth client ID**
5. Select the **Web application** application type
6. Give your application a name (e.g. ioBroker)
7. Specify an authorized redirect URI

   * You need the used protocol (http or https)
   * your host name (e.g. iobroker.example.com)
   * your used port (e.g. 8090)
   * and the fixed route /login/google/cb
     > Full Example: _https://iobroker.example.com:8090/login/google/cb_

After the creation of the application you get the *client id* and *client secret*, which you need in the next step.

> __Hints to authorized redirect URI__
>
> You can use several redirect URIs. The only thing which is always the same, is the fixed route /login/google/cb.
> The localhost is also allowed. You can use it for test purposes on your local system.
> But in general you need a host name with a top level domain (like .com or .org), so you need to configure a fitting name for your ioBroker server in your network like: iobroker.mynetwork.net.

### Adapter

There are three fields you have to fill out.

__Extended web adapter__

Here you can choose the instance of the web adapter you want to extend by the Google Authentication.
Default is All instances.

__Client ID__

In this field you have to specify the *client id* from your application you created in the step before.

__Client Secret__

In this field you have to specify the *client secret* from your application.

## Usage

To use this extension in a meaningful manner, it is recommanded to use also the [weblogin adapter](https://github.com/Vertumnus/ioBroker.weblogin).
It provides on the login page of the web server a checkbox named **First time login with Account** and
the button **Sign in with Google**, if configured accordingly.

> Otherwise you have to manage it by your own to make the google authentication work.

If you sign in with your Google Account the first time, you have to check on the **First time** checkbox and
you have to specify your *username* and *password*. This is necessary to associate your Google Account to your
user profile in ioBroker. Instead of the **Log in** button you must push the **Sign in with Google** button.

After this first time login, on further logins, you only need to push the **Sign in with Google** button.

> If you are currently not logged in into your Google Account, you will be redirected to Google to log in.

## License
MIT License

Copyright (c) 2021 [Armin Junge](mailto:armin.junge.81@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.