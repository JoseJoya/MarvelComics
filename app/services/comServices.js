(function() {
    "use strict";
    angular.module("marvelComics")
        .factory("comServices", function() {
            this.comicList = [];
            return {
                setComicList: function(list) {
                    this.comicList = list;
                },
                getComicList: function() {
                    return this.comicList;
                }
            }
        })
}())