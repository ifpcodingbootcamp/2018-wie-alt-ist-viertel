var colors = ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'];

//Karte initialisieren, Zentrum und Zoom setzen
var map = L.map('mapid',
    {
        minZoom: 9,
        maxZoom: 12,
        zoomDelta: 0.1,
        zoomSnap: 0 //pinch to zoom Mobiles Zoomen
    });
//Hintergrund Weltkarte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            fillOpacity: 1
        }
    }
}).addTo(map);


function getcolor(Stadtteil) {

    var Stadtteilname = Stadtteil.properties.name //Aufruf stadtteile.js

    var value = getAlter(Stadtteilname)

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