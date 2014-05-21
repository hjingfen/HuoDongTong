class CreateSignUpLists < ActiveRecord::Migration
  def change
    create_table :sign_up_lists do |t|
      t.string :user_name
      t.string :activity_name
      t.string :name
      t.string :phone

      t.timestamps
    end
  end
end
