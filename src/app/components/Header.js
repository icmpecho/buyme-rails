'use strict';

var React = require('react');
var mui = require('material-ui');
var IconButton = mui.IconButton;
var Menu = require('./Menu');

var Header = React.createClass({
    propTypes: {
        onMenuIconButtonClick: React.PropTypes.func,
        title: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="header mui-app-bar">
                <div className="mui-paper-container">
                    <IconButton className="mui-app-bar-navigation-icon-button mui-icon-button mui-enhanced-button" icon="navigation-menu" onClick={this.props.onMenuIconButtonClick}/>
                    <h1 className="mui-app-bar-title">Buy Me</h1>
                </div>
            </div>
        );
    }
});

module.exports = Header;