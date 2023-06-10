Rails.application.routes.draw do
  root "spa#index"

  namespace :api do
    namespace :v1 do

      resources :users, only: [:show, :create, :destroy] do
        collection do
          get :search
          get :user_activations
        end
      end

    end
  end

  # Ошибка добавлять эту строку
  # get "/*path", to: "spa#index", format: false
end
