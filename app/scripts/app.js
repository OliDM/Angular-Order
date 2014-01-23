var app = angular.module('theorderApp', ['ngRoute','ui.bootstrap']);

 app.apiURL="http://localhost:4567/api/v1"
app.config(function($routeProvider){
$routeProvider
.when('/heroes',
 {templateUrl: 'views/Heroes.html', controller:'HeroesController' })

.when('/jobs',
 {templateUrl: 'views/jobs.html', controller:'JobsController' })

.when('/jobs2',
 {templateUrl: 'views/jobs2.html', controller:'JobsController' })

.when('/index',
 {redirectTo:'/'})

.when('/',
 {templateUrl: 'views/main.html' })

.when('/about',
 {templateUrl: 'views/about.html' })

.when('/weapons',
 {templateUrl: 'views/weapons.html', controller:'WeaponsController' })

.when('/races', 
	{templateUrl: 'views/races.html', controller:'RacesController' })

.otherwise({redirectTo: '/'});
});

 