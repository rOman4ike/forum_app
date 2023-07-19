# frozen_string_literal: true

class Ability
  include CanCan::Ability
  # :read, :create, :update, :destroy, :manage
  def initialize(user)
    return unless user

    if user.unconfirmed_user?
      can :read, User
      can :read, Question
    end

    if user.user?
      can :read, User
      can :read, Question
    end

    if user.tech_support?
      can :manage, User
      can :manage, Question
    end

    if user.moderator?
      can :manage, User
      can :manage, Question
    end

    if user.admin?
      can :manage, User
      can :manage, Question
    end
  end
end
