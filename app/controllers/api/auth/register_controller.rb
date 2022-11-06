# frozen_string_literal: true

module Api
  module Auth
    class RegisterController < ApplicationController
      def create
        user = User.new(register_params)
        RegisterService.new(user).call do |result|
          render_result(result)
        end
      end

      private

      def register_params
        params.permit(:email, :password)
      end
    end
  end
end
