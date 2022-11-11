# frozen_string_literal: true

module Api
  module Users
    class UpdateContract < Dry::Validation::Contract
      params do
        optional(:password).filled(:string)
      end

      rule(:password) do
        key.failure('must be longer than 3') if key? && value.length <= 3
      end
    end
  end
end
