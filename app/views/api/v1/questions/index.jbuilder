json.current_page @questions.current_page
json.total_pages @questions.total_pages

json.questions do |questionsElement|
  questionsElement.array!(@questions) do |question|
    json.id question.id
    json.title question.title
    json.name question.user.name
  end
end
