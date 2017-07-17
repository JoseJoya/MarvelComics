(function() {
    "use strict";
    angular.module("marvelComics")
        .factory('marvelServices', function($http, $q, md5, CONFIG) {
            var ts = "0";
            var pk = "564f118cf6dbaede65ab35ffa68a31f2";
            var pvk = "810738d1f573aa6d3ce7622a4eb9958c550ccedb";
            return {
                getCharacters: function(limit, offset) {
                    ts = String((Math.random() * 10000) + 1).split(".")[0];
                    let requestKey = md5.createHash(ts + pvk + pk);
                    let deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: CONFIG.marvelEndpoint + "/v1/public/characters?ts=" + ts + "&apikey=" + pk + "&hash=" + requestKey + "&limit=" + limit + "&offset=" + offset
                    }).then(function(response) {
                        deferred.resolve(response.data);
                    }, function(eResponse) {
                        deferred.reject(eResponse);
                    });
                    return deferred.promise;
                },
                getThumbnail: function(url) {
                    ts = String((Math.random() * 10000) + 1).split(".")[0];
                    let requestKey = md5.createHash(ts + pvk + pk);
                    let deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: url + "/portrait_xlarge.jpg?ts=" + ts + "&apikey=" + pk + "&hash=" + requestKey
                    }).then(function(response) {
                        deferred.resolve(response.data);
                    }, function(eResponse) {
                        deferred.reject(eResponse);
                    });
                    return deferred.promise;
                },
                generateQuery: function() {
                    ts = String((Math.random() * 10000) + 1).split(".")[0];
                    let requestKey = md5.createHash(ts + pvk + pk);
                    return "/standard_fantastic.jpg?ts=" + ts + "&apikey=" + pk + "&hash=" + requestKey;
                }
            }
        });
}())