'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var RaisedButton = mui.RaisedButton;
var Checkbox = mui.Checkbox;

var UserApi = require('./../../common/utils/UserApi');

var Login = React.createClass({
    propTypes: {
        changePage: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <Paper zDepth={3} rounded={false} className="login">
                    <div>
                        <h1>Log In</h1>
                        <br/>
                        <Input ref="email" type="text" name="email" placeholder="Email" description="Your account email address."/>
                        <Input ref="password" type="password" name="password" placeholder="Password" description="Your account password."/>
                        <div className="form-checkbox mui-input">
                            <Checkbox ref="remember" name="remember"/>
                            <span for="remember">Remember me</span>
                        </div>
                        <RaisedButton ref="login" label="Log in" primary={true} onClick={this._onLoginButtonClick}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <RaisedButton label="Google+" primary={false} onClick={this._onGoogleButtonClick}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <RaisedButton ref="signup" label="Sign up" onClick={this._onSignupButtonClick}/>
                    </div>
                </Paper>
            </div>
        );
    },
    _onLoginButtonClick: function () {
        UserApi.login(this.refs.email.getValue(), this.refs.password.getValue(), this.refs.remember.state.checked);
    },
    _onGoogleButtonClick: function () {
        window.location = '/users/auth/google_oauth2';
    },
    _onSignupButtonClick: function () {
        this.props.changePage('signup');
    }
});

module.exports = Login;