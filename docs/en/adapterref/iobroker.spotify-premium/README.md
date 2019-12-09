![Logo](admin/spotify-premium.png)
# ioBroker.spotify-premium

![Number of Installations](http://iobroker.live/badges/spotify-premium-installed.svg) ![Number of Installations](http://iobroker.live/badges/spotify-premium-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.spotify-premium.svg)](https://www.npmjs.com/package/iobroker.spotify-premium)
[![Downloads](https://img.shields.io/npm/dm/iobroker.spotify-premium.svg)](https://www.npmjs.com/package/iobroker.spotify-premium)
[![Tests](http://img.shields.io/travis/twonky4/ioBroker.spotify-premium/master.svg)](https://travis-ci.org/twonky4/ioBroker.spotify-premium)

[![NPM](https://nodei.co/npm/iobroker.spotify-premium.png?downloads=true)](https://nodei.co/npm/iobroker.spotify-premium/)

Adapter to access spotify playback controls. Because of the spotify API a premium account is necessary.

Connection to [Spotify Premium API](https://www.spotify.com/).

## Documentation
See also the [Spotify Developer API Documentation](https://developer.spotify.com/).

### Setup / Authorization
1. Sign in on https://developer.spotify.com/dashboard/
2. Create an application, you get a Client ID and a Client Secret
3. set the redirect URIs to `http://localhost` in your app settings at your created spotify application
4. put the Cliend ID and Client Secret in the fields down below
5. start the instance
6. switch to objects tab and push the button getAuthorization at `spotify-premium.0.authorization`
7. copy the appearing URL from `spotify-premium.0.authorization.authorizationUrl` to your webbrowser and call it
8. You maybe need to sign in to spotify and grant access
9. the browser will redirected to an invalid URL. If the error `invalid redirect uri` occurs please verify step 3
10. copy that url and put it to `spotify-premium.0.authorization.authorizationReturnUri`
11. the value in `spotify-premium.0.authorization.authorized` turns to true if everything was successful

#### [Video tutorial](https://www.youtube.com/watch?v=n0m9201qABU)
[![How to authorize](https://img.youtube.com/vi/n0m9201qABU/0.jpg "https://www.youtube.com/watch?v=n0m9201qABU")](https://www.youtube.com/watch?v=n0m9201qABU)


### States
All states are described in admin.

### VIS usage examples
Click for widget source.
<details>
  <summary>Start one specific playlist<br/><img src="docs/en/img/choose_playlist.png"></summary>
<pre><code>[{"tpl":"tplJquiButtonState","data":{"oid":"spotify-premium.0.playlists.YourPlaylistName.playThisList","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","buttontext":"Choose Playlist","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"true","no_style":false},"style":{"left":"549px","top":"364px"},"widgetSet":"jqui"}]</code></pre>
</details>
<details>
  <summary>Start one specific device<br/><img src="docs/en/img/choose_device.png"></summary>
<pre><code>[{"tpl":"tplJquiButtonState","data":{"oid":"spotify-premium.0.devices.YourDeviceName.useForPlayback","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","buttontext":"Choose Device","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"true","no_style":false},"style":{"left":"549px","top":"364px"},"widgetSet":"jqui"}]</code></pre>
</details>
<details>
  <summary>Start playing<br/><img src="docs/en/img/play_pause.gif"></summary>
<pre><code>[{"tpl":"tplSpotifyPlayButton","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","oidplay":"spotify-premium.0.player.play","oidpause":"spotify-premium.0.player.pause","oidstate":"spotify-premium.0.player.isPlaying","colorplay":"green","colorpause":"green","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"487px","top":"604px"},"widgetSet":"spotify-premium"}]</code></pre>
</details>
<details>
  <summary>Play previous track<br/><img src="docs/en/img/previous.png"></summary>
<pre><code>[{"tpl":"tplSpotifyPreviousButton","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","oid":"spotify-premium.0.player.skipMinus","colorbox":"green","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"386px","top":"604px"},"widgetSet":"spotify-premium"}]</code></pre>
</details>
<details>
  <summary>Play next track<br/><img src="docs/en/img/next.png"></summary>
<pre><code>[{"tpl":"tplSpotifyNextButton","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","oid":"spotify-premium.0.player.skipPlus","colorbox":"green","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"588px","top":"604px"},"widgetSet":"spotify-premium"}]</code></pre>
</details>
<details>
  <summary>Control repeat<br/><img src="docs/en/img/repeat.gif"></summary>
<pre><code>[{"tpl":"tplSpotifyRepeatButton","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","oidall":"spotify-premium.0.player.repeatContext","oidoff":"spotify-premium.0.player.repeatOff","oidone":"spotify-premium.0.player.repeatTrack","oidstate":"spotify-premium.0.player.repeat","coloroff":"white","colorall":"green","colorone":"green","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"689px","top":"614px","width":"48px","height":"56px"},"widgetSet":"spotify-premium"}]</code></pre>
</details>
<details>
  <summary>Control shuffle<br/><img src="docs/en/img/shuffle.gif"></summary>
<pre><code>[{"tpl":"tplSpotifyShuffleButton","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","oidon":"spotify-premium.0.player.shuffleOn","oidoff":"spotify-premium.0.player.shuffleOff","oidstate":"spotify-premium.0.player.shuffle","coloroff":"white","coloron":"green","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"319px","top":"622px","width":"38px","height":"40px"},"widgetSet":"spotify-premium"}]</code></pre>
</details>
<details>
  <summary>Context image<br/><img src="docs/en/img/context_image.png"></summary>
<pre><code>[{"tpl":"tplValueStringImg","data":{"oid":"spotify-premium.0.player.contextImageUrl","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"338px","top":"131px","width":"122px","height":"122px"},"widgetSet":"basic"}]</code></pre>
</details>
<details>
  <summary>Choose track of current playlist<br/><img src="docs/en/img/choose_track.gif"></summary>
<pre><code>[{"tpl":"tplJquiSelectList","data":{"oid":"spotify-premium.0.player.playlist.trackList","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"{spotify-premium.0.player.playlist.trackListNumber}","texts":"{spotify-premium.0.player.playlist.trackListString}","height":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"505px","top":"369px"},"widgetSet":"jqui"}]</code></pre>
</details>
<details>
  <summary>Switch device<br/><img src="docs/en/img/choose_device.gif"></summary>
<pre><code>[{"tpl":"tplJquiSelectList","data":{"oid":"spotify-premium.0.devices.deviceList","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"{spotify-premium.0.devices.availableDeviceListIds}","texts":"{spotify-premium.0.devices.availableDeviceListString}","height":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"578px","top":"378px"},"widgetSet":"jqui"}]</code></pre>
</details>
<details>
  <summary>Switch playlist<br/><img src="docs/en/img/choose_playlist.gif"></summary>
<pre><code>[{"tpl":"tplJquiSelectList","data":{"oid":"spotify-premium.0.playlists.playlistList","g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"{spotify-premium.0.playlists.playlistListIds}","texts":"{spotify-premium.0.playlists.playlistListString}","height":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"571px","top":"509px"},"widgetSet":"jqui"}]</code></pre>
</details>

## Changelog

### 1.1.0 (in dev)
* (twonky) added control widgets
* (twonky) added compact mode
* (Apollon77) Core Files/Testing Update and introduce adapter-core
* (twonky) added state `player.playUri` to support user defined input

### 1.0.0 (2018.12.18)
* (twonky) `playbackInfo` and `player` merged together to `player`
* (twonky) `player.volume` moved to `player.device.volume`
* (twonky) The `duration` format of `player.playlist.trackListArray` and `playlists.[playListName].trackListArray` was changed from milliseconds to time (MM:SS) and a new one was created for this `durationMs`.
* (twonky) The `album` of `player.playlist.trackListArray` and `playlists.[playListName].trackListArray` was changed to `artistName` and `artistArray`.
* (twonky) Several data was added to `player.playlist.trackListArray` and `playlists.[playListName].trackListArray`: `album`, `addedAt`, `addedBy`, `discNumber`, `episode`, `explicit` and `popularity`
* (twonky) change `player.playlist.trackNo` to start with 1 (0-based before)
* (twonky) performance optimization (states/objects are only set on change)
* (twonky) html lists added: `html.devices`, `html.playlists` and `html.tracks`
* (twonky) new icons

### 0.3.1 (2018.06.20)
* (twonky) Fix: state playlists.playlistList doesn't refresh after the playlist changed via app

### 0.3.0 (2018.05.31)
* (twonky) Change playlist and device state names from name to id
* (twonky) New states for device selection: `devices.deviceList`, `devices.deviceListIds`, `devices.deviceListString`, `devices.availableDeviceListIds`, `devices.availableDeviceListString`
* (twonky) New states for playlist selection: `playlists.playlistList`, `playlists.playlistListIds`, `playlists.playlistListString`, `playlists.yourPlaylistListIds`, `playlists.yourPlaylistListString`
* (twonky) Add option to avoid shuffle state reset on some devices after starting a playlist

### 0.2.5 (2018.05.24)
* (twonky) Fix: `playlists.YourPlaylistName.playThisList` starts always with second track

### 0.2.4 (2018.05.17)
* (twonky) remove special character ("'*) from device and playlist state names

### 0.2.3 (2018.05.17)
* (twonky) remove special character (,?[]) from device and playlist state names

### 0.2.2 (2018.05.16)
* (twonky) `playbackInfo.playlist.track*` States are only reset when changed; stop flickering of tracks SelectList (example "Choose track of current playlist")

### 0.2.1 (2018.05.14)
* (twonky) change state `player.shuffle` to string with possible values "on" and "off"

### 0.2.0 (2018.05.13)
* (twonky) removed support for deprecated state `PlaybackInfo.image_url`
* (twonky) all states improved and proper descriptions added

### 0.1.3 (2018.04.28)
* (twonky) fix spotify api change

### 0.1.2 (2018.04.10)
* (twonky) automatic updating of devices and playlists (configurable in the adapter)
* (twonky) new state `Devices.DEVICE.is_available` indicates if a device is available
* (twonky) shows warning message http 202 only as debug and only one time
* (twonky) the States `Player.Shuffle`,` Player.Playlist_ID`, `Player.TrackId` and` Player.Volume` also show the current value
* (twonky) new states `Playlists.PLAYLISTNAME.image_url`,` PlaybackInfo.Playlist_image_url`, `PlaybackInfo.Album_image_url`
* (twonky) marks the state `PlaybackInfo.image_url` as deprecated. Will not be included in a new installation and will not be updated in future versions
* (twonky) changing the State `Playlists.PLAYLISTNAME.Track_ID` now works like in Lucky's script

### 0.1.1 (2018.03.03)
* (twonky) fix several small issues

### 0.1.0 (2018.02.23)
* (twonky) rework api polling mechanism

### 0.0.9 (2018.02.21)
* (twonky) new state `PlaybackInfo.repeat` with possible values: off, context, track
* (twonky) new state `PlaybackInfo.shuffle` with possible values: true, false
* (twonky) states for the playing device will also updated in 5s intervals
* (twonky) states in `PlaybackInfo` are now updated also if no device is active playing
* (twonky) states in `PlaybackInfo` are now cleared if no device is available
* (twonky) loading new playlists if playing the first time

### 0.0.8 (2018.02.20)
* (twonky) new adapter option to delete no longer existing devices and playlists
* (twonky) load complete playlists (limitation of 100 first tracks was removed)

### 0.0.7 (2018.02.16)
* (twonky) fix: auto refresh token

### 0.0.6 (2018.02.16)
* (twonky) fix: playlist loading

### 0.0.5 (2018.02.16)
* (twonky) fix: fatal error if no open player

### 0.0.4 (2018.02.16)
* (twonky) check configuration
* (twonky) fix: adapter configuration in admin2
* (twonky) fix: restart after authorization need

### 0.0.3 (2018.02.15)
* (wendy2702) improved manual

### 0.0.2 (2018.02.11)
* (twonky) merge original script v0.5.3 by [Lucky](http://forum.iobroker.net/viewtopic.php?f=21&t=8173)

### 0.0.1 (2018.02.07)
* (twonky) initial adapter, original script v0.5.1 by [Lucky](http://forum.iobroker.net/viewtopic.php?f=21&t=8173)

## License
The MIT License (MIT)

Copyright (c) 2019 Alexander Kose <twonky4@gmx.de>

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
