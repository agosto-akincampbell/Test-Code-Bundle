//Geolocation
function geoFindMe() {
  var output = document.getElementById("out_one");
  var location = document.getElementById("location");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

  location.classList.add("one_style");
  output.classList.add("one_style");
}

//Attributes
function getAtt() {
  fetch('/skDisplay', {
    //body: data,//JSON.stringify(data), // must match 'Content-Type' header
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *omit
    method: 'GET', // *GET, PUT, DELETE, etc.
    mode: 'no-cors' // no-cors, *same-origin
  })
    .then(function(response) {

      console.log(response);
      response.json().then(function (data){
        for (key in data){
          k_v = key + ": " + data[key];
          console.log(k_v);
          var output = document.getElementById("out_two");
          var attributes = document.getElementById("attributes");
          output.innerHTML = k_v;
          attributes.classList.add("two_style");
          output.classList.add("two_style");

        }


      })
      //return response.json();

    },function(response) {

      console.log(response);
      return response.json();})
    /*.then(function(myJson) {
      console.log(myJson);
    });*/
}

//Video
function getVideo() {
  const player = document.getElementById('player');

  const constraints = {
    video: true,
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });

  var output = document.getElementById("out_three");
  var media = document.getElementById("media");
  output.classList.add("three_style");
  media.classList.add("three_style");
}
