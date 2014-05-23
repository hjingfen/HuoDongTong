class Activity < ActiveRecord::Base
  def self.update_activities(activities)
    activities.each do |key,value|
      Activity.delete_all(:user_name => value[:user_name])
    end
    activities.each do |key,value|
      @activities = Activity.create(:user_name => value[:user_name],:activity_name => value[:activity_name],:sign_up_counts => value[:counts],:bidding_counts => value[:bid_counts])
    end
  end
end
