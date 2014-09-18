/**
 * @jsx React.DOM
 */

var React = require('react'),
    Hello = require('../common/hello');

var $ = require('../../libs/jquery/dist/jquery');

$(function(){

    console.log("Backbone modules initialized");
});

var Page = React.createClass({

    render: function() {

        return (
            <div>
                <Hello messageText="Index Page" />
            </div>
        );

    }

});

module.exports = Page;
