function initMap() {
        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Styled Map'});

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 49.2827, lng: -123.1207},
          zoom: 11,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        function addMarker(position, title) {
          const marker = new google.maps.Marker({
            "position": position,
            "map": map,
            "title": title
          });
          return marker;
        }

        function createContentString(object) {
          const title = $("<h1>").text(object.title);
          const description = $("<p>").text(object.description);
          const image = $(`<img src=${object.image}>`);
          const box = $("<div>").addClass("info-window").append(title, description, image);

          return $("<div>").append(box).html();
        }

        function addInfoWindow(contentString) {
          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          return infowindow;
        }

        function renderPoints(pointsArray){
          pointsArray.forEach(function(pointObject){
            const latitude = pointObject.lat;
            const longitude = pointObject.lng;
            const position = {lat: latitude, lng: longitude};
            const title = pointObject.title;
            const marker = addMarker(position, title);
            const infowindow = addInfoWindow(createContentString(pointObject));
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
          });
        }

        const mapObject = {
          "favorites": {},
          "points": [{
            "lat": 49.2827,
            "lng": -123.1207,
            "title": "lol",
            "description": "helloooooo",
            "image":"https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3"
          },
          {
            "lat": 49,
            "lng": -123.2,
            "title": "hi",
            "description": "oyooooooo",
            "image": "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3"
          }]
        };
        renderPoints(mapObject.points);

}
