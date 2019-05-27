const initField = (field, startValue, cb, usesVal=false) => {
  usesVal ? field.val(startValue) : field.text(startValue)
  field
    .attr('contenteditable', true)
    .on('keyup change paste', () => {cb(field.text())});
}

const emptyPointData = {
  title: 'title',
  description: 'description',
  image: 'image_url',
  editorid: 'alice',
  lat: 0,
  lng: 0,
}

class Point {
  constructor(map, data={}) {
    this._state = {...emptyPointData, ...data};
    this._editable = false;
    this.element = this._makePointElement();
    this._marker = this._makePointMarker(map);
    this._infoWindow = this._addInfoWindow();
    this._updatePosition = this.updatePosition.bind(this);
    this._addMarkerHandlers(map);
  }

  getData() {
    return {... this._state};
  }


  _createInfoWindowMarkup() {
    const {title, image} = this._state;
    const contentElement =  $(`
      <article class='info-window'><h1 class="title"></h1>
        <p class="description"></p>
        <img class="image">
      </article>
    `)
    contentElement
      .addClass('point')
      .find('.title').text(title);
    contentElement
      .find('.image').attr('src', image);
    return contentElement.html();
  }

  _addInfoWindow() {
    const markup = this._createInfoWindowMarkup();
    console.log(markup);
    return new google.maps.InfoWindow({
      content: markup,
    })
  }

  updatePosition(newPosition) {
    const { lat, lng } = newPosition;
    this._state.lat = lat || this._state.lat
    this._state.lng = lng || this._state.lng
    this._marker.setPosition(newPosition);
  }

  _updateInfoWindowContent() {
    this._infoWindow.setContent(this._createInfoWindowMarkup());
  }

  _makePointElement() {
    const pointElement = $(`<article class="point-container hvr-grow">`)
    pointElement
      .load('/content/point-template.html', () => {
        console.log(this._state.title)
        initField(
          pointElement.find('.point__title'),
          this._state.title,
          text => {
            this._state.title = text
            this._updateInfoWindowContent()
          },
        );
        initField(
          pointElement.find('.point__description'),
          this._state.description,
          text => this._state.description = text,
        );
        initField(
          pointElement.find('.point__lat'),
          this._state.lat,
          text => {
            const lat = Number(text)
            this._updatePosition({ lat })
          },
        );
        initField(
          pointElement.find('.point__lng'),
          this._state.lng,
          text => {
            const lng = Number(text)
            this.updatePosition({ lng });
          },
          true,
        );
      });


    console.log('pointElement: ', pointElement[0]);
    return pointElement;
  }

  _makePointMarker(map) {
    const { lat, lng, title } = this._state;
    const position = { lat, lng };
    return new google.maps.Marker({
      position,
      map,
      title,
    })
  }

  _addMarkerHandlers(map) {
    const marker = this._marker;
    marker.addListener('mouseover', (event) => {
      this._infoWindow.open(map, marker);
    });
    marker.addListener('mouseout', event => {
      this._infoWindow.close()
    })

  }
}

const initPoints  = (pointsData, map, pointsContainer) => {

  console.log('running initPoints')
  const newPoint = (data) => {
    const point = new Point(map, data || {});
    pointsContainer.append(point.element);
    return point;
  }

  const points =  pointsData.map(newPoint);


  $('.info__add-point').click((event) => {
    console.log('adding point')
    const point = newPoint()
    const listenerHandle = map.addListener('click', (event) => {
      const {lat, lng} = event.latLng
      point.updatePosition({lat: lat(), lng: lng()})
      google.maps.event.removeListener(listenerHandle);
    });
    points.push(point);
  })


  return () => points.map(point => point.getData());
}

const initMapState = (mapObject, map, mapid) => {

  const { mapInfo, points: pointsData, userFavorites} = mapObject;
  const titleElement = $("span.maptitle")
  console.log('title', mapInfo.name);


  initField(titleElement, mapInfo.name, text => mapInfo.name = text);

  initField(
    $("p.mapdescription"),
    mapInfo.description,
    text => mapInfo.description = text,
  )

  const getPointsData = initPoints(pointsData, map, $('.locations'));

  $('.button__save').click(function (event) {
    event.preventDefault()
    console.log('clicked save button')
    const data = { mapInfo, points: getPointsData() }
    console.log('data', data);
    $.ajax({
      method: 'PUT',
      url: `/api/maps/${mapid}/save`,
      data,
      error: (err) => alert('oh no'),
    });
  })
}

$(document).on( "click", "article.point-container.hvr-grow" , function(event) {
    $(this).find( "footer" ).slideDown();
});

$(document).on( "click", ".delete-button", function(event) {
  $(this).parents("article.point-container").remove();
});
