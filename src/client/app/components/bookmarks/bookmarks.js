/***
 *
 * BOOKMARKS COMPONENT
 *
 * @file
 *  Provides bookmarks functionality for the site, including directives
 *
 */

(function() {


    'use strict';

    angular.module('bookmarks', ['ngRoute', 'formly', 'formlyBootstrap', 'angular-jwt', 'project.auth'])

        // Services
        .service('BookmarksDataService', BookmarksDataService)

        // Directives
        .directive('bookmarksUserList', bookmarksUserList)

        // Controllers
        .controller('BookmarksController', BookmarksController);


    // Inject Deps
    bookmarksUserList.$inject = ['$location', 'AuthTokenService', 'BookmarksDataService'];

    BookmarksDataService.$inject = ['$http', '$rootScope', 'API_URL', 'jwtHelper', '$window', 'AuthTokenService'];

    BookmarksController.$inject = ['BookmarksDataService', 'jwtHelper', '$location', '$window', 'AuthTokenService'];


    /**
     *
     * Login Directive : Provides the Top Bar User Login/Logout links and functionality.
     *
     * @returns {{replace: boolean, restrict: string, template: string, link: link}}
     *
     */
    function bookmarksUserList($location, AuthTokenService, BookmarksDataService, $compile) {

        return {
            replace: true,
            restrict: 'AE',

            //scope: {
            //    'bookmarks'
            //},

            templateUrl: 'site/components/bookmarks/templates/bookmarks-user-list.tpl.html',

            link: function(scope, elem, attrs) {


                /**
                 *
                 *
                 */
                BookmarksDataService.getUserBookmarks(1)

                    .then(function(response) {
                        scope.bookmarks = response
                    })
                    .catch(function(error) {

                        console.log("Bookmarks get error");

                    });

                console.log("bookmarks == " + scope.bookmarks);


            }
        }


    }

    /**
     *
     * Login Controller
     *
     * @constructor
     *
     */
    function BookmarksController(BookmarksDataService, jwtHelper, $location, $window, AuthTokenService) {

        //var vm = this;
        //
        //
        ///**
        // *
        // * Login form Submit handler w/ page redirect
        // *
        // */
        //function onSubmit() {
        //
        //    var formSubmitted = true;
        //
        //    //console.log("ctrl : ", AuthTokenService);
        //
        //    BookmarksDataService.login(vm.model.email, vm.model.password)
        //        .then(function success(response) {
        //
        //            AuthTokenService.authStatus = true;
        //
        //            //console.log(AuthTokenService.authStatus);
        //
        //            // Redirect if succesful login
        //            $window.location.href = '#/dashboard';
        //            $window.location.reload();
        //
        //        });
        //
        //}


    }

    /**
     *
     * Bookmarks Data Service
     *
     * @constructor
     */
    function BookmarksDataService($http, $rootScope, API_URL, jwtHelper, $window, AuthTokenService) {

        var endpointAPI = API_URL + "/bookmarks";

        return {
            getUserBookmarks: getUserBookmarks
        };


        /**
         *
         * Get the users bookmarks
         *
         * @param uuid
         * @returns {*}
         */
        function getUserBookmarks(uuid) {

            return $http.get(endpointAPI + "/" + uuid)
                .then(dataComplete)
                .catch(dataFailed);

            function dataComplete(response) {

                console.log(response.data);
                return response.data;

            }

            function dataFailed(error) {
                console.log('XHR Failed for getNewsData.' + error);
            }
        }


    }
}());