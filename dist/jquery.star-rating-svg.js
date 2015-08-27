/*
 *  jQuery StarRatingSvg v0.9.5
 *  http://github.com/nashio/star-rating-svg
 *  Licensed under MIT
 *
 */

;(function ( $, window, document, undefined ) {

    'use strict';

    // Create the defaults once
    var pluginName = 'starRating';
    var defaults = {
        totalStars: 5,
        emptyColor: 'lightgray',
        hoverColor: 'orange',
        activeColor: 'gold',
        useGradient: true,
        readonly: false,
        starGradient: {
            start: '#FEF7CD',
            end: '#FF9511'
        },
        strokeWidth: 0,
        strokeColor: 'black',
        initialRating: 0,
        starSize: 40
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
            if( this.settings.readOnly )return;
            this.$star.on('mouseover', this.hoverRating.bind(this));
            this.$star.on('mouseout', this.restoreState.bind(this));
            this.$star.on('click', this.applyRating.bind(this));
        },

        // apply styles to hovered stars
        hoverRating: function(e){
            this.paintStars(this.getIndex(e), 'hovered');
        },

        // clicked on a rate, apply style and state
        applyRating: function(e){
            var index = this.getIndex(e);
            var rating = index + 1;

            // paint selected and remove hovered color
            this.paintStars(index, 'active');
            this.executeCallback( rating );
            this._state.rating = rating;
        },

        restoreState: function(){
            var rating = this._state.rating || -1;
            this.paintStars(rating - 1, 'active');
        },

        getIndex: function(e){
            var $target = $(e.currentTarget);
            var width = $target.width();
            var side = ( e.offsetX < width / 2 ) ? 'left' : 'right';

            // get index for half or whole star
            var index = $target.index() - ((side === 'left') ? 0.5 : 0);

            // pointer is way to the left, rating should be none
            index = ( index < 0 && (e.offsetX < width / 5) ) ? -1 : index;
            return index;
        },

        initRating: function(){
            this.paintStars(this._state.rating - 1, 'active');
        },

        paintStars: function(endIndex, stateClass){
            var $polygonLeft;
            var $polygonRight;
            var leftClass;
            var rightClass;

            $.each(this.$star, function(index, star){
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
            var star = '<div class="jq-star" style="width:' + this.settings.starSize+ 'px;  height:' + this.settings.starSize + 'px;"><svg version="1.1" class="jq-star-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="228.6px" height="218px" viewBox="64 -59 228.6 218" style="enable-background:new 64 -59 228.6 218; stroke-width:' + this.settings.strokeWidth + 'px;" xml:space="preserve"><style type="text/css">.svg-empty-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_1_);}.svg-hovered-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_2_);}.svg-active-' + this._uid + '{fill:url(#' + this._uid + '_SVGID_3_);}</style>' +
                this.getLinearGradient(this._uid + '_SVGID_1_', this.settings.emptyColor, this.settings.emptyColor) +
                this.getLinearGradient(this._uid + '_SVGID_2_', this.settings.hoverColor, this.settings.hoverColor) +
                this.getLinearGradient(this._uid + '_SVGID_3_', this.settings.starGradient.start, this.settings.starGradient.end) +
                '<polygon data-side="left" class="svg-empty-' + this._uid + '"  points="146.7,17.6 64,23.9 127.1,77.7 107.5,158.3 178.2,114.9 178.3,-59" style="stroke-dasharray: 332 170 0 0; stroke: ' + this.settings.strokeColor + '"/><polygon data-side="right" class="svg-empty-' + this._uid + '" points="292.6,24.1 209.9,17.7 178.3,-59 178.2,114.9 248.8,158.4 229.4,77.8" style="stroke-dasharray: 166 172 222 0; stroke: ' + this.settings.strokeColor + '"/>' +
                '</svg></div>';

            // inject svg markup
            var starsMarkup = '';
            for( var i = 0; i < this.settings.totalStars; i++){
                starsMarkup += star;
            }
            this.$el.append(starsMarkup);
            this.$star = this.$el.find('.jq-star');
        },

        getLinearGradient: function(id, startColor, endColor){
            return '<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="121.1501" y1="-80.35" x2="121.15" y2="102.0045"><stop  offset="0" style="stop-color:' + startColor + '"/><stop  offset="1" style="stop-color:' + endColor + '"/> </linearGradient>';
        },

        executeCallback: function(rating){
            var callback = this.settings.callback;
            if( $.isFunction( callback ) ){
                callback(rating);
            }
        }

    };

    var publicMethods = {

        unload: function(){
            var _name = 'plugin_' + pluginName;
            var $el = $(this);
            var $star = $el.data(_name).$star;
            $el.removeData(_name);
            $star.off();
        }

    };


    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, methods);

    $.fn[ pluginName ] = function ( options ) {

        // if options is a public method
        if( !$.isPlainObject(options) ){
            if( publicMethods.hasOwnProperty(options) ){
                publicMethods[options].apply(this);
                return;
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


