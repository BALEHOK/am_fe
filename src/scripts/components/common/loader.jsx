var React = require('react');

var Loader = React.createClass({

  render() {
    if(this.props.loading === true) {
      return (
        <div>
          <div className="loader"></div>
          <div className="loader-children">
            <div className="loader-children--overlay"></div>
            <div className="loader-children--content">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    } else {
      return this.props.children || null;
    }
  }

});

module.exports = Loader;