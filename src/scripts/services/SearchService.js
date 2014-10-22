/// <reference path="../../../typings/jquery/jquery.d.ts" />

var SearchService = (function () {
    function SearchService() {
    }
    SearchService.prototype.search = function (query) {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            contentType: 'application/json',
            data: { query: query },
            type: 'GET'
        });
    };
    return SearchService;
})();
exports.SearchService = SearchService;
