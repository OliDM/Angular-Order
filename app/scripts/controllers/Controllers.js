app.filter('startFrom', function() {
	return function(input, start) {
		if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});


app.controller('NavbarController', function ($scope, $location) {
	$scope.getClass = function (path) {
		if ($location.path().substr(0, path.length).toUpperCase() == path.toUpperCase()) {
			return true
		} else {
			return false;
		}
	}
});

app.controller('HeroesController', function ($scope,$timeout, heroesFactory,fademessage,Heroextras,filterFilter){


	ControllerTemplate($scope,heroesFactory,'Hero', true, filterFilter);
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

app.controller('JobsController', function($scope,$timeout,jobsFactory,fademessage, filterFilter){
	
	ControllerTemplate($scope,jobsFactory,'Job',false,filterFilter);
	fademessage.setup($scope,$timeout);


	
});

app.controller('RacesController', function($scope,$timeout,racesFactory,fademessage, filterFilter){
	
	ControllerTemplate($scope,racesFactory,'Race',false ,filterFilter);
	fademessage.setup($scope,$timeout);
});

app.controller('WeaponsController', function($scope,$timeout,weaponsFactory,fademessage,filterFilter){
	
	ControllerTemplate($scope,weaponsFactory,'Weapon', false,filterFilter);
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

function Paginator($scope,colname,filterFilter) {
	/* init pagination with $scope.list */
	$scope.entryLimit = 5;
	$scope.currentPage = 1; //current page
    $scope.maxSize = 5; //pagination max size

    /* init pagination with $scope.list */
    $scope.noOfPages = Math.ceil($scope[colname].length/$scope.entryLimit);

    $scope.$watch('search', function(term) {
        // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
        $scope.filtered = filterFilter($scope[colname], term);
        $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
    });

}


function ControllerTemplate(scope,Factory,name, hack,filterFilter){
	
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
		Factory[gets]()
		.success(function (records) {

			scope[coll] = records;
			debugger;
			if(!scope.maxSize){
				Paginator(scope,coll,filterFilter);
			}
			else{
				scope.updatepager();
			}	
			
		})
		.error(function (error) {
			scope.status = String.format('Unable to load {0} data: {1}',plural , error);

		});
	};

	if(filterFilter){
		scope.updatepager=function(){

			scope.filtered = scope[coll];
			scope.noOfPages = Math.ceil(scope.filtered.length/scope.entryLimit);
			scope.search="";

		}
	}
	else{
		scope.updatepager= function(){return "";}
	}

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
		scope.updatepager();
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
		scope.updatepager();
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