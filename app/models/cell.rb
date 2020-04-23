class Cell < ApplicationRecord
  default_scope { order(x_position: :asc) }

  def color
    return self.alive? ? '#FFFFFF' : '#383838'
  end

  def self.create_cells
    array = (1..200).map(&:to_i)

    array.each do |y|
      array.each { |x| self.create(x_position: x, y_position: y) }
    end
  end
end
