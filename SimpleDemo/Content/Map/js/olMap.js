/**
 * Created by nbeport on 2016/3/15.
 */
function createMap(mapType, target){
    if(mapType == null) {
        mapType = ChinaMap;
    }

    var url =  "http://122.227.227.208/Map.Engine.WebMap.V2/WebMapProvider.aspx?x={x}&y={y}&z={z}&type=" + mapType + "&appkey=ild_cglm&dt=201311111111&sign=5B787F7C3627D2E24080377FCAAE5C0D&u=0";
    var tileLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: url
        })
    });
    map = new ol.Map({
        layers: [tileLayer],
        target: target,
        view: new ol.View({
            center: ol.proj.transform([121.900000, 29.96995043], 'EPSG:4326', 'EPSG:3857'),
            zoom: 11
        })
    });
    return map;
}
