![Logo](admin/fitbit-api.png)
# ioBroker.fitbit

This adapter pulls Data from fitbit API!

## Configuration
![step1](img/step1.png)

Press "Authorize" button.

After that you could be asked to enter your credentials again or if the browser cache is still consist the cookies, it could be done automatically.

![step2](img/step2.png)

![step3](img/step3.png)

![step4](img/step4.png)

Then `access token` and `refresh token` will appear. They are read-only.

If the process does not work for you, you can try to get the access token manually: https://dev.fitbit.com/apps/oauthinteractivetutorial

## Multiple users
To read the data for multiple users (e.g. family members) you must clear the cookies in browser and create additional instance of this adapter.

Important: If you will not clear the browser cookies, you will be logged in with the last valid user. 

## Development
The API was implemented according to https://dev.fitbit.com/build/reference/web-api/basics/

## Changelog

### 0.1.1 (2019-11-06)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright 2019, bluefox <dogafox@gmail.com>

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
