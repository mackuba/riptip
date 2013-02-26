# RipTip

RipTip is a RightJS plugin that adds pretty tooltips to selected elements. It's a port of a jQuery plugin [TipTip](http://code.drewwilson.com/entry/tiptip-jquery-plugin) written by Drew Wilson.

![RipTip screenshot](http://psionides.eu/images/posts/riptip.png)

To see the tooltips in action, see [original TipTip blog post](http://code.drewwilson.com/entry/tiptip-jquery-plugin)
(RipTip tooltips look exactly the same, or at least they're supposed to).


## Usage

You need to download two files, `riptip.js` and `riptip.css` and add them to your page header:

    <link rel="stylesheet" href="/stylesheets/riptip.css" type="text/css">
    <script type="text/javascript" src="/javascripts/riptip.js"></script>

To attach a RipTip tooltip to an element, give it a `title` attribute and either call RipTip directly:

    RipTip.attachTo(link, { options... });

or using a shortcut method added to Element:

    $('link').riptip({ options... });
    $$('a[title]').each('riptip', { options... });

RipTip will remove the `title` attribute from given elements and will display the contents of that attribute in a
custom tooltip.

Elements which have tooltips attached to them fire two custom events: `riptipEnter` when you mouseover an element,
before the animation starts, and `riptipLeave` when the cursor leaves the element and before the fade-out animation
starts; you can bind actions to these events like this:

    $('link').riptip().on({
      'riptipEnter': function() { ... },
      'riptipLeave': function() { ... }
    });
    
    // or:
    $('link').riptip().on('riptipEnter', function() { ... });

## Options

You can pass any of these in the options attribute:

* `maxWidth` (default: "200px") - tooltip's maximum width
* `edgeOffset` (default: 3) - distance between the element's border and the top of the tooltip's arrow (in px)
* `delay` (default: 400) - amount of time before tooltip appears (in ms)
* `fadeIn` (default: 200) - length of the fade in animation (in ms)
* `fadeOut` (default: 200) - length of the fade out animation (in ms)

Of course you can also tweak the CSS to change the way the tooltips look.


## License

Copyright by Jakub Suder (Psionides) <jakub.suder at gmail.com>. Original jQuery plugin (TipTip) - copyright by Drew
Wilson [www.drewwilson.com](http://www.drewwilson.com). RipTip, like its jQuery ancestor, is dual-licensed under MIT and GPL
licenses.
