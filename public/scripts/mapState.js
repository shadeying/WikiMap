
const initField = (field, startValue, cb, usesVal=false) => {
  usesVal ? field.val(startValue) : field.text(startValue)
  field
    .attr('contenteditable', true)
    .on('keyup change paste', () => {cb(field.text())});
}

const emptyPointData = {
  title: '',
  description: '',
  img: '',
  lat: null,
  lng: null,
}

class Point {
  constructor(map, data={}) {
    this._state = {...emptyPointData, ...data};
    this._editable = false;
    this._element = this._makePointElement();
    this._marker = this._makePointMarker(map);
    this._infoWindow = this._addInfoWindow();
    this._updatePosition = this._updatePosition.bind(this);
    this._addMarkerHandlers(map);
  }

  getData() {
    return {... this._state};
  }

  _createInfoWindowMarkup() {
    const {title, description, image} = this._state;
    const contentElement =  $(`
      <article><h1 class="title"></h1>
        <p class="description"></p>
        <img class="image">
      </article>
    `)
    contentElement
      .addClass('point')
      .find('.title').text(title);
    contentElement
      .find('.image').attr('src', image);
    return contentElement;
  }

  _addInfoWindow() {
    const markup = this._createInfoWindowMarkup().html();
    console.log(markup);
    return new google.maps.InfoWindow({
      content: markup,
    })
  }

  _updatePosition() {
    const newPosition = {
      lat: this._state.lat,
      lng: this._state.lng,
    }
    this._marker.setPosition(newPosition);
  }

  _makePointElement() {
    const pointElement = $('<article>')
    pointElement
      .load('/content/point-template.html', () => {
        console.log(this._state.title)
        initField(
          pointElement.find('.point__title'),
          this._state.title,
          text => this._state.title = text,
        );
        initField(
          pointElement.find('.point__description'),
          this._state.description,
          text => this._state.description = text,
        );
        initField(
          pointElement.find('.point__lat'),
          this._state.lat,
          text => this._state.lat = Number(text),
        );
        initField(
          pointElement.find('.point__lng'),
          this._state.lng,
          text => {
            this._state.lng = Number(text);
            this._updatePosition()
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
      console.log('handled like a boss')
      this._infoWindow.open(map, marker);
    });
  }
}

const initPoints  = (pointsData, map, pointsContainer) => {

  const addButton = pointsContainer.find('.add-point')

  const newPoint = (data) => {
    const point = new Point(map, data || {});
    pointsContainer.append(point._element);
    return point;
  }

  addButton.on('click', (event) => {
    newPoint()
    .focus()
  })

  const points =  pointsData.map(newPoint);

  return () => points.map(point => point.getData());
}

const initMapState = (mapObject, map) => {

  const { mapInfo, points: pointsData, userFavorites} = mapObject;
  const titleElement = $("span.maptitle")

  initField(titleElement, mapInfo.title, text => mapInfo.title);

  initField(
    $("p.mapdescription"),
    mapInfo.description,
    text => mapInfo.description
  )

  const getPointsData = initPoints(pointsData, map, $('.locations'));

  $('edit__save').on('click', function () {
    $.put(`/api/maps/${mapid}/save`, {
      data: { mapInfo, points: getPointsData()  },
      success: () => alert('we did it bois'),
    })
  })
}
