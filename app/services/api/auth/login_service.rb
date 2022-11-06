# frozen_string_literal: true

module Api
  module Auth
    class LoginService < ApplicationService
      include Dry::Matcher.for(:call, with: Dry::Matcher::ResultMatcher)

      def initialize(email, password)
        super()
        @email = email
        @password = password
      end

      def call
        authentication = Api::Auth::AssignToken.new(@email, @password)
        token = authentication.call
        if token
          Success(json: { token: token, user_id: authentication.user.id })
        else
          Failure(errors: {}, status: :unauthorized)
        end
      end
    end
  end
end
