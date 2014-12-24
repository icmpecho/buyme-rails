class CreateJoinTableOrderStore < ActiveRecord::Migration
  def change
    create_join_table :orders, :stores do |t|
      # t.index [:order_id, :store_id]
      # t.index [:store_id, :order_id]
    end
  end
end
