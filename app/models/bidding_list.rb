class BiddingList < ActiveRecord::Base
  def self.update_bidding_list(bid_list)
    if bid_list.present?
      bid_list.each do |key,value|
        BiddingList.delete_all(:user_name => value[:user_name])
      end
      bid_list.each do |key,value|
        BiddingList.create(:user_name => value[:user_name],:activity_name => value[:activity_name],:bid_name => value[:name],:sign_up_counts => value[:sign_up_counts],:bidding_counts => value[:bidding_counts])
      end
    end
  end
end
