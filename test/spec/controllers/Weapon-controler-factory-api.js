'use strict';
jasmine.getEnv().defaultTimeoutInterval =15000
describe('Testing Weapons Controller', function () {

  // load the controller's module
  beforeEach(module('theorderApp'));
  
  var MainCtrl,
  scope;
  var _injector = angular.injector([ 'theorderApp' ]);
  var factory=_injector.get("weaponsFactory");
  var factory2=_injector.get("fademessage");


  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, $rootScope,_$timeout_) {
      scope = $rootScope.$new();
      MainCtrl = $controller('WeaponsController', {
        $scope: scope,
        $timeout: _$timeout_,
        weaponsFactory:factory,
        fademessage:factory2
      });
      //waiting for the elements to load
      waitsFor(
        function(){ 
          return scope.weapons.length>0}
          );
    })



    );

  it('testing the weaponlist load function', function () {
    runs(function(){
      expect(scope.weapons.length).not.toBe(0);
    })
  });

  it('testing the weapon creation function', function () {

     runs(function(){
     scope.newWeapon={name:'test weapon',desc:'mighty testing weapon '};
     scope.insertWeapon();
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){

      expect(scope.weapons.filter(function(element){
        return element.name=='test weapon';
      }).length).not.toBe(0);

    })
   })
  });


  it('testing the weapon update function', function () {

    runs( function() 
    {

      scope.currWeapon=scope.weapons[1];
      scope.currWeapon.name='jasmin updated';
      var weaponid=scope.currWeapon.id;
      scope.status='';
      scope.updateWeapon(weaponid);

      waitsFor(function(){return scope.status},'update wait 2',5000);
      runs( function()  {
        
        expect(scope.weapons.filter(function(element){
          return element.id=weaponid;
        })[1].name).toBe('jasmin updated');
      })
    });        

  });



it('testing the weapon get function', function () {

     runs(function(){
     var getindex=Math.floor(Math.random()*scope.weapons.length);
     scope.weapons[getindex].name='this one went home'
     var testweapon=scope.weapons[getindex];
     scope.getWeapon(testweapon.id);
     scope.status=""

     waitsFor(function(){return scope.currWeapon},'waiting for insertion',5000);

     runs(function(){
      expect(scope.currWeapon.id).toBe(testweapon.id);

    })
   })
  });

it('testing the weapon delete function', function () {

     runs(function(){
     var deleteindex=Math.floor(scope.weapons.length/2);
     scope.weapons[deleteindex].name='this one went home'
     var deletedweapon=scope.weapons[deleteindex];
     scope.deleteWeapon(deletedweapon.id);
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){
 
      expect(scope.weapons[deleteindex]).not.toBe(deletedweapon);

    })
   })
  });
});

