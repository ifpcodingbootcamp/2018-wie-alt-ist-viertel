(function () {
    var colors = ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'];

    var map = L.map('mapid2',
        {
            minZoom: 10,
            maxZoom: 12,
            scrollWheelZoom: false,
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

    function stylestadtteil(Stadtteil, altersgroup) {
        return {
            fillColor: getcolor(Stadtteil, altersgroup), //Stadtteile einfärben - siehe fct getcolor
            color: "#333333",
            weight: 1.5,
            fillOpacity: 0.3
        }
    }

    var layer = L.geoJson(stadtteile, {
        style: function (Stadtteil) {
            return stylestadtteil(Stadtteil, "0-18 Prozent")
        }
    }).addTo(map);

    function getcolor(Stadtteil, altersgroup) {
        var Stadtteilname = Stadtteil.properties.name; //Aufruf stadtteile.js
        var value = getAlter(Stadtteilname, altersgroup);
        if (altersgroup === "0-18 Prozent") {
            if (value <= 11) { //Bedingungen für Farbe des 1. Altersbereichs definieren
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
        if (altersgroup === "0-65 Prozent") {
            if (value <= 65) { //Bedingungen für Farben des 2. Altersbereichs definieren
                return colors [0]
            }
            if (value <= 68) {
                return colors [1]
            }
            if (value <= 71) {
                return colors [2]
            }
            if (value <= 74) {
                return colors [3]
            }
            if (value <= 77) {
                return colors [4]
            }
            if (value <= 80) {
                return colors [5]
            }
        }
        if (altersgroup === "65 und aelter Prozent") {
            if (value <= 13) { //Bedingungen für Farben des 3. Altersbereichs definieren
                return colors [0]
            }
            if (value <= 15) {
                return colors [1]
            }
            if (value <= 17) {
                return colors [2]
            }
            if (value <= 19) {
                return colors [3]
            }
            if (value <= 21) {
                return colors [4]
            }
            if (value <= 23) {
                return colors [5]
            }
        }
    }

    function getAlter(Stadtteilname, altersgroup) { //Schleifen-Funktion für Altersdurchschnitt
        for (var i = 0; i < altersgruppen.length; i++) {
            //Bezug zu altersdurschnitt.js
            if (Stadtteilname.startsWith(altersgruppen[i].Name)) {
                return parseFloat(altersgruppen[i][altersgroup].replace(",", "."))
            }
        }
    }

    var selectbox = document.querySelector(".auswahl")

    function onChange() {
        var altersgroup = selectbox.value
        layer.setStyle(function (Stadtteil) {
            return stylestadtteil(Stadtteil, altersgroup)
        })
    }


    selectbox.addEventListener("change", onChange)


})();