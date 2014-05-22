class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index

  end

  def synchronize
    Activity.update_activities(params[:user],params[:activities])
    BiddingList.update_bidding_list(params[:user],params[:bid_list])
    SignUpList.update_sign_up_list(params[:user],params[:sign_up_list])
    BiddingDetail.update_bidding_detail(params[:user],params[:bid_detail])
    BiddingCount.update_bidding_count(params[:user],params[:bid_detail])
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
    @activity_name = params[:activity_name]
    @bid_lists = BiddingList.where(:activity_name => params[:activity_name],:user_name => @user_name).paginate(page: params[:page],:per_page => 10)
  end

  def sign_up_list
    @user_name = User.find(session[:user_id]).name
    @activity_name = params[:activity_name]
    @sign_up_lists = SignUpList.where(:activity_name => params[:activity_name],:user_name => @user_name).paginate(page: params[:page],:per_page => 10)
  end

  def bidding_detail
    @user_name = User.find(session[:user_id]).name
    @bid_details = BiddingDetail.where(:activity_name => params[:activity_name],:user_name => @user_name,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
  end

  def price_statistics
    @user_name = User.find(session[:user_id]).name
    @bidding_counts = BiddingCount.where(:activity_name => params[:activity_name],:user_name => @user_name,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
  end
end
