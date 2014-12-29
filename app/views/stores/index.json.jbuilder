json.array!(@stores) do |store|
  json.extract! store, :id, :name
  json.pending store.orders.pendings.count
  json.url store_url(store, format: :json)
end
