class Api::V1::SessionsController < ApplicationController
  before_action :authentication, except: [:login]

  def login
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      @token = encode_user_data({ user_data: @user.id })
      log_in @user
    else
      render status: 422
    end
  end

  def logout
    log_out
    render status: 200
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
