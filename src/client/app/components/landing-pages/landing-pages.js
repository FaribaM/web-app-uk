/**
 *
 *
 * LANDING PAGE COMPONENT
 *
 * @file
 * This component provides the landing pages for website. Same design / layout which pulls content from the backend.
 *
 */


(function() {

    'use strict';

    angular.module('project.landing-pages', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/frontpage', {
                pageTitle: 'AAT - Welcome',
                templateUrl: './site/components/frontpage/frontpage.tpl.html',
                controller: 'FrontpageController',
                controllerAs: 'vm',
                access: {
                    requiresLogin: false,
                    roles: []
                }
            });
        }])

        .controller('FrontpageController', FrontpageController);

    // Inject Deps
    FrontpageController.$inject = ['$http', '$window', 'API_URL', 'jwtHelper'];

    /**
     *
     * Controller
     *
     * @constructor
     */
    function FrontpageController() {

        var vm = this;

    }

}());
