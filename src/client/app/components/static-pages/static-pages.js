/**
 *
 * STATIC FILES COMPONENT
 *
 * @author
 *    David Breuer <David.Breuer@aat.org.uk>
 *    Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @class App.Static-pages
 *
 * @memberof App.Static-pages
 *
 * @description Provides the static pages for the website.
 *
 */

(function() {

  'use strict';

  angular.module('project.about', ['ngRoute', 'project.api'])

    .config(['$routeProvider', '$locationProvider', '$sceProvider',
      function($routeProvider, $locationProvider, $sceProvider) {
        $sceProvider.enabled(false);
        $routeProvider.when('/about/:subpage', {
          pageTitle: 'About',
          metaDescription: 'Information about the AAT',
          templateUrl: './site/components/about/about.tpl.html',
          controller: 'AboutController',
          controllerAs: 'vm',
          access: {
            requiresLogin: false,
            roles: []
          }
        });

        $routeProvider.when('/about', {
          pageTitle: 'About',
          metaDescription: 'Information about the AAT',
          templateUrl: './site/components/about/about.tpl.html',
          controller: 'AboutController',
          controllerAs: 'vm',
          access: {
            requiresLogin: false,
            roles: []
          }
        });

      }])

    .controller('AboutController', AboutController);

  /**
   *
   * About Controller
   *
   * @constructor
   */
  function AboutController(API, $routeParams) {

    var vm = this;

    vm.link = 'This is set within the controller';
    vm.pageContent = {};
    vm.isPageLoading = true;

    API.getPageById('static', $routeParams.subpage)
      .then(function(response) {
        console.log('get it', response.data.data);
        vm.pageContent = response.data.data;
        vm.isPageLoading = false;
      }).catch(function(err) {
      vm.isPageLoading = false;
      vm.pageContent = {'error': 500};
    });
  }

})()
