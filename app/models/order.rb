class Order < ActiveRecord::Base
  belongs_to :item
  belongs_to :user
  has_and_belongs_to_many :stores

  def self.place( args )
    user = args[:user]
    item = args[:item]
    stores = args[:stores]

    order = self.new( user_id: user.id, item_id: item.id)

    stores.each do |store|
      order.stores << store
    end

    order.save ? order : nil

  end

end
