/*Run Functions*/
geoFindMe();
getAtt();
getVideo();
onlineStatus();
localStorage();


/*Geolocation*/
function geoFindMe() {
  var output = document.getElementById("out_one");

  //Not Supported
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  //Success
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  //Error
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

}


/*Attributes*/
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
        //Print key and value pair of attributes dictionary
        for (key in data){
          k_v = key + ": " + data[key];
          console.log(k_v);
          var output = document.getElementById("out_two");
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


/*Video*/
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
}


/*Online Status*/
function onlineStatus() {
  var output = document.getElementById("out_four");
  var xmark = new Image();
  var check = new Image();
  check.src = "check.png";
  xmark.src = "xmark.png";
  online = window.navigator.onLine;
  if (online){
    output.appendChild(check);
  }
  else {
    output.appendChild(xmark);
  }

  window.addEventListener('offline', function(e) { output.appendChild(xmark); output.removeChild(check)});
  window.addEventListener('online', function(e) { output.appendChild(check); output.removeChild(xmark)});
}


/*Local Storage*/
function localStorage() {
  const dbName = "test";

  var request = indexedDB.open(dbName, 2);

  request.onerror = function(event) {
    // Handle errors.
  };
  request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("date", { keyPath: "dt" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("time", "time", { unique: false });


  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("date", "readwrite").objectStore("date");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer,1);
    });
  };
};
}
