var pattern = require('url-pattern');

module.exports = {
  _navigate: function(path, cb) {
    window.history.pushState({}, '', path);
    this.setState({ path: window.location.pathname }, cb);
  },

  _onClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this._navigate(e.target.attributes.href.value);
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
    }
  },

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  }
};