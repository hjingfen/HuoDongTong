class UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token

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
    session[:a] = params[:page] ? params[:page].to_i : 1
    if params[:admin_name].present?
      @user_name = '管理员'+params[:admin_name]+',用户'+params[:user_name]
      session[:user_id] = User.find_by(:name => params[:user_name]).id
      @activities = Activity.where(:user_name => params[:user_name]).paginate(page: params[:page],:per_page => 10)
    elsif params[:admin_user].present?
      @user = User.find(session[:user_id]).name
      @user_name = params[:admin_user]
      @activities = Activity.where(:user_name => @user).paginate(page: params[:page],:per_page => 10)
    else
      @user_name = User.find(session[:user_id]).name
      @activities = Activity.where(:user_name => @user_name).paginate(page: params[:page],:per_page => 10)
    end
  end

  def bidding_list
    @user = User.find(session[:user_id]).name
    @user_name = params[:admin_user]
    @activity_name = params[:activity_name]
    @bid_lists = BiddingList.where(:activity_name => params[:activity_name],:user_name => @user).paginate(page: params[:page],:per_page => 10)
  end

  def sign_up_list
    @user = User.find(session[:user_id]).name
    @user_name = params[:admin_user]
    @activity_name = params[:activity_name]
    @sign_up_lists = SignUpList.where(:activity_name => params[:activity_name],:user_name => @user).paginate(page: params[:page],:per_page => 10)
  end

  def bidding_detail
    @user = User.find(session[:user_id]).name
    @user_name = params[:admin_user]
    @bid_details = BiddingDetail.where(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
    price = BiddingCount.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name],:count => 1)
    bid = BiddingList.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name])
    flash[:winner] = flash[:no_winner] = nil
    if bid[:status] == 'end'
      if price.present?
        flash[:winner] = true
        @winner = BiddingDetail.find_by(:price => price.price)
      else
        flash[:no_winner] = true
      end
    else
      redirect_to :action => :show
    end
  end

  def price_statistics
    @user = User.find(session[:user_id]).name
    @user_name = params[:admin_user]
    @bidding_counts = BiddingCount.where(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
    price = BiddingCount.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name],:count => 1)
    flash[:winner] = flash[:no_winner] = nil
    if price.present?
      flash[:winner] = true
      @winner = BiddingDetail.find_by(:price => price.price)
    else
      flash[:no_winner] = true
    end
  end

  def show
    bidding_activity = BiddingList.find_by(:status => 'start')
    if bidding_activity.present?
      @activity_name = bidding_activity.activity_name
      @sign_up_count = bidding_activity.sign_up_counts
      @bidding_count = bidding_activity.bidding_counts
      bidding_details = BiddingDetail.where(:activity_name => @activity_name,:user_name => bidding_activity[:user_name],:bid_name => bidding_activity[:bid_name])
      @bidding_details = bidding_details.reverse().take(10)
    else
      redirect_to :action => :show_none
    end
  end

  def show_none

  end

  def send_result
    session[:activity_name] = params[:activity_name]
    session[:name] = params[:name]
    session[:price] = params[:price]
    session[:phone] = params[:phone]
    redirect_to :action => :bidding_result
  end

  def bidding_result
    @activity_name = session[:activity_name]
    @name = session[:name]
    @price = session[:price]
    @phone = session[:phone]
  end

end

