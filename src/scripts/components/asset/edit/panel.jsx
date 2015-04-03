/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../common/react-selectize');
var AttributesFactory = require('../attributesFactory');

var Panel = React.createClass({
    render: function() {
        var actions = this.props.actions;
        var attrs = this.props.data.attributes.map((attr) => {
           return AttributesFactory.getEditAttribute(attr.datatype, attr, actions, this.props.dispatcher);
        });
        return (
                <div className="asset-data asset-data_aside_true">
                    <div className="asset-data__header">
                        <span className="asset-data__title">{this.props.title}</span>
                    </div>
                    <div className="asset-data__content">
                        <form className="asset-data__form">
                            {attrs}
                            {/*
                            <div className="asset-data__aside">
                                <p>Barcode:</p>
                                <img src="assets/images/barcode.png"/>
                                <label className="input-txt input-txt_width_full input-txt_size_small">
                                    <input type="text" className="input-txt__field" />
                                </label>
                                <p>Document:</p>
                                <button className="btn btn_type_second btn_size_small">
                                    Attach document
                                    <input type="file" name=" " className="input-file"/>
                                </button>
                            </div>
                            */}
                        </form>
                    </div>
                </div>
        );
    }
});

module.exports = Panel;