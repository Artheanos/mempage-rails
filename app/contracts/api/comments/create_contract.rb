# frozen_string_literal: true

module Api
  module Comments
    class CreateContract < ApplicationContract
      params do
        required(:content).filled(:string)
        required(:image_post_id).filled(:integer)
      end

      rule(:image_post_id) do
        key.failure('not found') unless ImagePost.exists?(id: value)
      end
    end
  end
end
