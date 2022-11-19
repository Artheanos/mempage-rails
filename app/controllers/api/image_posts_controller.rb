# frozen_string_literal: true

module Api
  class ImagePostsController < ApplicationController
    before_action :set_image_post, only: %i[show destroy]

    def index
      result = if params[:after]
                 ImagePost.where("id > #{params[:after]}")
               else
                 ImagePost.page(params[:page] || 1).includes(:user, :comments, image_attachment: :blob)
               end

      render json: result.order(id: :desc)
    end

    def create
      authorize ImagePost
      image_post = ImagePost.new(create_params.merge(user: current_user))

      if image_post.save
        render json: {}, status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    def show
      render json: @image_post, serializer: Api::SingleImagePostSerializer
    end

    def destroy
      authorize @image_post
      @image_post.image.purge
      @image_post.destroy
      render json: {}, status: :ok
    end

    private

    def create_params
      params.require(:image_post).permit(:header, :image)
    end

    def set_image_post
      @image_post = ImagePost.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end
  end
end
