# fbdropdowner.js
Dropdown list styling (&lt;select>).
Because styling dropdown lists for browsers is pretty much impossible!
This plugin transforms the &lt;select> tag to &lt;dl>, &lt;dt> and &lt;dd> tags, which are more stylable.

## Usage
`$(".js-dropdown").fbDropdowner();`

## Tips
Don't activate the plugin for mobile devices. Activate only for desktop devices.

## Required
* jQuery (tested on jQuery v3.1.1)
* [tocca](http://gianlucaguarini.com/Tocca.js/) (tested on tocca v2.0.0) to detect touch events on iPad/iPod/iPhone, because there is :hover styles on the dropdown, and the user has to tap 2 times if this plugin isn't there.

## Inspiration
This plugin is heavily inspired by the [idea showed here](http://www.jankoatwarpspeed.com/reinventing-a-drop-down-with-css-and-jquery/).