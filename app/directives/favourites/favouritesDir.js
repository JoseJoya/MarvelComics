(function() {
    "use strict";

    angular.module("marvelComics")
        .directive("favourites", function() {
            return  {
                retrict: "E",
                templateUrl: "app/directives/favourites/favouritesDir.html",
                scope: {
                    comics: "="
                },
                controller: function($scope) {

                }
            }
        })

}())