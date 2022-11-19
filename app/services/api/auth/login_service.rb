# frozen_string_literal: true

module Api
  module Auth
    class LoginService < ApplicationService
      def initialize(params)
        @params = params
      end

      def execute
        authentication = Api::Auth::AssignToken.new(@params[:email], @params[:password])
        token = authentication.call
        if token
          Success(json: { token: token, user: authentication.user })
        else
          Failure(errors: {}, status: :unauthorized)
        end
      end
    end
  end
end
