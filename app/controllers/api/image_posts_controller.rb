# frozen_string_literal: true

module Api
  class ImagePostsController < ApplicationController
    serialization_scope :serializer_scope
    before_action :set_image_post, only: %i[show destroy update]

    def index
      ImagePosts::List.new(current_user, params[:page]).call { |result| render_result(result) }
    end

    def create
      authorize ImagePost
      image_post = ImagePost.new(create_params)

      if image_post.save
        render json: {}, status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    def update
      authorize @image_post

      if @image_post.update(update_params)
        render json: {}, status: :ok
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
      result = params.permit(:header, :image_file)
      result[:image] = result.delete(:image_file)
      result.merge(user: current_user)
    end

    def update_params
      params.permit(:header)
    end

    def set_image_post
      @image_post = ImagePost.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end
  end
end
