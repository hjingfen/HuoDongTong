class AdminController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def welcome
    session[:a] = params[:page] ? params[:page].to_i : 1
    if session[:admin_id].present?
      @admin_name = User.find(session[:admin_id]).name
      @users = User.where(:admin => nil).paginate(page: params[:page],:per_page => 10)
    else
      redirect_to :controller => :session, :action => :index
    end
  end

  def new_user
    @admin_name = User.find(session[:admin_id]).name
  end

  def add_user
    user = User.find_by(:name => params['name'])
    if user.present?
      flash[:registed_error] = '该账号已注册！'
      redirect_to  :action => :new_user
    else
      user = User.create(params.permit(:name, :password, :question, :answer))
      session[:user_id] = user.id
      redirect_to :action => :welcome
    end
  end

  def delete
    User.find_by_id(params[:id]).destroy
    flash[:delete_success] = '删除用户成功！'
    redirect_to :action => :welcome
  end

  def change_password
    @admin_name = User.find_by(session[:admin_id]).name
    @name = User.find_by(:id => params[:id]).name
    @user_id = params[:id]
  end

  def save_password
    user = User.find_by(:id => params[:id])
    user.password = params[:password]
    user.save
    render :text => 'ok'
  end

end
