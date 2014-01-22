

app.controller('NavbarController', function ($scope, $location) {
	$scope.getClass = function (path) {
		if ($location.path().substr(0, path.length).toUpperCase() == path.toUpperCase()) {
			return true
		} else {
			return false;
		}
	}
});

app.controller('HeroesController', function ($scope,$timeout, heroesFactory,fademessage,Heroextras){

	$scope.heroes=[];
	$scope.status;
	$scope.newHero;
	$scope.currHero;
	fademessage.setup($scope,$timeout);

	$scope.getHeroes=function() {
		heroesFactory.getHeroes()
		.success(function (records) {
			$scope.heroes = records;
		})
		.error(function (error) {
			$scope.status = 'Unable to load hero data: ' + error.message;
		});
	}

	$scope.getHeroes();
	function addPromiseInfo(promise,property){
		promise.success(function(records){
			$scope[property]=ArraybyID(records)
		}).error(function(error){
			$scope[property+error]=error;
		})
	}

	addPromiseInfo(Heroextras.getApiInfo('/weapons'),'weapons');
	addPromiseInfo(Heroextras.getApiInfo('/races'),'races');
	addPromiseInfo(Heroextras.getApiInfo('/jobs'),'jobs');


	$scope.insertHero=function(){

		heroesFactory.insertHero($scope.newHero)
		.success(function(){
			$scope.status='new hero inserted succesfully';
			$scope.getHeroes();
			$scope.newHero={};

		}).error(function(error) {
			$scope.status = 'Unable to insert hero: ' + error.message;
		});
	};

	$scope.deleteHero = function (id) {
		heroesFactory.deleteHero(id)
		.success(function () {
			$scope.status = 'Deleted hero! Refreshing heroes list.';
			for (var i = 0; i < $scope.heroes.length; i++) {
				var cust = $scope.heroes[i];
				if (cust.id === id) {
					$scope.heroes.splice(i, 1);
					break;
				}
			}
		})
		.error(function (error) {
			$scope.status = 'Unable to delete hero: ' + error.message;
		});
	};

	$scope.getHero = function(id){
		heroesFactory.getHero(id)
		.success(function(hero){
			$scope.currHero=hero;

		}).error(function(error){
			$scope.status = 'Unable to retrieve hero: ' + error.message;
		});
	};

	$scope.updateHero = function (id) {
		var hero;
		debugger;
		for (var i = 0,y=$scope.heroes.length; i < y; i++) {
			var currhero = $scope.heroes[i];
			$scope.updateindex= i;
			if (currhero.id === id) {
				hero = $scope.currHero;
				break;
			}
		}

		heroesFactory.updateHero(hero)
		.success(function () {
			$scope.heroes[$scope.updateindex]=$scope.currHero;
			$scope.status = 'Updated hero! Refreshing hero list.';
		})
		.error(function (error) {
			$scope.status = 'Unable to update hero: ' + error.message;
		});
	};
});

app.controller('JobsController', function($scope,$timeout,jobsFactory,fademessage){
	$scope.jobs=[];
	$scope.status;
	$scope.newJob;
	$scope.currJob;

	fademessage.setup($scope,$timeout);

	$scope.getjobs=function() {
		jobsFactory.getJobs()
		.success(function (records) {
			$scope.jobs = records;
		//	$scope.status = 'Job list loaded successfully '

	})
		.error(function (error) {
			$scope.status = 'Unable to load jobs data: ' + error.message;

		});


	};

	$scope.getjobs();

	$scope.insertJob=function(){

		jobsFactory.insertJob($scope.newJob)
		.success(function(){
			$scope.status='new Job inserted succesfully';
			$scope.getjobs();
			$scope.newJob={};

		}).error(function(error) {
			$scope.status = 'Unable to insert Job: ' + error.message;
		});
	};

	$scope.deleteJob = function (id) {
		jobsFactory.deleteJob(id)
		.success(function () {
			$scope.status = 'Deleted Job! Refreshing jobs list.';
			for (var i = 0; i < $scope.jobs.length; i++) {
				var cust = $scope.jobs[i];
				if (cust.id === id) {
					$scope.jobs.splice(i, 1);
					break;
				}
			}
		})
		.error(function (error) {
			$scope.status = 'Unable to delete Job: ' + error.message;
		});
	};

	$scope.getJob = function(id){
		jobsFactory.getJob(id)
		.success(function(Job){
			$scope.currJob=Job;

		}).error(function(error){
			$scope.status = 'Unable to retrieve Job: ' + error.message;
		});
	};

	$scope.updateJob = function (id) {
		var Job;
		for (var i = 0,y=$scope.jobs.length; i < y; i++) {
			var job = $scope.jobs[i];
			if (job.id === id) {
				Job = $scope.currJob;
				$scope.updateindex=i;
				break;
			}
		}

		jobsFactory.updateJob(Job)
		.success(function () {
			//getjobs();
			$scope.jobs[$scope.updateindex]=$scope.currJob;
			$scope.currJob={};
			$scope.status = 'Updated Job! Refreshing Job list.';
		})
		.error(function (error) {
			$scope.status = 'Unable to update Job: ' + error.message;
		});
	};

});

app.controller('RacesController', function($scope,$timeout,racesFactory,fademessage){
	$scope.races=[];
	$scope.status;
	$scope.newRace;
	$scope.currRace;

	fademessage.setup($scope,$timeout);

	$scope.getRaces=function () {
		racesFactory.getRaces()
		.success(function (records) {
			$scope.races = records;
		})
		.error(function (error) {
			$scope.status = 'Unable to load Races data: ' + error.message;
		});
	}

	$scope.getRaces();

	$scope.insertRace=function(){

		racesFactory.insertRace($scope.newRace)
		.success(function(){
			$scope.status='new Race inserted succesfully';
			$scope.getRaces();
			$scope.newRace={};
		}).error(function(error) {
			$scope.status = 'Unable to insert Race: ' + error.message;
		});
	};

	$scope.deleteRace = function (id) {
		racesFactory.deleteRace(id)
		.success(function () {
			$scope.status = 'Deleted Race! Refreshing Races list.';
			for (var i = 0; i < $scope.races.length; i++) {
				var cust = $scope.races[i];
				if (cust.id === id) {
					$scope.races.splice(i, 1);
					break;
				}
			}
		})
		.error(function (error) {
			$scope.status = 'Unable to delete Race: ' + error.message;
		});
	};

	$scope.getRace = function(id){
		racesFactory.getRace(id)
		.success(function(Race){
			$scope.currRace=Race;

		}).error(function(error){
			$scope.status = 'Unable to retrieve Race: ' + error.message;
		});
	};

	$scope.updateRace = function (id) {
		var Race;
		for (var i = 0,y=$scope.races.length; i < y; i++) {
			var currRace = $scope.races[i];
			if (currRace.id === id) {
				$scope.updateindex= i;
				Race=$scope.currRace;
				break;
			}
		}

		racesFactory.updateRace(Race)
		.success(function () {
			$scope.races[$scope.updateindex]=$scope.currRace;
			$scope.status = 'Updated Race! Refreshing Race list.';
		})
		.error(function (error) {
			$scope.status = 'Unable to update Race: ' + error.message;
		});
	};

});

app.controller('WeaponsController', function($scope,$timeout,weaponsFactory,fademessage){
	$scope.weapons=[];
	$scope.status;
	$scope.newWeapon;
	$scope.currWeapon;
	fademessage.setup($scope,$timeout);
	
	$scope.getWeapons=function () {
		weaponsFactory.getWeapons()
		.success(function (records) {
			$scope.weapons = records;
		})
		.error(function (error) {
			$scope.status = 'Unable to load Weapons data: ' + error.message;
		});
	}

	$scope.getWeapons();

	$scope.insertWeapon=function(){

		weaponsFactory.insertWeapon($scope.newWeapon)
		.success(function(){
			$scope.status='new Weapon inserted succesfully';
			$scope.getWeapons();
			$scope.newWeapon={};
		}).error(function(error) {
			$scope.status = 'Unable to insert Weapon: ' + error.message;
		});



	};

	$scope.deleteWeapon = function (id) {
		weaponsFactory.deleteWeapon(id)
		.success(function () {
			$scope.status = 'Deleted Weapon! Refreshing Weapons list.';
			for (var i = 0; i < $scope.weapons.length; i++) {
				var cust = $scope.weapons[i];
				if (cust.id === id) {
					$scope.weapons.splice(i, 1);
					break;
				}
			}
		})
		.error(function (error) {
			$scope.status = 'Unable to delete Weapon: ' + error.message;
		});
	};

	$scope.getWeapon = function(id){
		weaponsFactory.getWeapon(id)
		.success(function(Weapon){
			$scope.currWeapon=Weapon;

		}).error(function(error){
			$scope.status = 'Unable to retrieve Weapon: ' + error.message;
		});
	};

	$scope.updateWeapon = function (id) {
		var Weapon;
		for (var i = 0,y=$scope.weapons.length; i < y; i++) {
			var objWeapon = $scope.weapons[i];
			if (objWeapon.id === id) {
				Weapon = $scope.currWeapon;
				$scope.updateindex=i;
				break;
			}
		}

		weaponsFactory.updateWeapon(Weapon)
		.success(function () {
			$scope.weapons[$scope.updateindex]=$scope.currWeapon;
			$scope.status = 'Updated Weapon! Refreshing Weapons list.';
		})
		.error(function (error) {
			$scope.status = 'Unable to update Weapon: ' + error.message;
		});
	};

});

function filterforid(element,id){
	return element.id=id;
}

function ArraybyID(source){
	var target= [];
	for(var x=0,y=source.length;x<y;x++){
		target[source[x].id]=source[x];
	}
	return target;
}