# frozen_string_literal: true

module Api
  class ReactionsController < ApplicationController
    def upsert
      authorize Reaction
      params = validate_params Reactions::UpsertContract
      reaction = Reaction.find_by(user_id: current_user.id, image_post_id: params[:image_post_id])
      if reaction
        reaction.update!(reaction: params[:reaction])
      else
        Reaction.create!(params.merge(user_id: current_user.id))
      end
      render_success
    end

    def destroy
      reaction = Reaction.find_by(user_id: current_user.id, image_post_id: params[:image_post_id])
      if reaction.present?
        reaction.destroy
        render_success
      else
        render_failure status: :not_found
      end
    end
  end
end
