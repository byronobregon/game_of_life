require 'test_helper'

class CellsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cells_index_url
    assert_response :success
  end

end
