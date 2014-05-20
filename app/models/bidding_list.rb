class BiddingList < ActiveRecord::Base
  def self.update_bidding_list(user,bid_list)
    BiddingList.delete_all(:user_name => user)
    bid_list.each do |key,value|
      BiddingList.create(:user_name => user,:activity_name => value[:activity_name],:bid_name => value[:name],:sign_up_counts => value[:sign_up_counts],:bidding_counts => value[:bidding_counts])
    end
  end
end
