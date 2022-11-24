# frozen_string_literal: true

module Api
  class SingleImagePostSerializer < ImagePostSerializer
    has_many :comments do
      object.comments.order(created_at: :desc)
    end
  end
end
