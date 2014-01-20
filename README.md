Angular-Order
=============


Prerequisites
==========

You will nee a few things to run the proyect
* 1- bower(http://bower.io/) to resolve the dependencies.
* 2- Grunt(http://gruntjs.com/) in order to run unit and e2e testing.
* 3- NodeJS(http://nodejs.org/) to resolve grunt and karma dependencies.
* 4- Git since bower uses this to lookup some packages.

Setting up
===========

First download and install Git, after that install Nodejs, then on a terminal window run the next commands 
* npm install -g grunt-cli
* npm install -g bower

the -g option will make these modules globally available.

Getting the website running
===========================
open a terminal on the repository directory and run
* 1-'bower install' 
* 2- 'grunt serve' 

Testing
=======

open a terminal on the repository directory and type

* 'npm install' this will take care of installing the testing framework as well as all of its dependencies
* for unit testing execute the next command 'grunt test', the unit testing will cover the controllers, factories and api tests
* for end to end testing run 'grunt test:e2e' this will test all of the application routes.

Changing the api url
==========================
The default api url for this proyect is 'http://localhost:4567/api/v1', to change it go to app/scripts/app.js and change the value of 'app.apiURL'
