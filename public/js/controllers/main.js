angular.module('portfolioApp', ["ngRoute"])

  .controller("HomeCtrl", function ($scope, $http){

    $scope.master = {};

    setTimeout(function(){
      document.getElementById('home-input').style.visibility = "visible";
      $(".custom-input").focus();
    },10000);

    $scope.update = function(visitor) {
      $scope.master = angular.copy(visitor);
      $http.post('/api/visitors', $scope.master)
        .success(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.visitorData = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
      phaseOut(visitor.name);
    };

    const phaseOut = function(name){
      $(".home-interactive").fadeOut(1000, function() { $(this).remove(); })
      $( "#greeting-text" ).append(`Well 'ello there ${name}!`);
      setTimeout(function(){
        document.getElementById('greeting').style.visibility = "visible";
        $("#greeting-text").addClass('interactive');
      },2000)
    }
  })

  .controller("AboutCtrl", function($scope, $location){
    $scope.path = $location.path()
  })

  .controller("PortfolioCtrl", function($scope, $location){
    $scope.path = $location.path()
  })

  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: '/partials/about.html',
        controller: 'AboutCtrl'
      })
      .when('/portfolio', {
        templateUrl: 'partials/portfolio.html',
        controller: 'PortfolioCtrl'
      })
    $locationProvider.html5Mode(true)
  })
