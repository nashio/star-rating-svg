/*
 *  jQuery StarRatingSvg v1.0.1
 *
 *  http://github.com/nashio/star-rating-svg
 *  Author: Ignacio Chavez
 *  Licensed under MIT
 */

;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = 'starRating';
  var noop = function(){};
  var defaults = {
    totalStars: 5,
    useFullStars: false,
    emptyColor: 'lightgray',
    hoverColor: 'orange',
    activeColor: 'gold',
    useGradient: true,
    readOnly: false,
    disableAfterRate: true,
    starGradient: {
      start: '#FEF7CD',
      end: '#FF9511'
    },
    strokeWidth: 0,
    strokeColor: 'black',
    initialRating: 0,
    starSize: 40,
    callback: noop,
    onHover: noop,
    onLeave: noop
  };

	// The actual plugin constructor
  var Plugin = function( element, options ) {
    var _rating;
    this.element = element;
    this.$el = $(element);
    this.settings = $.extend( {}, defaults, options );

    // grab rating if defined on the element
    _rating = this.$el.data('rating') || this.settings.initialRating;
    this._state = {
      // round to the nearest half
      rating: (Math.round( _rating * 2 ) / 2).toFixed(1)
    };

    // create unique id for stars
    this._uid = Math.floor( Math.random() * 999 );

    // override gradient if not used
    if( !options.starGradient && !this.settings.useGradient ){
      this.settings.starGradient.start = this.settings.starGradient.end = this.settings.activeColor;
    }

    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  var methods = {
    init: function () {
      this.renderMarkup();
      this.addListeners();
      this.initRating();
    },

    addListeners: function(){
      if( this.settings.readOnly ){ return; }
      this.$stars.on('mouseover', this.hoverRating.bind(this));
      this.$stars.on('mouseout', this.restoreState.bind(this));
      this.$stars.on('click', this.handleRating.bind(this));
    },

    // apply styles to hovered stars
    hoverRating: function(e){
      var index = this.getIndex(e);
      this.paintStars(index, 'hovered');
      this.settings.onHover(index + 1, this._state.rating, this.$el);
    },

    // clicked on a rate, apply style and state
    handleRating: function(e){
      var index = this.getIndex(e);
      var rating = index + 1;

      this.applyRating(rating, this.$el);
      this.executeCallback( rating, this.$el );

      if(this.settings.disableAfterRate){
        this.$stars.off();
      }
    },

    applyRating: function(rating){
      var index = rating - 1;
      // paint selected and remove hovered color
      this.paintStars(index, 'active');
      this._state.rating = index + 1;
    },

    restoreState: function(e){
      var index = this.getIndex(e);
      var rating = this._state.rating || -1;
      this.paintStars(rating - 1, 'active');
      this.settings.onLeave(index + 1, this._state.rating, this.$el);
    },

    getIndex: function(e){
      var $target = $(e.currentTarget);
      var width = $target.width();
      var side = $(e.target).attr('data-side');

      // hovered outside the star, calculate by pixel instead
      side = (!side) ? this.getOffsetByPixel(e, $target, width) : side;
      side = (this.settings.useFullStars) ? 'right' : side ;

      // get index for half or whole star
      var index = $target.index() - ((side === 'left') ? 0.5 : 0);

      // pointer is way to the left, rating should be none
      index = ( index < 0 && (e.offsetX < width / 5) ) ? -1 : index;
      return index;
    },

    getOffsetByPixel: function(e, $target, width){
      var leftX = e.pageX - $target.offset().left;
      return ( leftX <= (width / 2) && !this.settings.useFullStars) ? 'left' : 'right';
    },

    initRating: function(){
      this.paintStars(this._state.rating - 1, 'active');
    },

    paintStars: function(endIndex, stateClass){
      var $polygonLeft;
      var $polygonRight;
      var leftClass;
      var rightClass;

      $.each(this.$stars, function(index, star){
        $polygonLeft = $(star).find('polygon[data-side="left"]');
        $polygonRight = $(star).find('polygon[data-side="right"]');
        leftClass = rightClass = (index <= endIndex) ? stateClass : 'empty';

        // has another half rating, add half star
        leftClass = ( index - endIndex === 0.5 ) ? stateClass : leftClass;

        $polygonLeft.attr('class', 'svg-'  + leftClass + '-' + this._uid);
        $polygonRight.attr('class', 'svg-'  + rightClass + '-' + this._uid);

      }.bind(this));
    },

    renderMarkup: function () {
      // inject an svg manually to have control over attributes
      var star = '<div class="jq-star" style="width:' + this.settings.starSize+ 'px;  height:' + this.settings.starSize + 'px;"><svg version="1.0" class="jq-star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305; stroke-width:' + this.settings.strokeWidth + 'px;" xml:space="preserve"><style type="text/css">.svg-empty-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_1_);}.svg-hovered-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_2_);}.svg-active-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_3_);}</style>' +
      this.getLinearGradient(this._uid + '_SVGID_1_', this.settings.emptyColor, this.settings.emptyColor) +
      this.getLinearGradient(this._uid + '_SVGID_2_', this.settings.hoverColor, this.settings.hoverColor) +
      this.getLinearGradient(this._uid + '_SVGID_3_', this.settings.starGradient.start, this.settings.starGradient.end) +
            '<polygon data-side="left" class="svg-empty-' + this._uid + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke: ' + this.settings.strokeColor + '"/>' +
              '<polygon data-side="right" class="svg-empty-' + this._uid + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-dasharray: 230 232 210 0; stroke: ' + this.settings.strokeColor + '"/>' +
                '</svg></div>';

      // inject svg markup
      var starsMarkup = '';
      for( var i = 0; i < this.settings.totalStars; i++){
        starsMarkup += star;
      }
      this.$el.append(starsMarkup);
      this.$stars = this.$el.find('.jq-star');
    },

    getLinearGradient: function(id, startColor, endColor){
      return '<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="121.1501" y1="-70.35" x2="121.15" y2="125.0045"><stop  offset="0" style="stop-color:' + startColor + '"/><stop  offset="1" style="stop-color:' + endColor + '"/> </linearGradient>';
    },

    executeCallback: function(rating, $el){
      var callback = this.settings.callback;
      callback(rating, $el);
    }

  };

  var publicMethods = {

    unload: function() {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $starSet = $el.data(_name).$stars;
      $starSet.off();
      $el.removeData(_name).remove();
    },

    setRating: function(rating) {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $plugin = $el.data(_name);
      if( rating > $plugin.settings.totalStars || rating < 0 ) { return; }
      $plugin.applyRating(rating);
    },

    getRating: function() {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $starSet = $el.data(_name);
      return $starSet._state.rating;
    }
  };


  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, methods);

  $.fn[ pluginName ] = function ( options ) {

    // if options is a public method
    if( !$.isPlainObject(options) ){
      if( publicMethods.hasOwnProperty(options) ){
        return publicMethods[options].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        $.error('Method '+ options +' does not exist on ' + pluginName + '.js');
      }
    }

    return this.each(function() {
      // preventing against multiple instantiations
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );


