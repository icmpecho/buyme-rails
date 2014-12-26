'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var Checkbox = mui.Checkbox;
var RaisedButton = mui.RaisedButton;

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
var MyOrderStore = require('../stores/MyOrderStore');
var OrderActions = require('../actions/OrderActions');

var OrderAdd = React.createClass({
    getInitialState: function () {
        return {
            stores: []
        };
    },
    componentWillMount: function () {
        StoreActions.getStores();
    },
    componentDidMount: function () {
        StoreStore.addChangeListener(this._onStoreStoreChange);
        MyOrderStore.addChangeListener(this._onMyOrderStoreChange);
    },

    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onStoreStoreChange);
        MyOrderStore.addChangeListener(this._onMyOrderStoreChange);
    },
    render: function () {
        return (
            <Paper zDepth={3} rounded={false} className="order-add">
                <div>
                    <div className="half">
                        <Input ref="itemName" type="text" name="itemName" placeholder="Item Name" description="Enter item name."/>
                        <Input ref="quantity" type="text" name="quantity" placeholder="Quantity" description="Enter quantity." defaultValue="1"/>
                    </div>
                    <div className="half">
                        <h5>Select Stores</h5>
                        {this.state.stores.map(function (store) {
                            return <div className="form-checkbox" key={'store-' + store.id}>
                                <Checkbox ref={'store-' + store.id} name={'store-' + store.id} value={'store-' + store.id}/>{store.name}</div>;
                        })}
                    </div>
                    <br/>
                    <div className="clearfix"></div>
                        <RaisedButton label="Confirm" secondary={true} onClick={this._addOrder}/>
                </div>
            </Paper>
        );
    },
    _addOrder: function () {
        var itemName = this.refs.itemName.getValue();
        if (!itemName) {
            alert('Enter item name.');
            return;
        }
        var quantity = this.refs.quantity.getValue();
        if (isNaN(quantity)) {
            alert('Enter quantity.');
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
        OrderActions.addMyOrders(itemName, quantity, storeIds);
    },
    _onStoreStoreChange: function () {
        this.setState({
            stores: StoreStore.getStores()
        });
    },
    _onMyOrderStoreChange: function () {
        if (!!MyOrderStore.hasOrderAdded()) {
            setTimeout(function () {
                OrderActions.readMyAddedOrder();
            }, 1000);
            this.refs.itemName.setValue('');
            this.refs.quantity.setValue('');
            for (var ref in this.refs) {
                if (ref.indexOf('store-') === 0 && this.refs[ref].state.checked) {
                    this.refs[ref].check();
                }
            }
        }
    }
});

module.exports = OrderAdd;