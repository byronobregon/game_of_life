Rails.application.routes.draw do
  resources :cells, only: :index do
    collection do
      post :save_state
      post :reset_field
    end
  end

  root 'cells#index'
end
