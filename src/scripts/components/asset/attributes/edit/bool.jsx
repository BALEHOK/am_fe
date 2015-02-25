/**
 * @jsx React.DOM
 */

var React = require('react');
var BooleanAttribute = React.createClass({
	getInitialState: function() { 
		return { isChecked: this.props.params.value ? true : false }; 
	},
    valueChanged: function(event) {
    	this.setState({isChecked: !this.state.isChecked});
        this.props.params.value = this.state.isChecked;
    },
    render: function() {
        return (
           <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="input-txt input-txt_size_small">
                    <input type="checkbox" onChange={this.valueChanged} checked={this.state.isChecked} />
                </label>
            </div>
        );
    }
});

module.exports = BooleanAttribute;