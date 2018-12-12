(function() {
    var colors = ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'];

    var map = L.map('mapid2',
        {
            minZoom: 10,
            maxZoom: 12,
            zoomDelta: 0.1,
            zoomSnap: 0 //pinch to zoom für mobiles Zoomen
        });

//Hintergrund Weltkarte
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 13,
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

    L.geoJson(stadtteile, {
        style: function (Stadtteil) {
            return {
                fillColor: getcolor(Stadtteil), //Stadtteile einfärben - siehe fct getcolor
                color: "#333333",
                weight: 1.5,
                fillOpacity: 0.3
            }
            }
    }).addTo(map);
    function getcolor(Stadtteil) {
        var Stadtteilname = Stadtteil.properties.name; //Aufruf stadtteile.js
        var value = getAlter(Stadtteilname);

        if (value <= 11) { //Bedingungen für Farbe definieren
            return colors [0]
        }
        if (value <= 13) {
            return colors [1]
        }
        if (value <= 15) {
            return colors [2]
        }
        if (value <= 17) {
            return colors [3]
        }
        if (value <= 19) {
            return colors [4]
        }
        if (value <= 21) {
            return colors [5]
        }
    }
    function getAlter(Stadtteilname) { //Schleifen-Funktion für Altersdurchschnitt
        for (var i = 0; i < altersgruppen.length; i++) {
            //Bezug zu altersdurschnitt.js
            if (Stadtteilname.startsWith(altersgruppen[i].Name)) {
                return parseFloat(altersgruppen[i]["0-18 Prozent"].replace(",","."))
            }
        }
    }





})();