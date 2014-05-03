class AdminController < ApplicationController
  def welcome
    @name = User.find(session[:user_id]).name
  end
end
