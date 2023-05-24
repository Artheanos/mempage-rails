# frozen_string_literal: true

module Api
  module Auth
    class LoginController < ApplicationController
      def create
        LoginService.call(login_params) do |result|
          result.success { |data| render_success data }
          result.failure { |data| render_failure data.merge(errors: { email: ['Invalid credentials'] }) }
        end
      end

      private

      def login_params
        params.permit(:email, :password)
      end
    end
  end
end
