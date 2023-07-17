class ApplicationController < ActionController::Base
  helper_method :current_user

  # Поменять
  SECRET = "yoursecretword"
  skip_before_action :verify_authenticity_token

  def authentication
    decode_data = decode_user_data(request.headers["token"])
    user_data = decode_data[0]["user_data"] unless !decode_data
    user = User.find(user_data) rescue false

    if user
      session[:user_id] = user.id
      return true
    else
      render status: 403
    end
  end

  # turn user data (payload) to an encrypted string  [ B ]
  def encode_user_data(payload)
    JWT.encode payload, SECRET, "HS256"
  end

  # decode token and return user info, this returns an array, [payload and algorithms] [ B ]
  def decode_user_data(token)
    begin
      JWT.decode token, SECRET, true, { algorithm: "HS256" }
    rescue => e
      puts e
    end
  end

  private

  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  def log_in(user)
    session[:user_id] = user.id
  end
end
