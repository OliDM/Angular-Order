'use strict';
jasmine.getEnv().defaultTimeoutInterval =25000
describe('Testing Jobs Controller', function () {

  // load the controller's module
  beforeEach(module('theorderApp'));
  
  var loaded=false;
  var MainCtrl,
  scope;
  var _injector = angular.injector([ 'theorderApp' ]);
  var factory=_injector.get("jobsFactory");
  var factory2=_injector.get("fademessage");


  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, $rootScope,_$timeout_) {
      scope = $rootScope.$new();
      MainCtrl = $controller('JobsController', {
        $scope: scope,
        $timeout: _$timeout_,
        jobsFactory:factory,
        fademessage:factory2
      });
      //waiting for the elements to load
      waitsFor(
        function(){ 
          return scope.jobs.length>0}
          )
    })



    );

  it('testing the joblist load function', function () {
    runs(function(){
      expect(scope.jobs.length).not.toBe(0);
    })
  });

  it('testing the job creation function', function () {

     runs(function(){
     scope.newJob={name:'test job'};
     scope.insertJob();
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){

      expect(scope.jobs.filter(function(element){
        return element.name=='test job';
      }).length).not.toBe(0);

    })
   })
  });


  it('testing the job update function', function () {

    runs( function() 
    {

      scope.currJob=scope.jobs[1];
      scope.currJob.name='jasmin updated';
      var jobid=scope.currJob.id;
      scope.status='';
      scope.updateJob(jobid);

      waitsFor(function(){return scope.status},'update wait 2',5000);
      runs( function()  {
        
        expect(scope.jobs.filter(function(element){
          return element.id=jobid;
        })[1].name).toBe('jasmin updated');
      })
    });        

  });

it('testing the job delete function', function () {

     runs(function(){
     var deleteindex=Math.floor(scope.jobs.length/2);
     scope.jobs[deleteindex].name='this one went home'
     var deletedjob=scope.jobs[deleteindex];
     scope.deleteJob(deletedjob.id);
     scope.status=""

     waitsFor(function(){return scope.status},'waiting for insertion',5000);

     runs(function(){
      expect(scope.jobs[deleteindex]).not.toBe(deletedjob);

    })
   })
  });

it('testing the job get function', function () {

     runs(function(){
     var getindex=Math.floor(Math.random()*scope.jobs.length);
     scope.jobs[getindex].name='this one went home'
     var testjob=scope.jobs[getindex];
     scope.getJob(testjob.id);
     scope.status=""

     waitsFor(function(){return scope.currJob},'waiting for insertion',5000);

     runs(function(){
      expect(scope.currJob.id).toBe(testjob.id);

    })
   })
  });

});

