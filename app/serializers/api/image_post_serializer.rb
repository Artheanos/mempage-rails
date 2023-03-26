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
      @instance_options[:comment_counts][object.id] || 0
    end

    def current_user_reaction
      @instance_options[:client_reactions][object.id] || nil
    end

    def likes
      @instance_options[:like_counts][object.id] || 0
    end

    def dislikes
      @instance_options[:dislike_counts][object.id] || 0
    end

    def user
      { id: object.user.id, email: object.user.email }
    end
  end
end
