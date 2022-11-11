# frozen_string_literal: true

module Api
  module Auth
    class RegisterService < ApplicationService
      def initialize(user)
        @user = user
      end

      def execute
        return Failure(errors: { base: 'User already exists' }) unless @user.save

        LoginService.new(@user.email, @user.password).call
      end
    end
  end
end
