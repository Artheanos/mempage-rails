# frozen_string_literal: true

module Api
  module Auth
    class RegisterService < ApplicationService
      def initialize(params)
        @params = validate_params(RegisterContract, params)
      end

      def execute
        return Failure(errors: { base: 'User already exists' }) unless user.save

        LoginService.new(user.email, user.password).call.success
      end

      private

      def user
        @user ||= User.new(@params)
      end
    end
  end
end
