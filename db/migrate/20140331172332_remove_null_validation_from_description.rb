class RemoveNullValidationFromDescription < ActiveRecord::Migration
  def change
    remove_column :locations, :description
    add_column :locations, :description, :string
    add_column :locations, :country, :string
    add_column :locations, :major, :string
  end
end
