class AddExpireAtToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :expire_at, :datetime
  end
end
