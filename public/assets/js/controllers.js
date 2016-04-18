//doesn't work unless it's in a controller
//----GLOBAL-VARIABLES----
var rideType;
var favType;

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
   var inputFav = document.getElementById('searchTextFieldFav');
   var autocomplete = new google.maps.places.Autocomplete(inputStart);
   var autocompleteTwo = new google.maps.places.Autocomplete(inputDest);
   var autocompleteFav = new google.maps.places.Autocomplete(inputFav);
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

   //add stop propogation to the modal

}]);//-END-MAIN-CONTROLLER----------------------

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

        //This if statement is questionable. I'm not sure it does anything right now.
        if($(".travel-type").html === ""){
          $(".travel-type").html("N/A");
        };

      });//end .then
    }//end api call

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

       $scope.rideName = $scope.ridesharing[rideType].details.ride_sharing;
       $scope.publicTransport = $scope.publicTransit[0].details.transit;
       $scope.taxiNumber = $scope.taxi.details.contact_info;
       $scope.totalETA = $scope.farefairy.ride_sharing[rideType].eta;
       $scope.mode = $scope.farefairy.ride_sharing[rideType].travel_type;
       $scope.deepLinking = $scope.farefairy.ride_sharing[rideType].start_journey_url;
}]);//end ridesharing controller

riderApp.controller('ratesController', ['$http', '$scope', function($http, $scope){
 $scope.message = 'HELLO WORLD';
//USE THIS LATER
}])


//--SIGNUP-------------------------------------

riderApp.controller('userController', ['$http', '$scope', '$location', function($http, $scope, $location){

  $scope.formData = {
    "email" : "",
    "password" : ""
  }

  $scope.signUp = function(formData){

  $http.post('https://farefairy.herokuapp.com/api/v1/users?user[email]=' + $('#signup-email').val() + '&user[password]=' + $('#signup-password').val()).success(function(info){
    console.log(info.token, info.user_id);
    localStorage.setItem('token', info.token);
    localStorage.setItem('user_id', info.user_id);
  })

  } //closes signUp function

  $scope.loginData = {
    "email" : "",
    "password" : ""
  }

  $scope.signIn = function(loginData){

  $http.post('https://farefairy.herokuapp.com/api/v1/login?email=' + $('#login-email-input').val()  + '&password=' + $('#login-pwd-input').val()).success(function(data){
    console.log(data.token, data.user_id);
    localStorage.setItem('token_login', data.token);
    localStorage.setItem('user_id_login', data.user_id);

    $('.login-submit-btn').on('click', function () {
      $('.login-modal-cont.show').removeClass('show');
    });

  }) //closes signIn http post

  } //closes signIn function

  var favoritePlace = localStorage.getItem('token');

  $scope.clickedFavorite = function(index){
    favType = index;
  }

  $scope.favorites = function(){
    console.log(favoritePlace);


    $http.post('https://farefairy.herokuapp.com/api/v1/favorites?favorite[name]=' + $('#favorite-name-input').val() + '&favorite[address]=' + $('#searchTextFieldFav').val() + '&token=' + favoritePlace).success(function(data){
      console.log
    });

  } //closes scope.favorites function

    $http.get('https://farefairy.herokuapp.com/api/v1/favorites?token=' + favoritePlace).success(function(data){
      $scope.favData = data;
      $scope.favNames = $scope.favData.favorites;
      $scope.addFav = $scope.favData.favorites[favType].address;
      console.log($scope.addFav)


    }); //closes get for favData

    $scope.favoriteFunction = function(){
      $("#selectedFavorite").on('click', function(){
        console.log("haha jones");
        $("#searchTextField").val("haha jones");
      })

      $scope.go = function ( path ) {
        $location.path( path );
      };//Routing on green arrow from favorites to home
    }



}]); //closes userController
