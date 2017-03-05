angular.module('app.controllers', [])

.controller('main', function($scope, $rootScope, $http, $interval, $window) {

        $scope.$on("aceloaded", function() {
            $scope.data = $rootScope.aceData
            $scope.sectors = {
                bzSectors: [{
                    color: "red",
                    lo: 20,
                    hi: -15
                }, {
                    color: "orange",
                    lo: -15,
                    hi: -10
                }, {
                    color: "yellow",
                    lo: -10,
                    hi: 0
                }, {
                    color: "green",
                    lo: 0,
                    hi: 20
                }],

                speedSectors: [{
                    color: "green",
                    lo: 200,
                    hi: 350
                }, {
                    color: "yellow",
                    lo: 350,
                    hi: 500
                }, {
                    color: "orange",
                    lo: 500,
                    hi: 700
                }, {
                    color: "red",
                    lo: 700,
                    hi: 1000
                }],

                densitySectors: [{
                    color: "green",
                    lo: 0,
                    hi: 4
                }, {
                    color: "yellow",
                    lo: 4,
                    hi: 10
                }, {
                    color: "orange",
                    lo: 10,
                    hi: 15
                }, {
                    color: "red",
                    lo: 15,
                    hi: 20
                }],

                kpSectors: [{
                    color: "green",
                    lo: 0,
                    hi: 3
                }, {
                    color: "yellow",
                    lo: 3,
                    hi: 4
                }, {
                    color: "orange",
                    lo: 4,
                    hi: 6
                }, {
                    color: "red",
                    lo: 6,
                    hi: 9
                }]
            }
        })

        $scope.getMoonIcon = function(moonPhase) {
            switch (moonPhase) {
                case "New moon":
                    return "wi-moon-new"
                    break;
                case "Waxing crescent":
                    return "wi-moon-waxing-crescent-3"
                    break;
                case "First quarter":
                    return "wi-moon-first-quarter"
                    break;
                case "Waxing gibbous":
                    return "wi-moon-waxing-gibbous-3"
                    break;
                case "Full moon":
                    return "wi-moon-full"
                    break;
                case "Waning gibbous":
                    return "wi-moon-waning-gibbous-3"
                    break;
                case "Third quarter":
                    return "wi-moon-third-quarter"
                    break;
                case "Waning crescent":
                    return "wi-moon-waning-crescent-3"
                    break;
            }
        }

        $scope.time = new Date()
        $interval(function() {
            $scope.time = new Date()
        }, 500)

        $scope.loadWeather = function() {
          $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + $scope.config.location.lat + "&lon=" + $scope.config.location.long + "&APPID=" + $scope.config.weather.appID + "&cnt=3&units=" + ($scope.config.weather.metric ? "metric" : "imperial")).then(function(data) {
            $scope.forecast = data.data
          })
          $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + $scope.config.location.lat + "&lon=" + $scope.config.location.long + "&APPID=" + $scope.config.weather.appID + "&units=" + ($scope.config.weather.metric ? "metric" : "imperial")).then(function(data) {
            $scope.weather = data.data
          })
          $http.get("https://api.auroras.live/v1/?type=weather&lat=" + $scope.config.location.lat + "&long=" + $scope.config.location.long).then(function(data) {
            $scope.moon = {}
            $scope.moon.rise = data.data.moonrise
            $scope.moon.set = data.data.moonset
            $scope.moon.phase = $scope.getMoonIcon(data.data.moonphase)
          })

        }

        $http.get("js/data/widgets.json").then(function(data) {
            $scope.widgets = data.data
        })

        $scope.loadCalendar = function() {
          $http.get("calendar.php").then(function(data) {
            $scope.calendar = data.data;
          })
        }

        $http.get("config/config.json").then(function(data) {
          $scope.config = data.data
          $scope.loadWeather()
          $scope.loadCalendar()
        })

        $interval(function() {
          $scope.loadCalendar()
          $scope.loadWeather()
        }, 300000)

    })
