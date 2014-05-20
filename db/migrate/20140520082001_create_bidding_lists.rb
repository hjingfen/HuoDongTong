class CreateBiddingLists < ActiveRecord::Migration
  def change
    create_table :bidding_lists do |t|
      t.string :user_name
      t.string :activity_name
      t.string :bid_name
      t.string :sign_up_counts
      t.string :bidding_counts

      t.timestamps
    end
  end
end
