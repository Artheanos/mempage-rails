# frozen_string_literal: true

module Api
  module Auth
    class LoginController < ApplicationController
      def create
        LoginService.new(login_params[:email], login_params[:password]).call do |result|
          render_result(result)
        end
      end

      private

      def login_params
        params.permit(:email, :password)
      end

      def login_response
        @login_response ||= LoginService.new(login_params[:email], login_params[:password]).call
      end
    end
  end
end
