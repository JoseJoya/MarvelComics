(function() {
    "use strict";
    angular.module("marvelComics")
        .controller('mainCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {

            $scope.goSearch = function() {
                $rootScope.$emit("search", String($scope.search));
            }

        }]);
}())