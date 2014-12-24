require 'rails_helper'

RSpec.describe "orders/show", :type => :view do
  before(:each) do
    @order = assign(:order, Order.create!(
      :item => nil,
      :user => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(//)
  end
end
