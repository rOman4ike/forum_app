class Question < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true

  paginates_per 2

  def self.ransackable_attributes(auth_object = nil)
    ["title"]
  end
end

# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  content    :text
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_questions_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
