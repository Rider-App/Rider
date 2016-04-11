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
  // $(document).bind("projectLoadComplete", initialize);

  $('.header-right').on('click', function () {
    $('.hamburger-menu').toggleClass('show');
  });

  $('.header-left').on('click', function () {
    $('.login-modal-cont').toggleClass('show');

  });

  $('.login-modal-x').on('click', function () {
    $('.login-modal-cont.show').removeClass('show');

  });

  // geolocation API
  $scope.geoLocation = function(){

  navigator.geolocation.getCurrentPosition(function(position) {
    $("#searchTextField").val(position.coords.latitude + " , " + position.coords.longitude);
    console.log(position.coords.latitude, position.coords.longitude);
  });

}; //closes geoLocation

}]); //closes mainController

riderApp.controller('farefairyController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';
  //pseudocoding and setup for post request
  // var originAddress = $(".searchTextField").val()
  // var destinationAddress = $("searchTextFieldTwo").val()
  //
  // $http.post('http://farefairy.herokuapp.com/?origin=' + originAddress + '&destination=' + destinationAddress , { origin_address: originAddress }, {destination_address: destinationAddress} )
  // .then(function (result) { })
  // .catch(function (error) { });

  $http.get('https://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
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

  $(".ridesharing-special").hide();//Hide special_considerations warning

  $http.get('https://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;

    $scope.rideName = $scope.farefairy.ride_sharing[rideType].details.ride_sharing;
    //NG Repeat for the detail cost section.

    //Determination for SURGE PRICING
    var surgePricing = $scope.farefairy.ride_sharing[rideType].details.special_considerations;
    if(surgePricing === "surge pricing"){
      $(".ridesharing-special").show();
      $(".special-considerations-text").html("Surge Pricing");
    }
    else if(surgePricing === "prime time"){
      $(".ridesharing-special").show();
      $(".special-considerations-text").html("Prime Time");
    }

    // $scope.ridesharing = $scope.farefairy.ride_sharing;
    // console.log(data.ride_sharing);
    // console.log(data);
    // console.log(data.ride_sharing);
    // console.log(data.ride_sharing[rideType]);
    // console.log(data.ride_sharing[rideType].details);
    // console.log(data.ride_sharing[rideType].details.ride_sharing);
    // console.log(data.ride_sharing[rideType].details.ride_sharing[1]);
    // console.log(data.ride_sharing[rideType].details.ride_sharing[0].ride_name);
    $scope.mode = data.ride_sharing[rideType].travel_type;
    $scope.totalETA = data.ride_sharing[rideType].eta;


    console.log(data);
  })

}]); //closes ridesharing controller

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
