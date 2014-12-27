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
            toastType: 'toast-success',
            toastMessage: ''
        };
    },
    render: function () {
        var page = this.state.page === 'login' ? <Login changePage={this.changePage}/> : <Signup changePage={this.changePage}/>;
        var toastIcon = <Icon icon="navigation-close" style={{color: 'white'}}/>;
        return (
            <div>
                <Header showButtons={false}/>
                <div className="content clearfix">
                    <div className="user">{page}</div>
                </div>
                <Footer />
                <Toast open={this.state.showToast} message={this.state.toastMessage} action={toastIcon} className={this.state.toastType}/>
            </div>
        );
    },
    changePage: function (page) {
        this.setState({
            page: page
        });
    }
});

module.exports = User;