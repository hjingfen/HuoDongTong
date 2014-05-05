class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    if user && user.admin == 'admin'
      session[:user_id] = user.id
      redirect_to :controller => :admin, :action => :welcome
    elsif user
      session[:user_id] = user.id
      redirect_to :controller => :users, :action => :welcome
    else
      flash[:signin_error]='用户名不存在或密码错误！'
      redirect_to :action => :index
    end
  end

  def signout
    session[:user_id] = nil
    redirect_to :action => :index
  end

end
