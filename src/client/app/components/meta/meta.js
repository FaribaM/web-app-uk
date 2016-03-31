/**
 *
 * Meta Module
 *
 * @file Handles page meta data content i.e. MetaTags, PageTitles, OpenGraph, Twitter Cards etc...
 *
 */

'use strict';


angular.module('meta', [])


  // Define services
  .service('MetaDataService', MetaDataService)


// Define Injectables
MetaDataService.$inject = [];


/**
 *
 * PageTitle Service
 */
function MetaDataService() {

  var title = 'AAT';
  var metaDescription = '';
  var metaKeywords = '';


  console.log(title);

  return {

    // Page Title
    pageTitle: function() {
      return title;
    },
    setPageTitle: function(newTitle) {
      title = newTitle;
    },


    //
    metaDescription: function() {
      return metaDescription;
    },
    metaKeywords: function() {
      return metaKeywords;
    },
    reset: function() {
      metaDescription = '';
      metaKeywords = '';
    },
    setMetaDescription: function(newMetaDescription) {
      metaDescription = newMetaDescription;
    },
    appendMetaKeywords: function(newKeywords) {
      for (var key in newKeywords) {
        if (metaKeywords === '') {
          metaKeywords += newKeywords[key].name;
        } else {
          metaKeywords += ', ' + newKeywords[key].name;
        }
      }
    }
  };


}
