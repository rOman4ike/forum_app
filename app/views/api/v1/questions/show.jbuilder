json.id @question.id
json.title @question.title
json.content @question.content
json.created_at @question.created_at

json.user do
  json.name @question.user.name
  json.user_id @question.user_id
end
