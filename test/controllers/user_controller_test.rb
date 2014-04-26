require 'test_helper'

class UserControllerTest < ActionController::TestCase
  test "should get welcome" do
    get :welcome
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get register" do
    get :register
    assert_response :success
  end

end
