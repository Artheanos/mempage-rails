# frozen_string_literal: true

module Api
  module Comments
    class Create < ApplicationService
      def initialize(user, params)
        @user = user
        @params = params
      end

      def execute
        Comment.create(@params.merge(user: @user))
      end
    end
  end
end
