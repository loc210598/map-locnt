//init map with autocomplete search
function initMap() {

  var myLatlng = { lat: 21.0717671, lng: 105.7740281 };
  var mapOptions = {
    center: myLatlng,
    zoom: 17,
    mapTypeId: 'terrain',
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };
  var map = new google.maps.Map(document.getElementById('content-wrapper'), mapOptions);

  var kmlLayer = new google.maps.KmlLayer({
    url: 'https://v-hius.github.io/kmlfile.kml',
    //suppressInfoWindows: true,
    map: map
  });

  var myMarker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    map: map
  });

//Click to show coordinates
  // Create the initial InfoWindow.
  var infoWindow = new google.maps.InfoWindow({
    content: 'Nhấn vào bản đồ để hiện Lat/Lng!', 
    position: myLatlng});
    infoWindow.open(map);

  // Configure the click listener.
  map.addListener('click', function(mapsMouseEvent) {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
    infoWindow.setContent(mapsMouseEvent.latLng.toString());
    infoWindow.open(map);
  });

  /////////////////////////////
/*
  var myParser = new geoXML3.parser({map: map});
  myParser.parse('localhost/beerMap/php/testImport.kml');
*/
//Your Location
  addYourLocationButton(map, myMarker);

//Search Place
  addSearchButton(map, myMarker);
  searchPlace(map);

}

function addYourLocationButton(map, marker) {
  var controlDiv = document.createElement('div');

  var ControlUI = document.createElement('button');
  ControlUI.style.backgroundColor = '#fff';
  ControlUI.style.border = 'none';
  ControlUI.style.outline = 'none';
  ControlUI.style.width = '40px';
  ControlUI.style.height = '40px';
  ControlUI.style.borderRadius = '2px';
  ControlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
  ControlUI.style.marginLeft = '10px';
  ControlUI.style.marginRight = '10px';
  ControlUI.style.padding = '0px';
  ControlUI.title = 'Vị trí của bạn';
  controlDiv.appendChild(ControlUI);

  var secondChild = document.createElement('div');
  secondChild.style.margin = '4px';
  secondChild.style.width = '32px';
  secondChild.style.height = '32px';
  secondChild.style.backgroundImage = 'url(https://v-hius.github.io/assets/img/mylocation.png)';
  secondChild.style.backgroundRepeat = 'no-repeat';
  secondChild.id = 'you_location_img';

  ControlUI.appendChild(secondChild);

  ControlUI.addEventListener('click', function() {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              marker.setPosition(latlng);
              map.setCenter(latlng);
              map.setZoom(18);
          });
      }
      else {
          $('#you_location_img').css('background-position', '0px 0px');
      }
  });

  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

function searchPlace(map) {
  // Tạo hộp tìm kiếm và liên kết với thành phần giao diện
  const input = document.getElementById("searchBox");
  const searchBox = new google.maps.places.SearchBox(input);
  // phần hiển thị các kết quả
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // khi người dùng nhập tìm kiếm sẽ trả về chi tiết cho địa điếm đó
  searchBox.addListener("places_changed", () => {
  const places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // xoá điểm đánh dấu tại điểm cũ.
  markers.forEach(marker => {
    marker.setMap(null);
  });
  markers = [];

  //Biểu tượng, tên, vị trí của mỗi nơi
  const bounds = new google.maps.LatLngBounds();
  places.forEach(place => {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    
    const icon = {
      url: place.icon,
      size: new google.maps.Size(80, 80),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    
    // Tạo đánh dấu cho từng nơi
    markers.push(
      new google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location
      })
    );

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
  });
}

function addSearchButton(map, marker) {
    var controlDiv = document.createElement('div');

    var ControlUI = document.createElement('button');
    ControlUI.style.backgroundColor = '#fff';
    ControlUI.style.border = 'none';
    ControlUI.style.outline = 'none';
    ControlUI.style.width = '32px';
    ControlUI.style.height = '32px';
    ControlUI.style.borderRadius = '8px';
    ControlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    ControlUI.style.backgroundColor = 'rgba(0,191,255,1)';
    ControlUI.style.marginLeft = '270px';
    ControlUI.style.marginTop = '10px';
    ControlUI.style.padding = '0px';
    ControlUI.style.textAlign = 'center';
    ControlUI.title = 'Tìm kiếm';
    controlDiv.appendChild(ControlUI);

    var ControlText = document.createElement('div');
    ControlText.style.height = '32px';
    ControlText.style.width = '32px';
    ControlText.style.backgroundImage = 'url(assets/img/searchLocation.png)';
    ControlText.style.backgroundRepeat = 'no-repeat';
    ControlText.id = 'you_location_img';

    ControlUI.appendChild(ControlText);
    ControlUI.addEventListener('click', function() {
        alert("Click..click...");
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
}

