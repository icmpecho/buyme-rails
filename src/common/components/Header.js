'use strict';

var React = require('react');
var mui = require('material-ui');
var IconButton = mui.IconButton;
var Menu = require('./Menu');
var UserApi = require('../utils/UserApi');
var AppActions = require('../../app/actions/AppActions');

var Header = React.createClass({
    propTypes: {
        onMenuIconButtonClick: React.PropTypes.func,
        title: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            title: 'Buy Me'
        };
    },
    render: function () {
        var addButton = !!this.props.showButtons ? <IconButton className="mui-icon-button mui-enhanced-button" icon="action-add-shopping-cart" onClick={this._onAddButtonClick}/> : undefined;
        var logoutButton = !!this.props.showButtons ? <IconButton className="mui-icon-button mui-enhanced-button" icon="action-input" onClick={this._onLogoutButtonClick}/> : undefined;
        var menuStyle = {
            visibility: !!this.props.showButtons ? 'visible' : 'hidden'
        };
        return (
            <div className="header mui-app-bar">
                <div className="mui-paper-container">
                    <IconButton style={menuStyle} className="mui-app-bar-navigation-icon-button mui-icon-button mui-enhanced-button" icon="navigation-menu" onClick={this.props.onMenuIconButtonClick}/>
                    <h1 className="mui-app-bar-title">{this.props.title}</h1>
                    <span className="mui-right">
                       {addButton}
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        {logoutButton}
                    </span>
                </div>
            </div>
        );
    },
    _onAddButtonClick: function () {
        AppActions.openAddDialog();
    },
    _onLogoutButtonClick: function () {
        UserApi.logout();
    }
});

module.exports = Header;