/// <reference path="../../../typings/jquery/jquery.d.ts" />
var SearchService = (function () {
    function SearchService() {
    }
    // method for test purposes
    SearchService.prototype.getList = function () {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            type: 'GET'
        });
    };
    return SearchService;
})();
exports.SearchService = SearchService;
