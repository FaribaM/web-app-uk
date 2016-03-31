/***
 *
 * USER COMPONENT
 *
 * @file
 *  Provides user functionality for the site, including directives and the user service. This service will have
 *  all the relative data for the logged in user and can be used as reference from other modules.2
 *
 * @todo :
 *
 *  - form error validation to return error on non successful login with messaging
 *
 */

'use strict';

angular.module('project.user', [])

    .value('user', {
        auth: false,
        token: ''
    })

    .service('UserService', UserService)

    .directive('userMenuTopBar', userMenuTopBar);


// Inject Deps
UserService.$inject = ['$http'];

userMenuTopBar.$inject = ['$window', '$location'];


/**
 *
 * User Controller
 *
 * @constructor
 */
function UserService($http, user) {

    // Setup user object for UserService

    console.log("USER OBJECT from values == ", user);


    /**
     * User Items
     */
    return {

        setUser: setUser

    };


    /**
     *
     * Get Name : User Helper
     *
     * @returns {user|{}}
     */
    function setUser(userToken) {

        //alert(userToken + " - " + user);

        console.log("SET user object on login && token create");


    }


}


/**
 *
 * User Directive : Top Bar
 *
 * @returns {{replace: boolean, restrict: string, template: string, link: link}}
 *
 */
function userMenuTopBar($window, $location) {

    return {
        replace: true,
        restrict: 'AE',
        //scope: {
        //    logout: '='
        //},

        templateUrl: './site/components/user/templates/user-menu-top-bar.html',

        link: function (scope, elem, attrs) {

            // Logout User
            //scope.logout = function () {
            //
            //    console.log("LOGGED OUT");
            //
            //    // Delete JWT token
            //    localStorage.removeItem('aat-auth-token');
            //
            //    // Check to see if token
            //    console.log(localStorage.getItem('aat-auth-token'));
            //
            //    // Redirect
            //    $location.path("/frontend");
            //
            //};

        }
    }

}
