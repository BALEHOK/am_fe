/**
 * @jsx React.DOM
 */

var React = require('react');

var ValidationResult = React.createClass({
    render: function() {
        var attributes = this.props.selectedScreen.panels
            .reduce((acc, el) => acc.concat(el.attributes), []);

        var messages = [];
        this.props.validation
            .filter(el => !el.isValid)
            .forEach((v, i) => {
                var message = messages[v.message] || { attributes: [] };
                var attribute = attributes.filter(a => a.id == v.id)[0];
                if (attribute)
                    message.attributes.push(attribute.name);
                else {
                    message.attributes.push(v.id); // some server-side attribute?
                }
                messages[v.message] = message;
            });

        var items = _.chain(messages)
            .keys()
            .map((k, i) => {
               var message = k + ': ' + messages[k].attributes.join(', ');
               return  <li key={i}>{message}</li>;
            })
            .value();

        return (
            <ul className="validation-summary">
                {items}
            </ul>
        );
    }
});

module.exports = ValidationResult;
