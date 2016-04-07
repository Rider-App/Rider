// $('.header-right').on('click', function () {
//   $('.hamburger-menu').toggleClass('show');
// });
//doesn't work unless it's in a controller

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
  // $scope.message = 'HELLO WORLD';

  //pseudocoding and setup for post request
  // var originAddress = $(".searchTextField").val()
  // var destinationAddress = $("searchTextFieldTwo").val()
  //
  // $http.post('http://farefairy.herokuapp.com/?origin=' + originAddress + '&destination=' + destinationAddress , { origin_address: originAddress }, {destination_address: destinationAddress} )
  // .then(function (result) { })
  // .catch(function (error) { });

  $http.get('http://farefairy.herokuapp.com/?origin=5512%20Bridgeman%20Ct%20Durham%20NC%2027703&destination=334%20Blackwell%20Street%20B017,%20Durham,%20NC%2027701').success(function(data){
    $scope.farefairy = data;
    console.log(data);

  })

  $('.fa-info-circle').on('click', function () {
    $('.special-consid-modal').toggleClass('show');
  });

}]);
