/**
 * Created by nbeport on 2016/3/16.
 */
/**
 * Based on OL3 map measure tool. Support type: Polygon, LineString
 */

/**
 * Needs ol3.js
 * */

function OlMeasure(map, helpStartMsg, continuePolygonMsg , continueLineMsg){
    this.map = map;

    var _helpStartMsg = helpStartMsg;

    var _continuePolygonMsg = continuePolygonMsg;

    var _continueLineMsg = continueLineMsg;

    var _wgs84Sphere = new ol.Sphere(6378137);

    var _sketch;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    var _helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {ol.Overlay}
     */
    var _helpTooltip;

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    var _measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var _measureTooltip;

    /*store the overlays, use to remove*/
    var _overlays = [];

    var _draw; // global so we can remove it later

    var _source;

    var _pointerMoveKey;

    this.initMeasure = function (source, type) {
        _source = source;
        if(_helpStartMsg == undefined){
            _helpStartMsg =  'Click to start drawing';
        }
        if(_continuePolygonMsg == undefined){
            _continuePolygonMsg =  'Click to continue drawing the polygon';
        }
        if(_continueLineMsg == undefined){
            _continueLineMsg =  'Click to continue drawing the line';
        }
        //var type = (type == 'area' ? 'Polygon' : 'LineString');
        _draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        this.map.addInteraction(_draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        _draw.on('drawstart',
            function(evt) {
                // set sketch
                _sketch = evt.feature;

                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = _sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(/** @type {ol.geom.LineString} */ (geom));
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    _measureTooltipElement.innerHTML = output;
                    _measureTooltip.setPosition(tooltipCoord);
                });
            }, this);

        _draw.on('drawend',
            function() {
                _measureTooltipElement.className = 'tooltip tooltip-static';
                _measureTooltip.setOffset([0, -7]);
                // unset sketch
                _sketch = null;
                // unset tooltip so that a new one can be created
                _measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
                /*Draw end, set to normal state*/
                this.map.removeInteraction(_draw);
                this.map.unByKey(_pointerMoveKey);
            }, this);

        _pointerMoveKey = this.map.on('pointermove', pointerMoveHandler);

        $(this.map.getViewport()).on('mouseout', function() {
            $(_helpTooltipElement).addClass('hidden');
        });
    }

    this.clear = function () {
        _source.clear();
        //this.map.removeOverlay(_measureTooltip);
        //this.map.removeOverlay(_helpTooltip);
        _overlays.forEach(function (item) {
            this.map.removeOverlay(item);
        })
    }

    function pointerMoveHandler(evt) {
        if (evt.dragging) {
            return;
        }
        var helpMsg = _helpStartMsg;

        if (_sketch) {
            var geom = (_sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = _continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = _continueLineMsg;
            }
        }

        _helpTooltipElement.innerHTML = helpMsg;
        _helpTooltip.setPosition(evt.coordinate);

        $(_helpTooltipElement).removeClass('hidden');
    };




    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
     function formatLength(line) {
        var length;
        //if (geodesicCheckbox.checked) {
            var coordinates = line.getCoordinates();
            length = 0;
            var sourceProj = map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += _wgs84Sphere.haversineDistance(c1, c2);
            }
        //} else {
           // length = Math.round(line.getLength() * 100) / 100;
        //}
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };


    /**
     * Format length output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    function formatArea(polygon) {
        var area;
        //if (geodesicCheckbox.checked) {
            var sourceProj = map.getView().getProjection();
            var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
                sourceProj, 'EPSG:4326'));
            var coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(_wgs84Sphere.geodesicArea(coordinates));
       // } else {
            //area = polygon.getArea();
        //}
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (_helpTooltipElement) {
            _helpTooltipElement.parentNode.removeChild(_helpTooltipElement);
        }
        _helpTooltipElement = document.createElement('div');
        _helpTooltipElement.className = 'tooltip hidden';
        _helpTooltip = new ol.Overlay({
            element: _helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        _overlays.push(_helpTooltip);
        this.map.addOverlay(_helpTooltip);
    }


    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (_measureTooltipElement) {
            _measureTooltipElement.parentNode.removeChild(_measureTooltipElement);
        }
        _measureTooltipElement = document.createElement('div');
        _measureTooltipElement.className = 'tooltip tooltip-measure';
        _measureTooltip = new ol.Overlay({
            element: _measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        _overlays.push(_measureTooltip);
        this.map.addOverlay(_measureTooltip);
    }
}

