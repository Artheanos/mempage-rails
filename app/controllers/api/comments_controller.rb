# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    before_action :set_comment, only: %i[destroy]

    def create
      authorize Comment
      params = validate_params Comments::CreateContract
      Comments::Create.new(current_user, params).call { |r| render_result r }
    end

    def destroy
      authorize @comment
      @comment.destroy
      render_success
    end

    private

    def set_comment
      @comment = Comment.find_by(id: params[:id])
      render json: {}, status: :not_found if @comment.nil?
    end
  end
end
