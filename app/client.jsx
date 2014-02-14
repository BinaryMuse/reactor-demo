/**
 * @jsx React.DOM
 */

var React          = require('react');
var ReactAsync     = require('react-async');
var ReactMount     = require('react/lib/ReactMount');
var ReactBatching  = require('react-raf-batching').inject();
var Router         = require('./mixins/Router');
var Navigator      = require('./mixins/Navigator');
var PageController = require('./mixins/PageController');
var HTMLLayout     = require('./views/layouts/HTML');

var App = ReactAsync.createClass({

  mixins: [Navigator],

  getInitialStateAsync: function(cb) {
    var page = Router.getPage(this.props.path);
    PageController.setState(page, this.props, cb);
  },

  onNavigate: function(path) {
    this.props.path = path;
    this.componentDidMount();
  },

  render: function() {
    var component = Router.getPage(this.state.path).component;

    return (
      <HTMLLayout title={this.state.title} onClick={this.navigatorOnClick}>
        {component({ data: this.state.data })}
      </HTMLLayout>
    );
  }

});

ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    ReactAsync.renderComponent(App(), document);
  }
}
