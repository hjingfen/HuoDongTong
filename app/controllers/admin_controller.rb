class AdminController < ApplicationController
  def welcome
    @name = User.find(session[:user_id]).name
    user = User.where(:admin => nil)
    @users = user.all
    #@users = user.paginate(page:10)
  end
end
