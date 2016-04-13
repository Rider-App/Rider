var riderApp = angular.module('riderApp', ['ngRoute']);

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
          }); //closes riderApp routeProvider


riderApp.factory('mainInfo', function($http){
  var factory = {};
  var origin = "";
  var destination = "";
  var farefairy = {};

  factory.handleSuccess2 = function(data, status) {
    var farefairy = data;
    console.log(farefairy);
  };

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
    this.farefairy = data;
    console.log(this.farefairy);
    return this.farefairy;

    // $scope.ridesharing = $scope.farefairy.ride_sharing;
    // console.log($scope.farefairy);
  };

  factory.getFarefairy = function(){
    console.log(this.farefairy);
    return this.farefairy;
  }

  // factory.getFairy = function (origin, destination) {
  //   return mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess);
  // }
  //
  // factory.getFairy2 = function (origin, destination) {
  //   return mainInfo.getSessions(originAddress, destinationAddress).success(handleSuccess2);
  // }

  factory.getSessions = function(){
   return $http.get('https://farefairy.herokuapp.com/api/v1/fares/?origin=' + origin + '&destination=' + destination);
  };
  return factory;
});//end factory
