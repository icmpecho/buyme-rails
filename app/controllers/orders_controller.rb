class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy, :buy]

  respond_to :html

  def index
    @orders = Order.all
    respond_with(@orders)
  end

  def show
    respond_with(@order)
  end

  def new
  end

  def edit
  end

  def create
    item = Item.find( params[ :item_id ] )
    store_ids = params[ :store_ids ]
    stores = []
    store_ids.each do |store_id|
      stores << Store.find( store_id )
    end
    @order = Order.place( user: current_user, item: item, stores: stores )
    respond_with(@order)
  end

  def update
    @order.update(order_params)
    respond_with(@order)
  end

  def destroy
    @order.destroy
    respond_with(@order)
  end

  def buy
    @order.fullfill!(current_user)
    respond_with(@order)
  end

  def me
    pending = params[ :pending ]
    @orders = Order.by_user(current_user)
    if pending == 'true'
      @orders = @orders.pendings
    elsif pending == 'false'
      @orders = @orders.completed
    end
    respond_with( @orders, template: 'orders/index' )
  end

  private
    def set_order
      @order = Order.find(params[:id])
    end

    def order_params
      params.require(:order).permit(:item_id, :user_id, :completed)
    end
end
