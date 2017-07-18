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
                controller: function($scope, marvelServices, storageServices) {

                    if (!!$scope.comics) {
                        $scope.comics.forEach(function(comic) {
                            comic.thumbnail.path = marvelServices.getThumbnail(comic.thumbnail.path);
                        })
                    }
                    $scope.$watch('comics', function(comicList) {
                        $scope.comics = comicList;
                        if (!!$scope.comics) {
                            $scope.comics.forEach(function(comic) {
                                comic.thumbnail.path = marvelServices.getThumbnail(comic.thumbnail.path);
                            })
                        }
                    })

                    $scope.deleteFavourite = function(comic) {
                        storageServices.removeItem(comic.id);
                        $scope.comics = storageServices.getAll();
                    }

                }
            }
        })

}())