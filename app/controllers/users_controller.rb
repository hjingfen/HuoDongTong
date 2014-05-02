class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index

  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    if user
      session[:user_name] = user.name
      redirect_to :action => :welcome
    else
      flash[:signin_error]='账号密码有误！'
      redirect_to :action => :index
    end
  end

  def welcome
    @name = session[:user_name]
  end

  def regist

  end

  def new
    user = User.find_by(:name => params['name'])
    if user.present?
      flash[:registed_error] = '该账号已注册！'
      redirect_to :action => :regist
    else
      if params['password'] != params['confirm_password']
        flash[:not_same_error] = '两次密码不一致，请重新输入！'
        redirect_to :action => :regist
      else
        user = User.new(:name =>params['name'], :password => params['password'], :question => params['question'], :answer => params['answer'])
        session[:user_name] = params['name']
        user.save
        redirect_to :action => :welcome
      end
    end
  end

  def create

  end

  def signout
    session[:user_name] = nil
    redirect_to :action => :index
  end

end
