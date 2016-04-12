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

  $http.get('https://farefairy.herokuapp.com/fares/show?origin=904%20Lambeth%20Circle%20Durham%20NC%2027705&destination=800%20Blackwell%20St,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;
    $scope.ridesharing = $scope.farefairy.ride_sharing;
    $scope.publicTransit = $scope.farefairy.transit;
    $scope.taxi = $scope.farefairy.taxis[0];
    $scope.taxiDetail = $scope.farefairy.taxis[0].details.contact_info;
    console.log($scope.farefairy.taxis[0].details.contact_info)
    // console.log(data.transit);
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

  $http.get('https://farefairy.herokuapp.com/fares/show?origin=154%20Grand%20St%20New%20York%20NY%2010013&destination=435%20E%2070th%20st%20New%20York%20NY%2010021').success(function(data){
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
