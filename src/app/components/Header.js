'use strict';

var React = require('react');
var mui = require('material-ui');
var Icon = mui.Icon;
var Menu = require('./Menu');

var Header = React.createClass({
    propTypes: {
        onMenuIconButtonClick: React.PropTypes.func,
        title: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="header">
                <Icon icon="navigation-menu" onClick={this.props.onMenuIconButtonClick}/>
                Buy Me
            </div>
        );
    }
});

module.exports = Header;