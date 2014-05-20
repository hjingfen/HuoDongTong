class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index

  end

  def synchronize
    Activity.delete_all(:user_name => params[:user])
    params[:activities].each do |key,value|
      @activities = Activity.create(:user_name => params[:user],:activity_name => value[:activity_name])
    end
    render :text => 'ok'
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
      redirect_to :action => :user_index
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
    @user_name = User.find(session[:user_id]).name
    @activities = Activity.where(:user_name => @user_name).paginate(page: params[:page],:per_page => 10)
  end

  def bidding_list
    @user_name = User.find(session[:user_id]).name
  end

  def sign_up_list
    @user_name = User.find(session[:user_id]).name
  end

  def bidding_detail
    @user_name = User.find(session[:user_id]).name
  end

  def price_statistics
    @user_name = User.find(session[:user_id]).name
  end
end
