/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap').Input;

var EditableAttribute = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            value: this.props.params.value
        };
    },
    validationState: function() {  
        return 'warning';      
        //var length = this.state.value.length;
        //if (length > 10) return 'success';
        //else if (length > 5) return 'warning';
        //else if (length > 0) return 'error';
    },
    valueChanged: function(event) {
        var value = event.target.value;
        this.props.actions.validateAttribute({
            attributeId: this.props.params.id,
            value: value
        });
        this.setState({
            value: value
        });
        this.props.params.value = value;
    },
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="input-txt input-txt_size_small">
                    <Input 
                        type="text"
                        className="input-txt__field"
                        value={this.state.value}
                        bsStyle="error"
                        hasFeedback
                        label="Something wrong"
                        onChange={this.valueChanged} />
                </label>
            </div>
        );
    }
});

module.exports = EditableAttribute;