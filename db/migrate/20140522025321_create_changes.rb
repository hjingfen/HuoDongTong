class CreateChanges < ActiveRecord::Migration
  def change
    create_table :changes do |t|
      add_column :bidding_details,:status,:string
      t.timestamps
    end
  end
end
