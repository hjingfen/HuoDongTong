class SignUpList < ActiveRecord::Base
  def self.update_sign_up_list(sign_up_list)
    if sign_up_list.present?
      sign_up_list.each do |key,value|
        SignUpList.delete_all(:user_name => value[:user_name])
      end
      sign_up_list.each do |key,value|
        if value[:applicants].present?
          value[:applicants].each do |k,val|
            SignUpList.create(:user_name => value[:user_name],:activity_name => value[:activity_name],:name => val[:name],:phone => val[:phone])
          end
        end
      end
    end
  end
end
