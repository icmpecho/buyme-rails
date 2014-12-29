'use strict';

var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var mui = require('material-ui');
var Toast = mui.Toast;
var Icon = mui.Icon;

var Header = require('./../../common/components/Header');
var Footer = require('./../../common/components/Footer');
var Login = require('./Login');
var Signup = require('./Signup');

var User = React.createClass({
    getInitialState: function () {
        return {
            page: 'login',
            showToast: false,
            toastMessage: '',
            toastCount: 0
        };
    },
    render: function () {
        var page = this.state.page === 'login' ? <Login changePage={this.changePage} showToast={this.showToast}/> : <Signup changePage={this.changePage} showToast={this.showToast}/>;
        var toastIcon = <Icon icon="navigation-close" style={{color: 'white'}}/>;
        return (
            <div>
                <Header showButtons={false}/>
                <div className="content clearfix">
                    <div className="user">{page}</div>
                </div>
                <Footer />
                <Toast open={this.state.showToast} message={this.state.toastMessage} action={toastIcon} className="toast toast-error"/>
            </div>
        );
    },
    changePage: function (page) {
        this.setState({
            page: page
        });
    },
    showToast: function (message) {
        this.setState({
            showToast: true,
            toastMessage: message,
            toastCount: this.state.toastCount + 1
        });
        setTimeout(function () {
            if (this.state.toastCount === 1) {
                this.setState({
                    showToast: false,
                    toastMessage: '',
                    toastCount: 0
                });
            }
            else if (this.state.toastCount > 1) {
                this.setState({
                    toastCount: this.state.toastCount - 1
                });
            }
        }.bind(this), 2000);
    }
});

module.exports = User;