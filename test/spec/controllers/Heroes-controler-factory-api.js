'use strict';
jasmine.getEnv().defaultTimeoutInterval =9000
describe('Testing heroes Controller', function () {

  // load the controller's module
  beforeEach(module('theorderApp'));
  
  var MainCtrl,
  scope;
  var _injector = angular.injector([ 'theorderApp' ]);
  var factory=_injector.get("heroesFactory");
  var factory2=_injector.get("fademessage");
  var factory3=_injector.get("Heroextras");
  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, $rootScope,_$timeout_) {
      scope = $rootScope.$new();

      MainCtrl = $controller('HeroesController', {
        $scope: scope,
        $timeout: _$timeout_,
        heroesFactory:factory,
        fademessage:factory2,
        Heroextras:factory3
      }

      );
      //waiting for the elements to load
      waitsFor(
        function(){ 
          return scope.heroes.length>0},'loading heroes',7000
          )
    })
    );

  it('testing the herolist load function', function () {
    runs(function(){
      expect(scope.heroes.length).not.toBe(0);
    })
  });

  it('testing the hero creation function', function () {

   runs(function(){
     scope.newHero={name:'test hero',weapon_id: 1, job_id: 1, race_id:1};
     scope.insertHero();
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){

      expect(scope.heroes.filter(function(element){
        return element.name=='test hero';
      }).length).not.toBe(0);

    })
   })
 });


  it('testing the hero update function', function () {

    runs( function() 
    {

      scope.currHero=scope.heroes[1];
      scope.currHero.name='jasmin updated';
      var heroid=scope.currHero.id;
      scope.status='';
      scope.updateHero(heroid);

      waitsFor(function(){return scope.status},'update wait 2',5000);
      runs( function()  {

        expect(scope.heroes.filter(function(element){
          return element.id=heroid;
        })[1].name).toBe('jasmin updated');
      })
    });        

  });

  it('testing the hero delete function', function () {

   runs(function(){
     var deleteindex=Math.floor(scope.heroes.length/2);
     scope.heroes[deleteindex].name='this one went home'
     var deletedhero=scope.heroes[deleteindex];
     scope.deleteHero(deletedhero.id);
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for deletion',5000);

     runs(function(){

      expect(scope.heroes[deleteindex]).not.toBe(deletedhero);

    })
   })
 });

  it('testing the hero get function', function () {

   runs(function(){
     var getindex=Math.floor(Math.random()*scope.heroes.length);
     scope.heroes[getindex].name='this one went home'
     var testhero=scope.heroes[getindex];
     scope.getHero(testhero.id);
     scope.status=""

     waitsFor(function(){return scope.currHero},'waiting for get',5000);

     runs(function(){
      expect(scope.currHero.id).toBe(testhero.id);

    })
   })
 });

});

