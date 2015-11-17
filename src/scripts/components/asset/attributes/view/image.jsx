/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var FileUrlProvider = require('../../../../services/file_url_provider');

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var params = this.props.params;
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
                var src = FileUrlProvider.getImageUrl(this.props.params.value);
                return <a className="image-wrapper__img" href={src}>
                            <img src={src} alt={this.props.params.name} />
                        </a>;
            }
        };

        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    <div className="image-wrapper">
                        <div className="image-wrapper__subwrapper">
                            {component()}
                        </div>
                        <div className="image-wrapper__name">{file}</div>
                    </div>
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
