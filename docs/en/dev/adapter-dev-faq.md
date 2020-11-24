# Frequently Asked Adapter Development Questions

## Introduction

The idea of this page is to collect frequently asked questions regarding the development of ioBroker adapters.
This idea was born by Ralf in the ioBroker #adapter Discord channel on 24 November 2020 during a discussion with a question by Mic.

## Please contribute (it's really easy!)

Feel free to add any questions and according answers to this page. The only limitation is: make sure to add a date to the answer. There is no need for perfectionism, just post what helped you in the adapter development. Links to adapters in which the question is implemented are very welcome as well. We developers love to see implementation examples :-)

*Note:* This is not going to be an official documentation. Any hints, workarounds, links to even older forum posts, etc. are welcome. The intention is to quickly support and help developers on frequently asked dev questions. If you have issues in writing in English here, please use your local language like German, Russian, etc., we will be happy to help and translate later.

All easy going here ;)


## FAQ

### Adapter Configuration (admin/index_m.html)

#### Input Validation

**Question:** I would like to validate fields of the adapter configuration by using core adapter methods as well as classes/methods of node.js adapter code. The validation should take place once a user hits "save" in the adapter configuration, which will then call `save()` of `admin/index_m.html`.

**Answer:** You can use the `sendTo()` method for sending the variable `obj` from `admin/index_m.html` to the adapter code, validate the contents there, and then provide the result via callback back to `sendTo()` of `admin/index_m.html`.
<br>Example: This is implemented in adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan).
<br>NOTE: You may need to change your `io-package.json`, see e.g. [ioBroker-Forum: sendTo() funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)
<br>(24-Nov-2020)
