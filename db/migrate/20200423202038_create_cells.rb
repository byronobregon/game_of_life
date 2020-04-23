class CreateCells < ActiveRecord::Migration[5.2]
  def change
    create_table :cells do |t|
      t.integer :x_position
      t.integer :y_position
      t.boolean :alive, default: false

      t.timestamps
    end
  end
end
