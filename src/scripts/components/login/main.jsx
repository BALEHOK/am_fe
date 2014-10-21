/**
 * @jsx React.DOM
 */

var React = require('react');

var LoginPage = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    getInitialState: function() {
        return {errorMessage: ''};
    },
    events : {
        'click button' : 'submit'
    },
    submit : function(e){
        e.preventDefault();
        var login = this.refs.login.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();
        var self = this;
        this.props.session.login({
            username: login,
            password: password
        }, 
        null,
        function(data){
            self.setState({errorMessage: data.responseJSON.error_description});
        });
    },
    render: function() {
        return (
            <form className="form-horizontal">
                {this.state.errorMessage}
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