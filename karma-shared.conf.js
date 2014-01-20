module.exports = function() {
  return {
    basePath: '',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,
    
    files : [
      //3rd Party Code
      'app/bower_components/jquery/jquery.min.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/es5-shim/es5-shim.js',
      'app/bower_components/json3/lib/json3.min.js',
      //'app/bower_components/angular-scenario/angular-scenario.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',


      //App-specific Code
      'app/scripts/app.js',
      'app/scripts/Factories/Factories.js',
      'app/scripts/controllers/Controllers.js',
      ]
    }
  };
