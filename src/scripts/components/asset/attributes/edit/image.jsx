/**
 * @jsx React.DOM
 */

var React = require('react');
var FileEditAttribute = require('./file.jsx');

var ImageEditAttribute = React.createClass({

    render: function() {
        return (
            <FileEditAttribute actions={this.props.actions} params={this.props.params}>
                <img src={this.props.params.value} />
            </FileEditAttribute>
        );
    }
});

module.exports = ImageEditAttribute;
