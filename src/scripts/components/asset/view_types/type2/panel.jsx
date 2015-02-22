
var React = require('react');

var AttributesFactory = require('../../attributesFactory');

var Panel = React.createClass({
    render: function() {
        var attrs = this.props.data.attributes.map(function(attr) {
            return AttributesFactory.getViewAttribute(attr.datatype, attr);
        });
        return (
            <div className="grid__item one-half">
                <div className="asset-data">
                    <div className="asset-data__header">
                        <span className="asset-data__title">{this.props.title}</span>
                    </div>
                    <div className="asset-data__content">
                        {attrs}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Panel;