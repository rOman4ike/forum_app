require "test_helper"

class ViewedQuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: viewed_questions
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  question_id :integer          not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_viewed_questions_on_question_id  (question_id)
#  index_viewed_questions_on_user_id      (user_id)
#
# Foreign Keys
#
#  question_id  (question_id => questions.id)
#  user_id      (user_id => users.id)
#
