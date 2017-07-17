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
                    total: "="
                },
                controller: function($scope, $rootScope) {

                    $scope.getCriteria = function() {
                        if ($scope.sortSelected.code === '002') {
                            return "-name";
                        } else {
                            return "name";
                        }
                    }

                    $scope.getOptions = function() {
                        angular.element(document.querySelector('#sort')).click();
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

                    $scope.generateList = function() {
                        var list = [];
                        for (var i = 1; i <= $scope.pagesLength; i++) {
                            list.push(i);
                        }
                        return list;
                    }

                    $scope.aboutComic = function(url) {
                        alert(url)
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
}())