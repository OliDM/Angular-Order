app.factory('heroesFactory', ['$http', function($http) {

    var urlBase = app.apiURL+'/heroes';
    var heroesFactory = new CrudService($http,urlBase,'Hero');;

    heroesFactory.getHeroes = function () {
        return $http.get(urlBase);
    };

    // heroesFactory.getHero = function (id) {
    //     return $http.get(urlBase + '/' + id);
    // };

    // heroesFactory.insertHero = function (hero) {
    //     return $http.post(urlBase, hero);
    // };

    // heroesFactory.updateHero = function (hero) {
    //     return $http.put(urlBase + '/' + hero.id, hero);
    // };

    // heroesFactory.deleteHero = function (id) {
    //     return $http.delete(urlBase + '/' + id);
    // };

    return heroesFactory;
}]);

app.factory('jobsFactory', ['$http', function($http) {
    var urlBase = app.apiURL+'/jobs';
    var jobsFactory = new CrudService($http,urlBase,'Job');

    // jobsFactory.getJobs = function () {
    //     return $http.get(urlBase);
    // };

    // jobsFactory.getJob = function (id) {
    //     return $http.get(urlBase + '/' + id);
    // };

    // jobsFactory.insertJob = function (job) {
    //     return $http.post(urlBase, job);
    // };

    // jobsFactory.updateJob = function (job) {
    //     return $http.put(urlBase + '/' + job.id, job);
    // };

    // jobsFactory.deleteJob = function (id) {
    //     return $http.delete(urlBase + '/' + id);
    // };

    return jobsFactory;
}]);

app.factory('racesFactory', ['$http', function($http) {

    var urlBase = app.apiURL+'/races';
    var racesFactory = new CrudService($http,urlBase,'Race');;

    // racesFactory.getRaces = function () {
    //     return $http.get(urlBase);
    // };

    // racesFactory.getRace = function (id) {
    //     return $http.get(urlBase + '/' + id);
    // };

    // racesFactory.insertRace = function (Race) {
    //     return $http.post(urlBase, Race);
    // };

    // racesFactory.updateRace = function (Race) {
    //     return $http.put(urlBase + '/' + Race.id, Race);
    // };

    // racesFactory.deleteRace = function (id) {
    //     return $http.delete(urlBase + '/' + id);
    // };

    return racesFactory;
}]);

app.factory('weaponsFactory', ['$http', function($http) {

    var urlBase = app.apiURL+'/weapons';
    var weaponsFactory = new CrudService($http,urlBase,'Weapon');

    return weaponsFactory;
}]);

app.factory('Heroextras', ['$http', function($http) {

    var urlBase = app.apiURL;
    var Heroextras = {};

    Heroextras.getApiInfo=function (fragment) {
    return $http.get(urlBase+fragment);
 };

 return Heroextras;
}]);



app.factory('fademessage',[function(){
    var fadingFact={};
    fadingFact.setup=function(scope,timeout){

       // function removeclass() {
       //     $("#msg").removeClass('hide')
       // }
       // timeout(removeclass, 10000);

       scope.fadeMessage= function (){
           timeout(scope.cleanstatus, 5000);

       }
       scope.cleanstatus=function (){

        scope.status= '';
    }
    scope.$watch('status',scope.fadeMessage);

}
return fadingFact;

}])


function CrudService(http,url,name){
    this['get'+name+'s'] = function () {
        return http.get(url);
    };

    this['get'+name] = function (id) {
        return http.get(url + '/' + id);
    };

    this['insert'+name] = function (item) {
        return http.post(url, item);
    };

    this['update'+name] = function (item) {
        return http.put(url + '/' + item.id, item);
    };

    this['delete'+name] = function (id) {
        return http.delete(url + '/' + id);
    };
    return this;
}