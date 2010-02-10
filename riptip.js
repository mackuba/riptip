 /*
 * TipTip - Copyright 2010 Drew Wilson (www.drewwilson.com, code.drewwilson.com/entry/tiptip-jquery-plugin)
 * RipTip (RightJS port) - Copyright 2010 Jakub Suder (psionides.jogger.pl)
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

RipTip = {

  defaults: {
    maxWidth: "200px",
    edgeOffset: 3,
    delay: 400,
    fadeIn: 200,
    fadeOut: 200
  },

  attachTo: function(element, opts) {
    var options = Object.merge(this.defaults, opts);
    this._initialize();
    var title = element.get("title");
    if (title) {
      element.erase("title");
      element.on({
        mouseover: this._enter.bind(this, element, title, options),
        mouseout: this._leave.bind(this, element, options)
      });
    }
  },

  _initialize: function() {
    if (!this._initialized) {
      this._holder = this._createDiv('riptip_holder', $$('body').first());

      this._arrow = this._createDiv('riptip_arrow', this._holder);
      this._content = this._createDiv('riptip_content', this._holder);
      this._createDiv('riptip_arrow_inner', this._arrow);

      this._timeout = null;
      this._initialized = true;
    }
  },

  _createDiv: function(id, where) {
    return $(id) || new Element('div', { id: id }).insertTo(where);
  },

  _enter: function(element, title, options) {
    element.fire('riptipEnter');
    this._content.update(title);
    this._holder.erase("class").setStyle({
      margin: "0px",
      display: 'block',
      opacity: 0,
      'max-width': options.maxWidth
    });
    this._arrow.erase("style");

    var top = element.position().y;
    var left = element.position().x;
    var width = element.sizes().x;
    var height = element.sizes().y;
    var tipW = this._holder.sizes().x;
    var tipH = this._holder.sizes().y;
    var wCompare = Math.round((width - tipW) / 2);
    var hCompare = Math.round((height - tipH) / 2);
    var marginLeft = Math.round(left + wCompare);
    var marginTop = Math.round(top + height + options.edgeOffset);
    var tClass = "";
    var arrowTop = "";
    var arrowLeft = Math.round(tipW - 12) / 2;

    if (wCompare < 0) { // element's width is smaller than tip's
      if ((wCompare + left) < window.scrolls().x) {
        tClass = "_right";
        arrowTop = Math.round(tipH - 13) / 2;
        arrowLeft = -12;
        marginLeft = Math.round(left + width + options.edgeOffset);
        marginTop = Math.round(top + hCompare);
      } else if ((tipW + left) > window.sizes().x) {
        tClass = "_left";
        arrowTop = Math.round(tipH - 13) / 2;
        arrowLeft = Math.round(tipW);
        marginLeft = Math.round(left - (tipW + options.edgeOffset + 5));
        marginTop = Math.round(top + hCompare);
      }
    }

    if ((top + height + options.edgeOffset + tipH + 8) > window.sizes().y + window.scrolls().y) {
      tClass = tClass + "_top";
      arrowTop = tipH;
      marginTop = Math.round(top - (tipH + 5 + options.edgeOffset));
    } else if (((top + height) - (options.edgeOffset + tipH)) < 0 || tClass == "") {
      tClass = tClass + "_bottom";
      arrowTop = -12;
      marginTop = Math.round(top + height + options.edgeOffset);
    }

    if (tClass == "_right_top" || tClass == "_left_top") {
      marginTop = marginTop + 5;
    } else if (tClass == "_right_bottom" || tClass == "_left_bottom") {
      marginTop = marginTop - 5;
    }

    if (tClass == "_left_top" || tClass == "_left_bottom") {
      marginLeft = marginLeft + 5;
    }

    this._arrow.setStyle({ "margin-left": arrowLeft + "px", "margin-top": arrowTop + "px" });
    this._holder.setStyle({ "margin-left": marginLeft + "px", "margin-top": marginTop + "px" });
    this._holder.setClass("tip" + tClass);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(this._show.bind(this, options), options.delay);
  },

  _show: function(options) {
    this._holder.fade('in', { duration: options.fadeIn });
  },

  _leave: function(element, options) {
    element.fire('riptipLeave');
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._holder.fade('out', { duration: options.fadeOut });
  }

};

Element.include({
  riptip: function(options) {
    RipTip.attachTo(this, options);
    return this;
  }
});
