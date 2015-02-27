/**
 * @jsx React.DOM
 */

var React = require('react');
var TextAttribute = React.createClass({
	getInitialState: function() { 
		return { isChecked: this.props.params.value ? true : false }; 
	},
    valueChanged: function(event) {
    	this.props.params.value = event.target.value;        
    },
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="input-txt input-txt_size_small">
                    <textarea onChange={this.valueChanged} defaultValue={this.props.params.value} />
                </label>
            </div>
        );
    }
});

module.exports = TextAttribute;