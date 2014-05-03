class AdminController < ApplicationController
  def welcome
    @name = User.find(session[:user_id]).name
    @users = User.where(:admin => nil)
    p ".........................."
    p @users
  end
end
