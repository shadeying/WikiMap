const initMapFactory = (mapid) => {
  return function () {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
      [{
          elementType: 'geometry',
          stylers: [{
            color: '#ebe3cd'
          }]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#523735'
          }]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [{
            color: '#f5f1e6'
          }]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{
            color: '#c9b2a6'
          }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{
            color: '#dcd2be'
          }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#ae9e90'
          }]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{
            color: '#dfd2ae'
          }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{
            color: '#dfd2ae'
          }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#93817c'
          }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{
            color: '#a5b076'
          }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#447530'
          }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{
            color: '#f5f1e6'
          }]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{
            color: '#fdfcf8'
          }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{
            color: '#f8c967'
          }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{
            color: '#e9bc62'
          }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{
            color: '#e98d58'
          }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{
            color: '#db8555'
          }]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#806b63'
          }]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{
            color: '#dfd2ae'
          }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#8f7d77'
          }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{
            color: '#ebe3cd'
          }]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{
            color: '#dfd2ae'
          }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{
            color: '#b9d3c2'
          }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#92998d'
          }]
        }
      ], {
        name: 'Styled Map'
      });

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 49.2827,
        lng: -123.1207
      },
      zoom: 11,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
          'styled_map'
        ]
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

    function renderPoints(pointsArray) {
      pointsArray.forEach(function (pointObject) {
        const latitude = pointObject.lat;
        const longitude = pointObject.lng;
        const position = {
          lat: latitude,
          lng: longitude
        };
        const title = pointObject.title;
        const marker = addMarker(position, title);
        const infowindow = addInfoWindow(createContentString(pointObject));
        marker.addListener('click', function () {
          infowindow.open(map, marker);
        });
      });
    }

    function renderPage(mapObject) {
      renderPoints(mapObject.points);
      const title = $("span.maptitle").text(mapObject.mapInfo.name);
      const description = $("p.mapdescription").text(mapObject.mapInfo.description);

      mapObject.points.forEach(pointObject => {
        const pointTitle = $("<section>").addClass("edit-title").append($(`<h2>Title</h2><input type="text" name="pointtitle" placeholder="Title">`));
        const pointDescription = $("<section>").addClass("edit-description").append($(`<h2>Description</h2><textarea name="text" placeholder="Description"></textarea>`));
        const image = $("<section>").addClass("imageURL").append($(`<h2>Image URL</h2><textarea name="text" placeholder="Image URL"></textarea>`));
        const remove = $(`<div id="delete-button"><i class="fa fa-trash"></i> Delete Place :|</div>`);

        const placeHolder = $("<div>").addClass("point hvr-grow").attr("id", pointObject.id).text(pointObject.title);
        const editBox = $(`<div class="edit-point" style="display: none;"></div>`).append(pointTitle, pointDescription, image, remove);
        const container = $("<section>").addClass("point-container").attr("id", pointObject.lat).append(placeHolder, editBox).appendTo("div.locations");
      });
    }

    function loadMap(mapObject) {
      $.get("/map", renderPage(mapObject));
    }

    // function loadMap(){
    //   $.get("/map", function(data){
    //     renderPage(data);
    //     var data = data;
    //   });
    // }

    const mapObject = {
      "mapInfo": {
        "mapid": 1,
        "ownerid": "alice",
        "name": "I am a title",
        "description": "this is map a"
      },
      "points": [{
          "id": 29,
          "title": "point_a1",
          "image": "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3",
          "editorid": "alice",
          "description": "this is point a1",
          "lat": 49.246292,
          "lng": -123.116226
        },
        {
          "id": 30,
          "title": "point_a2",
          "image": "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3",
          "editorid": "charlie",
          "description": "this is point a2",
          "lat": 49.23,
          "lng": -123.10
        }
      ],
      "userFavorites": [
        "bob",
        "alice"
      ]
    }

    $.get(`/api/maps/${mapid}`)
      .done(loadMap)
      .fail(() => alert('request error'));

    let click = 0;
    let markers = [];

    $("#edit-button").click(function () {
      $("div.edit").slideToggle();
      $("input[name=maptitle]").focus();
      if (click === 0) {
        click++;
      } else {
        click--;
      }

      const mapListener = map.addListener('click', function (event) {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const position = {
          lat: latitude,
          lng: longitude
        };
        const marker = addMarker(position);
        markers.push(marker.getPosition());

        const title = $("<section>").addClass("edit-title").append($(`<h2>Title</h2><input type="text" name="pointtitle" placeholder="Title">`));
        const description = $("<section>").addClass("edit-description").append($(`<h2>Description</h2><textarea name="text" placeholder="Description"></textarea>`));
        const image = $("<section>").addClass("imageURL").append($(`<h2>Image URL</h2><textarea name="text" placeholder="Image URL"></textarea>`));
        const remove = $(`<div id="delete-button"><i class="fa fa-trash"></i> Delete Place :|</div>`);

        const placeHolder = $("<div>").addClass("point hvr-grow");
        const editBox = $("<div>").addClass("edit-point").append(title, description, image, remove);
        const container = $("<section>").addClass("point-container").attr("id", latitude).append(placeHolder, editBox).appendTo("div.locations");
      });

      if (click === 0) {
        google.maps.event.clearListeners(map);
      }
    });

    function check(val, ref) {
      if (val) {
        return val;
      }
      return ref;
    }

    $(document).on("click", "button.save-button", function (event) {
      event.preventDefault();
      const mapName = $(".edit-title input[name=maptitle]").val();
      const mapDescription = $(".edit-mapdescription textarea[name=text]").val();
      const points = [];
      const oldPointArray = data.points;

      markers.forEach(marker => {
        var index = 0;
        for (let i = 0; i < oldPointArray.length; i++) {
          if (marker.lat() == oldPointArray[i].lat) {
            index = i;
            break;
          }
        }
        const pointID = oldPointArray[index].id;
        const pointTitle = $("#" + marker.lat()).find(".edit-title input[name=pointtitle]").val();
        const pointDescription = $("#" + marker.lat()).find(".edit-description textarea[name=text]").val();
        const pointImage = $("#" + marker.lat()).find(".imageURL textarea[name=text]").val();

        const pointObject = {
          title: check(pointTitle, oldPointArray[index].title),
          image: check(pointImage, oldPointArray[index].image),
          // editorid: req.session.userid,
          description: check(pointDescription, oldPointArray[index].description),
          lat: marker.lat(),
          lng: marker.lng()
        };
        if (pointID) {
          pointObject.id = pointID;
        }
        points.push(pointObject);
      });

      const object = {
        "mapInfo": {
          "mapid": data.mapInfo.mapid,
          "ownerid": data.mapInfo.ownerid,
          "name": check(mapName, data.mapInfo.name),
          "description": check(mapDescription, data.mapInfo.description)
        },
        "points": points,
        "userFavorites": data.userFavorites
      }

      $.put("/api/maps/:mapid/save/", object, loadMap);
      $("input").val("");
      $("textarea").val("");
      $("div.edit").slideUp();
    });
  }
}
