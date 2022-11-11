# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    before_action :set_user, only: %i[show]

    def show
      render json: {
        email: @user.email,
        created_at: @user.created_at,
        post_count: ImagePost.where(user: @user).count,
        comment_count: Comment.where(user: @user).count
      }
    end

    def update
      authorize User
      Users::Update.new(current_user, user_params).call { |result| render_result result }
    end

    private

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end

    def user_params
      params.require('user').to_unsafe_h
    end
  end
end
