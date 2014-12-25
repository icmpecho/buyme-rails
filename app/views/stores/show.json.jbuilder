json.extract! @store, :id, :name, :created_at, :updated_at
json.orders @orders do |order|
    json.item_id order.item.id
    json.user_id order.user.id
    json.created_at order.created_at
end
