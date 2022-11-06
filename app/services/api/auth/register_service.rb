# frozen_string_literal: true

module Api
  module Auth
    class RegisterService < ApplicationService
      include Dry::Matcher.for(:call, with: Dry::Matcher::ResultMatcher)

      def initialize(user)
        super()
        @user = user
      end

      def call
        return Failure(errors: { base: 'User already exists' }) unless @user.save

        LoginService.new(@user.email, @user.password).call
      end
    end
  end
end
