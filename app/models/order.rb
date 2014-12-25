class Order < ActiveRecord::Base
  belongs_to :item
  belongs_to :user
  belongs_to :buyer, :class_name => 'User', :foreign_key => 'buyer_id'
  has_and_belongs_to_many :stores

  # Class methods
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

  def self.pendings
    self.where( completed: nil )
  end

  def self.by_user( user )
    self.where( user_id: user.id )
  end

  # Instance methods
  def fullfill!
    if not fullfilled?
      self.completed = Time.zone.now
      self.save
    end
  end

  def fullfilled?
    self.completed != nil
  end
end
