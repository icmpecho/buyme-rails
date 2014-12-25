'use strict';

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var User = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        attemptedTransition: null
    },
    componentDidMount: function () {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        UserStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div className="user">
                User Page
                <RaisedButton label="Login" primary={true} onClick={this._onLoginButtonClick}/>
            </div>
        );
    },
    _onLoginButtonClick: function () {
        UserActions.login();
    },
    _onChange: function () {
        if (!!UserStore.getUser() && User.attemptedTransition) {
            var transition = User.attemptedTransition;
            User.attemptedTransition = null;
            transition.retry();
        }
    }
});

module.exports = User;