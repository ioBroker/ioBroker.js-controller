![Logo](admin/rssfeed-logo.png)

# ioBroker Adapter to request and show RSS Feeds of different standands (Atom, RSS, RDF)

[![Number of Installations](http://iobroker.live/badges/rssfeed-installed.svg)](https://github.com/oweitman/ioBroker.rssfeed)
[![NPM version](http://img.shields.io/npm/v/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
[![Travis](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)](https://travis-ci.org/oweitman/ioBroker.rssfeed/)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)](https://ci.appveyor.com/project/oweitman/iobroker-rssfeed)
[![GitHub issues](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)](https://github.com/oweitman/ioBroker.rssfeed/issues)


## Overview
Adapter to request and show RSS Feeds of different standands (Atom, RSS, RDF)

## Installation
The adapter is currently only available on github.
Repository name is https://github.com/oweitman/iobroker.rssfeed

## Add an Instance
After Installation the adapter should then be displayed in the adapter section in the iobroker.
Sometimes it happens that the changes are not visible, especially with web changes (widgets / configuration dialog), the following command may have to be executed on the command line:

```
iobroker upload rssfeed
```

In the right area in the line of the adapter, an instance can be added using the plus button

## Configuration
The configuration is relatively easy. There are only a few fields

| Setting                           | description                                                                                                           |  
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |  
| Refresh                           | is the general specification of how often the feed should be called up again in minutes. The default is 60 minutes    |  
| Maximum items in the data point   | The total amount of data to be processed can be limited here.                                                         |  

Then for each new feed:

| Setting                           | description                                                                                       |  
| --------------------------------- | ------------------------------------------------------------------------------------------------- |  
| Name                              | A unique name, must not appear twice                                                              |  
| Url                               | The full address of the feed (with http: // or https: //, see examples below)                     |  
| Refresh                           | A different value can be specified for this feed. Otherwise the general specification is taken    |  

If you saved and closed the configuration, the feed-data can be found as a JSON data point in the object tree.

## vis and widgets
The following widgets actually exists
#### RSS view widget
Widget to display a feed. This can be found via the search filter in vis using rssfeed.

The widget has the following setting options

rss_oid The JSON data point of the desired feed is selected here. I have noticed that the object browser does not always work satisfactorily since it tries to display the HTML parts contained in the JSON.
Alternatively, copy the data point ID directly from vis.
template: A template can be entered here, which can contain javascript and html mixed.

maxarticles: Here the widget can be individually limited to the number of articles.

All other settings are identical to the other widgets. The format specifications generally apply to all widget content
#### RSS meta helper widget
A widget to view all the meta attributes in the feed
this widgets helps you to find the right attribute to select in the template.
#### RSS article helper widget
A widget to view all the attributes of an article
This widgets helps you to find the right attribute of an article to select in the template.
There are the following additional settings
prefix: Name of a javascript variable you want to use in the template. This helps to copy the name directly to the template
article: Number of an article you want to see in the helper.

## Template based on examples
An example that I tested with the following RSS feeds:

* http://www.tagesschau.de/xml/rss2
* https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html

```
<%= meta.title %> 
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

The template system works with certain tags.
The tags used mean the following

| tag   | description                                                           |  
| ----- | --------------------------------------------------------------------- |  
| <%=   | The content of the contained expression / variable will be escaped.   |  
| <%-   | The content of the contained expression / variable is unescaped.      |  
| <%    | No output, is used for enclosed javascript instructions               |  
| %>    | is generally a closing tag to complete one of the previous ones       |  

Everything that is outside of these tags is displayed exactly as it is or if it is HTML interpreted as HTML. (see e.g. the p-tag, div-tag, small-tag
Within the template you have 2 predefined variables available

#### meta 
This contains all meta information about the feed. The following content is available. I think the identifiers are self-explanatory. In the help I will describe them in more detail. or specify the content (some are arrays)
meta.title
meta.description
meta.link
meta.xmlurl
meta.date
meta.pubdate
meta.author
meta.language
meta.image
meta.favicon
meta.copyright
meta.generator
meta.categories

#### articles
Is an array with individual elements (javascript array). Each element has the following properties.
So that it fits, for example, I will do the prefix item in front of it. But if you want you can choose that yourself. It only has to be named accordingly in the loop (forEach). Here, too, the identifiers are self-explanatory. Not all attributes are filled in every feed. The most important ones are already included in the template above.

item.title
item.description
item.summary
item.link
item.origlink
item.permalink
item.date
item.pubdate
item.author
item.guid
item.comments
item.image
item.categories
item.source
item.enclosures

## Template example and detailed description
```
<%= meta.title %> 
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Brief description of what happens in the individual lines  
Z1: The output of the feed title  
Z2: Without output. Javascript command to loop over all articles, with each turn the current element is assigned to the variable item.  
Z3: Output of date and time is. It is enclosed with a p / small tag for formatting. The vis-own date format function is used for formatting. Description can be found in the adapter vis.  
Z4: The output of the article title. A Header 3 - tag is used for formatting.  
Z5: Output of the content of the article. It is  enclosed with a p-tag. Here, at least in the two examples, HTML code is included, which usually comes with an image and descriptive text  
Z6: Output a div tag that clears special formatting in the feed-html (in both examples for tagesschau and bild it is needed. Other feed maybe didnt need it.  
Z7: Without output. This line closed the javascript loop . Everything that was defined between Z2 and Z7 is repeated for every single article.  

## Todo
* ~~Multi widget RSS Feeds~~
* ~~Multi widget marquee~~
* ~~Weitere Datenpunkte im Template verfügbar machen.~~
* ~~Widget für Laufschrift mit den Titeln https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2~~

## Changelog
### 0.0.26
* correct changelog size 
### 0.0.25
* the error messages for the template are improved 
### 0.0.24
* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved 
* marquee3 widget: options to show time and date
### 0.0.23
* republish to npm
### 0.0.22
* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)
### 0.0.21
* add link option to marquee widget
* widget help added 
* marquee widget: the divider characters (default: +++) are configurable
### 0.0.20
* add ejs syntax to template editor
### 0.0.19
* try to fix marquee widget.
### 0.0.18
* try to fix the wrong NoSave dialog
### 0.0.17
* rework setting objects and states
### 0.0.16
* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles
### 0.0.15
* fix bug saving last request in adapter configuration / improve debug messages
### 0.0.14
* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib
### 0.0.13
* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.
### 0.0.12
* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.
### 0.0.11
* improve admin layout
* implement a forceRefresh button
### 0.0.10
* fix bug a bug in marquee widget. not all styles should applied to the span tag.
### 0.0.9
* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.
### 0.0.8
* improve lasrequest logic of the adapter
* fix problem with datapoint naming
### 0.0.7
* test with encapsulation of ejs.js, becaus of error in some browsers
### 0.0.6
* add attribute duration for widget marquee to control animation duration
### 0.0.5
* new widget marquee for article titles
* add filter function for articles. the filter searchs in title,description and categories, seceral filter criteria can be seperated by semicolon
### 0.0.4
* some adjustments in readme, io-package
### 0.0.3
* add addveyor build
### 0.0.2
* added widgets meta helper and article helper
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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