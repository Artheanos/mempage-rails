# frozen_string_literal: true

module Api
  class ImagePostSerializer < ApplicationSerializer
    attributes :id, :header, :image, :comment_count, :created_at, :current_user_reaction, :likes, :dislikes
    belongs_to :user

    include Rails.application.routes.url_helpers

    def image
      url_for(object.image) if object.image.attached?
    end

    def comment_count
      object.comments.count
    end

    def current_user_reaction
      object.reactions.find_by(user: @instance_options[:current_user])&.reaction
    end

    def likes
      object.reactions.where(reaction: :like).count
    end

    def dislikes
      object.reactions.where(reaction: :dislike).count
    end

    def user
      { id: object.user.id, email: object.user.email }
    end
  end
end
