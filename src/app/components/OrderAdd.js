'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var Checkbox = mui.Checkbox;
var RaisedButton = mui.RaisedButton;

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
var OrderActions = require('../actions/OrderActions');

var OrderAdd = React.createClass({
    propTypes: {
        toggleOrderAdd: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            stores: []
        };
    },
    componentWillMount: function () {
        StoreActions.getStores();
    },
    componentDidMount: function () {
        StoreStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <Paper zDepth={3} rounded={false} className="order-add">
                <div>
                    <div className="half">
                        <Input ref="item" type="text" name="item" placeholder="Item" description="Enter item name."/>
                    </div>
                    <div className="half">
                        <h5>Select Stores</h5>
                        {this.state.stores.map(function (store) {
                            return <label>
                                <Checkbox ref={'store-' + store.id}/>{store.name}</label>;
                        })}
                    </div>
                    <br/>
                    <div className="clearfix"></div>
                    <RaisedButton label="Confirm" secondary={true} onClick={this._addOrder}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RaisedButton label="Cancel" primary={false} onClick={this.props.toggleOrderAdd}/>
                </div>
            </Paper>
        );
    },
    _addOrder: function () {
        var itemName = this.refs.item.getValue();
        if (!itemName) {
            alert('Enter item name.');
            return;
        }
        var storeIds = [];
        for (var ref in this.refs) {
            if (ref.indexOf('store-') === 0 && this.refs[ref].state.checked) {
                storeIds.push(ref.replace('store-', ''));
            }
        }
        if (storeIds.length === 0) {
            alert('Select stores.');
            return;
        }
        OrderActions.addMyOrder(undefined, itemName, storeIds);
    },
    _onChange: function () {
        this.setState({
            stores: StoreStore.getStores()
        });
    }
});

module.exports = OrderAdd;