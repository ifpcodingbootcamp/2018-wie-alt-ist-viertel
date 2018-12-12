(function() {

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





})();