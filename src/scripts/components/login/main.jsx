/**
 * @jsx React.DOM
 */

var React = require('react');

var LoginPage = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    events : {
        'click button' : 'submit'
    },
    submit : function(e){
        e.preventDefault();
        var login = this.refs.login.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();
        console.log(login, password);
        //this.props.model.login();
    },
    render: function() {
        return (
            <form className="form-horizontal">
                <div className="control-group">
                    <label className="control-label" htmlFor="login">Login</label>
                    <div className="controls">
                        <input type="text" id="login" ref="login" placeholder="Login" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="password">Password</label>
                    <div className="controls">
                        <input type="password" id="password" ref="password" placeholder="Password" />
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <button type="submit" className="btn" onClick={this.submit}>Sign in</button>
                    </div>
                </div>
            </form>
        );
    }
});
module.exports = LoginPage;