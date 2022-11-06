# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :image_posts, only: %i[create index show destroy]
    resources :comments, only: %i[create destroy]
    resources :users, only: %i[show]

    namespace :auth do
      resources :login, only: %i[create]
      resources :register, only: %i[create]
    end
  end

  root 'home#index'
end
