require 'rails_helper'

RSpec.describe "orders/edit", :type => :view do
  before(:each) do
    @order = assign(:order, Order.create!(
      :item => nil,
      :user => nil
    ))
  end

  it "renders the edit order form" do
    render

    assert_select "form[action=?][method=?]", order_path(@order), "post" do

      assert_select "input#order_item_id[name=?]", "order[item_id]"

      assert_select "input#order_user_id[name=?]", "order[user_id]"
    end
  end
end