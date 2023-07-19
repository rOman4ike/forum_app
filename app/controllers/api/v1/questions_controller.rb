class Api::V1::QuestionsController < ApplicationController
  # before_action :authentication, except: [:index]
  # load_resource except: [:index]
  # authorize_resource except: [:index]

  def index
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
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
    @question = Question.find(question_edit_update[:id])
    unless @question.update(question_edit_update)
      render status: 422
    end
  end

  private

  def question_params
    params.require(:question).permit(:user_id, :title, :content)
  end

  def question_edit_update
    params.require(:question).permit(:id, :title, :content)
  end
end
