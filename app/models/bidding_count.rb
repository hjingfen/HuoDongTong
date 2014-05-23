class BiddingCount < ActiveRecord::Base
  def self.update_bidding_count(bid_detail)
    if bid_detail.present?
      bid_detail.each do |key,value|
        BiddingCount.delete_all(:user_name => value[:user_name])
      end
      bid_detail.each do |key,value|
        if value[:price].present?
          value[:price].each do |k,val|
            BiddingCount.create(:user_name => value[:user_name],:activity_name => value[:activity_name],:bid_name => value[:name],:count => val[:count],:price => val[:price])
          end
        end
      end
    end
  end
end
