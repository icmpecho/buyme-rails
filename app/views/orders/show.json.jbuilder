json.extract! @order, :id, :item_id, :user_id, :completed, :created_at, :updated_at
json.item_name @order.item.name
json.user_email @order.user.email
json.stores @order.stores do |store|
    json.id store.id
    json.name store.name
end
