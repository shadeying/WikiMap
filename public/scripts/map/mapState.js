const initField = (field, startValue, cb) => {
  field.text(startValue);
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
  constructor(map, removeHandler, data={}) {
    this._state = {...emptyPointData, ...data};
    this._map = map;
    this._editable = false;
    this.element = this._makePointElement();
    this.marker = this._makePointMarker();
    this._infoWindow = this._addInfoWindow();
    this.updatePosition = this.updatePosition.bind(this);
    this._addMarkerHandlers();
    this._addRemoveHandler(removeHandler);
  }

  _addRemoveHandler (handler) {
    this.element
      .find('.delete-button')
      .click(() => {
        this.element.remove();
        this.marker.setMap(null);
        handler();
      })
  }

  getData() {
    return { ...this._state };
  }

  _createInfoWindowMarkup() {
    const { title, image } = this._state;
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
    return contentElement.html();
  }

  _addInfoWindow() {
    const markup = this._createInfoWindowMarkup();
    return new google.maps.InfoWindow({
      content: markup,
    })
  }

  updatePosition(newPosition) {
    const { lat, lng } = newPosition;
    this._state.lat = lat || this._state.lat
    this._state.lng = lng || this._state.lng
    this.marker.setPosition(newPosition);
  }

  _updateInfoWindowContent() {
    this._infoWindow.setContent(this._createInfoWindowMarkup());
  }
  _makePointElement() {
    const pointElement = $( `
        <article class="point hvr-grow">
          <header>
            <label class="point__title"></label>
            <img/>
          </header>
          <footer class="point-footer" style="display:none;">
            <span class="point__description"></span>
            <span class="point__img-url"></span>
            <span class="point__location">
              <span class="point__lat" style="display:none;"></span>
              <span class="point_lng"></span>
            </span>
            <span class="delete-button"><i class="fa fa-trash"></i> Delete </span>
          </footer>
        </article>
    `)
    initField(
      pointElement.find('.point__title'),
      this._state.title,
      text => {
        this._state.title = text
        this._updateInfoWindowContent()
        this._state.editorid = userid;
      },
    );

    initField(
      pointElement.find('.point__description'),
      this._state.description,
      text => this._state.description = text,
    );

    initField(
      pointElement.find('.point__img-url'),
      this._state.image,
      text => {
        this._state.image = text;
        this._updateInfoWindowContent();
      },
    )

    initField(
      pointElement.find('.point__lat'),
      this._state.lat,
      text => {
        const lat = Number(text)
        this.updatePosition({ lat })
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

    return pointElement;
  }

  _makePointMarker() {
    const { lat, lng, title } = this._state;
    const position = { lat, lng };
    return new google.maps.Marker({
      position,
      map: this._map,
      title,
    })
  }

  _addMarkerHandlers() {
    const marker = this.marker;
    marker.addListener('mouseover', (event) => {
      this._infoWindow.open(this._map, marker);
    });
    marker.addListener('mouseout', event => {
      this._infoWindow.close()
    })

  }
}

class PointsContainer  {
  constructor(pointsData, map, element) {
    this._map = map;
    this.points = [];
    this._element = element;
    this._removePoint = this._removePoint.bind(this);
    this.addPoint = this.addPoint.bind(this);
    pointsData.forEach(this.addPoint);
  }

  addPoint (data) {
    const point = new Point(this._map, this._removePoint, data || {});
    console.log('pushing to _points')
    this._element.append(point.element);
    this.points.push(point);
    return point;
  }

  _removePoint(index) {
    this.points.splice(index, 1);
  }

}

const initPoints  = (pointsData, map, containerElement) => {
  console.log('running initPoints')

  const pointsContainer = new PointsContainer(pointsData, map, containerElement)

  $('.point header').click(function (event) {
    console.log('clicked header');
    $(this).parent().find('footer').slideToggle();
  })


  $('.info__add-point').click((event) => {
    console.log('adding point')
    const point = pointsContainer.addPoint()
    const listenerHandle = map.addListener('click', (event) => {
      const {lat, lng} = event.latLng
      point.updatePosition({lat: lat(), lng: lng()})
      google.maps.event.removeListener(listenerHandle);
    });
  })


  return () => pointsContainer.points.map(point => point.getData());
}

const initFavoriteBtn = (userid, mapid, userFavorites) => {
  const button = $('.fav-button')

  button.click(() => {
    $.ajax({
      method: 'POST',
      url: `/api/maps/${mapid}/toggleFavorite`,
      success: (outcome) => {
        if (outcome) {
          console.log('faved!')
          button.addClass('favorited')
        } else {
          button.removeClass('favorited')
          console.log('deleted fave!')
        }
      },
    });
  })
}

const initMapState = (mapObject, map, mapid, userid) => {

  const { mapInfo, points: pointsData, userFavorites} = mapObject;
  const titleElement = $("span.maptitle")
  console.log('title', mapInfo.name);

  initFavoriteBtn(userid, mapid, userFavorites);

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
