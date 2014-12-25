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
    propTypes: {
        menuItems: React.PropTypes.array.isRequired,
        changeTitle: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            selectedIndex: null
        };
    },
    render: function () {
        var header = <div className={"logo"} onClick={this._onHeaderClick}>Buy Me</div>;
        return (
            <LeftNav ref="leftNav" docked={false} menuItems={this.props.menuItems} header={header} selectedIndex={this._getSelectedIndex} onChange={this._onLeftNavChange}/>
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
                return index;
            }
        }
    },
    _onLeftNavChange: function (e, key, payload) {
        this.props.changeTitle(payload.text);
        this.transitionTo(payload.route);
    },
    _onHeaderClick: function () {
        this.props.changeTitle();
        this.transitionTo('home');
        this.refs.leftNav.close();
    }
});

module.exports = Menu;