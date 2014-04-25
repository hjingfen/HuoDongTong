class UserController < ApplicationController
  def welcome
  end

  def login
  end

  def signup
    @user = User.new
  end
end
