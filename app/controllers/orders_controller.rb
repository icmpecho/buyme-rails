class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy, :buy, :cancel]
  before_action :authenticate_user!, except: [:index]
  respond_to :html

  def index
    @orders = Order.all.order("updated_at")
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
    raise ActionController::RoutingError.new('Not Found') if params[ :item_name ].empty?
    item = Item.find_or_create_by( name: params[ :item_name ].downcase )
    count = params[ :count ].to_i || 1
    expire_at = params[ :expire_at ]
    store_ids = params[ :store_ids ]
    stores = []
    store_ids.each do |store_id|
      stores << Store.find( store_id )
    end
    @orders = []
    count.times do
      @orders << Order.place( user: current_user, item: item, stores: stores, expire_at: expire_at )
    end
    respond_with(@orders, template: 'orders/index')
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
    respond_with(@order, template: 'orders/show')
  end

  def cancel
    @order.cancel!
    respond_with(@order, template: 'orders/show')
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
