class AddBuyerToOrder < ActiveRecord::Migration
  def change
    add_reference :orders, :buyer, references: :users, index: true
    add_foreign_key :orders, :users, column: 'buyer_id'
  end
end
