<!--
Creator: Alex White
Market: SF
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Angular $resource

### Why is this important?
*This workshop is important because:*
- $resource is a valuable tool for setting up http requests to an API

### What are the objectives?
*After this workshop, developers will be able to:*

- **Know** the difference between $http and $resource
- **Describe** what a factory is in Angular
- **Refactor** $http using $resource in a factory

### Where should we be now?
*Before this workshop, developers should already be able to:*

- Set up $http in Angular to hit an API from an Angular app.

## Angular Review Questions
- What is Angular for?
- What is a SPA? Why does Angular make SPAs easier to build?
- Summarize the answer from the Reddit question.

## $http Review
<details>
  <summary>What is $http?</summary>
  <p>[$http](https://docs.angularjs.org/api/ng/service/$http) is a core Angular service that facilitates communication with remote HTTP servers via the browser's XMLHttpRequest object or via JSONP. It is very similar to jQuery's $.ajax function.</p>
</details>
<details>
  <summary>What does $http have to do with SPAs?</summary>
  <p>In single page applications we don't have page refreshes. Everything is done using asynchronous http requests using client side JS. In angular we do that using the $http service</p>
</details>



### Code Example

```js
function addCriminal(){
    $http
      .post('http://localhost:3000/criminals', self.newCriminal)
      .then(function(response){
        self.all.push(response.data.criminal)
    });
    self.newCriminal = {};
  }
```
## $resource

$resource in Angular is a helper method that gives us all of the $http CRUD verbs in one method. Kind of like how
```ruby
resources :criminals
```
will give you all of the CRUD routes in Ruby on Rails

Of course these aren't routes, they are AJAX requests. Here's an example:

```js
  app.factory("Wine", function($resource) {
    return $resource("http://daretoexplore.herokuapp.com/wines/:id")
  });

  app.controller('WineController',function($scope, Wine) {
    var wine = Wine.get({ id: $scope.id }, function() {
      console.log(wine);
    }); // get() returns a single wine
  };
```

Specifically, $resource is what is known as a factory in Angular.

<details>
  <summary>What is the relationship between http and resource?
</summary>
  <p>$resource is a layer of abstraction on $http which provides all of the $http methods to be called on the resource.</p>
</details>


### What is a factory?

- A factory is like a Service in Angular, but it is NOT a constructor function.
- A factory returns an object.

#### Review:
<details>
  <summary>What is a constructor function?
</summary>
  <p>A JS method that we use the `new` keyword with that returns an object.</p>
</details>

<details>
  <summary>What is a service?
</summary>
  <p>A method on our module used like helper methods. It uses the `this` keyword to attach functions to
itself</p>
</details>

### What does that mean for the code?

#### Declaring
```javascript
  angular.service('myService', myServiceFunction);
  angular.factory('myFactory', myFactoryFunction);
```

#### Injecting (behind the scenes)
```javascript
myInjectedService  <----  new myServiceFunction()
myInjectedFactory  <----  myFactoryFunction()
```

#### Constructor vs Non-Constructor
```javascript
function myServiceFunction() {
  this.awesomeApi = function(optional) {
    // calculate some stuff
    return awesomeListOfValues;
  }
}

function myFactoryFunction() {
  function awesomeApi(optional) {
    return awesomeListOfValues;
  }

  // expose a public API
  return {
    awesomeApi: awesomeApi
  };
}
```
#### Putting it together
<details>
  <summary>How is a factory different from a service?
</summary>
  <p>1. A factory is not a constructor function.</p>
  <p>2. A factory returns an object.</p>
</details>

## Independent Practice

Refactor your Infamous Criminals app from yesterday to use $resource!

Setup:

- The $resource service doesn’t come bundled with the main Angular script. Run bower install --save angular-resource


- Add a link to the angular-resource module in your index.html (BELOW angular.js!):

 ` <script src="bower_components/angular-resource/angular-resource.min.js"></script>`

OR simply use the CDN:

`"https://www.ajax.googleapis.com/ajax/libs/angularjs/X.Y.Z/angular-resource.js"
 `

- Now you need to load the $resource module into your application.

  `angular.module('app', [..., 'ngResource']);`

- In the application directory run a local server:

```bash
python -m SimpleHTTPServer 8000
# or
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => Dir.pwd).start'
```

## Additional Resources
[Angular $resource docs](https://docs.angularjs.org/api/ngResource/service/$resource)

[CRUD using $resource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)

[Factory vs Service](http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory)

[Factory vs Service vs Provider](https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider-5f426cfe6b8c#.jfi32r7jr)
