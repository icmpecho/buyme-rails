class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :item, index: true
      t.references :user, index: true
      t.datetime :completed

      t.timestamps null: false
    end
    add_foreign_key :orders, :items
    add_foreign_key :orders, :users
  end
end
