# frozen_string_literal: true

module Api
  module Users
    class Update < ApplicationService
      def initialize(user, params)
        @user = user
        @params = params
      end

      def execute
        if @user.update(@params)
          Success()
        else
          Failure(errors: @user.errors.errors, status: :bad_request)
        end
      end
    end
  end
end
