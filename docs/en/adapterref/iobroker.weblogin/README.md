<img src="admin/logo-login.png" alt="Logo" width="100" height="100">

# ioBroker.weblogin

[![NPM version](http://img.shields.io/npm/v/iobroker.weblogin.svg)](https://www.npmjs.com/package/iobroker.weblogin)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weblogin.svg)](https://www.npmjs.com/package/iobroker.weblogin)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d2ff17f2787d4ad4ba0b5d8ad29504ba)](https://www.codacy.com/manual/armin.junge.81/ioBroker.weblogin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Vertumnus/ioBroker.weblogin&amp;utm_campaign=Badge_Grade)

[![NPM](https://nodei.co/npm/iobroker.weblogin.png?downloads=true)](https://nodei.co/npm/iobroker.weblogin/)

This adapter is an extension on the [web adapter](https://github.com/ioBroker/ioBroker.web). 
It enhances the login page by alternative login possibilities (social media logins).
Currently it supports only the [Google Authentication](https://github.com/Vertumnus/ioBroker.googleauth).

Of course the extension is only useful, if you have activated the authentication at your ioBroker web server.

## Configuration

### Extended web adapter

Here you can choose the instance of the web adapter you want to extend by this adapter.
Default is All instances.

### Show first time login checkbox

Activate this checkbox if you need a first time login checkbox on the login page. 
Typically this is needed to associate your social media account of choice with your user profile in ioBroker.
As default it is checked.

### Google

The currently only supported alternative login possibility. If checked, the login page shows a "Sign in with Google" button.
This possibility needs the first time login checkbox. As default it is checked, due to its uniqueness.

## Usage

If this adapter is installed and configured, the web login page shows additional elements.
Depending on the configuration it shows the first time login checkbox and sign in buttons
for your chosen social media logins.

![login page](doc/login-page.jpg)

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