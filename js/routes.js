angular.module("app.routes", [])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/", {
      title: "Home",
      templateUrl: "views/main.html",
      controller: "main"
    })
    .otherwise({
      redirectTo: "/"
    });
}])
