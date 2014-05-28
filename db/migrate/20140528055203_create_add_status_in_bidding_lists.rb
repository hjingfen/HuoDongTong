class CreateAddStatusInBiddingLists < ActiveRecord::Migration
  def change
    create_table :add_status_in_bidding_lists do |t|
      add_column :bidding_lists,:status,:string
      t.timestamps
    end
  end
end
