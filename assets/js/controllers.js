
riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';
  //
  // function init() {
  //   var input = document.getElementById('searchTextField');
  //   var autocomplete = new google.maps.places.Autocomplete(input);
  // }
  //
  // google.maps.event.addDomListener(window, 'load', init);


//--------------------------------------MAPBOX-STUFF


    mapboxgl.accessToken = 'pk.eyJ1IjoiamFjcXVlc21hbiIsImEiOiJjaW1veTBwdmowMG0xdTNtMWQ5M3k3bXA1In0.1BaXWoe2pZdBPL5j8CgS7g';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});
}]);
