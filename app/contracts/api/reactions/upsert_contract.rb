# frozen_string_literal: true

module Api
  module Reactions
    class UpsertContract < ApplicationContract
      params do
        required(:image_post_id).filled(:integer)
        required(:reaction).filled(included_in?: Reaction.reactions.keys)
      end

      rule(:image_post_id).validate(:exists)
    end
  end
end
