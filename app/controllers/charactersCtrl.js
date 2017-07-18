(function() {
    "use strict";
    angular.module("marvelComics")
        .controller("charactersCtrl", ["$scope", "$rootScope", "marvelServices", "storageServices", function($scope, $rootScope, marvelServices, storageServices) {
            $scope.limit = 10;
            $scope.page = 1;
            marvelServices.getCharacters($scope.limit, $scope.page)
                .then(function(response) {
                    $scope.characterList = response.data.results;
                    $scope.total = response.data.total;
                    angular.forEach($scope.characterList, function(character) {
                        character.thumbnail.path += marvelServices.generateQuery(false, 'standard')
                    });
                }, function(error) {
                    console.error("Error when requesting data: ", error);
                })

            $rootScope.$on("paginator:nextPage", function() {
                $scope.page += 1;
                marvelServices.getCharacters($scope.limit, (($scope.page - 1) * $scope.limit))
                    .then(function(response) {
                        $scope.characterList = response.data.results;
                        $scope.total = response.data.total;
                        angular.forEach($scope.characterList, function(character) {
                            character.thumbnail.path += marvelServices.generateQuery(false, 'standard')
                        });
                    }, function(error) {
                        console.error("Error when requesting data: ", error);
                    })
            })

            $rootScope.$on("paginator:previousPage", function() {
                $scope.page -= 1;
                marvelServices.getCharacters($scope.limit, (($scope.page - 1) * $scope.limit))
                    .then(function(response) {
                        $scope.characterList = response.data.results;
                        $scope.total = response.data.total;
                        angular.forEach($scope.characterList, function(character) {
                            character.thumbnail.path += marvelServices.generateQuery(false, 'standard')
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