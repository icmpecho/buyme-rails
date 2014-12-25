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

  it 'must has item' do
    expect { Order.place( user: @fai, item: @fai, stores: [ @seven, @family ] ) }.to raise_error
  end

  it 'can be fullfilled' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )

    Timecop.freeze( Time.zone.now ) do
        fai_order.fullfill!
        expect( fai_order.completed ).to eq Time.zone.now
    end

  end

  it 'can return only pending orders' do
    fai_order1 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order2 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order3 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )

    expect( Order.pendings.count ).to eq 3

    fai_order2.fullfill!

    expect( Order.pendings.count ).to eq 2

  end

end
