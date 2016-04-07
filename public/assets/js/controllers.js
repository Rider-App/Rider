
riderApp.controller('mainController', [ '$http', '$scope', function($http, $scope){
  $scope.message = 'HELLO WORLD';

  function init() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  google.maps.event.addDomListener(window, 'load', init);
  $scope.$apply();

}]);
