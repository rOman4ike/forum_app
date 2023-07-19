Rails.application.routes.draw do
  root "spa#index"

  namespace :api do
    namespace :v1 do

      resources :users do
        collection do
          # get :search
          get :user_activations # поправить на activate
          post :send_messages
        end
      end

      resources :questions

      post '/login', to: 'sessions#login'
      delete '/logout', to: 'sessions#logout'
    end
  end

  # Ошибка добавлять эту строку
  # get "/*path", to: "spa#index", format: false
end
