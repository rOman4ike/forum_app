Rails.application.routes.draw do
  root "spa#index"
  get "/*path", to: "spa#index", format: false

  namespace :api do
    namespace :v1 do

      resources :users, only: [:create, :destroy, :show] do
        collection do
          get :search
        end
      end

    end
  end
end
