Rails.application.routes.draw do
  root "spa#index"

  namespace :api do
    namespace :v1 do

      resources :users do
        collection do
          get :user_activations # поправить на activate
          get :search
          post :send_messages
          # get :viewed_questions
          get ':id/viewed_questions' => 'users#viewed_questions', as: :viewed_questions
        end
      end

      resources :questions do
        collection do
          get :search
        end
      end

      post '/login', to: 'sessions#login'
      delete '/logout', to: 'sessions#logout'
    end
  end

  # Ошибка добавлять эту строку
  # get "/*path", to: "spa#index", format: false
end
