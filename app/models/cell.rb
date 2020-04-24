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
    array = (1..200).map(&:to_i)

    array.each do |y|
      array.each { |x| self.create(x_position: x, y_position: y) }
    end
  end

  def self.reset_field
    Cell.update_all alive: false
  end
end
