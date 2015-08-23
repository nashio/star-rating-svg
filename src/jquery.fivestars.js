// fivestars.js
// star rating jQuery plugin
// http://github.com/nashio

;(function ( $, window, document, undefined ) {

    'use strict';

    // Create the defaults once
    var pluginName = 'fivestars';
    var defaults = {
        totalStars: 5,
        emptyColor: 'lightgray',
        hoverColor: 'orange',
        activeColor: 'yellow',
        initialRating: 0,
        starSize: 50
    };

    // The actual plugin constructor
    var Plugin = function( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this.$el = $(element);

        // generate a unique id to identify different instances with css classes
        this.uid = 'fs-' + Math.floor( Math.random() * 999 );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    var methods = {
        init: function () {
            this.renderStars();
            this.addListeners();
            this.addStyles();
            this.initRating();
        },

        addListeners: function(){
            this.$star.on('mouseover', this.hoverRating.bind(this));
            this.$star.on('mouseout', this.restoreState.bind(this));
            this.$star.on('click', this.selectRating.bind(this));
        },

        hoverRating: function(e){
            this.paintStars(this.getIndex(e), 'hovered');
        },

        selectRating: function(e){
            var index = this.getIndex(e);
            var rating = index + 1;

            // paint selected stars and remove hovered color
            this.paintStars(index, 'active');
            this.paintStars(-1, 'hovered');
            this.executeCallback( rating );
        },

        restoreState: function(e){
            this.$star.removeClass('hovered');
        },

        getIndex: function(e){
            var $target = $(e.currentTarget);
            return $target.index();
        },

        initRating: function(){
            this.paintStars(this.settings.initialRating - 1, 'active');
        },

        paintStars: function(endIndex, stateClass){
            var flag;
            $.each(this.$star, function(index, star){
                flag = ( index <= endIndex ) ? true : false;
                $(star).toggleClass(stateClass, flag);
            });
        },

        renderStars: function () {
            // inject an svg manually to have control over attributes
            var star = '<div class="fs-star ' + this.uid + '"><svg class="fs-star-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 250 250"><path fill="#F8D64E" d="m48,234 73-226 73,226-192-140h238z"/></svg> </div>';
            var starsMarkup = '';
            for( var i = 0; i < this.settings.totalStars; i++){
                starsMarkup += star;
            }
            this.$el.append(starsMarkup);
            this.$star = this.$el.find('.fs-star');
        },

        addStyles: function(){
            var styles = ['.' + this.uid + ' .fs-star-svg path { fill: ' + this.settings.emptyColor + '; }',
                          '.' + this.uid + '.fs-star.active .fs-star-svg path { fill: ' + this.settings.activeColor + '; }',
                          '.' + this.uid + '.fs-star.hovered .fs-star-svg path { fill: ' + this.settings.hoverColor + '; }',
                          '.' + this.uid + '.fs-star { width: ' + this.settings.starSize + 'px; height: ' + this.settings.starSize + 'px;}'];
            this.injectStyles(styles);
        },

        executeCallback: function(rating){
            var callback = this.settings.callback;
            if( $.isFunction( callback ) ){
                callback(rating);
            }
        },

        injectStyles: function(rules) {
            var rulesStr = rules.join(' ');
            var div = $("<div />", {
                html: '<style>' + rulesStr + '</style>' }).appendTo("body");
        }
    };


    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, methods);

    $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                // preventing against multiple instantiations
                if ( !$.data( this, 'plugin_' + pluginName ) ) {
                    $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
                }
            });
        };

})( jQuery, window, document );


