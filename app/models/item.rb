class Item < ActiveRecord::Base

  def self.suggest(name)
    where("LOWER(name) LIKE ?", '%' + name.downcase + '%')
  end

end
