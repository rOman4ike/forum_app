class SpaController < ApplicationController
  include AvailableAbilities

  def index
    @params = {
      abilities: available_abilities
    }
  end
end
