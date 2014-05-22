class SignUpList < ActiveRecord::Base
  def self.update_sign_up_list(user,sign_up_list)
    SignUpList.delete_all(:user_name => user)
    if sign_up_list.present?
      sign_up_list.each do |key,value|
        if value[:applicants].present?
          value[:applicants].each do |k,val|
            SignUpList.create(:user_name => user,:activity_name => value[:activity_name],:name => val[:name],:phone => val[:phone])
          end
        end
      end
    end
  end
end
