require 'rails_helper'

RSpec.describe Order, :type => :model do

  before :each do
    @seven  = Store.create( name: '7-11' )
    @family = Store.create( name: 'family mart' )
    @coke   = Item.create( name: 'coke' )
    @pepsi  = Item.create( name: 'pepsi' )
    @lays   = Item.create( name: 'lays' )
    @fai    = User.create( email: 'fai@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
    @ping   = User.create( email: 'ping@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
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
        fai_order.fullfill!( @ping )
        expect( fai_order.completed ).to eq Time.zone.now
        expect( fai_order.buyer.email ).to eq 'ping@abctech-thailand.com'
    end

  end

  it 'can return only pending orders' do
    fai_order1 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order2 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order3 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order4 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ], expire_at: 1.day.from_now )

    expect( Order.pendings.count ).to eq 4

    fai_order2.fullfill!( @ping )
    expect( Order.pendings.count ).to eq 3

    fai_order3.cancel!
    expect( Order.pendings.count ).to eq 2

    Timecop.freeze( 2.days.from_now ) do
      expect( Order.pendings.count ).to eq 1
    end
  end

  it 'know if item already fullfilled' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    expect( fai_order ).not_to be_fullfilled

    fai_order.fullfill!( @ping )
    expect( fai_order ).to be_fullfilled
  end

  it 'check fullfilled before mark buy' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order.fullfill!( @ping )
    completed = fai_order.completed

    expect{ fai_order.fullfill!( @ping ) }.to raise_error "This order has been bought by someone else."
    expect( fai_order.completed ).to eq completed
  end

  it 'can be filter by user' do
    fai_order1 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order2 = Order.place( user: @fai, item: @lays, stores: [ @seven, @family ] )
    ping_order1 = Order.place( user: @ping, item: @pepsi, stores: [ @seven, @family ] )

    expect( Order.by_user( @fai ).count ).to eq 2
    expect( Order.by_user( @ping ).count ).to eq 1
  end

  it 'can return only completed orders' do
    fai_order1 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order2 = Order.place( user: @fai, item: @lays, stores: [ @seven, @family ] )
    fai_order4 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ], expire_at: 1.day.from_now )
    expect( Order.completed.count ).to eq 0

    fai_order1.fullfill!( @ping )
    expect( Order.completed.count ).to eq 1

    fai_order2.cancel!
    expect( Order.completed.count ).to eq 2

    Timecop.freeze( 2.days.from_now ) do
      expect( Order.completed.count ).to eq 3
    end
  end

  it 'can be canceled' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    expect( fai_order.canceled_at ).to be_nil
    fai_order.cancel!
    expect( fai_order.canceled_at ).not_to be_nil
  end


  it 'can set expire time' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ], expire_at: 10.days.from_now )
    expect( fai_order ).not_to be_nil
  end

  it 'can return expired orders' do
    fai_order1 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order2 = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ], expire_at: 10.days.from_now )

    expect( Order.expired.count ).to eq 0

    Timecop.freeze( 11.days.from_now ) do
      expect( Order.expired.count ).to eq 1
    end
  end

  it 'can show current status' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    expect( fai_order.status ).to eq :active
    fai_order.fullfill! @ping
    expect( fai_order.status ).to eq :completed

    fai_order2 = Order.place( user: @fai, item: @lays, stores: [ @seven, @family ] )
    fai_order2.cancel!
    expect( fai_order2.status ).to eq :canceled

    fai_order3 = Order.place( user: @fai, item: @pepsi, stores: [ @seven, @family ], expire_at: Time.zone.now )
    expect( fai_order3.status ).to eq :expired
  end

  it 'can not be bought if canceled' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order.cancel!
    expect { fai_order.fullfill!( @ping) }.to raise_error "This order has been canceled."
  end

  it 'can not be canceled if bought' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ] )
    fai_order.fullfill!( @ping )
    expect { fai_order.cancel! }.to raise_error "This order has been bought by someone else."
  end

  it 'can not be bought if expired' do
    fai_order = Order.place( user: @fai, item: @coke, stores: [ @seven, @family ], expire_at: Time.zone.now )
    expect { fai_order.fullfill!( @ping) }.to raise_error "This order has been expired."
  end

end
