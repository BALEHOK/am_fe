/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var ListPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, ValidationMixin],
    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },
    componentWillUnmount: function() {
    },   
    onChange: function(items) {
        // TODO: save value
    },
    render: function() {      
        var items = [];
        var value = null;
        var attributeUid = this.props.params.uid;
        var selectId = "attribute-asset-" + attributeUid;
        var listStore = this.state.stores.list.dynlists[attributeUid];
        if (listStore) {
            items = listStore.items || [];
        }

        var cx = React.addons.classSet;
        var classes = cx('asset-data__param', 'has-' + this.state.validationState);

        return (
           <div className={classes}>
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="uid"
                    labelField="value" 
                    items={items} 
                    onChange={this.onChange}    
                    value={value}                             
                    placeholder=" "
                    label=" "
                    className="select_size_small" /> 
            </div>
        );
    }
});

module.exports = ListPicker;