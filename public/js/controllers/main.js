angular.module('portfolioApp', ["ngRoute", 'ngCookies'])

  .controller('HomeCtrl', function($cookies, $scope, $http, $location){

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
            $cookies.put('visitorName', $scope.master.name);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

      phaseOut(visitor.name);
    };

    const phaseOut = function(name){
      $(".home-interactive").fadeOut(1000, function() { $(this).remove(); })
      $( "#greeting-text" ).append(`<a href="/welcome">Welcome ${name}!</a>`);
      const domChange = new Promise(function(res, rej){
        setTimeout(function(){
          document.getElementById('greeting').style.visibility = "visible";
          $("#greeting-text").addClass('interactive');
          res(true);
        },2000)
      });

      domChange.then(function(value){
        console.log('this should be true: ', value);
        $scope.isVisitor = $cookies.get('visitorName');
      });

    };
  })

  .controller("WelcomeCtrl", function($scope, $location){
    $scope.path = $location.path()
    console.log('welcome home')
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
      .when('/welcome', {
        templateUrl: '/partials/welcome.html',
        controller: 'WelcomeCtrl'
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

  .directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "../directives/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            console.log('header directive hit')
        }]
    }
});
