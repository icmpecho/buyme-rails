class Item < ActiveRecord::Base

  def self.suggest(name)
    where("LOWER(name) LIKE ?", '%' + name.downcase + '%').limit(5)
  end

end
