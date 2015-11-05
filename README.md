# leaflet-layer-opacity-control
A basic opacity control for Leaflet's layers, based on [Seiyria's bootstrap-slider](https://github.com/seiyria/bootstrap-slider).

### Setup and use

Install Leaflet's layers opacity control through [bower](http://bower.io/).

```
$ bower install leaflet-layer-opacity-control
```

In your web page, include both distribution script and stylesheet. For instance,

```html
<link rel="stylesheet" href="leaflet-layer-opacity-control.css"></link>
<script src="leaflet-layer-opacity-control.js">
```

and then setup the control adding the layers for which you need to control the opacity.

```javascript
var overlays = {
    "My Layer": myLayer
};

L.control.layerOpacity({ 
    myLayerId: overlays.myLayer
}).addTo(map);
```

You also can add a layer lately by using ```L.control.layerOpacity.addLayer```.
