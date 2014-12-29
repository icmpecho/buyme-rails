class Item < ActiveRecord::Base
  has_many :orders

  scope :top, -> {
    select('items.*, count(orders.id) AS orders_count').
    joins(:orders).
    group('items.id').
    order('orders_count DESC')
  }

  def self.suggest(name)
    where("LOWER(name) LIKE ?", '%' + name.downcase + '%').top.limit(5)
  end

end
