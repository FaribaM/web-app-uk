/**
 *
 * News Module
 *
 * @file Simple page component to surface news content from the API
 *
 * @todo : simplify
 *
 */

(function() {

    'use strict';

    angular.module('project.news', ['ngRoute'])

        //
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/news', {
                pageTitle: 'News',
                templateUrl: './site/components/news/news.html',
                controller: 'NewsController',
                controllerAs: 'vm',
                access: {
                    requiresLogin: false,
                    roles: []
                }
            });
        }])

        //
        .service('NewsDataService', NewsDataService)

        //
        .controller('NewsController', NewsController);

    NewsDataService.$inject = ['$http', 'API_URL'];

    NewsController.$inject = ['NewsDataService'];

    /**
     *
     * News Data Service
     *
     * @param $http
     * @constructor
     */
    function NewsDataService($http, API_URL) {

        var listingsAPI = API_URL + '/news';

        return {
            getNewsData: getNewsData,
            getNewsRelatedData: getNewsRelatedData,
            getListingsData: getListingsData
        };

        /**
         *
         * Get News Data
         *
         * @returns {*}
         */
        function getNewsData() {

            //console.log("NewsDataService.getNewsData");

            return $http.get(listingsAPI)
                .then(dataComplete)
                .catch(dataFailed);

            function dataComplete(response) {
                //console.log("complete called");
                return response.data;
            }

            function dataFailed(error) {
                console.log('XHR Failed for getNewsData.' + error.data);
            }
        }

        /**
         *
         * @returns {*}
         */
        function getNewsRelatedData() {

            //console.log("NewsDataService.getNewsData");

            return $http.get(listingsAPI)
                .then(dataComplete)
                .catch(dataFailed);

            function dataComplete(response) {
                //console.log("complete called");
                return response.data;
            }

            function dataFailed(error) {
                console.log('XHR Failed for getNewsRelatedData.' + error.data);
            }
        }

        /**
         *
         * Get Listings Data
         *
         * Fetch data from the API and page through the results
         *
         * @returns {*}
         */
        function getListingsData() {

            //console.log("NewsDataService.getListingsData");

            return $http.get(listingsAPI, {
                    cache: true
                })
                .then(dataComplete)
                .catch(dataFailed);

            function dataComplete(response) {
                //console.log("complete called");
                return response.data;
            }

            function dataFailed(error) {
                console.log('XHR Failed for getListingsData.' + error.data);
            }
        }

    }

    /**
     *
     * News Controller
     *
     * @param {object} $http
     * @constructor
     */
    function NewsController(NewsDataService) {

        var vm = this;

        vm.term = 'News data';
        vm.news = [];
        vm.listings = [];

        // Call main controller function
        activate();

        /**
         *
         * Main Controller Function
         *
         * @returns {*}
         *
         */
        function activate() {

            //
            return getNewsData().then(function() {
                //console.log('Activated News View');
            });

        }

        /**
         *
         * Call the Get News Data (Service) to collect data
         *
         * @returns {Array}
         */
        function getNewsData() {

            var content = [];

            content = NewsDataService.getNewsData()

                .then(function(data) {

                    vm.news = data;

                    //console.log("controller news data caller");

                    return vm.news;
                });

            content = NewsDataService.getListingsData()

                .then(function(data) {

                    vm.listings = data;

                    //console.log("controller news data caller");

                    return vm.listings;
                });

            return content;
        }

    }

}());
