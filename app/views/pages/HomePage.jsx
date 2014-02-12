/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');
var HTMLLayout = require('../layouts/HTML');
var UrlMixin   = require('../../mixins/Url');

module.exports = ReactAsync.createClass({

  mixins: [UrlMixin],

  getInitialStateAsync: function(cb) {
    superagent
      .get(this._root() + '/api/item')
      .end(function(err, res) {
        cb(err, res ? res.body : null);
      }.bind(this));
  },

  render: function() {
    return this.transferPropsTo(
      <HTMLLayout title={this.state.item.title}>
        <Stage item={this.state.item} />
        <Form />

        <a href="/other">Go to other page</a>
      </HTMLLayout>
    );
  }
});