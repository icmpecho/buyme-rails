json.extract! order, :id, :item_id, :user_id, :created_at, :completed
json.item_name order.item.name
json.user_name order.user.name
json.user_email order.user.email
json.stores order.stores do |store|
  json.id store.id
  json.name store.name
end

json.url order_url(order, format: :json)
