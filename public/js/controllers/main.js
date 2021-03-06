const omitTitles = function(titles, omit){
  return _.map(titles,function(val){
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

    const welcomeBack = function(name){
      console.log(name);
      $('.home-interactive').empty();
      document.getElementById('welcome-back').style.visibility = "visible";
      $('#welcome-back').append('Howdy ' + name + '! Welcome Back!');
      setTimeout(function(){
        location.replace('/welcome');
      }, 2500)
    };

    $scope.name = $cookies.get('visitorName');
    console.log($scope.name);
    !$scope.name ? console.log('no name person') : welcomeBack($scope.name);


    $scope.master = {};

    setTimeout(function(){
      document.getElementById('home-input').style.visibility = "visible";
      $(".custom-input").focus();
    },6100);

    $scope.update = function(visitor) {
      visitor.name = _.upperFirst(visitor.name.toLowerCase());
      $scope.master = angular.copy(visitor);
      $http.post('/api/visitors', $scope.master)
        .success(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.visitorData = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

      phaseOut(visitor.name, function(err, res){
        if(res){
          console.log('got res');
          $cookies.put('visitorName', $scope.master.name);
          location.replace("/welcome");
        }
      });
    };

    const phaseOut = function(name, cb){
      $("body").fadeOut(1500, function() { $(this).remove(); })
      setTimeout(function(){
        cb(null, true);
      },3000);
    };
  })

  .controller("WelcomeCtrl", function($scope, $location, $cookies, titles){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, undefined);
    $scope.allTitles = titles;
  })

  .controller("AboutCtrl", function($scope, $location, $cookies, titles){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'about');
  })

  .controller("PortfolioCtrl", function($scope, $location, $cookies, titles, projects){
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'portfolio');
    $scope.projects = projects;
  })

  .controller("contactCtrl", function($scope, $location, $cookies, $http, titles){
    $scope.complete = false;
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'contact');
    $scope.master = {};
    $scope.update = function(contact){
      $scope.master = angular.copy(contact);
      $http({
        method: 'POST',
        url: '/api/contacts',
        data: $scope.master
      }).then(function successCallback(data) {
        $('.contact-form').empty();
        $scope.complete = true;
      }, function errorCallback(err) {
        console.log('err')
      });
    };

  })

  .controller("socialCtrl", function($scope, $location, $cookies, $http, tweets, titles){
    $scope.tweets = tweets.slice(0, 4)
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'social');
  })

  .controller("resumeCtrl", function($scope, $location, $cookies, $http, titles, experiences, skills, education, projects){
    $scope.path = $location.path();
    $scope.skills = skills;
    $scope.education = education;
    $scope.experiences = experiences;
    $scope.projects = projects;
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
        controller: 'WelcomeCtrl',
        resolve: {
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
      })
      .when('/about', {
        templateUrl: '/partials/about.html',
        controller: 'AboutCtrl',
        resolve: {
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
      })
      .when('/portfolio', {
        templateUrl: 'partials/portfolio.html',
        controller: 'PortfolioCtrl',
        resolve: {
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          },
          projects: function($http){
            return $http.get('../../data/projects.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'contactCtrl',
        resolve: {
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
      })
      .when('/social', {
        templateUrl: 'partials/social.html',
        controller: 'socialCtrl',
        resolve: {
          tweets: function($http){
            return $http.get('/api/twitter').then(function(res, err){
              return err ? false : res.data;
            });
          },
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
      })
      .when('/resume', {
        templateUrl: 'partials/resume.html',
        controller: 'resumeCtrl',
        resolve: {
          titles: function($http){
            return $http.get('../../data/titles.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          },
          experiences: function($http){
            return $http.get('../../data/experiences.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          },
          skills: function($http){
            return $http.get('../../data/skills.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          },
          education: function($http){
            return $http.get('../../data/education.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          },
          projects: function($http){
            return $http.get('../../data/projects.json').then(function(res, err){
              return err ? false : res.data.data;
            });
          }
        }
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
          // $("#myImage").load(fn);
        }]
    }
  })
  .directive('who', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: true,
        templateUrl: "../directives/who.html",
        controller: ["$http", '$cookies', '$scope', function ($scope, $cookies, $http) {
          location.replace("/");
        }]
    }
  })
