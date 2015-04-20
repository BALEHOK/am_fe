/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var cx = require('classnames');

var ListPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onChange: function(values) {
        this.props.params.value = _.pluck(values, 'uid').join(',');
    },

    render: function() {      
        var items = [];
        var value = this.props.params.value.split(',');
        var attributeUid = this.props.params.uid;
        var selectId = "attribute-dynlist-" + attributeUid;
        var listStore = this.state.stores.list.dynlists[attributeUid];
        if (listStore) {
            items = listStore.items || [];
        }

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