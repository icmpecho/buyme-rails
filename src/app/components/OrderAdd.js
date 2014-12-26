'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Input = mui.Input;
var Checkbox = mui.Checkbox;
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
var MyOrderStore = require('../stores/MyOrderStore');
var OrderActions = require('../actions/OrderActions');
var ItemStore = require('../stores/ItemStore');
var ItemActions = require('../actions/ItemActions');
var _ = require('underscore');

var OrderAdd = React.createClass({
    getInitialState: function () {
        return {
            stores: [],
            items: []
        };
    },
    componentWillMount: function () {
        StoreActions.getStores();
        ItemActions.getItems();
    },
    componentDidMount: function () {
        StoreStore.addChangeListener(this._onStoreStoreChange);
        MyOrderStore.addChangeListener(this._onMyOrderStoreChange);
        ItemStore.addChangeListener(this._onItemStoreChange);
    },

    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onStoreStoreChange);
        MyOrderStore.removeChangeListener(this._onMyOrderStoreChange);
        ItemStore.removeChangeListener(this._onItemStoreChange);
    },
    render: function () {
        var itemList = !!this.state.items && this.state.items.length > 0 ? <DropDownMenu ref="itemList" menuItems={this.state.items} onChange={this._onItemListChange}/> : undefined;
        return (
            <Paper zDepth={3} rounded={false} className="order-add">
                <div>
                    <div className="half">
                        <Input ref="itemName" type="text" name="itemName" placeholder="Item Name" description="Enter item name." onChange={this._onItemNameChange}/>
                        <Input ref="quantity" type="text" name="quantity" placeholder="Quantity" description="Enter quantity." defaultValue="1"/>
                    </div>
                    <div className="half">
                        {itemList}
                        <h5>Select Stores</h5>
                        {this.state.stores.map(function (store) {
                            return <label key={'store-' + store.id}>
                                <Checkbox ref={'store-' + store.id} name={'store-' + store.id} value={'store-' + store.id}/>{store.name}</label>;
                        })}
                    </div>
                    <br/>
                    <div className="clearfix"></div>
                    <RaisedButton label="Confirm" secondary={true} onClick={this._addOrder}/>
                </div>
            </Paper>
        );
    },
    _onItemNameChange: _.debounce(function (e, value) {
        this.setState({
            items: []
        });
        ItemActions.getItems(value);
    }, 1000),
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
            this.refs.quantity.setValue('1');
            for (var ref in this.refs) {
                if (ref.indexOf('store-') === 0 && this.refs[ref].state.checked) {
                    this.refs[ref].check();
                }
            }
            this.setState({
                items: []
            });
            ItemActions.getItems();
        }
    },
    _onItemStoreChange: function () {
        var items = [];
        ItemStore.getItems().map(function (item) {
            items.push({
                payload: item.id,
                text: item.name
            })
        });
        this.setState({
            items: items
        });
        if (items.length > 0) {
            this.refs.itemList._onControlClick();
        }
    },
    _onItemListChange: function (e, selectedIndex, menuItem) {
        this.refs.itemName.setValue(menuItem.text);
    }
});

module.exports = OrderAdd;