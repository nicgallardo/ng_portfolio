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
      $cookies.put('visitorName', name);
      $(".home-interactive").fadeOut(1000, function() { $(this).remove(); })
      $( "#greeting-text" ).append(`<a href="/welcome">Welcome ${name}!</a>`);

      setTimeout(function(){
        document.getElementById('greeting').style.visibility = "visible";
        $("#greeting-text").addClass('interactive');
      },2000);
    };
  })

  .controller("WelcomeCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    console.log('welcome home : ', $scope.name);
  })

  .controller("AboutCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = [
      {
        id: 0,
        color: 'pink-zero',
        textcolor: 'pink-zero-text',
        title: 'about'
      },
      {
        id: 1,
        color: 'pink-one',
        textcolor: 'pink-one-text',
        title: 'portfolio'
      },
      {
        id: 2,
        color: 'pink-two',
        textcolor: 'pink-two-text',
        title: 'contact'
      },
      {
        id: 3,
        color: 'pink-three',
        textcolor: 'pink-three-text',
        title: 'resume'
      },
      {
        id: 4,
        color: 'pink-four',
        textcolor: 'pink-four-text',
        title: 'social'
      },
    ];
    console.log('welcome about : ', $scope.name);
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
        scope: true,
        templateUrl: "../directives/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    }
  })
