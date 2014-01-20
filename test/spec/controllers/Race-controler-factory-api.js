'use strict';
jasmine.getEnv().defaultTimeoutInterval =25000
describe('Testing races Controller', function () {

  // load the controller's module
  beforeEach(module('theorderApp'));
  
  var MainCtrl,
  scope;
  var _injector = angular.injector([ 'theorderApp' ]);
  var factory=_injector.get("racesFactory");
  var factory2=_injector.get("fademessage");


  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, $rootScope,_$timeout_) {
      scope = $rootScope.$new();
      MainCtrl = $controller('RacesController', {
        $scope: scope,
        $timeout: _$timeout_,
        racesFactory:factory,
        fademessage:factory2
      });
      //waiting for the elements to load
      waitsFor(
        function(){ 
          return scope.races.length>0}
          )
    })



    );

  it('testing the racelist load function', function () {
    runs(function(){
      expect(scope.races.length).not.toBe(0);
    })
  });

  it('testing the race creation function', function () {

     runs(function(){
     scope.newRace={name:'test race'};
     scope.insertRace();
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){

      expect(scope.races.filter(function(element){
        return element.name=='test race';
      }).length).not.toBe(0);

    })
   })
  });


  it('testing the race update function', function () {

    runs( function() 
    {

      scope.currRace=scope.races[1];
      scope.currRace.name='jasmin updated';
      var raceid=scope.currRace.id;
      scope.status='';
      scope.updateRace(raceid);

      waitsFor(function(){return scope.status},'update wait 2',5000);
      runs( function()  {
        
        expect(scope.races.filter(function(element){
          return element.id=raceid;
        })[1].name).toBe('jasmin updated');
      })
    });        

  });

it('testing the race delete function', function () {

     runs(function(){
     var deleteindex=Math.floor(scope.races.length/2);
     scope.races[deleteindex].name='this one went home'
     var deletedrace=scope.races[deleteindex];
     scope.deleteRace(deletedrace.id);
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){
 
      expect(scope.races[deleteindex]).not.toBe(deletedrace);

    })
   })
  });

it('testing the race get function', function () {

     runs(function(){
     var getindex=Math.floor(Math.random()*scope.races.length);
     scope.races[getindex].name='this one went home'
     var testrace=scope.races[getindex];
     scope.getRace(testrace.id);
     scope.status=""

     waitsFor(function(){return scope.currRace},'waiting for insertion',5000);

     runs(function(){
      expect(scope.currRace.id).toBe(testrace.id);

    })
   })
  });

});

