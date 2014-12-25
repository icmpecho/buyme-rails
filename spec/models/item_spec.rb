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
end
