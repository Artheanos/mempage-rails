# frozen_string_literal: true

module Api
  module Auth
    class RegisterController < ApplicationController
      def create
        RegisterService.new(register_params).call { |result| render_result(result) }
      end

      private

      def register_params
        params.permit(:email, :password).to_h
      end
    end
  end
end
