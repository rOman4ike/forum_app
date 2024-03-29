class Api::V1::UsersController < ApplicationController
  before_action :authentication, except: [:create, :user_activations, :search]
  load_resource except: [:create, :user_activations, :search]
  authorize_resource except: [:create, :user_activations, :search]

  include AvailableAbilities

  def index
    @users = User.order(created_at: :desc).page(params[:page])
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @token = encode_user_data({ user_data: @user.id })
      log_in @user
      @abilities = available_abilities
      # UserNotifierMailer.send_signup_email(@user).deliver
    else
      render status: 422
    end
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
    unless @user.update(user_edit_update)
      render status: 422
    end
  end

  def search
    @q = User.ransack(name_cont: params[:q])
    @users = @q.result(distinct: true)
  end

  def user_activations
    @user = User.find_by_email(params[:email])
    if @user.activation_token == params[:activation_token] && @user.role == 'unconfirmed_user'
      @user.update(role: 'user')
    else
      render status: 400
    end
  end

  def send_messages
    @user = User.all.uniq(&:email)
    comment = 'test message'
    @user.each do |user|
      UserNotifierMailer.send_messages(user, comment).deliver_later
    end
  end

  def viewed_questions
    @user = User.find(params[:id])
    @viewed_questions = @user.viewed_questions
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end

  def user_edit_update
    params.require(:user).permit(:id, :email, :name)
  end
end
