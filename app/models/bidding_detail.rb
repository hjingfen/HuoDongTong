class BiddingDetail < ActiveRecord::Base
  def self.update_bidding_detail(user,bid_detail)
    BiddingDetail.delete_all(:user_name => user)
    bid_detail.each do |key,value|
      if value[:bid_applicants].present?
        value[:bid_applicants].each do |k,val|
          BiddingDetail.create(:user_name => user,:activity_name => value[:activity_name],:bid_name => value[:name],:name => val[:name],:phone => val[:phone],:price => val[:price])
        end
      end
    end
  end
end
