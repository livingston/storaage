var MochaSauce = require("../node_modules/mocha-sauce/index.js");

// configure
var sauce = new MochaSauce({
    name: "storaage",
    username: 'storaage',
    host: "localhost",
    port: 4445,
    url: "http://localhost:4000/test/index.html",
    build: process.env.TRAVIS_JOB_ID
});

// setup what browsers to test with
sauce.browser({ browserName: "chrome", platform: "Windows 7" });
sauce.browser({ browserName: "firefox", platform: "Windows 7" });

sauce.on('init', function(browser) {
  console.log('  init : %s %s', browser.browserName, browser.platform);
});

sauce.on('start', function(browser) {
  console.log('  start : %s %s', browser.browserName, browser.platform);
});

sauce.on('end', function(browser, res) {
  console.log('  end : %s %s : %d failures', browser.browserName, browser.platform, res.failures);
});

sauce.start();
