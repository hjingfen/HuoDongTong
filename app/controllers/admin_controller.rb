class AdminController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def welcome
    @name = User.find(session[:user_id]).name
    @users = User.where(:admin => nil).paginate(page: params[:page],:per_page => 10)
  end

  def new_user
    @name = User.find(session[:user_id]).name
  end

  def add_user
    user = User.find_by(:name => params['name'])
    if user.present?
      flash[:registed_error] = '该账号已注册！'
      redirect_to  :action => :new_user
    else
      user = User.create(params.permit(:name, :password, :question, :answer))
      session[:user_id] = user.id
      redirect_to :controller => :session, :action => :index
    end
  end
end
