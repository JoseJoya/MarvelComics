(function() {
    "use strict";
    angular.module("marvelComics")
        .controller("comicsCtrl", ["$scope", "comServices", "marvelServices", "storageServices", "$rootScope", function($scope, comServices, marvelServices, storageServices, $rootScope) {
            $scope.url = comServices.getComicList();
            marvelServices.getComic($scope.url)
                .then(function(response) {
                    comServices.setComicList(response.data.results);
                    $scope.comicList = response.data.results;
                })

            $scope.limit = 10;
            $scope.page = 1;

            $rootScope.$on("paginator:nextPage", function() {
                $scope.page += 1;
                marvelServices.getComic($scope.url)
                    .then(function(response) {
                        $scope.comicList = response.data.results;
                        $scope.total = response.data.total;
                        angular.forEach($scope.comicList, function(comic) {
                            comic.thumbnail.path += marvelServices.generateQuery(false, 'standard')
                        });
                    }, function(error) {
                        console.error("Error when requesting data: ", error);
                    })
            })

            $rootScope.$on("paginator:previousPage", function() {
                $scope.page -= 1;
                marvelServices.getComic($scope.url)
                    .then(function(response) {
                        $scope.comicList = response.data.results;
                        $scope.total = response.data.total;
                        angular.forEach($scope.comicList, function(comic) {
                            comic.thumbnail.path += marvelServices.generateQuery(false, 'standard')
                        });
                    }, function(error) {
                        console.error("Error when requesting data: ", error);
                    })
            })

            $scope.getFavorites = function() {
                $scope.comics = storageServices.getAll();
            }

            $scope.getFavorites();

            $rootScope.$on("moreInfo:show", function() {
                $scope.showContent = true;
            })

            $rootScope.$on("moreInfo:hide", function() {
                $scope.showContent = false;
                $scope.getFavorites();
            })

            $rootScope.$on("search", function(event, searchVal) {
                $scope.search = searchVal;
            })

        }])
}())