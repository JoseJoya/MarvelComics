(function() {
    "use strict";
    angular.module("marvelComics")
        .directive("characters", function() {
            return {
                restrict: "E",
                templateUrl: "app/directives/characters/charactersDir.html",
                scope: {
                    characterList: '=',
                    itemsPerPage: "=",
                    total: "=",
                    search: "="
                },
                controller: function($scope, $rootScope, $filter, marvelServices, storageServices, $state, comServices) {

                    $scope.getCriteria = function() {
                        if ($scope.sortSelected.code === '002') {
                            return "-name";
                        } else {
                            return "name";
                        }
                    }

                    $scope.showComics = function(character) {
                        comServices.setComicList(character.comics.collectionURI);
                        $state.go('mc.comics');
                    }

                    $scope.getOptions = function() {
                        document.getElementById('sort').click();
                    }

                    $scope.$watch("total", function(newVal) {
                        $scope.total = newVal;
                        $scope.pagesLength = String($scope.total / $scope.itemsPerPage);
                        if ($scope.pagesLength.indexOf('.') > -1) {
                            $scope.pagesLength = Number($scope.pagesLength.split('.')[0]) + 1;
                        } else {
                            $scope.pagesLength = Number($scope.pagesLength);
                        }
                    });

                    $scope.actualPage = 1;

                    $scope.showContent = false;

                    $scope.generateList = function() {
                        var list = [];
                        for (var i = 1; i <= $scope.pagesLength; i++) {
                            list.push(i);
                        }
                        return list;
                    }

                    $scope.aboutComic = function(comic) {
                        $scope.showContent = true;
                        $rootScope.$emit("moreInfo:show");
                        marvelServices.getComic(comic.resourceURI)
                            .then(function(response) {
                                $scope.selectedComic = response.data.results[0];
                                $scope.selectedComic.thumbnail.path += marvelServices.generateQuery(false, 'portrait');
                            });
                    }

                    $scope.closeInfo = function() {
                        $scope.showContent = false;
                        $rootScope.$emit("moreInfo:hide");
                    }

                    $scope.nextPage = function() {
                        if ($scope.actualPage < $scope.pagesLength) {
                            $scope.actualPage += 1;
                            $rootScope.$emit("paginator:nextPage");
                        }
                    }
                    $scope.previousPage = function() {
                        if ($scope.actualPage > 1) {
                            $scope.actualPage -= 1;
                            $rootScope.$emit("paginator:previousPage");
                        }
                    }

                    $scope.isFavourite = function(comic) {
                        if (!!comic) {
                            if (!!storageServices.getItem(comic.id)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        return false;
                    }

                    $scope.getPrices = function(prices) {
                        if (!!prices) {
                            return prices[0].price;
                        } else {
                            return '9.99';
                        }
                    }

                    $scope.addToFavourites = function(comic) {
                        if (!storageServices.getItem(comic.id)) {
                            storageServices.setItem(comic.id, comic);
                            $scope.closeInfo();
                        } else {
                            storageServices.removeItem(comic.id);
                            $scope.closeInfo();
                        }
                    }


                    $scope.sortSelected = {};

                    $scope.sortBy = [{
                        code: "",
                        name: "Sort By"
                    }, {
                        code: "001",
                        name: "Upward"
                    }, {
                        code: "002",
                        name: "Downward"
                    }]
                }
            }
        })
        .filter('searchFilter', function() {
            return function(actual, spected) {
                if (!!spected && !!actual) {
                    var selected = [];
                    for (var i = 0; i < actual.length; i++) {
                        if (!!actual[i].name && actual[i].name.toLowerCase().indexOf(spected.toLowerCase()) > -1) {
                            selected.push(actual[i]);
                        }
                    }
                    return selected;
                } else {
                    return actual;
                }
            }
        })
}())