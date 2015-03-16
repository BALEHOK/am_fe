/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var file = this.props.params.value;
        if(file.length > 14) {
            file = file.slice(0, 8) + "..." + file.slice(-3);
        }
        var src = this.props.params.value;
        if (this.props.params.data) {
            var format = this.props.params.dataFormat || 'png';
            src = `data:image/${format};base64,${this.props.params.data}`;
        }
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <div className="image-wrapper">
                    <div className="image-wrapper__subwrapper">
                        <div className="image-wrapper__img">
                            <img src={src} alt={this.props.params.name} />
                        </div>
                    </div>
                    <div className="image-wrapper__name">{file}</div>
                </div>
            </div>
        );
    }
});

module.exports = Attribute;