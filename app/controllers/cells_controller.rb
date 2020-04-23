class CellsController < ApplicationController
  def index
    @cells = Cell.all.group_by(&:y_position).sort.to_h
  end

  def save_state
    Cell.save_state(params[:cells])
  end
end
