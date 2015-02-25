/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../common/react-selectize');
var AttributesFactory = require('../attributesFactory');

var Panel = React.createClass({
    render: function() {
        var attrs = this.props.data.attributes.map(function(attr) {
           return AttributesFactory.getEditAttribute(attr.datatype, attr);
        });
        return (
                <div className="asset-data asset-data_aside_true">
                    <div className="asset-data__header">
                        <span className="asset-data__title">{this.props.title}</span>
                    </div>
                    <div className="asset-data__content">
                        <form className="asset-data__form">
                            {attrs}
                            <div className="asset-data__aside">
                                <p>Document file:</p>
                                <button className="btn btn_type_second btn_size_small">
                                    Attach document
                                    <input type="file" name=" " className="input-file"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
});

module.exports = Panel;