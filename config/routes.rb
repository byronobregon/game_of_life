Rails.application.routes.draw do
  resources :cells, only: :index do
    collection { post :save_state }
  end

  root 'cells#index'
end
