# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    before_action :set_comment, only: %i[destroy]

    def create
      authorize Comment
      comment = Comment.new(create_params.merge(user: current_user))

      if comment.save
        render json: {}, status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @comment
      @comment.destroy
      render json: {}, status: :ok
    end

    private

    def create_params
      params.require(:comment).permit(:content, :image_post_id)
    end

    def set_comment
      @comment = Comment.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end
  end
end
