# frozen_string_literal: true

module Api
  class ImagePostSerializer < ApplicationSerializer
    attributes :id, :header, :image, :comment_count, :created_at, :current_user_reaction
    belongs_to :user

    include Rails.application.routes.url_helpers

    def image
      rails_blob_path(object.image, only_path: true) if object.image.attached?
    end

    def comment_count
      object.comments.to_a.length
    end

    def current_user_reaction
      object.reactions.find_by(user: current_user)&.reaction
    end
  end
end
