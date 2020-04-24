class CellsController < ApplicationController
  def index
    @cells = Cell.all.group_by(&:y_position).sort.to_h
  end

  def save_state
    Cell.save_state(params[:cells])
  end

  def reset_field
    Cell.reset_field

    redirect_to root_path
  end
end
