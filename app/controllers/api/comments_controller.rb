# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    before_action :set_comment, only: %i[destroy]

    def create
      authorize Comment
      Comments::Create.new(current_user, create_params).call { |r| render_result r }
    end

    def destroy
      authorize @comment
      @comment.destroy
      render json: {}, status: :ok
    end

    private

    def create_params
      params.require(:comment).permit(:content, :image_post_id).to_h
    end

    def set_comment
      @comment = Comment.find_by(id: params[:id])
      render json: {}, status: :not_found if @comment.nil?
    end
  end
end
