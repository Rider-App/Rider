
riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';

  function init() {
    var inputStart = document.getElementById('searchTextField');
    var inputDest = document.getElementById('searchTextFieldTwo');
    var autocomplete = new google.maps.places.Autocomplete(inputStart);
    var autocompleteTwo = new google.maps.places.Autocomplete(inputDest);
  }

  google.maps.event.addDomListener(window, 'load', init);
  $scope.$apply();

}]);
