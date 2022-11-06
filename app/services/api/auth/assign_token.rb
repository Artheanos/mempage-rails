# frozen_string_literal: true

module Api
  module Auth
    class AssignToken
      def initialize(email, password)
        @email = email
        @password = password
      end

      def call
        JsonWebToken.encode(user_id: user.id) if user
      end

      def user
        return @user if @user

        @user = User.find_by_email(email)
        @user if @user&.authenticate(password)

        # errors.add :user_authentication, 'invalid credentials'
      end

      private

      attr_accessor :email, :password
    end
  end
end
