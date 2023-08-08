class User < ApplicationRecord
  ROLES = %i(
    unconfirmed_user
    user
    tech_support
    moderator
    admin
  )

  has_many :questions
  has_many :viewed_questions

  validates :email, presence: true, uniqueness: true

  has_secure_password
  has_secure_token :activation_token, length: 36

  def self.roles
    ROLES.map(&:to_s)
  end

  ROLES.each do |role|
    define_method "#{role}?" do
      role.to_s == self.role
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    ["name"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["questions", "viewed_questions"]
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
