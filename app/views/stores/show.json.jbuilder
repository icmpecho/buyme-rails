json.extract! @store, :id, :name, :created_at, :updated_at
json.orders @store.orders.pendings do |order|
    json.item_id order.item.id
    json.item_name order.item.name
    json.user_id order.user.id
    json.email order.user.email
    json.created_at order.created_at
end
