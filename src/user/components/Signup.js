'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var RaisedButton = mui.RaisedButton;
var Checkbox = mui.Checkbox;

var UserApi = require('./../../common/utils/UserApi');

var Signup = React.createClass({
    propTypes: {
        changePage: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <Paper zDepth={3} rounded={false} className="signup">
                    <div>
                        <h1>Sign Up</h1>
                        <br/>
                        <Input ref="email" type="text" name="email" placeholder="Email" description="Enter your email address."/>
                        <Input ref="password" type="password" name="password" placeholder="Password" description="Enter a password with 8 characters minimum."/>
                        <Input ref="confirmation" type="password" name="confirmation" placeholder="Password confirmation" description="Enter the confirmation password."/>
                        <RaisedButton ref="signup" label="Sign up" primary={true} onClick={this._onSignupButtonClick}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <RaisedButton ref="login" label="Log in" onClick={this._onLoginButtonClick}/>
                    </div>
                </Paper>
            </div>
        );
    },
    _onSignupButtonClick: function () {
        UserApi.signup(this.refs.email.getValue(), this.refs.password.getValue(), this.refs.confirmation.getValue());
    },
    _onLoginButtonClick: function () {
        this.props.changePage('login');
    }
});

module.exports = Signup;