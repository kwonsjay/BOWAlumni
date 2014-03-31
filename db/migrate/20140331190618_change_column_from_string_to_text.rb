class ChangeColumnFromStringToText < ActiveRecord::Migration
  def change
    remove_column :locations, :description
    add_column :locations, :description, :text
  end
end
