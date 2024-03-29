class Api::V1::QuestionsController < ApplicationController
  before_action :authentication, except: [:index, :show, :search]
  load_resource except: [:index, :show, :search]
  authorize_resource except: [:index, :show, :search]

  def index
    @questions = Question.order(created_at: :desc).page(params[:page])
  end

  def show
    @question = Question.find(params[:id])
    if @question.present?
      @viewed_question = ViewedQuestion.find_by(question_id: @question.id, user_id: session[:user_id])
      if @viewed_question.blank?
        @viewed_question = ViewedQuestion.create(question_id: @question.id, user_id: session[:user_id])
      end
    end
  end

  def create
    @question = Question.new(question_params)
    @question.user_id = session[:user_id]
    unless @question.save
      render status: 422
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(question_update_params[:id])
    unless @question.update(question_update_params)
      render status: 422
    end
  end

  def search
    @q = Question.ransack(title_cont: params[:q])
    @questions = @q.result(distinct: true)
  end

  private

  def question_params
    params.require(:question).permit(:user_id, :title, :content)
  end

  def question_update_params
    params.require(:question).permit(:id, :title, :content)
  end
end
