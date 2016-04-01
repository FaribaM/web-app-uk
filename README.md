AAT WEB APP
===============

This is the source for the frontend javascript client of AAT Website (UK)

All data is sourced via requests to AAT Content (REST) API.   

Tools used : 

    - AngularJS 1.x (latest)
    - Bower
    - Gulp
    - Bootstrap  
    - SASS
    - jQuery 
    
    
Testing : 

    - Jasmine
    - Karma 
    - Protractor
    
   
Setup
---------------


```
npm install
```

Builds
-------------

The current tooling is built around Gulp (http://gulpjs.com/)

Then once installed you can run from the 'gulp' command from the main content root. 


```
gulp
```


Server
-------------

This site is flat HTML so any webserver will run the app. 
 
One NodeJS webserver that is very good while developing is live-server (https://www.npmjs.com/package/live-server)

 - Install via // npm install -g live-server
 - cd ./app

```
live-server
```

In production we recommend using Docker + Nginx


Demo api content:
```
node fake_api_server.js
```


or run both server
```
npm start
```


Core Files
-------------

The core CSS is located from within the SASS folder, and includes the vendor libs Bootstrap. 
 
The core JS files and components are located within "./app/sites/", the main JS is "app/app.js"

Please adjust these to meet your specific requirements. 


Components & Microservices
--------------------------

The application architecture is based around the component model along with supporting "microservices" from the API.

@see : 
 
  - https://en.wikipedia.org/wiki/Component-based_software_engineering
  - https://en.wikipedia.org/wiki/Microservices
  


CSS
-------------

All CSS work should be worked on within the SASS folder and via Gulp compiled to a single minified CSS file. 

This is all setup currently and only the sass files need to updated / created.


JS
-------------

All JS work should be worked on within the SITE folder + root level 'app.js' and via gulp compiled to a single uglified JS file. 

This is setup and working.


Libraries
-------------

All frontend tools should be added via Bower install --save; and build / test tools should be added via npm install --save



Docker
-------------

Make sure you have installed Docker, and an environment is available / started.

Windows / Mac - Docker-machine (or docker-toolbox) : 

     
    docker-machine start default
    
   
    eval $(docker-machine env default)
    
Then cd into the the project root and run the following : 


    docker build -t aat/web-app-sa .


The will now build the image "aat/web-app-sa", which will be seen in your images list if you run the command "docker images"

To now start this as a container, please run the following : 


    docker run -itd -p 8001:80 -v /YOUR_FULL_PATH/web-app/build:/var/www/nginx-default aat/web-app-uk
   

So my example : 

    docker run -itd -p 8001:80 -v /Users/markrushton/Sites/aat/web-app-uk/build:/var/www/nginx-default aat/web-app-uk


Check your docker machine IP : (dev is the name of the docker-machine env, your may be different i.e. default) 

    docker-machine ip dev 

Now in a new browser tab, visit the website at the returned YOUR_DOCKER_IP:8001 

So my example : 

    192.168.99.100:8001


**Success, you are now up and running.** 


*Some other useful Docker commands to stop / remove all of Docker containers:*

    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)




AWS SDK
-------------

AWS JS SDK for the browser is included. 

You can build custom scripts here : https://sdk.amazonaws.com/builder/js/

(installed via bower)

@todo - move this the WIKI

