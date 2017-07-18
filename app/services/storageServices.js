(function() {
    "use strict";
    angular.module("marvelComics")
        .factory("storageServices", function() {
            return {
                getItem: function(key) {
                    let item = sessionStorage.getItem(key);
                    return JSON.parse(item);
                },
                setItem: function(key, value) {
                    sessionStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: function(key) {
                    sessionStorage.removeItem(key);
                },
                removeAll: function() {
                    sessionStorage.clear();
                },
                getAll: function() {
                    let iterator = Object.keys(sessionStorage);
                    let outputArray = [];
                    for (let i = 0; i < iterator.length; i++) {
                        outputArray.push(JSON.parse(sessionStorage[iterator[i]]));
                    }
                    return outputArray;
                }
            }
        })
}())