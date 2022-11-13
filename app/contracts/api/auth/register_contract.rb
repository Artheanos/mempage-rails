# frozen_string_literal: true

module Api
  module Auth
    class RegisterContract < ApplicationContract
      params do
        required(:email).filled(:string)
        required(:password).filled(:string)
      end

      rule(:email).validate(:email_format)
      rule(:password).validate(:password_format)

      rule(:email) do
        key.failure('User already exists') if User.where(email: value).exists?
      end
    end
  end
end
