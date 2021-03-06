# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140528055203) do

  create_table "activities", force: true do |t|
    t.string   "user_name"
    t.string   "activity_name"
    t.string   "sign_up_counts"
    t.string   "bidding_counts"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "add_status_in_bidding_lists", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bidding_counts", force: true do |t|
    t.string   "user_name"
    t.string   "activity_name"
    t.string   "bid_name"
    t.string   "price"
    t.string   "count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bidding_details", force: true do |t|
    t.string   "user_name"
    t.string   "activity_name"
    t.string   "bid_name"
    t.string   "name"
    t.string   "phone"
    t.string   "price"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
  end

  create_table "bidding_lists", force: true do |t|
    t.string   "user_name"
    t.string   "activity_name"
    t.string   "bid_name"
    t.string   "sign_up_counts"
    t.string   "bidding_counts"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
  end

  create_table "changes", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sign_up_lists", force: true do |t|
    t.string   "user_name"
    t.string   "activity_name"
    t.string   "name"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password"
    t.string   "question"
    t.string   "answer"
    t.string   "admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
