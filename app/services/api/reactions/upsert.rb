# frozen_string_literal: true

module Api
  module Reactions
    class Upsert < ApplicationService
      attr_reader :user, :image_post_id, :reaction_value

      def initialize(user, image_post_id, reaction_value)
        @user = user
        @image_post_id = image_post_id
        @reaction_value = reaction_value
      end

      def execute
        reaction ? update : create
      end

      private

      def reaction
        @reaction ||= Reaction.find_by(user_id: user.id, image_post_id:)
      end

      def update
        reaction.update!(reaction: reaction_value)
      end

      def create
        Reaction.create!({ image_post_id:, reaction: reaction_value, user_id: user.id })
      end
    end
  end
end
