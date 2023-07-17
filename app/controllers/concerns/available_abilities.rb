module AvailableAbilities
  def available_abilities
    {
      roles: roles
    }
  end

  private

  def roles
    User.roles
  end
end