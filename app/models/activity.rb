class Activity < ActiveRecord::Base
  def self.update_activities(user,activities)
    Activity.delete_all(:user_name => user)
    activities.each do |key,value|
      @activities = Activity.create(:user_name => user,:activity_name => value[:activity_name],:sign_up_counts => value[:counts],:bidding_counts => value[:bid_counts])
    end
  end
end
