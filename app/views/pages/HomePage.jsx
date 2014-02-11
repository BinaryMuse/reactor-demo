/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');
var BodyLayout = require('../layouts/Body');

module.exports = ReactAsync.createClass({

  getInitialStateAsync: function(cb) {
    superagent
      .get('http://localhost:3111/api/item')
      .end(function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  render: function() {
    return (
      <BodyLayout>
        <h2>Home Page</h2>
        <Stage item={this.state.item} />
        <Form />

        <a href="/other">Go to other page</a>
      </BodyLayout>
    );
  }
});