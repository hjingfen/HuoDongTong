class SignUpList < ActiveRecord::Base
  def self.update_sign_up_list(user,sign_up_list)
    SignUpList.delete_all(:user_name => user)
    sign_up_list.each do |key,value|
      value[:applicants].each do |k,val|
        SignUpList.create(:user_name => user,:activity_name => value[:activity_name],:name => val[:name],:phone => val[:phone])
      end
    end
  end
end
