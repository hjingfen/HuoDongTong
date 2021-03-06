class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    if user && user.admin == 'admin'
      session[:admin_id] = user.id
      redirect_to :controller => :admin, :action => :welcome
    elsif user
      session[:user_id] = user.id
      redirect_to :controller => :users, :action => :user_index
    else
      flash[:signin_error]='用户名不存在或密码错误！'
      redirect_to :action => :index
    end
  end

  def signout
    session.clear
    redirect_to :action => :index
  end

  def forgot1

  end

  def get_user_name
    user = User.find_by(:name => params['name'])
    if user
      session[:user_id] = user.id
      redirect_to :action => :forgot2
    elsif params[:name].present?
      flash[:user_name_error] = '用户名不存在！'
      redirect_to :action => :forgot1
    else
      flash[:nil_error] = '账号不能为空！'
      redirect_to :action => :forgot1

    end
  end

  def forgot2
    user = User.find_by(:id => session[:user_id])
    @question = user.question
  end

  def get_answer
    user = User.find_by(:id => session[:user_id])
    if user.answer == params[:answer]
      redirect_to :action => :forgot3
    else
      flash[:answer_error] = '忘记密码答案错误！'
      redirect_to :action => :forgot2
    end
  end

  def forgot3

  end

  def save_password
    user = User.find_by(:id => session[:user_id])
    user.password = params[:password]
    user.save
    redirect_to :controller => :users, :action => :user_index
  end
end
