class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    session[:user_id] = user.id
    if user && user.admin == 'admin'
      redirect_to :controller => :admin, :action => :welcome
    elsif user
      redirect_to :controller => :users, :action => :welcome
    else
      flash[:signin_error]='用户名不存在或密码错误！'
      redirect_to :action => :index
    end
  end

  def signout
    session[:user_name] = nil
    redirect_to :action => :index
  end

end
