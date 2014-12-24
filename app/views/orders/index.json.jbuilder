json.array!(@orders) do |order|
  json.extract! order, :id, :item_id, :user_id, :completed
  json.url order_url(order, format: :json)
end
