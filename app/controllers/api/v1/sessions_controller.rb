class Api::V1::SessionsController < ApplicationController
  before_action :authentication, except: [:login]
  include AvailableAbilities

  def login
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      @token = encode_user_data({ user_data: @user.id })
      log_in @user
      @abilities = available_abilities
    else
      render status: 422
    end
  end

  def logout
    log_out
    @abilities = available_abilities
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
