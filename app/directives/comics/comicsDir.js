(function() {
    "use strict";
    angular.module("marvelComics")
        .directive('comics', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/comics/comicsDir.html',
                scope: {
                    comics: '=',
                    total: '=',
                    search: '=',
                    itemsPerPage: '='
                },
                controller: function($scope) {

                    $scope.getCriteria = function() {
                        if ($scope.sortSelected.code === '002') {
                            return "-name";
                        } else {
                            return "name";
                        }
                    }

                    $scope.generateList = function() {
                        var list = [];
                        for (var i = 1; i <= $scope.pagesLength; i++) {
                            list.push(i);
                        }
                        return list;
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