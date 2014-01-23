Angular-Order
=============


Prerequisites
==========

You will nee a few things to run the proyect
* 1- bower(http://bower.io/) to resolve the dependencies.
* 2- Grunt(http://gruntjs.com/) in order to run unit and e2e testing.
* 3- NodeJS(http://nodejs.org/) to resolve grunt and karma dependencies.
* 4- Git since bower uses this to lookup some packages.
* 5- Ruby and the haml gem for templating.

Setting up
===========

First download and install Git, after that install Nodejs, then on a terminal window run the next commands 
* `npm install -g grunt-cli`
* `npm install -g bower`

the -g option will make these modules globally available.

Getting the website running
===========================
open a terminal on the repository directory and execute the following commands
* 1- `bower install`
* 2- `npm install`
* 3- `grunt serve` 

  Note: it is reccomended to use along with my fork of the order of the pixel(https://github.com/OliDM/order-of-the-pixel)


Templating
==========
The 4 main views "heroes", "weapons", "races" and "jobs" are created using its corresponding haml template localed in `app/haml`, these views are regenerated whenever the commands `grunt serve` or `grunt haml` are executed. To work with the views directly either modify the .haml file or  remove the `haml` task on the grunt serve command or comment the haml task configuration for the file you wish to work on.

the templating engine uses `grunt-contrib-haml` for more info go to https://npmjs.org/package/grunt-contrib-haml

Testing
=======

open a terminal on the repository directory and type

* `npm install` this will take care of installing the testing framework as well as all of its dependencies
* for unit testing execute the next command `grunt test`, the unit testing will cover the controllers, factories and api tests
* for end to end testing use `grunt test:e2e` this will test all of the application routes.

Changing the api url
==========================
The default api url for this proyect is `http://localhost:4567/api/v1`, to change it go to app/scripts/app.js and change the value of `app.apiURL`
