# frozen_string_literal: true

module Api
  module Auth
    class LoginService < ApplicationService
      def initialize(params)
        @params = params
      end

      def execute
        if user
          Success(json: { token: user.generate_jwt, user: user })
        else
          Failure(errors: {}, status: :unauthorized)
        end
      end

      private

      def user
        @user ||= User.find_by_credentials(@params[:email], @params[:password])
      end
    end
  end
end
