json.extract! order, :id, :status, :item_id, :user_id, :buyer_id, :created_at, :completed, :canceled_at, :expire_at, :updated_at
json.item_name order.item.name
json.user_name order.user.name
json.user_email order.user.email
if order.buyer
  json.buyer_name order.buyer.name
  json.buyer_email order.buyer.email
end
json.stores order.stores do |store|
  json.id store.id
  json.name store.name
end

json.url order_url(order, format: :json)
