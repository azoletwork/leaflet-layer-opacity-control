L.Control.layerOpacitySlider = L.Control.extend({

    options : {
        position: 'bottomleft'
    },

    initialize: function (options) {

        // constructor
        L.Util.setOptions(this, options);

        this.layerList = [];

    },

    onAdd : function(map) {

        console.info('Adding LayerOpacity.Control Control');

        var that = this;

        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'layer-opacity-control leaflet-bar');

        // ... initialize other DOM elements, add listeners, etc.
        var sliderElement = L.DomUtil.create('input', 'slider', container);

        var tooltipPosition = 'right';

        if (that.options.position.indexOf('left') > -1) {
            tooltipPosition = 'right';
        } else {
            tooltipPosition = 'left';
        }

        var slider = new Slider(sliderElement, {
        //var slider = $(sliderElement).slider({
            min : 0,
            max : 100,
            tooltip_position : tooltipPosition,
            value : 100,
            orientation : 'vertical'
        });

        slider.on('slideStart', function(value) {
            map.dragging.disable();
        });

        slider.on('slideStop', function(value) {
            map.dragging.enable();
        });

        slider.on('change', function(e) {
            for (var i = 0, l = that.layerList.length; i < l; ++i) {
                that.layerList[i].setOpacity(e.newValue / 100);
            }
        });

        return container;

    },

    addLayer : function(layer) {

        console.info('Adding layer to LayerOpacity.Control');

        this.layerList.push(layer);

    }

});
