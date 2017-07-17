(function() {
    "use strict";
    angular.module("marvelComics", ["ui.router", "angular-md5"])
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('mc', {
                    url: "/mc",
                    abstract: true,
                    templateUrl: 'app/views/main.html',
                    controller: "mainCtrl"
                })
                .state('mc.characters', {
                    url: "/characters",
                    templateUrl: "app/views/characters.html",
                    controller: "charactersCtrl"
                })

            $urlRouterProvider.otherwise('/mc/characters');
        })
        .constant("CONFIG", {
            marvelEndpoint: "https://gateway.marvel.com"
        })
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start;
                return input.slice(start);
            }
        })
}())