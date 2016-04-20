var riderApp = angular.module('riderApp', ['ngRoute']);

riderApp.config( ['$compileProvider', function( $compileProvider ){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|chrome-extension|mailto|uber|lyft|tel):/);
}]);

riderApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'home.html',
            })
            .when('/SignUp', {
                templateUrl : 'sign-up.html',
            })
            .when('/Rates', {
                templateUrl : 'rates.html',
            })
            .when('/LearnMore', {
                templateUrl : 'learn-more.html',
            })
            .when('/Ridesharing', {
                templateUrl : 'ridesharing.html',
            })
            .when('/Taxi', {
                templateUrl : 'taxi.html',
            })
            .when('/PublicTransit', {
                templateUrl : 'public-transit.html',
            })
            .when('/Favorites', {
                templateUrl : 'favorites.html',
            })
          }); //closes riderApp routeProvider

var origin = "";
var destination = "";
var farefairy = {};


riderApp.factory('mainInfo', function($http){
  var factory = {};
  // var origin = "";
  // var destination = "";
  // var farefairy = {};
  var favoriteLocation;

  factory.setOrigin = function(originAddress){
    origin = originAddress;
  };

  factory.getOrigin = function(){
    return origin;
  };

  factory.setDestination = function(destinationAddress){
    destination = destinationAddress;
  };

  factory.getDestination = function(){
    return destination;
  };

  factory.setFarefairy = function(data, status) {
    farefairy = data;
  };

  factory.getFarefairy = function(){
    return farefairy;
  }

  factory.getSessions = function(){
   return $http.get('https://farefairy.herokuapp.com/api/v1/fares/?origin=' + origin + '&destination=' + destination);
  };

  factory.initMap = function() {
     var originLat = farefairy.data.results.origin_lat;
     var originLng = farefairy.data.results.origin_lng;
     var destinationLat = farefairy.data.results.destination_lat;
     var destinationLng = farefairy.data.results.destination_lng;
     console.log(farefairy);
     var latlng = new google.maps.LatLng(-34.397, 150.644);
     var originCoord = {lat: originLat, lng: originLng};
     var destinationCoord = {lat: destinationLat, lng: destinationLng};
     var myOptions = {
       zoom: 8,
       center: latlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
    //  var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    //  console.log("a little further, this time")
     var map = new google.maps.Map(document.getElementById('map'), {
       center: originCoord,
       zoom: 8
     });
     var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
     });
     // Set destination, origin and travel mode.
      var request = {
        destination: destinationCoord,
        origin: originCoord,
        travelMode: google.maps.TravelMode.DRIVING
      };
      // console.log("even further, this time")
      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      });
   }

   factory.setFavoriteLocation = function(location){
     favoriteLocation = location;
   }

   factory.getFavoriteLocation = function(){
     return favoriteLocation;
   }


  return factory;
});//end factory

riderApp.factory('transitMapFactory', function($http){
  var factory = {};

  factory.initMap = function() {
    console.log("falaTones")
     var originLat = farefairy.data.results.origin_lat;
     var originLng = farefairy.data.results.origin_lng;
     var destinationLat = farefairy.data.results.destination_lat;
     var destinationLng = farefairy.data.results.destination_lng;
     var latlng = new google.maps.LatLng(-34.397, 150.644);
     var originCoord = {lat: originLat, lng: originLng};
     var destinationCoord = {lat: destinationLat, lng: destinationLng};
     var myOptions = {
       zoom: 8,
       center: latlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
    //  var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    //  console.log("a little further, this time")
     var map = new google.maps.Map(document.getElementById('map-pt'), {
       center: originCoord,
       zoom: 8
     });
     var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
     });
     // Set destination, origin and travel mode.
      var request = {
        destination: destinationCoord,
        origin: originCoord,
        travelMode: google.maps.TravelMode.TRANSIT
      };
      // console.log("even further, this time")
      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      });
   }

  return factory;
});//end transit map factory


var isMobile= {
   android: function () {
     return navigator.userAgent.match(/Android/i);
   },
   iOS: function () {
     return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   }
 };

riderApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
  }]);
