
riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){

  function init() {
    var inputStart = document.getElementById('searchTextField');
    var inputDest = document.getElementById('searchTextFieldTwo');
    var autocomplete = new google.maps.places.Autocomplete(inputStart);
    var autocompleteTwo = new google.maps.places.Autocomplete(inputDest);
  }

  google.maps.event.addDomListener(window, 'load', init);
  // $scope.$apply();


}]);

riderApp.controller('farefairyController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';

  $http.get('http://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;
    console.log(data);
})

console.log("hello,");

}]);

// //--------------------------------------------------------MAPBOX-STUFF
// mapboxgl.accessToken = 'pk.eyJ1IjoiamFjcXVlc21hbiIsImEiOiJjaW1veTBwdmowMG0xdTNtMWQ5M3k3bXA1In0.1BaXWoe2pZdBPL5j8CgS7g';
// var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
//     center: [-74.50, 40], // starting position
//     zoom: 9 // starting zoom
// });


riderApp.controller('mapController', [ '$http', '$scope', function($http, $scope){
  function initMap () {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  google.maps.event.addDomListener(window, 'load', initMap);
}]);
