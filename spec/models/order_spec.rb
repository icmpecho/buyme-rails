require 'rails_helper'

RSpec.describe Order, :type => :model do

  before :each do
    @seven = Store.create( name: '7-11' )
    @family = Store.create( name: 'family mart' )
    @coke  = Item.create( name: 'coke' )
    @fai   = User.create( email: 'fai@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
  end

  it 'has a working relationship' do

    fai_order = Order.new( item_id: @coke.id, user_id: @fai.id )
    fai_order.stores << @seven
    fai_order.stores << @family
    fai_order.save

    expect( fai_order ).to be_valid
    expect( fai_order.stores.first ).to be_valid
    expect( fai_order ).to be_persisted

    expect( fai_order.stores.count ).to eq 2
    expect( @seven.orders.first.item.name ).to eq 'coke'

  end

  it 'can be placed' do

    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )

    expect( fai_order ).to be_valid
    expect( fai_order ).to be_persisted

  end

end
