namespace :user do

  desc "Destroy unconfirmed_user"
  task destroy_unconfirmed_user: :environment do
    User.all
      .where(role: 'unconfirmed_user')
      .select { |u| u.created_at.to_time + 1.hour < Time.zone.now }
      .each(&:destroy)
    puts 'Destroy unconfirmed_user complete!'
  end
end
