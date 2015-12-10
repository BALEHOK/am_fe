var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var AdminPage = require('./admin');

var AdminHanlder = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Admin',

    render: function() {
        return (
            <AdminPage/>
        )
    }
});

module.exports = AdminHanlder;
