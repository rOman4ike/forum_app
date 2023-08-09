# Добавить потом абилки для всех search-маршрутов
# frozen_string_literal: true

class Ability
  include CanCan::Ability
  # :read, :create, :update, :destroy, :manage
  def initialize(user)
    can :read, Question

    return unless user

    if user.unconfirmed_user?
      can :read, User
    end

    if user.user?
      can :manage, User, user: user
      can :read, User

      can :create, Question
      can :read, Question
      can :manage, Question, user: user
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
