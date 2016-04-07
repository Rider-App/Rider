// $('.header-right').on('click', function () {
//   $('.hamburger-menu').toggleClass('show');
// });
//doesn't work unless it's in a controller
var rideType;

riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){

  function init() {
    var inputStart = document.getElementById('searchTextField');
    var inputDest = document.getElementById('searchTextFieldTwo');
    var autocomplete = new google.maps.places.Autocomplete(inputStart);
    var autocompleteTwo = new google.maps.places.Autocomplete(inputDest);
  }

  google.maps.event.addDomListener(window, 'load', init);
  // $scope.$apply();

  $('.header-right').on('click', function () {
    $('.hamburger-menu').toggleClass('show');
  });

  $('.header-left').on('click', function () {
    $('.login-modal-cont').toggleClass('show');

  });

  $('.login-modal-x').on('click', function () {
    $('.login-modal-cont.show').removeClass('show');

  });

}]);

riderApp.controller('farefairyController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';
  //pseudocoding and setup for post request
  // var originAddress = $(".searchTextField").val()
  // var destinationAddress = $("searchTextFieldTwo").val()
  //
  // $http.post('http://farefairy.herokuapp.com/?origin=' + originAddress + '&destination=' + destinationAddress , { origin_address: originAddress }, {destination_address: destinationAddress} )
  // .then(function (result) { })
  // .catch(function (error) { });

  $http.get('http://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;
    $scope.ridesharing = $scope.farefairy.ride_sharing;
    // console.log(data.ride_sharing);
    // console.log(data);
  })

  $('.fa-info-circle').on('click', function () {
    $('.special-consid-modal').toggleClass('show');
  });

  $scope.clickedRideshare = function(index){
    rideType = index;
  }

}]);

riderApp.controller('rideSharingController', ['$http', '$scope', function($http, $scope){

  $http.get('http://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;

    // $scope.ridesharing = $scope.farefairy.ride_sharing;
    // console.log(data.ride_sharing);
    // console.log(data);
    $scope.mode = data.ride_sharing[rideType].travel_type;
    $scope.carTypeOne = data.ride_sharing[rideType].details.options[0].ride_name;
    $scope.carTypeTwo = data.ride_sharing[rideType].details.options[1].ride_name;
    $scope.carTypeThree = data.ride_sharing[rideType].details.options[2].ride_name;

    $scope.priceOneMin = data.ride_sharing[rideType].details.options[0].price_min;
    $scope.priceOneMax = data.ride_sharing[rideType].details.options[0].price_max;
    $scope.priceTwoMin = data.ride_sharing[rideType].details.options[1].price_min;
    $scope.priceTwoMax = data.ride_sharing[rideType].details.options[1].price_max;
    $scope.priceThreeMin = data.ride_sharing[rideType].details.options[2].price_min;
    $scope.priceThreeMax = data.ride_sharing[rideType].details.options[2].price_max;

    $scope.pickupETA = data.ride_sharing[rideType].details.options[0].pickup_eta;
    $scope.transitTime = data.ride_sharing[rideType].details.options[0].transit_time;
    $scope.totalETA = data.ride_sharing[rideType].details.options[0].total_eta;



    console.log(data);
  })

}]);

riderApp.controller('ratesController', ['$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';
//USE THIS LATER
}])


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
