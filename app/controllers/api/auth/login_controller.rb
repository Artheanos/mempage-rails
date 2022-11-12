# frozen_string_literal: true

module Api
  module Auth
    class LoginController < ApplicationController
      def create
        LoginService.new(login_params).call { |result| render_result(result) }
      end

      private

      def login_params
        params.permit(:email, :password)
      end
    end
  end
end
