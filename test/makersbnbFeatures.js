'use strict';

const Browser = require('zombie');
var expect = require('chai').expect;
var app = require('../app/app');
var mongoose = require('mongoose');
var http = require('http');

Browser.localhost('example.com', 3001);

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);    
    browser.visit('/users/new', done);
  });

  describe('Signing up form', function () {
    
    before(function(done) {
      browser
        .fill('username', 'Chris')
        .fill('email', 'chris@hacc.com')
        .fill('password', 'hello123')
        .fill('passwordConfirmation', 'hello123')
        .pressButton('Sign Me Up!', done);
    });

    it('should see welcome page', function() {
      expect(browser.html('body')).to.contain('Welcome, Chris!');
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase();    
    this.server.close(done);
  });

});
