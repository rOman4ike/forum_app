# frozen_string_literal: true

class Ability
  include CanCan::Ability
  # :read, :create, :update, :destroy, :manage
  def initialize(user)
    return unless user

    if user.unconfirmed_user?
      can :read, User
    end

    if user.user?
      can :read, User
    end

    if user.tech_support?
      can :manage, User
    end

    if user.moderator?
      can :manage, User
    end

    if user.admin?
      can :manage, User
    end
  end

  def as_json(options = {})
    rules.map do |rule| {
      base_behavior: rule.base_behavior,
      actions: rule.actions.as_json,
      subjects: rule.subjects.map(&:to_s),
      conditions: rule.conditions.as_json
    }
    end
  end
end
