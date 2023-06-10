# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  activation_token :string
#  email            :string
#  name             :string
#  password_digest  :string
#  role             :string           default("unconfirmed_user")
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_users_on_activation_token  (activation_token) UNIQUE
#
require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
