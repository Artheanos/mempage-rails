# frozen_string_literal: true

module Api
  module Auth
    class LoginService < ApplicationService
      def initialize(email, password)
        @email = email
        @password = password
      end

      def execute
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
