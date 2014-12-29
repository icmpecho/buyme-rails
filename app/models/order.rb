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
    expire_at = args[:expire_at]

    raise ArgumentError unless user.class == User
    raise ArgumentError unless item.class == Item
    raise ArgumentError unless stores.class == Array
    if expire_at
      raise ArgumentError unless expire_at.to_datetime
    end

    order = self.new( user_id: user.id, item_id: item.id, expire_at: expire_at )

    stores.each do |store|
      order.stores << store
    end

    order.save ? order : nil

  end

  def self.pendings
    self.where( completed: nil ).where( canceled_at: nil ).where( "expire_at > ? or expire_at is null", Time.zone.now )
  end

  def self.completed
    self.where( "completed is not null or canceled_at is not null or expire_at < ?", Time.zone.now )
  end

  def self.by_user( user )
    self.where( user_id: user.id )
  end

  def self.expired
    self.where( "expire_at < ?", Time.zone.now )
  end

  # Instance methods
  def fullfill!( user )
    if not fullfilled?
      self.completed = Time.zone.now
      self.buyer_id  = user.id
      self.save
    end
  end

  def fullfilled?
    self.completed != nil
  end

  def cancel!
    self.canceled_at = Time.zone.now
    self.save
  end

  def status
    if completed
      :completed
    elsif canceled_at
      :canceled
    else
      :active
    end
  end

end
