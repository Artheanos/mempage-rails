# frozen_string_literal: true

module Api
  class SingleImagePostSerializer < ImagePostSerializer
    has_many :comments do
      object.comments.order(created_at: :desc).includes(:user)
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
  end
end
