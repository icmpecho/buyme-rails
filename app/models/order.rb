class Order < ActiveRecord::Base
  belongs_to :item
  belongs_to :user
  has_and_belongs_to_many :stores
end
