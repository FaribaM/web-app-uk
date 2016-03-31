/***
 *
 * MOBILE MENU COMPONENT
 *
 * @file
 *  Provides the mobile menu functionality for the site, including directives
 *
 */

'use strict';

angular.module('mobile-menu', [])

  // Directives
  .directive('mobileMenu', mobileMenu);

// Inject Deps
mobileMenu.$inject = [];

/**
 *
 * Mobile Meny Directive : Provides the hamburger icon and menu overlay functionality.
 *
 * @returns {{replace: boolean, restrict: string, template: string, link: link}}
 *
 */
function mobileMenu() {

  return {
    replace: true,
    restrict: 'AE',

    scope: {
      toggle: '='
    },

    templateUrl: 'site/shared/directives/mobile-menu/mobile-menu.tpl.html',

    link: function(scope, elem, attrs) {

      // Toggle Menu
      scope.toggle = false;

      scope.toggleOverlay = function() {
        scope.toggle = scope.toggle === false ? true : false;
      };


      ///**
      // *
      // *
      // */
      //MenuDataService.getMobileMenu()
      //
      //    .then(function (response) {
      //        scope.menu = response
      //    })
      //    .catch(function (error) {
      //
      //        console.log("Mobile Menu get error");
      //
      //    });
      //


    }
  }


}

/**
 *
 * Mobile Menu Controller
 *
 * @constructor
 *
 */
function MobileMenuController(MobileMenuDataService, jwtHelper, $location, $window, AuthTokenService) {

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
  //    MobileMenuDataService.login(vm.model.email, vm.model.password)
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
 * Mobile Menu Data Service
 *
 * @constructor
 */
function MobileMenuDataService($http, $rootScope, API_URL, jwtHelper, $window, AuthTokenService) {

  var endpointAPI = API_URL + "/mobile-menu";

  return {
    getMobileMenu: getMobileMenu
  };


  /**
   *
   * Get the users bookmarks
   *
   * @param uuid
   * @returns {*}
   */
  function getMobileMenu(uuid) {

    return $http.get(endpointAPI + "/" + uuid)
      .then(dataComplete)
      .catch(dataFailed);

    function dataComplete(response) {

      console.log(response.data);
      return response.data;

    }

    function dataFailed(error) {
      console.log('XHR Failed for get data .' + error);
    }
  }


}
