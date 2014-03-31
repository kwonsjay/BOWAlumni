class Location < ActiveRecord::Base
  attr_accessible :user_id, :name, :description, :lat, :lng, :year, :job, :city, :state, :email, :privacy, :major, :country
  validates :user_id, :presence => true
  
  belongs_to :user
  
end
