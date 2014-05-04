class AdminController < ApplicationController
  def welcome
    @name = User.find(session[:user_id]).name
    @users = User.where(:admin => nil).paginate(page: params[:page],:per_page => 10)
  end
end
