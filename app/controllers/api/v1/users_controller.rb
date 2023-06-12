class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    @user.save
    # if @user.save
      # UserNotifierMailer.send_signup_email(@user).deliver
    # end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_edit_update)
  end

  def search
    @users = User.all
  end

  def user_activations
    @user = User.find_by_email(params[:email])
    if @user.activation_token == params[:activation_token] && @user.role == 'unconfirmed_user'
      @user.update(role: 'user')
    else
      render head: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end

  def user_edit_update
    params.require(:user).permit(:id, :email, :name)
  end
end
