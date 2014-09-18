/**
 * @jsx React.DOM
 */

var React = require('react'),
    Hello = require('../common/hello');

var Page = React.createClass({

    render: function() {

        return (
            <div>
                <Hello messageText="Another Page" />
            </div>
        );

    }

});

module.exports = Page;
