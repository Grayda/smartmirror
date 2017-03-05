# Smart Mirror
This is a custom-made smart mirror application. It's built to meet my needs, and as a result may be lacking features most other smart mirrors have. This software is beta, so it may or may not work for you.

## Getting set up
 - Install PHP, composer and bowerPHP (if you don't want to install node.js) on your smart mirror.
 - Clone into wherever your distro serves PHP / html files from
 - Rename `./config/config.sample.json` to `./config/config.json` and edit the values accordingly
  - `location->lat` / `location->long` are used to retrieve the weather and moon phase
  - `calendar->url` is the private URL to your Google Calendar
  - `calendar->count` is how many events to show on the mirror
  - `calendar->start` / `calendar->end` is range of events to get (e.g. get everything from yesterday, up to 1 month from now). Uses `strtotime` under the hood, so you can do things like `midnight a week ago`
  - `weather->appID` is an OpenWeatherMap API key (also known as an APPID)
  - `weather->metric` if set to true, will use metric (e.g. °C) instead of the archaic imperial (sorry not sorry people from the US, Myanmar and Liberia)
  - `icons` is an array of keywords and classes. Keywords are regular expression, and class is an array of classes. If an event title matches one of these, then the corresponding font awesome icon / bootstrap class is used. If nothing matches, a calendar icon is used instead
- Run `composer install` and `bower install` to install dependencies
- Set up your smart mirror to navigate to index.html in your browser of choice, full screen, at boot
- Enjoy!

## Adding more widgets
Widgets are stored in `js/data/widgets.json`. Make changes accordingly and reload.
