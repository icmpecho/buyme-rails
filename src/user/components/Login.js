'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var RaisedButton = mui.RaisedButton;
var Checkbox = mui.Checkbox;

var Login = React.createClass({
    propTypes: {
        changePage: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <Paper zDepth={5} rounded={false} className="login">
                    <div>
                        <h1>Log In</h1>
                        <br/>
                        <Input ref="email" type="text" name="email" placeholder="Email" description="Your account email address."/>
                        <Input ref="password" type="password" name="password" placeholder="Password" description="Your account password."/>
                        <label for="remember">Remember me</label>
                        <Checkbox name="remember"/>
                        <RaisedButton ref="login" label="Log in" primary={true} onClick={this._onLoginButtonClick}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <RaisedButton ref="signup" label="Sign up" onClick={this._onSignupButtonClick}/>
                    </div>
                </Paper>
            </div>
        );
    },
    _onLoginButtonClick: function () {
    },
    _onSignupButtonClick: function () {
        this.props.changePage('signup');
    }
});

module.exports = Login;