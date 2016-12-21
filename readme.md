<!--
Creator: Alex White
Market: SF
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

<!--9:45 5 minutes -->

<!--Hook: Remember RESTful routing?  Wouldn't it be great if there were a way to bundle all of our RESTful routes together so we don't have to write 7 AJAX requests with a lot of duplicated code?  It would be great, wouldn't it?  BAM, Angular $resource to the rescue. -->

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

<!--9:50 5 minutes -->

## Angular Review Questions
- What is Angular for?
- What is an SPA? Why does Angular make SPAs easier to build?
- [Summarize the answer from the Reddit question.](https://www.reddit.com/r/webdev/comments/4r8zc9/where_do_frameworks_like_angular_or_react_come_in/)

<!--9:55 5 minutes -->

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

<!--Actually 9:58 -->

<!--10:00 5 minutes -->

## $resource

`$resource` in Angular is a helper method that gives us all of the $http CRUD verbs in one method.

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

Specifically, `$resource` utilizes what is known as a factory in Angular.

<details>
  <summary>What is the relationship between $http and $resource?
</summary>
  <p>$resource is a layer of abstraction on $http which provides all of the $http methods to be called on the resource.</p>
</details>

<!--Actually 10:08 -->

<!--10:05 10 minutes -->

### What is a factory?

Now is a good time to talk a bit more about Factories in Angular and what they do.

Factories are a way to DRY out your code and separate concerns by _modularizing_ your code.  They make methods and properties available by returning an object that can be included wherever it is needed.  What does that remind you of from node?

<!--module.exports and require in node -->

- A factory returns an object of properties and methods.
- A factory can be `injected` to make those properties and methods available elsewhere.

### What does that mean for the code?

#### Declaring
```javascript
  app.factory('myFactory', myFactoryFunction);
```

#### Injecting (behind the scenes)
```javascript
myInjectedFactory  <----  myFactoryFunction()
```

#### Factory Function
```javascript
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

<!-- Think-pair-share -->

- What is a factory?
- Why would we use them?

<!--Actually 10:16 -->

<!--This lab is really hard to just throw them into -- first off, watch any reference to other factories--they are using $resource, just focus on the $resource code -->

<!-- Also, there are issues with Angular versions and shitty errors that make no sense, even to me.  To fix them, you need to include 

  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.10/angular.min.js"></script>

...we should just change this in http-lab.  We should also make sure that criminals.getAll returns criminals instead of {criminals: criminals}, cuz that breaks .query().  Fixing criminals controller inside the API for this.  -->

<!--10:15 35 minutes -->

## Independent Practice

Refactor your Infamous Criminals app from Monday to use $resource!

Setup:

- The `http-lab` frontend does not have bower in it yet, so how do you start a new bower project in the `frontend` folder?
- Install angular with bower and include it in your HTML
- The $resource factory doesn’t come bundled with the main Angular script. Run `bower install --save angular-resource`
- Add a link to the angular-resource module in your index.html (BELOW angular.js!):

 ` <script src="bower_components/angular-resource/angular-resource.min.js"></script>`

- Now you need to load the $resource module into your application.

  `angular.module('app', [..., 'ngResource']);`

- Don't forget to `$inject` `$resource` into your `Criminal` factory.

- Don't forget to `$inject` that factory into your controller.

- In the application directory, run a local server:

```bash
python -m SimpleHTTPServer 8000
```

- Finally, make sure your Node API is running, too.

## Additional Resources
[Angular $resource docs](https://docs.angularjs.org/api/ngResource/service/$resource)

[CRUD using $resource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)

[Factory vs Service](http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory)

[Factory vs Service vs Provider](https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider-5f426cfe6b8c#.jfi32r7jr)
