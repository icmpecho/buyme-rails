require 'rails_helper'

RSpec.describe Item, :type => :model do
  describe 'new' do
    it "should have a working constructor" do
      # setup
      coke = Item.new(name: 'coke')
      # expect
      expect(coke).to be_valid
    end
  end

  describe 'suggestion' do
    it 'should suggest item with partial matching name' do
      # setup
      oishi = Item.create(name: 'oishi green tea')
      coke = Item.create(name: 'coke')
      matcha = Item.create(name: 'green tea flappe')

      # act
      items = Item.suggest('green tea')

      # expect
      expect(items.count).to eq 2
    end
  end

  describe 'top' do
    before :each do
      @seven  = Store.create( name: '7-11' )
      @family = Store.create( name: 'family mart' )
      @fai    = User.create( email: 'fai@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
      @ping   = User.create( email: 'ping@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
    end
    it 'should return items order by number of orders' do
      # setup
      coke = Item.create(name: 'coke')
      pepsi = Item.create(name: 'pepsi')
      order1 = Order.place( user: @fai, item: coke, stores: [ @seven, @family ] )
      order2 = Order.place( user: @fai, item: pepsi, stores: [ @seven, @family ] )
      order3 = Order.place( user: @fai, item: pepsi, stores: [ @seven, @family ] )
      expect( Item.first ).to eq coke
      expect( Item.top.first ).to eq pepsi
    end
  end

end
