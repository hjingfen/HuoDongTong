class AdminController < ApplicationController
  def welcome
    @name = User.find(session[:user_id]).name
    #@users = User.where(:admin => nil)
    @users = User.where(:admin => nil).paginate(page: params[:page],:per_page => 10)
    @count = @users.length/10+1
  end
end
