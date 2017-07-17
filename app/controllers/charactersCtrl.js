(function() {
    "use strict";
    angular.module("marvelComics")
        .controller("charactersCtrl", ["$scope", "$rootScope", "marvelServices", function($scope, $rootScope, marvelServices) {
            $scope.limit = 10;
            $scope.page = 1;
            marvelServices.getCharacters($scope.limit, $scope.page)
                .then(function(response) {
                    $scope.characterList = response.data.results;
                    $scope.total = response.data.total;
                    angular.forEach($scope.characterList, function(character) {
                        character.thumbnail.path += marvelServices.generateQuery()
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
                            character.thumbnail.path += marvelServices.generateQuery()
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
                            character.thumbnail.path += marvelServices.generateQuery()
                        });
                    }, function(error) {
                        console.error("Error when requesting data: ", error);
                    })
            })

        }])
}())