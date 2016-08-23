const titles = [
  {
    id: 0,
    color: 'pink-zero',
    textcolor: 'pink-zero-text',
    title: 'about',
    link: 'about',
    background: 'black-bg',
    text: `you want to know about me? Well you are in luck 'cause I am an open book.`
  },
  {
    id: 1,
    color: 'pink-one',
    textcolor: 'pink-one-text',
    title: 'portfolio',
    link: 'portfolio',
    background: 'black-bg',
    text: `see my portfolio? Awesome! Let's take a look!`
  },
  {
    id: 2,
    color: 'pink-two',
    textcolor: 'pink-two-text',
    title: 'contact',
    link: 'contact',
    background: 'black-bg',
    text: `contact me?`
  },
  {
    id: 3,
    color: 'pink-three',
    textcolor: 'pink-three-text',
    title: 'resume',
    link: 'resume',
    background: 'black-bg',
    text: `look at my resume?`
  },
  {
    id: 4,
    color: 'pink-four',
    textcolor: 'pink-four-text',
    title: 'social',
    link: 'social',
    background: 'black-bg',
    text: `stalk me socially? Im not creeped too creeped out. Go ahead and check out my tweets and such!`
  }
];

const omitTitles = function(titles, omit){
  return _.map(titles,(val)=>{
    if(val.title != omit){
      return val
    }else{
      return {
        id: val.id,
        color: 'black-bg',
        textcolor: 'black-text',
        title: val.title,
        background: val.color
      }
    }
  })
}

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
      $( "#greeting-text" ).append(`<a href="/welcome" class="grey-text">Welcome ${name}!</a>`);

      setTimeout(function(){
        document.getElementById('greeting').style.visibility = "visible";
        $("#greeting-text").addClass('interactive');
      },2000);
    };
  })

  .controller("WelcomeCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, undefined);
    $scope.allTitles = titles;
  })

  .controller("AboutCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'about');
  })

  .controller("PortfolioCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'portfolio');
  })

  .controller("contactCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'contact');
  })

  .controller("socialCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'social');
  })
  .controller("resumeCtrl", function($scope, $location, $cookies){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'resume');
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
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'contactCtrl'
      })
      .when('/social', {
        templateUrl: 'partials/social.html',
        controller: 'socialCtrl'
      })
      .when('/resume', {
        templateUrl: 'partials/resume.html',
        controller: 'resumeCtrl'
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
