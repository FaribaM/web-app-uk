/***
 *
 *  LOGIN COMPONENT
 *
 * @file
 *  Provides login section and functionality for the site, including directives
 *
 * @todo :
 *
 *  - form error validation to return error on non successful login with messaging
 *
 */


(function() {

    'use strict';

    angular.module('project.login', ['ngRoute', 'formly', 'formlyBootstrap', 'angular-jwt', 'project.auth'])

        // Route
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $routeProvider.when('/login', {

                title: 'Login',
                templateUrl: './site/components/login/login.tpl.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                access: {
                    requiresLogin: false,
                    roles: []
                }

            });

        }])

        .service('LoginDataService', LoginDataService)

        .directive('loginDirectiveTopLinks', loginDirectiveTopLinks)

        //.controller('LoginMenuController', LoginMenuController)

        .controller('LoginController', LoginController);


    // Inject Deps
    loginDirectiveTopLinks.$inject = ['$location', 'AuthTokenService'];

    LoginDataService.$inject = ['$http', '$rootScope', 'API_URL', 'jwtHelper', '$window', 'AuthTokenService'];

    LoginController.$inject = ['LoginDataService', 'jwtHelper', '$location', '$window', 'AuthTokenService'];

    //LoginMenuController.$inject = ['AuthTokenService'];


    /**
     *
     * Login Directive : Provides the Top Bar User Login/Logout links and functionality.
     *
     * @returns {{replace: boolean, restrict: string, template: string, link: link}}
     *
     */
    function loginDirectiveTopLinks($location, AuthTokenService) {

        return {
            replace: true,
            restrict: 'AE',
            scope: {},
            //controller: function (AuthTokenService) {
            //    this.AuthTokenService = AuthTokenService;
            //    this.name = 'Pascal';
            //},
            //
            //controllerAs: 'vm',
            templateUrl: 'site/components/login/templates/login-top-bar.tpl.html',

            link: function(scope, elem, attrs) {

                // Add functionality to show & hide buttons on auth status
                scope.userStatus = AuthTokenService.authStatus;

                var tokenExists = AuthTokenService.tokenStatus();

                if (!tokenExists) {

                    scope.isAuthenticated = false;
                    console.log(scope.isAuthenticated);
                    //scope.$apply();

                } else {
                    scope.isAuthenticated = true;
                    console.log(scope.isAuthenticated);

                }

                // Popover for User Icon
                scope.userPopover = {
                    content: 'Hello',
                    templateUrl: 'site/components/login/templates/user-popover.tpl.html',
                    title: 'Title'
                };
                // Popover for Use Log In
                scope.userLogInPopover = {
                    content: 'Please Log In',
                    templateUrl: 'site/components/login/templates/user-login-popover.tpl.html',
                    title: ''
                };

                // Logout User
                scope.logout = function() {

                    console.log("LOGGED OUT");

                    scope.isAuthenticated = false;

                    // Delete JWT token
                    localStorage.removeItem('aat-auth-token');

                    // Check to see if token
                    console.log(localStorage.getItem('aat-auth-token'));

                    // Redirect
                    $location.path("/frontend");

                };

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
    function LoginController(LoginDataService, jwtHelper, $location, $window, AuthTokenService) {

        var vm = this;


        // Define form submit function
        vm.onSubmit = onSubmit;

        vm.env = {
            angularVersion: angular.version.full
            //formlyVersion: formlyVersion
        };

        vm.model = {};
        vm.options = {};

        // Check token & redirect logged in user
        var token = localStorage.getItem('aat-auth-token');

        if (token) {
            vm.authUser = jwtHelper.decodeToken(token);

            // Redirect if token i.e logged in
            $window.location = '#/dashboard';
            $window.location.reload();
        }

        // @see - http://docs.angular-formly.com/v6.4.0/docs/custom-templates
        vm.fields = [

            {
                key: 'email',
                className: 'sm-field',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Please enter your username',
                    required: true
                }
            },
            {
                key: 'password',
                type: 'input',
                className: 'sm-field',
                templateOptions: {
                    type: 'text',
                    label: 'Password',
                    placeholder: 'Please enter your password',
                    required: true
                }
            }

        ];


        /**
         *
         * Login form Submit handler w/ page redirect
         *
         */
        function onSubmit() {

            var formSubmitted = true;

            //console.log("ctrl : ", AuthTokenService);

            LoginDataService.login(vm.model.email, vm.model.password)
                .then(function success(response) {

                    AuthTokenService.authStatus = true;

                    //console.log(AuthTokenService.authStatus);

                    // Redirect if succesful login
                    $window.location.href = '#/dashboard';
                    $window.location.reload();

                });

        }


    }

    /**
     *
     * Login Data Service
     *
     * @constructor
     */
    function LoginDataService($http, $rootScope, API_URL, jwtHelper, $window, AuthTokenService) {


        return {
            login: login,
            //logout: logout, (maybe not here)
            getUser: getUser
        };

        /**
         *
         * Call API Auth endpoint and return successful token
         *
         * @param username
         * @param password
         * @returns {*}
         */
        function login(email, password) {

            //console.log(AuthTokenService);

            // Call API endpoint
            return $http.post(API_URL + '/auth', {

                email: email,
                password: password


            }).then(function success(response) {

                console.log(AuthTokenService);

                AuthTokenService.setToken(response.data);

                return response;

            });
        }


        /**
         *
         * Get the current User (@todo : maybe move to user module ?)
         *
         * @returns {*}
         */
        function getUser() {

            if (AuthTokenService.getToken()) {

                return $http.get(API_URL + '/me');

            } else {

                return $q.reject({data: 'client has no auth token'});

            }
        }

    }

}());
