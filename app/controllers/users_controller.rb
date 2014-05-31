class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

  before_action :prepare_header_data, :only => [:bidding_list, :sign_up_list, :provide_head_data]

  before_action :provide_head_data, :only => [:price_statistics, :bidding_detail]

  def index

  end

  def synchronize
    Activity.update_activities(params[:activities])
    BiddingList.update_bidding_list(params[:bid_list])
    SignUpList.update_sign_up_list(params[:sign_up_list])
    BiddingDetail.update_bidding_detail(params[:bid_detail])
    BiddingCount.update_bidding_count(params[:bid_detail])
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
    @current_page = params[:page] ? params[:page].to_i-1 : 0
    if params[:admin_name].present?
      @user_name = '管理员'+params[:admin_name]+',用户'+params[:user_name]
      session[:user_id] = User.find_by(:name => params[:user_name]).id
      @activities = Activity.where(:user_name => params[:user_name]).paginate(page: params[:page],:per_page => 10)
      @current_user = params[:user_name]
    elsif params[:admin_user].present?
      @user = User.find(session[:user_id]).name
      @user_name = params[:admin_user]
      @activities = Activity.where(:user_name => @user).paginate(page: params[:page],:per_page => 10)
      @current_user = User.find(session[:user_id]).name
    else
      @user_name = User.find(session[:user_id]).name
      @activities = Activity.where(:user_name => @user_name).paginate(page: params[:page],:per_page => 10)
      @current_user = User.find(session[:user_id]).name
    end
    @show = BiddingList.exists?(:status => 'start')
  end

  def bidding_list
    @bid_lists = BiddingList.where(:activity_name => params[:activity_name],:user_name => @user.name).paginate(page: params[:page],:per_page => 10)
  end

  def sign_up_list
    @sign_up_lists = SignUpList.where(:activity_name => params[:activity_name],:user_name => @user.name).paginate(page: params[:page],:per_page => 10)
  end

  def bidding_detail
    @bid_details = BiddingDetail.where(:activity_name => params[:activity_name],:user_name => @user.name,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
  end

  def price_statistics
    @bidding_counts = BiddingCount.where(:activity_name => params[:activity_name],:user_name => @user.name, :bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
  end

  def show
    bidding_activity = BiddingList.find_by(:status => 'start',:user_name => params[:user_name])
    flash[:bidding] = flash[:result] = flash[:winner] = flash[:no_winner] = nil
    if bidding_activity.present?
      session[:current_activity_name] = bidding_activity[:activity_name]
      session[:current_bid_name] = bidding_activity[:bid_name]
      flash[:bidding] = true
      @activity_name = bidding_activity.activity_name
      @sign_up_count = bidding_activity.sign_up_counts
      @bidding_count = bidding_activity.bidding_counts
      bidding_details = BiddingDetail.where(:activity_name => @activity_name,:user_name => bidding_activity[:user_name],:bid_name => bidding_activity[:bid_name])
      @bidding_details = bidding_details.reverse().take(10)
    else
      flash[:result] = true
      @activity_name = session[:current_activity_name]
      price = BiddingCount.find_by(:activity_name => session[:current_activity_name],:user_name => params[:user_name],:bid_name => session[:current_bid_name],:count => 1)
      if price.present?
        flash[:winner] = true
        @winner = BiddingDetail.find_by(:price => price.price)
      else
        flash[:no_winner] = true
      end
    end
  end

  private

  def provide_head_data
    @current_page = params[:page] ? params[:page].to_i-1 : 0
    @user = User.find(session[:user_id])
    @user_name = params[:admin_user]
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
    price = BiddingCount.find_by(:activity_name => params[:activity_name],:user_name => @user.name,:bid_name => params[:bid_name],:count => 1)
    bid = BiddingList.find_by(:activity_name => params[:activity_name],:user_name => @user.name,:bid_name => params[:bid_name])
    flash[:winner] = flash[:no_winner] = flash[:no_end] = nil
    if bid[:status] == 'end'
      if price.present?
        flash[:winner] = true
        @winner = BiddingDetail.find_by(:price => price.price)
      else
        flash[:no_winner] = true
      end
    else
      flash[:no_end] = true
    end

  end

  def prepare_header_data
    @current_page = params[:page] ? params[:page].to_i-1 : 0
    @user = User.find(session[:user_id])
    @user_name = params[:admin_user]
    @activity_name = params[:activity_name]
  end

end

