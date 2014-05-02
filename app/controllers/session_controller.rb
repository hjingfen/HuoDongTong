class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    
  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    if user
      session[:user_id] = user.id
      redirect_to :controller => :users, :action => :welcome
    else
      flash[:signin_error]='账号密码有误！'
      redirect_to :action => :index
    end
  end

  def signout
    session[:user_name] = nil
    redirect_to :action => :index
  end

end
