# json.current_page @users.current_page
# json.total_pages @users.total_pages

json.viewed_questions do |viewed_questions_element|
  viewed_questions_element.array!(@viewed_questions) do |viewed_question|
    json.question_id viewed_question.question_id
    json.title viewed_question.title
  end
end
