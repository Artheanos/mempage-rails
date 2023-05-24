# frozen_string_literal: true

module Api
  module Auth
    class AuthenticateUser < ApplicationService
      def initialize(headers = {})
        @headers = headers
      end

      def execute
        user
      end

      private

      attr_reader :headers

      def user
        credentials = decode_token
        User.find(credentials[:user_id]) if credentials
      end

      def decode_token
        token = http_auth_header
        JsonWebToken.decode(token) if token
      end

      def http_auth_header
        headers['Authorization']&.split&.last
      end
    end
  end
end
