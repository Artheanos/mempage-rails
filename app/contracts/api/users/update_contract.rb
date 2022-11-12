# frozen_string_literal: true

module Api
  module Users
    class UpdateContract < ApplicationContract
      params do
        optional(:password).filled(:string)
      end

      rule(:password).validate(:password_format)
    end
  end
end
