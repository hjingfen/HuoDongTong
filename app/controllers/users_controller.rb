class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index

  end

  def signin
    user = User.find_by(:name => params['name'], :password => params['password'])
    if user
     redirect_to :action => :welcome
    else
      flash[:signin_error]='账号密码有误！'
      redirect_to :action => :index
    end
  end

  def welcome

  end

  def regist

  end


end
