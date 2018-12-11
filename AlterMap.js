//Karte initialisieren, Zentrum und Zoom setzen
var map = L.map('mapid').setView([48.137, 11.576], 10);
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
    style: function (feature) {
        return {
            fillColor:"transparent",
            color:"#333333",
            weight:1.5
        }
    }
}).addTo(map);