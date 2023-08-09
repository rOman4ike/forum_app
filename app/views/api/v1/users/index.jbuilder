json.current_page @users.current_page
json.total_pages @users.total_pages

json.users do |questionsElement|
  questionsElement.array!(@users) do |user|
    json.id user.id
    json.name user.name
    json.role user.role
  end
end
