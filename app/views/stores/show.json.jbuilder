json.extract! @store, :id, :name, :created_at, :updated_at
json.orders @store.orders.pendings do |order|
    json.partial! 'orders/order', order: order
end