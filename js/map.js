$(document).ready(function() {
    // create a map in the "map" div
    window.map = L.map("map");
    // Start the map at the centre of Wellington
    wellingtonCentral = {
        lng: 174.776172,
        lat: -41.288734
    };
    window.map.setView(wellingtonCentral, 13);

    // add an OpenStreetMap tile layer http://{s}.tile.osm.org/{z}/{x}/{y}.png
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(map);

    $.getJSON("locations.json", function(data) {
        window.markers = add_data_to_map(data.locations);
    });

    navigator.geolocation.getCurrentPosition(function setCenter(gps) {
        userLocation = {
            lat: gps.coords.latitude,
            lng: gps.coords.longitude
        };

        var personMarker = L.AwesomeMarkers.icon({
            icon: "male",
            prefix: "fa",
            markerColor: "orange",
            iconColor: "white"
        });
        L.marker(userLocation, { icon: personMarker }).addTo(map);

        // Assumption: Data will be loaded before users location is ready
        find_closest(userLocation, window.markers);
    });
});

function add_data_to_map(locationData) {
    // Reformat coordinates json
    $.map(locationData, function fixGeometry(feature) {
        var longLat = feature.geometry.coordinates;
        feature.geometry.coordinates = {
            lng: longLat[0],
            lat: longLat[1]
        };
    });

    var coolMarker = L.AwesomeMarkers.icon({
        markerColor: "blue"
    });

    var markers = [];
    $.each(locationData, function dropMarker(index, feature) {
        if (feature && feature.geometry && feature.geometry.coordinates) {
            var marker = L.marker(feature.geometry.coordinates, {
                icon: coolMarker
            }).addTo(map);
            markers.push(marker);

            // TODO this should be templated
            var bubbleContent = "";
            bubbleContent += "<h2>" + feature.properties.Location + "</h2>";
            bubbleContent += "<p><strong>Opening Hours</strong><br />";
            bubbleContent += feature.properties.Open_hours + "</p>";

            marker.bindPopup(bubbleContent);
        }
    });

    return markers;
}

function find_closest(userLocation, markers) {
    // Find closest loo
    var minDistance = 9999999;
    closestMarker = markers[0];

    $.each(markers, function calculateDistance(index, thisMarker) {
        var thisPopup = thisMarker.getPopup();
        var howFar = thisMarker.getLatLng().distanceTo(userLocation);
        minDistance = Math.min(minDistance, howFar);

        thisPopup.setContent(
            thisPopup.getContent() +
                '<p class="distance"><strong>Distance</strong><br />' +
                Math.round(howFar) +
                " metres away</p>"
        );
        if (minDistance == howFar) {
            closestMarker = thisMarker;
        }
    });

    map.fitBounds([closestMarker.getLatLng(), userLocation], {
        padding: [200, 200]
    });
    closestMarker.openPopup();
}
