'use strict';

var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var Input = mui.Input;
var Checkbox = mui.Checkbox;

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
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
        StoreStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var dialogActions = [
            {text: 'ADD', onClick: this._addOrder},
            {text: 'CANCEL'},
        ];
        return (
            <Dialog ref="dialog" title="Add Order" actions={dialogActions} className="order-add">
                <Input ref="item" type="text" name="item" placeholder="Item" description="Enter item name."/>
                <h5>Select Stores</h5>
                {this.state.stores.map(function (store) {
                    return <label>
                        <Checkbox ref={'store-' + store.id}/>{store.name}</label>;
                })}
            </Dialog>
        );
    },
    show: function () {
        this.refs.dialog.show();
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