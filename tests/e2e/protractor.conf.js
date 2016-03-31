/**
 *
 * A suite of tests to run on multi browsers at once.
 *
 * @version : protractor ~2.1.0
 *
 * @author : Mark Rushton <mark@modernfidelity.co.uk>
 *
 */

var Pack = require('../../package');

exports.config = {

  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // Test URL (@see package.json)
  baseUrl: Pack.testserver,

  // Timeouts
  allScriptsTimeout: 11000,

  jasmineNodeOpts: {
    onComplete: function() {
    },
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
  },

  // Specs
  specs: [
    '*.js'
  ],

  // BROWSERS

  // As Seperates ::

  //// PhantomJS (Headless)
  //capabilities: {
  //    'browserName': 'phantomjs',
  //    //Can be used to specify the phantomjs binary path.
  //    //This can generally be ommitted if you installed phantomjs globally.
  //    'phantomjs.binary.path': require('phantomjs').path,
  //    'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
  //},
  //
  //
  //// Chrome
  //capabilities: {
  //    'browserName': 'chrome'
  //},
  //
  //capabilities: {
  //    'browserName': 'firefox'
  //},

  // Multiple Browser tests
  multiCapabilities: [
    {
      'browserName': 'chrome',
      'chromeOptions': {
        args: ['--disable-extensions']
      }
    },
    //{
    //    'browserName': 'firefox'
    //},
    {
      'browserName': 'phantomjs',
      'phantomjs.binary.path': require('phantomjs').path,
      'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
    }

  ],

  // Testing framework (same as unit)
  framework: 'jasmine',

  // Default testing user logins
  params: {
    login: {
      user: 'admin',
      password: 'admin'
    }
  }


};
