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

var ToastStore = require('../stores/ToastStore');
var ToastActions = require('../actions/ToastActions');


var App = React.createClass({
    getInitialState: function () {
        return {
            showToast: false,
            toastType: '',
            toastMessage: ''
        };
    },
    componentDidMount: function () {
        ToastStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ToastStore.removeChangeListener(this._onChange);
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
    },
    _onChange: function () {
        if (ToastStore.getToastCount() > 0) {
            this.setState({
                showToast: true,
                toastType: ToastStore.getToastType(),
                toastMessage: ToastStore.getToastMessage()
            });
            setTimeout(function () {
                ToastActions.hideToast();
            }.bind(this), 2000);
        }
        else {
            this.setState({
                showToast: false,
                toastType: '',
                toastMessage: ''
            });
        }
    }
});

module.exports = App;