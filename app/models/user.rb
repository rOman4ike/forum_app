class User < ApplicationRecord
  ROLES = %i(
    unconfirmed_user
    user
    tech_support
    moderator
    admin
  )

  has_many :questions, dependent: :destroy
  has_many :viewed_questions, dependent: :destroy

  validates :email, presence: true, uniqueness: true

  has_secure_password
  has_secure_token :activation_token, length: 36

  paginates_per 2

  def self.roles
    ROLES.map(&:to_s)
  end

  ROLES.each do |role|
    define_method "#{role}?" do
      role.to_s == self.role
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    ["name", "email", "role"]
  end
end

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
