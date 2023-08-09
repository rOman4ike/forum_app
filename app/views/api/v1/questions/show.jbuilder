json.id @question.id
json.title @question.title
json.content @question.content
json.created_at @question.created_at
json.viewed @question.viewed_questions.length

json.user do
  json.name @question.user.name
  json.id @question.user_id
end
