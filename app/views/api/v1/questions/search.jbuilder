json.questions do |questionsElement|
  questionsElement.array!(@questions) do |question|
    json.id question.id
    json.title question.title
  end
end