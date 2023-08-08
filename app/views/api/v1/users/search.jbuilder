json.users do |usersElement|
  usersElement.array!(@users) do |user|
    json.id user.id
    json.name user.name
    json.email user.email
    json.role user.role
  end
end