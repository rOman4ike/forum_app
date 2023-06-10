class Api::V1::UsersController < ApplicationController
  def show
  end

  def create
    @user = User.new(user_params)
    @user.save
  end

  def destroy
    @ser = User.find(params[:id])
    @user.destroy
  end

  def search
    @users = User.all
  end

  def user_activations

  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end
end
