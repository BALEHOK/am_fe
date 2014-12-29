/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var file = this.props.params.value;
        if(file.length > 40) {
            file = file.slice(0, 30) + "..." + file.slice(-7);
        }
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <div className="image-wrapper">
                    <div className="image-wrapper__subwrapper">
                        <div className="image-wrapper__img">
                            <img src={this.props.params.value} alt={this.props.params.name} />
                        </div>
                    </div>
                    <div className="image-wrapper__name">{file}</div>
                </div>
            </div>
        );
    }
});

module.exports = Attribute;