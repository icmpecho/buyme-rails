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

end
