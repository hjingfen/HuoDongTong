class CreateBiddingCounts < ActiveRecord::Migration
  def change
    create_table :bidding_counts do |t|
      t.string :user_name
      t.string :activity_name
      t.string :bid_name
      t.string :price
      t.string :count

      t.timestamps
    end
  end
end
