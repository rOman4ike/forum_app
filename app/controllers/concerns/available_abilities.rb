module AvailableAbilities
  def available_abilities
    {
      roles: roles,
      models_abilities: models_abilities
    }
  end

  private

  def roles
    User.roles
  end

  def models
    Rails.application.eager_load!
    ApplicationRecord.descendants.collect(&:name)
  end

  def models_abilities
    obj = {}
    models.each do |value|
      obj[value] = {
        read: can?(:read, value.constantize),
        create: can?(:create, value.constantize),
        update: can?(:update, value.constantize),
        destroy: can?(:destroy, value.constantize),
        manage: can?(:manage, value.constantize)
      }
    end
    obj
  end
end