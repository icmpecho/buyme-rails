'use strict';

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Icon = mui.Icon;
var LeftNav = mui.LeftNav;

var Menu = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State
    ],
    getInitialState: function () {
        return {
            selectedIndex: null
        };
    },
    render: function () {
        var header = <div className={"logo"} onClick={this._onHeaderClick}>Buy Me</div>;
        var menuItems = [
            {route: 'home', text: 'Home'},
            {route: 'me', text: 'Me'},
            {route: 'shop', text: 'Shop'},
            {route: 'user', text: 'User'}
        ];
        return (
            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} header={header} selectedIndex={this._getSelectedIndex} onChange={this._onLeftNavChange}/>
        );
    },
    toggle: function () {
        this.refs.leftNav.toggle();
    },
    _getSelectedIndex: function () {
        var currentItem;
        for (var index = menuItems.length - 1; index >= 0; index--) {
            currentItem = menuItems[index];
            if (currentItem.route && this.isActive(currentItem.route)) {
                return index
            }
        }
    },
    _onLeftNavChange: function (e, key, payload) {
        this.transitionTo(payload.route);
    },
    _onHeaderClick: function () {
        this.transitionTo('home');
        this.refs.leftNav.close();
    }
});

module.exports = Menu;