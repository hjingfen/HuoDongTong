class BiddingDetail < ActiveRecord::Base
  def self.update_bidding_detail(bid_detail)
    if bid_detail.present?
      bid_detail.each do |key,value|
        BiddingDetail.delete_all(:user_name => value[:user_name])
      end
      bid_detail.each do |key,value|
        if value[:bid_applicants].present?
          value[:bid_applicants].each do |k,val|
            BiddingDetail.create(:user_name => value[:user_name],:activity_name => value[:activity_name],:bid_name => value[:name],:status => value[:status],:name => val[:name],:phone => val[:phone],:price => val[:price])
          end
        end
      end
    end
  end
end
