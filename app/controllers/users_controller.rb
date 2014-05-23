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
    else
      @user = User.find(session[:user_id]).name
      @user_name = params[:admin_user]
      #@user_name = User.find(session[:user_id]).name
      @activities = Activity.where(:user_name => @user).paginate(page: params[:page],:per_page => 10)
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
    bid = BiddingDetail.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name])
    flash[:winner] = flash[:no_winner] = flash[:no_end] = nil
    if bid.present?
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
    else
      flash[:no_end] = true
    end
  end

  def price_statistics
    @user = User.find(session[:user_id]).name
    @user_name = params[:admin_user]
    @bidding_counts = BiddingCount.where(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name]).paginate(page: params[:page],:per_page => 10)
    @activity_name = params[:activity_name]
    @bid_name = params[:bid_name]
    price = BiddingCount.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name],:count => 1)
    bid = BiddingDetail.find_by(:activity_name => params[:activity_name],:user_name => @user,:bid_name => params[:bid_name])
    flash[:winner] = flash[:no_winner] = flash[:no_end] = nil
    if bid.present?
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
    else
      flash[:no_end] = true
    end
  end
end
