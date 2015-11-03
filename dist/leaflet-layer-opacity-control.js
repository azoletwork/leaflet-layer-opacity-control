// Following https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md
(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);

    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== 'undefined' && window.L) {
        window.L.Control.LayerOpacity = factory(L);
        window.L.control.layerOpacity = function(options) {
            return new window.L.Control.LayerOpacity(options);
        };
    }
}(function (L) {

	var LayerOpacity = L.Control.extend({
            
            options : {
                layers: [],
                position: 'topleft'
            },

            initialize: function (options) {

                // constructor
                L.Util.setOptions(this, options);

            },

            onAdd : function(map) {
                console.info('Adding LayerOpacity.Control', this.options);

                var that = this;

                // create the control container with a specific class name
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
                    if (that.options.layers) {
                        for (var i = 0, l = that.options.layers.length; i < l; ++i) {
                            that.options.layers[i].setOpacity(e.newValue / 100);
                        }
                    }
                });

                return container;
            },

            addLayer : function(layer) {
                console.info('Adding layer to LayerOpacity.Control');
                this.options.layers.push(layer);
            }
	});
	
	return LayerOpacity;
	
}, window));
