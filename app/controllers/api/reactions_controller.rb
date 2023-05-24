# frozen_string_literal: true

module Api
  class ReactionsController < ApplicationController
    def upsert
      authorize Reaction
      params = validate_params Reactions::UpsertContract

      Reactions::Upsert.call(current_user, params[:image_post_id], params[:reaction]) { |result| render_result result }
    end

    def destroy
      authorize Reaction
      Reactions::Destroy.call(current_user, params[:image_post_id]) { |result| render_result result }
    end
  end
end
