/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var Flux = require('delorean').Flux;

var BarcodeAttribute = React.createClass({
    mixins: [ValidationMixin, Flux.mixins.storeListener],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
        this.loadBarcodeDebounce = _.debounce(this.props.actions.loadBarcode.bind(this.props.actions), 500);
    },

    valueChanged: function(event) {
        this.props.params.value = this.refs.bc.getDOMNode().value;
        this.loadBarcodeDebounce(this.props.params.value);
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    generate: function(e) {
        this.props.actions.generateBarcode({
            id: this.props.params.id,
            screenId: this.props.selectedScreen.id
        });
        e.preventDefault();
    },

    render: function() {
        var renderBarcode = () => {
            var data = this.state.stores.asset.barcodeBase64;
            if (data) {
                return <img src={`data:image/png;base64,${data}`} alt="" />
            }
            return '';
        };
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                <button className="btn btn_type_first pull-right btn_size_small"
                    onClick={this.generate}>
                    <i className="btn__icon btn__icon_history"></i>Generate
                </button>
                {renderBarcode()}
                <input
                    type="text"
                    ref="bc"
                    onChange={this.valueChanged}
                    className="input-txt__field form-control"
                    value={this.props.params.value} />
            </ControlWrapper>
        );
    }
});

module.exports = BarcodeAttribute;
