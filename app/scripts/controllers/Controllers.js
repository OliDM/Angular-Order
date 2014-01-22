

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


	ControllerTemplate($scope,heroesFactory,'Hero', true);
	fademessage.setup($scope,$timeout);

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


	
});

app.controller('JobsController', function($scope,$timeout,jobsFactory,fademessage){
	
	ControllerTemplate($scope,jobsFactory,'Job');
	fademessage.setup($scope,$timeout);

});

app.controller('RacesController', function($scope,$timeout,racesFactory,fademessage){
	
	ControllerTemplate($scope,racesFactory,'Race');
	fademessage.setup($scope,$timeout);
});

app.controller('WeaponsController', function($scope,$timeout,weaponsFactory,fademessage){
	
	ControllerTemplate($scope,weaponsFactory,'Weapon');
	fademessage.setup($scope,$timeout);
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

//ControllerTemplate($scope,jobsFactory,fademessage,'Job');
function ControllerTemplate(scope,Factory,name, hack){
	
	//tokenizing property names
	var plural= hack ? name+'es' : name+'s',
	insert='insert'+name,
	update='update'+name,
	sdelete='delete'+name,
	get='get'+name,
	gets='get'+plural,
	coll=plural.toLowerCase(),
	newitem='new'+name,
	curritem='curr'+name;

	//initializing/declaring some properties
	scope[coll]=[];
	scope.status;
	scope[newitem];
	scope[curritem];

	scope[gets]=function() {
		debugger;
		Factory[gets]()
		.success(function (records) {
			scope[coll] = records;
		})
		.error(function (error) {
			scope.status = String.format('Unable to load {0} data: {1}',plural , error);

		});
	};

	scope[gets]();

	scope[insert]=function(){

		Factory[insert](scope[newitem])
		.success(function(){
			scope.status=String.format('new {0} inserted succesfully',name);
			scope[gets]();
			scope[newitem]={};

		}).error(function(error) {
			scope.status = String.format('Unable to insert {0}: {1}', name,error);
		});
	};

	scope[sdelete] = function (id) {
		Factory[sdelete](id)
		.success(function () {
			scope.status = String.format('Deleted {0}! Refreshing {0} list.',plural);
			for (var i = 0; i < scope[coll].length; i++) {
				var cust = scope[coll][i];
				if (cust.id === id) {
					scope[coll].splice(i, 1);
					break;
				}
			}
		})
		.error(function (error) {
			scope.status =String.format('Unable to delete {0}: {1},',name, error);
		});
	};

	scope[get] = function(id){
		Factory[get](id)
		.success(function(item){
			scope[curritem]=item;

		}).error(function(error){
			scope.status = String.format('Unable to retrieve {0}: {1}',name, error);
		});
	};

	scope[update] = function (id) {
		var aux;
		for (var i = 0,y=scope[coll].length; i < y; i++) {
			var aux2 = scope[coll][i];
			if (aux2.id === id) {
				aux = scope[curritem];
				scope.updateindex=i;
				break;
			}
		}

		Factory[update](aux)
		.success(function () {
			scope[coll][scope.updateindex]=scope[curritem];
			scope[curritem]={};
			scope.status = String.format('Updated {0}! Refreshing {0} list.',name);
		})
		.error(function (error) {
			scope.status = String.format('Unable to update {0}: {1}',name, error);
		});
	};
}

String.format = function() {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {       
		var reg = new RegExp("\\{" + i + "\\}", "gm");             
		s = s.replace(reg, arguments[i + 1]);
	}
	return s;
}