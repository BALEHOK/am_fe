/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var urlParams = this.context.router.getCurrentParams();
        var file = this.props.params.value;
        if(file.length > 14) {
            file = file.slice(0, 8) + "..." + file.slice(-3);
        }

        var component = () => {
            if (this.props.params.data) {
                var format = this.props.params.dataFormat || 'png';
                var src = `data:image/${format};base64,${this.props.params.data}`;
                return <div className="image-wrapper__img">
                            <img src={src} alt={this.props.params.name} />
                        </div>;
            } else {
                var src = BASE_URL + `/FileHandler.ashx?assetTypeId=${urlParams.assetTypeId}&assetId=${urlParams.assetId}&attributeId=${this.props.params.id}`;
                return <a className="image-wrapper__img" href={src}>
                            <img src={src + '&w=165&h=95&mode=crop'} alt={this.props.params.name} />
                        </a>;
            }
        };
        
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <div className="image-wrapper">
                    <div className="image-wrapper__subwrapper">
                        {component()}
                    </div>
                    <div className="image-wrapper__name">{file}</div>
                </div>
            </div>
        );
    }
});

module.exports = Attribute;