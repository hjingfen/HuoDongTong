class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :question
      t.string :answer
      t.string :type

      t.timestamps
    end
  end
end
