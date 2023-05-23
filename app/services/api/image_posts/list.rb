# frozen_string_literal: true

module Api
  module ImagePosts
    class List < ApplicationService
      attr_reader :page, :current_user

      def initialize(current_user, page)
        @page = page || 1
        @current_user = current_user
      end

      def execute
        Success(
          json: {
            results: ActiveModel::Serializer::CollectionSerializer.new(
              query.includes(:user, image_attachment: :blob).order(id: :desc),
              serializer: ImagePostSerializer,
              current_user:, comment_counts:, like_counts:, dislike_counts:, client_reactions:,
            ),
            count: ImagePost.count
          },
        )
      end

      private

      def query
        @query ||= ImagePost.page(@page)
      end

      def comment_counts
        query.left_joins(:comments).group('id').count('comments.id')
      end

      def like_counts
        query.left_joins(:reactions).where('reactions.reaction': :like).group('id').count('reactions.id')
      end

      def dislike_counts
        query.left_joins(:reactions).where('reactions.reaction': :dislike).group('id').count('reactions.id')
      end

      def client_reactions
        query.left_joins(:reactions).where('reactions.user': current_user).pluck(
          'id',
          'reactions.reaction',
        ).to_h
      end
    end
  end
end
