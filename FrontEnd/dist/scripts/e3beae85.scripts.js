"use strict";angular.module("geekyTodoApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/login",{templateUrl:"views/signin.html",controller:"LoginCtrl"}).when("/items",{templateUrl:"views/viewtodo.html",controller:"ItemCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"CategoryCtrl"}).when("/item",{templateUrl:"views/item.html",controller:"ItemCtrl"}).otherwise({redirectTo:"/login"})}]),angular.module("geekyTodoApp").controller("RegisterCtrl",["$scope","signUpService",function(a,b){a.error={username:"",password:"",confirmPassword:"",email:"",mobileNumber:""},a.newUser={username:"",password:"",email:"",firstName:"",lastName:"",mobileNumber:""},a.register=function(g){a.error.username="",a.error.password="",a.error.confirmPassword="",a.error.email="",a.error.mobileNumber="",void 0!==g?(console.log(g),c(g.username)?a.newUser.username=g.username:f(a.error,"username","username is null or empty."),c(g.password)?"":f(a.error,"password","password is null or empty."),c(g.confirmPassword)?"":f(a.error,"confirmPassword","confirmPassword is null or empty."),c(g.password)?c(g.confirmPassword)?g.password!==g.confirmPassword?f(a.error,"password","password is not equal confirm password."):a.newUser.password=g.password:f(a.error,"confirmPassword","confirmPassword is null or empty."):f(a.error,"password","password is null or empty."),c(g.email)?d(g.email)?a.newUser.email=g.email:f(a.error,"email","Invalid format email."):f(a.error,"email","Email is null or empty."),c(g.mobileNumber)?e(g.mobileNumber)?a.newUser.mobileNumber=g.mobileNumber:f(a.error,"mobileNumber","Invalid format mobile number."):f(a.error,"mobileNumber","mobile number is null or empty."),a.newUser.firstName=g.firstName,a.newUser.lastName=g.lastName,""===a.error.username&&""===a.error.password&&""===a.error.confirmPassword&&""===a.error.email&&""===a.error.mobileNumber&&b.signup(a.newUser)):(f(a.error,"user","user error."),console.log("null object"))};var c=function(a){return console.log(a),void 0===a||""===a?!1:!0},d=function(a){var b=/\S+@\S+\.\S+/;return b.test(a)},e=function(a){return!isNaN(a)&&a.length<=10},f=function(a,b,c){"username"===b?a.username=c:"password"===b?a.password=c:"confirmPassword"===b?a.confirmPassword=c:"email"===b?a.email=c:"mobileNumber"===b&&(a.mobileNumber=c)}}]),angular.module("geekyTodoApp").controller("LoginCtrl",["$scope","$http","LoginServices","$location",function(a,b,c,d){a.buttonDisable=!0,a.username="",a.password="",a.login=function(){c.login(a.username,a.password).then(e,f)},a.checkNull=function(){a.username&&a.password&&(a.buttonDisable=!1)};var e=function(a){"SUCCESS"==a.status?d.path("/items"):alert(a.message)},f=function(a){console.log(a)}}]),angular.module("geekyTodoApp").controller("CategoryCtrl",["$scope","categoryService",function(a,b){a.register=function(){console.log("test")},a.categoryList=b.list(),a.newCat="",a.addCategory=function(){a.newCat&&(b.create({catName:a.newCat}),a.categoryList=b.list())},a.$watch("newCat",function(){a.isAddDisabled=a.newCat.trim()?!1:!0})}]),angular.module("geekyTodoApp").controller("ItemCtrl",["$scope","ItemServices",function(a,b){a.title="";var c=function(b){a.items=b.items},d=function(){b.getItemsList().then(c)},e=function(){a.title="",d()},f=function(){console.log("Failed")};a.addItem=function(){b.addItem(a.title).then(e,f)},d()}]);var geekyTodo=angular.module("geekyTodoApp");geekyTodo.factory("signUpService",["$http",function(a){var b=function(b){var c="http://54.254.28.194:3000/api/users/signup";return a.post(c,b)};return{signup:b}}]),angular.module("geekyTodoApp").service("categoryService",["$http","$q",function(a,b){var c=function(){var c=b.defer();return a.get("http://54.254.28.194:3000/api/categories/").success(function(a){c.resolve(a)}).error(function(){c.reject()}),c.promise},d=function(c){var d=b.defer();return a.post("http://54.254.28.194:3000/api/category/",c).success(function(a){d.resolve(a)}).error(function(){d.reject()}),d.promise};return{create:d,list:c}}]),angular.module("geekyTodoApp").factory("ItemServices",["$http","$q",function(a,b){var c="http://54.254.28.194:3000/api/items/",d="http://54.254.28.194:3000/api/item/",e=function(){var d=b.defer();return a.get(c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},f=function(c){var e=b.defer();return a.post(d,{title:c}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise};return{getItemsList:e,addItem:f}}]),angular.module("geekyTodoApp").factory("LoginServices",["$http","$q",function(a,b){var c="http://54.254.28.194:3000/api/users/signin",d=function(a,b){var d={username:a,password:b};return e(c,d)},e=function(c,d){var e=b.defer();return a.post(c,d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise};return{login:d}}]);