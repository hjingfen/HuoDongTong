class ModifyTable < ActiveRecord::Migration
  def change
    rename_column :users, :type ,:admin
  end
end
