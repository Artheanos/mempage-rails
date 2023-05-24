# frozen_string_literal: true

module Api
  module Reactions
    class Destroy < ApplicationService
      attr_reader :user, :image_post_id

      def initialize(user, image_post_id)
        @user = user
        @image_post_id = image_post_id
      end

      def execute
        if reaction.present?
          reaction.destroy
        else
          Failure(status: :not_found)
        end
      end

      private

      def reaction
        @reaction ||= Reaction.find_by(user_id: user.id, image_post_id:)
      end
    end
  end
end
