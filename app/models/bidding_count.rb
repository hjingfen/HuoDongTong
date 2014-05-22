class BiddingCount < ActiveRecord::Base
  def self.update_bidding_count(user,bid_detail)
    BiddingCount.delete_all(:user_name => user)
    if bid_detail.present?
      bid_detail.each do |key,value|
        if value[:price].present?
          value[:price].each do |k,val|
            BiddingCount.create(:user_name => user,:activity_name => value[:activity_name],:bid_name => value[:name],:count => val[:count],:price => val[:price])
          end
        end
      end
    end
  end
end
