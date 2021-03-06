'use strict';

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Icon = mui.Icon;
var LeftNav = mui.LeftNav;

var AppStore = require('../../app/stores/AppStore');
var AppActions = require('../../app/actions/AppActions');

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
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
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
        for (var index = this.props.menuItems.length - 1; index >= 0; index--) {
            currentItem = this.props.menuItems[index];
            if (currentItem.route && this.isActive(currentItem.route)) {
                return parseInt(index);
            }
        }
    },
    _onLeftNavChange: function (e, key, payload) {
        this.props.changeTitle(payload.text);
        this.transitionTo(payload.route);
        AppActions.closeAddDialog();
    },
    _onHeaderClick: function () {
        this.props.changeTitle();
        this.transitionTo('home');
        this.refs.leftNav.close();
        AppActions.closeAddDialog();
    },
    _onChange: function () {
        var state = AppStore.getState();
        if (!!state) {
            this.props.changeTitle(state.title);
            this.transitionTo(state.name, state.params);
            AppActions.closeAddDialog();
        }
    }
});

module.exports = Menu;