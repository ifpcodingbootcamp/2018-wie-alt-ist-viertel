(function(){
    //Namespace Namensbereich für Javascriptvariable; führt dazu, dass man Bezeichnungen doppelt nehmen kann in anderer Datei.



var colors = ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'];

//Karte initialisieren, Zentrum und Zoom setzen
var map = L.map('mapid',
    {
        minZoom: 10,
        maxZoom: 12,
        zoomDelta: 0.1,
        zoomSnap: 0 //pinch to zoom für mobiles Zoomen
    });

//Hintergrund Weltkarte
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZmVsaXgtZWJlcnQiLCJhIjoiZk5YeUg1NCJ9.jmpn16n3jnPQ3Yhg5NlZgg'
}).addTo(map);

//sichtbaren Bereich festlegen mit Viereck links oben/rechts unten
map.fitBounds([
    [48.25256955799006,
        11.342697143554688],
    [48.06431431084693,
        11.732025146484373]
]);

//Stadtteile zeichnen
L.geoJson(stadtteile, {
    style: function (Stadtteil) {
        return {
            fillColor: getcolor(Stadtteil), //Stadtteile einfärben - siehe fct getcolor
            color: "#333333",
            weight: 1.5,
            fillOpacity: 0.3
        }
    },
    onEachFeature: bindEvents
}).addTo(map);


function getcolor(Stadtteil) {
    var Stadtteilname = Stadtteil.properties.name; //Aufruf stadtteile.js
    var value = getAlter(Stadtteilname);

    if (value <= 39) { //Bedingungen für Farbe definieren
        return colors [0]
    }
    if (value <= 40) {
        return colors [1]
    }
    if (value <= 41) {
        return colors [2]
    }
    if (value <= 42) {
        return colors [3]
    }
    if (value <= 43) {
        return colors [4]
    }
    if (value <= 44) {
        return colors [5]
    }
}

function getAlter(Stadtteilname) { //Schleifen-Funktion für Altersdurchschnitt
    for (var i = 0; i < altersdurchschnitt.length; i++) {
        //Bezug zu altersdurschnitt.js
        if (Stadtteilname.startsWith(altersdurchschnitt[i].Stadtbezirk)) {
            return altersdurchschnitt[i].Indikator
        }
    }
}

var popup = L.popup({closeButton: false});

// Maus-Events für jeden Stadtteil hinzufügen
function bindEvents(feature, layer) {
    var Bezirkname = feature.properties['name'];
    var Altersbezirk = getAlter(Bezirkname);
    // Popup hinzufügen
    layer.bindPopup("Das Durchschnittsalter in " + Bezirkname.substring(14) + " ist " + Altersbezirk + " Jahre."); //14 Zeichen löschen

}

// Legende
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        Altersstufen = [38, 39, 40, 41, 42, 43],
        labels = [];

    div.innerHTML = "<div class='durch'>Durchschnitts-<br>alter<br></div>";

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < Altersstufen.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            Altersstufen[i] + (Altersstufen[i + 1] ? '&ndash;' + Altersstufen[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map); //Kopiert von https://leafletjs.com/examples/choropleth/
})();
