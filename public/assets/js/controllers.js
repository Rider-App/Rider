//doesn't work unless it's in a controller
//----GLOBAL-VARIABLES----
var rideType;

riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){

  // geolocation API
 $scope.geoLocation = function(){

 navigator.geolocation.getCurrentPosition(function(position) {
   $("#searchTextField").val(position.coords.latitude + " , " + position.coords.longitude);
   console.log(position.coords.latitude, position.coords.longitude);
 });
}; //closes geoLocation

 //-GOOGLE-MAPS-AUTOCOMPLETE-------------------
 function init() {
   var inputStart = document.getElementById('searchTextField');
   var inputDest = document.getElementById('searchTextFieldTwo');
   var autocomplete = new google.maps.places.Autocomplete(inputStart);
   var autocompleteTwo = new google.maps.places.Autocomplete(inputDest);
 }

 google.maps.event.addDomListener(window, 'load', init());
 // $scope.$apply();

 //--LOGIN-MODAL-FUNCTIONS---------------------
   $('.header-right').on('click', function () {
     $('.hamburger-menu').toggleClass('show');
   });

   $('.header-left').on('click', function () {
     $('.login-modal-cont').toggleClass('show');

   });

   $('.login-modal-x').on('click', function () {
     $('.login-modal-cont.show').removeClass('show');

   });

}]);//-END-MAIN-CONTROLLER----------------------
 // var originAddress = $scope.input1;
 // var destinationAddress = $scope.input2;



riderApp.controller('farefairyController', [ '$http', '$scope', '$location', '$timeout', 'mainInfo', function($http, $scope, $location, $timeout, mainInfo){

  $scope.go = function ( path ) {
    $location.path( path );
  };//Routing on Go button. from home to rate.

  $scope.clickedRideshare = function(index){
    rideType = index;
  }
    $scope.print = function apiCall(){
      var originAddress = $("#searchTextField").val();
      var destinationAddress = $("#searchTextFieldTwo").val();
      // var originAddress = "904 Lambeth Circle, Durham, NC, United States";
      // var destinationAddress = "800 Blackwell Street, Durham, NC, United States";
      var fairyInfo;
      mainInfo.setOrigin(originAddress);
      mainInfo.setDestination(destinationAddress);
      mainInfo.getSessions().then(mainInfo.setFarefairy).then(function(){
        fairyInfo = mainInfo.getFarefairy();
        // console.log(fairyInfo.data);
        $scope.farefairy = fairyInfo.data;
        $scope.ridesharing = fairyInfo.data.ride_sharing;
        $scope.publicTransit = $scope.farefairy.transit;
        $scope.taxi = $scope.farefairy.taxis[0];
        google.maps.event.addDomListener(window, 'load', mainInfo.initMap());

      });//end .then
    }//end api call

    //  $scope.print = function(input1, input2){
    //  var originAddress = $("#searchTextField").val();
    //  var destinationAddress = $("#searchTextFieldTwo").val();
    //  mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess);
    //  mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess2);
    //  //Asynchronous loading courtesy of stack overflow: http://stackoverflow.com/questions/16227644/angularjs-factory-http-service
    //  };

  $('.fa-info-circle').on('click', function () {
    $('.special-consid-modal').toggleClass('show');
  });

}]);//End farefairycontroller

riderApp.controller('rideSharingController', ['$http', '$scope', 'mainInfo', function($http, $scope, mainInfo){
  // console.log(stuffJones);

  $scope.clickedRideshare = function(index){
    rideType = index;
  }

 $(".ridesharing-special").hide();//Hide special_considerations warning

     fairyInfo = mainInfo.getFarefairy();
    //  console.log(fairyInfo.data.transit);
     $scope.farefairy = fairyInfo.data;
     $scope.ridesharing = fairyInfo.data.ride_sharing;
     $scope.publicTransit = $scope.farefairy.transit;
     $scope.taxi = $scope.farefairy.taxis[0];
     $scope.taxiType = $scope.taxi.travel_type;
     console.log($scope.taxi);
     console.log($scope.taxiType);

       $scope.rideName = $scope.ridesharing[1].details.ride_sharing;
       $scope.publicTransport = $scope.publicTransit[0].details.transit;
       $scope.taxiNumber = $scope.taxi.details.contact_info;
       console.log($scope.taxiNumber);
       $scope.totalETA = $scope.farefairy.ride_sharing[1].eta;
       $scope.mode = $scope.farefairy.ride_sharing[1].travel_type;


 // $http.get('https://farefairy.herokuapp.com/?origin=' + originAddress + '&destination=' + destinationAddress, {cache: true}).success(function(data){
 //   $scope.farefairy = data;
 //
 //   $scope.rideName = $scope.farefairy.ride_sharing[rideType].details.ride_sharing;
 //   //NG Repeat for the detail cost section.
 //
 //   //Determination for SURGE PRICING
 //   var surgePricing = $scope.farefairy.ride_sharing[rideType].details.special_considerations;
 //   if(surgePricing === "surge pricing"){
 //     $(".ridesharing-special").show();
 //     $(".special-considerations-text").html("Surge Pricing");
 //   }
 //   else if(surgePricing === "prime time"){
 //     $(".ridesharing-special").show();
 //     $(".special-considerations-text").html("Prime Time");
 //   }
 //
 //   $scope.mode = data.ride_sharing[rideType].travel_type;
  //  $scope.totalETA = data.ride_sharing[rideType].eta;
 //   console.log(data);
 // })

}]);//end ridesharing controller

riderApp.controller('ratesController', ['$http', '$scope', function($http, $scope){
 $scope.message = 'HELLO WORLD';
//USE THIS LATER
}])


riderApp.controller('mapController', [ '$http', '$scope', 'mainInfo', function($http, $scope, mainInfo){

 // function initMap () {
 //   var latlng = new google.maps.LatLng(-34.397, 150.644);
 //   var chicago = {lat: 35.9847617302915, lng: -78.91083471970849};
 //   var indianapolis = {lat: 39.79, lng: -86.14};
 //   var myOptions = {
 //     zoom: 8,
 //     center: latlng,
 //     mapTypeId: google.maps.MapTypeId.ROADMAP
 //   };
 //   var map = new google.maps.Map(document.getElementById('map'), {
 //     center: chicago,
 //     zoom: 8
 //   });
 //   var directionsDisplay = new google.maps.DirectionsRenderer({
 //    map: map
 //   });
 //   // Set destination, origin and travel mode.
 //    var request = {
 //      destination: indianapolis,
 //      origin: chicago,
 //      travelMode: google.maps.TravelMode.DRIVING
 //    };
 //
 //    // Pass the directions request to the directions service.
 //    var directionsService = new google.maps.DirectionsService();
 //    directionsService.route(request, function(response, status) {
 //      if (status == google.maps.DirectionsStatus.OK) {
 //        // Display the route on the map.
 //        directionsDisplay.setDirections(response);
 //      }
 //    });
 // }
 // google.maps.event.addDomListener(window, 'load', mainInfo.initMap());
}]);//end map controller


//--SIGNUP-------------------------------------

riderApp.controller('userController', ['$http', '$scope', function($http, $scope){

$scope.signUp = function(){

  var email = $('#signup-email').val();
  var password = $('#signup-password').val();

  $http.post('https://farefairy.herokuapp.com/api/v1/users?user[email]' + email + '&user[password]=' + password, data).success(function(data){
    console.log($scope.account);
    console.log(email);
    console.log(password);
  })

} //closes signUp function

// localStorage.setItem('user', JSON.stringify({
//     username: 'htmldog',
//     api_key: 'abc123xyz789'
// }));
//
// var user = JSON.parse(localStorage.getItem('user'));


}]); //closes userController
