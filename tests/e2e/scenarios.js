/**
 *
 * FRONTEND E2E TEST SUITE
 *
 * @author : Mark Rushton <mark@modernfidelity.co.uk>
 *
 * This can be currently run via
 *
 *      protractor tests/e2e/protractor.conf.js
 *
 *      & remember to have a WebDriver instance running :
 *
 *      'webdriver-manager start'
 *
 * @todo :
 *  - use beforeEach // onPrepare for logged in and non logged in site areas
 *  - break this file down in smaller items ie. site sections + auth'd etc
 *
 *
 * @see :
 *
 *  - Install -> http://angular.github.io/protractor/#/
 *  - Proctactor Docs -> https://github.com/angular/protractor/blob/master/docs/toc.md
 *
 */


'use strict';


var Pack = require('../../package');

// It assumes a site is running locally on port 8000
//var webapp = "http://localhost:8080";

var webapp = Pack.testserver;

var credentials = {
  "username": "admin",
  "password": "admin"
};

var urlPrefix = "/#";


// Public + Private Areas
describe('AAT : ', function() {


  // The following blocks are not currently required but demo a login process via

  // Non Auth User
  //describe('Render Login Page ', function () {
  //
  //    it('should show a login page to anon user', function () {
  //
  //        // Tell not to check for Angular on this page
  //        browser.ignoreSynchronization = true;
  //
  //        browser.get(webapp);
  //
  //        // Check HTML Title
  //        expect(browser.getTitle()).toEqual('Admin');
  //
  //        // Check Page Title
  //        expect(element(by.id('page-title')).getText()).toEqual('Dashboard');
  //
  //    });
  //
  //});

  // Auth User
  //describe('User Login Process', function () {
  //
  //    //
  //    it('should warn on missing/malformed credentials', function () {
  //
  //
  //        // Tell not to check for Angular on this page
  //        browser.ignoreSynchronization = true;
  //
  //        browser.get(webapp);
  //
  //        browser.driver.findElement(by.id('username')).sendKeys('WRONG');
  //        browser.driver.findElement(by.id('password')).sendKeys('CREDs');
  //        browser.driver.findElement(by.id('_submit')).click();
  //
  //        expect(browser.getCurrentUrl()).not.toEqual(webapp);
  //
  //        expect(element(by.css('.alert-danger')).getText()).toEqual('Bad credentials.');
  //
  //
  //    });
  //
  //    //
  //    it('should be able to auth with test user', function () {
  //
  //        // Tell not to check for Angular on this page
  //        browser.ignoreSynchronization = true;
  //
  //        browser.get(webapp);
  //
  //        browser.driver.findElement(by.id('username')).clear();
  //        browser.driver.findElement(by.id('password')).clear();
  //
  //        // Post test user creds
  //        browser.driver.findElement(by.id('username')).sendKeys('admin');
  //        browser.driver.findElement(by.id('password')).sendKeys('admin');
  //        browser.driver.findElement(by.id('_submit')).click();
  //
  //        expect(browser.getCurrentUrl()).not.toEqual(webapp);
  //
  //    });
  //
  //});


  // Auth User
  describe('Non-Authenticated Users', function() {

    beforeEach(function() {
      ////  isAngularSite(false);
      //browser.ignoreSynchronization = true;
      //
      //browser.get(webapp);
      //
      //
      //browser.driver.findElement(by.id('username')).clear();
      //browser.driver.findElement(by.id('password')).clear();
      //
      //browser.driver.findElement(by.id('username')).clear().sendKeys(credentials['username']);
      //browser.driver.findElement(by.id('password')).clear().sendKeys(credentials['password']);
      //browser.driver.findElement(by.id('_submit')).click();
      //
      //browser.sleep( 4000 ); // Sleep to make sure page loads fully..
    });

    // Frontpage
    it('Frontpage - section renders', function() {

      // Tell not to check for Angular on this page
      browser.driver.get(webapp + urlPrefix + "/frontpage");

      browser.sleep(3000); // Sleep to make sure page loads fully..

      // Check Hero element exists
      expect(element(by.id('hero-promo')).isPresent()).toBe(false);

    });


    // About Us SECTION
    it('About Us - section renders', function() {

      // Tell not to check for Angular on this page
      browser.driver.get(webapp + urlPrefix + "/about");


      browser.sleep(3000); // Sleep to make sure page loads fully..

      // Check Page Title
      expect(element(by.id('page-title')).getText()).toEqual('About Us');


    });

    // CONTACT SECTION
    it('Contact - section renders', function() {

      // Tell not to check for Angular on this page
      browser.driver.get(webapp + urlPrefix + "/contact");


      browser.sleep(3000); // Sleep to make sure page loads fully..

      // Check Page Title
      expect(element(by.id('page-title')).getText()).toEqual('Contact');


    });


  });


});
