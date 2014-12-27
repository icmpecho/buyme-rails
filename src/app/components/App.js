'use strict';

var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var Toast = mui.Toast;
var Icon = mui.Icon;

var Header = require('./../../common/components/Header');
var Menu = require('./../../common/components/Menu');
var Footer = require('./../../common/components/Footer');
var Home = require('./Home');

var App = React.createClass({
    getInitialState: function () {
        return {
            showToast: false,
            toastType: 'toast-success',
            toastMessage: ''
        };
    },
    render: function () {
        var menuItems = [
            {route: 'me', text: 'Me'},
            {route: 'shop', text: 'Shop'}
        ];
        var toastIcon = <Icon icon="navigation-close" style={{color: 'white'}}/>;
        return (
            <div>
                <Header ref="header" onMenuIconButtonClick={this._onMenuIconButtonClick} title={this.state.title} showButtons={true}/>
                <Menu ref="leftNav" menuItems={menuItems} changeTitle={this.changeTitle}/>
                <div className="content clearfix">
                    <RouteHandler />
                </div>
                <Footer />
                <Toast open={this.state.showToast} message={this.state.toastMessage} action={toastIcon} className={this.state.toastType}/>
            </div>
        );
    },
    _onMenuIconButtonClick: function () {
        this.refs.leftNav.toggle();
    },
    changeTitle: function (title) {
        this.setState({
            title: title
        });
    }
});

module.exports = App;