//doesn't work unless it's in a controller
//----GLOBAL-VARIABLES----
var rideType;

riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){

//-GOOGLE-MAPS-GEOLOCATION-------------------
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

 google.maps.event.addDomListener(window, 'load', init);
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

riderApp.factory('mainInfo', function($http){
var factory = {};
factory.getSessions = function(origin, destination){
 return $http.get('https://farefairy.herokuapp.com/api/v1/fares?origin=' + origin + '&destination=' + destination);
};
return factory;
});//end factory

riderApp.controller('farefairyController', [ '$http', '$scope', '$location', 'mainInfo', function($http, $scope, $location, mainInfo){

  $scope.go = function ( path ) {
    $location.path( path );
  };//Routing on Go button. from home to rate.

  // $scope.input1 = "RDU International Airport, John Brantley Boulevard, Morrisville, NC, United States";
  // $scope.input2 = "800 Blackwell Street, Durham, NC, United States";
  // Sets origin and destination values
  // var originAddress = $scope.input1;
  // var destinationAddress = $scope.input2;
  // console.log(originAddress);
  // console.log(destinationAddress);
  //define values as variables

  $scope.clickedRideshare = function(index){
    rideType = index;
  }

 $scope.farefairy = [];
     var handleSuccess = function(data, status) {
        $scope.farefairy = data;
        $scope.ridesharing = $scope.farefairy.ride_sharing;
        // $scope.rideName = $scope.farefairy.ride_sharing[rideType].details.ride_sharing;
        // $scope.publicTransit = $scope.farefairy.transit;
        $scope.taxi = $scope.farefairy.taxis[0];
        $scope.taxiNumber = $scope.farefairy.taxis[0].details.contact_info;
         console.log($scope.taxiNumber)
        //  console.log($scope.farefairy.taxis[0].details.contact_info);
     };

     var handleSuccess2 = function(data, status) {
         $scope.farefairy = data;
         console.log($scope.farefairy);
     };

     $scope.print = function(input1, input2){
       var originAddress = $("#searchTextField").val();
       var destinationAddress = $("#searchTextFieldTwo").val();
       console.log(originAddress);
       console.log(destinationAddress);
       console.log("hahaJones");
     mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess);
     mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess2);
     //Asynchronous loading courtesy of stack overflow: http://stackoverflow.com/questions/16227644/angularjs-factory-http-service
     };

  //here lies http get.
  // $http.get('https://farefairy.herokuapp.com/?origin=' + originAddress + '&destination=' + destinationAddress, {cache: true}).success(function(data){
    // $scope.farefairy = data;
    // $scope.ridesharing = $scope.farefairy.ride_sharing;
    // console.log(originAddress);
    // console.log(destinationAddress);
    // console.log(data);

    // $scope.rideName = $scope.farefairy.ride_sharing[rideType].details.ride_sharing;
  //   //NG Repeat for the detail cost section
  // })//end http get

  $('.fa-info-circle').on('click', function () {
    $('.special-consid-modal').toggleClass('show');
  });



}]);//End farefairycontroller

riderApp.controller('rideSharingController', ['$http', '$scope', '$farefairycontroller', function($http, $scope, farefairyController){

 $(".ridesharing-special").hide();//Hide special_considerations warning

 $http.get('https://farefairy.herokuapp.com/api/v1/fares?origin=' + originAddress + '&destination=' + destinationAddress, {cache: true}).success(function(data){
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
  //  console.log(data);
 })

}]);//end ridesharing controller

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
