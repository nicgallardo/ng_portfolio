const titles = [
  {
    id: 0,
    color: 'pink-zero',
    textcolor: 'pink-zero-text',
    title: 'about',
    link: 'about',
    background: 'black-bg',
    text: "you want to know about me? Well you are in luck 'cause I am an open book."
  },
  {
    id: 1,
    color: 'pink-one',
    textcolor: 'pink-one-text',
    title: 'portfolio',
    link: 'portfolio',
    background: 'black-bg',
    text: "see my portfolio? Awesome! Let's take a look!"
  },
  {
    id: 2,
    color: 'pink-two',
    textcolor: 'pink-two-text',
    title: 'contact',
    link: 'contact',
    background: 'black-bg',
    text: "contact me?"
  },
  {
    id: 3,
    color: 'pink-three',
    textcolor: 'pink-three-text',
    title: 'resume',
    link: 'resume',
    background: 'black-bg',
    text: "look at my resume?"
  },
  {
    id: 4,
    color: 'pink-four',
    textcolor: 'pink-four-text',
    title: 'social',
    link: 'social',
    background: 'black-bg',
    text: "stalk me socially? No it's not creepy. Go ahead and check out my tweets and such!"
  }
];

const experiences = [
  {
    company: 'TechPulse /Reactual.io',
    dates: '1/16 - 8/16',
    title: 'Full Stack Developer',
    subtext: 'Founding member and developer of Reactual.io an enterprise level CRM software using Meteor.js.',
    subexp: [
      {
        exptitle: 'Customized Email Integration',
        points: [
          {
            text: 'Incoming email webhook parsing'
          },
          {
            text: 'Outgoing automatic email notices & responses'
          },
          {
            text: 'User created content & customizable email templates'
          },
          {
            text: 'Dynamic user driven and createdemail spam blocking'
          },
        ]
      },
      {
        exptitle: 'TWILIO VOIP INTEGRATION',
        bulletPoints: [
          {
            text: 'Integrated custom incoming and outgoing phone services'
          },
          {
            text: 'Services includ call forwarding, transfers, holds, voicemail and multiparty calling'
          },
        ]
      },
      {
        exptitle: 'Plaid Banking Services',
        bulletPoints: [
          {
            text: 'Created user banking integration to import banking information for accounting.'

          },
        ]
      }
    ],
  },
  {
    company: 'Freelance Graphic Design',
    subtext: 'Freelance designer with clients from small to medium sized businesses to clothing companies.',
  },
  {
    company: 'Red Ventures',
    dates: '6/13 - 6/15',
    title: 'Performace Manager in Training',
    subtext: 'SEO centered sales firm that managed business to consumer sales via the internet. Managed teams of 20 -40 represenatives. ',
  },
]

const skills = ['Node.js', 'Angular.js', 'Express.js', 'D3.js', 'MongoDB', 'OAuth Strategies', 'Socket.io', 'Jquery', 'Adobe Photoshop', 'Meteor.js', 'JavaScript', 'Adobe Illustrator', 'RESTful Practices', 'CSS', 'HTML5', 'Responsive Design', 'Mobile Best Practices'];

const education = [
  {
    school: 'Galvanize',
    dates: '2015 - 2016',
    program: 'Full Stack Developer Program',
    text: 'Immersive program that focuses on JavaScript fundamentals and modern web full stack skills.'
  }
]

const projects = [
  {
    title: 'Galaxy Bomber',
    text: 'Multiplayer interactive game that allows users to challange their friends via facebook. Implementing sockets allow players from all over the world to connect in real time to interact with their opposition.',
    techs: ['MongoDB', 'Express.js', 'Node.js', 'Angular', 'Socket.io', 'Facebook OAuth'],
  },
  {
    title: 'IntellegoInfo',
    text: 'Bringing numbers to life, this app uses the Huffington Post API Polls and illutrates the numbers in related d3.js charts. While rendering the charts headlines from the polls are used to search the NY Times API for relevant headlines showing the user applicable stories relating to the poll.' ,
    techs: ['Express.js', 'Node.js', 'Angular', 'RESTful API', 'D3.js'],
  }
]



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
      $( "#greeting-text" ).append('<a href="/welcome" class="grey-text">Welcome ' + name + '!</a>');

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

  .controller("socialCtrl", function($scope, $location, $cookies, $http, tweets){
    console.log('tweets : ', tweets);
    $scope.tweets = tweets.slice(0, 4)
    $scope.path = $location.path();
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'social');
  })

  .controller("resumeCtrl", function($scope, $location, $cookies, $http){
    $scope.path = $location.path();
    $scope.skills = skills;
    $scope.education = education;
    $scope.experiences = experiences;
    $scope.projects = projects;
    $scope.name = $cookies.get('visitorName') || false;
    $scope.collection = omitTitles(titles, 'resume');
    // $scope.downloadResume = function() {
    //   // console.log("resume : ", '../../assets/resume');
    //   $http.get('/api/resume').then(function(res, err){
    //     console.log('err', err);
    //     console.log('res', res);
    //     return err ? false : res.data;
    //   });
    // };
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
        controller: 'socialCtrl',
        resolve: {
          tweets: function($http){
            return $http.get('/api/twitter').then(function(res, err){
              return err ? false : res.data;
            });
          }
        }
      })
      .when('/resume', {
        templateUrl: 'partials/resume.html',
        controller: 'resumeCtrl',
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
