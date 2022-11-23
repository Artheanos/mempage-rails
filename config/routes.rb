# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :image_posts, only: %i[create index show destroy]
    resources :comments, only: %i[create destroy]
    resources :users, only: %i[show update]

    namespace :auth do
      resources :login, only: %i[create]
      resources :register, only: %i[create]
      resources :token, only: %i[create]
    end
  end

  root 'home#index'
  get '*all', to: 'home#index', constraints: lambda { |req|
    req.path.exclude?('rails/active_storage') && req.path.exclude?('/api')
  }
end
