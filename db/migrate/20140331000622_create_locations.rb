class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :user_id, :null => false
      t.integer :year, :null => false
      t.string :name, :null => false
      t.string :email
      t.boolean :privacy
      t.string :description, :null => false
      t.string :city
      t.string :state
      t.string :job
      t.decimal :lat, :precision => 15, :scale => 10
      t.decimal :lng, :precision => 15, :scale => 10
      t.timestamps
    end
  end
end
