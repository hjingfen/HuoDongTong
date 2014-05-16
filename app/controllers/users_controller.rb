class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index

  end

  def welcome
    @name = User.find(session[:user_id]).name
  end

  def new

  end

  def create
    user = User.find_by(:name => params['name'])
    if user.present?
      flash[:registed_error] = '该账号已注册！'
      redirect_to :action => :new
    else
      user = User.create(params.permit(:name, :password, :question, :answer))
      session[:user_id] = user.id
      redirect_to :action => :welcome
    end
  end

  def phone_login
    user = User.find_by(:name => params['user_name'], :password => params['password'])
    if user.present?
      session[:user_id] = user.id
      render :text => 'true'
    else
      render :text => 'false'
    end
  end

  def user_index
    session[:a] = params[:page] ? params[:page].to_i : 1
    @admin_name = User.find(session[:user_id]).name
  end

  def bidding_list
    @admin_name = User.find(session[:user_id]).name
  end

  def sign_up_list
    @admin_name = User.find(session[:user_id]).name
  end

  def bidding_detail
    @admin_name = User.find(session[:user_id]).name
  end

  def price_statistics
    @admin_name = User.find(session[:user_id]).name
  end
end
