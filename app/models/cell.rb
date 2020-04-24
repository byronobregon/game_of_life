class Cell < ApplicationRecord
  default_scope { order(x_position: :asc) }

  def color
    return self.alive? ? '#FFFFFF' : '#383838'
  end

  def self.save_state(cells)
    Cell.reset_field
    Cell.where(id: cells).update_all alive: true
  end

  def self.create_cells
    y_array = (1..70).map(&:to_i)
    x_array = (1..100).map(&:to_i)

    y_array.each do |y|
      x_array.each { |x| self.create(x_position: x, y_position: y) }
    end
  end

  def self.reset_field
    Cell.update_all alive: false
  end
end
