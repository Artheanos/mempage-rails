# frozen_string_literal: true

module Api
  class ImagePostsController < ApplicationController
    serialization_scope :serializer_scope
    before_action :set_image_post, only: %i[show destroy update]

    def index
      query = ImagePost.page(params[:page] || 1)
      comment_counts = query.left_joins(:comments).group('id').count('comments.id')
      like_counts = query.left_joins(:reactions).where('reactions.reaction': :like).group('id').count('reactions.id')
      dislike_counts = query.left_joins(:reactions).where('reactions.reaction': :dislike).group('id').count('reactions.id')
      client_reactions = query.left_joins(:reactions).where('reactions.user': current_user).pluck('id', 'reactions.reaction').to_h

      render json: {
        results: ActiveModel::Serializer::CollectionSerializer.new(
          query.includes(:user, image_attachment: :blob).order(id: :desc),
          serializer: ImagePostSerializer,
          current_user: current_user,
          comment_counts: comment_counts,
          like_counts: like_counts,
          dislike_counts: dislike_counts,
          client_reactions: client_reactions,
        ),
        count: ImagePost.count
      }
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
