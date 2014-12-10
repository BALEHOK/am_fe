/**
 * @jsx React.DOM
 */

var React = require('react');

var Screen = React.createClass({     
    render: function() {        
        var self = this;
        return (
            <div>
               <h3>Screen name: {this.props.name}</h3>
               <ul>
                    {this.props.children}                    
               </ul>
            </div>
        );
    }
});
module.exports = Screen;